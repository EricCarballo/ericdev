import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import { KeyRound, X } from 'lucide-react';
import type { DemoCredentialsModalProps } from '@/interfaces/components/demo-credentials-modal';

export default function DemoCredentialsModal({
  isOpen,
  onClose,
  projectName,
  title,
  closeLabel,
  columns,
  rows,
}: DemoCredentialsModalProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-end justify-center p-4 sm:items-center sm:p-6"
      role="presentation"
    >
      <button
        type="button"
        aria-label={closeLabel}
        className="modal-backdrop-enter absolute inset-0 cursor-default bg-black/60"
        onClick={onClose}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="modal-panel-enter relative z-10 flex max-h-[min(90vh,720px)] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-foreground/10 bg-card shadow-2xl shadow-black/40"
      >
        <div className="flex items-start justify-between gap-4 border-b border-foreground/10 px-5 py-4 sm:px-6">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-500/10">
              <KeyRound className="h-4 w-4 text-violet-600 dark:text-violet-400" aria-hidden="true" />
            </div>
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                {projectName}
              </p>
              <h2 id={titleId} className="text-base font-bold text-foreground sm:text-lg">
                {title}
              </h2>
            </div>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label={closeLabel}
            className="inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-foreground/10 bg-foreground/5 text-muted-foreground transition-colors hover:border-foreground/20 hover:bg-foreground/10 hover:text-foreground"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="overflow-auto px-5 py-4 sm:px-6">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left text-[11px] sm:text-xs">
              <thead>
                <tr className="border-b border-foreground/10">
                  <th scope="col" className="px-3 py-2 font-semibold text-muted-foreground">
                    {columns.email}
                  </th>
                  <th scope="col" className="px-3 py-2 font-semibold text-muted-foreground">
                    {columns.password}
                  </th>
                  <th scope="col" className="px-3 py-2 font-semibold text-muted-foreground">
                    {columns.role}
                  </th>
                  <th scope="col" className="px-3 py-2 font-semibold text-muted-foreground">
                    {columns.panel}
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.email} className="border-b border-foreground/5 last:border-0">
                    <td className="px-3 py-2.5 font-mono text-foreground/90">{row.email}</td>
                    <td className="px-3 py-2.5 font-mono text-foreground/90">{row.password}</td>
                    <td className="px-3 py-2.5">
                      <span className="rounded-md border border-violet-500/20 bg-violet-500/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-violet-700 dark:text-violet-300">
                        {row.role}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 font-mono text-muted-foreground">{row.panel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
