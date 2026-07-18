import React, { useEffect, useState } from 'react';
import { Download, X, WifiOff } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const DISMISS_KEY = 'pr:install-dismissed';

/** Offers the PWA install prompt once the browser says the app is installable. */
export default function InstallBanner() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = localStorage.getItem(DISMISS_KEY) === '1';
    } catch {
      /* private mode — treat as not dismissed */
    }
    if (dismissed) return;

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
      setVisible(true);
    };

    const onInstalled = () => setVisible(false);

    window.addEventListener('beforeinstallprompt', onPrompt);
    window.addEventListener('appinstalled', onInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem(DISMISS_KEY, '1');
    } catch {
      /* ignore */
    }
  };

  const install = async () => {
    if (!deferred) return;
    await deferred.prompt();
    await deferred.userChoice;
    setVisible(false);
    setDeferred(null);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Install PhotoResizer"
      className="fixed bottom-[76px] lg:bottom-5 left-3 right-3 sm:left-auto sm:right-5 sm:w-[360px] z-50 glass-strong rounded-2xl shadow-xl border border-line p-4 animate-fade-in-up"
    >
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss install prompt"
        className="absolute top-2.5 right-2.5 w-7 h-7 rounded-lg text-fg-faint hover:text-fg hover:bg-surface-2 flex items-center justify-center transition-colors"
      >
        <X size={15} />
      </button>

      <div className="flex gap-3 pr-6">
        <span className="w-10 h-10 shrink-0 rounded-xl grad-fill text-white flex items-center justify-center">
          <Download size={18} />
        </span>
        <div className="min-w-0">
          <p className="text-[14px] font-semibold text-fg">Install PhotoResizer</p>
          <p className="text-[12.5px] leading-snug text-fg-muted mt-0.5 flex items-center gap-1.5">
            <WifiOff size={12} />
            Works without internet once installed.
          </p>
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <button type="button" onClick={install} className="btn btn-primary btn-sm flex-1">
          Install
        </button>
        <button type="button" onClick={dismiss} className="btn btn-ghost btn-sm">
          Not now
        </button>
      </div>
    </div>
  );
}
