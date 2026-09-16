import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { apiFetch, ApiError } from '../../lib/api';
import type { AdminRider, CreateUserResult, Role } from '../../lib/types';

export default function AdminRiders() {
  const { t } = useTranslation('admin');
  const [riders, setRiders] = useState<AdminRider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [userId, setUserId] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  const [newUser, setNewUser] = useState({ name: '', email: '', phone: '', vehicleType: '' });
  const [newUserRole, setNewUserRole] = useState<Extract<Role, 'CUSTOMER' | 'RIDER'>>('RIDER');
  const [creatingUser, setCreatingUser] = useState(false);
  const [createUserError, setCreateUserError] = useState<string | null>(null);
  const [createUserResult, setCreateUserResult] = useState<CreateUserResult | null>(null);

  const loadRiders = () => {
    setLoading(true);
    apiFetch<AdminRider[]>('/admin/riders')
      .then(setRiders)
      .catch((err) => setError(err instanceof ApiError ? err.message : t('riders.loadError')))
      .finally(() => setLoading(false));
  };

  useEffect(loadRiders, []);

  const handlePromote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId.trim()) return;

    setCreating(true);
    setCreateError(null);
    try {
      await apiFetch('/admin/riders', {
        method: 'POST',
        body: JSON.stringify({ userId, vehicleType: vehicleType || undefined }),
      });
      setUserId('');
      setVehicleType('');
      loadRiders();
    } catch (err) {
      setCreateError(err instanceof ApiError ? err.message : t('riders.createError'));
    } finally {
      setCreating(false);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.name.trim() || !newUser.email.trim()) return;

    setCreatingUser(true);
    setCreateUserError(null);
    setCreateUserResult(null);
    try {
      const result = await apiFetch<CreateUserResult>('/admin/users', {
        method: 'POST',
        body: JSON.stringify({
          name: newUser.name,
          email: newUser.email,
          phone: newUser.phone || undefined,
          role: newUserRole,
          vehicleType: newUserRole === 'RIDER' ? newUser.vehicleType || undefined : undefined,
        }),
      });
      setCreateUserResult(result);
      setNewUser({ name: '', email: '', phone: '', vehicleType: '' });
      if (newUserRole === 'RIDER') loadRiders();
    } catch (err) {
      setCreateUserError(err instanceof ApiError ? err.message : t('riders.createUser.error'));
    } finally {
      setCreatingUser(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 bg-white rounded-2xl border border-brand-light/10 shadow-sm overflow-x-auto h-fit">
        {loading && <p className="text-sm text-brand-mid p-6">{t('riders.loading')}</p>}
        {error && <p className="text-sm text-red-600 p-6">{error}</p>}
        {!loading && !error && riders.length === 0 && (
          <p className="text-sm text-brand-mid p-6">{t('riders.empty')}</p>
        )}
        {!loading && riders.length > 0 && (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-brand-light border-b border-brand-light/10">
                <th className="px-6 py-4 font-bold">{t('riders.table.name')}</th>
                <th className="px-6 py-4 font-bold">{t('riders.table.contact')}</th>
                <th className="px-6 py-4 font-bold">{t('riders.table.vehicle')}</th>
                <th className="px-6 py-4 font-bold">{t('riders.table.available')}</th>
                <th className="px-6 py-4 font-bold">{t('riders.table.deliveredToday')}</th>
              </tr>
            </thead>
            <tbody>
              {riders.map((rider) => (
                <tr key={rider.id} className="border-b border-brand-light/5 last:border-0">
                  <td className="px-6 py-4 font-bold text-brand-dark">{rider.user.name}</td>
                  <td className="px-6 py-4 text-brand-mid">
                    {rider.user.email}
                    {rider.user.phone && <span className="block text-xs text-brand-light">{rider.user.phone}</span>}
                  </td>
                  <td className="px-6 py-4 text-brand-mid">{rider.vehicleType ?? t('riders.vehicleFallback')}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-bold uppercase ${rider.isAvailable ? 'text-emerald-600' : 'text-brand-light'}`}>
                      {rider.isAvailable ? t('riders.available') : t('riders.offline')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-brand-dark font-bold">{rider.deliveredToday}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="flex flex-col gap-6">
        <div className="bg-white rounded-2xl border border-brand-light/10 shadow-sm p-6">
          <h2 className="text-lg font-extrabold text-brand-dark uppercase tracking-tight mb-2">{t('riders.createUser.heading')}</h2>
          <p className="text-xs text-brand-light mb-6">{t('riders.createUser.help')}</p>
          <form onSubmit={handleCreateUser} className="flex flex-col gap-3">
            <input
              type="text"
              placeholder={t('riders.createUser.namePlaceholder')}
              value={newUser.name}
              onChange={(e) => setNewUser((prev) => ({ ...prev, name: e.target.value }))}
              className="px-3 py-2.5 text-sm border border-brand-light/30 rounded-lg focus:outline-none focus:border-brand-orange bg-brand-ultra"
            />
            <input
              type="email"
              placeholder={t('riders.createUser.emailPlaceholder')}
              value={newUser.email}
              onChange={(e) => setNewUser((prev) => ({ ...prev, email: e.target.value }))}
              className="px-3 py-2.5 text-sm border border-brand-light/30 rounded-lg focus:outline-none focus:border-brand-orange bg-brand-ultra"
            />
            <input
              type="tel"
              placeholder={t('riders.createUser.phonePlaceholder')}
              value={newUser.phone}
              onChange={(e) => setNewUser((prev) => ({ ...prev, phone: e.target.value }))}
              className="px-3 py-2.5 text-sm border border-brand-light/30 rounded-lg focus:outline-none focus:border-brand-orange bg-brand-ultra"
            />
            <div className="flex gap-2">
              {(['RIDER', 'CUSTOMER'] as const).map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setNewUserRole(role)}
                  className={`flex-1 py-2 text-xs font-bold uppercase tracking-wide rounded-lg border transition-colors ${
                    newUserRole === role
                      ? 'bg-brand-dark text-white border-brand-dark'
                      : 'bg-brand-ultra text-brand-mid border-brand-light/30'
                  }`}
                >
                  {role === 'RIDER' ? t('riders.createUser.roleRider') : t('riders.createUser.roleCustomer')}
                </button>
              ))}
            </div>
            {newUserRole === 'RIDER' && (
              <input
                type="text"
                placeholder={t('riders.vehicleTypePlaceholder')}
                value={newUser.vehicleType}
                onChange={(e) => setNewUser((prev) => ({ ...prev, vehicleType: e.target.value }))}
                className="px-3 py-2.5 text-sm border border-brand-light/30 rounded-lg focus:outline-none focus:border-brand-orange bg-brand-ultra"
              />
            )}
            {createUserError && <p className="text-xs text-red-600">{createUserError}</p>}
            {createUserResult && (
              <div className="text-xs bg-brand-ultra border border-brand-light/20 rounded-lg p-3">
                {createUserResult.credentialsEmailed ? (
                  <p>{t('riders.createUser.successEmailed', { email: createUserResult.user.email })}</p>
                ) : (
                  <>
                    <p className="mb-1">{t('riders.createUser.successNoEmail', { email: createUserResult.user.email })}</p>
                    <p className="font-mono font-bold text-brand-dark select-all">{createUserResult.temporaryPassword}</p>
                  </>
                )}
              </div>
            )}
            <button
              type="submit"
              disabled={creatingUser}
              className="bg-brand-orange text-white py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-orange-600 transition-colors disabled:opacity-60"
            >
              {creatingUser ? t('riders.createUser.creating') : t('riders.createUser.submit')}
            </button>
          </form>
        </div>

        <div className="bg-white rounded-2xl border border-brand-light/10 shadow-sm p-6">
          <h2 className="text-lg font-extrabold text-brand-dark uppercase tracking-tight mb-2">{t('riders.promoteHeading')}</h2>
          <p className="text-xs text-brand-light mb-6">
            {t('riders.promoteHelp')}
          </p>
          <form onSubmit={handlePromote} className="flex flex-col gap-3">
            <input
              type="text"
              placeholder={t('riders.userIdPlaceholder')}
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="px-3 py-2.5 text-sm border border-brand-light/30 rounded-lg focus:outline-none focus:border-brand-orange bg-brand-ultra"
            />
            <input
              type="text"
              placeholder={t('riders.vehicleTypePlaceholder')}
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="px-3 py-2.5 text-sm border border-brand-light/30 rounded-lg focus:outline-none focus:border-brand-orange bg-brand-ultra"
            />
            {createError && <p className="text-xs text-red-600">{createError}</p>}
            <button
              type="submit"
              disabled={creating}
              className="bg-brand-dark text-white py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-brand-orange transition-colors disabled:opacity-60"
            >
              {creating ? t('riders.creating') : t('riders.makeRider')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
