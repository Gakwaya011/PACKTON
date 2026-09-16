import { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { apiFetch, ApiError } from '../../lib/api';
import SignaturePad, { type SignaturePadHandle } from '../../components/SignaturePad';

export default function ProofOfDelivery() {
  const { t } = useTranslation('rider');
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const signaturePadRef = useRef<SignaturePadHandle>(null);

  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setPhoto(file);
    setPhotoPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    const signature = signaturePadRef.current?.getDataUrl();
    if (!photo && !signature) {
      setError(t('pod.missingError'));
      return;
    }

    setError(null);
    setSubmitting(true);

    const formData = new FormData();
    if (photo) formData.append('photo', photo);
    if (signature) formData.append('signature', signature);

    try {
      await apiFetch(`/rider/orders/${id}/proof-of-delivery`, {
        method: 'POST',
        body: formData,
      });
      navigate('/rider');
    } catch (err) {
      setError(err instanceof ApiError ? err.message : t('pod.uploadError'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-ultra pt-28 pb-20 px-[6%]">
      <div className="max-w-xl mx-auto">
        <p className="text-brand-orange font-bold text-xs uppercase tracking-[0.2em] mb-2">{t('pod.eyebrow')}</p>
        <h1 className="text-3xl md:text-4xl font-black text-brand-dark tracking-tighter mb-8">{t('pod.heading')}</h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-brand-light/10 shadow-sm p-6 md:p-10 flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <label className="text-xs font-bold text-brand-dark uppercase tracking-wide">{t('pod.photoLabel')}</label>
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handlePhotoChange}
              className="text-sm"
            />
            {photoPreview && (
              <img src={photoPreview} alt={t('pod.photoPreviewAlt')} className="w-full h-48 object-cover rounded-lg border border-brand-light/20" />
            )}
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-xs font-bold text-brand-dark uppercase tracking-wide">{t('pod.signatureLabel')}</label>
            <SignaturePad ref={signaturePadRef} />
          </div>

          {error && (
            <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="bg-brand-dark text-white py-4 rounded-lg font-bold uppercase tracking-widest hover:bg-brand-orange transition-colors disabled:opacity-60"
          >
            {submitting ? t('pod.uploading') : t('pod.submit')}
          </button>
        </form>
      </div>
    </div>
  );
}
