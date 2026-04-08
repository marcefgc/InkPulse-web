import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Zap, Crown, Building2, Server, Shield } from "lucide-react";
import QuoteModal from "../components/QuoteModal";

type PlanView = "subscription" | "perpetual";

interface PlanFeature {
  text: string;
}

interface SubscriptionPlan {
  name: string;
  price: string;
  planOption: string; // matches PLAN_OPTIONS in ContactForm
  period: string;
  badge?: string;
  features: PlanFeature[];
  highlighted?: boolean;
  icon: React.ReactNode;
}

interface PerpetualPlan {
  name: string;
  price: string;
  planOption: string;
  badge: string;
  description: string;
  features: PlanFeature[];
  icon: React.ReactNode;
}

const subscriptionPlans: SubscriptionPlan[] = [
  {
    name: "Business",
    price: "Gs. 280.000",
    planOption: "Business — Gs. 280.000/mes",
    period: "/mes",
    icon: <Building2 className="w-6 h-6 text-primary" />,
    features: [
      { text: "Hasta 15 impresoras" },
      { text: "Dashboard HTML y NOC" },
      { text: "Exportacion CSV" },
    ],
  },
  {
    name: "Pro",
    price: "Gs. 450.000",
    planOption: "Pro — Gs. 450.000/mes",
    period: "/mes",
    badge: "Popular",
    highlighted: true,
    icon: <Zap className="w-6 h-6 text-tertiary" />,
    features: [
      { text: "Hasta 30 impresoras" },
      { text: "Alertas SMTP" },
      { text: "Umbrales configurables" },
      { text: "Soporte prioritario" },
    ],
  },
  {
    name: "Premium",
    price: "Gs. 650.000",
    planOption: "Premium — Gs. 650.000/mes",
    period: "/mes",
    icon: <Crown className="w-6 h-6 text-primary" />,
    features: [
      { text: "Hasta 50 impresoras" },
      { text: "Funciones Pro completas" },
      { text: "Soporte Prioritario" },
    ],
  },
];

const perpetualPlans: PerpetualPlan[] = [
  {
    name: "PSA Pro Perpetua",
    price: "Gs. 5.500.000",
    planOption: "PSA Pro Perpetua — Gs. 5.500.000 pago único",
    badge: "CAPEX",
    description: "Licencia perpetua con soberania total de datos.",
    icon: <Server className="w-6 h-6 text-primary" />,
    features: [
      { text: "Hasta 30 impresoras" },
      { text: "Soberania de datos on-premise" },
      { text: "Actualizaciones por 12 meses" },
      { text: "Soporte por correo" },
    ],
  },
  {
    name: "PSA Enterprise Gold",
    price: "Gs. 18.000.000",
    planOption: "PSA Enterprise Gold — Gs. 18.000.000 pago único",
    badge: "Corporate Perpetual",
    description: "Infraestructura ilimitada con soporte de ingenieria.",
    icon: <Shield className="w-6 h-6 text-tertiary" />,
    features: [
      { text: "Impresoras ilimitadas" },
      { text: "Soporte de ingenieria dedicado" },
      { text: "Actualizaciones perpetuas" },
      { text: "SLA corporativo" },
      { text: "Despliegue asistido" },
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
  const [view, setView] = useState<PlanView>("subscription");
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
          <p className="text-on-surface-variant text-lg max-w-2xl mx-auto mb-8">
            Elija el modelo que se adapta a su operativa: suscripcion mensual o
            inversion unica con licencia perpetua.
          </p>

          {/* Toggle */}
          <div className="inline-flex border-edge rounded-none overflow-hidden">
            <button
              onClick={() => setView("subscription")}
              className={`px-5 py-2.5 text-sm font-semibold transition-colors rounded-none cursor-pointer ${
                view === "subscription"
                  ? "bg-primary text-on-primary"
                  : "bg-surface-low text-on-surface-variant hover:bg-surface-mid"
              }`}
            >
              Suscripcion
            </button>
            <button
              onClick={() => setView("perpetual")}
              className={`px-5 py-2.5 text-sm font-semibold transition-colors rounded-none cursor-pointer border-l-2 border-outline-variant ${
                view === "perpetual"
                  ? "bg-primary text-on-primary"
                  : "bg-surface-low text-on-surface-variant hover:bg-surface-mid"
              }`}
            >
              Perpetuo
            </button>
          </div>
        </motion.div>

        {/* Plan Cards */}
        <AnimatePresence mode="wait">
          {view === "subscription" ? (
            <motion.div
              key="subscription"
              {...fadeSlide}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start"
            >
              {subscriptionPlans.map((plan) => (
                <div
                  key={plan.name}
                  className={`flex flex-col rounded-none p-6 md:p-8 transition-transform ${
                    plan.highlighted
                      ? "border-2 border-primary bg-surface-low md:scale-105 relative z-10"
                      : "border-edge bg-surface-low"
                  }`}
                >
                  {plan.badge && (
                    <span className="inline-block self-start px-3 py-1 mb-4 text-xs font-bold uppercase tracking-wider bg-tertiary/15 text-tertiary border border-tertiary/30 rounded-none">
                      {plan.badge}
                    </span>
                  )}
                  <div className="flex items-center gap-3 mb-4">
                    {plan.icon}
                    <h3 className="font-family-headline text-xl font-bold text-on-surface">
                      {plan.name}
                    </h3>
                  </div>
                  <div className="mb-6">
                    <span className="font-family-headline text-3xl font-bold text-on-surface">
                      {plan.price}
                    </span>
                    <span className="text-on-surface-variant text-sm">
                      {plan.period}
                    </span>
                  </div>
                  <ul className="flex flex-col gap-3 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <FeatureItem key={f.text} text={f.text} />
                    ))}
                  </ul>
                  <button
                    onClick={() =>
                      openModal(plan.planOption, `${plan.price}${plan.period}`)
                    }
                    className={`w-full py-3 text-sm font-semibold transition-colors rounded-none cursor-pointer ${
                      plan.highlighted
                        ? "bg-tertiary text-on-tertiary hover:bg-tertiary/90"
                        : "border-edge bg-surface-highest text-on-surface hover:bg-surface-high"
                    }`}
                  >
                    Comenzar ahora
                  </button>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="perpetual"
              {...fadeSlide}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto items-start"
            >
              {perpetualPlans.map((plan) => (
                <div
                  key={plan.name}
                  className="flex flex-col bg-surface-low border-edge rounded-none p-6 md:p-8"
                >
                  <span className="inline-block self-start px-3 py-1 mb-4 text-xs font-bold uppercase tracking-wider bg-primary/15 text-primary border border-primary/30 rounded-none">
                    {plan.badge}
                  </span>
                  <div className="flex items-center gap-3 mb-2">
                    {plan.icon}
                    <h3 className="font-family-headline text-xl font-bold text-on-surface">
                      {plan.name}
                    </h3>
                  </div>
                  <p className="text-on-surface-variant text-sm mb-4">
                    {plan.description}
                  </p>
                  <div className="mb-6">
                    <span className="font-family-headline text-3xl font-bold text-on-surface">
                      {plan.price}
                    </span>
                    <span className="text-on-surface-variant text-sm ml-1">
                      pago unico
                    </span>
                  </div>
                  <ul className="flex flex-col gap-3 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <FeatureItem key={f.text} text={f.text} />
                    ))}
                  </ul>
                  <button
                    onClick={() =>
                      openModal(plan.planOption, `${plan.price} pago único`)
                    }
                    className="w-full py-3 text-sm font-semibold border-edge bg-surface-highest text-on-surface hover:bg-surface-high transition-colors rounded-none cursor-pointer"
                  >
                    Solicitar cotizacion
                  </button>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Quote Modal — rendered outside section to avoid stacking-context issues */}
      <QuoteModal
        isOpen={modal !== null}
        plan={modal?.plan ?? ""}
        price={modal?.price ?? ""}
        onClose={closeModal}
      />
    </>
  );
}
