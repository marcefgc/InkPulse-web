import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Shield, Zap, Crown, Gem } from "lucide-react";
import QuoteModal from "../components/QuoteModal";

interface PlanFeature {
  text: string;
}

interface Tier {
  name: string;
  code: string;
  price: string;
  renewal: string;
  planOption: string;
  badge?: string;
  description: string;
  features: PlanFeature[];
  highlighted?: boolean;
  icon: React.ReactNode;
}

type PriceView = "license" | "renewal";

const tiers: Tier[] = [
  {
    name: "Bronce",
    code: "bronze",
    price: "USD 149",
    renewal: "USD 29/año",
    planOption: "Bronce — USD 149 licencia perpetua",
    description: "Para equipos pequeños que necesitan visibilidad básica.",
    icon: <Shield className="w-6 h-6 text-primary" />,
    features: [
      { text: "1 usuario (administrador)" },
      { text: "Hasta 5 equipos" },
      { text: "Alertas críticas por email" },
      { text: "Historial 30 días" },
      { text: "Control solo lectura" },
    ],
  },
  {
    name: "Plata",
    code: "silver",
    price: "USD 349",
    renewal: "USD 69/año",
    planOption: "Plata — USD 349 licencia perpetua",
    description: "Monitoreo operativo completo con dashboard y exportación.",
    icon: <Zap className="w-6 h-6 text-primary" />,
    features: [
      { text: "Hasta 3 usuarios" },
      { text: "Hasta 20 equipos" },
      { text: "Dashboard básico con KPIs" },
      { text: "Historial 90 días" },
      { text: "Exportación email + visual" },
    ],
  },
  {
    name: "Oro",
    code: "gold",
    price: "USD 699",
    renewal: "USD 129/año",
    planOption: "Oro — USD 699 licencia perpetua",
    badge: "Popular",
    highlighted: true,
    description: "Analytics avanzado y exportación completa para medianas flotas.",
    icon: <Crown className="w-6 h-6 text-tertiary" />,
    features: [
      { text: "Hasta 5 usuarios" },
      { text: "Hasta 50 equipos" },
      { text: "Dashboard avanzado con analytics" },
      { text: "Historial 12 meses" },
      { text: "Exportación email, PDF y Excel" },
    ],
  },
  {
    name: "Platino",
    code: "platinum",
    price: "USD 1.299",
    renewal: "USD 199/año",
    planOption: "Platino — USD 1.299 licencia perpetua",
    description: "Sin límites, con predicciones de consumo y todos los formatos.",
    icon: <Gem className="w-6 h-6 text-primary" />,
    features: [
      { text: "Usuarios ilimitados" },
      { text: "Equipos ilimitados" },
      { text: "Dashboard + predicciones de tóner" },
      { text: "Historial ilimitado" },
      { text: "Todos los formatos de exportación" },
    ],
  },
];

const fadeSlide = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.35, ease: "easeInOut" as const },
};

function FeatureItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-2 text-sm text-on-surface-variant">
      <Check className="w-4 h-4 mt-0.5 shrink-0 text-tertiary" />
      <span>{text}</span>
    </li>
  );
}

interface ModalState {
  plan: string;
  price: string;
}

export default function Pricing() {
  const [view, setView] = useState<PriceView>("license");
  const [modal, setModal] = useState<ModalState | null>(null);

  function openModal(plan: string, price: string) {
    setModal({ plan, price });
  }

  function closeModal() {
    setModal(null);
  }

  return (
    <>
      <section id="precios" className="px-4 md:px-8 py-20 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="font-family-headline text-3xl md:text-4xl font-bold text-on-surface mb-3">
            Modelos de Precision
          </h2>
          <p className="text-on-surface-variant text-lg max-w-2xl mx-auto mb-2">
            Licencia perpetua con un año de soporte y actualizaciones incluido.
            La renovacion anual mantiene acceso a nuevas versiones — el software
            sigue funcionando sin renovar.
          </p>
          <p className="text-on-surface-variant text-sm max-w-xl mx-auto mb-8">
            Periodo de prueba gratuito de 14 dias. Sin conexion a internet requerida.
          </p>

          {/* Toggle */}
          <div className="inline-flex border-edge rounded-none overflow-hidden">
            <button
              onClick={() => setView("license")}
              className={`px-5 py-2.5 text-sm font-semibold transition-colors rounded-none cursor-pointer ${
                view === "license"
                  ? "bg-primary text-on-primary"
                  : "bg-surface-low text-on-surface-variant hover:bg-surface-mid"
              }`}
            >
              Licencia perpetua
            </button>
            <button
              onClick={() => setView("renewal")}
              className={`px-5 py-2.5 text-sm font-semibold transition-colors rounded-none cursor-pointer border-l-2 border-outline-variant ${
                view === "renewal"
                  ? "bg-primary text-on-primary"
                  : "bg-surface-low text-on-surface-variant hover:bg-surface-mid"
              }`}
            >
              Renovacion anual
            </button>
          </div>
        </motion.div>

        {/* Plan Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            {...fadeSlide}
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 items-start"
          >
            {tiers.map((tier) => (
              <div
                key={tier.code}
                className={`flex flex-col rounded-none p-6 transition-transform ${
                  tier.highlighted
                    ? "border-2 border-primary bg-surface-low xl:scale-105 relative z-10"
                    : "border-edge bg-surface-low"
                }`}
              >
                {tier.badge && (
                  <span className="inline-block self-start px-3 py-1 mb-4 text-xs font-bold uppercase tracking-wider bg-tertiary/15 text-tertiary border border-tertiary/30 rounded-none">
                    {tier.badge}
                  </span>
                )}
                <div className="flex items-center gap-3 mb-2">
                  {tier.icon}
                  <h3 className="font-family-headline text-xl font-bold text-on-surface">
                    {tier.name}
                  </h3>
                </div>
                <p className="text-on-surface-variant text-xs mb-4">
                  {tier.description}
                </p>
                <div className="mb-6">
                  <span className="font-family-headline text-3xl font-bold text-on-surface">
                    {view === "license" ? tier.price : tier.renewal}
                  </span>
                  <span className="text-on-surface-variant text-sm ml-1">
                    {view === "license" ? "pago unico" : "renovacion"}
                  </span>
                  {view === "license" && (
                    <p className="text-on-surface-variant text-xs mt-1">
                      Renovacion: {tier.renewal}
                    </p>
                  )}
                </div>
                <ul className="flex flex-col gap-3 mb-8 flex-1">
                  {tier.features.map((f) => (
                    <FeatureItem key={f.text} text={f.text} />
                  ))}
                </ul>
                <button
                  onClick={() =>
                    openModal(tier.planOption, `${tier.price} pago unico`)
                  }
                  className={`w-full py-3 text-sm font-semibold transition-colors rounded-none cursor-pointer ${
                    tier.highlighted
                      ? "bg-tertiary text-on-tertiary hover:bg-tertiary/90"
                      : "border-edge bg-surface-highest text-on-surface hover:bg-surface-high"
                  }`}
                >
                  Solicitar cotizacion
                </button>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* CAPEX note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-on-surface-variant text-xs mt-8 max-w-2xl mx-auto"
        >
          Modelo CAPEX — pago unico por licencia perpetua. La renovacion anual (~20% del precio inicial) mantiene acceso a
          actualizaciones y soporte tecnico. Operacion completamente local, sin dependencia de servicios en la nube.
        </motion.p>
      </section>

      {/* Quote Modal */}
      <QuoteModal
        isOpen={modal !== null}
        plan={modal?.plan ?? ""}
        price={modal?.price ?? ""}
        onClose={closeModal}
      />
    </>
  );
}
