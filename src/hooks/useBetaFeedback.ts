/**
 * useBetaFeedback.ts — Hook de estado para el formulario beta de 4 pasos.
 * ────────────────────────────────────────────────────────────────────────
 * Uses Web3Forms (https://web3forms.com) — 250 free submissions/month,
 * no backend required.
 *
 * SETUP
 * ─────
 * 1. Go to https://web3forms.com → enter your email → copy the Access Key.
 * 2. En el .env del proyecto (copiá desde .env.example) agregá:
 *
 *      VITE_WEB3FORMS_KEY=your-access-key-here
 *
 * Podés usar la misma key para ambos formularios — Web3Forms los diferencia
 * por el campo "subject" en el email que recibís.
 *
 * Si no está configurado, simula éxito en consola (modo dev).
 */

import { useState } from "react";

// ── Endpoint & key ───────────────────────────────────────────────────────────
const WEB3FORMS_KEY = (import.meta.env.VITE_WEB3FORMS_KEY as string | undefined) ?? "";
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

// ── Status ──────────────────────────────────────────────────────────────────
export type SendStatus = "idle" | "sending" | "success" | "error";

// ── Step models ─────────────────────────────────────────────────────────────
export interface Step1Data {
  nombre: string;
  empresa: string;
  cargo: string;
  cantidadImpresoras: string;
}

export interface Step2Data {
  facilidadUso: number;            // 1-5
  velocidadEscaneo: number;        // 1-5
  utilidadAlertas: number;         // 1-5
  funcionalidadesUsadas: string[]; // checkboxes
}

export interface Step3Data {
  tuvoBugs: string;                // "si" | "no" | "no-se"
  descripcionBugs: string;
  mejoraPrincipal: string;
  funcionalidadFaltante: string;
}

export interface Step4Data {
  nps: number;                     // 0-10
  continuarUsando: string;         // "si" | "no" | "tal-vez"
  comentarioFinal: string;
}

export interface BetaFormData {
  step1: Step1Data;
  step2: Step2Data;
  step3: Step3Data;
  step4: Step4Data;
}

// ── Defaults ─────────────────────────────────────────────────────────────────
function defaultStep1(): Step1Data {
  return { nombre: "", empresa: "", cargo: "", cantidadImpresoras: "" };
}
function defaultStep2(): Step2Data {
  return { facilidadUso: 0, velocidadEscaneo: 0, utilidadAlertas: 0, funcionalidadesUsadas: [] };
}
function defaultStep3(): Step3Data {
  return { tuvoBugs: "", descripcionBugs: "", mejoraPrincipal: "", funcionalidadFaltante: "" };
}
function defaultStep4(): Step4Data {
  return { nps: -1, continuarUsando: "", comentarioFinal: "" };
}

// ── Validation ───────────────────────────────────────────────────────────────
export function validateStep(step: number, data: BetaFormData): string[] {
  const errors: string[] = [];
  switch (step) {
    case 1:
      if (!data.step1.nombre.trim())         errors.push("El nombre es obligatorio.");
      if (!data.step1.empresa.trim())        errors.push("La empresa es obligatoria.");
      if (!data.step1.cargo.trim())          errors.push("El cargo es obligatorio.");
      if (!data.step1.cantidadImpresoras)    errors.push("Seleccioná la cantidad de impresoras.");
      break;
    case 2:
      if (data.step2.facilidadUso === 0)     errors.push("Calificá la facilidad de uso.");
      if (data.step2.velocidadEscaneo === 0) errors.push("Calificá la velocidad de escaneo.");
      if (data.step2.utilidadAlertas === 0)  errors.push("Calificá la utilidad de alertas.");
      break;
    case 3:
      if (!data.step3.tuvoBugs) errors.push("Indicá si encontraste bugs.");
      if (data.step3.tuvoBugs === "si" && !data.step3.descripcionBugs.trim())
        errors.push("Por favor describí los bugs encontrados.");
      break;
    case 4:
      if (data.step4.nps < 0)           errors.push("Seleccioná tu puntuación NPS.");
      if (!data.step4.continuarUsando)   errors.push("Indicá si continuarías usando PSA.");
      break;
  }
  return errors;
}

// ── Payload builder ──────────────────────────────────────────────────────────
function buildPayload(data: BetaFormData) {
  return {
    // Web3Forms required
    access_key: WEB3FORMS_KEY,
    subject:    `[PSA Beta] Feedback de ${data.step1.empresa || data.step1.nombre}`,
    from_name:  "InkPulse Beta Program",
    // Paso 1 — Perfil
    nombre:              data.step1.nombre.trim(),
    empresa:             data.step1.empresa.trim(),
    cargo:               data.step1.cargo.trim(),
    cantidad_impresoras: data.step1.cantidadImpresoras,
    // Paso 2 — Experiencia
    rating_facilidad_uso:     data.step2.facilidadUso,
    rating_velocidad_escaneo: data.step2.velocidadEscaneo,
    rating_utilidad_alertas:  data.step2.utilidadAlertas,
    funcionalidades_usadas:   data.step2.funcionalidadesUsadas.join(", "),
    // Paso 3 — Bugs y mejoras
    tuvo_bugs:             data.step3.tuvoBugs,
    descripcion_bugs:      data.step3.descripcionBugs.trim(),
    mejora_principal:      data.step3.mejoraPrincipal.trim(),
    funcionalidad_faltante: data.step3.funcionalidadFaltante.trim(),
    // Paso 4 — NPS y cierre
    nps:              data.step4.nps,
    continuar_usando: data.step4.continuarUsando,
    comentario_final: data.step4.comentarioFinal.trim(),
  };
}

// ── Hook ─────────────────────────────────────────────────────────────────────
export interface UseBetaFeedbackReturn {
  currentStep: number;
  totalSteps: number;
  data: BetaFormData;
  errors: string[];
  status: SendStatus;
  serverError: string;
  updateStep1: (field: keyof Step1Data, value: string) => void;
  updateStep2: (field: keyof Step2Data, value: number | string[]) => void;
  updateStep3: (field: keyof Step3Data, value: string) => void;
  updateStep4: (field: keyof Step4Data, value: number | string) => void;
  nextStep: () => boolean;
  prevStep: () => void;
  handleSubmit: () => Promise<void>;
}

export function useBetaFeedback(): UseBetaFeedbackReturn {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const [data, setData] = useState<BetaFormData>({
    step1: defaultStep1(),
    step2: defaultStep2(),
    step3: defaultStep3(),
    step4: defaultStep4(),
  });

  const [errors, setErrors]           = useState<string[]>([]);
  const [status, setStatus]           = useState<SendStatus>("idle");
  const [serverError, setServerError] = useState("");

  function updateStep1(field: keyof Step1Data, value: string) {
    setData((prev) => ({ ...prev, step1: { ...prev.step1, [field]: value } }));
    setErrors([]);
  }
  function updateStep2(field: keyof Step2Data, value: number | string[]) {
    setData((prev) => ({ ...prev, step2: { ...prev.step2, [field]: value } }));
    setErrors([]);
  }
  function updateStep3(field: keyof Step3Data, value: string) {
    setData((prev) => ({ ...prev, step3: { ...prev.step3, [field]: value } }));
    setErrors([]);
  }
  function updateStep4(field: keyof Step4Data, value: number | string) {
    setData((prev) => ({ ...prev, step4: { ...prev.step4, [field]: value } }));
    setErrors([]);
  }

  function nextStep(): boolean {
    const errs = validateStep(currentStep, data);
    if (errs.length > 0) { setErrors(errs); return false; }
    setErrors([]);
    setCurrentStep((s) => Math.min(s + 1, totalSteps));
    return true;
  }

  function prevStep() {
    setErrors([]);
    setCurrentStep((s) => Math.max(s - 1, 1));
  }

  async function handleSubmit() {
    const errs = validateStep(4, data);
    if (errs.length > 0) { setErrors(errs); return; }
    setErrors([]);

    if (!WEB3FORMS_KEY) {
      console.warn("[useBetaFeedback] No VITE_WEB3FORMS_KEY set. Simulating success.\nPayload:", buildPayload(data));
      setStatus("sending");
      await new Promise((r) => setTimeout(r, 1400));
      setStatus("success");
      return;
    }

    setStatus("sending");
    setServerError("");
    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method:  "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body:    JSON.stringify(buildPayload(data)),
      });

      const body = await res.json().catch(() => ({})) as { success?: boolean; message?: string };

      if (res.ok && body.success) {
        setStatus("success");
      } else {
        setServerError(body.message ?? "Error al enviar. Por favor intentá nuevamente.");
        setStatus("error");
      }
    } catch {
      setServerError("Sin conexión. Verificá tu red e intentá nuevamente.");
      setStatus("error");
    }
  }

  return {
    currentStep, totalSteps, data, errors, status, serverError,
    updateStep1, updateStep2, updateStep3, updateStep4,
    nextStep, prevStep, handleSubmit,
  };
}
