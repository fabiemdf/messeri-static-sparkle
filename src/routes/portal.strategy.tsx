import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, ArrowRight, BarChart3, BriefcaseBusiness, CheckCircle2, Clock3, Scale, ShieldCheck, Target } from "lucide-react";
import { getStrategySnapshot, type PracticeKey } from "../lib/management-strategy";

export const Route = createFileRoute("/portal/strategy")({
  loader: () => getStrategySnapshot(),
  head: () => ({
    meta: [
      { title: "Strategy Command Center | Messeri & Associates" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: StrategyCommandCenter,
});

const practiceIcons: Record<PracticeKey, typeof BriefcaseBusiness> = {
  "public-adjusting": BriefcaseBusiness,
  appraisal: BarChart3,
  umpire: Scale,
  "expert-consulting": ShieldCheck,
};

function StrategyCommandCenter() {
  const snapshot = Route.useLoaderData();
  const planned = snapshot.initiatives.filter((initiative) => initiative.status === "planned").length;
  const active = snapshot.initiatives.filter((initiative) => initiative.status === "active").length;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(14,116,144,0.24),_transparent_40%),radial-gradient(circle_at_top_right,_rgba(180,83,9,0.18),_transparent_35%)]">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-200">
                <AlertTriangle className="h-3.5 w-3.5" /> Phase 0 preview — no client data
              </div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">Messeri & Associates</p>
              <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-white md:text-6xl">Strategy command center</h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
                A management view that treats public adjusting, insured-side appraisal, neutral umpire work, and expert consulting as distinct practices with shared operations but separate positioning.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <StatCard label="Practice lines" value={snapshot.practices.length.toString()} />
              <StatCard label="Active initiatives" value={active.toString()} />
              <StatCard label="Planned initiatives" value={planned.toString()} />
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-12 px-6 py-10 lg:px-8 lg:py-14">
        <section>
          <SectionHeading eyebrow="Brand architecture" title="Four businesses, four buying motions" description="Each practice has its own buyer, demand cycle, referral network, and neutrality exposure. The portal should track them separately before rolling them into firmwide reporting." />
          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            {snapshot.practices.map((practice) => {
              const Icon = practiceIcons[practice.key];
              return (
                <article key={practice.key} className="rounded-2xl border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/10">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-4">
                      <div className="rounded-xl border border-cyan-300/15 bg-cyan-300/10 p-3 text-cyan-200"><Icon className="h-5 w-5" /></div>
                      <div>
                        <h2 className="text-xl font-semibold text-white">{practice.name}</h2>
                        <p className="mt-2 text-sm leading-6 text-slate-300">{practice.positioning}</p>
                      </div>
                    </div>
                    <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-slate-300">Target {practice.targetMixPercent}%</span>
                  </div>
                  <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2">
                    <Detail label="Revenue model" value={practice.revenueModel} />
                    <Detail label="Demand driver" value={practice.demandDriver} />
                    <Detail label="Primary buyers" value={practice.primaryBuyers.join(", ")} />
                    <Detail label="Referral channels" value={practice.referralChannels.join(", ")} />
                  </dl>
                  <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-xs">
                    <span className="uppercase tracking-[0.16em] text-slate-500">Advocate / neutral tension</span>
                    <span className={practice.neutralityRisk === "high" ? "font-semibold text-amber-300" : "font-semibold text-emerald-300"}>{practice.neutralityRisk}</span>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section>
          <SectionHeading eyebrow="90-day execution" title="Initiative pipeline" description="Work is organized by horizon and cannot advance into sensitive operational modules until the Phase 0 security gate is passed." />
          <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035]">
            <div className="hidden grid-cols-[1.35fr_.75fr_.8fr_.8fr] gap-4 border-b border-white/10 px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 md:grid">
              <span>Initiative</span><span>Horizon</span><span>Owner</span><span>Status</span>
            </div>
            {snapshot.initiatives.map((initiative) => (
              <div key={initiative.id} className="grid gap-3 border-b border-white/10 px-5 py-5 last:border-0 md:grid-cols-[1.35fr_.75fr_.8fr_.8fr] md:items-center md:gap-4">
                <div>
                  <div className="flex items-center gap-2"><Target className="h-4 w-4 text-cyan-300" /><h3 className="font-semibold text-white">{initiative.title}</h3></div>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{initiative.successMetric}</p>
                  {initiative.complianceNote ? <p className="mt-2 text-xs leading-5 text-amber-200">{initiative.complianceNote}</p> : null}
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-300"><Clock3 className="h-4 w-4 text-slate-500" />{initiative.horizon}</div>
                <div className="text-sm text-slate-300">{initiative.ownerRole}</div>
                <StatusBadge status={initiative.status} />
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_.8fr]">
          <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-6">
            <SectionHeading eyebrow="Management scorecard" title="Five numbers to track monthly" description="These metrics connect lead generation to operational efficiency and deliberate revenue diversification." compact />
            <ol className="mt-6 space-y-3">
              {snapshot.operatingMetrics.map((metric, index) => (
                <li key={metric} className="flex items-center gap-4 rounded-xl border border-white/10 bg-black/15 px-4 py-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-300/10 text-sm font-semibold text-cyan-200">{index + 1}</span>
                  <span className="text-sm text-slate-200">{metric}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-2xl border border-amber-300/20 bg-amber-300/[0.07] p-6">
            <div className="flex items-center gap-3"><ShieldCheck className="h-6 w-6 text-amber-200" /><h2 className="text-xl font-semibold text-white">Phase gate</h2></div>
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.16em] text-amber-200">{snapshot.phaseGate.status.replaceAll("-", " ")}</p>
            <p className="mt-4 text-sm leading-6 text-slate-200">{snapshot.phaseGate.rule}</p>
            <div className="mt-6 flex items-center gap-2 text-sm text-slate-300"><CheckCircle2 className="h-4 w-4 text-emerald-300" />Typed frontend strategy model</div>
            <div className="mt-3 flex items-center gap-2 text-sm text-slate-300"><CheckCircle2 className="h-4 w-4 text-emerald-300" />Read-only backend strategy endpoint</div>
            <div className="mt-3 flex items-center gap-2 text-sm text-slate-300"><ArrowRight className="h-4 w-4 text-amber-200" />Next: authentication, authorization, audit logging, persistence, and automated tests</div>
          </div>
        </section>
      </div>
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return <div className="min-w-32 rounded-xl border border-white/10 bg-black/20 px-4 py-3"><div className="text-2xl font-semibold text-white">{value}</div><div className="mt-1 text-xs uppercase tracking-[0.14em] text-slate-400">{label}</div></div>;
}

function Detail({ label, value }: { label: string; value: string }) {
  return <div><dt className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{label}</dt><dd className="mt-1.5 leading-6 text-slate-300">{value}</dd></div>;
}

function StatusBadge({ status }: { status: "planned" | "active" | "blocked" | "complete" }) {
  const classes = status === "active" ? "border-cyan-300/20 bg-cyan-300/10 text-cyan-200" : status === "complete" ? "border-emerald-300/20 bg-emerald-300/10 text-emerald-200" : status === "blocked" ? "border-red-300/20 bg-red-300/10 text-red-200" : "border-white/10 bg-white/5 text-slate-300";
  return <span className={`w-fit rounded-full border px-3 py-1 text-xs font-semibold capitalize ${classes}`}>{status}</span>;
}

function SectionHeading({ eyebrow, title, description, compact = false }: { eyebrow: string; title: string; description: string; compact?: boolean }) {
  return <div className={compact ? "max-w-2xl" : "max-w-3xl"}><p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">{eyebrow}</p><h2 className="mt-2 font-serif text-3xl font-semibold text-white">{title}</h2><p className="mt-3 text-sm leading-6 text-slate-400">{description}</p></div>;
}
