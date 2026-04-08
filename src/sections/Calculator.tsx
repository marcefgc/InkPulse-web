import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { DollarSign } from "lucide-react";

const TC = 7300;

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

function Calculator() {
  const [currency, setCurrency] = useState<"gs" | "usd">("gs");
  const [printers, setPrinters] = useState(10);
  const [monthlySpend, setMonthlySpend] = useState(2_000_000);

  const defaultSpend = currency === "gs" ? 2_000_000 : Math.round(2_000_000 / TC);

  function handleCurrencyChange(next: "gs" | "usd") {
    if (next === currency) return;
    if (next === "usd") {
      setMonthlySpend(Math.round(monthlySpend / TC));
    } else {
      setMonthlySpend(Math.round(monthlySpend * TC));
    }
    setCurrency(next);
  }

  const annualSaving = useMemo(() => {
    const n = Math.max(1, printers);
    const rate = 0.1 + Math.min(0.12, Math.max(0, (n - 1) * 0.01));
    return Math.round(monthlySpend * rate * 12);
  }, [printers, monthlySpend]);

  const formattedSaving =
    currency === "gs"
      ? `Gs. ${annualSaving.toLocaleString("es-PY")}`
      : `USD ${annualSaving.toLocaleString("en-US")}`;

  return (
    <section id="calculadora" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-start gap-12 md:grid-cols-2">
          {/* ── Left column ── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col justify-center"
          >
            <h2 className="font-headline text-4xl font-extrabold tracking-tight text-on-surface sm:text-5xl">
              Calculadora de Ahorro
            </h2>
            <p className="mt-4 font-body text-lg leading-relaxed text-on-surface-variant">
              Descubre cuanto puede ahorrar tu organizacion al optimizar la
              gestion de tu flota de impresoras con PSA Enterprise.
            </p>

            <div className="mt-8 flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-none border-2 border-outline-variant bg-surface-low">
                <DollarSign size={24} className="text-tertiary" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-headline text-base font-bold text-on-surface">
                  Optimizacion de Costos
                </h3>
                <p className="mt-1 font-body text-sm text-on-surface-variant">
                  Reduce desperdicios de toner, papel y mantenimiento correctivo
                  mediante alertas predictivas y monitoreo continuo.
                </p>
              </div>
            </div>
          </motion.div>

          {/* ── Right column — form card ── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="border-edge bg-surface-mid p-8"
          >
            {/* Currency toggle */}
            <div className="mb-6 flex">
              <button
                type="button"
                onClick={() => handleCurrencyChange("gs")}
                className={`flex-1 border-2 border-outline-variant px-4 py-2 font-headline text-sm font-bold transition-colors rounded-none ${
                  currency === "gs"
                    ? "bg-primary text-on-primary border-primary"
                    : "bg-transparent text-on-surface-variant hover:text-on-surface"
                }`}
              >
                Gs.
              </button>
              <button
                type="button"
                onClick={() => handleCurrencyChange("usd")}
                className={`flex-1 border-2 border-l-0 border-outline-variant px-4 py-2 font-headline text-sm font-bold transition-colors rounded-none ${
                  currency === "usd"
                    ? "bg-primary text-on-primary border-primary"
                    : "bg-transparent text-on-surface-variant hover:text-on-surface"
                }`}
              >
                USD
              </button>
            </div>

            {/* Printer count */}
            <div className="mb-4">
              <label className="mb-1 block font-body text-[10px] font-semibold uppercase tracking-widest text-on-surface-variant">
                Cant. Impresoras
              </label>
              <input
                type="number"
                min={1}
                value={printers}
                onChange={(e) => setPrinters(Number(e.target.value) || 1)}
                className="w-full rounded-none border-2 border-outline-variant bg-surface-dim px-4 py-3 font-body text-sm text-on-surface outline-none transition-colors focus:border-tertiary"
              />
            </div>

            {/* Monthly spend */}
            <div className="mb-6">
              <label className="mb-1 block font-body text-[10px] font-semibold uppercase tracking-widest text-on-surface-variant">
                Gasto Mensual Total ({currency === "gs" ? "Gs." : "USD"})
              </label>
              <input
                type="number"
                min={0}
                value={monthlySpend}
                onChange={(e) => setMonthlySpend(Number(e.target.value) || 0)}
                placeholder={defaultSpend.toString()}
                className="w-full rounded-none border-2 border-outline-variant bg-surface-dim px-4 py-3 font-body text-sm text-on-surface outline-none transition-colors focus:border-tertiary"
              />
            </div>

            {/* Result */}
            <div className="rounded-none border-2 border-tertiary/20 bg-tertiary/10 p-6 text-center">
              <p className="mb-1 font-body text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
                Ahorro Anual Estimado
              </p>
              <p className="font-headline text-3xl font-extrabold text-tertiary">
                {formattedSaving}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Calculator;
