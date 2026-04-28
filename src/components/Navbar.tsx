import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

// Anchor links — prefixed with "/" when on sub-pages so the browser navigates
// back to home first, then scrolls to the section.
const HOME_ANCHORS = [
  { label: "Inicio",          anchor: "#inicio" },
  { label: "Como funciona",   anchor: "#como-funciona" },
  { label: "Caracteristicas", anchor: "#caracteristicas" },
  { label: "Precios",         anchor: "#precios" },
  { label: "Contacto",        anchor: "#contacto" },
];

function useNavLinks() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  return HOME_ANCHORS.map((l) => ({
    label: l.label,
    href: isHome ? l.anchor : `/${l.anchor}`,
  }));
}

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navLinks = useNavLinks();
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const ctaHref = isHome ? "#precios" : "/#precios";

  return (
    <nav className="fixed top-0 inset-x-0 z-50 border-b-2 border-outline-variant bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
        {/* ── Logo ── */}
        <Link to="/" className="flex items-center gap-3 group min-w-0">
          <div className="relative flex shrink-0 items-center justify-center">
            {/* Glow ring detrás del icono */}
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-md scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <img
              src="/inkpulse-icon.png"
              alt="InkPulse logo"
              className="relative h-14 w-14 object-contain drop-shadow-[0_0_8px_rgba(177,199,242,0.35)] group-hover:drop-shadow-[0_0_14px_rgba(177,199,242,0.55)] transition-all duration-300"
            />
          </div>
          <div className="flex min-w-0 flex-col justify-center gap-0.5 leading-none">
            <span className="font-headline text-xl font-extrabold tracking-tight text-primary">
              InkPulse
            </span>
            <span className="max-w-[11.5rem] text-balance font-body text-[10px] font-medium leading-snug tracking-wide text-tertiary/80 sm:max-w-none sm:text-[11px] sm:whitespace-nowrap">
              Smart Alerts for Smart Offices
            </span>
          </div>
        </Link>

        {/* ── Desktop links ── */}
        <ul className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="font-body text-sm font-medium text-on-surface-variant transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <Link
              to="/beta"
              className={`font-body text-sm font-medium transition-colors hover:text-primary ${
                pathname.startsWith("/beta") ? "text-tertiary" : "text-on-surface-variant"
              }`}
            >
              Beta
            </Link>
          </li>
        </ul>

        {/* ── Desktop CTA ── */}
        <a
          href={ctaHref}
          className="hidden rounded-none border-2 border-tertiary bg-tertiary px-5 py-2 font-headline text-sm font-bold text-on-tertiary transition-colors hover:bg-tertiary/90 md:inline-block"
        >
          Empezar
        </a>

        {/* ── Mobile hamburger ── */}
        <button
          type="button"
          aria-label={mobileOpen ? "Cerrar menu" : "Abrir menu"}
          className="rounded-none text-on-surface md:hidden"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" as const }}
            className="overflow-hidden border-t-2 border-outline-variant bg-background/95 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-none px-3 py-3 font-body text-base font-medium text-on-surface-variant transition-colors hover:bg-surface-high hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  to="/beta"
                  onClick={() => setMobileOpen(false)}
                  className={`block rounded-none px-3 py-3 font-body text-base font-medium transition-colors hover:bg-surface-high hover:text-primary ${
                    pathname.startsWith("/beta") ? "text-tertiary" : "text-on-surface-variant"
                  }`}
                >
                  Beta Program
                </Link>
              </li>
              <li className="mt-3">
                <a
                  href={ctaHref}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-none border-2 border-tertiary bg-tertiary px-5 py-3 text-center font-headline text-sm font-bold text-on-tertiary transition-colors hover:bg-tertiary/90"
                >
                  Empezar
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
