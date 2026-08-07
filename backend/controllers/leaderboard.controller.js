import { getLeaderboardService } from "../services/leaderboard.service.js";

export async function getLeaderboardController() {
  return await getLeaderboardService();
}
