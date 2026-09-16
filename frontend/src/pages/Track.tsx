import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { apiFetch, ApiError } from '../lib/api';
import { MAPBOX_TOKEN, isMapboxConfigured } from '../lib/mapbox';
import type { OrderStatus, TrackedOrder } from '../lib/types';
import StatusBadge from '../components/StatusBadge';

const TIMELINE_STEPS: OrderStatus[] = ['PENDING', 'PICKED_UP', 'IN_TRANSIT', 'DELIVERED'];

function staticMapUrl(lat: number, lng: number): string {
  return `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/pin-s+E8520A(${lng},${lat})/${lng},${lat},13,0/600x240@2x?access_token=${MAPBOX_TOKEN}`;
}

export default function Track() {
  const { t } = useTranslation(['portal', 'common']);
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<TrackedOrder | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) return;
    apiFetch<TrackedOrder>(`/orders/${orderId}/track`, { skipAuth: true })
      .then(setOrder)
      .catch((err) => setError(err instanceof ApiError ? err.message : t('track.errorDefault')))
      .finally(() => setLoading(false));
  }, [orderId]);

  return (
    <div className="min-h-screen bg-brand-ultra pt-28 pb-20 px-[6%]">
      <div className="max-w-2xl mx-auto">
        <p className="text-brand-orange font-bold text-xs uppercase tracking-[0.2em] mb-2">{t('track.eyebrow')}</p>
        <h1 className="text-3xl md:text-4xl font-black text-brand-dark tracking-tighter mb-8">
          {orderId ? t('track.heading', { orderId: orderId.slice(-8).toUpperCase() }) : t('track.headingDefault')}
        </h1>

        {loading && <p className="text-sm text-brand-mid">{t('track.loading')}</p>}
        {error && (
          <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-4">{error}</p>
        )}

        {order && (
          <div className="bg-white rounded-2xl border border-brand-light/10 shadow-sm p-6 md:p-10 flex flex-col gap-8">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <p className="text-xs text-brand-light uppercase tracking-wide">{t('track.recipientLabel')}</p>
                <p className="font-bold text-brand-dark text-lg">{order.recipientName}</p>
              </div>
              <div className="flex items-center gap-2">
                {order.hasInsurance && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border bg-brand-teal/10 text-brand-teal border-brand-teal/20">
                    {t('track.insuredBadge')}
                  </span>
                )}
                <StatusBadge status={order.status} />
              </div>
            </div>

            <div>
              <p className="text-xs text-brand-light uppercase tracking-wide mb-1">{t('track.dropoffAddressLabel')}</p>
              <p className="text-brand-dark">{order.dropoffAddress}</p>
            </div>

            {isMapboxConfigured && order.dropoffLat != null && order.dropoffLng != null && (
              <img
                src={staticMapUrl(order.dropoffLat, order.dropoffLng)}
                alt={t('track.mapAlt')}
                className="w-full h-48 object-cover rounded-lg border border-brand-light/20"
              />
            )}

            {order.status !== 'CANCELLED' && (
              <div className="flex items-center justify-between relative">
                {TIMELINE_STEPS.map((step, i) => {
                  const currentIndex = TIMELINE_STEPS.indexOf(order.status);
                  const reached = currentIndex >= i;
                  return (
                    <div key={step} className="flex-1 flex flex-col items-center relative">
                      {i > 0 && (
                        <div
                          className={`absolute right-1/2 top-3 h-0.5 w-full -z-0 ${
                            reached ? 'bg-brand-orange' : 'bg-brand-light/20'
                          }`}
                        />
                      )}
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center z-10 border-2 ${
                          reached
                            ? 'bg-brand-orange border-brand-orange'
                            : 'bg-white border-brand-light/30'
                        }`}
                      >
                        {reached && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                      <p className={`text-[10px] font-bold uppercase tracking-wide mt-2 text-center ${reached ? 'text-brand-dark' : 'text-brand-light'}`}>
                        {t(`orderStatus.${step}`, { ns: 'common' })}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="border-t border-brand-light/10 pt-6">
              <p className="text-xs text-brand-light uppercase tracking-wide mb-3">{t('track.historyLabel')}</p>
              <div className="flex flex-col gap-3">
                {order.statusEvents.map((event, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className="font-bold text-brand-dark">{t(`orderStatus.${event.status}`, { ns: 'common' })}</span>
                    <span className="text-brand-light">{new Date(event.createdAt).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
