import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface Post {
  id: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  content: string[];
}

const THUMBNAILS = ['/about-hero.jpg', '/services-b2c.jpg', '/valuepreposition.jpg'];

export default function BlogPost() {
  const { t } = useTranslation('blog');
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const posts = t('posts', { returnObjects: true }) as Post[];
  const categories = t('categories', { returnObjects: true }) as Record<string, string>;

  const index = posts.findIndex((p) => p.id === id);
  const post = index >= 0 ? posts[index] : undefined;

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 bg-white">
        <h1 className="text-3xl font-black text-brand-dark tracking-tighter mb-4">
          {t('post.notFoundHeading')}
        </h1>
        <p className="text-gray-500 font-light mb-8">{t('post.notFoundParagraph')}</p>
        <Link
          to="/blog"
          className="bg-brand-orange text-white px-8 py-4 text-sm font-bold uppercase tracking-widest transition-all duration-300 hover:bg-orange-600 hover:-translate-y-1"
        >
          {t('post.notFoundLink')}
        </Link>
      </div>
    );
  }

  const otherPosts = posts.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <div className="w-full bg-white font-sans">

      {/* HERO IMAGE */}
      <div className="relative h-[45vh] lg:h-[55vh] w-full overflow-hidden bg-brand-dark">
        <img
          src={THUMBNAILS[index % THUMBNAILS.length]}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10"></div>
      </div>

      {/* ARTICLE */}
      <article className="max-w-3xl mx-auto px-6 lg:px-0 -mt-16 lg:-mt-20 relative z-10 pb-20 lg:pb-28">
        <div className="bg-white border border-gray-200 p-8 lg:p-14">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-brand-orange transition-colors mb-8"
          >
            <span className="transform -scale-x-100">→</span>
            {t('post.back')}
          </Link>

          <div className="flex items-center gap-3 mb-5">
            <span className="text-brand-orange font-bold uppercase tracking-widest text-xs">
              {categories[post.category]}
            </span>
            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
            <span className="text-gray-400 text-xs font-mono">{post.date}</span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-brand-dark tracking-tighter leading-[1.1] mb-8">
            {post.title}
          </h1>

          <div className="flex flex-col gap-6">
            {post.content.map((paragraph, i) => (
              <p key={i} className="text-base lg:text-lg text-gray-600 font-light leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </article>

      {/* MORE FROM THE BLOG */}
      {otherPosts.length > 0 && (
        <section className="py-16 lg:py-20 px-6 lg:px-12 bg-brand-ultra border-t border-gray-200">
          <div className="max-w-[1760px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-black text-brand-dark tracking-tighter mb-10">
              {t('post.moreHeading')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {otherPosts.map((other) => {
                const otherIndex = posts.findIndex((p) => p.id === other.id);
                return (
                  <Link
                    key={other.id}
                    to={`/blog/${other.id}`}
                    className="group flex flex-col bg-white border border-gray-200 transition-all duration-500 hover:border-brand-orange/30 hover:shadow-xl"
                  >
                    <div className="relative h-40 w-full overflow-hidden">
                      <img
                        src={THUMBNAILS[otherIndex % THUMBNAILS.length]}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-col flex-1 p-6">
                      <span className="text-brand-orange font-bold uppercase tracking-widest text-xs mb-3">
                        {categories[other.category]}
                      </span>
                      <h3 className="text-base font-bold text-brand-dark tracking-tight leading-snug">
                        {other.title}
                      </h3>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

    </div>
  );
}
