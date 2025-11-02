import { Header } from "@/components/header";
import { AccessPortal } from "@/components/access-portal";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Insights } from "@/components/insights";
import { Programs } from "@/components/programs";
import { Building2, Cpu, FlaskConical, Orbit, Radar, Sparkles, Workflow } from "lucide-react";

const ecosystemModules = [
  {
    title: "Aeterna Genesis",
    description: "Инкубатор для гиперпрорывных проектов: биопринтинг органов, синтез материалов и нанороботы.",
    detail: "18 направлений, связаны с Sentient Cloud и Vitality Labs"
  },
  {
    title: "Continuum Campus",
    description: "Университет будущего: нейроаудитории, квантовые вычислители и роботизированные лаборатории.",
    detail: "32 000 исследователей и студентов"
  },
  {
    title: "Orbital Forge",
    description: "Космическая производственная платформа для имплантов, спутников и автономных станций.",
    detail: "Орбиты LEO/MEO с квантовым каналом"
  },
  {
    title: "Aeterna Network Fabric",
    description: "Глобальная сеть прокси, DePIN и квантовой связи для данных, роботов и имплантов.",
    detail: "NOVA Proxy, Synapse Mesh, Quantum Zero Trust"
  }
];

const alliance = [
  {
    icon: Building2,
    title: "Государства",
    text: "Суверенные облака, цифровые двойники инфраструктуры и программы бессмертия для ключевых персон."
  },
  {
    icon: Workflow,
    title: "Корпорации",
    text: "Оркестрация автономных производств, биофабрик и цифровых ассистентов."
  },
  {
    icon: FlaskConical,
    title: "Университеты",
    text: "Доступ к лабораториям Aeterna, совместные исследования, обмен данными и моделями."
  },
  {
    icon: Orbit,
    title: "Орбитальные миссии",
    text: "Флот спутников, станции и дроны, управляемые Atlas Command и Sentient Cloud."
  }
];

export default function Page() {
  return (
    <main>
      <Header />
      <div className="px-6 pb-24 pt-20">
        <Hero />
        <Programs />
        <section className="mx-auto mt-28 max-w-[1200px]">
          <div className="section-shell px-10 py-12">
            <div className="flex flex-col gap-6 md:flex-row md:justify-between">
              <div className="max-w-2xl space-y-4">
                <span className="badge">Integrated ecosystems</span>
                <h2 className="text-3xl font-semibold text-[var(--text-primary)] md:text-4xl">
                  Экосистема Aeterna раскрывает технологии через живые кампусы и орбитальные платформы.
                </h2>
                <p className="text-base leading-relaxed text-[var(--text-secondary)]">
                  От подземных лабораторий до орбитальных заводов — каждая площадка соединена через Sentient Cloud и Quantum Zero Trust. Мы строим сеть, где цифровые и биологические системы эволюционируют синхронно.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {[
                  {
                    icon: Cpu,
                    label: "Sentient Cloud",
                    value: "Экзаскейл вычисления"
                  },
                  {
                    icon: Sparkles,
                    label: "Neural Lattice",
                    value: "Самообучающиеся агенты"
                  },
                  {
                    icon: Radar,
                    label: "Aeterna Link",
                    value: "Мгновенный обмен"
                  }
                ].map((item) => (
                  <div key={item.label} className="glass-panel flex flex-col gap-2 p-5">
                    <item.icon className="h-6 w-6 text-[var(--icon-accent)]" />
                    <span className="text-xs uppercase tracking-[0.18em] text-[var(--text-tertiary)]">{item.label}</span>
                    <p className="text-sm font-semibold text-[var(--text-primary)]">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {ecosystemModules.map((module) => (
                <div key={module.title} className="grid-card">
                  <h3 className="text-xl font-semibold text-[var(--text-primary)]">{module.title}</h3>
                  <p className="mt-2 text-sm text-[var(--text-secondary)]">{module.description}</p>
                  <p className="mt-4 text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">{module.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="mx-auto mt-28 max-w-[1200px]">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
            <div className="section-shell px-10 py-12">
              <span className="badge">Alliance</span>
              <h2 className="mt-4 text-3xl font-semibold text-[var(--text-primary)] md:text-4xl">
                Партнёрские программы Aeterna.
              </h2>
              <p className="mt-4 text-base text-[var(--text-secondary)]">
                Мы работаем с правительствами, корпорациями и университетами для запуска совместных программ, поддерживаем совместное владение инфраструктурой и развиваем глобальные миссии.
              </p>
              <div className="mt-8 grid gap-5">
                {alliance.map((unit) => (
                  <div key={unit.title} className="glass-panel flex gap-4 p-5">
                    <unit.icon className="mt-1 h-6 w-6 text-[var(--icon-accent)]" />
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--text-tertiary)]">{unit.title}</h3>
                      <p className="mt-2 text-sm text-[var(--text-secondary)]">{unit.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="section-shell px-10 py-12">
              <span className="badge">Continuum timeline</span>
              <h2 className="mt-4 text-3xl font-semibold text-[var(--text-primary)] md:text-4xl">Дорожная карта эволюции Aeterna.</h2>
              <div className="mt-8 space-y-6">
                {["2024 — Quantum Zero Trust развернут в 12 странах", "2025 — запуск Orbital Forge и Sentient Cloud v3", "2026 — массовое внедрение NeuroWeave и биогенеза", "2027 — автономные города под управлением Atlas"].map((milestone) => (
                  <div key={milestone} className="border-l border-[var(--border-default)] pl-6">
                    <p className="text-sm text-[var(--text-secondary)]">{milestone}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <Insights />
        <AccessPortal />
      </div>
      <Footer />
    </main>
  );
}
