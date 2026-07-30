import { siteConfig } from "./site-config";

export type ProfessionalPageContent = {
  slug: "appraisal" | "umpire" | "expert-witness";
  eyebrow: string;
  title: string;
  summary: string;
  overviewTitle: string;
  overview: string[];
  services: Array<{ title: string; description: string }>;
  process: Array<{ title: string; description: string }>;
  audience: string[];
  ctaLabel: string;
};

const professionalNavigation = [
  { href: "/professional-services/appraisal", label: "Appraisal" },
  { href: "/professional-services/umpire", label: "Umpire" },
  { href: "/professional-services/expert-witness", label: "Expert Witness" },
] as const;

export function renderProfessionalPage(content: ProfessionalPageContent) {
  const canonical = `${siteConfig.domain}/professional-services/${content.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${content.title} | ${siteConfig.businessName}`,
    url: canonical,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    areaServed: { "@type": "State", name: "Florida" },
    provider: {
      "@type": "Person",
      name: siteConfig.principalName,
      hasCredential: [
        `Florida Public Adjuster License ${siteConfig.publicAdjusterLicense}`,
        "WIND Certified Appraiser",
      ],
    },
  };

  const serviceCards = content.services
    .map(
      ({ title, description }, index) => `
        <article class="professional-card">
          <span class="professional-card-number">${String(index + 1).padStart(2, "0")}</span>
          <h3>${title}</h3>
          <p>${description}</p>
        </article>`,
    )
    .join("");

  const processSteps = content.process
    .map(
      ({ title, description }, index) => `
        <li>
          <span>${index + 1}</span>
          <div><h3>${title}</h3><p>${description}</p></div>
        </li>`,
    )
    .join("");

  const audiences = content.audience.map((item) => `<li>${item}</li>`).join("");
  const overview = content.overview.map((paragraph) => `<p>${paragraph}</p>`).join("");
  const navLinks = professionalNavigation
    .map(
      ({ href, label }) =>
        `<a href="${href}"${content.slug === href.split("/").at(-1) ? ' aria-current="page"' : ""}>${label}</a>`,
    )
    .join("");

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${content.title} | David Messeri</title>
  <meta name="description" content="${content.summary}">
  <link rel="canonical" href="${canonical}">
  <meta property="og:title" content="${content.title} | David Messeri">
  <meta property="og:description" content="${content.summary}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonical}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Open+Sans:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/professional-services.css">
  <script type="application/ld+json">${JSON.stringify(schema)}</script>
</head>
<body>
  <header class="professional-header">
    <a class="professional-logo" href="/" aria-label="Messeri and Associates home">
      <img src="/img/logo3.png" alt="Messeri & Associates, LLC">
    </a>
    <nav aria-label="Primary navigation">
      <a href="/">Policyholder Services</a>
      ${navLinks}
      <a class="nav-cta" href="/contact.html">Request a Conflict Check</a>
    </nav>
  </header>

  <main>
    <section class="professional-hero">
      <div class="professional-hero-inner">
        <p class="eyebrow">${content.eyebrow}</p>
        <h1>${content.title}</h1>
        <p class="hero-summary">${content.summary}</p>
        <div class="hero-actions">
          <a class="button button-primary" href="/contact.html">${content.ctaLabel}</a>
          <a class="button button-secondary" href="tel:${siteConfig.phone}">Call ${siteConfig.displayPhone}</a>
        </div>
        <p class="neutral-note">Professional dispute services are administered separately from policyholder public-adjusting engagements. Conflicts are checked before an assignment is accepted.</p>
      </div>
    </section>

    <section class="credential-bar" aria-label="Professional credentials">
      <span>WIND Certified Appraiser</span>
      <span>Florida Statewide Availability</span>
      <span>Residential &amp; Commercial Matters</span>
      <span>English &amp; French</span>
    </section>

    <section class="professional-overview layout-two-column">
      <div>
        <p class="eyebrow">Independent professional services</p>
        <h2>${content.overviewTitle}</h2>
      </div>
      <div class="overview-copy">${overview}</div>
    </section>

    <section class="professional-services-section">
      <div class="section-heading">
        <p class="eyebrow">Scope of engagement</p>
        <h2>Focused support for complex property-loss disputes</h2>
      </div>
      <div class="professional-card-grid">${serviceCards}</div>
    </section>

    <section class="professional-process layout-two-column">
      <div>
        <p class="eyebrow">A disciplined process</p>
        <h2>Clear administration from intake through completion</h2>
        <ul class="audience-list">${audiences}</ul>
      </div>
      <ol>${processSteps}</ol>
    </section>

    <section class="professional-cta">
      <div>
        <p class="eyebrow">Discuss an assignment</p>
        <h2>Submit the matter for availability and conflict review.</h2>
      </div>
      <div>
        <p>Share the parties, property location, date of loss, claim number, requested role, and any scheduling requirements. No engagement exists until terms are confirmed in writing.</p>
        <a class="button button-primary" href="/contact.html">${content.ctaLabel}</a>
      </div>
    </section>
  </main>

  <footer class="professional-footer">
    <div>
      <strong>${siteConfig.businessName}</strong>
      <span>${siteConfig.address.street}, ${siteConfig.address.city}, ${siteConfig.address.region} ${siteConfig.address.postalCode}</span>
    </div>
    <div>
      <a href="mailto:${siteConfig.email}">${siteConfig.email}</a>
      <a href="tel:${siteConfig.phone}">${siteConfig.displayPhone}</a>
    </div>
    <div>
      <span>David Messeri — Florida Public Adjuster ${siteConfig.publicAdjusterLicense}</span>
      <span>Firm License ${siteConfig.firmLicense}</span>
    </div>
    <p>Professional-service availability and role depend on the assignment, governing documents, and conflict review. No outcome is guaranteed.</p>
  </footer>
</body>
</html>`;
}
