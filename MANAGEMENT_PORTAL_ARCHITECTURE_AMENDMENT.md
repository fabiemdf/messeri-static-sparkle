# Messeri & Associates Management Portal

## Architecture and Implementation Amendment

This amendment is a binding addition to `MANAGEMENT_PORTAL_IMPLEMENTATION_GUIDE.md`.

Where this amendment conflicts with the earlier guide, this amendment controls. The same mandatory phase-gate rule applies: **each phase must be fully implemented, tested, documented, and accepted before the next phase begins.**

---

# 1. System Boundaries

The public website, internal operations portal, future client portal, and neutral-practice presence must be treated as separate application surfaces.

## Required structure

- Public website: marketing, services, location pages, articles, referral landing pages, French-language pages, and CAT landing pages.
- `/portal`: authenticated internal operations portal.
- `/client`: future authenticated client portal.
- Neutral practice section or microsite: umpire, neutral appraisal, and expert-facing information with distinct tone, visuals, disclosures, CV, terms, and scheduling.

The systems may share approved data and infrastructure, but must not share access rules, private content, or public messaging indiscriminately.

## Required tests

- Anonymous users cannot reach internal or client records.
- Search engines cannot index internal or client routes.
- Public-site deployments do not expose portal bundles, secrets, or API responses containing private data.
- Portal releases do not alter public-site routes, SEO metadata, English pages, or French pages.
- Neutral-practice content does not inherit advocacy language automatically.

---

# 2. Core Domain Model: Matter and Engagement

A claim must not be the universal top-level record. The system must support all four business lines without forcing every assignment into a public-adjusting workflow.

## Required hierarchy

```text
Organization / Contact
        ↓
Matter or Claim
        ↓
One or more Engagements
        ↓
Tasks, documents, communications, deadlines, billing, and activity
```

## Matter

A matter is the broader dispute, loss, assignment, consultation, or professional-services file.

Recommended fields:

- Matter number
- Matter name
- Matter type
- Primary contacts
- Organizations
- Property or loss location
- Carrier
- Policy number, when applicable
- Claim number, when applicable
- Date of loss, when applicable
- Jurisdiction
- Venue
- Status
- Confidentiality classification
- Responsible manager
- Opened date
- Closed date

## Engagement

Each matter may contain one or more engagements.

Initial engagement types:

- Public adjusting
- Insured-side appraisal
- Neutral umpire
- Expert witness
- Technical consulting
- Attorney claim-file desk review
- Association or commercial advisory

Recommended engagement fields:

- Practice line
- Engagement role
- Client
- Retaining party
- Adverse parties
- Billing model
- Rate or fee schedule version
- Retainer requirements
- Scope
- Start date
- Expected completion date
- Engagement status
- Assigned professionals
- Conflict status
- Neutrality disclosure status
- Non-circumvention status, where applicable

## Required tests

- One matter can contain multiple engagements.
- A public-adjusting engagement can coexist with a later appraisal engagement without overwriting the original scope or financial history.
- Umpire and expert engagements do not require PA-specific fields.
- Closing one engagement does not automatically close the entire matter.
- Permissions can differ by engagement.
- Reporting can aggregate by matter, engagement, practice line, and client.

---

# 3. Brand and Neutrality Controls

The portal must actively manage the conflict between advocacy work and neutral work.

## Required fields and workflows

- Practice line
- Engagement role
- Carrier
- Counsel
- Appraisers
- Umpires
- Experts
- Adverse parties
- Prior assignments
- Conflict result
- Conflict reviewer
- Conflict review date
- Neutrality disclosure status
- Required recusal or waiver status

Before an appraisal, umpire, or expert engagement is accepted, the portal must require a completed conflict review.

## Content controls

Public umpire and neutral-practice content must not automatically reuse phrases such as:

- We fight the insurance company
- Maximum recovery
- Carrier misconduct
- Aggressive representation
- Results guaranteed

Neutral-facing materials should emphasize process, consistency, disclosure, timeliness, methodology, and fairness.

## Required tests

- Engagement acceptance is blocked when conflict review is incomplete.
- Conflict results are immutable except through a documented override.
- Advocacy content cannot be published to neutral-practice pages without a neutrality review.
- Users without authority cannot clear conflicts or approve disclosures.
- Conflict searches include archived matters and prior engagements.

---

# 4. Fee Schedule and Billing Governance

Do not hard-code a single public umpire or expert fee schedule.

## Required capabilities

- Configurable fee schedules
- Effective dates
- Retired dates
- Practice-line assignment
- Engagement-specific rate overrides
- Historical version preservation
- Public visibility setting
- Internal-only rate setting
- Approval history

Separate rate categories may include:

- Umpire hourly work
- Appraisal flat fee
- Appraisal capped hourly fee
- Expert file review
- Deposition
- Hearing or trial testimony
- Travel time
- Travel expenses
- Administrative time
- Cancellation fees
- Retainers

Existing engagements must continue using the fee schedule version accepted at engagement creation unless an authorized written amendment is recorded.

---

# 5. Referral Partner Management

Referral partners must be managed as a distinct relationship channel.

## Partner types

- Roofing contractor
- Water mitigation company
- Restoration company
- Mold assessor
- Plumber
- General contractor
- Property manager
- Community association manager
- Insurance agent
- Attorney
- Public adjuster
- Engineer
- Realtor
- Canadian or snowbird service provider
- Other professional partner

## Required fields

- Organization and contact
- Territory
- Languages
- Practice lines supported
- Referrals sent
- Referrals received
- Converted engagements
- Conversion rate
- Last contact
- Next follow-up
- Lunch-and-learn history
- Compliance materials delivered
- UPPA acknowledgment
- Notes

The portal must not normalize, encourage, or conceal prohibited referral compensation. Relationship value should be tracked through education, service, reciprocal professional referrals, responsiveness, and permitted marketing collaboration.

## Required tests

- Referral attribution survives lead conversion.
- Duplicate partners can be merged without losing activity.
- Compliance acknowledgments are versioned.
- Reports do not misclassify educational activity as compensation.
- Restricted notes remain internal.

---

# 6. Marketing Attribution

Lead source alone is insufficient. Attribution must be preserved through the complete lifecycle.

## Required attribution fields

- First-touch source
- Last-touch source
- Referral partner
- Campaign
- Ad group
- Landing page
- Practice line
- Geography
- Language
- Named storm or event
- Intake channel
- Cost per lead
- Cost per signed engagement
- Revenue by source

Attribution history must not be silently overwritten when a lead converts into a matter or engagement.

## Required reports

- Leads by source and practice line
- Engagements by source and practice line
- Cost per signed engagement
- Revenue by source
- Revenue by language
- Revenue by geography
- Referral partner conversion
- Neutral-practice sources versus advocacy-practice sources

---

# 7. CAT Operating Mode

CAT readiness must be implemented as a distinct operating mode, not as scattered tags.

## CAT event record

- Event name
- Storm name
- Event type
- Dates
- Geographic service areas
- Counties
- FEMA or NOAA reference data
- Active intake window
- Staffing capacity
- Inspection capacity
- Advertising status
- Solicitation-material version
- Shutdown or transition date

## CAT operating capabilities

- Surge intake form
- Trained intake script
- Priority triage rules
- Temporary user roles
- Assignment queues
- Inspection routing
- Daily capacity limits
- Storm-specific task templates
- Storm-specific landing pages
- Duplicate-loss detection
- Prior-claim identification
- Prior-damage review
- Daily bottleneck dashboard

## Required tests

- The system distinguishes multiple losses at the same property.
- Prior claims are visible to authorized reviewers.
- Temporary permissions expire automatically.
- Daily assignment limits cannot be exceeded without override.
- Mobile inspection workflows function under weak connectivity.
- CAT mode can be closed without losing records or deadlines.

---

# 8. Revenue Forecasting and Capacity Planning

The portal must measure and forecast the deliberate shift from storm-dependent PA revenue toward appraisal, umpire, and expert revenue.

## Engagement forecast fields

- Expected gross revenue
- Probability
- Billing model
- Expected start date
- Expected completion date
- Expected payment date
- Estimated professional hours
- Assigned capacity
- Actual hours
- Revenue recognized
- Revenue invoiced
- Revenue collected
- Collection status

## Required management views

- Current revenue mix
- Target revenue mix
- Pipeline revenue mix
- Forecast by month and quarter
- Capacity by professional
- Seasonal exposure
- Concentration by carrier
- Concentration by attorney
- Concentration by referral partner
- Concentration by geography
- Concentration by practice line

Calculations must distinguish forecast, earned, invoiced, and collected revenue.

---

# 9. Professional-Services Time and Billing

Umpire, appraisal, expert, and consulting work require time-and-billing support separate from PA settlement tracking.

## Required capabilities

- Time entries
- Expense entries
- Activity codes
- Retainers and deposits
- Retainer balances
- Invoice milestones
- Draft invoices
- Approved invoices
- Payment records
- Aging balances
- Deposition dates
- Hearing dates
- Trial dates
- Cancellation terms
- Travel billing

## Required tests

- Time cannot be billed twice.
- Rate versions are applied correctly.
- Retainer balances reconcile.
- Adjustments require authorization and audit records.
- Closed invoices cannot be altered without a documented reversal or credit.
- PA contingency or percentage fees are not calculated using hourly billing rules.

---

# 10. Document Template Governance

The template library must be governed, versioned, and searchable.

## Required metadata

- Template name
- Practice line
- Document type
- Jurisdiction
- Venue
- Language
- Advocacy or neutral classification
- Version
- Effective date
- Retired date
- Approved by
- Approval date
- Required fields
- Usage restrictions

## Template types

- Letters of representation
- Engagement agreements
- Appraisal agreements
- Umpire agreements
- Neutrality disclosures
- Fee letters
- Position papers
- Demands
- Proof-of-loss forms
- Inspection notices
- Attorney desk-review reports
- CAT intake scripts
- Solicitation materials
- English and French communications

A retired template must remain attached to historical documents generated from it.

---

# 11. Public Content Compliance Workflow

Public content must pass a controlled approval workflow.

## Required states

- Draft
- Technical review
- Compliance review
- Neutrality review
- Translation review
- Approved
- Published
- Archived

## Mandatory review triggers

- Guarantees
- Recovery amounts
- Carrier-conduct allegations
- Legal conclusions
- Solicitation language
- Referral relationships
- Neutrality claims
- Credentials
- Venue experience
- Fee disclosures
- Testimonials

The publishing system must record who approved each version and when.

---

# 12. Communications Integration Order

Communications must be introduced in the following order:

1. Internal communication log
2. Permission-controlled matter association
3. Email ingestion and association
4. Outbound templates
5. SMS
6. WhatsApp
7. Recorded phone calls

No omnichannel integration may precede stable permissions, retention rules, consent rules, audit logging, duplicate detection, and matter association.

---

# 13. Revised Implementation Phases

The original phase sequence is replaced by the following sequence.

## Phase 0 — Foundation

- Environment separation
- Authentication
- Database foundation
- Row-level security
- Audit logging
- Test infrastructure
- Deployment and rollback
- Public-site regression protection
- Search-engine exclusion for private routes

## Phase 1 — Core Matter Model

- Contacts
- Organizations
- Matters
- Claims
- Engagements
- Practice lines
- Conflict checks
- Tasks
- Notes
- Documents
- Activity timeline
- Basic calendar

## Phase 2 — Growth and Intake

- Leads
- Referral partners
- Website submissions
- Campaign attribution
- Past-client reactivation
- Review-generation workflow
- French-language intake
- Attorney outreach lists
- PA outreach lists
- Carrier-side and defense-side outreach lists
- CAT intake mode

## Phase 3 — Practice-Specific Workflows

- Public adjusting workflow
- Appraisal workflow
- Umpire workflow
- Expert and consulting workflow
- Attorney desk-review workflow
- Inspection management
- Position-paper workflow
- Practice-specific templates
- Neutrality and conflict gates

## Phase 4 — Financial and Management Controls

- Estimate and settlement tracking
- Time entries
- Expenses
- Retainers
- Invoices
- Payment records
- Revenue forecasting
- Capacity planning
- Revenue-mix reporting
- Concentration reporting

## Phase 5 — Client and Partner Portals

- Client authentication
- Client uploads
- Status updates
- Requests
- Secure messages
- Partner referral portal
- Attorney referral portal
- Secure document exchange

## Phase 6 — Communications and Integrations

- Gmail
- Google Calendar
- SMS
- WhatsApp
- Phone system
- Recorded calls
- DocuSign
- Accounting platform
- Estimating tools

## Phase 7 — CMS and Public-Site Expansion

- Neutral-practice section or microsite
- Umpire page
- Configurable fee information
- Location pages
- French content
- Case studies
- CAT landing pages
- Publishing workflow
- Compliance and neutrality review

**No phase may begin until the prior phase has fully passed its acceptance gate.**

---

# 14. Business-Line Go/No-Go Gates

## Referral program launch gate

- At least 25 qualified partners are loaded.
- Follow-up cadence is configured.
- Compliance language is approved.
- Referral attribution is tested.
- UPPA educational materials are versioned.
- No prohibited compensation field or workflow exists.

## Umpire practice launch gate

- Separate positioning is approved.
- Neutral CV is approved.
- Conflict workflow passes testing.
- Standard agreement is approved.
- Disclosure form is approved.
- Scheduling process is tested.
- Fee schedule visibility is approved.

## CAT mode launch gate

- Intake script is approved.
- Surge staffing is assigned.
- Daily capacity limits are configured.
- Duplicate detection is tested.
- Prior-claim checks are tested.
- Mobile inspection workflow is tested.
- Disaster recovery and rollback are verified.

## Expert practice launch gate

- CV and credentials are approved.
- Rate schedule is approved.
- Retainer workflow is tested.
- Time and expense billing is tested.
- Conflict review is tested.
- Testimony and deposition scheduling is tested.
- File-retention rules are approved.

---

# 15. Immediate Effect on Current Development

The existing strategy foundation may remain as a non-sensitive Phase 0 demonstration, but it must not be treated as a completed portal foundation until the following are implemented and tested:

- Authentication
- Server-side authorization
- Environment separation
- Audit logging
- Database migration validation
- Rollback validation
- Automated tests
- Public-route regression tests
- Private-route indexing protection
- Row-level security verification

The next production-facing data model must use `matters` and `engagements` as first-class entities. A claims-only schema must not become the permanent architectural center of the system.

---

# 16. Amendment Acceptance Checklist

- [ ] System boundaries approved
- [ ] Matter and engagement hierarchy approved
- [ ] Conflict and neutrality workflow approved
- [ ] Fee schedule governance approved
- [ ] Referral partner model approved
- [ ] Attribution model approved
- [ ] CAT mode approved
- [ ] Revenue forecasting model approved
- [ ] Time-and-billing model approved
- [ ] Template governance approved
- [ ] Public content workflow approved
- [ ] Revised phase sequence approved
- [ ] Business-line launch gates approved
- [ ] Existing implementation guide references this amendment during all future planning and review
