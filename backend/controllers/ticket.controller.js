import {
  requestTicketService,
  getUserTicketService,
  generatePaymentLinkService
} from "../services/ticket.service";

export async function requestTicketController(userId, data) {
  return await requestTicketService({
    userId,
    ...data
  });
}

export async function getMyTicketController(userId) {
  return await getUserTicketService(userId);
}

export async function generatePaymentLink(user) {
  return await generatePaymentLinkService(user)
}