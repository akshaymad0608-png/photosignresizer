import React from 'react';

/**
 * Brand mark: crop brackets closing around a solid pixel — the act of
 * resizing, reduced to four corners and a square. Gradient runs
 * blue → violet → cyan and reads on both themes.
 */
export const LogoIcon = ({ size = 32, className = '' }: { size?: number; className?: string }) => {
  const id = React.useId();
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#365ef6" />
          <stop offset="52%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
      <g fill="none" stroke={`url(#${id})`} strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 15V9.5A2.5 2.5 0 0 1 9.5 7H15" />
        <path d="M41 15V9.5A2.5 2.5 0 0 0 38.5 7H33" />
        <path d="M7 33v5.5A2.5 2.5 0 0 0 9.5 41H15" />
        <path d="M41 33v5.5A2.5 2.5 0 0 1 38.5 41H33" />
      </g>
      <rect x="17" y="17" width="14" height="14" rx="3.5" fill={`url(#${id})`} />
    </svg>
  );
};

interface LogoProps {
  size?: number;
  showTagline?: boolean;
  className?: string;
}

const Logo = ({ size = 34, showTagline = false, className = '' }: LogoProps) => (
  <span className={`inline-flex items-center gap-2.5 ${className}`}>
    <LogoIcon size={size} />
    <span className="flex flex-col leading-none">
      <span
        className="font-display font-extrabold tracking-tight text-fg"
        style={{ fontSize: size * 0.58 }}
      >
        Photo<span className="grad-text">Resizer</span>
      </span>
      {showTagline && (
        <span className="text-[10px] font-medium tracking-wide text-fg-muted mt-1">
          Exact size, first try
        </span>
      )}
    </span>
  </span>
);

export default Logo;
