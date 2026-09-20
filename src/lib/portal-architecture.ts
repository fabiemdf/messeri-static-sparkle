export const architecturalPrinciples = [
  "Security before features",
  "Every important action creates an event",
  "Every record is auditable",
  "Matters and engagements are the operating core",
  "Public, internal, client, and neutral surfaces remain separate",
  "APIs and domain services are the source of truth",
  "Relationships are first-class data",
  "AI is assistive and human-controlled",
  "Templates and workflows are versioned",
  "Integrations use provider abstractions",
  "Failure is designed, not improvised",
  "Privacy and minimization are defaults",
  "Accessibility, performance, and observability are part of done",
  "Schema changes require migrations and rollback planning",
  "Disaster recovery is tested",
  "Phase gates are mandatory",
  "Neutrality controls override convenience",
  "Data exports are controlled events",
  "Search respects source permissions",
  "Prefer extensible primitives over one-off features",
] as const;

export type PortalSurface = "public" | "internal" | "client" | "neutral";

export type DomainEventEnvelope<TPayload extends Record<string, unknown> = Record<string, unknown>> = {
  id: string;
  eventType: string;
  eventVersion: number;
  occurredAt: string;
  actorId: string | null;
  actorType: "user" | "system" | "integration";
  subjectType: string;
  subjectId: string;
  matterId?: string;
  engagementId?: string;
  correlationId: string;
  causationId?: string;
  source: PortalSurface | "worker" | "migration";
  payload: TPayload;
};

export type AuditEntry = {
  id: string;
  occurredAt: string;
  actorId: string | null;
  actorType: "user" | "system" | "integration";
  action: string;
  subjectType: string;
  subjectId: string;
  matterId?: string;
  engagementId?: string;
  requestId?: string;
  ipAddressHash?: string;
  userAgentHash?: string;
  metadata: Record<string, unknown>;
};

export type RelationshipEdge = {
  id: string;
  sourceType: string;
  sourceId: string;
  relationshipType: string;
  targetType: string;
  targetId: string;
  matterId?: string;
  validFrom: string;
  validTo?: string;
  metadata: Record<string, unknown>;
};

export type AiAssistanceRecord = {
  id: string;
  capability: "summarize" | "classify" | "extract" | "compare" | "draft" | "recommend";
  subjectType: string;
  subjectId: string;
  requestedBy: string;
  modelProvider: string;
  modelName: string;
  promptVersion: string;
  sourceReferences: string[];
  confidence?: number;
  output: Record<string, unknown>;
  status: "generated" | "reviewed" | "accepted" | "rejected";
  reviewedBy?: string;
  reviewedAt?: string;
};

export const phaseZeroArchitectureGate = {
  name: "Architecture and safety foundation",
  status: "blocked" as const,
  requiredChecks: [
    "Authentication and server-side authorization",
    "Append-only domain event and audit stores",
    "Row-level security denial tests",
    "Migration and rollback validation",
    "Public-route regression suite",
    "Accessibility and responsive review",
    "Backup restore drill",
    "AI human-approval enforcement tests",
  ],
};
