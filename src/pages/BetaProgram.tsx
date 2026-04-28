import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Activity,
  ArrowRight,
  Bell,
  CheckCircle,
  ChevronRight,
  Gift,
  Layers,
  Lock,
  Monitor,
  ShieldCheck,
  Users,
  Zap,
} from "lucide-react";

// ── Animation ────────────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.55, ease: "easeOut" as const },
  }),
};

// ── Data ─────────────────────────────────────────────────────────────────────
const features = [
  {
    icon: <Activity className="size-5 text-primary" />,
    title: "Monitoreo en tiempo real",
    desc: "Estado de cada impresora actualizado vía SNMP sin necesidad de agentes externos.",
  },
  {
    icon: <Bell className="size-5 text-primary" />,
    title: "Alertas predictivas",
    desc: "Recibe avisos antes de que el tóner o los consumibles lleguen a nivel crítico.",
  },
  {
    icon: <ShieldCheck className="size-5 text-tertiary" />,
    title: "100 % local",
    desc: "Todos los datos permanecen en tu red interna. Sin nube, sin envíos externos.",
  },
  {
    icon: <Layers className="size-5 text-primary" />,
    title: "Flota centralizada",
    desc: "Dashboard unificado para gestionar docenas de impresoras desde un solo panel.",
  },
  {
    icon: <Zap className="size-5 text-tertiary" />,
    title: "Eco-impact tracker",
    desc: "Mide el ahorro en papel, tóner y emisiones CO₂ de toda tu flota.",
  },
  {
    icon: <Lock className="size-5 text-primary" />,
    title: "Licencias sin conexión",
    desc: "Activación offline para entornos corporativos con políticas de red estrictas.",
  },
];

const profiles = [
  {
    emoji: "🖥️",
    title: "Técnico / Soporte TI",
    sub: "Perfil ideal",
    items: [
      "Administra 5 o más impresoras en red",
      "Quiere reducir llamados por consumibles",
      "Busca visibilidad sin instalar agentes extra",
      "Trabaja en empresa mediana o grande",
    ],
  },
  {
    emoji: "🏢",
    title: "IT Manager / Gerente",
    sub: "Perfil ideal",
    items: [
      "Necesita reportes de uso y costos",
      "Quiere optimizar compras de suministros",
      "Valora la privacidad de datos internos",
      "Tiene presupuesto limitado para herramientas",
    ],
  },
];

const exchange = [
  {
    left: { label: "Nosotros damos", items: ["Licencia completa sin costo", "Soporte prioritario durante el beta", "Tu empresa en los primeros adopters"] },
    right: { label: "Vos nos das", items: ["Usá PSA durante 30 días", "Completá el formulario de feedback", "Reportá bugs o mejoras que notes"] },
  },
];

// ── Component ─────────────────────────────────────────────────────────────────
function BetaProgram() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-on-surface">
      {/* ── Decorative blobs ── */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 h-[420px] w-[420px] bg-primary/15 blur-[130px]" />
        <div className="absolute right-0 top-1/2 h-[340px] w-[340px] bg-tertiary/10 blur-[110px]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 py-24">

        {/* ── Hero ── */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}
          className="mb-4 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-none border-2 border-primary/40 bg-primary/10 px-4 py-1.5 font-headline text-xs font-bold uppercase tracking-widest text-primary">
            <Gift size={13} /> Programa Beta · Plazas limitadas
          </span>
        </motion.div>

        <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={1}
          className="mb-4 text-center font-headline text-4xl font-extrabold leading-tight tracking-tight text-on-surface sm:text-5xl lg:text-6xl">
          Monitorea tu flota de
          <br />
          <span className="bg-gradient-to-r from-primary to-tertiary bg-clip-text text-transparent">
            impresoras gratis
          </span>
        </motion.h1>

        <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={2}
          className="mx-auto mb-10 max-w-2xl text-center font-body text-lg leading-relaxed text-on-surface-variant">
          Probá <strong className="text-on-surface">PSA Enterprise</strong> sin costo durante 30 días.
          A cambio, compartí tu experiencia para ayudarnos a construir la herramienta que el mercado necesita.
        </motion.p>

        {/* ── Offer banner ── */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3}
          className="mb-10 flex items-center gap-4 rounded-none border-2 border-tertiary/40 bg-tertiary/8 px-6 py-5">
          <CheckCircle className="size-7 shrink-0 text-tertiary" />
          <div>
            <p className="font-headline text-sm font-bold text-tertiary">Licencia completa — Gs. 0</p>
            <p className="mt-0.5 font-body text-sm text-on-surface-variant">
              Acceso total a todas las funciones de PSA Enterprise durante el período beta. Sin tarjeta, sin compromiso.
            </p>
          </div>
        </motion.div>

        {/* ── Features grid ── */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={4}>
          <p className="mb-4 font-headline text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
            Qué incluye PSA Enterprise
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title}
                className="glass-panel border-edge rounded-none p-5 transition-colors hover:border-primary/60">
                <div className="mb-3">{f.icon}</div>
                <h3 className="mb-1.5 font-headline text-sm font-bold text-on-surface">{f.title}</h3>
                <p className="font-body text-xs leading-relaxed text-on-surface-variant">{f.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Profiles ── */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={5} className="mt-10">
          <p className="mb-4 font-headline text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
            ¿Este programa es para vos?
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {profiles.map((p) => (
              <div key={p.title} className="glass-panel border-edge rounded-none p-5">
                <div className="mb-3 flex items-center gap-3">
                  <span className="text-2xl">{p.emoji}</span>
                  <div>
                    <h3 className="font-headline text-sm font-bold text-on-surface">{p.title}</h3>
                    <span className="font-body text-xs text-on-surface-variant">{p.sub}</span>
                  </div>
                </div>
                <ul className="flex flex-col gap-2">
                  {p.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 font-body text-xs text-on-surface-variant">
                      <ChevronRight size={12} className="mt-0.5 shrink-0 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Exchange ── */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={6} className="mt-10">
          <p className="mb-4 font-headline text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
            El intercambio
          </p>
          {exchange.map((ex, i) => (
            <div key={i} className="glass-panel border-edge rounded-none">
              <div className="grid divide-y-2 divide-outline-variant sm:grid-cols-2 sm:divide-x-2 sm:divide-y-0">
                {[ex.left, ex.right].map((col) => (
                  <div key={col.label} className="px-6 py-5">
                    <p className="mb-3 flex items-center gap-2 font-headline text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
                      <Users size={12} className="text-tertiary" />
                      {col.label}
                    </p>
                    <ul className="flex flex-col gap-2">
                      {col.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 font-body text-sm text-on-surface-variant">
                          <span className="mt-1 size-1.5 shrink-0 rounded-full bg-tertiary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── Stats ── */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={7}
          className="glass-panel border-edge mt-10 grid grid-cols-3 divide-x-2 divide-outline-variant rounded-none">
          {[
            { num: "99.9%", label: "Uptime" },
            { num: "Gs. 0", label: "Setup Cost" },
            { num: "30 días", label: "Beta gratuita" },
          ].map(({ num, label }) => (
            <div key={label} className="flex flex-col items-center gap-1 px-4 py-6">
              <span className="font-headline text-2xl font-extrabold text-primary sm:text-3xl">{num}</span>
              <span className="font-body text-xs text-on-surface-variant">{label}</span>
            </div>
          ))}
        </motion.div>

        {/* ── CTA ── */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={8}
          className="mt-12 flex flex-col items-center gap-4 text-center">
          <h2 className="font-headline text-2xl font-extrabold text-on-surface sm:text-3xl">
            ¿Listo para empezar?
          </h2>
          <p className="max-w-md font-body text-sm text-on-surface-variant">
            Completá el formulario de feedback al finalizar tu período beta y ayudanos a mejorar PSA para toda la comunidad.
          </p>
          <div className="mt-2 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate("/beta/feedback")}
              className="inline-flex items-center gap-2 rounded-none border-2 border-tertiary bg-tertiary px-7 py-3 font-headline text-sm font-bold text-on-tertiary transition-colors hover:bg-tertiary/90"
            >
              Completar formulario de feedback
              <ArrowRight size={16} />
            </button>
            <a
              href="/#contacto"
              className="inline-flex items-center gap-2 rounded-none border-2 border-outline-variant bg-transparent px-7 py-3 font-headline text-sm font-bold text-on-surface transition-colors hover:border-primary hover:text-primary"
            >
              Contactar al equipo
              <Monitor size={16} />
            </a>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

export default BetaProgram;
