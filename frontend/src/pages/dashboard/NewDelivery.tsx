import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { apiFetch, ApiError } from '../../lib/api';
import { estimateInsuranceFee, estimatePrice, formatRwf } from '../../lib/pricing';
import type { Order, SavedAddress } from '../../lib/types';
import AddressMapPicker, { type AddressValue } from '../../components/AddressMapPicker';

export default function NewDelivery() {
  const { t } = useTranslation('portal');
  const navigate = useNavigate();

  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [pickup, setPickup] = useState<AddressValue>({ address: '' });
  const [dropoff, setDropoff] = useState<AddressValue>({ address: '' });
  const [codAmount, setCodAmount] = useState('');
  const [price, setPrice] = useState('');
  const priceEditedByUser = useRef(false);
  const [hasInsurance, setHasInsurance] = useState(false);

  const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    apiFetch<SavedAddress[]>('/addresses')
      .then(setSavedAddresses)
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    if (priceEditedByUser.current) return;
    if (typeof pickup.lat === 'number' && typeof pickup.lng === 'number' && typeof dropoff.lat === 'number' && typeof dropoff.lng === 'number') {
      const estimate = estimatePrice(
        { lat: pickup.lat, lng: pickup.lng },
        { lat: dropoff.lat, lng: dropoff.lng }
      );
      setPrice(String(estimate));
    }
  }, [pickup.lat, pickup.lng, dropoff.lat, dropoff.lng]);

  const applySavedAddress = (id: string, target: 'pickup' | 'dropoff') => {
    const saved = savedAddresses.find((a) => a.id === id);
    if (!saved) return;
    const value: AddressValue = {
      address: saved.address,
      ...(saved.lat != null && saved.lng != null ? { lat: saved.lat, lng: saved.lng } : {}),
    };
    if (target === 'pickup') setPickup(value);
    else setDropoff(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const priceValue = Number(price);
    if (!priceValue || priceValue <= 0) {
      setError(t('newDelivery.priceErrorRequired'));
      return;
    }

    setSubmitting(true);
    try {
      const order = await apiFetch<Order>('/orders', {
        method: 'POST',
        body: JSON.stringify({
          recipientName,
          recipientPhone,
          pickupAddress: pickup.address,
          pickupLat: pickup.lat,
          pickupLng: pickup.lng,
          dropoffAddress: dropoff.address,
          dropoffLat: dropoff.lat,
          dropoffLng: dropoff.lng,
          codAmount: codAmount ? Number(codAmount) : undefined,
          price: priceValue,
          hasInsurance,
          insuranceFee: hasInsurance ? estimateInsuranceFee(priceValue) : undefined,
        }),
      });
      navigate(`/track/${order.id}`);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : t('newDelivery.submitErrorDefault'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-brand-light/10 shadow-sm p-6 md:p-10 flex flex-col gap-8 max-w-3xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-brand-dark uppercase tracking-wide">{t('newDelivery.recipientNameLabel')}</label>
          <input
            type="text"
            required
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            className="px-4 py-3 border border-brand-light/30 rounded-lg focus:outline-none focus:border-brand-orange bg-brand-ultra"
            placeholder={t('newDelivery.recipientNamePlaceholder')}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-brand-dark uppercase tracking-wide">{t('newDelivery.recipientPhoneLabel')}</label>
          <input
            type="tel"
            required
            value={recipientPhone}
            onChange={(e) => setRecipientPhone(e.target.value)}
            className="px-4 py-3 border border-brand-light/30 rounded-lg focus:outline-none focus:border-brand-orange bg-brand-ultra"
            placeholder={t('newDelivery.recipientPhonePlaceholder')}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {savedAddresses.length > 0 && (
          <select
            onChange={(e) => e.target.value && applySavedAddress(e.target.value, 'pickup')}
            defaultValue=""
            className="px-4 py-2.5 text-sm border border-brand-light/30 rounded-lg bg-brand-ultra"
          >
            <option value="">{t('newDelivery.useSavedPickup')}</option>
            {savedAddresses.map((a) => (
              <option key={a.id} value={a.id}>{a.label}</option>
            ))}
          </select>
        )}
        <AddressMapPicker label={t('newDelivery.pickupAddressLabel')} value={pickup} onChange={setPickup} />
      </div>

      <div className="flex flex-col gap-3">
        {savedAddresses.length > 0 && (
          <select
            onChange={(e) => e.target.value && applySavedAddress(e.target.value, 'dropoff')}
            defaultValue=""
            className="px-4 py-2.5 text-sm border border-brand-light/30 rounded-lg bg-brand-ultra"
          >
            <option value="">{t('newDelivery.useSavedDropoff')}</option>
            {savedAddresses.map((a) => (
              <option key={a.id} value={a.id}>{a.label}</option>
            ))}
          </select>
        )}
        <AddressMapPicker label={t('newDelivery.dropoffAddressLabel')} value={dropoff} onChange={setDropoff} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-brand-dark uppercase tracking-wide">{t('newDelivery.codLabel')}</label>
          <input
            type="number"
            min="0"
            value={codAmount}
            onChange={(e) => setCodAmount(e.target.value)}
            className="px-4 py-3 border border-brand-light/30 rounded-lg focus:outline-none focus:border-brand-orange bg-brand-ultra"
            placeholder={t('newDelivery.codPlaceholder')}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-brand-dark uppercase tracking-wide">{t('newDelivery.priceLabel')}</label>
          <input
            type="number"
            min="1"
            required
            value={price}
            onChange={(e) => {
              priceEditedByUser.current = true;
              setPrice(e.target.value);
            }}
            className="px-4 py-3 border border-brand-light/30 rounded-lg focus:outline-none focus:border-brand-orange bg-brand-ultra"
            placeholder={t('newDelivery.pricePlaceholder')}
          />
          {price && <p className="text-xs text-brand-light">{formatRwf(Number(price))}</p>}
        </div>
      </div>

      <label className="flex items-start gap-3 bg-brand-ultra border border-brand-light/20 rounded-lg p-4 cursor-pointer">
        <input
          type="checkbox"
          checked={hasInsurance}
          onChange={(e) => setHasInsurance(e.target.checked)}
          className="mt-0.5 w-4 h-4 accent-brand-orange"
        />
        <span className="text-sm">
          <span className="font-bold text-brand-dark">{t('newDelivery.insuranceTitle')}</span>
          <span className="block text-xs text-brand-mid mt-0.5">
            {t('newDelivery.insuranceDescription')}
            {price && Number(price) > 0 && ` — ${formatRwf(estimateInsuranceFee(Number(price)))}`}
          </span>
        </span>
      </label>

      {price && (
        <div className="flex items-center justify-between text-sm border-t border-brand-light/10 pt-4 -mt-2">
          <span className="font-bold text-brand-dark uppercase tracking-wide text-xs">{t('newDelivery.totalLabel')}</span>
          <span className="font-bold text-brand-dark text-lg">
            {formatRwf(Number(price) + (hasInsurance ? estimateInsuranceFee(Number(price)) : 0))}
          </span>
        </div>
      )}

      {error && (
        <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">{error}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="bg-brand-dark text-white py-4 rounded-lg font-bold uppercase tracking-widest hover:bg-brand-orange transition-colors disabled:opacity-60"
      >
        {submitting ? t('newDelivery.submitting') : t('newDelivery.submit')}
      </button>
    </form>
  );
}
