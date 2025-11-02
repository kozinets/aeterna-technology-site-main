import Link from "next/link";

const footerLinks = [
  {
    title: "Экосистема",
    links: [
      { label: "Atlas Cognitive Engine", href: "/ai/atlas" },
      { label: "NeuroWeave", href: "/bio/neuro-weave" },
      { label: "DePIN Orchestration", href: "/crypto/depin" },
      { label: "Quantum Zero Trust", href: "/security/quantum" }
    ]
  },
  {
    title: "Решения",
    links: [
      { label: "Государственные программы", href: "/solutions/government" },
      { label: "Корпоративный сектор", href: "/solutions/enterprise" },
      { label: "Лаборатории и университеты", href: "/solutions/research" },
      { label: "Роботизированные фабрики", href: "/solutions/industry" }
    ]
  },
  {
    title: "Ресурсы",
    links: [
      { label: "Документация", href: "/docs" },
      { label: "Партнёрская программа", href: "/partners" },
      { label: "Aeterna Pass", href: "/platform/pass" },
      { label: "Медиацентр", href: "/media" }
    ]
  }
];

export function Footer() {
  return (
    <footer className="mt-32 border-t border-[var(--border-default)] bg-[var(--bg-elevated-secondary)]/80">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-12 px-8 py-14 md:flex-row md:justify-between">
        <div className="max-w-md space-y-4">
          <div className="flex items-center gap-3 text-lg font-semibold">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-default)] bg-[var(--bg-secondary)] font-display text-sm uppercase text-[var(--text-accent)]">
              AT
            </span>
            <span className="font-display text-sm uppercase tracking-[0.3em] text-[var(--text-secondary)]">Aeterna Technology</span>
          </div>
          <p className="text-sm leading-relaxed text-[var(--text-tertiary)]">
            Корпорация полного цикла: искусственный интеллект, сети, криптография, биомедицина, робототехника и бессмертие. Мы строим технологический фундамент будущего цивилизации.
          </p>
          <div className="flex gap-4 text-xs text-[var(--text-tertiary)]">
            <span>© {new Date().getFullYear()} Aeterna Technology</span>
            <Link href="/privacy">Конфиденциальность</Link>
            <Link href="/terms">Условия</Link>
          </div>
        </div>
        <div className="grid flex-1 gap-8 sm:grid-cols-3">
          {footerLinks.map((group) => (
            <div key={group.title} className="space-y-3">
              <h4 className="text-sm uppercase tracking-[0.18em] text-[var(--text-tertiary)]">{group.title}</h4>
              <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link className="transition hover:text-[var(--text-accent)]" href={link.href}>
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
