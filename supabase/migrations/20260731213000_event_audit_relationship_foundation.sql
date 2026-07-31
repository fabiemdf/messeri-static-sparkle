-- Phase 0 event, audit, relationship, and AI-governance foundation.
-- No application policies are intentionally granted in this migration.

create extension if not exists pgcrypto;

create table if not exists public.domain_events (
  id uuid primary key default gen_random_uuid(),
  event_type text not null,
  event_version integer not null default 1 check (event_version > 0),
  occurred_at timestamptz not null default now(),
  actor_id uuid,
  actor_type text not null check (actor_type in ('user', 'system', 'integration')),
  subject_type text not null,
  subject_id uuid not null,
  matter_id uuid,
  engagement_id uuid,
  correlation_id uuid not null,
  causation_id uuid,
  source text not null check (source in ('public', 'internal', 'client', 'neutral', 'worker', 'migration')),
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists domain_events_subject_idx
  on public.domain_events (subject_type, subject_id, occurred_at desc);
create index if not exists domain_events_matter_idx
  on public.domain_events (matter_id, occurred_at desc) where matter_id is not null;
create index if not exists domain_events_correlation_idx
  on public.domain_events (correlation_id, occurred_at);

create table if not exists public.audit_ledger (
  id uuid primary key default gen_random_uuid(),
  occurred_at timestamptz not null default now(),
  actor_id uuid,
  actor_type text not null check (actor_type in ('user', 'system', 'integration')),
  action text not null,
  subject_type text not null,
  subject_id uuid not null,
  matter_id uuid,
  engagement_id uuid,
  request_id uuid,
  ip_address_hash text,
  user_agent_hash text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists audit_ledger_subject_idx
  on public.audit_ledger (subject_type, subject_id, occurred_at desc);
create index if not exists audit_ledger_actor_idx
  on public.audit_ledger (actor_id, occurred_at desc) where actor_id is not null;

create table if not exists public.relationship_edges (
  id uuid primary key default gen_random_uuid(),
  source_type text not null,
  source_id uuid not null,
  relationship_type text not null,
  target_type text not null,
  target_id uuid not null,
  matter_id uuid,
  valid_from timestamptz not null default now(),
  valid_to timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  check (valid_to is null or valid_to >= valid_from),
  unique (source_type, source_id, relationship_type, target_type, target_id, valid_from)
);

create index if not exists relationship_edges_source_idx
  on public.relationship_edges (source_type, source_id, relationship_type);
create index if not exists relationship_edges_target_idx
  on public.relationship_edges (target_type, target_id, relationship_type);
create index if not exists relationship_edges_matter_idx
  on public.relationship_edges (matter_id) where matter_id is not null;

create table if not exists public.ai_assistance_records (
  id uuid primary key default gen_random_uuid(),
  capability text not null check (capability in ('summarize', 'classify', 'extract', 'compare', 'draft', 'recommend')),
  subject_type text not null,
  subject_id uuid not null,
  requested_by uuid not null,
  model_provider text not null,
  model_name text not null,
  prompt_version text not null,
  source_references jsonb not null default '[]'::jsonb,
  confidence numeric(5,4) check (confidence is null or (confidence >= 0 and confidence <= 1)),
  output jsonb not null,
  status text not null default 'generated' check (status in ('generated', 'reviewed', 'accepted', 'rejected')),
  reviewed_by uuid,
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  check (
    (status = 'generated' and reviewed_by is null and reviewed_at is null)
    or (status in ('reviewed', 'accepted', 'rejected') and reviewed_by is not null and reviewed_at is not null)
  )
);

create index if not exists ai_assistance_subject_idx
  on public.ai_assistance_records (subject_type, subject_id, created_at desc);

alter table public.domain_events enable row level security;
alter table public.audit_ledger enable row level security;
alter table public.relationship_edges enable row level security;
alter table public.ai_assistance_records enable row level security;

-- Append-only enforcement. Database owners can still perform controlled maintenance;
-- application roles must not receive update/delete grants or policies.
create or replace function public.prevent_immutable_record_change()
returns trigger
language plpgsql
as $$
begin
  raise exception 'immutable record: % cannot be updated or deleted', tg_table_name;
end;
$$;

drop trigger if exists domain_events_immutable on public.domain_events;
create trigger domain_events_immutable
before update or delete on public.domain_events
for each row execute function public.prevent_immutable_record_change();

drop trigger if exists audit_ledger_immutable on public.audit_ledger;
create trigger audit_ledger_immutable
before update or delete on public.audit_ledger
for each row execute function public.prevent_immutable_record_change();

comment on table public.domain_events is 'Durable business events for timelines, automation, reporting, and integrations.';
comment on table public.audit_ledger is 'Append-only security and operational audit ledger.';
comment on table public.relationship_edges is 'Typed relationship edges supporting knowledge-graph and relationship intelligence.';
comment on table public.ai_assistance_records is 'Human-reviewed AI assistance provenance; not an autonomous command store.';
