"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export default function DonationCard() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    buttonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;

    dialogRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        return;
      }
      if (event.key !== "Tab") return;

      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusables = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((element) => !element.hasAttribute("disabled"));
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, close]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className="donation-card"
        onClick={() => setOpen(true)}
      >
        <span className="donation-action">
          <span className="donation-coffee" aria-hidden="true">
            ☕
          </span>
          <span>扫码请我喝咖啡</span>
          <span className="donation-arrow" aria-hidden="true">
            ›
          </span>
        </span>
        <span className="donation-note">感谢每一位支持 Tracé 的创作者。</span>
      </button>

      {open && (
        <div className="donation-modal" onClick={close}>
          <div
            ref={dialogRef}
            className="donation-modal-card"
            role="dialog"
            aria-modal="true"
            aria-label="支付宝收款码"
            tabIndex={-1}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="donation-modal-close"
              aria-label="关闭"
              onClick={close}
            >
              ×
            </button>
            <img
              src="/打赏收款码.JPG"
              alt="支付宝收款码"
              width="1200"
              height="1800"
              loading="lazy"
              decoding="async"
            />
            <p className="donation-modal-hint">打开支付宝扫一扫</p>
          </div>
        </div>
      )}
    </>
  );
}
