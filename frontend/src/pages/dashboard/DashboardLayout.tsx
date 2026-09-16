import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import DashboardSidebar from '../../components/DashboardSidebar';

export default function DashboardLayout() {
  const { t } = useTranslation('portal');
  const { user } = useAuth();

  const items = [
    { label: t('dashboard.sidebarOverview'), path: '/dashboard', end: true },
    { label: t('dashboard.sidebarNewDelivery'), path: '/dashboard/deliveries/new' },
    { label: t('dashboard.sidebarSavedAddresses'), path: '/dashboard/addresses' },
  ];

  return (
    <div className="min-h-screen bg-brand-ultra">
      <DashboardSidebar
        title={t('dashboard.eyebrow')}
        heading={user ? t('dashboard.welcomeName', { name: user.name.split(' ')[0] }) : t('dashboard.welcome')}
        items={items}
      />

      <div className="pb-20 px-[6%] lg:pt-28 lg:pl-80">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
