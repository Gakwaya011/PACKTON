import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANGUAGES } from '../i18n';

export default function LanguageSwitcher({ transparent }: { transparent?: boolean }) {
  const { i18n } = useTranslation();
  const current = i18n.language.split('-')[0];

  return (
    <div className="flex items-center gap-1" role="group" aria-label="Language">
      {SUPPORTED_LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          type="button"
          onClick={() => i18n.changeLanguage(lang.code)}
          aria-pressed={current === lang.code}
          className={`px-2 py-1 text-[11px] font-bold uppercase tracking-wider rounded transition-colors ${
            current === lang.code
              ? 'bg-brand-orange text-white'
              : transparent
                ? 'text-white/70 hover:text-white'
                : 'text-brand-mid hover:text-brand-dark'
          }`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}
