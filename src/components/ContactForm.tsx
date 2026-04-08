/**
 * ContactForm.tsx
 * ──────────────────────────────────────────────────────────────────
 * Renders the contact / quote form.
 * All state logic lives in useForm — this component is pure presentation.
 *
 * States
 * ──────
 * idle     → Form ready for input.
 * sending  → Button shows "Procesando..." with animated #66dd8b border.
 * success  → Form replaced by confirmation box (border #b1c7f2).
 * error    → Server-error banner appears above the submit button.
 */

import { Send } from "lucide-react";
import { useForm } from "../hooks/useForm";
import type { FieldState } from "../hooks/useForm";
import { PLAN_OPTIONS } from "../lib/formOptions";

interface ContactFormProps {
  defaultPlan?:  string;
  submitLabel?:  string;
}

export default function ContactForm({
  defaultPlan = "",
  submitLabel = "Enviar Consulta",
}: ContactFormProps) {
  const { fields, status, serverError, update, touch, handleSubmit } =
    useForm(defaultPlan);

  // ── Success state ────────────────────────────────────────────────
  // Border: #b1c7f2 = var(--color-primary)
  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-6 border-2 border-primary bg-surface-mid p-12 text-center">
        {/* Symmetric checkmark container — same dimensions as the box padding */}
        <div className="flex h-14 w-14 items-center justify-center border-2 border-primary bg-primary/10">
          {/* SVG check — no external icon dep for this state */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-7 w-7 text-primary"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <div>
          <p className="font-headline text-lg font-bold text-on-surface">
            Solicitud recibida.
          </p>
          <p className="mt-2 font-body text-sm leading-relaxed text-on-surface-variant">
            Nos comunicaremos con{" "}
            <span className="font-semibold text-primary">
              {fields.nombre.value.trim()}
            </span>{" "}
            a la brevedad.
          </p>
        </div>
      </div>
    );
  }

  // ── Input class helper ───────────────────────────────────────────
  function inputCls(f: FieldState) {
    return [
      "w-full rounded-none border-2 bg-surface-dim px-4 py-3",
      "font-body text-sm text-on-surface outline-none transition-colors",
      f.touched && f.error
        ? "border-error"
        : "border-outline-variant focus:border-tertiary",
    ].join(" ");
  }

  // ── Sending button state ─────────────────────────────────────────
  // The animated #66dd8b border is driven by the CSS class `animate-border-pulse`
  // defined in index.css. Background is dark so the pulsing border pops.
  const isSending = status === "sending";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="border-edge bg-surface-mid p-8"
    >
      {/* Row: Nombre + Empresa */}
      <div className="mb-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block font-body text-[10px] font-semibold uppercase tracking-widest text-on-surface-variant">
            Nombre *
          </label>
          <input
            type="text"
            value={fields.nombre.value}
            onChange={(e) => update("nombre", e.target.value)}
            onBlur={() => touch("nombre")}
            placeholder="Juan García"
            disabled={isSending}
            className={inputCls(fields.nombre)}
          />
          {fields.nombre.touched && fields.nombre.error && (
            <p className="mt-1 font-body text-[11px] text-error">
              {fields.nombre.error}
            </p>
          )}
        </div>
        <div>
          <label className="mb-1 block font-body text-[10px] font-semibold uppercase tracking-widest text-on-surface-variant">
            Empresa *
          </label>
          <input
            type="text"
            value={fields.empresa.value}
            onChange={(e) => update("empresa", e.target.value)}
            onBlur={() => touch("empresa")}
            placeholder="Acme S.A."
            disabled={isSending}
            className={inputCls(fields.empresa)}
          />
          {fields.empresa.touched && fields.empresa.error && (
            <p className="mt-1 font-body text-[11px] text-error">
              {fields.empresa.error}
            </p>
          )}
        </div>
      </div>

      {/* Plan de Interés */}
      <div className="mb-4">
        <label className="mb-1 block font-body text-[10px] font-semibold uppercase tracking-widest text-on-surface-variant">
          Plan de Interés *
        </label>
        <select
          value={fields.plan.value}
          onChange={(e) => update("plan", e.target.value)}
          onBlur={() => touch("plan")}
          disabled={isSending}
          className={`${inputCls(fields.plan)} cursor-pointer appearance-none`}
        >
          <option value="">Seleccionar plan...</option>
          {PLAN_OPTIONS.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        {fields.plan.touched && fields.plan.error && (
          <p className="mt-1 font-body text-[11px] text-error">
            {fields.plan.error}
          </p>
        )}
      </div>

      {/* Email Corporativo */}
      <div className="mb-4">
        <label className="mb-1 block font-body text-[10px] font-semibold uppercase tracking-widest text-on-surface-variant">
          Email *
        </label>
        <input
          type="email"
          value={fields.email.value}
          onChange={(e) => update("email", e.target.value)}
          onBlur={() => touch("email")}
          placeholder="juan@empresa.com"
          disabled={isSending}
          className={inputCls(fields.email)}
        />
        {fields.email.touched && fields.email.error && (
          <p className="mt-1 font-body text-[11px] text-error">
            {fields.email.error}
          </p>
        )}
      </div>

      {/* Mensaje */}
      <div className="mb-6">
        <label className="mb-1 block font-body text-[10px] font-semibold uppercase tracking-widest text-on-surface-variant">
          Mensaje *
        </label>
        <textarea
          rows={4}
          value={fields.mensaje.value}
          onChange={(e) => update("mensaje", e.target.value)}
          onBlur={() => touch("mensaje")}
          placeholder="Cuéntenos sobre su flota de impresoras y sus necesidades..."
          disabled={isSending}
          className={`${inputCls(fields.mensaje)} resize-none`}
        />
        {fields.mensaje.touched && fields.mensaje.error && (
          <p className="mt-1 font-body text-[11px] text-error">
            {fields.mensaje.error}
          </p>
        )}
      </div>

      {/* Server-error banner */}
      {status === "error" && serverError && (
        <p className="mb-4 border-2 border-error/40 bg-error/10 px-4 py-2 font-body text-sm text-error">
          {serverError}
        </p>
      )}

      {/* Submit button
          ─ idle/error  → solid tertiary fill
          ─ sending     → dark bg + animated #66dd8b (tertiary) pulsing border
      */}
      <button
        type="submit"
        disabled={isSending}
        className={[
          "inline-flex w-full items-center justify-center gap-2 rounded-none border-2",
          "px-7 py-3 font-headline text-sm font-bold transition-colors",
          "disabled:cursor-not-allowed",
          isSending
            ? "animate-border-pulse border-tertiary bg-surface-dim text-tertiary"
            : "border-tertiary bg-tertiary text-on-tertiary hover:bg-tertiary/90",
        ].join(" ")}
      >
        {isSending ? (
          "Procesando..."
        ) : (
          <>
            {submitLabel}
            <Send size={16} />
          </>
        )}
      </button>
    </form>
  );
}
