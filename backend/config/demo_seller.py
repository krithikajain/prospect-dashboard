# ═══════════════════════════════════════════════════════════════════════════════
#  DEMO SELLER CONFIG
# ═══════════════════════════════════════════════════════════════════════════════
#
#  This file simulates a logged-in user for demo/development purposes.
#  When authentication is added, replace this with a DB lookup after login.
#
#  SWAP POINT: The only change needed for production is WHERE the
#  SellerContext is loaded from — the model, prompts, and components
#  remain identical.
# ═══════════════════════════════════════════════════════════════════════════════

from features.shared.contracts import SellerContext

DEMO_SELLER = SellerContext(
    sellerName="Demo User",
    sellerEmail="demo@acmeanalytics.com",
    companyName="Acme Analytics",
    productCategory="Sales Intelligence",
    targetCompanySize=["Mid-Market (201-1000)", "Enterprise (1001-5000)"],
    targetIndustries=["SaaS", "FinTech"],
)
