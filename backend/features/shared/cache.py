"""
Cache Interface and Implementations for the Prospect Intelligence Backend.

Provides a unified interface for caching ContactOut/lead data.
In development, uses local SQLite.
In production, this can be seamlessly swapped to Google Cloud Datastore or Redis.
"""

import abc
import json
import sqlite3
import logging
import datetime
from typing import Optional, Tuple
from pathlib import Path
import os

logger = logging.getLogger(__name__)

# ─── Abstract Cache Interface ────────────────────────────────────────────────

class BaseCache(abc.ABC):
    """
    Abstract base class for all cache implementations.
    Defines the contract that any storage backend (SQLite, Datastore, Redis) must satisfy.
    """

    @abc.abstractmethod
    async def get_contact_out_data(self, email: str) -> Optional[dict]:
        """
        Retrieve cached ContactOut data for a given email if it exists and is fresh.
        Returns the parsed JSON dictionary, or None if not found/stale.
        """
        pass

    @abc.abstractmethod
    async def set_contact_out_data(self, email: str, raw_data_dict: dict) -> bool:
        """
        Store ContactOut data for a given email.
        raw_data_dict: The raw JSON dictionary returned by ContactOut.
        Returns True if successful, False otherwise.
        """
        pass

    @property
    def freshness_threshold_days(self) -> int:
        """How many days before cached data is considered stale."""
        return 30


# ─── SQLite Implementation (For Local Dev) ───────────────────────────────────

class SQLiteCache(BaseCache):
    """
    Local SQLite implementation of the cache.
    Stores data in a local .db file without requiring external servers.
    """

    def __init__(self, db_path: str = "local_cache.db"):
        # Put the DB file in the backend root directory
        # __file__ is backend/features/shared/cache.py
        # backend root is two levels up
        backend_dir = Path(__file__).resolve().parent.parent.parent
        self.db_path = str(backend_dir / db_path)
        self._init_db()

    def _get_connection(self):
        """Creates a new DB connection. SQLite connections shouldn't be shared across async contexts generally."""
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        return conn

    def _init_db(self):
        """Initialize the table if it doesn't exist."""
        try:
            with self._get_connection() as conn:
                conn.execute(
                    """
                    CREATE TABLE IF NOT EXISTS contactout_cache (
                        email TEXT PRIMARY KEY,
                        payload JSON NOT NULL,
                        updated_at TIMESTAMP NOT NULL
                    )
                    """
                )
                # Create an index on updated_at for potential cleanup jobs
                conn.execute(
                    "CREATE INDEX IF NOT EXISTS idx_updated_at ON contactout_cache(updated_at)"
                )
            logger.info("SQLite Cache initialized successfully.")
        except Exception as e:
            logger.error(f"Failed to initialize SQLite Cache: {e}")

    async def get_contact_out_data(self, email: str) -> Optional[dict]:
        try:
            with self._get_connection() as conn:
                row = conn.execute(
                    "SELECT payload, updated_at FROM contactout_cache WHERE email = ?",
                    (email.lower().strip(),)
                ).fetchone()

                if not row:
                    logger.debug(f"[Cache Miss] No data found for {email}")
                    return None

                updated_at_str = row["updated_at"]
                
                # Check freshness
                try:
                    updated_dt = datetime.datetime.fromisoformat(updated_at_str)
                    now = datetime.datetime.now(datetime.timezone.utc)
                    age_days = (now - updated_dt).days

                    if age_days > self.freshness_threshold_days:
                        logger.info(f"[Cache Stale] Data for {email} is {age_days} days old. Threshold is {self.freshness_threshold_days}.")
                        return None
                        
                except ValueError:
                    logger.warning(f"[Cache Error] Invalid timestamp format for {email}: {updated_at_str}")
                    return None

                logger.info(f"[Cache Hit] Fresh ContactOut data retrieved for {email}")
                return json.loads(row["payload"])

        except Exception as e:
            logger.error(f"Error reading from SQLite cache for {email}: {e}")
            return None

    async def set_contact_out_data(self, email: str, raw_data_dict: dict) -> bool:
        try:
            now_str = datetime.datetime.now(datetime.timezone.utc).isoformat()
            payload_str = json.dumps(raw_data_dict)
            
            with self._get_connection() as conn:
                # Upsert query (Insert or Update if exists)
                conn.execute(
                    """
                    INSERT INTO contactout_cache (email, payload, updated_at)
                    VALUES (?, ?, ?)
                    ON CONFLICT(email) DO UPDATE SET 
                        payload = excluded.payload,
                        updated_at = excluded.updated_at
                    """,
                    (email.lower().strip(), payload_str, now_str)
                )
            logger.info(f"[Cache Set] Stored ContactOut data for {email}")
            return True

        except Exception as e:
            logger.error(f"Error writing to SQLite cache for {email}: {e}")
            return False


# ─── Datastore Implementation Stub (For Production) ──────────────────────────

class GoogleCloudDatastoreCache(BaseCache):
    """
    Stub for the production Google Cloud Datastore implementation.
    This would wrap the exact utility methods provided in the user's sample code.
    """
    async def get_contact_out_data(self, email: str) -> Optional[dict]:
        # Implementation would call get_contact_out_data_from_datastore
        logger.warning("GCP Datastore cache not yet fully implemented.")
        return None

    async def set_contact_out_data(self, email: str, raw_data_dict: dict) -> bool:
        # Implementation would call upload_raw_contact_out_data_to_cloud_store
        return False


# ─── Cache Factory / Dependency Injection ────────────────────────────────────

# Singleton instance to expose
_cache_instance: Optional[BaseCache] = None

def get_cache() -> BaseCache:
    """
    Returns the appropriate cache implementation based on environment variables.
    Dependency Injection pattern.
    """
    global _cache_instance
    if _cache_instance is None:
        cache_mode = os.environ.get("CACHE_MODE", "SQLITE").upper()
        
        if cache_mode == "GCP_DATASTORE":
            logger.info("Initializing Google Cloud Datastore Cache Layer")
            _cache_instance = GoogleCloudDatastoreCache()
        else:
            logger.info("Initializing SQLite Cache Layer (Local Mode)")
            _cache_instance = SQLiteCache()
            
    return _cache_instance
