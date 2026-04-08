/**
 * QuoteModal.tsx
 * -------------------------------------------------------------
 * Full-screen overlay modal that opens when the user clicks
 * "Solicitar cotización" or "Comenzar ahora" in the Pricing section.
 * Pre-fills the plan field and shows a price summary before submission.
 */

import { useEffect } from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import ContactForm from "./ContactForm";

interface QuoteModalProps {
  /** The plan string to pre-fill (matches PLAN_OPTIONS). */
  plan: string;
  /** Price string in "Gs. 280.000/mes" format for the summary block. */
  price: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuoteModal({
  plan,
  price,
  isOpen,
  onClose,
}: QuoteModalProps) {
  // Lock body scroll while open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="quote-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-8"
          onClick={(e) => {
            // Close when clicking the backdrop
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            key="quote-modal-panel"
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-background border-2 border-outline-variant"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b-2 border-outline-variant bg-surface-mid px-6 py-4">
              <div>
                <h2 className="font-headline text-lg font-bold text-on-surface">
                  Solicitar Cotización
                </h2>
                <p className="font-body text-xs text-on-surface-variant">
                  Complete el formulario y le contactamos en 24 hs.
                </p>
              </div>
              <button
                onClick={onClose}
                aria-label="Cerrar"
                className="flex h-9 w-9 items-center justify-center border-2 border-outline-variant text-on-surface-variant transition-colors hover:border-error hover:text-error"
              >
                <X size={18} />
              </button>
            </div>

            {/* Price summary pill */}
            <div className="border-b-2 border-outline-variant bg-surface-low px-6 py-3">
              <div className="flex items-center justify-between gap-4">
                <span className="font-body text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
                  Plan seleccionado
                </span>
                <div className="flex flex-col items-end">
                  <span className="font-headline text-sm font-bold text-on-surface">
                    {plan.split(" — ")[0]}
                  </span>
                  <span className="font-body text-xs text-tertiary">{price}</span>
                </div>
              </div>
            </div>

            {/* Form — no outer card padding, modal provides it */}
            <div className="p-6">
              <ContactForm
                defaultPlan={plan}
                submitLabel="Solicitar Cotización"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
