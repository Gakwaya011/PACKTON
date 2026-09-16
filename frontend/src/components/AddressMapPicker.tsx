import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useTranslation } from 'react-i18next';
import { MAPBOX_TOKEN, isMapboxConfigured, geocode, reverseGeocode, type GeocodeResult } from '../lib/mapbox';

export interface AddressValue {
  address: string;
  lat?: number;
  lng?: number;
}

interface Props {
  label: string;
  value: AddressValue;
  onChange: (value: AddressValue) => void;
}

const DEFAULT_CENTER: [number, number] = [30.0619, -1.9441]; // Kigali, Rwanda

function hasCoords(value: AddressValue): value is AddressValue & { lat: number; lng: number } {
  return typeof value.lat === 'number' && typeof value.lng === 'number';
}

export default function AddressMapPicker({ label, value, onChange }: Props) {
  const { t } = useTranslation('portal');
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const [query, setQuery] = useState(value.address);
  const [suggestions, setSuggestions] = useState<GeocodeResult[]>([]);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    if (!isMapboxConfigured || !mapContainerRef.current || mapRef.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN ?? '';
    const initialCenter: [number, number] = hasCoords(value) ? [value.lng, value.lat] : DEFAULT_CENTER;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: initialCenter,
      zoom: hasCoords(value) ? 14 : 12,
    });
    mapRef.current = map;

    const marker = new mapboxgl.Marker({ draggable: true, color: '#E8520A' })
      .setLngLat(initialCenter)
      .addTo(map);
    markerRef.current = marker;

    const handleMove = async (lng: number, lat: number) => {
      marker.setLngLat([lng, lat]);
      const placeName = await reverseGeocode(lat, lng);
      if (placeName) setQuery(placeName);
      onChange({ address: placeName ?? query, lat, lng });
    };

    marker.on('dragend', () => {
      const { lng, lat } = marker.getLngLat();
      void handleMove(lng, lat);
    });

    map.on('click', (e) => {
      void handleMove(e.lngLat.lng, e.lngLat.lat);
    });

    return () => {
      map.remove();
      mapRef.current = null;
      markerRef.current = null;
    };
    // Map is created once; subsequent value changes are driven imperatively via marker/flyTo.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!query.trim() || query === value.address) {
      setSuggestions([]);
      return;
    }
    setSearching(true);
    const timeout = setTimeout(() => {
      geocode(query)
        .then(setSuggestions)
        .finally(() => setSearching(false));
    }, 350);
    return () => clearTimeout(timeout);
  }, [query, value.address]);

  const selectSuggestion = (result: GeocodeResult) => {
    setQuery(result.placeName);
    setSuggestions([]);
    onChange({ address: result.placeName, lat: result.lat, lng: result.lng });

    if (mapRef.current && markerRef.current) {
      mapRef.current.flyTo({ center: [result.lng, result.lat], zoom: 15 });
      markerRef.current.setLngLat([result.lng, result.lat]);
    }
  };

  if (!isMapboxConfigured) {
    return (
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-brand-dark uppercase tracking-wide">{label}</label>
        <input
          type="text"
          required
          value={value.address}
          onChange={(e) => onChange({ address: e.target.value })}
          placeholder={t('addressPicker.enterAddressPlaceholder')}
          className="px-4 py-3 border border-brand-light/30 rounded-lg focus:outline-none focus:border-brand-orange bg-white"
        />
        <p className="text-xs text-brand-light">{t('addressPicker.unavailable')}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-bold text-brand-dark uppercase tracking-wide">{label}</label>
      <div className="relative">
        <input
          type="text"
          required
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('addressPicker.searchPlaceholder')}
          className="w-full px-4 py-3 border border-brand-light/30 rounded-lg focus:outline-none focus:border-brand-orange bg-white"
        />
        {searching && <p className="absolute right-3 top-3 text-xs text-brand-light">{t('addressPicker.searching')}</p>}
        {suggestions.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border border-brand-light/20 rounded-lg mt-1 shadow-lg max-h-48 overflow-y-auto">
            {suggestions.map((s) => (
              <li key={`${s.lat}-${s.lng}`}>
                <button
                  type="button"
                  onClick={() => selectSuggestion(s)}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-brand-ultra"
                >
                  {s.placeName}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div ref={mapContainerRef} className="w-full h-56 rounded-lg overflow-hidden border border-brand-light/20" />
      <p className="text-xs text-brand-light">{t('addressPicker.helperText')}</p>
    </div>
  );
}
