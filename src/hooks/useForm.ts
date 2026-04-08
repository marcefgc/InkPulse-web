/**
 * useForm.ts — Custom hook for PSA Enterprise contact & quote forms.
 * ──────────────────────────────────────────────────────────────────
 * [Backend Architect]  Owns the JSON payload structure and HTTP contract.
 * [Frontend Developer] Owns field state, validation pipeline, and send lifecycle.
 *
 * FORMSPREE SETUP
 * ───────────────
 * 1. Go to https://formspree.io → "New Form" → copy the form ID (e.g. "xpwzabcd").
 * 2. Open  landing/.env  (create it from .env.example if needed) and set:
 *
 *      VITE_FORMSPREE_ID=xpwzabcd
 *
 * 3. That's it. The hook reads the variable at build time via import.meta.env.
 *    The endpoint resolves to: https://formspree.io/f/<your-id>
 *
 * ALTERNATIVE (Netlify Forms)
 * ───────────────────────────
 * Set VITE_FORM_ENDPOINT to your Netlify or any compatible REST endpoint.
 * The payload is plain JSON — no library dependency required.
 */

import { useState } from "react";

// ── Endpoint resolution ────────────────────────────────────────────────────
const FORMSPREE_ID = (import.meta.env.VITE_FORMSPREE_ID as string | undefined) ?? "";
const CUSTOM_ENDPOINT = (import.meta.env.VITE_FORM_ENDPOINT as string | undefined) ?? "";

export const FORM_ENDPOINT =
  CUSTOM_ENDPOINT ||
  (FORMSPREE_ID ? `https://formspree.io/f/${FORMSPREE_ID}` : "");

// ── Send status ────────────────────────────────────────────────────────────
export type SendStatus = "idle" | "sending" | "success" | "error";

// ── Field model ────────────────────────────────────────────────────────────
export interface FieldState {
  value: string;
  error: string;
  touched: boolean;
}

export interface FormValues {
  nombre:  FieldState;
  empresa: FieldState;
  plan:    FieldState;
  email:   FieldState;
  mensaje: FieldState;
}

function emptyField(value = ""): FieldState {
  return { value, error: "", touched: false };
}

// ── Validation ─────────────────────────────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateField(name: keyof FormValues, value: string): string {
  const v = value.trim();
  switch (name) {
    case "nombre":
      if (v.length === 0) return "El nombre es obligatorio.";
      if (v.length < 2)   return "El nombre debe tener al menos 2 caracteres.";
      return "";
    case "empresa":
      if (v.length === 0) return "La empresa es obligatoria.";
      if (v.length < 2)   return "El nombre de la empresa es muy corto.";
      return "";
    case "plan":
      return v === "" ? "Seleccione un plan de interés." : "";
    case "email":
      if (v.length === 0)       return "El email es obligatorio.";
      if (!EMAIL_RE.test(v))    return "Ingrese un email válido (ej. juan@empresa.com).";
      return "";
    case "mensaje":
      if (v.length === 0)  return "El mensaje es obligatorio.";
      if (v.length < 10)   return "El mensaje debe tener al menos 10 caracteres.";
      return "";
    default:
      return "";
  }
}

function isValid(values: FormValues): boolean {
  return (Object.keys(values) as (keyof FormValues)[]).every(
    (k) => validateField(k, values[k].value) === ""
  );
}

// ── [Backend Architect] JSON payload ──────────────────────────────────────
// This is the exact structure delivered to the destination email.
// Order matters: Formspree renders fields top-to-bottom in the email body.
interface FormPayload {
  nombre:            string;
  empresa:           string;
  plan_seleccionado: string;
  email:             string;
  mensaje:           string;
  // Formspree meta-directives (underscore prefix = not shown in email body)
  _subject:          string;
  _replyto:          string;
}

function buildPayload(v: FormValues): FormPayload {
  const nombre  = v.nombre.value.trim();
  const empresa = v.empresa.value.trim();
  return {
    nombre,
    empresa,
    plan_seleccionado: v.plan.value,
    email:             v.email.value.trim(),
    mensaje:           v.mensaje.value.trim(),
    _subject:  `[PSA Enterprise] Solicitud de ${empresa || nombre}`,
    _replyto:  v.email.value.trim(),
  };
}

// ── Hook ───────────────────────────────────────────────────────────────────
export interface UseFormReturn {
  fields:      FormValues;
  status:      SendStatus;
  serverError: string;
  update:      (name: keyof FormValues, value: string) => void;
  touch:       (name: keyof FormValues) => void;
  handleSubmit:(e: React.FormEvent) => Promise<void>;
}

export function useForm(defaultPlan = ""): UseFormReturn {
  const [fields, setFields] = useState<FormValues>({
    nombre:  emptyField(),
    empresa: emptyField(),
    plan:    emptyField(defaultPlan),
    email:   emptyField(),
    mensaje: emptyField(),
  });
  const [status, setStatus]           = useState<SendStatus>("idle");
  const [serverError, setServerError] = useState("");

  // Validate live once the field has been touched at least once
  function update(name: keyof FormValues, value: string) {
    setFields((prev) => ({
      ...prev,
      [name]: {
        value,
        touched: prev[name].touched,
        error: prev[name].touched ? validateField(name, value) : "",
      },
    }));
  }

  // Mark touched + run validation on blur
  function touch(name: keyof FormValues) {
    setFields((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        touched: true,
        error: validateField(name, prev[name].value),
      },
    }));
  }

  // Touch every field to reveal all errors, then submit if clean
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Force-touch all fields so errors become visible
    const allTouched = (Object.keys(fields) as (keyof FormValues)[]).reduce(
      (acc, k) => ({
        ...acc,
        [k]: {
          ...fields[k],
          touched: true,
          error: validateField(k, fields[k].value),
        },
      }),
      {} as FormValues
    );
    setFields(allTouched);

    if (!isValid(allTouched)) return;   // Client-side gate

    if (!FORM_ENDPOINT) {
      // Dev fallback: log payload and simulate success so QA can see the UI
      console.warn(
        "[useForm] No VITE_FORMSPREE_ID set. Simulating success.\nPayload:",
        buildPayload(allTouched)
      );
      setStatus("sending");
      await new Promise((r) => setTimeout(r, 1200));
      setStatus("success");
      return;
    }

    setStatus("sending");
    setServerError("");

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method:  "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body:    JSON.stringify(buildPayload(allTouched)),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        const data = await res.json().catch(() => ({})) as { error?: string };
        setServerError(data?.error ?? "Error al enviar. Por favor intente nuevamente.");
        setStatus("error");
      }
    } catch {
      setServerError("Sin conexión. Verifique su red e intente nuevamente.");
      setStatus("error");
    }
  }

  return { fields, status, serverError, update, touch, handleSubmit };
}
