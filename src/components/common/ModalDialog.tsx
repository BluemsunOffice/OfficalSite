import { useEffect, useId, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalDialogProps {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  showCloseButton?: boolean;
  closeOnEsc?: boolean;
  closeOnOverlay?: boolean;
  ariaLabel?: string;
  maxWidthClassName?: string;
  overlayClassName?: string;
  panelClassName?: string;
  headerClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
}

export default function ModalDialog({
  open,
  onClose,
  title,
  children,
  footer,
  ariaLabel,
  showCloseButton = true,
  closeOnEsc = true,
  closeOnOverlay = true,
  maxWidthClassName = "max-w-md",
  overlayClassName = "bg-black/50",
  panelClassName = "bg-white rounded-2xl shadow-2xl",
  headerClassName = "border-b border-brand-100 px-4 py-3",
  bodyClassName = "p-4",
  footerClassName = "border-t border-brand-100 px-4 py-3",
}: ModalDialogProps) {
  const titleId = useId();
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(
    null,
  );

  useEffect(() => {
    setPortalContainer(document.body);
  }, []);

  useEffect(() => {
    if (!open || !closeOnEsc) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [closeOnEsc, onClose, open]);

  useEffect(() => {
    if (!open) return;

    const lockCount = Number(document.body.dataset.modalLockCount ?? "0") + 1;
    document.body.dataset.modalLockCount = String(lockCount);

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      const nextLockCount = Math.max(
        0,
        Number(document.body.dataset.modalLockCount ?? "1") - 1,
      );

      if (nextLockCount === 0) {
        delete document.body.dataset.modalLockCount;
        document.body.style.overflow = originalOverflow;
      } else {
        document.body.dataset.modalLockCount = String(nextLockCount);
      }
    };
  }, [open]);

  if (!open || !portalContainer) return null;

  const modalNode = (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${overlayClassName}`}
      onClick={closeOnOverlay ? onClose : undefined}
      role="presentation"
    >
      <div
        className={`relative w-full overflow-hidden ${maxWidthClassName} ${panelClassName}`}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={
          ariaLabel ?? (typeof title === "string" ? title : undefined)
        }
        aria-labelledby={
          !ariaLabel && title && typeof title !== "string" ? titleId : undefined
        }
      >
        {(title || showCloseButton) && (
          <div
            className={`flex items-center justify-between ${headerClassName}`}
          >
            <div id={titleId} className="text-sm font-semibold text-ink-900">
              {title}
            </div>
            {showCloseButton && (
              <button
                className="rounded-lg p-1.5 text-ink-500 transition hover:bg-brand-50 hover:text-ink-900"
                aria-label="关闭"
                type="button"
                onClick={onClose}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            )}
          </div>
        )}

        <div className={bodyClassName}>{children}</div>

        {footer && <div className={footerClassName}>{footer}</div>}
      </div>
    </div>
  );

  return createPortal(modalNode, portalContainer);
}
