import Link from "next/link";

const footerLinks = [
  {
    title: "Ecosystem",
    links: [
      { label: "Atlas Cognitive Engine", href: "/ai/atlas" },
      { label: "NeuroWeave", href: "/bio/neuro-weave" },
      { label: "DePIN Orchestration", href: "/crypto/depin" },
      { label: "Quantum Zero Trust", href: "/security/quantum" }
    ]
  },
  {
    title: "Solutions",
    links: [
      { label: "Government programs", href: "/solutions/government" },
      { label: "Enterprise sector", href: "/solutions/enterprise" },
      { label: "Labs & universities", href: "/solutions/research" },
      { label: "Robotic factories", href: "/solutions/industry" }
    ]
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "Partner network", href: "/partners" },
      { label: "Aeterna Pass", href: "/platform/pass" },
      { label: "Media center", href: "/media" }
    ]
  }
];

export function Footer() {
  return (
    <footer className="mt-32 border-t border-[var(--border-default)] bg-[var(--bg-elevated-secondary)]/80">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-12 px-8 py-14 md:flex-row md:justify-between">
        <div className="max-w-md space-y-4">
          <div className="flex items-center gap-3 text-lg font-semibold">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-default)] bg-[var(--bg-secondary)] font-display text-sm uppercase text-[var(--text-inverted)]">
              AT
            </span>
            <span className="font-display text-sm uppercase tracking-[0.3em] text-[var(--text-secondary)]">Aeterna Technology</span>
          </div>
          <p className="text-sm leading-relaxed text-[var(--text-tertiary)]">
            Full-spectrum corporation across AI, networks, cryptography, biomedicine, robotics, and orbital systems. We engineer the technological substrate for civilization's next era.
          </p>
          <div className="flex gap-4 text-xs text-[var(--text-tertiary)]">
            <span>© {new Date().getFullYear()} Aeterna Technology</span>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
        <div className="grid flex-1 gap-8 sm:grid-cols-3">
          {footerLinks.map((group) => (
            <div key={group.title} className="space-y-3">
              <h4 className="text-sm uppercase tracking-[0.18em] text-[var(--text-tertiary)]">{group.title}</h4>
              <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link className="transition hover:text-[var(--text-primary)]" href={link.href as any}>
                      {link.label}
                    </Link>
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
