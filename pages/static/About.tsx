import React from 'react';
import { ShieldCheck, Cpu, Users, Scale } from 'lucide-react';
import PageShell from './PageShell';

const PILLARS = [
  { Icon: ShieldCheck, title: 'Nothing is uploaded', body: 'Every resize, crop and compression happens on your own device using the canvas API. There is no upload endpoint, so there is no file to leak.' },
  { Icon: Cpu, title: 'Numbers, not guesses', body: 'Each preset stores the exact pixel and kilobyte range printed in that exam notification, and every output is measured against it before you download.' },
  { Icon: Users, title: 'Built for form-filling day', body: 'The tool assumes you are in a cyber cafe queue with ten minutes left. It works on a slow phone, works offline, and does not ask you to sign up.' },
  { Icon: Scale, title: 'Free and independent', body: 'PhotoResizer is not affiliated with any recruitment board. We read the notifications, encode the requirements, and keep the tool free.' },
];

export default function About() {
  return (
    <PageShell
      path="/about"
      description="PhotoResizer is an independent, browser-based tool that prepares photographs and signatures for Indian government exam forms. Nothing is uploaded."
      title="About PhotoResizer"
      intro="A small tool with one job: make sure the photograph and signature you attach to a government exam form are accepted the first time you upload them."
    >
      <p>
        Application portals reject images for reasons they rarely explain well. The photo is
        four kilobytes too large. The signature is the right size but the wrong aspect ratio.
        The form wants 200×230 pixels and your phone produced 3024×4032. Each rejection costs
        another attempt at a portal that is usually under load on the last day.
      </p>
      <p>
        PhotoResizer removes that loop. Choose the exam, and the pixel dimensions and file-size
        window from that notification are applied automatically. Add your photograph and
        signature, and the tool resizes, crops and compresses until the output lands inside the
        allowed range, then tells you whether it passed.
      </p>

      <h2>What we care about</h2>
      <ul className="not-prose grid gap-4 sm:grid-cols-2 my-6">
        {PILLARS.map(({ Icon, title, body }) => (
          <li key={title} className="card p-5">
            <Icon size={18} className="text-brand-600 mb-3" />
            <h3 className="text-[15px] font-semibold text-fg mb-1.5">{title}</h3>
            <p className="text-[13.5px] leading-relaxed text-fg-muted">{body}</p>
          </li>
        ))}
      </ul>

      <h2>How it is built</h2>
      <p>
        The site is a React application with no backend for image handling. Images are decoded
        into a canvas, resized with the requested fit mode, and re-encoded as JPEG at a quality
        the tool searches for until the file lands inside the size window. Quality checks for
        sharpness, exposure, background uniformity and ink coverage run on the same canvas data.
      </p>

      <h2>Corrections</h2>
      <p>
        Notifications change and boards occasionally revise their requirements mid-cycle. If a
        preset here disagrees with the notification you are reading, the notification is right —
        please tell us through the contact page and we will correct it.
      </p>
    </PageShell>
  );
}
