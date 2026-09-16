const BASE_FARE_RWF = 1000;
const PER_KM_RWF = 300;
/** Straight-line distance underestimates actual road distance; nudge it up. */
const ROAD_DISTANCE_FACTOR = 1.3;
const EARTH_RADIUS_KM = 6371;
const INSURANCE_RATE = 0.02;
const MIN_INSURANCE_FEE_RWF = 300;

export interface Coordinates {
  lat: number;
  lng: number;
}

function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

export function haversineDistanceKm(a: Coordinates, b: Coordinates): number {
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));

  return EARTH_RADIUS_KM * c;
}

export function estimatePrice(pickup: Coordinates, dropoff: Coordinates): number {
  const distanceKm = haversineDistanceKm(pickup, dropoff) * ROAD_DISTANCE_FACTOR;
  const price = BASE_FARE_RWF + distanceKm * PER_KM_RWF;
  return Math.round(price / 50) * 50;
}

export function formatRwf(amount: number): string {
  return `RWF ${Math.round(amount).toLocaleString('en-US')}`;
}

export function estimateInsuranceFee(price: number): number {
  const fee = Math.max(price * INSURANCE_RATE, MIN_INSURANCE_FEE_RWF);
  return Math.round(fee / 50) * 50;
}
