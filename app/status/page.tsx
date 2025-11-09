import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "System Status | Aeterna Technology",
  description: "Current operational status of Aeterna Technology services."
};

export default function StatusPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 py-24 text-white">
      <div className="max-w-2xl text-center">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">System status</h1>
        <p className="mt-4 text-base text-white/70">
          All systems are operating normally. Subscribe to our updates to be notified of any service interruptions.
        </p>
      </div>
    </main>
  );
}
