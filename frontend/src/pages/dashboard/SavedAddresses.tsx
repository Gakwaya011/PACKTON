import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { apiFetch, ApiError } from '../../lib/api';
import type { SavedAddress } from '../../lib/types';

export default function SavedAddressesPage() {
  const { t } = useTranslation('portal');

  const [addresses, setAddresses] = useState<SavedAddress[]>([]);
  const [addressesLoading, setAddressesLoading] = useState(true);
  const [newAddress, setNewAddress] = useState({ label: '', address: '' });
  const [addingAddress, setAddingAddress] = useState(false);
  const [addressError, setAddressError] = useState<string | null>(null);

  useEffect(() => {
    apiFetch<SavedAddress[]>('/addresses')
      .then(setAddresses)
      .catch(() => undefined)
      .finally(() => setAddressesLoading(false));
  }, []);

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddress.label.trim() || !newAddress.address.trim()) return;

    setAddingAddress(true);
    setAddressError(null);
    try {
      const created = await apiFetch<SavedAddress>('/addresses', {
        method: 'POST',
        body: JSON.stringify(newAddress),
      });
      setAddresses((prev) => [created, ...prev]);
      setNewAddress({ label: '', address: '' });
    } catch (err) {
      setAddressError(err instanceof ApiError ? err.message : t('dashboard.addressErrorDefault'));
    } finally {
      setAddingAddress(false);
    }
  };

  const handleDeleteAddress = async (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    await apiFetch(`/addresses/${id}`, { method: 'DELETE' }).catch(() => undefined);
  };

  return (
    <div className="bg-white rounded-2xl border border-brand-light/10 shadow-sm p-6 md:p-8 max-w-xl">
      <h2 className="text-lg font-extrabold text-brand-dark uppercase tracking-tight mb-6">{t('dashboard.savedAddressesHeading')}</h2>

      {addressesLoading && <p className="text-sm text-brand-mid">{t('dashboard.loadingAddresses')}</p>}

      <div className="flex flex-col gap-3 mb-6">
        {addresses.map((addr) => (
          <div key={addr.id} className="flex items-start justify-between gap-3 border border-brand-light/10 rounded-lg p-3">
            <div>
              <p className="text-sm font-bold text-brand-dark">{addr.label}</p>
              <p className="text-xs text-brand-mid mt-0.5">{addr.address}</p>
            </div>
            <button
              type="button"
              onClick={() => handleDeleteAddress(addr.id)}
              className="text-xs text-red-500 font-bold hover:underline shrink-0"
            >
              {t('dashboard.removeAddress')}
            </button>
          </div>
        ))}
        {!addressesLoading && addresses.length === 0 && (
          <p className="text-sm text-brand-mid">{t('dashboard.noSavedAddresses')}</p>
        )}
      </div>

      <form onSubmit={handleAddAddress} className="flex flex-col gap-3 border-t border-brand-light/10 pt-4">
        <input
          type="text"
          placeholder={t('dashboard.addressLabelPlaceholder')}
          value={newAddress.label}
          onChange={(e) => setNewAddress((prev) => ({ ...prev, label: e.target.value }))}
          className="px-3 py-2.5 text-sm border border-brand-light/30 rounded-lg focus:outline-none focus:border-brand-orange bg-brand-ultra"
        />
        <input
          type="text"
          placeholder={t('dashboard.addressPlaceholder')}
          value={newAddress.address}
          onChange={(e) => setNewAddress((prev) => ({ ...prev, address: e.target.value }))}
          className="px-3 py-2.5 text-sm border border-brand-light/30 rounded-lg focus:outline-none focus:border-brand-orange bg-brand-ultra"
        />
        {addressError && <p className="text-xs text-red-600">{addressError}</p>}
        <button
          type="submit"
          disabled={addingAddress}
          className="bg-brand-dark text-white py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-brand-orange transition-colors disabled:opacity-60"
        >
          {addingAddress ? t('dashboard.savingAddress') : t('dashboard.saveAddress')}
        </button>
      </form>
    </div>
  );
}
