# Messeri & Associates Management Portal

## Guided Implementation Instructions

This document defines the required implementation sequence for the Messeri & Associates management portal.

The portal must be built in controlled phases. **Each phase must be fully implemented, reviewed, tested, documented, and formally accepted before work begins on the next phase.** No phase may be treated as complete merely because the interface appears finished.

---

## 1. Core Delivery Rules

### 1.1 Mandatory phase gate

Before proceeding from one phase to the next, all of the following must be true:

- All planned features for the current phase are complete.
- All automated tests pass.
- All manual test cases pass.
- No unresolved critical or high-severity defects remain.
- Security checks for the phase pass.
- Permissions have been tested for every applicable role.
- Data integrity has been verified.
- Mobile and desktop behavior has been reviewed.
- Error handling has been tested.
- Logging and audit behavior have been confirmed.
- Deployment and rollback procedures have been tested.
- The phase acceptance checklist has been signed off.

If any required test fails, implementation must return to the development stage. The failed item must be corrected and the complete affected test suite must be rerun.

### 1.2 Never test only the happy path

Every module must be tested for:

- Valid input
- Invalid input
- Missing input
- Duplicate input
- Unauthorized access
- Expired sessions
- Network failure
- Database failure
- File upload failure
- Large data volumes
- Mobile layout
- Browser refresh
- Back-button navigation
- Concurrent edits
- Recovery after interruption

### 1.3 Preserve the existing public website

The management portal must not disrupt the current public website, routes, search-engine indexing, English pages, French pages, contact pages, service pages, claims pages, blog pages, or location pages.

Before every production deployment, confirm that the existing public site still builds and that its critical routes return the expected content.

### 1.4 Use separate environments

Maintain separate environments for:

1. Local development
2. Testing or staging
3. Production

Never test unfinished portal work directly in production.

### 1.5 Protect confidential claim information

The portal will contain insurance claim, contact, financial, inspection, communication, and document information. Access must follow least-privilege principles.

Internal notes, settlement strategy, financial calculations, privileged material, and staff-only communications must never be exposed to client users.

---

# Phase 0 — Foundation, Architecture, and Test Infrastructure

## Objective

Create the technical foundation required to develop and test the portal safely without affecting the existing public website.

## Required work

### Repository and development standards

- Confirm the current TanStack Start and React project structure.
- Document all existing public routes.
- Document all current build, lint, formatting, and SEO validation commands.
- Establish branch and pull-request conventions.
- Establish code-review requirements.
- Establish naming conventions for routes, components, database tables, server functions, and test files.
- Add environment-variable documentation.
- Ensure secrets are excluded from Git.

### Environment setup

- Configure local development.
- Configure a dedicated staging environment.
- Configure production separately.
- Use separate databases and storage buckets for staging and production.
- Create a safe process for database migrations.
- Create a rollback process for failed migrations.

### Recommended platform foundation

- PostgreSQL database
- Supabase authentication
- Supabase storage
- Row-level security
- TanStack server functions or equivalent controlled server endpoints
- Structured error logging
- Automated test runner
- End-to-end browser testing

### Test framework

Implement testing support for:

- Unit tests
- Component tests
- Integration tests
- Database tests
- Authentication tests
- Authorization tests
- End-to-end tests
- Accessibility tests
- Build and deployment smoke tests

Recommended tooling may include Vitest, React Testing Library, Playwright, and automated accessibility checks.

## Phase 0 test requirements

### Build verification

- Run the production build.
- Run linting.
- Run formatting verification.
- Run SEO validation.
- Confirm there are no TypeScript errors.
- Confirm all existing public routes still work.

### Environment verification

- Confirm local environment uses local or test credentials.
- Confirm staging cannot access production data.
- Confirm production secrets are unavailable to local builds.
- Confirm environment variables fail safely when missing.

### Database verification

- Apply migrations to an empty test database.
- Roll migrations back where supported.
- Reapply migrations.
- Confirm seed data loads correctly.
- Confirm production data is not included in test fixtures.

### Security verification

- Confirm secrets are absent from the repository.
- Confirm storage is private by default.
- Confirm database tables deny unauthorized access by default.
- Confirm the portal route cannot be accessed anonymously.

## Phase 0 acceptance criteria

- The current website builds without regression.
- Staging is operational.
- Test infrastructure runs consistently.
- Database migrations are repeatable.
- Authentication foundation is operational.
- Unauthorized users cannot enter the portal.
- A rollback procedure has been tested.

**Do not begin Phase 1 until all Phase 0 acceptance criteria pass.**

---

# Phase 1 — Secure Internal Portal MVP

## Objective

Create the first usable internal operations portal for authorized Messeri & Associates staff.

## Included modules

1. Authentication
2. User roles
3. Dashboard
4. Leads
5. Contacts
6. Claims
7. Tasks
8. Notes
9. Documents
10. Activity timeline
11. Basic calendar
12. Audit logs

---

## 1. Authentication

### Required features

- Secure login
- Logout
- Password reset
- Session expiration
- Optional multifactor authentication preparation
- Account disablement
- Failed-login protection
- User invitation process

### Required tests

- Valid login succeeds.
- Invalid password fails.
- Unknown account fails without exposing whether the account exists.
- Disabled account cannot log in.
- Logged-out users cannot access portal routes.
- Expired sessions redirect to login.
- Password-reset links expire.
- Reused password-reset links fail.
- Logout invalidates the session.
- Browser refresh preserves a valid session.
- Direct navigation to protected routes is blocked when unauthorized.

---

## 2. User roles and permissions

### Initial roles

- Administrator
- Manager
- Adjuster
- Intake Staff
- Estimator or Contractor

Client access is not included in Phase 1.

### Required tests

For each role, verify:

- Which pages are visible
- Which records can be viewed
- Which records can be created
- Which records can be edited
- Which records can be deleted or archived
- Which financial fields are visible
- Which documents are accessible
- Which notes are accessible
- Which administrative settings are accessible

Permission enforcement must be tested at both the interface and server levels. Hiding a button is not sufficient.

---

## 3. Dashboard

### Required features

- New leads
- Active claims
- Claims requiring follow-up
- Upcoming inspections or events
- Overdue tasks
- Missing-document alerts
- Recent activity
- Quick-create actions

### Required tests

- Dashboard totals match database records.
- Filters are correct.
- Role-restricted information remains hidden.
- Empty states display correctly.
- Large record counts do not break the interface.
- Dashboard links open the correct filtered records.
- Date-based figures respect the configured timezone.

---

## 4. Leads

### Required fields

- Name
- Phone
- Email
- Preferred language
- Property address
- Claim type
- Carrier
- Date of loss
- Description
- Lead source
- Referral source
- Assigned user
- Follow-up date
- Status

### Lead statuses

- New
- Attempted contact
- Consultation scheduled
- Information requested
- Qualified
- Agreement sent
- Retained
- Referred out
- Declined
- Unresponsive

### Required tests

- Create, view, edit, search, filter, archive, and restore leads.
- Validate email, phone, and date fields.
- Reject impossible dates where appropriate.
- Detect or warn about likely duplicates.
- Preserve a complete status history.
- Confirm assignment changes are logged.
- Confirm unauthorized roles cannot access restricted leads.
- Confirm conversion from lead to claim does not lose data.

---

## 5. Contacts and organizations

### Contact types

- Policyholder
- Insurance carrier representative
- Carrier adjuster
- Attorney
- Public adjuster
- Appraiser
- Umpire
- Contractor
- Engineer
- Restoration company
- Mortgage company
- Insurance agent
- Other

### Required tests

- Create individual contacts.
- Create organizations.
- Associate multiple contacts with an organization.
- Associate contacts with multiple claims.
- Search by name, phone, email, company, and claim.
- Merge duplicates safely.
- Confirm merging does not lose linked records.
- Confirm archived contacts remain available in historical claim records.

---

## 6. Claims

### Required claim fields

- Claim number
- Insured or client
- Property address
- Insurance carrier
- Policy number
- Date of loss
- Loss type
- Claim status
- Assigned adjuster
- Carrier adjuster
- Associated professionals
- Coverage information
- Deductible
- Important deadlines
- Financial figures
- Internal notes
- Documents
- Communications
- Tasks
- Inspection history

### Claim statuses

- New inquiry
- Intake pending
- Documents requested
- Under review
- Inspection scheduled
- Estimate in progress
- Estimate completed
- Submitted to carrier
- Negotiation
- Appraisal
- Litigation
- Settled
- Closed
- Declined

### Required tests

- Create, edit, search, filter, archive, and restore claims.
- Confirm required fields are enforced.
- Confirm duplicate claim numbers are handled correctly.
- Confirm one policyholder can have multiple claims.
- Confirm one property can have multiple losses.
- Confirm status history is immutable.
- Confirm claim reassignment is logged.
- Confirm closed claims remain readable.
- Confirm restricted financial fields obey permissions.
- Confirm concurrent edits do not silently overwrite newer data.

---

## 7. Tasks

### Required features

- Task title
- Description
- Owner
- Due date
- Priority
- Status
- Related claim, lead, or contact
- Reminder
- Completion notes

### Required tests

- Create one-time tasks.
- Reassign tasks.
- Complete and reopen tasks.
- Confirm overdue calculations.
- Confirm date and timezone behavior.
- Confirm deleted or archived related records do not orphan tasks.
- Confirm users cannot modify tasks outside their permissions.
- Confirm task changes appear in the activity timeline.

---

## 8. Notes

### Required note types

- Internal note
- Claim note
- Lead note
- Contact note
- Inspection note

### Required tests

- Create and edit notes according to policy.
- Preserve edit history.
- Confirm author and timestamp cannot be falsified by the client.
- Confirm private notes are not exposed through public responses or APIs.
- Confirm note search respects permissions.

---

## 9. Documents

### Required features

- Drag-and-drop upload
- Claim-specific association
- Document categories
- Descriptions
- Upload date
- Uploaded-by identity
- Private storage
- File download
- File preview where safe
- Version support
- Archive capability

### Document categories

- Policy
- Claim correspondence
- Estimate
- Photographs
- Videos
- Proof of loss
- Engineering
- Mold or environmental report
- Invoice
- Repair documentation
- Contract
- Appraisal document
- Settlement document
- Miscellaneous

### Required tests

- Upload permitted file types.
- Reject prohibited file types.
- Enforce maximum file size.
- Handle interrupted uploads.
- Handle duplicate filenames.
- Confirm files are private.
- Confirm unauthorized users cannot retrieve files by direct URL.
- Confirm archived documents remain in audit history.
- Confirm replacing a document creates a new version rather than silently overwriting it.
- Scan or safely handle potentially malicious uploads.

---

## 10. Activity timeline

### Required events

- Record created
- Status changed
- Assignment changed
- Task created or completed
- Note added
- Document uploaded
- Deadline changed
- Important field changed

### Required tests

- Timeline order is correct.
- Timestamps use the correct timezone.
- Events cannot be edited by ordinary users.
- Events identify the responsible user.
- Sensitive events respect permissions.
- High-volume timelines remain usable.

---

## 11. Basic calendar

### Required features

- Task due dates
- Follow-up dates
- Inspections
- Internal events
- Day, week, and month views

### Required tests

- Create, move, edit, and cancel calendar events.
- Confirm timezone consistency.
- Confirm linked claim information is correct.
- Confirm users only see permitted events.
- Confirm duplicate event creation is prevented where appropriate.

---

## 12. Audit logs

### Required audit events

- Login
- Failed login
- Record creation
- Record update
- Record archive
- Permission change
- File access
- File upload
- User invitation
- User disablement

### Required tests

- Audit entries identify the user, action, time, and affected record.
- Audit logs cannot be modified by ordinary users.
- Sensitive values such as passwords and tokens are never logged.
- Filtering and export behave correctly.

---

## Phase 1 full-system testing

Before acceptance, run complete workflows such as:

1. Create a lead.
2. Schedule follow-up.
3. Convert the lead into a claim.
4. Associate a policyholder and carrier.
5. Assign an adjuster.
6. Upload documents.
7. Create tasks.
8. Add internal notes.
9. Change claim status.
10. Confirm every action appears correctly in the activity and audit logs.

Repeat the workflow under every applicable role.

## Phase 1 acceptance criteria

- Internal users can securely manage leads, contacts, claims, tasks, notes, documents, and calendar items.
- Permissions are enforced server-side.
- Activity and audit trails are complete.
- No critical or high-severity defects remain.
- Public website functionality remains unchanged.
- Backup and restoration have been tested.
- Staging approval has been documented.

**Do not begin Phase 2 until all Phase 1 acceptance criteria pass.**

---

# Phase 2 — Workflow Automation and Operational Controls

## Objective

Reduce manual work, standardize claim handling, and improve management visibility.

## Included features

- Website form integration
- Automated notifications
- Deadline reminders
- Task templates
- Inspection workflows
- Estimate tracking
- Settlement tracking
- Reporting
- CSV import and export

---

## Website form integration

### Required behavior

- Convert public contact submissions into structured leads.
- Capture source page, campaign, referral information, language, and timestamp.
- Prevent spam.
- Detect duplicate submissions.
- Notify assigned intake staff.
- Preserve the original submission.

### Required tests

- English form submission
- French form submission
- Missing required fields
- Invalid data
- Duplicate submission
- Spam attempt
- Notification failure
- Database failure
- Successful retry without duplicate creation
- Correct attribution data

---

## Notifications and reminders

### Required features

- New lead notification
- Assignment notification
- Upcoming deadline reminder
- Overdue task reminder
- Inspection reminder
- Missing-document reminder

### Required tests

- Correct recipient
- Correct claim or lead reference
- No disclosure to unauthorized recipients
- Duplicate notifications are prevented
- Failed sends are logged and retry safely
- Users can manage permitted notification preferences
- Time-based reminders trigger in the correct timezone

---

## Task templates

### Examples

- New claim intake
- Inspection preparation
- Estimate preparation
- Appraisal setup
- Settlement follow-up
- Missing-document request

### Required tests

- Template creates all expected tasks.
- Relative due dates calculate correctly.
- Role assignment works.
- Reapplying a template does not unintentionally duplicate tasks.
- Template revisions do not alter previously created task records.

---

## Inspection workflow

### Required features

- Schedule inspection
- Assign inspector
- Record property address
- Record access and lockbox instructions
- Record attendees
- Use an inspection checklist
- Upload photos and notes
- Generate follow-up tasks

### Required tests

- Complete inspection lifecycle
- Rescheduling
- Cancellation
- Access-instruction permissions
- Photo upload from mobile device
- Interrupted mobile upload
- Offline or weak-network behavior
- Follow-up task generation
- Calendar synchronization preparation

---

## Estimate and settlement tracking

### Required fields

- Carrier estimate
- Messeri estimate
- Supplemental estimate
- Appraisal demand
- Deductible
- Prior payments
- Recoverable depreciation
- Settlement amount
- Outstanding amount
- Fee percentage
- Fee received
- Balance due

### Required tests

- Currency calculations
- Decimal precision
- Negative values blocked where inappropriate
- Prior payments correctly reduce outstanding amounts
- Permission restrictions
- Complete change history
- Export accuracy
- Closed-claim calculations remain stable

---

## Reporting

### Initial reports

- Leads by source
- Lead conversion rate
- Claims by status
- Claims by carrier
- Claims by adjuster
- Overdue tasks
- Upcoming deadlines
- Estimate-to-settlement comparison
- Outstanding fees

### Required tests

- Report totals match source records.
- Filters work correctly.
- Date ranges are inclusive and documented.
- Archived records are handled consistently.
- Role permissions apply to reports.
- Exported reports match on-screen totals.
- Large datasets complete within acceptable performance limits.

---

## CSV import and export

### Required tests

- Valid import
- Invalid headers
- Missing required columns
- Duplicate records
- Invalid dates
- Invalid currency values
- Partial import failure
- Rollback behavior
- Large-file import
- Export permission restrictions
- Formula-injection protection

---

## Phase 2 acceptance criteria

- Website submissions reliably create leads.
- Notifications and reminders are accurate and safe.
- Task templates create predictable workflows.
- Inspection workflows work on desktop and mobile.
- Financial tracking calculations are verified.
- Reports reconcile to database records.
- Import and export operations preserve data integrity.
- No critical or high-severity defects remain.

**Do not begin Phase 3 until all Phase 2 acceptance criteria pass.**

---

# Phase 3 — Secure Client Portal

## Objective

Allow clients to access carefully selected claim information without exposing internal records.

## Included features

- Client account invitation
- Secure client login
- Client dashboard
- Approved claim status
- Upcoming appointments
- Secure document upload
- Office requests
- Client messaging
- Approved milestone history
- Electronic-signature integration preparation

## Data separation requirement

Create a formal visibility model. Each field, note, file, message, task, and activity entry must be classified as one of the following:

- Internal only
- Client visible
- Client uploaded
- Shared with selected external party

Internal information must remain private by default.

## Required tests

### Account security

- Client can access only their own claim.
- Client cannot alter the URL to view another claim.
- Client cannot query another client's documents.
- Expired invitations fail.
- Disabled client accounts fail.
- Password reset works securely.
- Session expiration works.

### Information visibility

- Internal notes remain hidden.
- Financial strategy remains hidden unless explicitly shared.
- Staff-only communications remain hidden.
- Only approved files are visible.
- Only approved milestones are visible.
- Audit logs record client access and uploads.

### Upload and messaging

- Client uploads are stored privately.
- Staff receives notification.
- Prohibited files are rejected.
- Large uploads fail gracefully.
- Messages remain connected to the correct claim.
- Internal replies are not accidentally exposed.

### Usability

- Mobile login and upload work.
- Clear empty states appear.
- Plain-language errors appear.
- English and French behavior is consistent where offered.
- Accessibility checks pass.

## Phase 3 acceptance criteria

- Cross-client data access is impossible under tested scenarios.
- Internal records remain private by default.
- Client uploads and messages are reliable.
- Staff can control what is shared.
- Client access is fully audited.
- No critical or high-severity defects remain.
- Security review is formally approved.

**Do not begin Phase 4 until all Phase 3 acceptance criteria pass.**

---

# Phase 4 — External Integrations

## Objective

Connect the portal to external communication, scheduling, signature, accounting, and storage services.

## Candidate integrations

- Gmail
- Google Calendar
- SMS provider
- WhatsApp provider
- Cloud phone system
- DocuSign or equivalent
- QuickBooks
- Cloud storage
- Advertising and lead-source platforms

Integrations must be introduced one at a time. Each integration is treated as its own mini-phase and must pass testing before the next integration is started.

## Integration requirements

For every integration:

- Document the business purpose.
- Document the data exchanged.
- Use minimum required permissions.
- Encrypt credentials.
- Implement token refresh.
- Implement disconnect and reauthorization handling.
- Implement retry logic.
- Prevent duplicate records.
- Log failures without logging secrets.
- Provide an administrative status screen.
- Define behavior during vendor outages.

## Required tests for every integration

- Initial connection
- Reauthorization
- Revoked access
- Expired token
- Vendor timeout
- Vendor error
- Rate limiting
- Duplicate event or message
- Partial synchronization
- Retry behavior
- Disconnect behavior
- Permission reduction
- Audit logging
- Data deletion or retention behavior

## Email-specific tests

- Associate messages with the correct claim.
- Avoid creating duplicate messages during synchronization.
- Preserve sender, recipients, date, subject, and attachments.
- Prevent unauthorized users from reading restricted mail.
- Confirm outbound email uses the intended sender.

## Calendar-specific tests

- Create, update, and cancel events.
- Prevent duplicate events.
- Handle timezone changes.
- Handle external edits.
- Resolve synchronization conflicts safely.

## Phase 4 acceptance criteria

- Each integration has its own completed test report.
- Permissions are limited to business needs.
- Outages do not corrupt portal data.
- Duplicate synchronization is prevented.
- Disconnect and reauthorization procedures work.
- No critical or high-severity defects remain.

**Do not begin Phase 5 until all selected Phase 4 integrations pass.**

---

# Phase 5 — Multilingual Website Content Management

## Objective

Replace manual duplication of static public HTML content with structured management tools while preserving current URLs, content, and search-engine performance.

## Included content types

- Blog articles
- Service pages
- Professional service pages
- Claims information pages
- Location pages
- Frequently asked questions
- Testimonials
- Team profiles
- Contact information
- English versions
- French versions
- SEO titles
- Meta descriptions
- Canonical URLs
- Alternate-language links
- Structured data
- Draft, review, scheduled, and published states

## Migration requirements

- Inventory all current public pages.
- Preserve existing URLs.
- Preserve titles and descriptions unless intentionally revised.
- Preserve canonical tags.
- Preserve English and French alternate links.
- Preserve structured data.
- Preserve image paths or create controlled redirects.
- Record migration status for every page.
- Maintain rollback copies of original content.

## Required tests

### Content workflow

- Create draft.
- Preview draft.
- Review draft.
- Publish draft.
- Schedule publication.
- Unpublish safely.
- Restore a prior revision.
- Create English and French variants.
- Detect missing translations.

### SEO regression

- Existing URLs return successful responses.
- Canonical URLs are correct.
- Alternate-language links are reciprocal.
- Titles and descriptions render correctly.
- Structured data remains valid.
- Sitemap includes correct pages.
- Robots directives remain correct.
- Redirects work without chains.
- No unintended duplicate pages are created.

### Visual regression

- Compare migrated pages to existing pages.
- Test desktop, tablet, and mobile widths.
- Confirm forms, navigation, images, and calls to action.
- Confirm French text does not break layouts.

## Phase 5 acceptance criteria

- Every migrated page has passed content, SEO, visual, and functional review.
- Existing indexed URLs are preserved or intentionally redirected.
- English and French content relationships are correct.
- Editors can safely draft, review, publish, and restore content.
- Public contact submissions still enter the lead workflow.
- No critical or high-severity defects remain.

---

# Final Production Readiness Review

Before declaring the complete portal production-ready, verify all of the following.

## Functional readiness

- All approved workflows pass end to end.
- All role permissions pass.
- All calculations reconcile.
- All integrations pass.
- All public routes pass.

## Security readiness

- Authentication review complete.
- Authorization review complete.
- Row-level security review complete.
- File-access review complete.
- Client-isolation review complete.
- Secret-management review complete.
- Audit-log review complete.
- Dependency vulnerability review complete.

## Reliability readiness

- Database backup tested.
- File backup tested.
- Database restoration tested.
- File restoration tested.
- Migration rollback tested.
- Vendor outage behavior tested.
- Error monitoring tested.
- Alert routing tested.

## Performance readiness

- Dashboard performance tested.
- Claim search tested with realistic volume.
- Document lists tested with realistic volume.
- Reports tested with realistic volume.
- Mobile performance reviewed.

## Accessibility readiness

- Keyboard navigation tested.
- Screen-reader labels reviewed.
- Form errors are understandable.
- Focus behavior is correct.
- Color contrast is acceptable.
- Responsive layouts remain usable.

## Operational readiness

- Administrator guide completed.
- Staff training completed.
- User onboarding process documented.
- User offboarding process documented.
- Incident-response procedure documented.
- Support ownership assigned.
- Release notes completed.

---

# Required Phase Test Report Template

Complete this report for every phase.

## Phase

`Phase number and name`

## Build or release candidate

`Branch, commit, deployment, and date`

## Features tested

- Feature:
- Feature:
- Feature:

## Automated tests

- Unit tests: Pass / Fail
- Component tests: Pass / Fail
- Integration tests: Pass / Fail
- Authorization tests: Pass / Fail
- End-to-end tests: Pass / Fail
- Accessibility tests: Pass / Fail
- Build validation: Pass / Fail

## Manual tests

- Desktop: Pass / Fail
- Mobile: Pass / Fail
- Administrator role: Pass / Fail
- Manager role: Pass / Fail
- Adjuster role: Pass / Fail
- Intake role: Pass / Fail
- Restricted external role: Pass / Fail / Not applicable
- Client role: Pass / Fail / Not applicable

## Data integrity

- Create: Pass / Fail
- Read: Pass / Fail
- Update: Pass / Fail
- Archive: Pass / Fail
- Restore: Pass / Fail
- Audit history: Pass / Fail
- Backup: Pass / Fail
- Restore from backup: Pass / Fail

## Defects

| ID | Severity | Description | Status | Retest result |
|---|---|---|---|---|
| | | | | |

## Security review

- Authentication: Pass / Fail
- Authorization: Pass / Fail
- Data isolation: Pass / Fail
- File security: Pass / Fail
- Logging safety: Pass / Fail

## Phase decision

- [ ] Approved to proceed
- [ ] Rejected; corrective work required

## Approval

- Reviewer:
- Date:
- Notes:

---

# Strict Proceed-or-Stop Rule

A phase is approved only when every mandatory acceptance criterion has passed and the phase test report is complete.

The following items automatically stop progression:

- Any critical defect
- Any unresolved high-severity defect
- Unauthorized data access
- Incorrect financial calculation
- Data loss
- Broken backup or restoration
- Broken public website route
- Failed migration or rollback
- Missing audit trail for sensitive actions
- Exposure of internal information to a client
- Unstable or unreproducible deployment

When a stop condition occurs:

1. Stop new feature development.
2. Record the defect.
3. Identify the root cause.
4. Correct the defect.
5. Add or update a regression test.
6. Rerun all affected tests.
7. Rerun the complete phase acceptance suite.
8. Document the new result.
9. Proceed only after approval.

This phase-gated process is mandatory for the entire management portal project.