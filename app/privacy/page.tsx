export default function PrivacyPage() {
  return (
    <main className="px-6 pb-20 pt-24">
      <div className="mx-auto max-w-3xl space-y-8">
        <h1 className="text-4xl font-semibold text-[var(--text-primary)]">Privacy Policy</h1>
        <p className="text-sm text-[var(--text-tertiary)]">
          Last updated: {new Date().getFullYear()}
        </p>
        <p className="text-base leading-relaxed text-[var(--text-secondary)]">
          Aeterna Technology maintains strict controls over data processed across our platforms, research environments, and customer solutions. We collect only the information required to deliver contracted services, uphold regulatory obligations, and improve the safety of our products.
        </p>
        <p className="text-base leading-relaxed text-[var(--text-secondary)]">
          Personal information is encrypted in transit and at rest using post-quantum resistant algorithms. Access is governed by Aeterna Pass with biometric and contextual verification. We never sell customer data, and we retain information only for the duration necessary to achieve the stated purpose.
        </p>
        <p className="text-base leading-relaxed text-[var(--text-secondary)]">
          To request data access, correction, or deletion, contact the Aeterna Data Protection Office at <a className="text-[var(--text-accent)]" href="mailto:privacy@aeterna.technology">privacy@aeterna.technology</a>. We respond to all validated inquiries within 30 days.
        </p>
      </div>
    </main>
  );
}
