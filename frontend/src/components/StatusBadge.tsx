import { useTranslation } from 'react-i18next';
import type { OrderStatus } from '../lib/types';

const STATUS_STYLES: Record<OrderStatus, string> = {
  PENDING: 'bg-amber-50 text-amber-700 border-amber-200',
  PICKED_UP: 'bg-blue-50 text-blue-700 border-blue-200',
  IN_TRANSIT: 'bg-brand-orange/10 text-brand-orange border-brand-orange/20',
  DELIVERED: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  CANCELLED: 'bg-red-50 text-red-700 border-red-200',
};

export default function StatusBadge({ status }: { status: OrderStatus }) {
  const { t } = useTranslation('common');
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${STATUS_STYLES[status]}`}
    >
      {t(`orderStatus.${status}`)}
    </span>
  );
}
