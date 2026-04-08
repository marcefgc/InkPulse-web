import { motion } from "framer-motion";
import { Activity, ArrowRight, Bell, ChevronDown, ShieldCheck } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" as const },
  }),
};

function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen overflow-hidden pt-28 pb-20"
    >
      {/* ── Decorative blurred shapes ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] bg-primary/20 blur-[140px]" />
        <div className="absolute -right-32 top-1/3 h-[400px] w-[400px] bg-tertiary/15 blur-[120px]" />
        <div className="absolute bottom-0 left-1/2 h-[300px] w-[300px] -translate-x-1/2 bg-primary/10 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 text-center">
        {/* ── PSA product context ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="mb-8 flex w-full max-w-3xl justify-center py-3"
        >
          <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 font-body text-sm text-tertiary/95 sm:gap-x-7 sm:text-base">
            <li className="inline-flex items-center gap-2.5">
              <Activity className="size-[1.125rem] shrink-0 opacity-90 sm:size-5" aria-hidden />
              Monitoreo en vivo
            </li>
            <span className="hidden text-on-surface-variant/40 sm:inline" aria-hidden>
              ·
            </span>
            <li className="inline-flex items-center gap-2.5">
              <ShieldCheck className="size-[1.125rem] shrink-0 opacity-90 sm:size-5" aria-hidden />
              Sin enviar datos a la nube
            </li>
            <span className="hidden text-on-surface-variant/40 sm:inline" aria-hidden>
              ·
            </span>
            <li className="inline-flex items-center gap-2.5">
              <Bell className="size-[1.125rem] shrink-0 opacity-90 sm:size-5" aria-hidden />
              Avisos predictivos
            </li>
          </ul>
        </motion.div>

        {/* ── Headline ── */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="font-headline text-5xl font-extrabold leading-tight tracking-tight text-on-surface sm:text-6xl lg:text-7xl"
        >
          Printer Smart Alert
          <br />
          <span className="bg-gradient-to-r from-primary to-tertiary bg-clip-text text-transparent">
            Precision Luminary
          </span>
        </motion.h1>

        {/* ── Subtitle ── */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-on-surface-variant"
        >
          Monitoreo inteligente y alertas predictivas para toda tu flota de
          impresoras. Anticipa fallos, optimiza suministros y elimina tiempos
          muertos con datos en tiempo real.
        </motion.p>

        {/* ── CTAs ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#precios"
            className="inline-flex items-center gap-2 rounded-none border-2 border-primary bg-primary px-7 py-3 font-headline text-sm font-bold text-on-primary transition-colors hover:bg-primary/90"
          >
            Ver Planes
            <ArrowRight size={18} />
          </a>
          <a
            href="#como-funciona"
            className="inline-flex items-center gap-2 rounded-none border-2 border-outline-variant bg-transparent px-7 py-3 font-headline text-sm font-bold text-on-surface transition-colors hover:border-primary hover:text-primary"
          >
            Saber mas
            <ChevronDown size={18} />
          </a>
        </motion.div>

        {/* ── Stats glass panel ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={4}
          className="glass-panel border-edge mt-20 grid w-full max-w-xl grid-cols-2 divide-x-2 divide-outline-variant rounded-none"
        >
          <div className="flex flex-col items-center gap-1 px-6 py-6">
            <span className="font-headline text-3xl font-extrabold text-tertiary">
              99.9%
            </span>
            <span className="font-body text-sm text-on-surface-variant">
              Uptime
            </span>
          </div>
          <div className="flex flex-col items-center gap-1 px-6 py-6">
            <span className="font-headline text-3xl font-extrabold text-primary">
              Gs. 0
            </span>
            <span className="font-body text-sm text-on-surface-variant">
              Setup Cost
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
