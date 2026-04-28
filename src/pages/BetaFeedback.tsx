import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { useBetaFeedback } from "../hooks/useBetaFeedback";

// ── Animation ────────────────────────────────────────────────────────────────
const slideVariants = {
  enter: { opacity: 0, x: 40 },
  center: { opacity: 1, x: 0, transition: { duration: 0.35, ease: "easeOut" as const } },
  exit:  { opacity: 0, x: -40, transition: { duration: 0.25, ease: "easeIn" as const } },
};

// ── Sub-components ────────────────────────────────────────────────────────────
function StarRating({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-body text-sm text-on-surface-variant">{label}</span>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            className={`flex size-10 items-center justify-center rounded-none border-2 font-headline text-sm font-bold transition-colors ${
              value >= n
                ? "border-primary bg-primary text-on-primary"
                : "border-outline-variant bg-transparent text-on-surface-variant hover:border-primary hover:text-primary"
            }`}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}

function RadioGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-body text-sm text-on-surface-variant">{label}</span>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`rounded-none border-2 px-4 py-2 font-headline text-xs font-bold transition-colors ${
              value === opt.value
                ? "border-tertiary bg-tertiary text-on-tertiary"
                : "border-outline-variant bg-transparent text-on-surface-variant hover:border-primary hover:text-primary"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function CheckboxGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string[];
  onChange: (v: string[]) => void;
}) {
  function toggle(item: string) {
    onChange(value.includes(item) ? value.filter((v) => v !== item) : [...value, item]);
  }
  return (
    <div className="flex flex-col gap-2">
      <span className="font-body text-sm text-on-surface-variant">{label}</span>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((opt) => {
          const checked = value.includes(opt);
          return (
            <button
              key={opt}
              type="button"
              onClick={() => toggle(opt)}
              className={`flex items-center gap-2 rounded-none border-2 px-4 py-2.5 text-left font-body text-xs transition-colors ${
                checked
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-outline-variant bg-transparent text-on-surface-variant hover:border-primary/60"
              }`}
            >
              <span className={`flex size-4 shrink-0 items-center justify-center rounded-none border-2 ${checked ? "border-primary bg-primary" : "border-outline-variant"}`}>
                {checked && <ChevronRight size={10} className="text-on-primary" strokeWidth={3} />}
              </span>
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Field helpers ─────────────────────────────────────────────────────────────
const inputClass =
  "w-full rounded-none border-2 border-outline-variant bg-surface-low px-4 py-3 font-body text-sm text-on-surface placeholder-on-surface-variant/50 outline-none transition-colors focus:border-primary";

const textareaClass = `${inputClass} min-h-[90px] resize-y`;

// ── Step content ──────────────────────────────────────────────────────────────
function StepPerfil({ fb }: { fb: ReturnType<typeof useBetaFeedback> }) {
  const { data, updateStep1 } = fb;
  return (
    <div className="flex flex-col gap-5">
      <div>
        <label className="mb-1.5 block font-headline text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
          Nombre completo *
        </label>
        <input
          className={inputClass}
          placeholder="Juan Pérez"
          value={data.step1.nombre}
          onChange={(e) => updateStep1("nombre", e.target.value)}
        />
      </div>
      <div>
        <label className="mb-1.5 block font-headline text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
          Empresa *
        </label>
        <input
          className={inputClass}
          placeholder="Empresa S.A."
          value={data.step1.empresa}
          onChange={(e) => updateStep1("empresa", e.target.value)}
        />
      </div>
      <div>
        <label className="mb-1.5 block font-headline text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
          Cargo *
        </label>
        <input
          className={inputClass}
          placeholder="IT Manager, Soporte TI…"
          value={data.step1.cargo}
          onChange={(e) => updateStep1("cargo", e.target.value)}
        />
      </div>
      <RadioGroup
        label="Cantidad de impresoras en tu red *"
        options={[
          { value: "1-5",    label: "1–5" },
          { value: "6-15",   label: "6–15" },
          { value: "16-50",  label: "16–50" },
          { value: "50+",    label: "50+" },
        ]}
        value={data.step1.cantidadImpresoras}
        onChange={(v) => updateStep1("cantidadImpresoras", v)}
      />
    </div>
  );
}

function StepExperiencia({ fb }: { fb: ReturnType<typeof useBetaFeedback> }) {
  const { data, updateStep2 } = fb;
  return (
    <div className="flex flex-col gap-6">
      <StarRating
        label="Facilidad de uso (1 = muy difícil, 5 = muy fácil) *"
        value={data.step2.facilidadUso}
        onChange={(v) => updateStep2("facilidadUso", v)}
      />
      <StarRating
        label="Velocidad de escaneo de la red (1 = muy lento, 5 = excelente) *"
        value={data.step2.velocidadEscaneo}
        onChange={(v) => updateStep2("velocidadEscaneo", v)}
      />
      <StarRating
        label="Utilidad de las alertas predictivas (1 = inútil, 5 = muy útil) *"
        value={data.step2.utilidadAlertas}
        onChange={(v) => updateStep2("utilidadAlertas", v)}
      />
      <CheckboxGroup
        label="Funcionalidades que usaste (opcional)"
        options={[
          "Dashboard de flota",
          "Alertas de tóner",
          "Eco-impact tracker",
          "Exportación de reportes",
          "Gestión de licencias",
          "Historial de eventos",
        ]}
        value={data.step2.funcionalidadesUsadas}
        onChange={(v) => updateStep2("funcionalidadesUsadas", v)}
      />
    </div>
  );
}

function StepBugs({ fb }: { fb: ReturnType<typeof useBetaFeedback> }) {
  const { data, updateStep3 } = fb;
  return (
    <div className="flex flex-col gap-5">
      <RadioGroup
        label="¿Encontraste bugs o errores durante el uso? *"
        options={[
          { value: "si",    label: "Sí" },
          { value: "no",    label: "No" },
          { value: "no-se", label: "No estoy seguro/a" },
        ]}
        value={data.step3.tuvoBugs}
        onChange={(v) => updateStep3("tuvoBugs", v)}
      />
      {data.step3.tuvoBugs === "si" && (
        <div>
          <label className="mb-1.5 block font-headline text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
            Describí los bugs encontrados *
          </label>
          <textarea
            className={textareaClass}
            placeholder="¿Qué pasó? ¿Cuándo ocurrió? ¿Se repitió?"
            value={data.step3.descripcionBugs}
            onChange={(e) => updateStep3("descripcionBugs", e.target.value)}
          />
        </div>
      )}
      <div>
        <label className="mb-1.5 block font-headline text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
          ¿Qué mejorarías primero? (opcional)
        </label>
        <textarea
          className={textareaClass}
          placeholder="La pantalla X es confusa, preferiría que…"
          value={data.step3.mejoraPrincipal}
          onChange={(e) => updateStep3("mejoraPrincipal", e.target.value)}
        />
      </div>
      <div>
        <label className="mb-1.5 block font-headline text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
          ¿Qué funcionalidad falta? (opcional)
        </label>
        <input
          className={inputClass}
          placeholder="Ej: integración con WhatsApp, reporte PDF automático…"
          value={data.step3.funcionalidadFaltante}
          onChange={(e) => updateStep3("funcionalidadFaltante", e.target.value)}
        />
      </div>
    </div>
  );
}

function StepNPS({ fb }: { fb: ReturnType<typeof useBetaFeedback> }) {
  const { data, updateStep4 } = fb;
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-3 font-body text-sm text-on-surface-variant">
          ¿Qué tan probable es que recomiendes PSA Enterprise a un colega? *
        </p>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 11 }, (_, i) => i).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => updateStep4("nps", n)}
              className={`flex size-10 items-center justify-center rounded-none border-2 font-headline text-sm font-bold transition-colors ${
                data.step4.nps === n
                  ? n >= 9
                    ? "border-tertiary bg-tertiary text-on-tertiary"
                    : n >= 7
                    ? "border-primary bg-primary text-on-primary"
                    : "border-error bg-error/20 text-error"
                  : "border-outline-variant bg-transparent text-on-surface-variant hover:border-primary hover:text-primary"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
        <div className="mt-2 flex justify-between font-body text-[11px] text-on-surface-variant">
          <span>0 = Nada probable</span>
          <span>10 = Totalmente probable</span>
        </div>
      </div>

      <RadioGroup
        label="¿Continuarías usando PSA Enterprise? *"
        options={[
          { value: "si",       label: "Sí, definitivamente" },
          { value: "tal-vez",  label: "Tal vez" },
          { value: "no",       label: "No" },
        ]}
        value={data.step4.continuarUsando}
        onChange={(v) => updateStep4("continuarUsando", v)}
      />

      <div>
        <label className="mb-1.5 block font-headline text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
          Comentario final (opcional)
        </label>
        <textarea
          className={textareaClass}
          placeholder="Cualquier cosa que quieras agregar…"
          value={data.step4.comentarioFinal}
          onChange={(e) => updateStep4("comentarioFinal", e.target.value)}
        />
      </div>
    </div>
  );
}

// ── Steps config ──────────────────────────────────────────────────────────────
const STEPS = [
  { num: 1, title: "Tu perfil",    sub: "Quiénes participan" },
  { num: 2, title: "Experiencia",  sub: "Uso y calificaciones" },
  { num: 3, title: "Bugs y mejoras", sub: "Errores y sugerencias" },
  { num: 4, title: "NPS y cierre", sub: "Puntuación final" },
];

// ── Main component ─────────────────────────────────────────────────────────────
function BetaFeedback() {
  const navigate = useNavigate();
  const fb = useBetaFeedback();
  const { currentStep, totalSteps, errors, status, serverError, nextStep, prevStep, handleSubmit } = fb;

  const step = STEPS[currentStep - 1];
  const progress = (currentStep / totalSteps) * 100;

  function renderStep() {
    switch (currentStep) {
      case 1: return <StepPerfil fb={fb} />;
      case 2: return <StepExperiencia fb={fb} />;
      case 3: return <StepBugs fb={fb} />;
      case 4: return <StepNPS fb={fb} />;
    }
  }

  // ── Success screen ──
  if (status === "success") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="glass-panel border-edge w-full max-w-md rounded-none p-10 text-center"
        >
          <CheckCircle className="mx-auto mb-5 size-14 text-tertiary" />
          <h2 className="mb-3 font-headline text-2xl font-extrabold text-on-surface">
            ¡Gracias por tu feedback!
          </h2>
          <p className="mb-8 font-body text-sm leading-relaxed text-on-surface-variant">
            Tu experiencia con PSA Enterprise es muy valiosa para nosotros.
            Revisaremos cada respuesta y te contactaremos si tenemos preguntas.
          </p>
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 rounded-none border-2 border-primary bg-primary px-6 py-3 font-headline text-sm font-bold text-on-primary transition-colors hover:bg-primary/90"
          >
            Volver al inicio
            <ArrowRight size={16} />
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Decorative blob */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 h-[360px] w-[360px] -translate-x-1/2 bg-primary/12 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-2xl px-6 py-24">

        {/* ── Header ── */}
        <div className="mb-8 text-center">
          <button
            onClick={() => navigate("/beta")}
            className="mb-6 inline-flex items-center gap-1.5 font-body text-xs text-on-surface-variant transition-colors hover:text-primary"
          >
            <ArrowLeft size={13} /> Volver al programa beta
          </button>
          <h1 className="font-headline text-3xl font-extrabold text-on-surface">
            Formulario de Feedback
          </h1>
          <p className="mt-2 font-body text-sm text-on-surface-variant">
            PSA Enterprise · Beta Program
          </p>
        </div>

        {/* ── Progress bar ── */}
        <div className="mb-8">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-headline text-xs font-semibold text-on-surface-variant">
              Paso {currentStep} de {totalSteps}
            </span>
            <span className="font-headline text-xs font-semibold text-primary">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="h-1.5 w-full rounded-none bg-surface-high">
            <motion.div
              className="h-full bg-primary"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
          {/* Step pills */}
          <div className="mt-4 grid grid-cols-4 gap-2">
            {STEPS.map((s) => (
              <div
                key={s.num}
                className={`rounded-none border-2 px-2 py-1.5 text-center transition-colors ${
                  s.num === currentStep
                    ? "border-primary bg-primary/10"
                    : s.num < currentStep
                    ? "border-tertiary/40 bg-tertiary/8"
                    : "border-outline-variant"
                }`}
              >
                <span className={`block font-headline text-[10px] font-bold uppercase tracking-wide ${
                  s.num === currentStep ? "text-primary" : s.num < currentStep ? "text-tertiary" : "text-on-surface-variant"
                }`}>
                  {s.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Form card ── */}
        <div className="glass-panel border-edge rounded-none">
          {/* Step header */}
          <div className="border-b-2 border-outline-variant px-6 py-5">
            <h2 className="font-headline text-lg font-extrabold text-on-surface">{step.title}</h2>
            <p className="font-body text-xs text-on-surface-variant">{step.sub}</p>
          </div>

          {/* Step body */}
          <div className="px-6 py-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Errors */}
          {errors.length > 0 && (
            <div className="mx-6 mb-4 flex items-start gap-3 border-2 border-error/40 bg-error/8 px-4 py-3">
              <AlertCircle size={16} className="mt-0.5 shrink-0 text-error" />
              <ul className="flex flex-col gap-1">
                {errors.map((e) => (
                  <li key={e} className="font-body text-xs text-error">{e}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Server error */}
          {serverError && (
            <div className="mx-6 mb-4 flex items-start gap-3 border-2 border-error/40 bg-error/8 px-4 py-3">
              <AlertCircle size={16} className="mt-0.5 shrink-0 text-error" />
              <p className="font-body text-xs text-error">{serverError}</p>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between border-t-2 border-outline-variant px-6 py-5">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="inline-flex items-center gap-2 rounded-none border-2 border-outline-variant px-5 py-2.5 font-headline text-xs font-bold text-on-surface-variant transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowLeft size={14} /> Anterior
            </button>

            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={() => nextStep()}
                className="inline-flex items-center gap-2 rounded-none border-2 border-primary bg-primary px-6 py-2.5 font-headline text-xs font-bold text-on-primary transition-colors hover:bg-primary/90"
              >
                Siguiente <ArrowRight size={14} />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={status === "sending"}
                className="inline-flex items-center gap-2 rounded-none border-2 border-tertiary bg-tertiary px-6 py-2.5 font-headline text-xs font-bold text-on-tertiary transition-colors hover:bg-tertiary/90 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 size={14} className="animate-spin" /> Enviando…
                  </>
                ) : (
                  <>
                    Enviar feedback <CheckCircle size={14} />
                  </>
                )}
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default BetaFeedback;
