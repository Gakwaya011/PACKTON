import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface Post {
  id: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
}

const CATEGORY_ORDER = ['all', 'guides', 'company', 'logistics', 'riders'] as const;

const THUMBNAILS = ['/about-hero.jpg', '/services-b2c.jpg', '/valuepreposition.jpg'];

function useReveal() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

export default function Blog() {
  const { t } = useTranslation('blog');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [query, setQuery] = useState('');
  const grid = useReveal();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const posts = t('posts', { returnObjects: true }) as Post[];
  const categories = t('categories', { returnObjects: true }) as Record<string, string>;

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
      const matchesQuery =
        normalizedQuery === '' ||
        post.title.toLowerCase().includes(normalizedQuery) ||
        post.excerpt.toLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [posts, activeCategory, query]);

  return (
    <div className="w-full bg-white font-sans">

      {/* 1. HERO */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 px-6 lg:px-12 bg-brand-ultra border-b border-gray-200">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-gray-300 rounded-full mb-8 bg-white">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange"></span>
            <p className="text-brand-dark font-bold tracking-[0.15em] uppercase text-xs">
              {t('hero.eyebrow')}
            </p>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-brand-dark tracking-tighter leading-[1.05] mb-6">
            {t('hero.heading')}
          </h1>
          <p className="text-base lg:text-lg text-gray-500 font-light leading-relaxed max-w-xl">
            {t('hero.paragraph')}
          </p>
        </div>
      </section>

      {/* 2. ARTICLES */}
      <section ref={grid.ref} className="py-16 lg:py-24 px-6 lg:px-12">
        <div className="max-w-[1760px] mx-auto">

          <div className="mb-10 max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-black text-brand-dark tracking-tighter mb-3">
              {t('section.heading')}
            </h2>
            <p className="text-base text-gray-500 font-light leading-relaxed">
              {t('section.paragraph')}
            </p>
          </div>

          {/* Search + Filters */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-12">
            <div className="relative w-full lg:max-w-xs">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 text-sm text-brand-dark placeholder:text-gray-400 focus:outline-none focus:border-brand-orange transition-colors"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {CATEGORY_ORDER.map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  className={`px-4 py-2.5 text-xs font-bold uppercase tracking-widest border transition-colors ${
                    activeCategory === key
                      ? 'bg-brand-dark text-white border-brand-dark'
                      : 'bg-white text-gray-500 border-gray-200 hover:border-brand-orange/40 hover:text-brand-dark'
                  }`}
                >
                  {categories[key]}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <Link
                  to={`/blog/${post.id}`}
                  key={post.id}
                  style={{ transitionDelay: `${(index % 6) * 100}ms` }}
                  className={`group flex flex-col border border-gray-200 transition-all duration-700 ease-out hover:border-brand-orange/30 hover:shadow-xl ${
                    grid.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}
                >
                  <div className="relative h-48 w-full overflow-hidden bg-brand-dark">
                    <img
                      src={THUMBNAILS[index % THUMBNAILS.length]}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
                  </div>

                  <div className="flex flex-col flex-1 p-6 lg:p-7">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-brand-orange font-bold uppercase tracking-widest text-xs">
                        {categories[post.category]}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                      <span className="text-gray-400 text-xs font-mono">{post.date}</span>
                    </div>
                    <h3 className="text-lg font-bold text-brand-dark tracking-tight leading-snug mb-3">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-500 font-light leading-relaxed mb-6 flex-1">
                      {post.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-bold text-brand-dark uppercase tracking-widest">
                      {t('learnMore')}
                      <span className="transform transition-transform duration-300 group-hover:translate-x-1 text-brand-orange">→</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-24 text-center border border-dashed border-gray-200">
              <p className="text-gray-400 font-light">{t('noResults')}</p>
            </div>
          )}

        </div>
      </section>

    </div>
  );
}
