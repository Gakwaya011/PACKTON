import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import DashboardSidebar from '../../components/DashboardSidebar';

export default function AdminLayout() {
  const { t } = useTranslation('admin');

  const items = [
    { label: t('layout.tabs.orders'), path: '/admin', end: true },
    { label: t('layout.tabs.riders'), path: '/admin/riders' },
    { label: t('layout.tabs.payments'), path: '/admin/payments' },
    { label: t('layout.tabs.manifests'), path: '/admin/manifests' },
    { label: t('layout.tabs.analytics'), path: '/admin/analytics' },
  ];

  return (
    <div className="min-h-screen bg-brand-ultra">
      <DashboardSidebar title={t('layout.eyebrow')} heading={t('layout.heading')} items={items} />

      <div className="pb-20 px-[6%] lg:pt-28 lg:pl-80">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
