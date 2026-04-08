const linkGroups = [
  {
    title: "Producto",
    links: [
      { label: "Caracteristicas", href: "#comparativa" },
      { label: "Precios", href: "#precios" },
    ],
  },
  {
    title: "Compania",
    links: [
      { label: "Sobre Nosotros", href: "#" },
      { label: "Soporte", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacidad", href: "#" },
      { label: "Terminos", href: "#" },
    ],
  },
];

function Footer() {
  return (
    <footer className="border-t-2 border-outline-variant bg-surface-dim">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* ── Brand column ── */}
          <div>
            <p className="font-headline text-lg font-extrabold text-on-surface">
              InkPulse
            </p>
            <p className="mt-1 font-body text-sm text-on-surface-variant">
              Precision Luminary Systems
            </p>
            <p className="mt-4 font-body text-xs text-on-surface-variant/60">
              &copy; 2025 InkPulse. Paraguay.
            </p>
          </div>

          {/* ── Link columns ── */}
          {linkGroups.map((group) => (
            <div key={group.title}>
              <p className="mb-4 font-headline text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                {group.title}
              </p>
              <ul className="flex flex-col gap-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="font-body text-sm text-on-surface-variant/80 transition-colors hover:text-primary"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
