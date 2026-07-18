import type { LucideIcon } from 'lucide-react';
import {
  Crop, Minimize2, PenLine, FileImage, QrCode, Palette, Droplets, ShieldOff,
  Repeat, GraduationCap, BookOpen, HelpCircle, Newspaper, Building2, Mail, Scale,
} from 'lucide-react';

export interface MenuItem {
  label: string;
  desc?: string;
  href: string;
  icon?: LucideIcon;
  badge?: string;
}

export interface MenuColumn {
  heading: string;
  items: MenuItem[];
}

export interface MenuGroup {
  id: string;
  label: string;
  /** A plain link has no columns. */
  href?: string;
  columns?: MenuColumn[];
  featured?: { title: string; body: string; href: string; cta: string };
}

export const MEGA_MENU: MenuGroup[] = [
  {
    id: 'tools',
    label: 'Tools',
    columns: [
      {
        heading: 'Resize & compress',
        items: [
          { label: 'Exam photo resizer', desc: 'Exact px and KB for 50+ exams', href: '/', icon: Crop },
          { label: 'Signature resizer', desc: 'Clean ink on white, under the limit', href: '/#signature', icon: PenLine },
          { label: 'Image compressor', desc: 'Hit a target KB without mush', href: '/tools/image-compressor', icon: Minimize2 },
          { label: 'JPG to PNG', desc: 'Lossless conversion', href: '/tools/jpg-to-png', icon: Repeat },
        ],
      },
      {
        heading: 'Utilities',
        items: [
          { label: 'Metadata remover', desc: 'Strip EXIF and GPS data', href: '/tools/png-to-jpg', icon: ShieldOff },
          { label: 'Watermark', desc: 'Protect documents you share', href: '/tools/remove-background', icon: Droplets },
          { label: 'Colour palette', desc: 'Pull dominant colours', href: '/tools/grayscale-converter', icon: Palette },
          { label: 'QR generator', desc: 'Links, UPI and text', href: '/tools/webp-converter', icon: QrCode, badge: 'New' },
        ],
      },
      {
        heading: 'Documents',
        items: [
          { label: 'Photo + signature sheet', desc: 'Both on one JPG', href: '/#extras', icon: FileImage },
          { label: 'Print sheet', desc: 'True-size 4x6 with cut guides', href: '/#extras', icon: FileImage },
          { label: 'PDF export', desc: 'One PDF for upload counters', href: '/#extras', icon: FileImage },
        ],
      },
    ],
    featured: {
      title: 'Nothing is uploaded',
      body: 'Every tool runs on your own device using the browser canvas. Your photo never touches a server.',
      href: '/privacy',
      cta: 'Read the privacy policy',
    },
  },
  {
    id: 'exams',
    label: 'Exams',
    columns: [
      {
        heading: 'National',
        items: [
          { label: 'UPSC Civil Services', href: '/guides/upsc', icon: GraduationCap },
          { label: 'SSC CGL & CHSL', href: '/guides/ssc', icon: GraduationCap },
          { label: 'IBPS PO & Clerk', href: '/guides/ibps', icon: GraduationCap },
          { label: 'RRB NTPC & Group D', href: '/guides/rrb', icon: GraduationCap },
        ],
      },
      {
        heading: 'More',
        items: [
          { label: 'NEET & JEE', href: '/guides/neet', icon: GraduationCap },
          { label: 'State PSC forms', href: '/guides/state-psc', icon: GraduationCap },
          { label: 'Bank & insurance', href: '/guides/banking', icon: GraduationCap },
          { label: 'All supported exams', href: '/#resize', icon: BookOpen },
        ],
      },
    ],
  },
  {
    id: 'learn',
    label: 'Learn',
    columns: [
      {
        heading: 'Guides',
        items: [
          { label: 'Photo size guide', desc: 'Pixels, DPI and KB explained', href: '/guides', icon: BookOpen },
          { label: 'Why forms reject photos', desc: 'The eight usual reasons', href: '/guides', icon: HelpCircle },
          { label: 'Blog', desc: 'Notifications and deadlines', href: '/blog', icon: Newspaper },
          { label: 'FAQ', desc: 'Quick answers', href: '/faq', icon: HelpCircle },
        ],
      },
      {
        heading: 'Company',
        items: [
          { label: 'About', href: '/about', icon: Building2 },
          { label: 'Contact', href: '/contact', icon: Mail },
          { label: 'Privacy & terms', href: '/privacy', icon: Scale },
        ],
      },
    ],
  },
  { id: 'jobs', label: 'Jobs', href: '/jobs' },
];
