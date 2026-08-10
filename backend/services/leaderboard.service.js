import Referral from "../models/Referral.js";
import User from "../models/User.js";
import { ROLES, TICKET_STATUS } from "../config/constants.js";

export async function getLeaderboardService(isAdmin = false) {
  const partners = await User.find({ role: ROLES.COMMUNITY_PARTNER }).select("name email college company avatar");

  const leaderboardData = await Promise.all(
    partners.map(async (partner) => {
      const totalReferrals = await Referral.countDocuments({ partnerId: partner._id });
      const approvedReferrals = await Referral.countDocuments({
        partnerId: partner._id,
        status: TICKET_STATUS.APPROVED,
      });

      return {
        partner: {
          id: partner._id,
          name: partner.name,
          college: partner.college,
          company: partner.company,
          avatar: partner.avatar,
        },
        totalReferrals,
        approvedReferrals,
      };
    })
  );

  leaderboardData.sort((a, b) => {
    if (isAdmin) {
      if (b.approvedReferrals !== a.approvedReferrals) {
        return b.approvedReferrals - a.approvedReferrals;
      }
      return b.totalReferrals - a.totalReferrals;
    } else {
      if (b.totalReferrals !== a.totalReferrals) {
        return b.totalReferrals - a.totalReferrals;
      }
      return b.approvedReferrals - a.approvedReferrals;
    }
  });

  return leaderboardData;
}

export async function getPartnerStatsService(partnerId) {
  const totalReferrals = await Referral.countDocuments({ partnerId });
  const pendingReferrals = await Referral.countDocuments({ partnerId, status: TICKET_STATUS.PENDING });
  const approvedReferrals = await Referral.countDocuments({ partnerId, status: TICKET_STATUS.APPROVED });

  const referrals = await Referral.find({ partnerId })
    .populate("referredUser", "name email college role createdAt github linkedin")
    .sort({ createdAt: -1 });

  return {
    totalReferrals,
    pendingReferrals,
    approvedReferrals,
    referrals,
  };
}
