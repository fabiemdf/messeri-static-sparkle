import { createFileRoute, Link } from "@tanstack/react-router";
import {
  architecturalPrinciples,
  phaseZeroArchitectureGate,
} from "../lib/portal-architecture";

export const Route = createFileRoute("/portal/architecture")({
  head: () => ({
    meta: [
      { title: "Portal Architecture | Messeri & Associates" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: PortalArchitecturePage,
});

function PortalArchitecturePage() {
  return (
    <main className="min-h-screen bg-slate-950 px-5 py-10 text-slate-100">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
              Phase 0 governance
            </p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight">
              Portal Architecture Constitution
            </h1>
            <p className="mt-3 max-w-3xl text-slate-300">
              Mandatory technical and operating controls for every portal feature,
              API, database change, automation, AI capability, and integration.
            </p>
          </div>
          <Link
            to="/portal/strategy"
            className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium hover:bg-slate-900"
          >
            Strategy command center
          </Link>
        </div>

        <section className="mb-8 rounded-2xl border border-amber-500/40 bg-amber-500/10 p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">{phaseZeroArchitectureGate.name}</h2>
              <p className="mt-2 text-sm text-amber-100">
                Status: {phaseZeroArchitectureGate.status.toUpperCase()}. No confidential
                production data or Phase 1 workflows may be introduced until every check passes.
              </p>
            </div>
            <span className="rounded-full bg-amber-300 px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-950">
              Do not advance
            </span>
          </div>
          <ul className="mt-5 grid gap-2 md:grid-cols-2">
            {phaseZeroArchitectureGate.requiredChecks.map((check) => (
              <li key={check} className="rounded-lg bg-slate-950/50 px-4 py-3 text-sm">
                □ {check}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">Architectural principles</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {architecturalPrinciples.map((principle, index) => (
              <article
                key={principle}
                className="rounded-xl border border-slate-800 bg-slate-900 p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                  Principle {index + 1}
                </p>
                <h3 className="mt-2 text-lg font-semibold">{principle}</h3>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            ["Event-driven", "Material actions produce durable, correlated domain events."],
            ["Auditable", "Creates, edits, exports, downloads, and permissions enter an append-only ledger."],
            ["Relationship-ready", "Typed edges connect people, firms, matters, engagements, documents, and outcomes."],
            ["AI controlled", "AI may assist, but production changes and external actions require human approval."],
            ["Provider-neutral", "Vendor integrations sit behind replaceable capability interfaces."],
            ["Recoverable", "Backups, point-in-time recovery, and restoration drills are mandatory."],
          ].map(([title, description]) => (
            <article key={title} className="rounded-xl border border-slate-800 p-5">
              <h3 className="font-semibold text-amber-300">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{description}</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
