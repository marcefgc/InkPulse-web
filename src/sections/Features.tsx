import { motion } from "framer-motion";
import { Sparkles, BarChart3, ShieldCheck, Activity } from "lucide-react";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" as const },
  }),
};

function TonerBar() {
  return (
    <div className="mt-6 w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-family-body text-on-surface-variant">
          Toner Negro — HP LaserJet 4020
        </span>
        <span className="text-sm font-bold text-tertiary">75%</span>
      </div>
      <div className="relative h-3 w-full bg-surface-mid border-edge rounded-none overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-tertiary rounded-none"
          initial={{ width: 0 }}
          whileInView={{ width: "75%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" as const, delay: 0.4 }}
          style={{
            boxShadow: "0 0 12px rgba(102,221,139,0.5), 0 0 24px rgba(102,221,139,0.25)",
          }}
        />
      </div>
    </div>
  );
}

export default function Features() {
  return (
    <section id="caracteristicas" className="px-4 md:px-8 py-20 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h2 className="font-family-headline text-3xl md:text-4xl font-bold text-on-surface mb-3">
          Arquitectura de Monitoreo
        </h2>
        <p className="text-on-surface-variant text-lg max-w-2xl mx-auto">
          Cuatro pilares que blindan la operativa de impresión empresarial.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Row 1 — Large: Monitoreo Omnipresente */}
        <motion.div
          custom={0}
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="md:col-span-8 bg-surface-low border-edge rounded-none p-6 md:p-8 relative overflow-hidden"
        >
          <div className="flex items-center gap-3 mb-1">
            <Activity className="w-5 h-5 text-tertiary" />
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-tertiary/15 text-tertiary border border-tertiary/30 rounded-none">
              Real-Time
            </span>
          </div>
          <h3 className="font-family-headline text-xl md:text-2xl font-bold text-on-surface mt-3 mb-2">
            Monitoreo Omnipresente
          </h3>
          <p className="text-on-surface-variant text-sm md:text-base leading-relaxed max-w-xl">
            Seguimiento SNMP continuo de niveles de toner, contadores de
            paginas y estados operativos. Cada dispositivo reporta en
            intervalos configurables desde 30 segundos.
          </p>
          <TonerBar />
        </motion.div>

        {/* Row 1 — Small: Alertas Predictivas */}
        <motion.div
          custom={1}
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="md:col-span-4 bg-surface-highest border-edge rounded-none p-6 flex flex-col items-center justify-center text-center"
        >
          <Sparkles className="w-10 h-10 text-primary mb-4" />
          <h3 className="font-family-headline text-lg font-bold text-on-surface mb-2">
            Alertas Predictivas
          </h3>
          <p className="text-on-surface-variant text-sm leading-relaxed">
            Umbrales inteligentes que notifican antes de que el consumible
            llegue a nivel critico. SMTP, webhook o dashboard.
          </p>
        </motion.div>

        {/* Row 2 — Small: Reportes Detallados */}
        <motion.div
          custom={2}
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="md:col-span-4 bg-surface-highest border-edge rounded-none p-6 flex flex-col items-center justify-center text-center"
        >
          <BarChart3 className="w-10 h-10 text-primary mb-4" />
          <h3 className="font-family-headline text-lg font-bold text-on-surface mb-2">
            Reportes Detallados
          </h3>
          <p className="text-on-surface-variant text-sm leading-relaxed">
            Exportacion CSV y reportes HTML con historico de consumo,
            costos proyectados y tendencias por dispositivo.
          </p>
        </motion.div>

        {/* Row 2 — Large: Protocolos Blindados */}
        <motion.div
          custom={3}
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="md:col-span-8 bg-surface-low border-edge rounded-none p-6 md:p-8 relative overflow-hidden"
        >
          {/* Decorative shield */}
          <ShieldCheck
            className="absolute right-4 bottom-4 text-primary/20"
            style={{ width: 120, height: 120 }}
            strokeWidth={1}
          />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-1">
              <ShieldCheck className="w-5 h-5 text-primary" />
              <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-primary/15 text-primary border border-primary/30 rounded-none">
                Security First
              </span>
            </div>
            <h3 className="font-family-headline text-xl md:text-2xl font-bold text-on-surface mt-3 mb-2">
              Protocolos Blindados
            </h3>
            <p className="text-on-surface-variant text-sm md:text-base leading-relaxed max-w-xl">
              Autenticacion HMAC-SHA256 en cada request, tokens rotativos
              y cifrado AES-256 en reposo. Arquitectura zero-trust para
              entornos corporativos exigentes.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
