import os
import logging
import httpx
from typing import Optional

from features.shared.contracts import ValidateEmailResponse, EnrichedPerson
from features.shared.cache import get_cache

logger = logging.getLogger(__name__)

# Constants
QEV_API_URL = "https://api.quickemailverification.com/v1/verify"
CONTACTOUT_API_URL = "https://api.contactout.com/v1/people/enrich"


class EnrichmentService:
    """
    Unified service for Email Delivery Verification and Identity Enrichment.
    """

    def __init__(self):
        self.qev_api_key = os.getenv("QUICKEMAILVERIFICATION_API_KEY")
        self.contactout_api_key = os.getenv("CONTACTOUT_API_KEY")
        self.cache = get_cache()

    async def validate_and_enrich(self, email: str, first_name: Optional[str] = None, last_name: Optional[str] = None) -> ValidateEmailResponse:
        """
        Executes the full pipeline:
        1. Verify email deliverability
        2. Check Datastore/SQLite cache for fresh data
        3. Call ContactOut API if cache missed
        """
        email = email.lower().strip()

        # Step 1: Verify Deliverability (Optional but recommended)
        if self.qev_api_key and self.qev_api_key != "your_key_here":
            is_valid = await self._verify_deliverability(email)
            if not is_valid:
                logger.warning(f"❌ [QEV] Invalid email address: {email}")
                return ValidateEmailResponse(
                    is_valid=False,
                    validation_reason="email_invalid_or_bounced"
                )
        else:
            logger.info("⚠️ [QEV] Skipping deliverability check (No API Key)")

        # Step 2: Check Cache
        cached_data = await self.cache.get_contact_out_data(email)
        if cached_data:
            logger.info(f"✅ [Cache] Serving fresh enriched data for {email}")
            return ValidateEmailResponse(
                is_valid=True,
                validation_reason="cache_hit",
                enriched_profile=self._map_contactout_to_enriched_person(cached_data)
            )

        # Step 3: ContactOut Enrichment
        if not self.contactout_api_key or self.contactout_api_key == "your_key_here":
            logger.warning("⚠️ [ContactOut] Skipping enrichment (No API Key)")
            return ValidateEmailResponse(
                is_valid=True,
                validation_reason="no_api_key"
            )

        raw_data = await self._fetch_contactout_profile(email, first_name, last_name)
        if not raw_data:
            logger.info(f"⚠️ [ContactOut] No profile found for {email}")
            return ValidateEmailResponse(
                is_valid=True,  # Email is valid, just no enriched profile
                validation_reason="profile_not_found"
            )

        # Step 4: Save to Cache and Return
        # Ensure we don't cache an empty or hollow profile indefinitely
        profile_data = raw_data.get("profile", {})
        if profile_data.get("full_name"):
            await self.cache.set_contact_out_data(email, raw_data)
        else:
            logger.info(f"⚠️ [ContactOut] Received empty profile data for {email}. Skipping cache write to allow future retries.")
            return ValidateEmailResponse(
                is_valid=True,
                validation_reason="profile_empty_not_cached"
            )
        
        return ValidateEmailResponse(
            is_valid=True,
            validation_reason="enriched",
            enriched_profile=self._map_contactout_to_enriched_person(raw_data)
        )

    async def _verify_deliverability(self, email: str) -> bool:
        """Calls QuickEmailVerification REST API asynchronously."""
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(
                    QEV_API_URL,
                    params={"email": email, "apikey": self.qev_api_key},
                    timeout=10.0
                )
                if response.status_code == 200:
                    data = response.json()
                    return data.get("result", "").lower() != "invalid"
            # If API fails or status is not 200, assume valid to not block the pipeline
            return True
        except Exception as e:
            logger.error(f"QEV API failed: {e}")
            return True

    async def _fetch_contactout_profile(self, email: str, first_name: Optional[str] = None, last_name: Optional[str] = None) -> Optional[dict]:
        """Calls ContactOut API directly."""
        try:
            headers = {
                "Content-Type": "application/json",
                "authorization": "basic",
                "token": self.contactout_api_key,
            }
            
            payload = {"email": email}
            # ContactOut relies more on exact name parameters if an ambiguous email is given.
            if first_name:
                payload["first_name"] = first_name
            if last_name:
                payload["last_name"] = last_name

            async with httpx.AsyncClient() as client:
                response = await client.post(
                    CONTACTOUT_API_URL,
                    json=payload,
                    headers=headers,
                    timeout=15.0
                )
                
                if response.status_code == 404:
                    return None
                    
                response.raise_for_status()
                data = response.json()
                
                if data.get("profile"):
                    return data
                return None
                
        except httpx.HTTPStatusError as e:
            logger.error(f"ContactOut HTTP error: {e.response.status_code} - {e.response.text}")
            return None
        except Exception as e:
            logger.error(f"ContactOut Request failed: {e}")
            return None

    def _map_contactout_to_enriched_person(self, raw_data: dict) -> EnrichedPerson:
        """Parses the raw ContactOut payload into our standard internal contract."""
        
        profile = raw_data.get("profile", {})
        
        def _parse_year(val) -> str:
            if not val:
                return ""
            val_str = str(val).strip()
            if val_str == "0" or val_str == "00":
                return ""
            if len(val_str) >= 4:
                return val_str[:4]  # type: ignore
            return val_str

        # Parse employment
        history = []
        raw_work = profile.get("experience") or profile.get("work") or []
        for work in raw_work:
            history.append({
                "title": work.get("title", ""),
                "company": work.get("company_name", work.get("company", "")),
                "start": _parse_year(work.get("starting_date", work.get("start_date", work.get("started_at", work.get("start", ""))))),
                "end": _parse_year(work.get("ending_date", work.get("end_date", work.get("ended_at", work.get("end", "")))))
            })

        # Parse education
        education = []
        raw_edu = profile.get("education", [])
        for edu in raw_edu:
            education.append({
                "degree": edu.get("degree", ""),
                "school": edu.get("school_name", edu.get("school", "")),
                "year": _parse_year(edu.get("ended_at", edu.get("end", "")))
            })

        company_data = profile.get("company")
        company_name = company_data.get("name") if isinstance(company_data, dict) else company_data
        
        email_data = profile.get("email")
        primary_email = email_data[0] if isinstance(email_data, list) and email_data else (email_data if isinstance(email_data, str) else None)

        # Clean up the role to be brief
        raw_role = profile.get("headline") or profile.get("title") or ""
        clean_role = raw_role.split(' // ')[0].split(' | ')[0].split(', ')[0].strip()

        return EnrichedPerson(
            fullName=profile.get("full_name") or "",
            currentRole=clean_role,
            companyName=company_name,
            email=primary_email,
            personalEmails=profile.get("personal_emails", []),
            workEmails=profile.get("work_emails", []),
            phones=profile.get("phones", []),
            linkedInUrl=profile.get("url") or profile.get("linkedin"),
            profileImageUrl=profile.get("profile_picture_url") or profile.get("avatar"),
            location=profile.get("location"),
            bio=profile.get("summary") or profile.get("bio"),
            employmentHistory=history,
            education=education,
            companyDomain=profile.get("company_domain")
        )

# Instantiate a global singleton service
enrichment_service = EnrichmentService()
