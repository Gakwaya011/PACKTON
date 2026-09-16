import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { apiFetch } from '../../lib/api';
import type { RiderProfile } from '../../lib/types';
import DashboardSidebar from '../../components/DashboardSidebar';

export default function RiderLayout() {
  const { t } = useTranslation('rider');
  const { user } = useAuth();

  const [isAvailable, setIsAvailable] = useState(false);
  const [togglingAvailability, setTogglingAvailability] = useState(false);

  useEffect(() => {
    apiFetch<RiderProfile>('/rider/me').then((r) => setIsAvailable(r.isAvailable)).catch(() => undefined);
  }, []);

  const handleToggleAvailability = async () => {
    setTogglingAvailability(true);
    try {
      const updated = await apiFetch<{ isAvailable: boolean }>('/rider/availability', {
        method: 'PATCH',
        body: JSON.stringify({ isAvailable: !isAvailable }),
      });
      setIsAvailable(updated.isAvailable);
    } catch {
      // leave state as-is; the toggle simply won't have visibly moved
    } finally {
      setTogglingAvailability(false);
    }
  };

  const items = [
    { label: t('home.sidebarDeliveries'), path: '/rider', end: true },
    { label: t('home.sidebarEarnings'), path: '/rider/earnings' },
  ];

  const availabilityToggle = (
    <button
      type="button"
      onClick={handleToggleAvailability}
      disabled={togglingAvailability}
      className={`px-5 py-3 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors disabled:opacity-60 ${
        isAvailable ? 'bg-emerald-600 text-white' : 'bg-brand-dark text-white'
      }`}
    >
      {isAvailable ? t('home.availableForJobs') : t('home.offline')}
    </button>
  );

  return (
    <div className="min-h-screen bg-brand-ultra">
      <DashboardSidebar
        title={t('home.eyebrow')}
        heading={user ? t('home.greeting', { name: user.name.split(' ')[0] }) : t('home.defaultHeading')}
        items={items}
        headerExtra={availabilityToggle}
      />

      <div className="pb-20 px-[6%] lg:pt-28 lg:pl-80">
        <div className="max-w-4xl mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
