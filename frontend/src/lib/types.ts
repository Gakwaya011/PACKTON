export type Role = 'CUSTOMER' | 'RIDER' | 'ADMIN';

export const ROLE_HOME: Record<Role, string> = {
  CUSTOMER: '/dashboard',
  RIDER: '/rider',
  ADMIN: '/admin',
};

export type OrderStatus = 'PENDING' | 'PICKED_UP' | 'IN_TRANSIT' | 'DELIVERED' | 'CANCELLED';

export interface CreateUserResult {
  user: { id: string; name: string; email: string; role: Role };
  credentialsEmailed: boolean;
  temporaryPassword?: string;
}

export interface Order {
  id: string;
  senderId: string | null;
  recipientName: string;
  recipientPhone: string;
  pickupAddress: string;
  pickupLat: number | null;
  pickupLng: number | null;
  dropoffAddress: string;
  dropoffLat: number | null;
  dropoffLng: number | null;
  status: OrderStatus;
  codAmount: string | null;
  price: string;
  riderId: string | null;
  manifestId: string | null;
  podPhotoUrl: string | null;
  podSignatureUrl: string | null;
  podCapturedAt: string | null;
  hasInsurance: boolean;
  insuranceFee: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AdminOrder extends Order {
  sender: { id: string; name: string; email: string } | null;
  rider: { id: string; user: { name: string } } | null;
}

export interface OrderStatusEvent {
  status: OrderStatus;
  note: string | null;
  createdAt: string;
}

export interface TrackedOrder {
  id: string;
  status: OrderStatus;
  recipientName: string;
  dropoffAddress: string;
  dropoffLat: number | null;
  dropoffLng: number | null;
  hasInsurance: boolean;
  createdAt: string;
  updatedAt: string;
  statusEvents: OrderStatusEvent[];
}

export interface SavedAddress {
  id: string;
  label: string;
  address: string;
  lat: number | null;
  lng: number | null;
  createdAt: string;
}

export interface RiderProfile {
  id: string;
  userId: string;
  vehicleType: string | null;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AdminRider extends RiderProfile {
  user: { id: string; name: string; email: string; phone: string | null };
  deliveredToday: number;
}

export interface Payment {
  id: string;
  orderId: string;
  amount: string;
  method: string;
  remittedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AdminPayment extends Payment {
  order: { id: string; recipientName: string; codAmount: string | null };
}

export interface AdminManifest {
  id: string;
  organizationId: string;
  createdAt: string;
  organization: { name: string };
  orders: { id: string; recipientName: string; status: OrderStatus; price: string }[];
}

export interface RiderPerformance {
  riderId: string;
  name: string;
  assigned: number;
  delivered: number;
  completionRate: number;
}

export interface AdminAnalytics {
  totalOrders: number;
  deliveredOrders: number;
  cancelledOrders: number;
  deliverySuccessRate: number;
  avgDeliveryMinutes: number | null;
  codCollected: string | number;
  codRemitted: string | number;
  riderPerformance: RiderPerformance[];
}

export interface RiderEarnings {
  today: string | number;
  thisWeek: string | number;
}

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  PENDING: 'Pending',
  PICKED_UP: 'Picked Up',
  IN_TRANSIT: 'In Transit',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled',
};
