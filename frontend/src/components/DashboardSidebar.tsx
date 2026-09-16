import type { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

export interface SidebarItem {
  label: string;
  path: string;
  end?: boolean;
}

interface DashboardSidebarProps {
  title: string;
  heading: string;
  items: SidebarItem[];
  /** Extra content rendered below the heading — e.g. Rider's availability toggle. */
  headerExtra?: ReactNode;
}

const linkClasses = ({ isActive }: { isActive: boolean }) =>
  `px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors ${
    isActive
      ? 'bg-brand-orange/10 text-brand-orange'
      : 'text-brand-mid hover:bg-brand-ultra hover:text-brand-dark'
  }`;

export default function DashboardSidebar({ title, heading, items, headerExtra }: DashboardSidebarProps) {
  return (
    <>
      {/* Desktop: fixed, full-height sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:fixed lg:left-0 lg:top-28 lg:bottom-0 lg:w-72 lg:border-r lg:border-brand-light/10 lg:bg-white lg:z-40 lg:px-6 lg:py-8 lg:overflow-y-auto">
        <div className="mb-8">
          <p className="text-brand-orange font-bold text-xs uppercase tracking-[0.2em] mb-2">{title}</p>
          <h1 className="text-xl font-black text-brand-dark tracking-tight leading-tight">{heading}</h1>
          {headerExtra && <div className="mt-4">{headerExtra}</div>}
        </div>
        <nav className="flex flex-col gap-1">
          {items.map((item) => (
            <NavLink key={item.path} to={item.path} end={item.end} className={linkClasses}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Mobile: header + horizontal pill nav, normal document flow */}
      <div className="lg:hidden pt-28 px-[6%] mb-6">
        <p className="text-brand-orange font-bold text-xs uppercase tracking-[0.2em] mb-2">{title}</p>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <h1 className="text-3xl font-black text-brand-dark tracking-tighter">{heading}</h1>
          {headerExtra}
        </div>
        <nav className="flex gap-2 overflow-x-auto pb-1">
          {items.map((item) => (
            <NavLink key={item.path} to={item.path} end={item.end} className={({ isActive }) => `${linkClasses({ isActive })} whitespace-nowrap`}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
}
