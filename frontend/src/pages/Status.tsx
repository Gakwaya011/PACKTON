import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { API_BASE_URL } from '../lib/api';

type CheckState = 'checking' | 'up' | 'down';

interface CheckResult {
  state: CheckState;
  latencyMs: number | null;
  checkedAt: Date | null;
}

const POLL_INTERVAL_MS = 15000;

function useHealthCheck(path: string): CheckResult {
  const [result, setResult] = useState<CheckResult>({ state: 'checking', latencyMs: null, checkedAt: null });

  useEffect(() => {
    let cancelled = false;

    const check = async () => {
      const start = performance.now();
      try {
        const res = await fetch(`${API_BASE_URL}${path}`);
        const latencyMs = Math.round(performance.now() - start);
        if (!cancelled) {
          setResult({ state: res.ok ? 'up' : 'down', latencyMs, checkedAt: new Date() });
        }
      } catch {
        if (!cancelled) {
          setResult({ state: 'down', latencyMs: null, checkedAt: new Date() });
        }
      }
    };

    check();
    const interval = setInterval(check, POLL_INTERVAL_MS);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [path]);

  return result;
}

function ServiceRow({ label, result }: { label: string; result: CheckResult }) {
  const { t } = useTranslation('portal');
  const color =
    result.state === 'up' ? 'bg-emerald-500' : result.state === 'down' ? 'bg-red-500' : 'bg-brand-light';
  const text =
    result.state === 'up' ? t('status.stateOperational') : result.state === 'down' ? t('status.stateUnreachable') : t('status.stateChecking');
  const textColor =
    result.state === 'up' ? 'text-emerald-600' : result.state === 'down' ? 'text-red-600' : 'text-brand-light';

  return (
    <div className="flex items-center justify-between py-5 border-b border-brand-light/10 last:border-0">
      <div className="flex items-center gap-3">
        <span className={`w-2.5 h-2.5 rounded-full ${color}`} />
        <span className="font-bold text-brand-dark">{label}</span>
      </div>
      <div className="text-right">
        <p className={`text-sm font-bold ${textColor}`}>{text}</p>
        <p className="text-xs text-brand-light mt-0.5">
          {result.latencyMs != null && `${result.latencyMs}${t('status.msSuffix')}`}
          {result.checkedAt ? t('status.checkedAt', { time: result.checkedAt.toLocaleTimeString() }) : t('status.notChecked')}
        </p>
      </div>
    </div>
  );
}

export default function Status() {
  const { t } = useTranslation('portal');
  const api = useHealthCheck('/health');
  const db = useHealthCheck('/health/db');

  const allUp = api.state === 'up' && db.state === 'up';
  const anyDown = api.state === 'down' || db.state === 'down';

  return (
    <div className="min-h-screen bg-brand-ultra pt-28 pb-20 px-[6%]">
      <div className="max-w-xl mx-auto">
        <p className="text-brand-orange font-bold text-xs uppercase tracking-[0.2em] mb-2">{t('status.eyebrow')}</p>
        <h1 className="text-3xl md:text-4xl font-black text-brand-dark tracking-tighter mb-8">{t('status.heading')}</h1>

        <div
          className={`rounded-2xl border p-6 mb-6 ${
            allUp
              ? 'bg-emerald-50 border-emerald-200'
              : anyDown
                ? 'bg-red-50 border-red-200'
                : 'bg-white border-brand-light/10'
          }`}
        >
          <p className={`font-bold ${allUp ? 'text-emerald-700' : anyDown ? 'text-red-700' : 'text-brand-mid'}`}>
            {allUp ? t('status.allOperational') : anyDown ? t('status.someIssues') : t('status.checkingSystems')}
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-brand-light/10 shadow-sm px-6">
          <ServiceRow label={t('status.apiLabel')} result={api} />
          <ServiceRow label={t('status.databaseLabel')} result={db} />
        </div>

        <p className="text-xs text-brand-light mt-6">
          {t('status.footerNote')}
        </p>
      </div>
    </div>
  );
}
