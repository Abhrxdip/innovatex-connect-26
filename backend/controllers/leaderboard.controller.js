import { getLeaderboardService } from "../services/leaderboard.service.js";

export async function getLeaderboardController(isAdmin = false) {
  return await getLeaderboardService(isAdmin);
}
  