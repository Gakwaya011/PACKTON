import { sendSms } from "./sms.service.js";
import type { OrderStatus } from "../generated/prisma/enums.js";

const FRONTEND_URL = process.env["FRONTEND_URL"] ?? "http://localhost:5173";

const STATUS_MESSAGES: Record<OrderStatus, string> = {
  PENDING: "Your Packton delivery has been scheduled.",
  PICKED_UP: "Your Packton delivery has been picked up.",
  IN_TRANSIT: "Your Packton delivery is on its way.",
  DELIVERED: "Your Packton delivery has been delivered.",
  CANCELLED: "Your Packton delivery has been cancelled.",
};

export function notifyOrderStatus(order: { id: string; recipientPhone: string; recipientName: string }, status: OrderStatus): void {
  const trackingUrl = `${FRONTEND_URL}/track/${order.id}`;
  const message = `Hi ${order.recipientName}, ${STATUS_MESSAGES[status]} Track it: ${trackingUrl}`;

  // Fire-and-forget: notification delivery should never block or fail the request that triggered it.
  void sendSms(order.recipientPhone, message);
}
