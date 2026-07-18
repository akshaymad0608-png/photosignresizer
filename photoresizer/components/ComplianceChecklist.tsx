import React from 'react';
import { Check, AlertTriangle, X } from 'lucide-react';
import { Check as CheckItem } from '../utils/analyze';

const ICONS = {
  pass: Check,
  warn: AlertTriangle,
  fail: X,
} as const;

const TONE = {
  pass: 'text-pass border-pass/35 bg-pass-tint',
  warn: 'text-warn border-warn/35 bg-warn-tint',
  fail: 'text-fail border-fail/35 bg-fail-tint',
} as const;

/**
 * The checks a form clerk runs before accepting an upload, run here instead
 * so nobody finds out at the payment step that their photo was rejected.
 */
const ComplianceChecklist = ({ checks }: { checks: CheckItem[] }) => {
  if (!checks.length) return null;

  return (
    <div className="card-sunk p-4">
      <div className="label-field mb-3">Form checks</div>
      <ul className="space-y-2.5">
        {checks.map(item => {
          const Icon = ICONS[item.status];
          return (
            <li key={item.id} className="flex gap-3">
              <span
                className={`mt-0.5 shrink-0 w-5 h-5 rounded-md border flex items-center justify-center ${TONE[item.status]}`}
              >
                <Icon size={12} strokeWidth={3} />
              </span>
              <span className="min-w-0">
                <span className="block text-[13px] font-semibold text-ink">{item.label}</span>
                <span className="block text-[12px] text-muted leading-snug">{item.detail}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ComplianceChecklist;
