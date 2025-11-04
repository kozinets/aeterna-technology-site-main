import { getLegalContent } from "@/lib/cms/site-config";

export default function TermsPage() {
  const content = getLegalContent("terms");

  return (
    <main className="px-6 pb-20 pt-24">
      <div className="mx-auto max-w-3xl space-y-8">
        <h1 className="text-4xl font-semibold text-[var(--text-primary)]">{content.title}</h1>
        <p className="text-sm text-[var(--text-tertiary)]">{content.lead}</p>
        {content.sections.map((section) => (
          <section key={section.heading} className="space-y-3">
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">{section.heading}</h2>
            {section.body.map((paragraph, index) => (
              <p key={index} className="text-base leading-relaxed text-[var(--text-secondary)]">
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </div>
    </main>
  );
}
