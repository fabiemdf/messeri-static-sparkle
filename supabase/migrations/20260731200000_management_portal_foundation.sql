-- Management portal foundation schema.
-- Phase 0 only: strategic configuration and initiative tracking.
-- Do not store client, claim, policy, document, or financial data until authentication,
-- authorization, audit, backup, and rollback gates are tested and accepted.

create extension if not exists pgcrypto;

create type public.practice_key as enum (
  'public-adjusting',
  'appraisal',
  'umpire',
  'expert-consulting'
);

create type public.initiative_status as enum (
  'planned',
  'active',
  'blocked',
  'complete'
);

create table public.practice_lines (
  id uuid primary key default gen_random_uuid(),
  practice_key public.practice_key not null unique,
  name text not null,
  positioning text not null,
  revenue_model text not null,
  demand_driver text not null,
  target_mix_percent numeric(5,2) not null check (target_mix_percent between 0 and 100),
  neutrality_risk text not null check (neutrality_risk in ('low', 'medium', 'high')),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.strategic_initiatives (
  id uuid primary key default gen_random_uuid(),
  initiative_key text not null unique,
  title text not null,
  pillar text not null,
  practice_key public.practice_key,
  is_cross_practice boolean not null default false,
  horizon text not null check (horizon in ('0-30 days', '31-60 days', '61-90 days', 'post-90 days')),
  owner_role text not null,
  status public.initiative_status not null default 'planned',
  success_metric text not null,
  compliance_note text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check ((practice_key is not null and is_cross_practice = false) or (practice_key is null and is_cross_practice = true))
);

create table public.operating_metrics (
  id uuid primary key default gen_random_uuid(),
  metric_key text not null unique,
  label text not null,
  description text,
  unit text,
  practice_key public.practice_key,
  is_firmwide boolean not null default true,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.phase_gates (
  id uuid primary key default gen_random_uuid(),
  phase_number integer not null unique check (phase_number >= 0),
  name text not null,
  status text not null check (status in ('not-started', 'in-progress', 'blocked', 'passed')),
  acceptance_summary text not null,
  passed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check ((status = 'passed' and passed_at is not null) or status <> 'passed')
);

alter table public.practice_lines enable row level security;
alter table public.strategic_initiatives enable row level security;
alter table public.operating_metrics enable row level security;
alter table public.phase_gates enable row level security;

-- Deliberately no access policies in Phase 0. With RLS enabled, anon and authenticated
-- clients are denied by default. Server-side service-role access must only be configured
-- after environment separation and secret-management tests pass.

comment on table public.practice_lines is 'Distinct Messeri practice lines used for positioning and revenue-mix reporting.';
comment on table public.strategic_initiatives is 'Phased strategic initiatives; contains no client or claim information.';
comment on table public.phase_gates is 'Formal implementation gates. Later phases must not be marked active until the preceding gate is passed.';
