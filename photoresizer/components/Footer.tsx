import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Instagram, Send, Heart, ShieldCheck } from 'lucide-react';
import Logo from './Logo';
import Newsletter from './Newsletter';
import { Language } from '../types';

interface FooterProps {
  lang: Language;
}

const COLUMNS = [
  {
    heading: 'Tools',
    links: [
      { label: 'Photo & signature resizer', href: '/' },
      { label: 'Image compressor', href: '/tools/compress' },
      { label: 'Format converter', href: '/tools/convert' },
      { label: 'Crop & rotate', href: '/tools/crop' },
      { label: 'QR generator', href: '/tools/qr' },
      { label: 'All free tools', href: '/free-image-tools' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Supported exams', href: '/#supported-exams' },
      { label: 'How it works', href: '/#how-it-works' },
      { label: 'Guides', href: '/blog' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Latest vacancies', href: '/jobs' },
      { label: 'Useful links', href: '/links' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Blog', href: '/blog' },
      { label: 'Sitemap', href: '/sitemap.xml' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy policy', href: '/privacy' },
      { label: 'Terms of use', href: '/terms' },
      { label: 'Cookie policy', href: '/cookies' },
      { label: 'Disclaimer', href: '/terms#disclaimer' },
    ],
  },
];

const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com', Icon: Github },
  { label: 'Twitter', href: 'https://twitter.com', Icon: Twitter },
  { label: 'Instagram', href: 'https://instagram.com', Icon: Instagram },
  { label: 'Telegram', href: 'https://telegram.org', Icon: Send },
];

const isInternal = (href: string) => href.startsWith('/') && !href.endsWith('.xml');

export default function Footer({ lang }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-line bg-bg-subtle">
      <div className="shell py-14">
        {/* Newsletter band */}
        <div className="mb-14">
          <Newsletter lang={lang} />
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          {/* Brand */}
          <div className="lg:pr-8">
            <Logo />
            <p className="mt-4 text-[14px] leading-relaxed text-fg-muted max-w-[38ch]">
              {lang === 'hi'
                ? 'सरकारी परीक्षा फॉर्म के लिए फोटो और हस्ताक्षर रिसाइज़र। सब कुछ आपके ब्राउज़र में, बिना अपलोड किए।'
                : 'A photo and signature resizer for Indian government exam forms. Everything runs in your browser, nothing is uploaded.'}
            </p>

            <p className="mt-5 inline-flex items-center gap-2 text-[12px] font-medium text-success">
              <ShieldCheck size={14} />
              {lang === 'hi' ? 'फाइलें कभी अपलोड नहीं होतीं' : 'Files never leave your device'}
            </p>

            <ul className="mt-6 flex gap-2">
              {SOCIALS.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={label}
                    className="w-9 h-9 rounded-lg border border-line bg-surface text-fg-muted flex items-center justify-center transition-colors hover:text-brand-600 hover:border-brand-400"
                  >
                    <Icon size={16} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Link columns */}
          {COLUMNS.map(col => (
            <nav key={col.heading} aria-label={col.heading}>
              <h2 className="text-[11px] font-bold uppercase tracking-[0.14em] text-fg mb-4">
                {col.heading}
              </h2>
              <ul className="space-y-2.5">
                {col.links.map(link => (
                  <li key={link.label}>
                    {isInternal(link.href) ? (
                      <Link
                        to={link.href}
                        className="text-[13.5px] text-fg-muted hover:text-brand-600 transition-colors"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-[13.5px] text-fg-muted hover:text-brand-600 transition-colors"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-line flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <p className="text-[12.5px] text-fg-muted">
            © {year} PhotoResizer. {lang === 'hi' ? 'सर्वाधिकार सुरक्षित।' : 'All rights reserved.'}
          </p>
          <p className="text-[12.5px] text-fg-muted inline-flex items-center gap-1.5">
            {lang === 'hi' ? 'भारत में' : 'Made in India with'}
            <Heart size={12} className="text-danger fill-current" />
            {lang === 'hi' ? 'बनाया गया' : 'for exam aspirants'}
          </p>
        </div>

        <p className="mt-4 text-[11.5px] leading-relaxed text-fg-faint max-w-[80ch]">
          {lang === 'hi'
            ? 'PhotoResizer किसी सरकारी विभाग या भर्ती बोर्ड से संबद्ध नहीं है। आकार की आवश्यकताएँ आधिकारिक अधिसूचनाओं से ली गई हैं — आवेदन से पहले हमेशा मूल अधिसूचना देखें।'
            : 'PhotoResizer is not affiliated with any government department or recruitment board. Size requirements are taken from official notifications — always check the original notification before applying.'}
        </p>
      </div>
    </footer>
  );
}
