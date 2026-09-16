import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { apiFetch, ApiError } from '../../lib/api';
import { formatRwf } from '../../lib/pricing';
import type { AdminPayment } from '../../lib/types';

export default function AdminPayments() {
  const { t } = useTranslation('admin');
  const [payments, setPayments] = useState<AdminPayment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiFetch<AdminPayment[]>('/admin/payments')
      .then(setPayments)
      .catch((err) => setError(err instanceof ApiError ? err.message : t('payments.loadError')))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-brand-light/10 shadow-sm overflow-x-auto">
      {loading && <p className="text-sm text-brand-mid p-6">{t('payments.loading')}</p>}
      {error && <p className="text-sm text-red-600 p-6">{error}</p>}
      {!loading && !error && payments.length === 0 && (
        <p className="text-sm text-brand-mid p-6">{t('payments.empty')}</p>
      )}
      {!loading && payments.length > 0 && (
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wide text-brand-light border-b border-brand-light/10">
              <th className="px-6 py-4 font-bold">{t('payments.table.recipient')}</th>
              <th className="px-6 py-4 font-bold">{t('payments.table.amount')}</th>
              <th className="px-6 py-4 font-bold">{t('payments.table.method')}</th>
              <th className="px-6 py-4 font-bold">{t('payments.table.status')}</th>
              <th className="px-6 py-4 font-bold">{t('payments.table.recorded')}</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id} className="border-b border-brand-light/5 last:border-0">
                <td className="px-6 py-4 font-bold text-brand-dark">{payment.order.recipientName}</td>
                <td className="px-6 py-4">{formatRwf(Number(payment.amount))}</td>
                <td className="px-6 py-4 text-brand-mid">{payment.method}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-bold uppercase ${payment.remittedAt ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {payment.remittedAt ? t('payments.remitted') : t('payments.pending')}
                  </span>
                </td>
                <td className="px-6 py-4 text-brand-light text-xs">{new Date(payment.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
