export const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN as string | undefined;

export const isMapboxConfigured = Boolean(MAPBOX_TOKEN);

export interface GeocodeResult {
  placeName: string;
  lat: number;
  lng: number;
}

export async function geocode(query: string): Promise<GeocodeResult[]> {
  if (!MAPBOX_TOKEN || !query.trim()) return [];

  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    query
  )}.json?access_token=${MAPBOX_TOKEN}&autocomplete=true&limit=5`;

  const res = await fetch(url);
  if (!res.ok) return [];

  const data = (await res.json()) as {
    features: { place_name: string; center: [number, number] }[];
  };

  return data.features.map((f) => ({
    placeName: f.place_name,
    lng: f.center[0],
    lat: f.center[1],
  }));
}

export async function reverseGeocode(lat: number, lng: number): Promise<string | null> {
  if (!MAPBOX_TOKEN) return null;

  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${MAPBOX_TOKEN}&limit=1`;
  const res = await fetch(url);
  if (!res.ok) return null;

  const data = (await res.json()) as { features: { place_name: string }[] };
  return data.features[0]?.place_name ?? null;
}
