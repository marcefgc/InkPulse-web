import { motion } from "framer-motion";
import { Download, Settings, Bell } from "lucide-react";
import type { ElementType } from "react";

interface Step {
  icon: ElementType;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    icon: Download,
    title: "Instalar",
    description:
      "Configuracion instantanea. Copia la carpeta y ejecuta PSA.exe.",
  },
  {
    icon: Settings,
    title: "Conectar",
    description:
      "Sincronizacion automatica con tu flota mediante SNMP.",
  },
  {
    icon: Bell,
    title: "Recibir Alertas",
    description:
      "Notificaciones predictivas antes de que ocurra el fallo.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

function HowItWorks() {
  return (
    <section id="como-funciona" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="font-headline text-4xl font-extrabold tracking-tight text-on-surface sm:text-5xl">
            Arquitectura de Eficiencia
          </h2>
          <p className="mt-4 font-body text-lg text-on-surface-variant">
            Tres pasos hacia un control absoluto de tus recursos.
          </p>
        </motion.div>

        {/* ── Steps grid ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-8 md:grid-cols-3"
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                variants={cardVariants}
                className="border-edge flex flex-col items-center rounded-none bg-surface-high px-8 py-10 text-center transition-colors hover:border-primary/60"
              >
                {/* ── Step number ── */}
                <span className="mb-6 flex h-8 w-8 items-center justify-center rounded-none border-2 border-outline-variant font-headline text-xs font-bold text-on-surface-variant">
                  {index + 1}
                </span>

                {/* ── Icon box ── */}
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-none border-2 border-outline-variant bg-surface-low">
                  <Icon size={36} className="text-primary" strokeWidth={1.5} />
                </div>

                {/* ── Title ── */}
                <h3 className="mb-3 font-headline text-xl font-bold text-on-surface">
                  {step.title}
                </h3>

                {/* ── Description ── */}
                <p className="font-body text-sm leading-relaxed text-on-surface-variant">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default HowItWorks;
