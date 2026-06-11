import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/hero-storm.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Messeri & Associates | Florida Public Insurance Adjusters" },
      { name: "description", content: "Florida licensed public insurance adjusters specializing in hurricane, flood, fire, and water damage claims. Strategic advocacy to maximize your settlement." },
      { property: "og:title", content: "Messeri & Associates | Florida Public Insurance Adjusters" },
      { property: "og:description", content: "Strategic advocacy for your insurance claim across Florida." },
    ],
  }),
  component: Index,
});

const services = [
  { title: "Hurricane Damage", desc: "Comprehensive claims assistance for wind, water, and structural damage from hurricanes and tropical storms." },
  { title: "Flood Damage", desc: "Expert navigation of complex flood insurance policies and thorough documentation of all damages." },
  { title: "Fire & Smoke", desc: "Detailed assessment of visible and hidden damages from fire, smoke, and firefighting efforts." },
  { title: "Water & Plumbing", desc: "Thorough evaluation of water damage from burst pipes, leaks, and backup incidents." },
];

const process = [
  { n: "01", title: "Free Consultation", desc: "We evaluate your situation, review your policy, and determine if you have a viable claim." },
  { n: "02", title: "Detailed Assessment", desc: "Comprehensive inspection documenting all damage with photos, videos, and detailed notes." },
  { n: "03", title: "Claim Development", desc: "We prepare and file your claim with documentation establishing the full extent of your covered losses." },
  { n: "04", title: "Strategic Negotiation", desc: "We leverage our expertise to negotiate with your carrier for maximum recovery." },
  { n: "05", title: "Settlement & Recovery", desc: "We finalize your claim and ensure you receive the settlement you deserve." },
];

const testimonials = [
  { name: "Michael Palermo", quote: "David Messeri and the team were thorough and professional in taking on our case. Superb in arbitration review, working on our behalf to earn a more reasonable settlement." },
  { name: "Donna Roddenbery", quote: "Their professionalism is extraordinary and their efforts to recoup additional money from insurance was strategic and profitable. David Messeri was a pleasure to work with." },
  { name: "John Goundas", quote: "They have made the process much less stressful. David always kept me posted on everything. They treat you like family and really look out for you." },
  { name: "Kyle James", quote: "The team continuously answered my questions, acted on my behalf with the insurance company, and got results through mediation. Professional and thorough." },
  { name: "Kathy Stanfield", quote: "We had a lot of damage after Sally. We called and received quick service and outstanding customer service. Very professional and helpful!" },
  { name: "Glenn Abernethy", quote: "Our insurance company wanted to do us wrong but they were there every step of the way and helped us get a reasonable settlement." },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <Services />
      <WhyUs />
      <Process />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-20">
      <div className="mx-auto max-w-7xl px-6 py-6 flex items-center justify-between">
        <a href="#top" className="text-primary-foreground">
          <div className="font-serif text-xl md:text-2xl font-semibold leading-none">Messeri <span className="text-gold">&amp;</span> Associates</div>
          <div className="text-[10px] uppercase tracking-[0.25em] text-primary-foreground/70 mt-1">Public Insurance Adjusters</div>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-primary-foreground/80">
          <a href="#services" className="hover:text-gold transition-colors">Services</a>
          <a href="#why" className="hover:text-gold transition-colors">Why Us</a>
          <a href="#process" className="hover:text-gold transition-colors">Process</a>
          <a href="#testimonials" className="hover:text-gold transition-colors">Reviews</a>
        </nav>
        <a href="#contact" className="hidden md:inline-flex items-center gap-2 bg-gold text-navy px-5 py-2.5 text-sm font-semibold rounded-sm hover:opacity-90 transition">
          Free Consultation
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative min-h-[100vh] flex items-center bg-navy overflow-hidden">
      <img src={heroImg} alt="Florida home after hurricane damage" className="absolute inset-0 h-full w-full object-cover opacity-40" width={1920} height={1080} />
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/30" />
      <div className="relative mx-auto max-w-7xl px-6 pt-32 pb-20 text-primary-foreground">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-gold mb-6">
            <span className="h-px w-8 bg-gold" /> Florida Licensed &amp; WIND Certified
          </div>
          <h1 className="font-serif text-5xl md:text-7xl font-semibold leading-[1.05]">
            Strategic Advocacy<br />for Your <span className="italic text-gold">Insurance Claim</span>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-primary-foreground/80 max-w-2xl leading-relaxed">
            Expert guidance through the complex world of property damage claims. We construct compelling cases that push carriers toward the settlements you deserve.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#contact" className="bg-gold text-navy px-8 py-4 font-semibold rounded-sm hover:opacity-90 transition">
              Get Started
            </a>
            <a href="#process" className="border border-primary-foreground/30 text-primary-foreground px-8 py-4 font-semibold rounded-sm hover:bg-primary-foreground/10 transition">
              How It Works
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl mb-16">
          <div className="text-xs uppercase tracking-[0.3em] text-accent font-semibold mb-4">Our Specialties</div>
          <h2 className="font-serif text-4xl md:text-5xl text-primary">Public adjusting for every type of property damage claim.</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-px bg-border">
          {services.map((s, i) => (
            <div key={s.title} className="bg-background p-10 md:p-12 group hover:bg-secondary transition-colors">
              <div className="text-gold font-serif text-2xl mb-6">0{i + 1}</div>
              <h3 className="font-serif text-2xl md:text-3xl text-primary mb-4">{s.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  const items = [
    { title: "Meticulous Attention to Detail", desc: "We don't just document damage; we construct compelling cases that withstand scrutiny and push carriers toward fair settlements." },
    { title: "Relentless Negotiation", desc: "Where others take a passive role, we actively challenge undervaluations and uncover overlooked entitlements." },
    { title: "Deep Policy Understanding", desc: "Our expertise in policy language and building science ensures we maximize every legitimate dollar under your policy." },
    { title: "Licensed & Certified", desc: "WIND Certified Appraiser and Licensed Public Insurance Adjuster in Florida with proven expertise." },
  ];
  return (
    <section id="why" className="bg-navy text-primary-foreground py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-5">
            <div className="text-xs uppercase tracking-[0.3em] text-gold font-semibold mb-4">Why Choose Us</div>
            <h2 className="font-serif text-4xl md:text-5xl">When carriers pay less, we push back <span className="text-gold italic">harder</span>.</h2>
            <p className="mt-6 text-primary-foreground/70 leading-relaxed">
              Insurance companies have armies of adjusters working in their interest. You deserve the same on yours.
            </p>
          </div>
          <div className="md:col-span-7 grid sm:grid-cols-2 gap-px bg-primary-foreground/10">
            {items.map((it) => (
              <div key={it.title} className="bg-navy p-8">
                <h3 className="font-serif text-xl text-gold mb-3">{it.title}</h3>
                <p className="text-sm text-primary-foreground/70 leading-relaxed">{it.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="process" className="py-24 md:py-32 bg-secondary">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl mb-16">
          <div className="text-xs uppercase tracking-[0.3em] text-accent font-semibold mb-4">Our Process</div>
          <h2 className="font-serif text-4xl md:text-5xl text-primary">A strategic approach to maximize your recovery.</h2>
        </div>
        <div className="space-y-px">
          {process.map((p) => (
            <div key={p.n} className="bg-background grid md:grid-cols-12 gap-6 p-8 md:p-10 items-baseline hover:bg-accent/10 transition-colors group">
              <div className="md:col-span-2 font-serif text-4xl md:text-5xl text-gold group-hover:translate-x-1 transition-transform">{p.n}</div>
              <div className="md:col-span-3"><h3 className="font-serif text-2xl text-primary">{p.title}</h3></div>
              <div className="md:col-span-7 text-muted-foreground leading-relaxed">{p.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section id="testimonials" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl mb-16">
          <div className="text-xs uppercase tracking-[0.3em] text-accent font-semibold mb-4">Client Success Stories</div>
          <h2 className="font-serif text-4xl md:text-5xl text-primary">Hear from property owners we've helped across Florida.</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <figure key={t.name} className="border border-border bg-card p-8 flex flex-col">
              <div className="text-gold text-xl tracking-widest mb-4">★★★★★</div>
              <blockquote className="text-foreground/90 leading-relaxed flex-1">"{t.quote}"</blockquote>
              <figcaption className="mt-6 pt-6 border-t border-border">
                <div className="font-semibold text-primary">{t.name}</div>
                <div className="text-xs text-muted-foreground mt-1">Verified Google Review</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative bg-navy text-primary-foreground py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, var(--gold), transparent 40%)" }} />
      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <div className="text-xs uppercase tracking-[0.3em] text-gold font-semibold mb-4">Free Consultation</div>
        <h2 className="font-serif text-4xl md:text-6xl">Ready to maximize your<br /><span className="italic text-gold">insurance claim?</span></h2>
        <p className="mt-6 text-lg text-primary-foreground/70 max-w-2xl mx-auto">
          Schedule a free consultation to discuss your property damage claim. No obligation, no upfront cost.
        </p>
        <div className="mt-12 grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto text-left">
          <a href="tel:" className="block border border-primary-foreground/20 p-6 hover:border-gold transition">
            <div className="text-xs uppercase tracking-widest text-gold mb-2">Call</div>
            <div className="font-serif text-xl">Speak with us</div>
            <div className="text-sm text-primary-foreground/70 mt-1">Florida statewide</div>
          </a>
          <a href="mailto:info@messeriassociates.com" className="block border border-primary-foreground/20 p-6 hover:border-gold transition">
            <div className="text-xs uppercase tracking-widest text-gold mb-2">Email</div>
            <div className="font-serif text-xl break-all">info@messeri</div>
            <div className="text-sm text-primary-foreground/70 mt-1">associates.com</div>
          </a>
          <div className="block border border-primary-foreground/20 p-6">
            <div className="text-xs uppercase tracking-widest text-gold mb-2">Service Area</div>
            <div className="font-serif text-xl">Florida</div>
            <div className="text-sm text-primary-foreground/70 mt-1">Licensed Statewide</div>
          </div>
        </div>
        <a href="mailto:info@messeriassociates.com" className="inline-block mt-12 bg-gold text-navy px-10 py-4 font-semibold rounded-sm hover:opacity-90 transition">
          Request Free Consultation
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-navy text-primary-foreground/60 border-t border-primary-foreground/10 py-10">
      <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
        <div className="font-serif text-primary-foreground">Messeri <span className="text-gold">&amp;</span> Associates</div>
        <div>© {new Date().getFullYear()} Messeri &amp; Associates. Florida Licensed Public Insurance Adjuster.</div>
      </div>
    </footer>
  );
}
