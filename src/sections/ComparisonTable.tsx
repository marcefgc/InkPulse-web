import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

interface Row {
  feature: string;
  starter: boolean;
  business: boolean;
  pro: boolean;
  enterprise: boolean;
}

const rows: Row[] = [
  { feature: "Monitoreo SNMP Multimarca", starter: true, business: true, pro: true, enterprise: true },
  { feature: "Alertas Criticas", starter: true, business: true, pro: true, enterprise: true },
  { feature: "Modo NOC / Informes HTML", starter: false, business: true, pro: true, enterprise: true },
  { feature: "Alertas SMTP Personalizadas", starter: false, business: false, pro: true, enterprise: true },
  { feature: "Panel Web multi-dispositivo", starter: false, business: false, pro: false, enterprise: true },
  { feature: "API REST de Acceso Total", starter: false, business: false, pro: false, enterprise: true },
];

const plans = ["Starter", "Business", "Pro", "Enterprise"] as const;

function CellIcon({ value }: { value: boolean }) {
  return value ? (
    <Check size={18} className="mx-auto text-tertiary" strokeWidth={2.5} />
  ) : (
    <X size={18} className="mx-auto text-outline" strokeWidth={2} />
  );
}

function ComparisonTable() {
  return (
    <section id="comparativa" className="relative py-24">
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
            Comparativa de Funciones
          </h2>
          <p className="mt-4 font-body text-lg text-on-surface-variant">
            Encuentra el plan que se ajusta a las necesidades de tu organizacion.
          </p>
        </motion.div>

        {/* ── Table ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="overflow-x-auto"
        >
          <table className="border-edge w-full min-w-[600px] rounded-none text-left">
            <thead>
              <tr className="bg-surface-high">
                <th className="border-b-2 border-outline-variant px-6 py-4 font-headline text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                  Caracteristicas
                </th>
                {plans.map((plan) => (
                  <th
                    key={plan}
                    className="border-b-2 border-outline-variant px-4 py-4 text-center font-headline text-xs font-bold uppercase tracking-widest text-on-surface-variant"
                  >
                    {plan}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={row.feature}
                  className={i % 2 === 0 ? "bg-surface-dim" : "bg-transparent"}
                >
                  <td className="border-b border-outline-variant/40 px-6 py-4 font-body text-sm text-on-surface">
                    {row.feature}
                  </td>
                  <td className="border-b border-outline-variant/40 px-4 py-4 text-center">
                    <CellIcon value={row.starter} />
                  </td>
                  <td className="border-b border-outline-variant/40 px-4 py-4 text-center">
                    <CellIcon value={row.business} />
                  </td>
                  <td className="border-b border-outline-variant/40 px-4 py-4 text-center">
                    <CellIcon value={row.pro} />
                  </td>
                  <td className="border-b border-outline-variant/40 px-4 py-4 text-center">
                    <CellIcon value={row.enterprise} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}

export default ComparisonTable;
