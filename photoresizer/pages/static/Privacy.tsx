import React from 'react';
import PageShell from './PageShell';

export default function Privacy() {
  return (
    <PageShell
      path="/privacy"
      description="How PhotoResizer handles your data: images are processed in your browser and never uploaded. Read the full privacy policy."
      title="Privacy policy"
      updated="18 July 2026"
      intro="The short version: your photographs and signatures are processed on your own device and are never sent to us."
    >
      <h2>Images you process</h2>
      <p>
        When you add a photograph or signature, the file is read by your browser and drawn into a
        canvas element in the page. Resizing, cropping, rotation, compression and the quality
        checks all run there. No copy is transmitted to our servers or to any third party, and we
        have no image storage of any kind. Closing the tab discards everything.
      </p>

      <h2>What is stored on your device</h2>
      <p>
        We keep a small amount of state in your browser's local storage so the tool remembers your
        preferences between visits: the interface language, the light or dark theme, the exam you
        last selected, and a short list of recent results shown in the history panel. This never
        leaves your device, and clearing your browser data removes it.
      </p>

      <h2>Analytics</h2>
      <p>
        We use Google Analytics to understand which exams are being used and where the tool is
        failing. It records page views, approximate region, device type and referring site. It does
        not receive your images or the contents of any form field. You can block it with any
        standard content blocker without affecting the tool.
      </p>

      <h2>Advertising</h2>
      <p>
        Some pages carry advertising to keep the tool free. Ad providers may set their own cookies
        and use them for frequency capping and personalisation, subject to their own policies. We
        do not share any information about your images with them, because we do not have it.
      </p>

      <h2>Third-party links</h2>
      <p>
        The site links to official recruitment portals, notification PDFs and job listings. Those
        sites have their own privacy practices, and this policy does not cover them.
      </p>

      <h2>Children</h2>
      <p>
        The tool is intended for people applying to examinations and is not directed at children
        under 13. We do not knowingly collect personal information from them.
      </p>

      <h2>Your choices</h2>
      <p>
        Because we hold no account and no image data, there is no profile to export or delete on our
        side. To remove local preferences, clear site data for this domain in your browser settings.
        For anything else, write to hello@photoresizer.click.
      </p>

      <h2>Changes</h2>
      <p>
        If this policy changes materially, the updated date at the top of this page will change and
        the revised version will be posted here.
      </p>
    </PageShell>
  );
}
