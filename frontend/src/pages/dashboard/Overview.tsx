import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { apiFetch, ApiError } from '../../lib/api';
import { formatRwf } from '../../lib/pricing';
import type { Order } from '../../lib/types';
import StatusBadge from '../../components/StatusBadge';

export default function Overview() {
  const { t } = useTranslation('portal');

  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [ordersError, setOrdersError] = useState<string | null>(null);

  useEffect(() => {
    apiFetch<Order[]>('/orders')
      .then(setOrders)
      .catch((err) => setOrdersError(err instanceof ApiError ? err.message : t('dashboard.ordersErrorDefault')))
      .finally(() => setOrdersLoading(false));
  }, [t]);

  return (
    <div className="bg-white rounded-2xl border border-brand-light/10 shadow-sm p-6 md:p-8">
      <h2 className="text-lg font-extrabold text-brand-dark uppercase tracking-tight mb-6">{t('dashboard.orderHistoryHeading')}</h2>

      {ordersLoading && <p className="text-sm text-brand-mid">{t('dashboard.loadingOrders')}</p>}
      {ordersError && <p className="text-sm text-red-600">{ordersError}</p>}
      {!ordersLoading && !ordersError && orders.length === 0 && (
        <p className="text-sm text-brand-mid">
          {t('dashboard.noDeliveries')}{' '}
          <Link to="/dashboard/deliveries/new" className="text-brand-orange font-bold hover:underline">
            {t('dashboard.requestFirstDelivery')}
          </Link>
          .
        </p>
      )}

      <div className="flex flex-col divide-y divide-brand-light/10">
        {orders.map((order) => (
          <Link
            key={order.id}
            to={`/track/${order.id}`}
            className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 hover:bg-brand-ultra/60 -mx-2 px-2 rounded-lg transition-colors"
          >
            <div>
              <p className="font-bold text-brand-dark flex items-center gap-2">
                {order.recipientName}
                {order.hasInsurance && (
                  <span className="text-[10px] font-bold uppercase tracking-wide text-brand-teal bg-brand-teal/10 border border-brand-teal/20 rounded-full px-2 py-0.5">
                    {t('dashboard.insuredBadge')}
                  </span>
                )}
              </p>
              <p className="text-xs text-brand-mid mt-1">
                {order.pickupAddress} → {order.dropoffAddress}
              </p>
              <p className="text-xs text-brand-light mt-1">
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-brand-dark">{formatRwf(Number(order.price))}</span>
              <StatusBadge status={order.status} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
