import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  BrainCircuit,
  Check,
  ChevronDown,
  CircleCheck,
  Cloud,
  Compass,
  FileText,
  Globe2,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Moon,
  Network,
  Phone,
  Play,
  Plus,
  Quote,
  ShieldCheck,
  Sparkles,
  Sun,
  X,
} from 'lucide-react';
import roboticsHeroImage from '@assets/generated_images/northstar-robotics-hero.jpg';
import roboticsDetailImage from '@assets/generated_images/northstar-robotics-detail.jpg';
import { FormEvent, useEffect, useState } from 'react';

const queryClient = new QueryClient();

const services = [
  {
    id: 'transformation',
    number: '01',
    label: 'Digital transformation',
    title: 'Make the whole business feel lighter.',
    body: 'We replace fragmented tools and workarounds with a clear operating model your people can actually use.',
    outcomes: ['A single source of truth', 'Fewer manual handoffs', 'A roadmap tied to business goals'],
    icon: Compass,
  },
  {
    id: 'automation',
    number: '02',
    label: 'AI & intelligent automation',
    title: 'Give good teams their time back.',
    body: 'Practical AI that reads the work, moves the workflow, and surfaces better decisions while keeping people accountable at the right moments.',
    outcomes: ['Faster response times', 'Consistent, auditable workflows', 'Capacity for higher-value work'],
    icon: BrainCircuit,
  },
  {
    id: 'experiences',
    number: '03',
    label: 'Digital experiences',
    title: 'Turn every interaction into momentum.',
    body: 'High-performing websites and business applications designed around how customers and teams move.',
    outcomes: ['Clearer customer journeys', 'Better conversion and retention', 'Interfaces people trust'],
    icon: Globe2,
  },
  {
    id: 'intelligence',
    number: '04',
    label: 'Business intelligence',
    title: 'See what deserves attention next.',
    body: 'Dashboards and reporting that turn scattered data into a calm, shared view of performance.',
    outcomes: ['Decisions made with confidence', 'Live visibility across teams', 'Metrics that drive action'],
    icon: BarChart3,
  },
  {
    id: 'continuity',
    number: '05',
    label: 'Cloud & continuity',
    title: 'Build for the next chapter.',
    body: 'Reliable systems, thoughtful maintenance, and a partner who keeps progress moving after launch.',
    outcomes: ['Less operational risk', 'Room to scale responsibly', 'Responsive long-term support'],
    icon: Cloud,
  },
];

const industries = [
  { name: 'Healthcare', detail: 'Give care teams more time for people, not paperwork.', icon: ShieldCheck, metric: '31%', metricLabel: 'less admin time' },
  { name: 'Professional services', detail: 'Create a smoother path from first conversation to lasting value.', icon: Network, metric: '2.4×', metricLabel: 'faster proposals' },
  { name: 'Manufacturing', detail: 'Connect the decisions on the floor to the goals in the boardroom.', icon: Layers3, metric: '18%', metricLabel: 'fewer delays' },
  { name: 'Education', detail: 'Make complex journeys simpler for every learner and team.', icon: FileText, metric: '43k', metricLabel: 'hours returned' },
  { name: 'Retail & hospitality', detail: 'Keep every experience personal while operations scale.', icon: Sparkles, metric: '26%', metricLabel: 'more repeat visits' },
];

const faqs = [
  { question: 'How do we know where to start?', answer: 'We begin with a focused working session to map the friction, understand the commercial priorities, and identify the smallest valuable step. You leave with a clear view of what matters now, what can wait, and why.' },
  { question: 'How long does a typical engagement take?', answer: 'A discovery sprint usually takes two weeks. Delivery can range from six weeks for a focused experience to several months for a broader transformation. We plan in visible phases so you see progress early.' },
  { question: 'Do you work with our existing team and partners?', answer: 'Yes. Northstar is designed to make your team stronger, not replace it. We work alongside internal leaders, existing suppliers, and subject matter experts with a clear ownership model from day one.' },
  { question: 'What does support look like after launch?', answer: 'Every launch includes a transition plan and a period of close support. Ongoing partnerships can include improvements, monitoring, team enablement, and a steady stream of high-confidence decisions.' },
  { question: 'How do you approach AI responsibly?', answer: 'We start with the business decision and the human responsibility around it—not the tool. Every AI workflow is scoped around privacy, review points, explainability, and measurable value.' },
];

function IconMark() {
  return (
    <span className="relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-[11px] bg-[var(--ink-blue)] text-white shadow-[0_8px_20px_-10px_rgba(13,95,212,.7)]" aria-hidden="true">
      <span className="absolute h-16 w-16 rounded-full border border-cyan-200/40" />
      <span className="absolute h-8 w-8 rounded-full border border-cyan-200/50" />
      <span className="relative text-[13px] font-bold tracking-[-.08em]">N</span>
    </span>
  );
}

function MetaAndStructuredData() {
  useEffect(() => {
    document.title = 'Northstar — Clearer paths to measurable progress';
    const description = 'Northstar is a digital transformation, AI and robotics partner helping ambitious businesses turn friction into calm, scalable operations.';
    const setMeta = (name: string, content: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let tag = document.head.querySelector(selector) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(property ? 'property' : 'name', name);
        document.head.appendChild(tag);
      }
      tag.content = content;
    };
    setMeta('description', description);
    setMeta('theme-color', '#f5f8fc');
    setMeta('og:title', 'Northstar — Clearer paths to measurable progress', true);
    setMeta('og:description', description, true);
    setMeta('og:type', 'website', true);
    setMeta('og:url', 'https://northstar.consulting/', true);
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', 'Northstar — Clearer paths to measurable progress');
    setMeta('twitter:description', description);
    let canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://northstar.consulting/';
    const structuredData = [
      { '@context': 'https://schema.org', '@type': 'Organization', name: 'Northstar Consulting', url: 'https://northstar.consulting/', email: 'hello@northstar.consulting', sameAs: ['https://www.linkedin.com/company/northstar-consulting'] },
      { '@context': 'https://schema.org', '@type': 'LocalBusiness', name: 'Northstar Consulting', description, address: { '@type': 'PostalAddress', addressLocality: 'Manchester', addressCountry: 'GB' }, openingHours: 'Mo-Fr 09:00-17:30' },
      { '@context': 'https://schema.org', '@type': 'Service', serviceType: 'Digital transformation, AI automation and robotics consulting', description: 'Business-first AI automation, decision intelligence, intelligent document processing, AI copilots and robotics for safer, more consistent operations.', provider: { '@type': 'Organization', name: 'Northstar Consulting' }, areaServed: 'Worldwide' },
      { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) },
    ];
    let jsonLd = document.getElementById('northstar-jsonld');
    if (!jsonLd) {
      jsonLd = document.createElement('script');
      jsonLd.id = 'northstar-jsonld';
      jsonLd.setAttribute('type', 'application/ld+json');
      document.head.appendChild(jsonLd);
    }
    jsonLd.textContent = JSON.stringify(structuredData);
  }, []);
  return null;
}

function AbstractNorthstar() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[500px]" aria-label="Abstract visualization of connected business progress" role="img">
      <div className="absolute inset-[8%] rounded-full border border-[var(--line-blue)] opacity-80" />
      <div className="absolute inset-[17%] rounded-full border border-[var(--line-blue)] opacity-90" />
      <div className="absolute inset-[29%] rounded-full border border-[var(--line-blue)]" />
      <div className="ns-visual-orbit absolute inset-[13%]">
        <span className="absolute left-[6%] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-[var(--signal-blue)] shadow-[0_0_0_8px_rgba(13,95,212,.08)]" />
        <span className="absolute bottom-[13%] right-[17%] h-2 w-2 rounded-full bg-[#22b9c3] shadow-[0_0_0_8px_rgba(34,185,195,.1)]" />
      </div>
      <div className="absolute inset-[35%] rounded-[28%] border border-white/70 bg-[linear-gradient(145deg,rgba(255,255,255,.92),rgba(217,235,255,.65))] shadow-[0_25px_55px_-25px_rgba(13,95,212,.55)] backdrop-blur-sm dark:border-white/10 dark:bg-[linear-gradient(145deg,rgba(35,65,101,.9),rgba(16,41,71,.75))]">
        <div className="absolute inset-[21%] flex items-center justify-center rounded-full bg-[var(--ink-blue)] shadow-[0_0_0_8px_rgba(255,255,255,.42)]">
          <span className="font-display text-3xl font-extrabold tracking-[-.1em] text-white">N</span>
        </div>
      </div>
      <div className="absolute left-[6%] top-[15%] w-40 rounded-2xl border border-white/80 bg-white/70 p-3 shadow-[0_18px_45px_-22px_rgba(13,55,105,.52)] backdrop-blur-md dark:border-white/10 dark:bg-slate-900/50">
        <div className="mb-3 flex items-center justify-between"><span className="h-2 w-2 rounded-full bg-[#2cbf9d]" /><span className="font-mono-ns text-[8px] text-slate-400">MOMENTUM</span></div>
        <div className="flex h-10 items-end gap-1.5">{[25, 38, 31, 48, 45, 68, 75, 90].map((height, index) => <span key={index} className="flex-1 rounded-t-sm bg-[linear-gradient(to_top,#0d5fd4,#7cc9ff)] opacity-80" style={{ height: `${height}%` }} />)}</div>
      </div>
      <div className="absolute bottom-[14%] right-[1%] w-44 rounded-2xl border border-white/80 bg-white/70 p-4 shadow-[0_18px_45px_-22px_rgba(13,55,105,.52)] backdrop-blur-md dark:border-white/10 dark:bg-slate-900/50">
        <div className="flex items-center gap-2"><span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#dff8f2] text-[#1a9d81]"><Check size={13} strokeWidth={3} /></span><span className="font-display text-xs font-bold text-[var(--ink-blue)] dark:text-blue-100">Path is clear</span></div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700"><span className="block h-full w-[78%] rounded-full bg-[#21b899]" /></div>
        <div className="mt-2 flex justify-between font-mono-ns text-[8px] text-slate-400"><span>Q2 PRIORITIES</span><span>78%</span></div>
      </div>
      <span className="ns-pulse absolute right-[17%] top-[8%] h-3 w-3 rounded-full bg-[#21b899]" />
    </div>
  );
}

function Header({ dark, setDark }: { dark: boolean; setDark: (value: boolean) => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const links = [['About', '#about'], ['Services', '#services'], ['AI & Robotics', '#ai'], ['Approach', '#approach'], ['Proof', '#proof']];
  return (
    <header className="sticky top-0 z-50 border-b border-[hsl(var(--border))]/70 bg-[hsl(var(--background))]/80 backdrop-blur-xl">
      <div className="ns-container flex h-[72px] items-center justify-between">
        <a href="#top" className="ns-focus flex items-center gap-2.5 rounded-md" data-testid="link-brand">
          <IconMark />
          <span className="font-display text-[17px] font-extrabold tracking-[-.055em] text-[var(--ink-blue)] dark:text-blue-100">northstar<span className="text-[var(--signal-blue)]">.</span></span>
        </a>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
          {links.map(([label, href]) => <a key={href} href={href} className="ns-focus rounded text-[13px] font-semibold text-slate-500 transition-colors hover:text-[var(--signal-blue)] dark:text-slate-300" data-testid={`link-nav-${label.toLowerCase()}`}>{label}</a>)}
        </nav>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => setDark(!dark)} className="ns-focus inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-[hsl(var(--muted))] hover:text-[var(--ink-blue)] dark:text-slate-300" aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'} data-testid="button-theme-toggle">
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <a href="#contact" className="ns-btn hidden rounded-full bg-[var(--ink-blue)] px-4 py-2.5 text-[12px] font-bold text-white shadow-[0_10px_20px_-14px_rgba(23,50,95,.8)] hover:bg-[var(--signal-blue)] sm:inline-flex" data-testid="link-header-consultation">Talk to us <ArrowUpRight size={14} className="ml-1.5" /></a>
          <button type="button" onClick={() => setMobileOpen(!mobileOpen)} className="ns-focus inline-flex h-9 w-9 items-center justify-center rounded-full text-[var(--ink-blue)] lg:hidden" aria-label={mobileOpen ? 'Close menu' : 'Open menu'} data-testid="button-mobile-menu">
            {mobileOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>
      {mobileOpen && <nav className="ns-container border-t border-[hsl(var(--border))] py-4 lg:hidden" aria-label="Mobile navigation">
        <div className="grid gap-1">{links.map(([label, href]) => <a key={href} href={href} onClick={() => setMobileOpen(false)} className="rounded-xl px-3 py-3 text-sm font-semibold text-slate-600 hover:bg-[hsl(var(--muted))] dark:text-slate-200" data-testid={`link-mobile-${label.toLowerCase()}`}>{label}</a>)}</div>
        <a href="#contact" onClick={() => setMobileOpen(false)} className="mt-3 flex items-center justify-center rounded-xl bg-[var(--ink-blue)] px-4 py-3 text-sm font-bold text-white" data-testid="link-mobile-consultation">Book a consultation <ArrowRight size={15} className="ml-2" /></a>
      </nav>}
    </header>
  );
}

function Home() {
  const [dark, setDark] = useState(false);
  const [activeService, setActiveService] = useState(services[0].id);
  const [activeIndustry, setActiveIndustry] = useState(industries[0].name);
  const [openFaq, setOpenFaq] = useState(0);
  const [formSent, setFormSent] = useState(false);
  const [newsletterSent, setNewsletterSent] = useState(false);
  const [cookieVisible, setCookieVisible] = useState(true);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('northstar-theme');
    const initialDark = saved === 'dark';
    setDark(initialDark);
    document.documentElement.classList.toggle('dark', initialDark);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('northstar-theme', dark ? 'dark' : 'light');
  }, [dark]);

  const handleConsultation = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSent(true);
  };
  const handleNewsletter = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNewsletterSent(true);
  };
  const selectedService = services.find((service) => service.id === activeService) ?? services[0];
  const selectedIndustry = industries.find((industry) => industry.name === activeIndustry) ?? industries[0];
  const ServiceIcon = selectedService.icon;
  const IndustryIcon = selectedIndustry.icon;

  return (
    <div className="ns-page" id="top">
      <MetaAndStructuredData />
      <Header dark={dark} setDark={setDark} />
      <main>
        <section className="relative pt-10 md:pt-20" aria-labelledby="hero-heading">
          <div className="ns-grid-bg pointer-events-none absolute inset-x-0 top-0 h-[560px] opacity-60" />
          <div className="ns-container relative grid items-center gap-12 pb-20 md:grid-cols-[1.02fr_.98fr] md:pb-28">
            <div className="ns-reveal">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--line-blue)] bg-white/70 px-3 py-1.5 shadow-sm dark:bg-slate-900/40"><span className="h-1.5 w-1.5 rounded-full bg-[#20b694]" /><span className="font-mono-ns text-[9px] tracking-[.08em] text-slate-500 dark:text-slate-300">A CLEARER WAY FORWARD</span></div>
              <h1 id="hero-heading" className="ns-display max-w-[650px] text-[clamp(3.2rem,7vw,6.2rem)] font-extrabold text-[var(--ink-blue)] dark:text-blue-50">Turn business friction into <span className="text-[var(--signal-blue)]">forward motion.</span></h1>
              <p className="mt-7 max-w-[520px] text-[16px] leading-7 text-slate-600 dark:text-slate-300">Northstar helps ambitious teams replace disconnected processes and outdated experiences with calm, scalable operations that move the numbers.</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href="#contact" className="ns-btn inline-flex items-center justify-center rounded-full bg-[var(--ink-blue)] px-5 py-3.5 text-sm font-bold text-white shadow-[0_15px_30px_-18px_rgba(23,50,95,.8)] hover:bg-[var(--signal-blue)]" data-testid="link-hero-consultation">Book a free consultation <ArrowUpRight size={16} className="ml-2" /></a>
                <a href="#services" className="ns-btn inline-flex items-center justify-center rounded-full border border-[var(--line-blue)] bg-white/60 px-5 py-3.5 text-sm font-bold text-[var(--ink-blue)] hover:bg-white dark:bg-slate-900/40 dark:text-blue-100 dark:hover:bg-slate-800" data-testid="link-hero-services">Explore our work <ArrowDownRight size={16} className="ml-2" /></a>
                 <a href="#ai" className="ns-btn inline-flex items-center justify-center rounded-full border border-[var(--line-blue)] bg-[#edf8f8]/80 px-5 py-3.5 text-sm font-bold text-[var(--ink-blue)] hover:bg-[#dff3f2] dark:bg-slate-900/60 dark:text-blue-100 dark:hover:bg-slate-800" data-testid="link-hero-ai">AI & robotics <ArrowDownRight size={16} className="ml-2" /></a>
              </div>
              <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-[var(--line-blue)] pt-5 text-[11px] font-semibold text-slate-500 dark:text-slate-400"><span className="flex items-center gap-2"><CircleCheck size={14} className="text-[#20aa8c]" /> No hard sell</span><span className="flex items-center gap-2"><CircleCheck size={14} className="text-[#20aa8c]" /> Senior thinking</span><span className="flex items-center gap-2"><CircleCheck size={14} className="text-[#20aa8c]" /> Practical outcomes</span></div>
            </div>
            <div className="ns-reveal ns-delay-2 relative md:pl-5"><AbstractNorthstar /><span className="absolute bottom-0 left-4 hidden items-center gap-2 font-mono-ns text-[9px] tracking-[.12em] text-slate-400 md:flex"><span className="h-1 w-1 rounded-full bg-[var(--signal-blue)]" /> PROGRESS, VISUALISED</span></div>
          </div>
        </section>

        <div className="ns-container"><div className="ns-rule" /></div>
        <section className="py-9" aria-label="Northstar principles">
          <div className="ns-container grid gap-5 text-center sm:grid-cols-3 sm:text-left">
            {[['01', 'Clarity before complexity', 'We make the important thing obvious.'], ['02', 'Progress you can measure', 'Every decision connects to a meaningful outcome.'], ['03', 'A partner for the long run', 'We stay close enough to make change stick.']].map(([number, title, body]) => <div key={number} className="flex gap-4 sm:justify-center"><span className="font-mono-ns text-[10px] text-[var(--signal-blue)]">{number}</span><div><p className="font-display text-sm font-bold text-[var(--ink-blue)] dark:text-blue-100">{title}</p><p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">{body}</p></div></div>)}
          </div>
        </section>

         <section id="ai" className="ns-section scroll-mt-16 bg-[var(--ink-blue)] text-white" aria-labelledby="ai-heading">
           <div className="ns-container">
             <div className="grid items-end gap-8 md:grid-cols-[.82fr_1.18fr]">
               <div>
                 <p className="ns-eyebrow text-[#73d8d7]">02 / AI & robotics</p>
                 <h2 id="ai-heading" className="ns-display mt-5 text-4xl font-extrabold md:text-6xl">Intelligence that <span className="text-[#73d8d7]">earns trust.</span></h2>
               </div>
               <p className="max-w-[500px] leading-7 text-blue-100/75">AI should make the business more capable, not less accountable. We connect models, workflows and physical operations to the decisions your people already own.</p>
             </div>
             <div className="mt-12 grid gap-7 lg:grid-cols-[1.08fr_.92fr] lg:items-stretch">
               <figure className="group relative min-h-[360px] overflow-hidden rounded-[28px] border border-white/15 bg-[#0d2342] md:min-h-[500px]">
                 <img src={roboticsHeroImage} alt="Robotic arm working beside an illuminated operations dashboard in a controlled facility" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-center opacity-85 transition-transform duration-700 group-hover:scale-[1.03]" />
                 <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,23,44,.04),rgba(7,23,44,.88))]" />
                 <figcaption className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                   <div className="flex items-center gap-3"><span className="h-1.5 w-1.5 rounded-full bg-[#73d8d7]" /><span className="font-mono-ns text-[9px] tracking-[.16em] text-cyan-100/75">INTELLIGENCE / IN THE FLOW OF WORK</span></div>
                   <p className="mt-4 max-w-[430px] text-xl font-semibold leading-8 text-white">From the first document to the final movement on the floor, every handoff can become clearer.</p>
                 </figcaption>
               </figure>
               <div className="grid gap-3">
                 {[
                   ['01', 'Business automation', 'Remove repetitive coordination so teams can spend more time on judgement and service.'],
                   ['02', 'Documents & workflows', 'Extract the signal from unstructured information, route it, and keep a human review where it matters.'],
                   ['03', 'Decision intelligence', 'Turn live operational data into a shared view of what needs attention next.'],
                   ['04', 'Copilots & physical operations', 'Give people a grounded assistant, and give machines a safer, more consistent role on the floor.'],
                 ].map(([number, title, body]) => <article key={number} className="border-t border-white/15 py-5">
                   <div className="flex gap-5"><span className="font-mono-ns text-[10px] text-[#73d8d7]">{number}</span><div><h3 className="font-display text-lg font-bold">{title}</h3><p className="mt-2 max-w-[390px] text-sm leading-6 text-blue-100/65">{body}</p></div></div>
                 </article>)}
                 <div className="mt-2 rounded-2xl border border-[#73d8d7]/25 bg-white/[.06] p-5"><div className="flex items-center gap-2 text-sm font-bold text-[#73d8d7]"><ShieldCheck size={16} /> Human review, designed in</div><p className="mt-2 text-xs leading-5 text-blue-100/65">Clear ownership, explainable outputs, and review points matched to risk—not bolted on after launch.</p></div>
               </div>
             </div>
           </div>
         </section>

        <section id="about" className="ns-section scroll-mt-16" aria-labelledby="about-heading">
          <div className="ns-container grid gap-12 md:grid-cols-[.82fr_1.18fr] md:gap-20">
            <div><p className="ns-eyebrow">01 / The Northstar story</p><h2 id="about-heading" className="ns-display mt-5 text-4xl font-extrabold text-[var(--ink-blue)] md:text-5xl">The best kind of change feels <span className="text-[var(--signal-blue)]">inevitable.</span></h2></div>
            <div className="max-w-[630px]"><p className="text-xl leading-8 text-[var(--ink-blue)] dark:text-blue-100">Most businesses do not need more technology. They need a better relationship with the technology they already have.</p><p className="mt-6 leading-7 text-slate-600 dark:text-slate-300">Northstar was built for the moment when growth has outpaced the systems beneath it. We bring strategic perspective and considered delivery together, so leaders can move from “we should fix this” to “this is working” without losing momentum.</p><div className="mt-10 grid gap-4 sm:grid-cols-3">{[['Vision', 'Business that feels easier to run.'], ['Mission', 'Make meaningful progress feel possible.'], ['Values', 'Be clear. Stay curious. Follow through.']].map(([title, body]) => <div key={title} className="border-t-2 border-[var(--signal-blue)] pt-4"><p className="font-display text-sm font-bold text-[var(--ink-blue)] dark:text-blue-100">{title}</p><p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{body}</p></div>)}</div></div>
          </div>
        </section>

        <section id="services" className="ns-section scroll-mt-16 bg-[var(--ice)]/55 dark:bg-slate-900/30" aria-labelledby="services-heading">
          <div className="ns-container">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="ns-eyebrow">02 / What we do</p><h2 id="services-heading" className="ns-display mt-5 max-w-[650px] text-4xl font-extrabold text-[var(--ink-blue)] md:text-5xl">A sharper operating system for <span className="text-[var(--signal-blue)]">ambitious teams.</span></h2></div><p className="max-w-[300px] text-sm leading-6 text-slate-500 dark:text-slate-400">Start where the pressure is highest. We connect the pieces around a result that matters.</p></div>
            <div className="mt-14 grid gap-7 lg:grid-cols-[.88fr_1.12fr]">
              <div className="divide-y divide-[var(--line-blue)] border-y border-[var(--line-blue)]">{services.map((service) => { const Icon = service.icon; return <button type="button" key={service.id} onClick={() => setActiveService(service.id)} className={`ns-service-row flex w-full items-center justify-between gap-3 py-5 text-left ${activeService === service.id ? 'text-[var(--signal-blue)]' : 'text-slate-600 dark:text-slate-300'}`} data-testid={`button-service-${service.id}`}><span className="flex items-center gap-4"><span className={`flex h-9 w-9 items-center justify-center rounded-xl ${activeService === service.id ? 'bg-[var(--signal-blue)] text-white' : 'bg-white text-slate-500 dark:bg-slate-800'}`}><Icon size={16} /></span><span><span className="block font-display text-[15px] font-bold">{service.label}</span><span className="mt-1 block font-mono-ns text-[9px] tracking-wider opacity-60">{service.number}</span></span></span><ArrowRight size={17} className={activeService === service.id ? 'translate-x-1' : ''} /></button>; })}</div>
              <div className="ns-card-shadow relative overflow-hidden rounded-[26px] border border-white/80 bg-white p-7 dark:border-slate-700 dark:bg-slate-900 md:p-10"><div className="absolute right-0 top-0 h-44 w-44 rounded-full bg-[#e2f1ff] blur-3xl dark:bg-blue-900/30" /><div className="relative"><div className="flex items-start justify-between"><span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--ink-blue)] text-white"><ServiceIcon size={22} /></span><span className="font-mono-ns text-[10px] text-slate-400">{selectedService.number} / 05</span></div><h3 className="ns-display mt-12 max-w-[500px] text-3xl font-extrabold text-[var(--ink-blue)] dark:text-blue-100 md:text-4xl">{selectedService.title}</h3><p className="mt-5 max-w-[510px] leading-7 text-slate-600 dark:text-slate-300">{selectedService.body}</p><div className="mt-8 grid gap-3 sm:grid-cols-3">{selectedService.outcomes.map((outcome) => <div key={outcome} className="rounded-2xl border border-[var(--line-blue)] bg-[hsl(var(--background))]/70 p-4"><Check size={15} className="text-[#20aa8c]" /><p className="mt-3 text-xs font-bold leading-5 text-[var(--ink-blue)] dark:text-blue-100">{outcome}</p></div>)}</div><button type="button" onClick={() => document.getElementById('contact')?.scrollIntoView()} className="mt-9 inline-flex items-center text-sm font-bold text-[var(--signal-blue)] hover:underline" data-testid="button-service-enquire">Talk through this challenge <ArrowUpRight size={15} className="ml-2" /></button></div></div>
            </div>
          </div>
        </section>

        <section className="ns-section" aria-labelledby="industries-heading">
          <div className="ns-container">
            <div className="grid gap-8 md:grid-cols-[.78fr_1.22fr] md:items-end"><div><p className="ns-eyebrow">03 / Where we help</p><h2 id="industries-heading" className="ns-display mt-5 text-4xl font-extrabold text-[var(--ink-blue)] md:text-5xl">Context changes <span className="text-[var(--signal-blue)]">everything.</span></h2></div><p className="max-w-[490px] leading-7 text-slate-600 dark:text-slate-300">We learn the reality behind the process. That is how a solution earns adoption, protects what already works, and creates room for what comes next.</p></div>
            <div className="mt-14 grid gap-8 md:grid-cols-[.62fr_1.38fr]">
              <div className="flex gap-2 overflow-x-auto pb-2 md:block md:space-y-2">{industries.map((industry) => <button type="button" key={industry.name} onClick={() => setActiveIndustry(industry.name)} className={`ns-focus flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-bold transition-colors md:w-full ${activeIndustry === industry.name ? 'bg-[var(--ink-blue)] text-white shadow-[0_12px_25px_-18px_rgba(23,50,95,.8)]' : 'text-slate-500 hover:bg-[hsl(var(--muted))] dark:text-slate-300'}`} data-testid={`button-industry-${industry.name.toLowerCase().replaceAll(' ', '-')}`}><industry.icon size={16} /> {industry.name}</button>)}</div>
              <div className="relative min-h-[300px] overflow-hidden rounded-[28px] bg-[var(--ink-blue)] p-7 text-white md:p-10"><div className="absolute -right-14 -top-20 h-72 w-72 rounded-full border border-white/10" /><div className="absolute -right-1 top-0 h-44 w-44 rounded-full bg-cyan-400/10 blur-3xl" /><div className="relative flex h-full flex-col justify-between"><div><div className="flex items-center justify-between"><span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10"><IndustryIcon size={21} /></span><span className="font-mono-ns text-[9px] tracking-[.12em] text-blue-200">NORTHSTAR / IN CONTEXT</span></div><h3 className="ns-display mt-14 max-w-[470px] text-3xl font-extrabold md:text-4xl">{selectedIndustry.detail}</h3></div><div className="mt-12 flex items-end justify-between border-t border-white/15 pt-5"><div><p className="font-display text-3xl font-extrabold text-[#73d8d7]">{selectedIndustry.metric}</p><p className="mt-1 text-xs text-blue-100/65">{selectedIndustry.metricLabel} in a typical first phase</p></div><ArrowUpRight size={21} className="text-[#73d8d7]" /></div></div></div>
            </div>
          </div>
        </section>

        <section className="ns-section bg-[var(--ink-blue)] text-white" aria-labelledby="why-heading">
          <div className="ns-container grid gap-14 md:grid-cols-[.78fr_1.22fr]">
            <div><p className="ns-eyebrow text-[#73d8d7]">04 / Why Northstar</p><h2 id="why-heading" className="ns-display mt-5 text-4xl font-extrabold md:text-5xl">Less theatre.<br /><span className="text-[#73d8d7]">More traction.</span></h2><p className="mt-7 max-w-[340px] leading-7 text-blue-100/70">Our clients bring us the complicated bit. We bring a calm point of view and the follow-through to make it useful.</p><a href="#contact" className="mt-9 inline-flex items-center text-sm font-bold text-[#73d8d7] hover:underline" data-testid="link-why-contact">Meet your next partner <ArrowUpRight size={15} className="ml-2" /></a></div>
            <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2">{[['01', 'Business-first thinking', 'We start with the decision, not the deliverable.'], ['02', 'Senior attention', 'The people in the room stay close to the work.'], ['03', 'Visible progress', 'You always know what changed, what is next, and why.'], ['04', 'Built to last', 'We leave your team with confidence, not dependency.']].map(([number, title, body]) => <div key={number} className="border-t border-white/15 pt-5"><span className="font-mono-ns text-[10px] text-[#73d8d7]">{number}</span><h3 className="mt-5 font-display text-lg font-bold">{title}</h3><p className="mt-3 text-sm leading-6 text-blue-100/65">{body}</p></div>)}</div>
          </div>
        </section>

        <section id="approach" className="ns-section scroll-mt-16" aria-labelledby="process-heading">
          <div className="ns-container">
            <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end"><div><p className="ns-eyebrow">05 / How we work</p><h2 id="process-heading" className="ns-display mt-5 text-4xl font-extrabold text-[var(--ink-blue)] md:text-5xl">A process with <span className="text-[var(--signal-blue)]">no fog.</span></h2></div><p className="max-w-[360px] text-sm leading-6 text-slate-500 dark:text-slate-400">Small, deliberate steps. Fast feedback. A shared definition of done.</p></div>
            <div className="mt-16 grid gap-0 md:grid-cols-4">{[['01', 'Listen', 'We understand the pressure, opportunity, and people behind the brief.'], ['02', 'Focus', 'We choose the highest-leverage problem and make the trade-offs visible.'], ['03', 'Build', 'We turn the plan into something real, testing with the people who use it.'], ['04', 'Keep moving', 'We measure what changed and help your team make the next move.']].map(([number, title, body], index) => <div key={number} className="relative border-l border-[var(--line-blue)] py-2 pl-6 md:border-l-0 md:border-t md:pl-0 md:pt-7 md:pr-8"><span className="font-mono-ns text-[10px] text-[var(--signal-blue)]">{number}</span><span className="absolute -left-[4px] top-0 h-2 w-2 rounded-full bg-[var(--signal-blue)] md:left-0 md:top-[-4px]" /><h3 className="mt-5 font-display text-lg font-bold text-[var(--ink-blue)] dark:text-blue-100">{title}</h3><p className="mt-3 max-w-[215px] text-sm leading-6 text-slate-500 dark:text-slate-400">{body}</p>{index < 3 && <ArrowRight className="absolute -right-2 top-[-9px] hidden bg-[hsl(var(--background))] text-[var(--signal-blue)] md:block" size={17} />}</div>)}</div>
            <div className="mt-16 overflow-hidden rounded-[24px] border border-[var(--line-blue)] bg-[var(--ice)]/50 p-6 md:flex md:items-center md:justify-between md:p-8"><div className="flex items-center gap-4"><span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[var(--signal-blue)] shadow-sm dark:bg-slate-800"><Play size={17} fill="currentColor" /></span><div><p className="font-display text-sm font-bold text-[var(--ink-blue)] dark:text-blue-100">See the process in practice</p><p className="mt-1 text-xs text-slate-500 dark:text-slate-400">A 90-second introduction to working with Northstar.</p></div></div><button type="button" onClick={() => setContactOpen(true)} className="mt-5 inline-flex items-center text-sm font-bold text-[var(--signal-blue)] hover:underline md:mt-0" data-testid="button-play-process">Watch the introduction <ArrowUpRight size={15} className="ml-2" /></button></div>
          </div>
        </section>

        <section id="proof" className="ns-section scroll-mt-16 bg-[var(--ice)]/55 dark:bg-slate-900/30" aria-labelledby="proof-heading">
          <div className="ns-container">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="ns-eyebrow">06 / Selected outcomes</p><h2 id="proof-heading" className="ns-display mt-5 text-4xl font-extrabold text-[var(--ink-blue)] md:text-5xl">Work that carries <span className="text-[var(--signal-blue)]">weight.</span></h2></div><p className="max-w-[340px] text-sm leading-6 text-slate-500 dark:text-slate-400">A few examples of what clearer systems make possible.</p></div>
            <div className="mt-14 grid gap-5 lg:grid-cols-[1.35fr_.65fr]">
              <article className="group relative min-h-[400px] overflow-hidden rounded-[28px] bg-[#172e53] p-7 text-white md:p-10"><div className="absolute right-[-8%] top-[-15%] h-80 w-80 rounded-full border border-cyan-200/20 bg-[radial-gradient(circle,rgba(55,193,209,.26),transparent_64%)]" /><div className="absolute bottom-[-25%] left-[35%] h-72 w-72 rounded-full border border-white/10" /><div className="relative flex h-full flex-col justify-between"><div className="flex items-center justify-between"><span className="rounded-full border border-white/20 px-3 py-1.5 font-mono-ns text-[9px] tracking-widest text-cyan-100">HEALTHCARE / OPERATIONS</span><ArrowUpRight size={18} className="text-[#73d8d7] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></div><div><p className="font-mono-ns text-[10px] text-[#73d8d7]">THE CHALLENGE</p><h3 className="ns-display mt-4 max-w-[510px] text-3xl font-extrabold md:text-4xl">A national care provider made every referral count.</h3><div className="mt-8 grid gap-4 border-t border-white/15 pt-5 sm:grid-cols-3"><div><p className="font-display text-2xl font-extrabold text-[#73d8d7]">-42%</p><p className="mt-1 text-xs text-blue-100/65">time to process a referral</p></div><div><p className="font-display text-2xl font-extrabold text-[#73d8d7]">+18</p><p className="mt-1 text-xs text-blue-100/65">hours back per team / month</p></div><div><p className="font-display text-2xl font-extrabold text-[#73d8d7]">6 wks</p><p className="mt-1 text-xs text-blue-100/65">to first measurable impact</p></div></div></div></div></article>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1"><article className="rounded-[28px] border border-[var(--line-blue)] bg-white p-7 dark:bg-slate-900"><span className="font-mono-ns text-[9px] tracking-widest text-[var(--signal-blue)]">PROFESSIONAL SERVICES</span><h3 className="mt-10 font-display text-xl font-bold text-[var(--ink-blue)] dark:text-blue-100">From scattered expertise to one confident client journey.</h3><p className="mt-4 text-sm leading-6 text-slate-500 dark:text-slate-400">A connected experience helped a 300-person advisory firm respond with more relevance and less rework.</p><span className="mt-7 flex items-center gap-2 text-sm font-bold text-[var(--signal-blue)]">2.4× faster proposals <ArrowUpRight size={14} /></span></article><article className="rounded-[28px] border border-[var(--line-blue)] bg-white p-7 dark:bg-slate-900"><span className="font-mono-ns text-[9px] tracking-widest text-[var(--signal-blue)]">MANUFACTURING</span><h3 className="mt-10 font-display text-xl font-bold text-[var(--ink-blue)] dark:text-blue-100">A live view of the work made delays visible sooner.</h3><p className="mt-4 text-sm leading-6 text-slate-500 dark:text-slate-400">A shared operational picture gave leaders the confidence to act before small issues became expensive ones.</p><span className="mt-7 flex items-center gap-2 text-sm font-bold text-[var(--signal-blue)]">18% fewer delays <ArrowUpRight size={14} /></span></article></div>
             </div>
             <article className="mt-5 grid overflow-hidden rounded-[28px] border border-[var(--line-blue)] bg-white dark:bg-slate-900 md:grid-cols-[.9fr_1.1fr]">
               <div className="relative min-h-[300px] overflow-hidden">
                 <img src={roboticsDetailImage} alt="Precision robotic gripper handling a miniature urban model beside an autonomous mobile robot" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-center" />
               </div>
               <div className="p-7 md:p-10">
                 <div className="flex items-center justify-between"><span className="font-mono-ns text-[9px] tracking-widest text-[var(--signal-blue)]">PHYSICAL OPERATIONS / CONTROLLED SCALE</span><ArrowUpRight size={18} className="text-[var(--signal-blue)]" /></div>
                 <h3 className="ns-display mt-10 max-w-[470px] text-3xl font-extrabold text-[var(--ink-blue)] dark:text-blue-100 md:text-4xl">When intelligence leaves the screen, consistency matters even more.</h3>
                 <p className="mt-5 max-w-[500px] text-sm leading-7 text-slate-600 dark:text-slate-300">We help operations leaders identify where robotics can reduce manual handling, improve safety, and create a more predictable service—without pretending the machine owns the decision.</p>
                 <div className="mt-8 grid gap-3 border-t border-[var(--line-blue)] pt-5 sm:grid-cols-3"><div><p className="font-display text-lg font-extrabold text-[var(--signal-blue)]">Safer</p><p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">repeatable movement</p></div><div><p className="font-display text-lg font-extrabold text-[var(--signal-blue)]">Steadier</p><p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">operational quality</p></div><div><p className="font-display text-lg font-extrabold text-[var(--signal-blue)]">Visible</p><p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">human ownership</p></div></div>
               </div>
             </article>
           </div>
         </section>
 
         <section className="ns-section" aria-labelledby="testimonials-heading">
          <div className="ns-container">
            <div className="grid gap-10 md:grid-cols-[.65fr_1.35fr] md:items-end"><div><p className="ns-eyebrow">07 / In their words</p><h2 id="testimonials-heading" className="ns-display mt-5 text-4xl font-extrabold text-[var(--ink-blue)] md:text-5xl">A partner who <span className="text-[var(--signal-blue)]">gets it.</span></h2></div><div className="flex gap-2 text-[#f0ad4f]" aria-label="Five out of five stars"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span><span className="ml-2 font-mono-ns text-[10px] tracking-wider text-slate-400">CLIENTS / 2024–25</span></div></div>
            <div className="mt-14 grid gap-5 md:grid-cols-3"><article className="rounded-[24px] border border-[var(--line-blue)] bg-white p-7 dark:bg-slate-900"><Quote size={22} className="text-[var(--signal-blue)]" /><p className="mt-8 text-[17px] leading-7 text-[var(--ink-blue)] dark:text-blue-100">“Northstar gave us the confidence to make a difficult decision. The work was sharp, but the real difference was how understood we felt.”</p><div className="mt-9 border-t border-[var(--line-blue)] pt-4"><p className="font-display text-sm font-bold text-[var(--ink-blue)] dark:text-blue-100">Elena Morris</p><p className="mt-1 text-xs text-slate-500">Chief Operating Officer, Wellstead</p></div></article><article className="rounded-[24px] bg-[var(--ink-blue)] p-7 text-white md:translate-y-[-18px]"><Quote size={22} className="text-[#73d8d7]" /><p className="mt-8 text-[17px] leading-7 text-blue-50">“We stopped talking about transformation as a project. It became a better way of making decisions every week.”</p><div className="mt-9 border-t border-white/15 pt-4"><p className="font-display text-sm font-bold">Marcus Iqbal</p><p className="mt-1 text-xs text-blue-100/60">Managing Director, Kindred Advisory</p></div></article><article className="rounded-[24px] border border-[var(--line-blue)] bg-white p-7 dark:bg-slate-900"><Quote size={22} className="text-[var(--signal-blue)]" /><p className="mt-8 text-[17px] leading-7 text-[var(--ink-blue)] dark:text-blue-100">“The team brought structure without slowing us down. Within a month, our people could see where the business was heading.”</p><div className="mt-9 border-t border-[var(--line-blue)] pt-4"><p className="font-display text-sm font-bold text-[var(--ink-blue)] dark:text-blue-100">James Rowe</p><p className="mt-1 text-xs text-slate-500">Operations Director, Harlow Works</p></div></article></div>
          </div>
        </section>

        <section className="ns-section bg-[var(--ice)]/55 dark:bg-slate-900/30" aria-labelledby="faq-heading">
          <div className="ns-container grid gap-12 md:grid-cols-[.72fr_1.28fr]"><div><p className="ns-eyebrow">08 / Good questions</p><h2 id="faq-heading" className="ns-display mt-5 text-4xl font-extrabold text-[var(--ink-blue)] md:text-5xl">No mystery, just <span className="text-[var(--signal-blue)]">momentum.</span></h2><p className="mt-6 max-w-[310px] text-sm leading-6 text-slate-500 dark:text-slate-400">If your question is not here, bring it to the first conversation. We will give you a straight answer.</p><a href="#contact" className="mt-8 inline-flex items-center text-sm font-bold text-[var(--signal-blue)]" data-testid="link-faq-contact">Ask us directly <ArrowUpRight size={15} className="ml-2" /></a></div><div className="divide-y divide-[var(--line-blue)] border-y border-[var(--line-blue)]">{faqs.map((faq, index) => <div key={faq.question}><button type="button" onClick={() => setOpenFaq(openFaq === index ? -1 : index)} className="ns-focus flex w-full items-center justify-between gap-5 py-5 text-left" aria-expanded={openFaq === index} data-testid={`button-faq-${index}`}><span className="font-display text-[15px] font-bold text-[var(--ink-blue)] dark:text-blue-100">{faq.question}</span><span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--line-blue)] text-[var(--signal-blue)] transition-transform ${openFaq === index ? 'rotate-45' : ''}`}><Plus size={15} /></span></button>{openFaq === index && <p className="ns-faq-answer max-w-[680px] pb-5 pr-12 text-sm leading-6 text-slate-500 dark:text-slate-400">{faq.answer}</p>}</div>)}</div></div>
        </section>

        <section id="contact" className="ns-section scroll-mt-16" aria-labelledby="contact-heading">
          <div className="ns-container overflow-hidden rounded-[30px] bg-[var(--ink-blue)] text-white shadow-[0_24px_70px_-35px_rgba(23,50,95,.75)]"><div className="grid gap-12 p-7 md:grid-cols-[.9fr_1.1fr] md:p-12 lg:p-16"><div><p className="ns-eyebrow text-[#73d8d7]">09 / Let’s find the signal</p><h2 id="contact-heading" className="ns-display mt-5 text-4xl font-extrabold md:text-5xl">Bring us the knot.<br /><span className="text-[#73d8d7]">Leave with a path.</span></h2><p className="mt-6 max-w-[390px] leading-7 text-blue-100/70">Tell us what is getting in the way. We will come prepared, keep it practical, and never pressure you into a bigger answer than you need.</p><div className="mt-10 space-y-4 text-sm text-blue-100/85"><a href="mailto:hello@northstar.consulting" className="flex items-center gap-3 hover:text-white" data-testid="link-contact-email"><Mail size={16} className="text-[#73d8d7]" /> hello@northstar.consulting</a><a href="tel:+441612401840" className="flex items-center gap-3 hover:text-white" data-testid="link-contact-phone"><Phone size={16} className="text-[#73d8d7]" /> +44 (0) 161 240 1840</a><span className="flex items-center gap-3"><MapPin size={16} className="text-[#73d8d7]" /> Manchester · Working worldwide</span></div></div><div className="rounded-[24px] border border-white/15 bg-white/[.06] p-5 backdrop-blur-md md:p-7">{formSent ? <div className="flex min-h-[350px] flex-col items-center justify-center text-center"><span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#73d8d7] text-[var(--ink-blue)]"><Check size={24} strokeWidth={3} /></span><h3 className="mt-6 font-display text-2xl font-bold">The first step is in motion.</h3><p className="mt-3 max-w-[310px] text-sm leading-6 text-blue-100/70">Thanks for reaching out. A member of our team will be in touch within one working day.</p><button type="button" onClick={() => setFormSent(false)} className="mt-7 text-sm font-bold text-[#73d8d7] hover:underline" data-testid="button-reset-contact">Send another message</button></div> : <form onSubmit={handleConsultation} className="grid gap-4" aria-label="Book a consultation"><div className="grid gap-4 sm:grid-cols-2"><label className="grid gap-2 text-xs font-semibold text-blue-100/75">Your name<input required name="name" type="text" placeholder="Jane Smith" className="ns-focus mt-1 rounded-xl border border-white/15 bg-white/[.08] px-3.5 py-3 text-sm text-white outline-none placeholder:text-blue-100/35 focus:border-[#73d8d7]" data-testid="input-contact-name" /></label><label className="grid gap-2 text-xs font-semibold text-blue-100/75">Work email<input required name="email" type="email" placeholder="jane@company.com" className="ns-focus mt-1 rounded-xl border border-white/15 bg-white/[.08] px-3.5 py-3 text-sm text-white outline-none placeholder:text-blue-100/35 focus:border-[#73d8d7]" data-testid="input-contact-email" /></label></div><label className="grid gap-2 text-xs font-semibold text-blue-100/75">What would you like to make easier?<textarea required name="message" rows={4} placeholder="A little context helps us make the first conversation useful." className="ns-focus mt-1 resize-none rounded-xl border border-white/15 bg-white/[.08] px-3.5 py-3 text-sm text-white outline-none placeholder:text-blue-100/35 focus:border-[#73d8d7]" data-testid="input-contact-message" /></label><button type="submit" className="ns-btn mt-2 inline-flex items-center justify-center rounded-xl bg-[#73d8d7] px-5 py-3.5 text-sm font-bold text-[var(--ink-blue)] hover:bg-white" data-testid="button-submit-contact">Book a free consultation <ArrowUpRight size={16} className="ml-2" /></button><p className="text-center text-[10px] text-blue-100/45">Usually replies within one working day. No sales sequence.</p></form>}</div></div></div>
        </section>
      </main>

      <footer className="border-t border-[var(--line-blue)] pt-12">
        <div className="ns-container"><div className="grid gap-10 pb-12 md:grid-cols-[1.3fr_.7fr_.7fr_1fr]"><div><a href="#top" className="flex items-center gap-2.5" data-testid="link-footer-brand"><IconMark /><span className="font-display text-[17px] font-extrabold tracking-[-.055em] text-[var(--ink-blue)] dark:text-blue-100">northstar<span className="text-[var(--signal-blue)]">.</span></span></a><p className="mt-5 max-w-[240px] text-sm leading-6 text-slate-500 dark:text-slate-400">A clearer path from business friction to measurable progress.</p><a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="mt-6 inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--line-blue)] text-slate-500 hover:text-[var(--signal-blue)]" aria-label="Northstar on LinkedIn" data-testid="link-linkedin"><Linkedin size={14} /></a></div><div><p className="font-mono-ns text-[9px] tracking-widest text-slate-400">EXPLORE</p><div className="mt-5 grid gap-3 text-sm font-semibold text-slate-600 dark:text-slate-300"><a href="#about" data-testid="link-footer-about">About</a><a href="#services" data-testid="link-footer-services">Services</a><a href="#ai" data-testid="link-footer-ai">AI & robotics</a><a href="#proof" data-testid="link-footer-proof">Selected work</a><a href="#approach" data-testid="link-footer-approach">Our approach</a></div></div><div><p className="font-mono-ns text-[9px] tracking-widest text-slate-400">CONNECT</p><div className="mt-5 grid gap-3 text-sm font-semibold text-slate-600 dark:text-slate-300"><a href="#contact" data-testid="link-footer-contact">Contact</a><a href="#contact" data-testid="link-footer-careers">Careers</a><a href="#contact" data-testid="link-footer-privacy">Privacy</a><a href="#contact" data-testid="link-footer-terms">Terms</a></div></div><div><p className="font-mono-ns text-[9px] tracking-widest text-slate-400">THE NORTHSTAR NOTE</p><p className="mt-5 text-sm leading-6 text-slate-500 dark:text-slate-400">A considered note on making progress in a noisy world. Once a month, never a broadcast.</p>{newsletterSent ? <p className="mt-5 flex items-center gap-2 text-sm font-bold text-[#159b7f]" data-testid="status-newsletter-success"><Check size={15} /> You’re on the list.</p> : <form onSubmit={handleNewsletter} className="mt-5 flex gap-2"><label htmlFor="newsletter-email" className="sr-only">Email address</label><input required id="newsletter-email" type="email" placeholder="you@company.com" className="ns-focus min-w-0 flex-1 rounded-xl border border-[var(--line-blue)] bg-white px-3 py-2.5 text-xs outline-none placeholder:text-slate-400 dark:bg-slate-900" data-testid="input-newsletter-email" /><button type="submit" aria-label="Subscribe to newsletter" className="ns-btn inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--ink-blue)] text-white hover:bg-[var(--signal-blue)]" data-testid="button-newsletter-submit"><ArrowUpRight size={15} /></button></form>}</div></div><div className="flex flex-col gap-3 border-t border-[var(--line-blue)] py-6 text-[11px] text-slate-400 sm:flex-row sm:items-center sm:justify-between"><span>© 2025 Northstar Consulting Ltd.</span><span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#20b694]" /> Calm systems. Meaningful progress.</span></div></div>
      </footer>

      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
        {contactOpen && <div className="ns-glass ns-card-shadow grid w-52 gap-2 rounded-2xl border border-[var(--line-blue)] p-2"><a href="mailto:hello@northstar.consulting" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-bold text-[var(--ink-blue)] hover:bg-[hsl(var(--muted))] dark:text-blue-100" data-testid="link-floating-email"><Mail size={15} className="text-[var(--signal-blue)]" /> Email Northstar</a><a href="tel:+441612401840" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-bold text-[var(--ink-blue)] hover:bg-[hsl(var(--muted))] dark:text-blue-100" data-testid="link-floating-phone"><Phone size={15} className="text-[var(--signal-blue)]" /> Call the studio</a><a href="#contact" onClick={() => setContactOpen(false)} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-bold text-[var(--ink-blue)] hover:bg-[hsl(var(--muted))] dark:text-blue-100" data-testid="link-floating-book"><MessageCircle size={15} className="text-[var(--signal-blue)]" /> Book a conversation</a></div>}<button type="button" onClick={() => setContactOpen(!contactOpen)} className="ns-btn flex h-12 items-center gap-2 rounded-full bg-[var(--signal-blue)] px-4 text-xs font-bold text-white shadow-[0_15px_30px_-12px_rgba(13,95,212,.65)] hover:bg-[var(--ink-blue)]" aria-label="Open contact options" data-testid="button-floating-contact">{contactOpen ? <X size={17} /> : <MessageCircle size={17} />}<span className="hidden sm:inline">{contactOpen ? 'Close' : 'Let’s talk'}</span></button>
      </div>

      {cookieVisible && <div className="fixed bottom-5 left-5 z-40 max-w-[340px] rounded-2xl border border-[var(--line-blue)] bg-white/95 p-4 shadow-[0_20px_50px_-25px_rgba(23,50,95,.45)] backdrop-blur-md dark:bg-slate-900/95"><div className="flex gap-3"><span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[var(--ice)] text-[var(--signal-blue)]"><ShieldCheck size={15} /></span><div><p className="font-display text-xs font-bold text-[var(--ink-blue)] dark:text-blue-100">A small note about cookies</p><p className="mt-1 text-[11px] leading-5 text-slate-500 dark:text-slate-400">We use essential cookies to keep this site working. No tracking maze.</p><div className="mt-3 flex items-center gap-4"><button type="button" onClick={() => setCookieVisible(false)} className="text-[11px] font-bold text-[var(--signal-blue)]" data-testid="button-cookie-accept">That’s fine</button><button type="button" onClick={() => setCookieVisible(false)} className="text-[11px] font-semibold text-slate-400" data-testid="button-cookie-dismiss">Not now</button></div></div></div></div>}

      {contactOpen && <div className="fixed inset-0 z-30 bg-slate-950/10 backdrop-blur-[1px] sm:hidden" onClick={() => setContactOpen(false)} aria-hidden="true" />}
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;