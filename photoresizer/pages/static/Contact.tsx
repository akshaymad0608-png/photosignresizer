import React, { useState } from 'react';
import { Mail, MessageCircle, Bug, Send, CheckCircle2 } from 'lucide-react';
import PageShell from './PageShell';

const CHANNELS = [
  { Icon: Mail, label: 'Email', value: 'hello@photoresizer.click', href: 'mailto:hello@photoresizer.click' },
  { Icon: MessageCircle, label: 'WhatsApp', value: 'Message us', href: 'https://wa.me/917600885080' },
  { Icon: Bug, label: 'Report a wrong size', value: 'Use the form below', href: '#contact-form' },
];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', topic: 'Wrong exam size', message: '' });

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const valid = form.email.includes('@') && form.message.trim().length > 8;

  const submit = () => {
    if (!valid) return;
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name || 'Anonymous'} (${form.email})`);
    const subject = encodeURIComponent(`[${form.topic}] PhotoResizer`);
    window.location.href = `mailto:hello@photoresizer.click?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <PageShell
      path="/contact"
      description="Report a wrong exam size, request a new exam preset, or send a bug report to the PhotoResizer team."
      title="Contact"
      intro="Wrong size in a preset, a broken download, or an exam you want added — tell us and we will fix it."
    >
      <ul className="not-prose grid gap-3 sm:grid-cols-3 mb-10">
        {CHANNELS.map(({ Icon, label, value, href }) => (
          <li key={label}>
            <a href={href} className="card card-lift p-4 block h-full">
              <Icon size={17} className="text-brand-600 mb-2.5" />
              <p className="text-[13px] font-semibold text-fg">{label}</p>
              <p className="text-[12.5px] text-fg-muted mt-0.5 break-words">{value}</p>
            </a>
          </li>
        ))}
      </ul>

      <div id="contact-form" className="not-prose card p-6 scroll-mt-24">
        <h2 className="font-display text-[20px] font-bold text-fg mb-1">Send a message</h2>
        <p className="text-[13.5px] text-fg-muted mb-6">
          This opens your email app with the message filled in — nothing is stored here.
        </p>

        {sent ? (
          <p className="flex items-center gap-2 text-[14px] font-medium text-success">
            <CheckCircle2 size={17} />
            Your email app should have opened. If not, write to hello@photoresizer.click.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="label-field">Name (optional)</span>
              <input className="field w-full mt-1.5" value={form.name} onChange={update('name')} autoComplete="name" />
            </label>

            <label className="block">
              <span className="label-field">Email</span>
              <input
                type="email"
                required
                className="field w-full mt-1.5"
                value={form.email}
                onChange={update('email')}
                autoComplete="email"
                placeholder="you@example.com"
              />
            </label>

            <label className="block sm:col-span-2">
              <span className="label-field">Topic</span>
              <select className="field w-full mt-1.5" value={form.topic} onChange={update('topic')}>
                <option>Wrong exam size</option>
                <option>Add an exam</option>
                <option>Bug report</option>
                <option>Something else</option>
              </select>
            </label>

            <label className="block sm:col-span-2">
              <span className="label-field">Message</span>
              <textarea
                rows={5}
                required
                className="field field-text w-full mt-1.5 resize-y"
                value={form.message}
                onChange={update('message')}
                placeholder="If a size is wrong, please include the exam name and a link to the notification."
              />
            </label>

            <div className="sm:col-span-2">
              <button type="button" onClick={submit} disabled={!valid} className="btn btn-primary">
                <Send size={16} />
                Send message
              </button>
            </div>
          </div>
        )}
      </div>
    </PageShell>
  );
}
