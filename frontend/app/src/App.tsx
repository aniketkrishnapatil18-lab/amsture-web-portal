import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { Route, Switch, Router as WouterRouter } from "wouter";
import {
  ArrowRight, ArrowUpRight, BarChart3, Bot, BrainCircuit,
  Check, ChevronDown, Cloud, Compass, FileText, Globe2,
  Layers3, Linkedin, Mail, MapPin, Menu, MessageCircle,
  Network, Phone, Plus, Quote, Search, ShieldCheck,
  Sparkles, Star, Target, TrendingUp, Users, X, Zap,
  Building2, Code2, Database, Settings, Smartphone, HeartHandshake,
  Award as Trophy, Calendar, Cpu, Activity, Shield,
} from "lucide-react";
import heroImage from "@assets/generated_images/nexovate-hero.png";
import aiImage from "@assets/generated_images/nexovate-ai.png";
import aniketImage from "@assets/generated_images/aniket-patil.jpg";
import shrutikaImage from "@assets/generated_images/shrutika-salunke.jpg";
import mayurImage from "@assets/generated_images/mayur-deshmukh.jpg";
import amstureLogo from "@assets/generated_images/amsture-logo.jpg";
import { FormEvent, useEffect, useState } from "react";

const queryClient = new QueryClient();

/* ─── Data ─── */
const services = [
  { id: "web", icon: Globe2, title: "Business Websites", problem: "Outdated sites that fail to convert visitors.", solution: "Fast, elegant, SEO-first websites engineered for growth.", benefit: "More qualified leads and a brand that earns trust." },
  { id: "apps", icon: Code2, title: "Custom Business Applications", problem: "Manual workflows slowing your team down.", solution: "Tailored software built precisely around your operations.", benefit: "Hours saved weekly and fewer costly errors." },
  { id: "mobile", icon: Smartphone, title: "Mobile Applications", problem: "No mobile presence hurting customer reach.", solution: "Native iOS & Android apps with exceptional UX.", benefit: "Broader reach and higher customer engagement." },
  { id: "erp", icon: Database, title: "ERP Solutions", problem: "Disconnected systems creating blind spots.", solution: "Unified ERP connecting every department in real time.", benefit: "Complete operational visibility and control." },
  { id: "crm", icon: Users, title: "CRM Solutions", problem: "Customer data scattered across spreadsheets.", solution: "Centralised CRM built around your sales process.", benefit: "More deals closed and better client retention." },
  { id: "ai", icon: BrainCircuit, title: "AI Automation", problem: "Repetitive tasks consuming your team's best hours.", solution: "Intelligent automation that handles the routine for you.", benefit: "Your team focused on decisions, not data entry." },
  { id: "process", icon: Settings, title: "Process Automation", problem: "Manual, error-prone business processes.", solution: "End-to-end workflow automation mapped to your business.", benefit: "Fewer errors and measurable time savings every week." },
  { id: "dashboards", icon: BarChart3, title: "Business Dashboards", problem: "No real-time visibility into business performance.", solution: "Custom dashboards surfacing the KPIs that matter most.", benefit: "Faster, more confident decisions across every team." },
  { id: "cloud", icon: Cloud, title: "Cloud Solutions", problem: "Scaling infrastructure is slow and expensive.", solution: "Cloud migration and architecture optimised for growth.", benefit: "99.9% uptime, lower costs, and effortless scalability." },
  { id: "consulting", icon: Target, title: "Business Consulting", problem: "Uncertain which technology investments to prioritise.", solution: "Senior strategic advice connected directly to execution.", benefit: "A clear roadmap and the confidence to move forward." },
  { id: "maintenance", icon: ShieldCheck, title: "Software Maintenance", problem: "Systems falling behind, security risks growing.", solution: "Proactive support, monitoring and continuous improvement.", benefit: "Your technology stays secure, current and performing." },
  { id: "transformation", icon: Compass, title: "Digital Transformation", problem: "Fragmented tools creating friction across the business.", solution: "A connected operating model your team will actually use.", benefit: "A business that runs lighter and grows faster." },
];

const industries = [
  { name: "Healthcare", icon: HeartHandshake, stat: "31%", label: "less admin time", body: "Give care teams more time for patients and less time on paperwork with intelligent systems built for compliance and speed." },
  { name: "Education", icon: FileText, stat: "43k", label: "hours returned annually", body: "Streamline enrolment, learning management and reporting so your institution can focus on student outcomes." },
  { name: "Manufacturing", icon: Layers3, stat: "18%", label: "fewer production delays", body: "Connect the shop floor to the boardroom with live operational data and automated quality control." },
  { name: "Retail", icon: Sparkles, stat: "26%", label: "more repeat customers", body: "Personalise every customer experience while streamlining your inventory, loyalty and operations." },
  { name: "Real Estate", icon: Building2, stat: "2.1x", label: "faster deal closings", body: "Digitise your property pipeline from first enquiry to signed contract with intelligent CRM and document workflows." },
  { name: "Finance", icon: TrendingUp, stat: "40%", label: "faster reporting", body: "Build compliant, intelligent systems your clients trust with their money — from onboarding to reporting." },
  { name: "Professional Services", icon: Network, stat: "2.4x", label: "faster proposals", body: "From scattered expertise to one confident client journey — with connected CRM, proposals and delivery tracking." },
];

const faqs = [
  { q: "How long does a typical project take?", a: "Most engagements run 4–12 weeks depending on scope. Discovery usually takes two weeks, and we share a clear milestone roadmap so you always know what comes next." },
  { q: "How does pricing work?", a: "We offer transparent fixed-scope and retainer models. You receive a detailed proposal with no hidden costs after a free consultation." },
  { q: "Do you work with our existing team?", a: "Yes. Amsture Technologies works alongside your internal team and existing partners with a clear ownership model from day one." },
  { q: "What does post-launch support look like?", a: "Every project includes a handover period and close support. We offer flexible maintenance and continuous improvement plans." },
  { q: "How do you approach AI projects responsibly?", a: "We start with the business goal, not the tool. Every AI workflow is scoped around privacy, review points and explainability." },
  { q: "What happens during the discovery phase?", a: "Discovery is a focused working session to map your friction, understand your priorities and identify the smallest valuable next step." },
];

const testimonials = [
  { quote: "Amsture Technologies gave us the confidence to make a difficult technology decision. The work was sharp, but the real difference was how understood we felt throughout.", name: "Elena Morris", role: "COO, Wellstead Group", stars: 5 },
  { quote: "We stopped talking about transformation as a project. It became a better way of making decisions every week. Productivity improved 35% in the first quarter.", name: "Marcus Iqbal", role: "MD, Kindred Advisory", stars: 5, featured: true },
  { quote: "The team brought structure without slowing us down. Within a month our people could see where the business was heading.", name: "Priya Sharma", role: "Operations Director, Harlow Works", stars: 5 },
];

/* ── EXACTLY THREE LEADERS: ANIKET PATIL (FOUNDER), SHRUTIKA SALUNKE (CO-FOUNDER) & MAYUR DESHMUKH (CEO) ── */
const executiveTeam = [
  {
    name: "Aniket Patil",
    role: "Founder & Owner",
    tag: "FOUNDER & OWNER",
    img: aniketImage,
    bio: "Pioneered Amsture Technologies' founding vision with hands-on expertise in modern software development, cloud infrastructure, and DevOps automation.",
    highlights: ["Software Engineering", "DevOps Specialist", "Cloud Infrastructure"],
    linkedin: "https://linkedin.com",
    email: "aniket.patil@amsture.com",
  },
  {
    name: "Shrutika Salunke",
    role: "Co-Founder & Frontend Tech Lead",
    tag: "CO-FOUNDER",
    img: shrutikaImage,
    bio: "Co-founded Amsture Technologies to build high-performance, responsive web applications with expertise in modern UI tools, design systems, and frontend engineering.",
    highlights: ["Frontend Engineering", "UI Tools Expert", "Software Development"],
    linkedin: "https://linkedin.com",
    email: "shrutika.salunke@amsture.com",
  },
  {
    name: "Mayur Deshmukh",
    role: "Chief Executive Officer (CEO)",
    tag: "CEO",
    img: mayurImage,
    bio: "Drives commercial strategy, technology execution, and AI solutions with deep expertise in software development, AI/ML engineering, and Python automation.",
    highlights: ["Software Development", "AI / ML Expert", "Python Specialist"],
    linkedin: "https://linkedin.com",
    email: "mayur.deshmukh@amsture.com",
  },
];

const tickerItems = ["Digital Strategy", "Business Websites", "AI Automation", "ERP Systems", "Cloud Migration", "CRM Solutions", "Process Automation", "Mobile Apps"];

/* ─── Refined Robotics Animated HUD Background Component ─── */
function RoboticsHeaderAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-40">
      <svg className="w-full h-full" viewBox="0 0 1200 700" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="hudGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0066ff" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0066ff" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Radial HUD Glow centered behind hero header */}
        <circle cx="600" cy="320" r="380" fill="url(#hudGlow)" />

        {/* Rotating Outer HUD Ring */}
        <g className="nv-robotics-hud-ring-1" style={{ transformOrigin: "600px 320px" }}>
          <circle cx="600" cy="320" r="300" stroke="#0066ff" strokeWidth="1.5" strokeDasharray="12 8 4 8" opacity="0.5" />
          <circle cx="600" cy="320" r="270" stroke="#00d4e8" strokeWidth="1" strokeDasharray="40 10 10 10" opacity="0.4" />
          <circle cx="900" cy="320" r="5" fill="#0066ff" className="nv-robotics-node" />
          <circle cx="300" cy="320" r="5" fill="#00d4e8" className="nv-robotics-node" />
        </g>

        {/* Counter Rotating Mid Ring */}
        <g className="nv-robotics-hud-ring-2" style={{ transformOrigin: "600px 320px" }}>
          <circle cx="600" cy="320" r="220" stroke="#0066ff" strokeWidth="2" strokeDasharray="80 30" opacity="0.4" />
          <circle cx="600" cy="320" r="195" stroke="#00d4e8" strokeWidth="1" strokeDasharray="6 6" opacity="0.5" />
          <line x1="380" y1="320" x2="820" y2="320" stroke="#0066ff" strokeWidth="1" opacity="0.25" />
          <line x1="600" y1="100" x2="600" y2="540" stroke="#0066ff" strokeWidth="1" opacity="0.25" />
        </g>

        {/* Inner Fast HUD Target Ring */}
        <g className="nv-robotics-hud-ring-3" style={{ transformOrigin: "600px 320px" }}>
          <circle cx="600" cy="320" r="140" stroke="#0066ff" strokeWidth="2" strokeDasharray="20 40 10 30" opacity="0.6" />
          <circle cx="600" cy="320" r="100" stroke="#00d4e8" strokeWidth="1.5" opacity="0.5" />
        </g>

        {/* Robotic Circuit Vector Arm Traces */}
        <g opacity="0.55">
          <path d="M100 140 L280 140 L380 240 L580 240" stroke="#0066ff" strokeWidth="2" className="nv-circuit-line" />
          <circle cx="100" cy="140" r="5" fill="#0066ff" className="nv-robotics-node" />
          <circle cx="280" cy="140" r="4" fill="#00d4e8" />
          <circle cx="380" cy="240" r="5" fill="#0066ff" className="nv-robotics-node" />
          <circle cx="580" cy="240" r="6" fill="#00d4e8" className="nv-robotics-node" />

          <path d="M620 520 L800 520 L900 400 L1100 400" stroke="#00d4e8" strokeWidth="1.5" className="nv-circuit-line" />
          <circle cx="620" cy="520" r="5" fill="#00d4e8" className="nv-robotics-node" />
          <circle cx="900" cy="400" r="4" fill="#0066ff" />
          <circle cx="1100" cy="400" r="6" fill="#0066ff" className="nv-robotics-node" />
        </g>

        {/* Target Reticle Precision Lines */}
        <g opacity="0.75">
          <path d="M585 305 L595 305 L595 315" stroke="#0066ff" strokeWidth="2" fill="none" />
          <path d="M615 305 L605 305 L605 315" stroke="#0066ff" strokeWidth="2" fill="none" />
          <path d="M585 335 L595 335 L595 325" stroke="#0066ff" strokeWidth="2" fill="none" />
          <path d="M615 335 L605 335 L605 325" stroke="#0066ff" strokeWidth="2" fill="none" />
          <circle cx="600" cy="320" r="3" fill="#00d4e8" />
        </g>
      </svg>
    </div>
  );
}

/* ─── Hooks ─── */
function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return progress;
}

function useScrolled() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return scrolled;
}

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    const elements = document.querySelectorAll(".nv-reveal");
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/* ─── Animated Logo ─── */
function Logo() {
  return (
    <a href="#top" className="flex items-center gap-2.5 no-underline shrink-0 group py-0.5">
      {/* Sleek Official AT Emblem Icon Box */}
      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white p-0.5 border border-slate-200/90 shadow-sm flex items-center justify-center shrink-0 transition-transform group-hover:scale-105">
        <img
          src={amstureLogo}
          alt="Amsture Technologies Logo"
          className="w-full h-full object-contain rounded-lg"
        />
      </div>
      {/* Brand Text Name */}
      <div className="flex items-center gap-1 text-[18px] sm:text-[19px] font-black tracking-tight text-[#0a0a0a] leading-none">
        <span className="font-extrabold text-[#0a0a0a]">Amsture</span>
        <span className="text-blue-600 font-extrabold">Technologies</span>
        <span className="nv-logo-dot text-blue-600">.</span>
      </div>
    </a>
  );
}

/* ─── Floating Header ─── */
function Header() {
  const scrolled = useScrolled();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <header className={`nv-nav-pill ${scrolled ? "scrolled" : ""}`}>
        <Logo />

        <nav className="hidden lg:flex items-center gap-7">
          <a href="#about" className="nv-nav-link">About</a>
          <a href="#services" className="nv-nav-link">Services</a>
          <a href="#leadership" className="nv-nav-link">Leadership</a>
          <a href="#industries" className="nv-nav-link">Industries</a>
          <a href="#process" className="nv-nav-link">Process</a>
          <a href="#work" className="nv-nav-link">Work</a>
          <a href="#faq" className="nv-nav-link">FAQ</a>
        </nav>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="nv-icon-btn hidden sm:inline-flex hover:scale-105 transition-transform"
            aria-label="Search site"
          >
            <Search size={16} />
          </button>
          <a href="#contact" className="nv-book-btn">
            Book a call <ArrowUpRight size={14} />
          </a>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="nv-icon-btn lg:hidden ml-1"
            aria-label="Menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Search Modal Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-24 px-4">
          <div className="bg-white border border-slate-200 w-full max-w-xl rounded-2xl p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X size={20} />
            </button>
            <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
              <img src={amstureLogo} alt="Amsture Technologies Logo" className="w-7 h-7 rounded-md object-contain shrink-0 border border-slate-100 shadow-xs" />
              <Search size={18} className="text-blue-600 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Amsture Technologies services, solutions, leadership team..."
                className="w-full bg-transparent border-none outline-none text-base text-slate-900 placeholder:text-slate-400"
                autoFocus
              />
            </div>
            <div className="mt-4 text-xs text-slate-400">
              Popular searches: <span className="text-blue-600 font-semibold cursor-pointer" onClick={() => { setSearchQuery("AI Automation"); setSearchOpen(false); window.location.href = "#services"; }}>AI Automation</span>, <span className="text-blue-600 font-semibold cursor-pointer" onClick={() => { setSearchQuery("Leadership"); setSearchOpen(false); window.location.href = "#leadership"; }}>Leadership</span>, <span className="text-blue-600 font-semibold cursor-pointer" onClick={() => { setSearchQuery("ERP"); setSearchOpen(false); window.location.href = "#services"; }}>ERP Systems</span>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="nv-mobile-menu">
          <button type="button" onClick={() => setMobileOpen(false)} className="absolute top-6 right-6 nv-icon-btn">
            <X size={22} />
          </button>
          <a href="#about" onClick={() => setMobileOpen(false)} className="nv-mobile-link">About</a>
          <a href="#services" onClick={() => setMobileOpen(false)} className="nv-mobile-link">Services</a>
          <a href="#leadership" onClick={() => setMobileOpen(false)} className="nv-mobile-link">Leadership</a>
          <a href="#industries" onClick={() => setMobileOpen(false)} className="nv-mobile-link">Industries</a>
          <a href="#process" onClick={() => setMobileOpen(false)} className="nv-mobile-link">Process</a>
          <a href="#work" onClick={() => setMobileOpen(false)} className="nv-mobile-link">Work</a>
          <a href="#faq" onClick={() => setMobileOpen(false)} className="nv-mobile-link">FAQ</a>
          <a href="#contact" onClick={() => setMobileOpen(false)} className="nv-cta-primary mt-4">
            Book a Free Consultation <ArrowRight size={16} />
          </a>
        </div>
      )}
    </>
  );
}

/* ─── Main Page ─── */
function Home() {
  const [activeIndustry, setActiveIndustry] = useState(industries[0].name);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formSent, setFormSent] = useState(false);
  const [cookieClosed, setCookieClosed] = useState(false);
  const progress = useScrollProgress();
  useScrollReveal();

  useEffect(() => {
    document.documentElement.classList.remove("dark");
  }, []);

  const handleForm = (e: FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  const currentInd = industries.find((i) => i.name === activeIndustry) || industries[0];
  const IndIcon = currentInd.icon;

  return (
    <div id="top" className="relative">
      <div className="nv-progress" style={{ width: `${progress}%` }} />
      <Header />

      <main>
        {/* ── HERO SECTION (CENTERED & PROPER WITHOUT SECOND IMAGE CARD) ── */}
        <section className="nv-hero relative overflow-hidden min-h-[75vh] flex items-center justify-center pt-28 pb-16">
          {/* Animated Robotics Cybernetic HUD & Circuit Background */}
          <RoboticsHeaderAnimation />

          <div className="nv-hero-bg" />
          <div className="nv-wrap relative z-10 max-w-4xl mx-auto text-center">
            <div className="nv-reveal flex flex-col items-center">
              <div className="nv-hero-badge bg-white/95 backdrop-blur-md shadow-sm border border-blue-200/80 mb-6 inline-flex">
                <Sparkles size={14} className="text-blue-600" />
                <span>IT Services & AI Solutions</span>
              </div>

              <h1 className="nv-hero-h1 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#0a0a0a] tracking-tight leading-[1.08] mb-6">
                Technology that <span className="nv-blue-word text-blue-600">grows</span> your business.
              </h1>

              <p className="nv-hero-sub text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8">
                We turn complex technology into simple business outcomes — custom software, AI automation, and cloud solutions engineered to drive measurable growth and ROI.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
                <a href="#contact" className="nv-cta-primary text-base px-8 py-3.5">
                  Book a Free Consultation <ArrowRight size={18} />
                </a>
                <a href="#services" className="nv-cta-secondary text-base px-8 py-3.5">
                  View Our Services
                </a>
              </div>

              {/* Quick High-Impact Metrics Bar replacing the 2nd image */}
              <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-xl max-w-3xl">
                <div className="p-2 text-center border-r border-slate-100 last:border-r-0">
                  <div className="text-2xl font-black text-blue-600">240+</div>
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">Projects Delivered</div>
                </div>
                <div className="p-2 text-center border-r border-slate-100 last:border-r-0">
                  <div className="text-2xl font-black text-blue-600">98%</div>
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">Client Retention</div>
                </div>
                <div className="p-2 text-center border-r border-slate-100 last:border-r-0">
                  <div className="text-2xl font-black text-blue-600">40%</div>
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">Avg Efficiency Gain</div>
                </div>
                <div className="p-2 text-center">
                  <div className="text-2xl font-black text-blue-600">24/7</div>
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">Proactive Support</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── TICKER STRIP ── */}
        <section className="nv-ticker">
          <div className="nv-ticker-inner">
            {[...tickerItems, ...tickerItems, ...tickerItems].map((item, idx) => (
              <span key={idx} className="nv-ticker-item">
                {item} <span className="nv-ticker-sep">✦</span>
              </span>
            ))}
          </div>
        </section>

        {/* ── STATS SECTION ── */}
        <section className="nv-section bg-white">
          <div className="nv-wrap">
            <div className="nv-stats-grid nv-reveal">
              <div className="nv-stat-card">
                <div className="nv-stat-num">240+</div>
                <div className="nv-stat-label">Projects delivered</div>
              </div>
              <div className="nv-stat-card">
                <div className="nv-stat-num">98%</div>
                <div className="nv-stat-label">Client retention</div>
              </div>
              <div className="nv-stat-card">
                <div className="nv-stat-num">14</div>
                <div className="nv-stat-label">Industries served</div>
              </div>
              <div className="nv-stat-card">
                <div className="nv-stat-num">40%</div>
                <div className="nv-stat-label">Avg. efficiency gain</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── ABOUT SECTION ── */}
        <section id="about" className="nv-section">
          <div className="nv-wrap">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-5 nv-reveal">
                <div className="nv-eyebrow">ABOUT AMSTURE TECHNOLOGIES</div>
                <h2 className="nv-section-h2">
                  A partner in your growth, not just a vendor.
                </h2>
                <p className="mt-6 text-[15.5px] leading-relaxed text-[#666]">
                  Our core values — integrity, craft, clarity and partnership — shape every engagement from first call to long-term support.
                </p>
              </div>

              <div className="lg:col-span-7 nv-reveal d2">
                <div className="nv-about-item">
                  <div className="nv-about-num">01</div>
                  <div>
                    <h3 className="nv-about-title">Our Story</h3>
                    <p className="nv-about-body">
                      Amsture Technologies began with a simple conviction: technology should serve business outcomes, not the other way around. We've since partnered with growing companies across the globe to turn ambitious ideas into working, revenue-generating systems.
                    </p>
                  </div>
                </div>

                <div className="nv-about-item">
                  <div className="nv-about-num">02</div>
                  <div>
                    <h3 className="nv-about-title">Our Vision</h3>
                    <p className="nv-about-body">
                      To be the trusted digital transformation partner for businesses that refuse to settle — making world-class technology accessible, practical and genuinely valuable.
                    </p>
                  </div>
                </div>

                <div className="nv-about-item">
                  <div className="nv-about-num">03</div>
                  <div>
                    <h3 className="nv-about-title">Our Mission</h3>
                    <p className="nv-about-body">
                      We design, build and support software that removes friction, unlocks growth and gives every client an unfair advantage in their market.
                    </p>
                  </div>
                </div>

                <div className="nv-about-item">
                  <div className="nv-about-num">04</div>
                  <div>
                    <h3 className="nv-about-title">Why Clients Choose Us</h3>
                    <p className="nv-about-body">
                      Because we speak business first and technology second. We're transparent, dependable and relentlessly focused on the results that matter to you.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SERVICES SECTION ── */}
        <section id="services" className="nv-section bg-slate-50/50">
          <div className="nv-wrap">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 nv-reveal">
              <div>
                <div className="nv-eyebrow">WHAT WE DO</div>
                <h2 className="nv-section-h2 max-w-xl">
                  Business solutions, engineered for outcomes.
                </h2>
              </div>
              <p className="text-[15px] text-[#666] max-w-xs">
                Every service starts with your business problem — then we deliver the solution and the measurable benefit.
              </p>
            </div>

            <div className="nv-service-grid">
              {services.map((svc) => {
                const Icon = svc.icon;
                return (
                  <div key={svc.id} className="nv-service-card nv-reveal">
                    <div className="nv-svc-arrow">
                      <ArrowUpRight size={16} />
                    </div>
                    <div className="nv-svc-icon">
                      <Icon size={22} />
                    </div>
                    <h3 className="nv-svc-title">{svc.title}</h3>
                    <p className="nv-svc-row">
                      <span className="nv-svc-label">Problem: </span>
                      <span className="nv-svc-text">{svc.problem}</span>
                    </p>
                    <p className="nv-svc-row">
                      <span className="nv-svc-label">Solution: </span>
                      <span className="nv-svc-text">{svc.solution}</span>
                    </p>
                    <p className="nv-svc-row mt-2">
                      <span className="nv-svc-label">Benefit: </span>
                      <span className="nv-svc-benefit">{svc.benefit}</span>
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── OWNER & EXECUTIVE LEADERSHIP SECTION (ANIKET PATIL, SHRUTIKA SALUNKE & MAYUR DESHMUKH) ── */}
        <section id="leadership" className="nv-section bg-white">
          <div className="nv-wrap">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 nv-reveal">
              <div>
                <div className="nv-eyebrow">LEADERSHIP & OWNERSHIP</div>
                <h2 className="nv-section-h2 max-w-xl">
                  Guided by experience. Driven by vision.
                </h2>
              </div>
              <p className="text-[15px] text-[#666] max-w-sm">
                Meet the founder, co-founder, and CEO building Amsture Technologies' legacy of technology craft and client ROI.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 nv-reveal d2">
              {executiveTeam.map((exec, idx) => (
                <div key={idx} className="nv-team-card flex flex-col justify-between">
                  <div>
                    <div className="nv-team-img-wrap">
                      <img src={exec.img} alt={exec.name} />
                      <div className="nv-team-badge">{exec.tag}</div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-extrabold text-[#0a0a0a]">{exec.name}</h3>
                      <div className="text-xs font-bold text-blue-600 mt-1 mb-3">{exec.role}</div>
                      <p className="text-xs text-slate-500 leading-relaxed mb-4">
                        {exec.bio}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {exec.highlights.map((h, i) => (
                          <span key={i} className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md">
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-0 border-t border-slate-100 flex items-center justify-between mt-auto">
                    <a
                      href={exec.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-bold text-blue-600 hover:underline inline-flex items-center gap-1"
                    >
                      <Linkedin size={14} /> Connect
                    </a>
                    <a
                      href={`mailto:${exec.email}`}
                      className="text-xs font-bold text-slate-500 hover:text-blue-600 inline-flex items-center gap-1"
                    >
                      <Mail size={14} /> {exec.email}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── INDUSTRIES SECTION ── */}
        <section id="industries" className="nv-section">
          <div className="nv-wrap">
            <div className="nv-eyebrow nv-reveal">INDUSTRIES WE SERVE</div>
            <h2 className="nv-section-h2 mb-12 nv-reveal">
              Deep industry knowledge, tailored solutions.
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start nv-reveal d2">
              <div className="lg:col-span-4 flex flex-col gap-2">
                {industries.map((ind) => {
                  const Icon = ind.icon;
                  const isActive = ind.name === activeIndustry;
                  return (
                    <button
                      key={ind.name}
                      type="button"
                      onClick={() => setActiveIndustry(ind.name)}
                      className={`nv-industry-tab ${isActive ? "active" : ""}`}
                    >
                      <Icon size={18} />
                      {ind.name}
                    </button>
                  );
                })}
              </div>

              <div className="lg:col-span-8 bg-blue-50 border border-blue-100 text-slate-900 rounded-[24px] p-8 md:p-12 relative overflow-hidden min-h-[340px] flex flex-col justify-between shadow-sm">
                <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
                      <IndIcon size={20} />
                    </div>
                    <span className="text-xs font-bold tracking-widest text-blue-600 uppercase">
                      {currentInd.name} Solutions
                    </span>
                  </div>
                  <p className="text-lg md:text-xl font-semibold leading-relaxed text-slate-800">
                    {currentInd.body}
                  </p>
                </div>

                <div className="mt-8 pt-8 border-t border-blue-200/60 flex flex-wrap items-end justify-between gap-6">
                  <div>
                    <div className="text-4xl font-black text-blue-600">{currentInd.stat}</div>
                    <div className="text-xs font-semibold text-slate-600 mt-1">{currentInd.label}</div>
                  </div>
                  <a href="#contact" className="nv-book-btn">
                    Get in touch <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── AI & AUTOMATION SECTION ── */}
        <section className="nv-section bg-slate-50 border-y border-slate-200">
          <div className="nv-wrap">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 nv-reveal">
                <div className="nv-eyebrow text-blue-600">AI & AUTOMATION</div>
                <h2 className="nv-section-h2 text-slate-900 mb-6">
                  Practical AI that drives real business efficiency.
                </h2>
                <p className="text-[16px] leading-relaxed text-slate-600 mb-8">
                  AI shouldn't be a gimmick. We build grounded, task-focused automation that removes friction from your operations while keeping your people in full control.
                </p>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                      <Bot size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-[15px]">Document & Data Processing</h4>
                      <p className="text-xs text-slate-600 mt-1">Extract structured signal from PDFs, emails and invoices automatically.</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                      <BrainCircuit size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-[15px]">Intelligent Workflow Copilots</h4>
                      <p className="text-xs text-slate-600 mt-1">Assist your team with smart recommendations and automated draft generation.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 rounded-xl bg-blue-50/80 border border-blue-200 flex items-center gap-3">
                  <ShieldCheck size={20} className="text-blue-600 shrink-0" />
                  <p className="text-xs text-slate-800 font-medium">
                    <strong className="text-slate-900">Human review, designed in:</strong> Every AI workflow includes audit trails and manual override points.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-6 nv-reveal d2 flex justify-center">
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xl max-w-md w-full bg-white p-2">
                  <img src={aiImage} alt="AI automation visual" className="w-full h-auto rounded-xl object-cover" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── PROCESS SECTION ── */}
        <section id="process" className="nv-section">
          <div className="nv-wrap">
            <div className="nv-eyebrow nv-reveal">HOW WE WORK</div>
            <h2 className="nv-section-h2 mb-12 nv-reveal">
              A clear, predictable path to delivery.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 nv-reveal d2">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="text-3xl font-black text-blue-600 mb-4">01</div>
                <h3 className="font-bold text-lg mb-2">Discovery</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  We analyze your processes, pain points and commercial goals to define precise technical requirements.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="text-3xl font-black text-blue-600 mb-4">02</div>
                <h3 className="font-bold text-lg mb-2">Architecture & Design</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  We model clean system architectures and intuitive user interfaces reviewed and approved by your team.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="text-3xl font-black text-blue-600 mb-4">03</div>
                <h3 className="font-bold text-lg mb-2">Agile Development</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  We build in bi-weekly sprints with regular working demos so progress is transparent and verifiable.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="text-3xl font-black text-blue-600 mb-4">04</div>
                <h3 className="font-bold text-lg mb-2">Deployment & Support</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Smooth launch with full team enablement, complete documentation and ongoing proactive optimization.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section id="work" className="nv-section bg-slate-50/50">
          <div className="nv-wrap">
            <div className="nv-eyebrow nv-reveal">CLIENT VOICES</div>
            <h2 className="nv-section-h2 mb-12 nv-reveal">
              What leaders say about working with us.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 nv-reveal d2">
              {testimonials.map((t, idx) => (
                <div
                  key={idx}
                  className={`nv-testi-card ${t.featured ? "featured" : ""}`}
                >
                  <div className="flex gap-1 text-amber-400 mb-4">
                    {[...Array(t.stars)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <p className={`text-[15px] leading-relaxed mb-6 ${t.featured ? "text-white" : "text-slate-700"}`}>
                    "{t.quote}"
                  </p>
                  <div>
                    <div className={`font-bold text-sm ${t.featured ? "text-white" : "text-slate-900"}`}>{t.name}</div>
                    <div className={`text-xs ${t.featured ? "text-blue-100" : "text-slate-500"}`}>{t.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" className="nv-section">
          <div className="nv-wrap max-w-4xl">
            <div className="text-center mb-12 nv-reveal">
              <div className="nv-eyebrow justify-center">FREQUENTLY ASKED QUESTIONS</div>
              <h2 className="nv-section-h2">Clear answers to common questions.</h2>
            </div>

            <div className="nv-reveal d2">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} className="nv-faq-item">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="nv-faq-q"
                    >
                      <span>{faq.q}</span>
                      <div className={`nv-faq-icon ${isOpen ? "open" : ""}`}>
                        <Plus size={16} />
                      </div>
                    </button>
                    {isOpen && <div className="nv-faq-answer">{faq.a}</div>}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── CONTACT SECTION ── */}
        <section id="contact" className="nv-section bg-slate-50 border-t border-slate-200">
          <div className="nv-wrap">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 nv-reveal">
                <div className="nv-eyebrow text-blue-600">LET'S TALK</div>
                <h2 className="nv-section-h2 text-slate-900 mb-6">
                  Ready to transform your technology?
                </h2>
                <p className="text-slate-600 text-base leading-relaxed mb-8">
                  Book a free 30-minute consultation with our senior team. We'll review your challenge and outline practical next steps.
                </p>

                <div className="space-y-5 text-sm text-slate-700 font-medium">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 shadow-sm">
                    <Mail size={20} className="text-blue-600 shrink-0" />
                    <a href="mailto:support@amsture.com" className="hover:text-blue-600 transition-colors">support@amsture.com</a>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 shadow-sm">
                    <Phone size={20} className="text-blue-600 shrink-0" />
                    <a href="tel:+919698681919" className="hover:text-blue-600 transition-colors">+91 9698681919</a>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 shadow-sm">
                    <MapPin size={20} className="text-blue-600 shrink-0" />
                    <span>Pune, Maharashtra</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 nv-reveal d2">
                <div className="bg-white border border-slate-200 text-slate-900 rounded-3xl p-8 md:p-10 shadow-xl">
                  {formSent ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4">
                        <Check size={32} />
                      </div>
                      <h3 className="text-2xl font-bold mb-2 text-slate-900">Thank you!</h3>
                      <p className="text-slate-600 text-sm">We've received your request and will reach out within 24 hours.</p>
                      <button
                        type="button"
                        onClick={() => setFormSent(false)}
                        className="mt-6 text-xs font-bold text-blue-600 underline"
                      >
                        Send another message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleForm} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-800 uppercase mb-1">Your Name</label>
                          <input required type="text" placeholder="Jane Doe" className="nv-input" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-800 uppercase mb-1">Work Email</label>
                          <input required type="email" placeholder="jane@company.com" className="nv-input" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-800 uppercase mb-1">Company / Organization</label>
                        <input type="text" placeholder="Acme Inc." className="nv-input" />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-800 uppercase mb-1">How can we help?</label>
                        <textarea required rows={4} placeholder="Tell us about your project or current technical challenges..." className="nv-input resize-none" />
                      </div>

                      <button type="submit" className="nv-cta-primary w-full justify-center py-4 text-base">
                        Submit Request <ArrowRight size={16} />
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="bg-white text-slate-600 py-12 border-t border-slate-200">
        <div className="nv-wrap">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-200">
            <Logo />
            <div className="flex flex-wrap gap-6 text-sm font-semibold text-slate-700">
              <a href="#about" className="hover:text-blue-600 transition-colors">About</a>
              <a href="#services" className="hover:text-blue-600 transition-colors">Services</a>
              <a href="#leadership" className="hover:text-blue-600 transition-colors">Leadership</a>
              <a href="#industries" className="hover:text-blue-600 transition-colors">Industries</a>
              <a href="#process" className="hover:text-blue-600 transition-colors">Process</a>
              <a href="#work" className="hover:text-blue-600 transition-colors">Work</a>
              <a href="#faq" className="hover:text-blue-600 transition-colors">FAQ</a>
            </div>
          </div>
          <div className="pt-8 text-xs text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>© {new Date().getFullYear()} Amsture Technologies Inc. All rights reserved.</div>
            <div className="flex gap-4 font-medium">
              <a href="#" className="hover:text-slate-800">Privacy Policy</a>
              <a href="#" className="hover:text-slate-800">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ── FLOATING BUTTONS ── */}
      <a
        href="https://wa.me/919698681919"
        target="_blank"
        rel="noreferrer"
        className="nv-float-whatsapp"
        aria-label="WhatsApp"
      >
        <MessageCircle size={22} />
      </a>

      <a href="#contact" className="nv-float-consult">
        <Calendar size={15} /> Free Consultation
      </a>

      {!cookieClosed && (
        <div className="nv-cookie">
          <p className="text-xs font-bold mb-1 text-slate-900">Cookie Notice</p>
          <p className="text-[11px] text-slate-500 leading-relaxed mb-3">
            We use essential cookies to provide a smooth user experience.
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setCookieClosed(true)}
              className="px-3 py-1.5 bg-blue-600 text-white text-[11px] font-bold rounded-lg hover:bg-blue-700"
            >
              Accept
            </button>
            <button
              type="button"
              onClick={() => setCookieClosed(true)}
              className="px-3 py-1.5 text-slate-500 text-[11px] font-bold hover:text-slate-800"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
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
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
