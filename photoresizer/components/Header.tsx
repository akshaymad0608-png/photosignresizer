import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Search, Menu, X, Sun, Moon, Monitor, ChevronDown, ArrowRight, Command, Globe,
} from 'lucide-react';
import Logo from './Logo';
import { MEGA_MENU, type MenuGroup } from './navigation/megaMenu';
import { useScrolled, useTheme, type ThemeMode } from '../hooks';

interface HeaderProps {
  onOpenSearch: () => void;
  lang?: 'en' | 'hi';
  onLangChange?: (l: 'en' | 'hi') => void;
}

const THEME_CYCLE: ThemeMode[] = ['light', 'dark', 'system'];
const THEME_ICON = { light: Sun, dark: Moon, system: Monitor };

export default function Header({ onOpenSearch, lang = 'en', onLangChange }: HeaderProps) {
  const scrolled = useScrolled(10);
  const { mode, setMode } = useTheme();
  const [openId, setOpenId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<number | undefined>(undefined);
  const navRef = useRef<HTMLElement>(null);
  const location = useLocation();

  // Route change closes everything (adjust-state-during-render pattern).
  const [lastPath, setLastPath] = useState(location.pathname);
  if (lastPath !== location.pathname) {
    setLastPath(location.pathname);
    setOpenId(null);
    setMobileOpen(false);
  }

  // Lock body scroll behind the mobile drawer.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // Escape closes the mega menu; click-away closes it too.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpenId(null);
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenId(null);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, []);

  // Small grace period so the pointer can cross the gap into the panel.
  const hoverOpen = useCallback((id: string) => {
    window.clearTimeout(closeTimer.current);
    setOpenId(id);
  }, []);
  const hoverClose = useCallback(() => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenId(null), 140);
  }, []);

  const ThemeIcon = THEME_ICON[mode];
  const cycleTheme = () => setMode(THEME_CYCLE[(THEME_CYCLE.indexOf(mode) + 1) % 3]);

  return (
    <>
      <a href="#main" className="skip-link">Skip to main content</a>

      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled || openId
            ? 'glass-strong shadow-md border-b border-line'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <nav
          ref={navRef}
          aria-label="Main navigation"
          className="shell flex items-center gap-3 h-16 lg:h-[4.5rem]"
        >
          <Link to="/" aria-label="PhotoResizer home" className="shrink-0">
            <Logo size={32} />
          </Link>

          {/* ---- Desktop nav ---- */}
          <ul className="hidden lg:flex items-center gap-1 ml-6">
            {MEGA_MENU.map(group => (
              <li key={group.id} onMouseEnter={() => group.columns && hoverOpen(group.id)} onMouseLeave={hoverClose}>
                {group.href ? (
                  <Link
                    to={group.href}
                    className="btn btn-ghost btn-sm !text-[0.9rem] tab-underline"
                    data-active={location.pathname === group.href}
                  >
                    {group.label}
                  </Link>
                ) : (
                  <button
                    type="button"
                    aria-expanded={openId === group.id}
                    aria-haspopup="true"
                    onClick={() => setOpenId(openId === group.id ? null : group.id)}
                    className="btn btn-ghost btn-sm !text-[0.9rem] tab-underline"
                    data-active={openId === group.id}
                  >
                    {group.label}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${openId === group.id ? 'rotate-180' : ''}`}
                    />
                  </button>
                )}
              </li>
            ))}
          </ul>

          <div className="flex-1" />

          {/* ---- Search trigger ---- */}
          <button
            type="button"
            onClick={onOpenSearch}
            className="hidden md:flex items-center gap-2 h-9 pl-3 pr-2 rounded-[--radius-sm] border border-line bg-surface-2 text-fg-muted hover:border-line-strong hover:text-fg transition-colors text-sm min-w-[13rem]"
            aria-label="Search the site"
          >
            <Search size={15} />
            <span className="flex-1 text-left">Search exams, tools…</span>
            <kbd className="flex items-center gap-0.5 px-1.5 py-0.5 rounded border border-line bg-surface text-[10px] font-mono text-fg-faint">
              <Command size={9} />K
            </kbd>
          </button>

          <button
            type="button"
            onClick={onOpenSearch}
            className="md:hidden btn btn-ghost btn-sm !px-2"
            aria-label="Search"
          >
            <Search size={18} />
          </button>

          {/* ---- Language ---- */}
          {onLangChange && (
            <button
              type="button"
              onClick={() => onLangChange(lang === 'en' ? 'hi' : 'en')}
              className="hidden sm:flex btn btn-ghost btn-sm !px-2 gap-1.5"
              aria-label={`Switch to ${lang === 'en' ? 'Hindi' : 'English'}`}
            >
              <Globe size={16} />
              <span className="font-semibold text-xs">{lang === 'en' ? 'EN' : 'हिं'}</span>
            </button>
          )}

          {/* ---- Theme ---- */}
          <button
            type="button"
            onClick={cycleTheme}
            className="btn btn-ghost btn-sm !px-2"
            aria-label={`Theme: ${mode}. Click to change.`}
            title={`Theme: ${mode}`}
          >
            <ThemeIcon size={17} />
          </button>

          <Link to="/#resize" className="hidden sm:inline-flex btn btn-primary btn-sm">
            Resize now
            <ArrowRight size={14} />
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="lg:hidden btn btn-ghost btn-sm !px-2"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
          >
            <Menu size={20} />
          </button>
        </nav>

        {/* ---- Mega menu panel ---- */}
        {MEGA_MENU.filter(g => g.columns).map(group => (
          <MegaPanel
            key={group.id}
            group={group}
            open={openId === group.id}
            onEnter={() => hoverOpen(group.id)}
            onLeave={hoverClose}
            onNavigate={() => setOpenId(null)}
          />
        ))}
      </header>

      <MobileDrawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        lang={lang}
        onLangChange={onLangChange}
      />
    </>
  );
}

/* ------------------------------------------------------------------ */

interface MegaPanelProps {
  group: MenuGroup;
  open: boolean;
  onEnter: () => void;
  onLeave: () => void;
  onNavigate: () => void;
}

const MegaPanel: React.FC<MegaPanelProps> = ({ group, open, onEnter, onLeave, onNavigate }) => {
  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={`hidden lg:block absolute inset-x-0 top-full origin-top transition-all duration-200 ${
        open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
      }`}
      aria-hidden={!open}
    >
      <div className="shell pb-5">
        <div className="card shadow-xl overflow-hidden">
          <div className={`grid gap-0 ${group.featured ? 'grid-cols-[repeat(3,1fr)_20rem]' : `grid-cols-${group.columns!.length}`}`}>
            {group.columns!.map(col => (
              <div key={col.heading} className="p-5 border-r border-line-soft last:border-r-0">
                <p className="label-field">{col.heading}</p>
                <ul className="space-y-0.5">
                  {col.items.map(item => {
                    const Icon = item.icon;
                    return (
                      <li key={item.label}>
                        <Link
                          to={item.href}
                          onClick={onNavigate}
                          className="group flex gap-3 rounded-[--radius-sm] p-2.5 hover:bg-surface-2 transition-colors"
                        >
                          {Icon && (
                            <span className="mt-0.5 shrink-0 w-8 h-8 rounded-[--radius-xs] bg-surface-2 border border-line flex items-center justify-center text-brand-600 group-hover:border-brand-600 transition-colors">
                              <Icon size={15} />
                            </span>
                          )}
                          <span className="min-w-0">
                            <span className="flex items-center gap-1.5 text-[13.5px] font-semibold text-fg">
                              {item.label}
                              {item.badge && (
                                <span className="pill pill-brand !px-1.5 !py-0 !text-[9px]">{item.badge}</span>
                              )}
                            </span>
                            {item.desc && (
                              <span className="block text-[12px] text-fg-muted leading-snug mt-0.5">
                                {item.desc}
                              </span>
                            )}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}

            {group.featured && (
              <div className="p-6 bg-surface-2 border-l border-line">
                <div className="w-10 h-10 rounded-[--radius-sm] grad-fill mb-4" />
                <h3 className="font-display text-[16px] font-bold text-fg mb-2">{group.featured.title}</h3>
                <p className="text-[13px] text-fg-muted leading-relaxed mb-4">{group.featured.body}</p>
                <Link
                  to={group.featured.href}
                  onClick={onNavigate}
                  className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-600 hover:gap-2.5 transition-all"
                >
                  {group.featured.cta}
                  <ArrowRight size={13} />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  lang: 'en' | 'hi';
  onLangChange?: (l: 'en' | 'hi') => void;
}

const MobileDrawer: React.FC<MobileDrawerProps> = ({ open, onClose, lang, onLangChange }) => {
  const [expanded, setExpanded] = useState<string | null>('tools');

  return (
    <div
      className={`lg:hidden fixed inset-0 z-[60] transition-opacity duration-250 ${
        open ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      aria-hidden={!open}
    >
      <div className="absolute inset-0 bg-fg/25 backdrop-blur-sm" onClick={onClose} />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={`absolute right-0 top-0 bottom-0 w-full max-w-sm bg-bg border-l border-line shadow-xl flex flex-col transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-5 border-b border-line shrink-0">
          <Logo size={30} />
          <button type="button" onClick={onClose} className="btn btn-ghost btn-sm !px-2" aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-5">
          {MEGA_MENU.map(group =>
            group.href ? (
              <Link
                key={group.id}
                to={group.href}
                onClick={onClose}
                className="block py-3.5 font-display text-[17px] font-bold text-fg border-b border-line-soft"
              >
                {group.label}
              </Link>
            ) : (
              <div key={group.id} className="border-b border-line-soft">
                <button
                  type="button"
                  onClick={() => setExpanded(expanded === group.id ? null : group.id)}
                  aria-expanded={expanded === group.id}
                  className="w-full flex items-center justify-between py-3.5 font-display text-[17px] font-bold text-fg"
                >
                  {group.label}
                  <ChevronDown
                    size={17}
                    className={`text-fg-muted transition-transform ${expanded === group.id ? 'rotate-180' : ''}`}
                  />
                </button>
                {expanded === group.id && (
                  <div className="pb-3 animate-[rise_.3s_ease-out]">
                    {group.columns!.map(col => (
                      <div key={col.heading} className="mb-3">
                        <p className="label-field !mb-1.5">{col.heading}</p>
                        <ul>
                          {col.items.map(item => (
                            <li key={item.label}>
                              <Link
                                to={item.href}
                                onClick={onClose}
                                className="flex items-center gap-2.5 py-2 text-[14px] text-fg-soft hover:text-brand-600 transition-colors"
                              >
                                {item.icon && <item.icon size={15} className="text-fg-faint" />}
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          )}
        </nav>

        <div className="p-4 border-t border-line shrink-0 space-y-3">
          {onLangChange && (
            <div className="flex gap-2">
              {(['en', 'hi'] as const).map(l => (
                <button
                  key={l}
                  type="button"
                  onClick={() => onLangChange(l)}
                  className={`flex-1 btn btn-sm ${lang === l ? 'btn-solid' : 'btn-outline'}`}
                >
                  {l === 'en' ? 'English' : 'हिंदी'}
                </button>
              ))}
            </div>
          )}
          <Link to="/#resize" onClick={onClose} className="btn btn-primary w-full">
            Resize now
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
};
