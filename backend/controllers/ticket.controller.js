import { bookTicketService, getUserTicketService } from "../services/ticket.service.js";

export async function bookTicketController(userId, data) {
  return await bookTicketService({ userId, ...data });
}

export async function getMyTicketController(userId) {
  return await getUserTicketService(userId);
}
