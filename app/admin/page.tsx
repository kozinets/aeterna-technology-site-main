import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AdminDashboard } from "@/components/admin/admin-dashboard";

export default function AdminPage() {
  return (
    <main>
      <Header />
      <div className="mx-auto w-full max-w-[1440px] px-4 pb-24 pt-12 sm:px-8 lg:px-12">
        <AdminDashboard />
      </div>
      <Footer />
    </main>
  );
}
