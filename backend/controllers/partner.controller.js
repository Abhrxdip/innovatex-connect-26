import { getPartnerStatsService } from "../services/leaderboard.service.js";
import { generateReferralCode } from "../services/referral.service.js";
import User from "../models/User.js";

export async function getPartnerDashboardController(partnerId) {
  const user = await User.findById(partnerId).select("-password -secret");
  const stats = await getPartnerStatsService(partnerId);

  const referralCode = `IXC-${partnerId.toString().substring(18).toUpperCase()}`;

  return {
    partner: user,
    referralCode,
    referralLink: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}?ref=${referralCode}`,
    stats,
  };
}
