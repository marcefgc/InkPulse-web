import { motion } from "framer-motion";
import { Headphones, Building2 } from "lucide-react";
import ContactForm from "../components/ContactForm";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

function Contact() {
  return (
    <section id="contacto" className="relative py-24">
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
              Listo para tomar el control?
            </h2>
            <p className="mt-4 font-body text-lg leading-relaxed text-on-surface-variant">
              Nuestro equipo te acompana en cada paso de la implementacion.
              Desde la configuracion inicial hasta la puesta en marcha completa
              de PSA Enterprise en tu infraestructura.
            </p>

            <div className="mt-10 flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-none border-2 border-outline-variant bg-surface-low">
                  <Headphones size={24} className="text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-headline text-base font-bold text-on-surface">
                    Asesoria Directa
                  </h3>
                  <p className="mt-1 font-body text-sm text-on-surface-variant">
                    Soporte personalizado para dimensionar tu solucion y
                    resolver cualquier duda tecnica.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-none border-2 border-outline-variant bg-surface-low">
                  <Building2 size={24} className="text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-headline text-base font-bold text-on-surface">
                    Consultoria de Implementacion
                  </h3>
                  <p className="mt-1 font-body text-sm text-on-surface-variant">
                    Planificacion, despliegue y capacitacion para tu equipo de
                    TI con acompanamiento continuo.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Right column — form ── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
