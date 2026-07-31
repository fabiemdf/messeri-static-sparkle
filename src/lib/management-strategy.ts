export type PracticeKey = "public-adjusting" | "appraisal" | "umpire" | "expert-consulting";

export type Practice = {
  key: PracticeKey;
  name: string;
  positioning: string;
  revenueModel: string;
  demandDriver: string;
  primaryBuyers: string[];
  referralChannels: string[];
  neutralityRisk: "low" | "medium" | "high";
  targetMixPercent: number;
};

export type InitiativeStatus = "planned" | "active" | "blocked" | "complete";

export type StrategicInitiative = {
  id: string;
  title: string;
  pillar: string;
  practice: PracticeKey | "cross-practice";
  horizon: "0-30 days" | "31-60 days" | "61-90 days" | "post-90 days";
  ownerRole: string;
  status: InitiativeStatus;
  successMetric: string;
  complianceNote?: string;
};

export const practices: Practice[] = [
  {
    key: "public-adjusting",
    name: "Public Adjusting",
    positioning: "Policyholder advocacy for denied, underpaid, and complex property claims.",
    revenueModel: "Contingency-fee and claim-based revenue.",
    demandDriver: "CAT events, water losses, denials, underpayments, commercial and association losses.",
    primaryBuyers: ["Policyholders", "Condo and HOA boards", "Commercial property owners"],
    referralChannels: ["Roofers", "Mitigation firms", "Mold assessors", "Plumbers", "Property managers", "Insurance agents"],
    neutralityRisk: "high",
    targetMixPercent: 45,
  },
  {
    key: "appraisal",
    name: "Insured-Side Appraisal",
    positioning: "Methodical, conflict-limited appraisal services with defined scope and turnaround commitments.",
    revenueModel: "Flat-fee, capped-hourly, or hourly engagements.",
    demandDriver: "Claim disputes that mature after carrier adjustment and pre-suit negotiation.",
    primaryBuyers: ["Public adjusters", "Plaintiff attorneys", "Policyholders"],
    referralChannels: ["PA firms", "First-party law firms", "Prior professional counterparties"],
    neutralityRisk: "medium",
    targetMixPercent: 25,
  },
  {
    key: "umpire",
    name: "Neutral Umpire",
    positioning: "Independent, efficient, disclosure-forward umpire service for appraisal panels.",
    revenueModel: "Hourly plus retainer.",
    demandDriver: "Deadlocked appraisal panels and court-appointed neutral selection.",
    primaryBuyers: ["Insured-side appraisers", "Carrier-side appraisers", "Defense and plaintiff counsel"],
    referralChannels: ["Appraisers", "Defense firms", "Circuit-court appointment lists", "Professional registries"],
    neutralityRisk: "low",
    targetMixPercent: 15,
  },
  {
    key: "expert-consulting",
    name: "Expert & Consulting",
    positioning: "Technical claim analysis, testimony, file review, and consulting for counsel and claims professionals.",
    revenueModel: "Hourly and project-based fees.",
    demandDriver: "Litigation, DOAH matters, pre-suit file review, and technical disputes.",
    primaryBuyers: ["Attorneys", "Public adjusters", "Commercial clients"],
    referralChannels: ["Law firms", "Professional associations", "Speaking and CE programs"],
    neutralityRisk: "medium",
    targetMixPercent: 15,
  },
];

export const initiatives: StrategicInitiative[] = [
  {
    id: "reactivation",
    title: "Past-client reactivation and review campaign",
    pillar: "PA claim lead engine",
    practice: "public-adjusting",
    horizon: "0-30 days",
    ownerRole: "Marketing / Intake",
    status: "planned",
    successMetric: "Campaign delivered, review requests generated, referrals and reopened opportunities tracked.",
  },
  {
    id: "cat-playbook",
    title: "CAT response playbook",
    pillar: "PA claim lead engine",
    practice: "public-adjusting",
    horizon: "0-30 days",
    ownerRole: "Operations",
    status: "planned",
    successMetric: "Landing-page, intake, ad, mail, staffing, and compliant solicitation templates approved before landfall.",
    complianceNote: "All solicitation and referral activity must be reviewed for Florida PA and UPPA compliance.",
  },
  {
    id: "neutral-practice",
    title: "Neutral practice brand architecture",
    pillar: "Umpire expansion",
    practice: "umpire",
    horizon: "0-30 days",
    ownerRole: "Principal",
    status: "active",
    successMetric: "Distinct neutral page, CV, disclosures, rate structure, agreement, and scheduling workflow published.",
  },
  {
    id: "appraisal-product",
    title: "Productized appraisal engagement",
    pillar: "Appraisal expansion",
    practice: "appraisal",
    horizon: "31-60 days",
    ownerRole: "Principal / Operations",
    status: "planned",
    successMetric: "Defined scope, pricing framework, SLA, non-circumvention language, and intake packet in use.",
  },
  {
    id: "professional-outreach",
    title: "100-contact professional outreach campaign",
    pillar: "Appraisal and umpire expansion",
    practice: "cross-practice",
    horizon: "31-60 days",
    ownerRole: "Business Development",
    status: "planned",
    successMetric: "100 qualified contacts segmented by PA, plaintiff counsel, defense counsel, and appraiser type.",
  },
  {
    id: "association-channel",
    title: "CAM, HOA, condo, and engineering channel",
    pillar: "PA claim lead engine",
    practice: "public-adjusting",
    horizon: "61-90 days",
    ownerRole: "Business Development",
    status: "planned",
    successMetric: "Target list, board presentation, CAM education deck, and referral tracking operational.",
  },
  {
    id: "operations-stack",
    title: "CRM, template library, VA workflow, and estimating QC",
    pillar: "Operations that scale",
    practice: "cross-practice",
    horizon: "61-90 days",
    ownerRole: "Operations",
    status: "planned",
    successMetric: "Standard stages, automated updates, controlled templates, delegated intake, and QC checkpoints adopted.",
  },
  {
    id: "market-expansion",
    title: "Adjacent-state and Ontario expansion readiness",
    pillar: "Market expansion",
    practice: "cross-practice",
    horizon: "post-90 days",
    ownerRole: "Principal / Compliance",
    status: "planned",
    successMetric: "Licensing, reciprocity, professional-responsibility, and service-delivery requirements documented before launch.",
  },
];

export const operatingMetrics = [
  "Signed contracts by source",
  "Lead-to-contract conversion rate",
  "Cycle time to settlement or award",
  "Recovery uplift versus carrier pre-engagement offer",
  "Revenue mix across the four practice lines",
] as const;

export function getStrategySnapshot() {
  return {
    generatedAt: new Date().toISOString(),
    practices,
    initiatives,
    operatingMetrics,
    phaseGate: {
      currentPhase: 0,
      status: "foundation-in-progress",
      rule: "Do not introduce production claim or client data until authentication, authorization, audit logging, environment separation, and rollback testing pass.",
    },
  };
}
