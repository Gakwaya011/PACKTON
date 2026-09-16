import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { apiFetch, ApiError } from '../../lib/api';
import { formatRwf } from '../../lib/pricing';
import type { AdminOrder, AdminRider, OrderStatus } from '../../lib/types';
import StatusBadge from '../../components/StatusBadge';

const STATUS_FILTERS: (OrderStatus | 'ALL')[] = ['ALL', 'PENDING', 'PICKED_UP', 'IN_TRANSIT', 'DELIVERED', 'CANCELLED'];

export default function AdminOrders() {
  const { t } = useTranslation(['admin', 'common']);
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [riders, setRiders] = useState<AdminRider[]>([]);
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'ALL'>('ALL');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [assigning, setAssigning] = useState<string | null>(null);

  const loadOrders = (status: OrderStatus | 'ALL') => {
    setLoading(true);
    const query = status === 'ALL' ? '' : `?status=${status}`;
    apiFetch<AdminOrder[]>(`/admin/orders${query}`)
      .then(setOrders)
      .catch((err) => setError(err instanceof ApiError ? err.message : t('orders.loadError')))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadOrders(statusFilter);
    apiFetch<AdminRider[]>('/admin/riders')
      .then(setRiders)
      .catch(() => undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter]);

  const handleAssign = async (orderId: string, riderId: string) => {
    if (!riderId) return;
    setAssigning(orderId);
    try {
      const updated = await apiFetch<AdminOrder>(`/admin/orders/${orderId}/assign`, {
        method: 'PATCH',
        body: JSON.stringify({ riderId }),
      });
      setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, ...updated } : o)));
    } catch (err) {
      setError(err instanceof ApiError ? err.message : t('orders.assignError'));
    } finally {
      setAssigning(null);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-2 flex-wrap">
        {STATUS_FILTERS.map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-full border transition-colors ${
              statusFilter === status
                ? 'bg-brand-dark text-white border-brand-dark'
                : 'bg-white text-brand-mid border-brand-light/30 hover:border-brand-dark'
            }`}
          >
            {status === 'ALL' ? t('orders.filterAll') : t(`orderStatus.${status}`, { ns: 'common' })}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-brand-light/10 shadow-sm overflow-x-auto">
        {loading && <p className="text-sm text-brand-mid p-6">{t('orders.loading')}</p>}
        {error && <p className="text-sm text-red-600 p-6">{error}</p>}
        {!loading && !error && orders.length === 0 && (
          <p className="text-sm text-brand-mid p-6">{t('orders.empty')}</p>
        )}
        {!loading && orders.length > 0 && (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-brand-light border-b border-brand-light/10">
                <th className="px-6 py-4 font-bold">{t('orders.table.recipient')}</th>
                <th className="px-6 py-4 font-bold">{t('orders.table.sender')}</th>
                <th className="px-6 py-4 font-bold">{t('orders.table.price')}</th>
                <th className="px-6 py-4 font-bold">{t('orders.table.status')}</th>
                <th className="px-6 py-4 font-bold">{t('orders.table.rider')}</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-brand-light/5 last:border-0">
                  <td className="px-6 py-4">
                    <p className="font-bold text-brand-dark">{order.recipientName}</p>
                    <p className="text-xs text-brand-light mt-0.5">{order.dropoffAddress}</p>
                  </td>
                  <td className="px-6 py-4 text-brand-mid">{order.sender?.name ?? t('orders.senderFallback')}</td>
                  <td className="px-6 py-4 font-bold text-brand-dark">{formatRwf(Number(order.price))}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={order.riderId ?? ''}
                      disabled={assigning === order.id}
                      onChange={(e) => handleAssign(order.id, e.target.value)}
                      className="text-xs border border-brand-light/30 rounded-lg px-2 py-1.5 bg-brand-ultra"
                    >
                      <option value="">{t('orders.unassigned')}</option>
                      {riders.map((r) => (
                        <option key={r.id} value={r.id}>{r.user.name}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
