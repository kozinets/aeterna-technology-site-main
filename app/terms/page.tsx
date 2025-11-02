export default function TermsPage() {
  return (
    <main className="px-6 pb-20 pt-24">
      <div className="mx-auto max-w-3xl space-y-8">
        <h1 className="text-4xl font-semibold text-[var(--text-primary)]">Terms of Use</h1>
        <p className="text-sm text-[var(--text-tertiary)]">
          Effective date: {new Date().getFullYear()}
        </p>
        <p className="text-base leading-relaxed text-[var(--text-secondary)]">
          By accessing Aeterna Technology platforms, you agree to comply with applicable laws, export regulations, and ethical use standards for artificial intelligence, biotechnology, cryptography, and autonomous systems. Unauthorized access or redistribution of restricted modules is strictly prohibited.
        </p>
        <p className="text-base leading-relaxed text-[var(--text-secondary)]">
          Certain services require executed agreements or government clearances. We may suspend or terminate access when security thresholds are exceeded, contractual obligations lapse, or compliance reviews identify risk.
        </p>
        <p className="text-base leading-relaxed text-[var(--text-secondary)]">
          Questions regarding these terms can be directed to <a className="text-[var(--text-accent)]" href="mailto:legal@aeterna.technology">legal@aeterna.technology</a>. Additional policies, including privacy and acceptable use, are incorporated by reference.
        </p>
      </div>
    </main>
  );
}
