import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { apiFetch, ApiError } from '../../lib/api';
import { formatRwf } from '../../lib/pricing';
import type { AdminAnalytics as AdminAnalyticsData } from '../../lib/types';

function StatTile({ label, value, accent }: { label: string; value: string; accent?: 'good' | 'critical' }) {
  return (
    <div className="bg-white rounded-2xl border border-brand-light/10 shadow-sm p-6 flex flex-col gap-2">
      <p className="text-xs font-bold text-brand-light uppercase tracking-wide">{label}</p>
      <p
        className={`text-3xl font-semibold tracking-tight ${
          accent === 'good' ? 'text-emerald-600' : accent === 'critical' ? 'text-red-600' : 'text-brand-dark'
        }`}
      >
        {value}
      </p>
    </div>
  );
}

export default function AdminAnalytics() {
  const { t } = useTranslation('admin');
  const [data, setData] = useState<AdminAnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiFetch<AdminAnalyticsData>('/admin/analytics')
      .then(setData)
      .catch((err) => setError(err instanceof ApiError ? err.message : t('analytics.loadError')))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <p className="text-sm text-brand-mid">{t('analytics.loading')}</p>;
  if (error) return <p className="text-sm text-red-600">{error}</p>;
  if (!data) return null;

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <StatTile label={t('analytics.totalOrders')} value={data.totalOrders.toLocaleString('en-US')} />
        <StatTile label={t('analytics.delivered')} value={data.deliveredOrders.toLocaleString('en-US')} accent="good" />
        <StatTile label={t('analytics.cancelled')} value={data.cancelledOrders.toLocaleString('en-US')} accent="critical" />
        <StatTile label={t('analytics.deliverySuccessRate')} value={`${data.deliverySuccessRate.toFixed(1)}%`} />
        <StatTile
          label={t('analytics.avgPickupToDelivery')}
          value={data.avgDeliveryMinutes != null ? t('analytics.avgMinutesValue', { minutes: Math.round(data.avgDeliveryMinutes) }) : t('analytics.avgMinutesFallback')}
        />
        <StatTile
          label={t('analytics.codCollectedRemitted')}
          value={`${formatRwf(Number(data.codCollected))} / ${formatRwf(Number(data.codRemitted))}`}
        />
      </div>

      <div className="bg-white rounded-2xl border border-brand-light/10 shadow-sm p-6 md:p-8">
        <h2 className="text-lg font-extrabold text-brand-dark uppercase tracking-tight mb-6">{t('analytics.riderPerformanceHeading')}</h2>

        {data.riderPerformance.length === 0 && (
          <p className="text-sm text-brand-mid">{t('analytics.noRiders')}</p>
        )}

        <div className="flex flex-col gap-5">
          {data.riderPerformance.map((rider) => (
            <div key={rider.riderId} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="font-bold text-brand-dark">{rider.name}</span>
                <span className="text-brand-mid text-xs">
                  {t('analytics.riderStats', { delivered: rider.delivered, assigned: rider.assigned, rate: rider.completionRate.toFixed(0) })}
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-brand-orange/15 overflow-hidden">
                <div
                  className="h-full rounded-full bg-brand-orange transition-all"
                  style={{ width: `${Math.min(rider.completionRate, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
