import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { apiFetch, ApiError } from '../../lib/api';
import { formatRwf } from '../../lib/pricing';
import type { AdminManifest } from '../../lib/types';

export default function AdminManifests() {
  const { t } = useTranslation(['admin', 'common']);
  const [manifests, setManifests] = useState<AdminManifest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    apiFetch<AdminManifest[]>('/admin/manifests')
      .then(setManifests)
      .catch((err) => setError(err instanceof ApiError ? err.message : t('manifests.loadError')))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {loading && <p className="text-sm text-brand-mid">{t('manifests.loading')}</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}
      {!loading && !error && manifests.length === 0 && (
        <p className="text-sm text-brand-mid bg-white rounded-2xl border border-brand-light/10 p-6">
          {t('manifests.empty')}
        </p>
      )}

      {manifests.map((manifest) => (
        <div key={manifest.id} className="bg-white rounded-2xl border border-brand-light/10 shadow-sm overflow-hidden">
          <button
            type="button"
            onClick={() => setExpanded(expanded === manifest.id ? null : manifest.id)}
            className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-brand-ultra/60 transition-colors"
          >
            <div>
              <p className="font-bold text-brand-dark">{manifest.organization.name}</p>
              <p className="text-xs text-brand-light mt-0.5">{new Date(manifest.createdAt).toLocaleString()}</p>
            </div>
            <span className="text-xs font-bold text-brand-orange uppercase tracking-wide">
              {t('manifests.ordersCount', { count: manifest.orders.length })}
            </span>
          </button>

          {expanded === manifest.id && (
            <table className="w-full text-sm border-t border-brand-light/10">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wide text-brand-light">
                  <th className="px-6 py-3 font-bold">{t('manifests.table.recipient')}</th>
                  <th className="px-6 py-3 font-bold">{t('manifests.table.status')}</th>
                  <th className="px-6 py-3 font-bold">{t('manifests.table.price')}</th>
                </tr>
              </thead>
              <tbody>
                {manifest.orders.map((order) => (
                  <tr key={order.id} className="border-t border-brand-light/5">
                    <td className="px-6 py-3">{order.recipientName}</td>
                    <td className="px-6 py-3">{t(`orderStatus.${order.status}`, { ns: 'common' })}</td>
                    <td className="px-6 py-3">{formatRwf(Number(order.price))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ))}
    </div>
  );
}
