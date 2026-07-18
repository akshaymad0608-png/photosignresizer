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
          { label: 'Passport size photo', desc: '35x45 mm at 300 DPI', href: '/tools/passport-photo', icon: Crop },
          { label: 'JPG to PNG', desc: 'Lossless conversion', href: '/tools/jpg-to-png', icon: Repeat },
        ],
      },
      {
        heading: 'Utilities',
        items: [
          { label: 'Remove background', desc: 'Cut out a portrait, get a transparent PNG', href: '/tools/remove-background', icon: ShieldOff },
          { label: 'Add white background', desc: 'Flatten transparency onto white', href: '/tools/add-white-background', icon: Droplets },
          { label: 'Convert to grayscale', desc: 'Black and white, as some forms ask', href: '/tools/grayscale-converter', icon: Palette },
          { label: 'Image to PDF', desc: 'One-page PDF for upload counters', href: '/tools/image-to-pdf', icon: QrCode, badge: 'New' },
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
        heading: 'Browse',
        items: [
          { label: 'All supported exams', desc: '50+ presets, searchable', href: '/#supported-exams', icon: BookOpen },
          { label: 'Start resizing', desc: 'Pick an exam and go', href: '/#resize', icon: GraduationCap },
          { label: 'Signature requirements', desc: 'Size, ink and background', href: '/#signature', icon: GraduationCap },
        ],
      },
      {
        heading: 'Common sizes',
        items: [
          { label: 'Passport size (35x45 mm)', href: '/tools/passport-photo', icon: Crop },
          { label: 'Photo 200x230 px', href: '/tools/resize-200x230', icon: Crop },
          { label: 'Signature 300x80 px', href: '/tools/signature-300x80', icon: PenLine },
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
          { label: 'How it works', desc: 'Four steps, all on your device', href: '/#how-it-works', icon: BookOpen },
          { label: 'Blog & guides', desc: 'Notifications and deadlines', href: '/blog', icon: Newspaper },
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
  { id: 'tools-all', label: 'All tools', href: '/free-image-tools' },
  { id: 'jobs', label: 'Jobs', href: '/jobs' },
];
