/**
 * useForm.ts — Custom hook for InkPulse contact & quote forms.
 * ─────────────────────────────────────────────────────────────
 * Uses Web3Forms (https://web3forms.com) — 250 free submissions/month,
 * no backend required, works directly from the browser.
 *
 * SETUP
 * ─────
 * 1. Go to https://web3forms.com → enter your email → copy the Access Key.
 * 2. Create a .env file in the project root (copy from .env.example) and set:
 *
 *      VITE_WEB3FORMS_KEY=your-access-key-here
 *
 * 3. That's it. The hook picks it up at build time via import.meta.env.
 */

import { useState } from "react";

// ── Endpoint & key ─────────────────────────────────────────────────────────
const WEB3FORMS_KEY = (import.meta.env.VITE_WEB3FORMS_KEY as string | undefined) ?? "";
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

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
      if (v.length === 0)    return "El email es obligatorio.";
      if (!EMAIL_RE.test(v)) return "Ingrese un email válido (ej. juan@empresa.com).";
      return "";
    case "mensaje":
      if (v.length === 0) return "El mensaje es obligatorio.";
      if (v.length < 10)  return "El mensaje debe tener al menos 10 caracteres.";
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

// ── Payload ────────────────────────────────────────────────────────────────
function buildPayload(v: FormValues) {
  const nombre  = v.nombre.value.trim();
  const empresa = v.empresa.value.trim();
  return {
    access_key: WEB3FORMS_KEY,
    subject:    `[PSA Enterprise] Solicitud de ${empresa || nombre}`,
    from_name:  "InkPulse Web",
    replyto:    v.email.value.trim(),
    nombre,
    empresa,
    plan_seleccionado: v.plan.value,
    email:             v.email.value.trim(),
    mensaje:           v.mensaje.value.trim(),
  };
}

// ── Hook ───────────────────────────────────────────────────────────────────
export interface UseFormReturn {
  fields:       FormValues;
  status:       SendStatus;
  serverError:  string;
  update:       (name: keyof FormValues, value: string) => void;
  touch:        (name: keyof FormValues) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

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

    if (!isValid(allTouched)) return;

    if (!WEB3FORMS_KEY) {
      console.warn("[useForm] No VITE_WEB3FORMS_KEY set. Simulating success.\nPayload:", buildPayload(allTouched));
      setStatus("sending");
      await new Promise((r) => setTimeout(r, 1200));
      setStatus("success");
      return;
    }

    setStatus("sending");
    setServerError("");

    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method:  "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body:    JSON.stringify(buildPayload(allTouched)),
      });

      const data = await res.json().catch(() => ({})) as { success?: boolean; message?: string };

      if (res.ok && data.success) {
        setStatus("success");
      } else {
        setServerError(data.message ?? "Error al enviar. Por favor intente nuevamente.");
        setStatus("error");
      }
    } catch {
      setServerError("Sin conexión. Verifique su red e intente nuevamente.");
      setStatus("error");
    }
  }

  return { fields, status, serverError, update, touch, handleSubmit };
}
