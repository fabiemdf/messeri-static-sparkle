# Messeri & Associates Portal Architectural Principles

These principles govern all portal, API, database, automation, AI, integration, and public-site work.

## 1. Security before features

No feature is complete until authentication, authorization, data classification, logging, and failure behavior are defined and tested. Confidential claim and client information must be denied by default.

## 2. Every important action creates an event

Material business actions must emit a durable domain event. Events must identify the actor, action, subject, time, correlation ID, source, and non-sensitive metadata. Events drive timelines, automation, notifications, reporting, and integrations.

## 3. Every record is auditable

Creates, changes, archives, exports, downloads, permission changes, workflow actions, and authentication events must be written to an append-only audit ledger. Ordinary application users may not update or delete audit entries.

## 4. Matters and engagements are the operating core

The system must not force every service into a public-adjusting claim model. Contacts and organizations relate to matters; matters may have one or more engagements for public adjusting, appraisal, umpire, expert, or consulting work.

## 5. Public, internal, client, and neutral surfaces remain separate

The public marketing website, internal portal, client portal, and neutral-practice surface must be independently secured, deployed, and governed. Shared services may exist behind controlled APIs, but presentation and permissions must remain separated.

## 6. APIs and domain services are the source of truth

User interfaces consume controlled APIs and domain services. Business rules, authorization, conflict controls, calculations, and state transitions must not exist only in browser code.

## 7. Relationships are first-class data

The architecture must support explicit, typed relationships between people, organizations, properties, matters, claims, engagements, carriers, professionals, documents, events, and payments. This relationship layer is the foundation for knowledge-graph search and relationship intelligence.

## 8. AI is assistive and human-controlled

AI may summarize, classify, compare, extract, draft, and recommend. AI may not silently modify production records, send external communications, make legal or coverage conclusions, change financial values, or advance workflow state without an authorized human action. Every AI output must retain provenance and confidence metadata.

## 9. Templates and workflows are versioned

Templates, fee schedules, disclosures, workflow definitions, and calculation rules require immutable versions, effective dates, approval status, and retirement controls. Existing engagements must retain the version under which they were created unless an authorized migration occurs.

## 10. Integrations use provider abstractions

Core business logic must depend on capabilities such as Communication Provider, Calendar Provider, Storage Provider, Accounting Provider, Signature Provider, and Weather Provider—not on a specific vendor implementation.

## 11. Failure is designed, not improvised

Network, storage, database, notification, third-party, and partial-processing failures require defined retry, idempotency, dead-letter, alerting, and recovery behavior. Retrying a command must not create duplicate records or duplicate external messages.

## 12. Privacy and minimization are defaults

Store only information needed for a documented operational purpose. Sensitive values must be encrypted where appropriate, excluded from logs, and protected by least privilege. Test fixtures may not contain production client data.

## 13. Accessibility, performance, and observability are part of done

A feature is incomplete without keyboard access, responsive behavior, acceptable load time, structured error reporting, metrics, traceability, and useful operational logs.

## 14. Schema changes require migrations and rollback planning

All database changes must be represented by reviewable migrations. Each migration must be tested against an empty database and an upgrade path, with rollback or forward-recovery instructions documented.

## 15. Disaster recovery is tested

The system must define and periodically test encrypted backups, point-in-time recovery, versioned document storage, infrastructure reconstruction, Recovery Time Objective, and Recovery Point Objective. Backup existence alone is not proof of recoverability.

## 16. Phase gates are mandatory

No phase advances until its automated, manual, security, permission, data-integrity, accessibility, deployment, and rollback tests pass. Critical or high-severity defects block progression.

## 17. Neutrality controls override convenience

Umpire and neutral engagements require conflict review, neutrality disclosures, role-specific content rules, and separation from advocacy messaging. The portal must prevent accidental reuse of advocacy templates or branding in neutral work.

## 18. Data exports are controlled events

Every export must be authorized, scoped, logged, and attributable. Sensitive exports require a stated purpose and must avoid including fields the user is not authorized to view.

## 19. Search respects source permissions

Universal search, AI retrieval, and relationship queries must apply the same record- and field-level authorization as the underlying modules. Search indexing may never become a permissions bypass.

## 20. Prefer extensible primitives over one-off features

New capabilities should be composed from matters, engagements, relationships, events, tasks, documents, templates, workflows, and permissions. One-off tables and special-case logic require explicit architectural review.

## Required review questions

Every pull request that changes the portal must answer:

1. What domain event does this create or consume?
2. What is written to the audit ledger?
3. Which roles can perform and view the action?
4. What happens on retry, interruption, and partial failure?
5. Does it introduce or expose sensitive information?
6. Does it affect advocacy-versus-neutral separation?
7. What automated and manual tests prove the behavior?
8. What is the migration and recovery plan?
