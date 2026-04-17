import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

interface Row {
  feature: string;
  bronze: boolean;
  silver: boolean;
  gold: boolean;
  platinum: boolean;
}

const rows: Row[] = [
  { feature: "Monitoreo SNMP multimarca",          bronze: true,  silver: true,  gold: true,  platinum: true  },
  { feature: "Alertas criticas por email",          bronze: true,  silver: true,  gold: true,  platinum: true  },
  { feature: "Dashboard web",                       bronze: false, silver: true,  gold: true,  platinum: true  },
  { feature: "Dashboard avanzado con analytics",    bronze: false, silver: false, gold: true,  platinum: true  },
  { feature: "Predicciones de consumo de toner",    bronze: false, silver: false, gold: false, platinum: true  },
  { feature: "Modulo de costos",                    bronze: false, silver: true,  gold: true,  platinum: true  },
  { feature: "Exportacion de reportes",             bronze: false, silver: true,  gold: true,  platinum: true  },
  { feature: "Exportacion PDF y Excel",             bronze: false, silver: false, gold: true,  platinum: true  },
  { feature: "Exportacion CSV y JSON",              bronze: false, silver: false, gold: false, platinum: true  },
  { feature: "Control de escritura",                bronze: false, silver: true,  gold: true,  platinum: true  },
  { feature: "Roles Manager y Viewer",              bronze: false, silver: true,  gold: true,  platinum: true  },
  { feature: "Historial ilimitado",                 bronze: false, silver: false, gold: false, platinum: true  },
];

const plans = [
  { key: "bronze",   label: "Bronce"  },
  { key: "silver",   label: "Plata"   },
  { key: "gold",     label: "Oro"     },
  { key: "platinum", label: "Platino" },
] as const;

type PlanKey = typeof plans[number]["key"];

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
        {/* Section header */}
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
            Encuentra el tier que se ajusta a las necesidades de tu organizacion.
          </p>
        </motion.div>

        {/* Table */}
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
                    key={plan.key}
                    className="border-b-2 border-outline-variant px-4 py-4 text-center font-headline text-xs font-bold uppercase tracking-widest text-on-surface-variant"
                  >
                    {plan.label}
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
                  {plans.map((plan) => (
                    <td
                      key={plan.key}
                      className="border-b border-outline-variant/40 px-4 py-4 text-center"
                    >
                      <CellIcon value={row[plan.key as PlanKey]} />
                    </td>
                  ))}
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
