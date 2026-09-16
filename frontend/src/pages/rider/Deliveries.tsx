import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { apiFetch, ApiError } from '../../lib/api';
import { formatRwf } from '../../lib/pricing';
import type { Order, OrderStatus } from '../../lib/types';
import StatusBadge from '../../components/StatusBadge';

const NEXT_STATUS: Partial<Record<OrderStatus, OrderStatus>> = {
  PENDING: 'PICKED_UP',
  PICKED_UP: 'IN_TRANSIT',
  IN_TRANSIT: 'DELIVERED',
};

export default function Deliveries() {
  const { t } = useTranslation(['rider', 'common']);

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);

  const loadOrders = () => {
    setLoading(true);
    apiFetch<Order[]>('/rider/orders')
      .then(setOrders)
      .catch((err) => setError(err instanceof ApiError ? err.message : t('home.loadError')))
      .finally(() => setLoading(false));
  };

  useEffect(loadOrders, [t]);

  const handleAdvanceStatus = async (order: Order) => {
    const next = NEXT_STATUS[order.status];
    if (!next) return;

    setUpdating(order.id);
    try {
      await apiFetch(`/orders/${order.id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status: next }),
      });
      loadOrders();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : t('home.statusUpdateError'));
    } finally {
      setUpdating(null);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-brand-light/10 shadow-sm p-6 md:p-8">
      <h2 className="text-lg font-extrabold text-brand-dark uppercase tracking-tight mb-6">{t('home.assignedDeliveries')}</h2>

      {loading && <p className="text-sm text-brand-mid">{t('home.loading')}</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}
      {!loading && !error && orders.length === 0 && (
        <p className="text-sm text-brand-mid">{t('home.empty')}</p>
      )}

      <div className="flex flex-col divide-y divide-brand-light/10">
        {orders.map((order) => {
          const next = NEXT_STATUS[order.status];
          return (
            <div key={order.id} className="py-4 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-bold text-brand-dark">{order.recipientName}</p>
                  <p className="text-xs text-brand-mid mt-1">{order.pickupAddress} → {order.dropoffAddress}</p>
                  {order.codAmount && (
                    <p className="text-xs text-brand-orange font-bold mt-1">
                      {t('home.collectCod', { amount: formatRwf(Number(order.codAmount)) })}
                    </p>
                  )}
                </div>
                <StatusBadge status={order.status} />
              </div>
              <div className="flex gap-3">
                {next && (
                  <button
                    type="button"
                    onClick={() => handleAdvanceStatus(order)}
                    disabled={updating === order.id}
                    className="bg-brand-dark text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-brand-orange transition-colors disabled:opacity-60"
                  >
                    {updating === order.id ? t('home.updating') : t('home.markStatus', { status: t(`orderStatus.${next}`, { ns: 'common' }) })}
                  </button>
                )}
                {order.status === 'IN_TRANSIT' && (
                  <Link
                    to={`/rider/orders/${order.id}/pod`}
                    className="border border-brand-dark text-brand-dark px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-brand-dark hover:text-white transition-colors"
                  >
                    {t('home.captureProof')}
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
