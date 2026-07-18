import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, CornerDownLeft, ArrowUp, ArrowDown, Sparkles, FileText, Wrench, GraduationCap,
} from 'lucide-react';
import { EXAM_PRESETS } from '../constants';
import { MEGA_MENU } from './navigation/megaMenu';

interface Command {
  id: string;
  label: string;
  hint?: string;
  group: string;
  action: () => void;
  keywords?: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSelectExam?: (examId: string) => void;
}

const GROUP_ICON: Record<string, React.ElementType> = {
  Exams: GraduationCap,
  Tools: Wrench,
  Pages: FileText,
  Actions: Sparkles,
};

export default function CommandPalette({ open, onClose, onSelectExam }: Props) {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const commands = useMemo<Command[]>(() => {
    const nav: Command[] = [];

    MEGA_MENU.forEach(group => {
      group.columns?.forEach(col =>
        col.items.forEach(item =>
          nav.push({
            id: `nav-${item.href}-${item.label}`,
            label: item.label,
            hint: item.desc,
            group: group.id === 'tools' ? 'Tools' : group.id === 'exams' ? 'Exams' : 'Pages',
            action: () => navigate(item.href),
          })
        )
      );
    });

    const exams: Command[] = EXAM_PRESETS.slice(0, 60).map(e => ({
      id: `exam-${e.id}`,
      label: e.name,
      hint: `${e.photo.width}x${e.photo.height} px · ${e.photo.minKB}–${e.photo.maxKB} KB`,
      group: 'Exams',
      keywords: `${e.category} ${e.photo.width}x${e.photo.height} ${e.photo.maxKB}kb`,
      action: () => {
        onSelectExam?.(e.id);
        navigate('/#resize');
        document.getElementById('resize')?.scrollIntoView({ behavior: 'smooth' });
      },
    }));

    const actions: Command[] = [
      {
        id: 'act-theme',
        label: 'Toggle dark mode',
        group: 'Actions',
        action: () => document.documentElement.classList.toggle('dark'),
      },
      {
        id: 'act-top',
        label: 'Jump to the resizer',
        group: 'Actions',
        action: () => document.getElementById('resize')?.scrollIntoView({ behavior: 'smooth' }),
      },
      {
        id: 'act-print',
        label: 'Print this page',
        group: 'Actions',
        action: () => window.print(),
      },
    ];

    return [...nav, ...exams, ...actions];
  }, [navigate, onSelectExam]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands.slice(0, 12);
    return commands
      .map(c => {
        const hay = `${c.label} ${c.hint || ''} ${c.keywords || ''}`.toLowerCase();
        const idx = hay.indexOf(q);
        if (idx === -1) return null;
        // Prefer matches at the start of the label.
        const score = c.label.toLowerCase().startsWith(q) ? 0 : idx;
        return { cmd: c, score };
      })
      .filter((x): x is { cmd: Command; score: number } => x !== null)
      .sort((a, b) => a.score - b.score)
      .slice(0, 30)
      .map(x => x.cmd);
  }, [query, commands]);

  // Reset the highlight whenever the query changes (React's "adjust state
  // during render" pattern — cheaper than an effect and avoids a flash).
  const [lastQuery, setLastQuery] = useState(query);
  if (lastQuery !== query) {
    setLastQuery(query);
    setActive(0);
  }

  // Clear the query the moment the dialog opens.
  const [lastOpen, setLastOpen] = useState(open);
  if (lastOpen !== open) {
    setLastOpen(open);
    if (open) setQuery('');
  }

  // Focus the input once the dialog has painted.
  useEffect(() => {
    if (!open) return;
    const id = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(id);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  if (!open) return null;

  const run = (cmd: Command) => {
    cmd.action();
    onClose();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive(i => (i + 1) % Math.max(1, results.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive(i => (i - 1 + results.length) % Math.max(1, results.length));
    } else if (e.key === 'Enter' && results[active]) {
      e.preventDefault();
      run(results[active]);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[12vh] px-4">
      <div className="absolute inset-0 bg-fg/30 backdrop-blur-sm animate-[pop_.2s_ease-out]" onClick={onClose} />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search and commands"
        className="relative w-full max-w-xl card shadow-xl overflow-hidden animate-[pop_.22s_var(--ease-spring)]"
        onKeyDown={onKeyDown}
      >
        <div className="flex items-center gap-3 px-4 h-14 border-b border-line">
          <Search size={17} className="text-fg-muted shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search exams, tools and pages…"
            aria-label="Search"
            className="flex-1 bg-transparent border-0 outline-none text-[15px] placeholder:text-fg-faint"
          />
          <kbd className="px-1.5 py-0.5 rounded border border-line text-[10px] font-mono text-fg-faint">ESC</kbd>
        </div>

        <div ref={listRef} className="max-h-[52vh] overflow-y-auto py-2">
          {results.length === 0 && (
            <p className="px-4 py-10 text-center text-sm text-fg-muted">
              Nothing matched “{query}”. Try an exam name or a size like 350x450.
            </p>
          )}

          {results.map((cmd, i) => {
            const showGroup = i === 0 || results[i - 1].group !== cmd.group;
            const Icon = GROUP_ICON[cmd.group] || FileText;
            return (
              <React.Fragment key={cmd.id}>
                {showGroup && <p className="label-field px-4 pt-3 pb-1">{cmd.group}</p>}
                <button
                  type="button"
                  data-index={i}
                  onMouseMove={() => setActive(i)}
                  onClick={() => run(cmd)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                    active === i ? 'bg-surface-2' : ''
                  }`}
                >
                  <Icon size={15} className={active === i ? 'text-brand-600' : 'text-fg-faint'} />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[14px] font-medium text-fg truncate">{cmd.label}</span>
                    {cmd.hint && (
                      <span className="block text-[12px] text-fg-muted font-mono truncate">{cmd.hint}</span>
                    )}
                  </span>
                  {active === i && <CornerDownLeft size={13} className="text-fg-faint shrink-0" />}
                </button>
              </React.Fragment>
            );
          })}
        </div>

        <div className="flex items-center gap-4 px-4 h-10 border-t border-line bg-surface-2 text-[11px] text-fg-muted">
          <span className="flex items-center gap-1"><ArrowUp size={11} /><ArrowDown size={11} /> navigate</span>
          <span className="flex items-center gap-1"><CornerDownLeft size={11} /> open</span>
          <span className="ml-auto font-mono">{results.length} results</span>
        </div>
      </div>
    </div>
  );
}
