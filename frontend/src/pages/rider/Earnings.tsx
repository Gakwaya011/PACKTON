import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { apiFetch } from '../../lib/api';
import { formatRwf } from '../../lib/pricing';
import type { RiderEarnings } from '../../lib/types';

export default function Earnings() {
  const { t } = useTranslation('rider');
  const [earnings, setEarnings] = useState<RiderEarnings | null>(null);

  useEffect(() => {
    apiFetch<RiderEarnings>('/rider/earnings').then(setEarnings).catch(() => undefined);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="bg-white rounded-2xl border border-brand-light/10 shadow-sm p-6">
        <p className="text-xs font-bold text-brand-light uppercase tracking-wide">{t('home.today')}</p>
        <p className="text-3xl font-semibold text-brand-dark mt-1">
          {earnings ? formatRwf(Number(earnings.today)) : '—'}
        </p>
      </div>
      <div className="bg-white rounded-2xl border border-brand-light/10 shadow-sm p-6">
        <p className="text-xs font-bold text-brand-light uppercase tracking-wide">{t('home.thisWeek')}</p>
        <p className="text-3xl font-semibold text-brand-dark mt-1">
          {earnings ? formatRwf(Number(earnings.thisWeek)) : '—'}
        </p>
      </div>
    </div>
  );
}
