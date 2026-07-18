import React from 'react';
import PageShell from './PageShell';

export default function Terms() {
  return (
    <PageShell
      path="/terms"
      description="Terms of use for PhotoResizer, including the disclaimer that we are not affiliated with any recruitment board."
      title="Terms of use"
      updated="18 July 2026"
      intro="Plain terms for a free tool: use it for lawful purposes, and check the official notification before you submit."
    >
      <h2>Using the tool</h2>
      <p>
        PhotoResizer is provided free of charge for personal use in preparing images for
        examination and recruitment forms. You may use it as often as you like. You may not resell
        access to it, present it as your own service, or use automated means to overload it.
      </p>

      <h2>Your content</h2>
      <p>
        You keep every right in the images you process. Because processing happens in your browser,
        we never receive them and therefore claim no licence over them. You are responsible for
        having the right to use any image you upload, and for the accuracy of anything you submit
        to a recruitment portal.
      </p>

      <h2 id="disclaimer">No affiliation, no guarantee</h2>
      <p>
        PhotoResizer is an independent tool. It is not affiliated with, endorsed by, or operated by
        UPSC, SSC, IBPS, RRB, any State Public Service Commission, or any other recruitment body.
        Names of examinations are used only to identify the requirements published for them.
      </p>
      <p>
        The size presets are transcribed from official notifications and are checked periodically,
        but notifications are revised and portals sometimes apply additional rules. The tool cannot
        guarantee that a given portal will accept a given file. Always read the notification you are
        applying under, and verify the output before you submit it. We are not responsible for a
        rejected application, a missed deadline, or any loss arising from use of the tool.
      </p>

      <h2>Availability</h2>
      <p>
        The service is offered as-is and as-available. We may change, suspend or discontinue any
        part of it, including individual presets and tools, without notice.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, our liability arising out of or relating to your use
        of the site is limited to zero, reflecting the fact that the service is provided free of
        charge. Nothing here excludes liability that cannot lawfully be excluded.
      </p>

      <h2>Governing law</h2>
      <p>Any dispute relating to these terms is subject to the laws of India.</p>

      <h2>Contact</h2>
      <p>Questions about these terms can be sent to hello@photoresizer.click.</p>
    </PageShell>
  );
}
