import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { Route, Switch, Router as WouterRouter } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ArrowUpRight, BarChart3, Bot, BrainCircuit,
  Check, ChevronDown, Cloud, Compass, FileText, Globe2,
  Layers3, Linkedin, Mail, MapPin, Menu, MessageCircle,
  Network, Phone, Plus, Quote, Search, ShieldCheck,
  Sparkles, Star, Target, TrendingUp, Users, X, Zap,
  Building2, Code2, Database, Settings, Smartphone, HeartHandshake,
  Award as Trophy, Calendar, Cpu, Activity, Shield, Play, Pause, Sun, Moon,
} from "lucide-react";
import heroImage from "@assets/generated_images/nexovate-hero.png";
import aiImage from "@assets/generated_images/nexovate-ai.png";
import aniketImage from "@assets/generated_images/aniket-patil.jpg";
import shrutikaImage from "@assets/generated_images/shrutika-salunke.jpg";
import mayurImage from "@assets/generated_images/mayur-deshmukh.jpg";
import amstureLogo from "@assets/generated_images/amsture-logo.jpg";
import atOfficialLogo from "@assets/generated_images/at-official-logo.png";
import React, { FormEvent, useEffect, useState } from "react";

const queryClient = new QueryClient();

/* ─── Data ─── */
const serviceCategories = [
  { id: "ai", name: "AI Solutions", icon: BrainCircuit },
  { id: "software", name: "Software & Mobile", icon: Code2 },
  { id: "enterprise", name: "Enterprise ERP / CRM", icon: Database },
  { id: "cloud", name: "Cloud & Strategy", icon: Cloud },
];

export interface ServiceItem {
  id: string;
  category: "ai" | "software" | "enterprise" | "cloud";
  icon: any;
  title: string;
  badge: string;
  problem: string;
  solution: string;
  benefit: string;
  highlights: string[];
  tech: string[];
}

const services: ServiceItem[] = [
  {
    id: "ai-auto",
    category: "ai",
    icon: BrainCircuit,
    title: "AI Automation & Workflows",
    badge: "HIGH ROI",
    problem: "Repetitive manual tasks consuming your team's best productive hours.",
    solution: "Custom AI agents & intelligent automation connected to your software stack.",
    benefit: "80% reduction in processing time & zero human data entry errors.",
    highlights: ["Custom LLM & Agent Integration", "Automated Document Processing", "Intelligent Triaging"],
    tech: ["Python", "OpenAI / Claude", "LangChain", "Node.js"]
  },
  {
    id: "process",
    category: "ai",
    icon: Settings,
    title: "Process Automation & RPA",
    badge: "POPULAR",
    problem: "Manual, fragmented business processes causing operational delays.",
    solution: "End-to-end workflow automation mapped directly to your core operations.",
    benefit: "Fewer operational bottlenecks & 20+ hours saved per employee weekly.",
    highlights: ["REST API Connectors", "Automated Approval Chains", "Real-Time Triggers"],
    tech: ["n8n", "Zapier Enterprise", "Node.js", "Python"]
  },
  {
    id: "dashboards",
    category: "ai",
    icon: BarChart3,
    title: "AI Analytics & Dashboards",
    badge: "REAL-TIME",
    problem: "No real-time visibility into operational KPIs and business health.",
    solution: "Interactive dashboards surfacing actionable insights with predictive analytics.",
    benefit: "Faster, data-backed decisions across executive and operations teams.",
    highlights: ["Live Streamed Metrics", "Predictive Trend Forecasting", "Role-Based Views"],
    tech: ["Recharts", "PostgreSQL", "React", "TypeScript"]
  },
  {
    id: "web",
    category: "software",
    icon: Globe2,
    title: "Business Websites & Portals",
    badge: "SEO FIRST",
    problem: "Outdated, slow websites that fail to convert visitors into qualified leads.",
    solution: "Fast, mobile-optimized, SEO-first websites engineered for business growth.",
    benefit: "3x lead conversion boost & top-tier Google search rankings.",
    highlights: ["Sub-second Page Load Speed", "Schema.org Structured Data", "Conversion-Focused UX"],
    tech: ["React", "Vite", "TailwindCSS", "TypeScript"]
  },
  {
    id: "apps",
    category: "software",
    icon: Code2,
    title: "Custom Business Software",
    badge: "TAILORED",
    problem: "Off-the-shelf software failing to fit your unique operational workflows.",
    solution: "Bespoke web applications built precisely around your company's rules.",
    benefit: "Seamless operational scale without costly per-user licensing fees.",
    highlights: ["Custom Database Architecture", "Granular Access Control", "Scalable REST APIs"],
    tech: ["Node.js", "Express", "React", "PostgreSQL"]
  },
  {
    id: "mobile",
    category: "software",
    icon: Smartphone,
    title: "Native Mobile Applications",
    badge: "IOS & ANDROID",
    problem: "No dedicated mobile application limiting customer reach and access.",
    solution: "High-performance iOS & Android mobile apps with frictionless UX.",
    benefit: "Direct customer communication channel & increased engagement.",
    highlights: ["Cross-Platform Efficiency", "Offline Data Sync", "Push Notification Hub"],
    tech: ["React Native", "Expo", "TypeScript", "REST APIs"]
  },
  {
    id: "erp",
    category: "enterprise",
    icon: Database,
    title: "Enterprise ERP Systems",
    badge: "CORE OPS",
    problem: "Disconnected software creating blind spots between inventory, sales & finance.",
    solution: "Unified ERP connecting operations, inventory, finance & HR in real-time.",
    benefit: "Complete operational clarity & automated multi-department sync.",
    highlights: ["Inventory & Supply Chain", "Automated Financial Billing", "Multi-Location Support"],
    tech: ["Drizzle ORM", "PostgreSQL", "Express", "TypeScript"]
  },
  {
    id: "crm",
    category: "enterprise",
    icon: Users,
    title: "Custom CRM Platforms",
    badge: "SALES BOOST",
    problem: "Lead data scattered across spreadsheets and missed deal follow-ups.",
    solution: "Tailored CRM structured directly around your lead-to-close pipeline.",
    benefit: "40% faster proposal cycle & increased customer retention.",
    highlights: ["Kanban Deal Pipelines", "Automated Email Sequences", "Interaction Timelines"],
    tech: ["React", "Node.js", "PostgreSQL", "TailwindCSS"]
  },
  {
    id: "cloud",
    category: "cloud",
    icon: Cloud,
    title: "Cloud & DevOps Infrastructure",
    badge: "99.9% UPTIME",
    problem: "Scaling server infrastructure is slow, vulnerable, and expensive.",
    solution: "Modern cloud migration, serverless architecture, and CI/CD pipelines.",
    benefit: "99.99% uptime, robust enterprise security & lower hosting costs.",
    highlights: ["Automated Deployments", "Containerized Architecture", "24/7 Health Monitoring"],
    tech: ["Docker", "AWS", "GitHub Actions", "Nginx"]
  },
  {
    id: "transformation",
    category: "cloud",
    icon: Compass,
    title: "Digital Transformation & Strategy",
    badge: "STRATEGIC",
    problem: "Fragmented tech stack creating internal friction and slow execution.",
    solution: "Senior strategic advisory connecting technology investments directly to ROI.",
    benefit: "A streamlined tech roadmap & elimination of redundant software spend.",
    highlights: ["Tech Architecture Audit", "Legacy Modernization Plan", "Security Compliance"],
    tech: ["Enterprise Blueprints", "ROI Metrics", "Security Standards"]
  },
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

/* ── EXACTLY THREE LEADERS: ANIKET PATIL (FOUNDER), SHRUTIKA SALUNKE (CEO) & MAYUR DESHMUKH (CO-FOUNDER) ── */
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
    role: "Chief Executive Officer (CEO)",
    tag: "CEO",
    img: shrutikaImage,
    bio: "Leads Amsture Technologies as CEO, driving company strategy, operational excellence, high-performance web applications, and UI design systems.",
    highlights: ["Corporate Leadership", "Frontend Engineering", "Software Development"],
    linkedin: "https://linkedin.com",
    email: "shrutika.salunke@amsture.com",
  },
  {
    name: "Mayur Deshmukh",
    role: "Co-Founder & AI Solutions Lead",
    tag: "CO-FOUNDER",
    img: mayurImage,
    bio: "Co-founded Amsture Technologies to drive commercial strategy, technology execution, and AI solutions with deep expertise in software development, AI/ML engineering, and Python automation.",
    highlights: ["Software Development", "AI / ML Expert", "Python Specialist"],
    linkedin: "https://linkedin.com",
    email: "mayur.deshmukh@amsture.com",
  },
];

const tickerData = [
  { name: "AI Automation & Workflows", icon: BrainCircuit, badge: "HIGH ROI" },
  { name: "Custom Web Software", icon: Code2, badge: "BESPOKE" },
  { name: "Enterprise ERP Systems", icon: Database, badge: "CORE OPS" },
  { name: "Native Mobile Apps", icon: Smartphone, badge: "IOS & ANDROID" },
  { name: "Business Websites", icon: Globe2, badge: "SEO FIRST" },
  { name: "Cloud Infrastructure", icon: Cloud, badge: "99.99% UPTIME" },
  { name: "Tailored CRM Platforms", icon: Users, badge: "SALES BOOST" },
  { name: "Process Automation", icon: Settings, badge: "WORKFLOWS" },
  { name: "AI Business Analytics", icon: BarChart3, badge: "REAL-TIME" },
  { name: "Digital Strategy & Advisory", icon: Compass, badge: "GROWTH" },
];

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
      {/* Official Uploaded AT Emblem Logo Mark */}
      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white p-1 border border-slate-200/90 shadow-sm flex items-center justify-center shrink-0 transition-transform group-hover:scale-105">
        <img
          src={atOfficialLogo}
          alt="Amsture Technologies AT Logo"
          className="w-full h-full object-contain"
        />
      </div>
      {/* Brand Text Name - Single crisp presentation */}
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
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("theme") as "light" | "dark") || "light";
    }
    return "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

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
          <a href="#contact" className="nv-nav-link">Contact</a>
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

          {/* Dark / Light Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border border-slate-200 dark:border-slate-700 bg-slate-100/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 hover:scale-105 hover:border-blue-500/50 transition-all shadow-xs"
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? (
              <Moon size={17} className="text-slate-700 hover:text-blue-600 transition-colors" />
            ) : (
              <Sun size={17} className="text-amber-400 hover:text-amber-300 transition-colors" />
            )}
          </button>

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
          <a href="#contact" onClick={() => setMobileOpen(false)} className="nv-mobile-link font-bold text-blue-600">Contact Us</a>
          <a href="#contact" onClick={() => setMobileOpen(false)} className="nv-cta-primary mt-4">
            Book a Free Consultation <ArrowRight size={16} />
          </a>
        </div>
      )}
    </>
  );
}

/* ─── PARALLEL, NOT SEQUENTIAL (AI-ORCHESTRATED SDLC) SECTION ─── */
function ParallelSDLCSection() {
  const [currentStep, setCurrentStep] = useState<number>(1); // Default Step 2: Understanding (matches renaissa.ai!)
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const sdlcSteps = [
    { id: 0, node: "req", name: "Requirement", phase: "Sequential", desc: "Capture the product need, business intent & goals in plain language" },
    { id: 1, node: "und", name: "Understanding", phase: "Sequential", desc: "AI structures intent, extracts goals, and maps system constraints" },
    { id: 2, node: "lock", name: "Lock Scope", phase: "Sequential", desc: "Freeze core specifications and functional boundaries" },
    { id: 3, node: "docs", name: "Generate Docs", phase: "Sequential", desc: "Auto-generate PRD, system specs, user stories & schema blueprints" },
    { id: 4, node: "app", name: "Approve Gate", phase: "Sequential", desc: "Human engineering review & milestone approval gate" },
    { id: 5, node: "design", name: "Parallel Design", phase: "Parallel · Design", desc: "Concurrent synthesis of System Architecture, DB Schemas, API Specs & UI/UX Design" },
    { id: 6, node: "build", name: "Parallel Build", phase: "Parallel · Build", desc: "Concurrent code generation, API controllers, and environment configuration" },
    { id: 7, node: "validate", name: "Parallel Validate", phase: "Parallel · Validate", desc: "Autonomous E2E test suites, peer AI code review, and real-time security audit" },
    { id: 8, node: "fix", name: "Auto Fix", phase: "Sequential", desc: "Autonomous bug resolution, edge-case handling & optimization" },
    { id: 9, node: "deploy", name: "Deploy Release", phase: "Sequential", desc: "1-Click CI/CD production release with zero downtime" },
    { id: 10, node: "maintain", name: "Maintain & Feedback", phase: "Feedback Loop", desc: "Live telemetry monitoring & continuous feedback loop back to Requirements" }
  ];

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % sdlcSteps.length);
    }, 2400);
    return () => clearInterval(interval);
  }, [isPlaying, sdlcSteps.length]);

  const activeStepInfo = sdlcSteps[currentStep];

  const handleNext = () => setCurrentStep((prev) => (prev + 1) % sdlcSteps.length);
  const handlePrev = () => setCurrentStep((prev) => (prev - 1 + sdlcSteps.length) % sdlcSteps.length);
  const handleSelectStep = (idx: number) => {
    setCurrentStep(idx);
    setIsPlaying(false);
  };

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-slate-50/60 relative overflow-hidden border-t border-slate-200">
      <div className="nv-wrap relative z-10 max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 nv-reveal">
          <div className="text-[11px] font-extrabold tracking-[0.15em] text-blue-600 uppercase mb-3">
            HOW IT WORKS · AI-ORCHESTRATED SDLC
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Parallel, <span className="text-blue-600">not sequential</span>.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Traditional SDLC is a relay race. Ours is four tracks running at once — directed by a central AI orchestrator, supervised by humans.
          </p>
        </div>

        {/* Replica White Rounded Card Box Container matching user's image */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-slate-200/50 relative overflow-hidden">
          {/* Top Blue Gradient Accent Line matching site theme */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500"></div>

          {/* Canvas SVG Flow Diagram matching renaissa.ai */}
          <div className="w-full overflow-x-auto select-none py-4">
            <div className="min-w-[980px] max-w-[1200px] mx-auto relative">
              <svg viewBox="0 0 1420 370" className="w-full h-auto min-w-[980px]" preserveAspectRatio="xMidYMid meet" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <filter id="blueGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="b" />
                    <feMerge>
                      <feMergeNode in="b" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>

                  {/* Sequential Left Path Defs with generous spacing between Understand (150) and Lock (240) */}
                  <path id="path-req-und" d="M 68 180 L 132 180" />
                  <path id="path-und-lock" d="M 168 180 L 226 180" />
                  <path id="path-lock-docs" d="M 254 180 L 316 180" />
                  <path id="path-docs-app" d="M 344 180 L 432 180" />

                  {/* Approve to Design (4 Parallel Paths) */}
                  <path id="path-app-sys" d="M 464 168 C 510 168, 540 56, 572 56" />
                  <path id="path-app-api" d="M 464 174 C 520 174, 550 128, 572 128" />
                  <path id="path-app-infra" d="M 464 186 C 520 186, 550 200, 572 200" />
                  <path id="path-app-ui" d="M 464 192 C 510 192, 540 272, 572 272" />

                  {/* Design to Build Paths */}
                  <path id="path-sys-code" d="M 608 56 C 670 56, 710 90, 742 96" />
                  <path id="path-api-code" d="M 608 128 C 670 128, 710 105, 742 102" />
                  <path id="path-infra-code" d="M 608 196 C 670 196, 710 130, 742 112" />
                  <path id="path-infra-infra" d="M 608 206 C 670 206, 710 240, 742 246" />
                  <path id="path-ui-code" d="M 608 268 C 670 268, 710 140, 742 118" />
                  <path id="path-ui-infra" d="M 608 276 C 670 276, 710 258, 742 254" />

                  {/* Build to Validate Paths */}
                  <path id="path-code-test" d="M 778 96 C 830 96, 870 70, 902 70" />
                  <path id="path-code-rev" d="M 778 108 C 830 108, 870 170, 902 176" />
                  <path id="path-code-sec" d="M 778 112 C 830 112, 870 260, 902 278" />
                  <path id="path-infra-test" d="M 778 242 C 830 242, 870 100, 902 80" />
                  <path id="path-infra-rev" d="M 778 248 C 830 248, 870 200, 902 188" />
                  <path id="path-infra-sec" d="M 778 256 C 830 256, 870 280, 902 288" />

                  {/* Validate to Fix Paths */}
                  <path id="path-test-fix" d="M 938 70 C 990 70, 1030 160, 1062 172" />
                  <path id="path-rev-fix" d="M 938 180 L 1062 180" />
                  <path id="path-sec-fix" d="M 938 290 C 990 290, 1030 200, 1062 188" />

                  {/* Sequential Right */}
                  <path id="path-fix-dep" d="M 1099 180 L 1191 180" />
                  <path id="path-dep-maint" d="M 1229 180 L 1321 180" />

                  {/* Feedback Loop */}
                  <path id="path-maint-loop" d="M 1340 198 C 1340 340, 48 340, 48 198" />
                </defs>

                {/* Zone Cards with Blue Theme Colors */}
                <rect x="520" y="34" width="140" height="282" rx="18" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1" opacity="0.8" />
                <rect x="700" y="60" width="120" height="230" rx="16" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1" opacity="0.8" />
                <rect x="860" y="36" width="120" height="290" rx="16" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1" opacity="0.8" />

                <text x="248" y="28" textAnchor="middle" fill="#2563eb" style={{ fontSize: '9px', fontWeight: 800, letterSpacing: '0.14em' }}>SEQUENTIAL</text>
                <text x="590" y="22" textAnchor="middle" fill="#1d4ed8" style={{ fontSize: '9px', fontWeight: 800, letterSpacing: '0.12em' }}>PARALLEL · DESIGN</text>
                <text x="760" y="52" textAnchor="middle" fill="#1d4ed8" style={{ fontSize: '9px', fontWeight: 800, letterSpacing: '0.12em' }}>PARALLEL · BUILD</text>
                <text x="920" y="28" textAnchor="middle" fill="#1d4ed8" style={{ fontSize: '9px', fontWeight: 800, letterSpacing: '0.12em' }}>PARALLEL · VALIDATE</text>
                <text x="1210" y="28" textAnchor="middle" fill="#2563eb" style={{ fontSize: '9px', fontWeight: 800, letterSpacing: '0.14em' }}>SEQUENTIAL</text>
                <text x="700" y="358" textAnchor="middle" fill="#94a3b8" style={{ fontSize: '9px', fontWeight: 800, letterSpacing: '0.14em' }}>FEEDBACK LOOP</text>

                {/* --- RENDER ALL PATHS (Traversed paths stay solid blue as flow progresses) --- */}
                {/* Left Sequential Paths */}
                <use href="#path-req-und" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
                <use href="#path-req-und" stroke="#2563eb" strokeWidth={currentStep >= 1 ? "2.5" : "2"} opacity={currentStep >= 0 ? "1" : "0.2"} />

                <use href="#path-und-lock" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
                <use href="#path-und-lock" stroke="#2563eb" strokeWidth={currentStep >= 2 ? "2.5" : "2"} opacity={currentStep >= 1 ? "1" : "0.2"} />

                <use href="#path-lock-docs" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
                <use href="#path-lock-docs" stroke="#2563eb" strokeWidth={currentStep >= 3 ? "2.5" : "2"} opacity={currentStep >= 2 ? "1" : "0.2"} />

                <use href="#path-docs-app" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
                <use href="#path-docs-app" stroke="#2563eb" strokeWidth={currentStep >= 4 ? "2.5" : "2"} opacity={currentStep >= 3 ? "1" : "0.2"} />

                {/* Approve to Design Paths (Step 5) */}
                <use href="#path-app-sys" stroke={currentStep >= 5 ? "#2563eb" : "#cbd5e1"} strokeWidth={currentStep >= 5 ? "2" : "1.4"} opacity={currentStep >= 5 ? "1" : "0.3"} />
                <use href="#path-app-api" stroke={currentStep >= 5 ? "#2563eb" : "#cbd5e1"} strokeWidth={currentStep >= 5 ? "2" : "1.4"} opacity={currentStep >= 5 ? "1" : "0.3"} />
                <use href="#path-app-infra" stroke={currentStep >= 5 ? "#2563eb" : "#cbd5e1"} strokeWidth={currentStep >= 5 ? "2" : "1.4"} opacity={currentStep >= 5 ? "1" : "0.3"} />
                <use href="#path-app-ui" stroke={currentStep >= 5 ? "#2563eb" : "#cbd5e1"} strokeWidth={currentStep >= 5 ? "2" : "1.4"} opacity={currentStep >= 5 ? "1" : "0.3"} />

                {/* Design to Build Paths (Step 6) */}
                <use href="#path-sys-code" stroke={currentStep >= 6 ? "#2563eb" : "#cbd5e1"} strokeWidth={currentStep >= 6 ? "2" : "1.4"} opacity={currentStep >= 6 ? "1" : "0.3"} />
                <use href="#path-api-code" stroke={currentStep >= 6 ? "#2563eb" : "#cbd5e1"} strokeWidth={currentStep >= 6 ? "2" : "1.4"} opacity={currentStep >= 6 ? "1" : "0.3"} />
                <use href="#path-infra-code" stroke={currentStep >= 6 ? "#2563eb" : "#cbd5e1"} strokeWidth={currentStep >= 6 ? "2" : "1.4"} opacity={currentStep >= 6 ? "1" : "0.3"} />
                <use href="#path-infra-infra" stroke={currentStep >= 6 ? "#2563eb" : "#cbd5e1"} strokeWidth={currentStep >= 6 ? "2" : "1.4"} opacity={currentStep >= 6 ? "1" : "0.3"} />
                <use href="#path-ui-code" stroke={currentStep >= 6 ? "#2563eb" : "#cbd5e1"} strokeWidth={currentStep >= 6 ? "2" : "1.4"} opacity={currentStep >= 6 ? "1" : "0.3"} />
                <use href="#path-ui-infra" stroke={currentStep >= 6 ? "#2563eb" : "#cbd5e1"} strokeWidth={currentStep >= 6 ? "2" : "1.4"} opacity={currentStep >= 6 ? "1" : "0.3"} />

                {/* Build to Validate Paths (Step 7) */}
                <use href="#path-code-test" stroke={currentStep >= 7 ? "#2563eb" : "#cbd5e1"} strokeWidth={currentStep >= 7 ? "2" : "1.4"} opacity={currentStep >= 7 ? "1" : "0.3"} />
                <use href="#path-code-rev" stroke={currentStep >= 7 ? "#2563eb" : "#cbd5e1"} strokeWidth={currentStep >= 7 ? "2" : "1.4"} opacity={currentStep >= 7 ? "1" : "0.3"} />
                <use href="#path-code-sec" stroke={currentStep >= 7 ? "#2563eb" : "#cbd5e1"} strokeWidth={currentStep >= 7 ? "2" : "1.4"} opacity={currentStep >= 7 ? "1" : "0.3"} />
                <use href="#path-infra-test" stroke={currentStep >= 7 ? "#2563eb" : "#cbd5e1"} strokeWidth={currentStep >= 7 ? "2" : "1.4"} opacity={currentStep >= 7 ? "1" : "0.3"} />
                <use href="#path-infra-rev" stroke={currentStep >= 7 ? "#2563eb" : "#cbd5e1"} strokeWidth={currentStep >= 7 ? "2" : "1.4"} opacity={currentStep >= 7 ? "1" : "0.3"} />
                <use href="#path-infra-sec" stroke={currentStep >= 7 ? "#2563eb" : "#cbd5e1"} strokeWidth={currentStep >= 7 ? "2" : "1.4"} opacity={currentStep >= 7 ? "1" : "0.3"} />

                {/* Validate to Fix Paths (Step 8) */}
                <use href="#path-test-fix" stroke={currentStep >= 8 ? "#2563eb" : "#cbd5e1"} strokeWidth={currentStep >= 8 ? "2" : "1.4"} opacity={currentStep >= 8 ? "1" : "0.3"} />
                <use href="#path-rev-fix" stroke={currentStep >= 8 ? "#2563eb" : "#cbd5e1"} strokeWidth={currentStep >= 8 ? "2" : "1.4"} opacity={currentStep >= 8 ? "1" : "0.3"} />
                <use href="#path-sec-fix" stroke={currentStep >= 8 ? "#2563eb" : "#cbd5e1"} strokeWidth={currentStep >= 8 ? "2" : "1.4"} opacity={currentStep >= 8 ? "1" : "0.3"} />

                {/* Sequential Right Paths (Step 9 & 10) */}
                <use href="#path-fix-dep" stroke={currentStep >= 9 ? "#2563eb" : "#cbd5e1"} strokeWidth={currentStep >= 9 ? "2.5" : "1.4"} opacity={currentStep >= 9 ? "1" : "0.3"} />
                <use href="#path-dep-maint" stroke={currentStep >= 10 ? "#2563eb" : "#cbd5e1"} strokeWidth={currentStep >= 10 ? "2.5" : "1.4"} opacity={currentStep >= 10 ? "1" : "0.3"} />

                {/* Feedback Loop Path */}
                <use href="#path-maint-loop" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="6 5" opacity="0.85" />

                {/* --- SYNCHRONIZED STEP PARTICLES THAT MOVE SEGMENT BY SEGMENT --- */}
                {currentStep === 0 && (
                  <circle r="4" fill="#2563eb" filter="url(#blueGlow)">
                    <animateMotion dur="1.2s" repeatCount="indefinite">
                      <mpath href="#path-req-und" />
                    </animateMotion>
                  </circle>
                )}

                {currentStep === 1 && (
                  <circle r="4" fill="#2563eb" filter="url(#blueGlow)">
                    <animateMotion dur="1.2s" repeatCount="indefinite">
                      <mpath href="#path-und-lock" />
                    </animateMotion>
                  </circle>
                )}

                {currentStep === 2 && (
                  <circle r="4" fill="#2563eb" filter="url(#blueGlow)">
                    <animateMotion dur="1.2s" repeatCount="indefinite">
                      <mpath href="#path-lock-docs" />
                    </animateMotion>
                  </circle>
                )}

                {(currentStep === 3 || currentStep === 4) && (
                  <circle r="4" fill="#2563eb" filter="url(#blueGlow)">
                    <animateMotion dur="1.2s" repeatCount="indefinite">
                      <mpath href="#path-docs-app" />
                    </animateMotion>
                  </circle>
                )}

                {/* Parallel Step 5: Design Branching */}
                {currentStep === 5 && (
                  <>
                    <circle r="3.8" fill="#2563eb" filter="url(#blueGlow)">
                      <animateMotion dur="1.4s" repeatCount="indefinite">
                        <mpath href="#path-app-sys" />
                      </animateMotion>
                    </circle>
                    <circle r="3.8" fill="#2563eb" filter="url(#blueGlow)">
                      <animateMotion dur="1.4s" repeatCount="indefinite">
                        <mpath href="#path-app-api" />
                      </animateMotion>
                    </circle>
                    <circle r="3.8" fill="#2563eb" filter="url(#blueGlow)">
                      <animateMotion dur="1.4s" repeatCount="indefinite">
                        <mpath href="#path-app-infra" />
                      </animateMotion>
                    </circle>
                    <circle r="3.8" fill="#2563eb" filter="url(#blueGlow)">
                      <animateMotion dur="1.4s" repeatCount="indefinite">
                        <mpath href="#path-app-ui" />
                      </animateMotion>
                    </circle>
                  </>
                )}

                {/* Parallel Step 6: Build Branching */}
                {currentStep === 6 && (
                  <>
                    <circle r="3.8" fill="#2563eb" filter="url(#blueGlow)">
                      <animateMotion dur="1.4s" repeatCount="indefinite">
                        <mpath href="#path-sys-code" />
                      </animateMotion>
                    </circle>
                    <circle r="3.8" fill="#2563eb" filter="url(#blueGlow)">
                      <animateMotion dur="1.4s" repeatCount="indefinite">
                        <mpath href="#path-api-code" />
                      </animateMotion>
                    </circle>
                    <circle r="3.8" fill="#2563eb" filter="url(#blueGlow)">
                      <animateMotion dur="1.4s" repeatCount="indefinite">
                        <mpath href="#path-infra-code" />
                      </animateMotion>
                    </circle>
                    <circle r="3.8" fill="#2563eb" filter="url(#blueGlow)">
                      <animateMotion dur="1.4s" repeatCount="indefinite">
                        <mpath href="#path-ui-code" />
                      </animateMotion>
                    </circle>
                  </>
                )}

                {/* Parallel Step 7: Validate Branching */}
                {currentStep === 7 && (
                  <>
                    <circle r="3.8" fill="#2563eb" filter="url(#blueGlow)">
                      <animateMotion dur="1.4s" repeatCount="indefinite">
                        <mpath href="#path-code-test" />
                      </animateMotion>
                    </circle>
                    <circle r="3.8" fill="#2563eb" filter="url(#blueGlow)">
                      <animateMotion dur="1.4s" repeatCount="indefinite">
                        <mpath href="#path-code-rev" />
                      </animateMotion>
                    </circle>
                    <circle r="3.8" fill="#2563eb" filter="url(#blueGlow)">
                      <animateMotion dur="1.4s" repeatCount="indefinite">
                        <mpath href="#path-infra-sec" />
                      </animateMotion>
                    </circle>
                  </>
                )}

                {currentStep === 8 && (
                  <circle r="4" fill="#2563eb" filter="url(#blueGlow)">
                    <animateMotion dur="1.2s" repeatCount="indefinite">
                      <mpath href="#path-rev-fix" />
                    </animateMotion>
                  </circle>
                )}

                {currentStep === 9 && (
                  <circle r="4" fill="#2563eb" filter="url(#blueGlow)">
                    <animateMotion dur="1.2s" repeatCount="indefinite">
                      <mpath href="#path-fix-dep" />
                    </animateMotion>
                  </circle>
                )}

                {currentStep === 10 && (
                  <>
                    <circle r="4" fill="#2563eb" filter="url(#blueGlow)">
                      <animateMotion dur="1.2s" repeatCount="indefinite">
                        <mpath href="#path-dep-maint" />
                      </animateMotion>
                    </circle>
                    <circle r="4" fill="#2563eb" filter="url(#blueGlow)">
                      <animateMotion dur="2.2s" repeatCount="indefinite">
                        <mpath href="#path-maint-loop" />
                      </animateMotion>
                    </circle>
                  </>
                )}

                {/* --- ALL 11 CLICKABLE NODES (Cumulative pipeline progression: Reached nodes stay solid blue) --- */}
                {/* Node 1: Requirement (48, 180) */}
                <g onClick={() => handleSelectStep(0)} className="cursor-pointer group">
                  <circle
                    cx="48" cy="180" r="20"
                    fill="#ffffff"
                    stroke={currentStep >= 0 ? "#2563eb" : "#e2e8f0"}
                    strokeWidth={currentStep === 0 ? "3" : (currentStep > 0 ? "2.2" : "1.2")}
                    opacity={currentStep >= 0 ? "1" : "0.6"}
                    filter={currentStep === 0 ? "url(#blueGlow)" : undefined}
                    className="transition-all duration-300 group-hover:stroke-blue-400 group-hover:opacity-100"
                  />
                  {currentStep === 0 && (
                    <>
                      <circle cx="48" cy="180" r="26" stroke="#2563eb" strokeWidth="1.5" fill="none" opacity="0.6" className="animate-ping" />
                      <circle cx="48" cy="180" r="30" stroke="#2563eb" strokeWidth="1" fill="none" opacity="0.25" />
                    </>
                  )}
                  <FileText x="39" y="171" size={18} className={`transition-all duration-300 ${currentStep >= 0 ? "text-blue-600 opacity-100" : "text-slate-400 opacity-50 group-hover:text-blue-500 group-hover:opacity-100"}`} />
                  <text x="48" y="218" textAnchor="middle" fill={currentStep >= 0 ? "#0f172a" : "#94a3b8"} opacity={currentStep >= 0 ? "1" : "0.7"} style={{ fontSize: currentStep === 0 ? '11.5px' : '10.5px', fontWeight: currentStep >= 0 ? 800 : 500 }} className="transition-all duration-300">Requirement</text>
                </g>

                {/* Node 2: Understand (150, 180) */}
                <g onClick={() => handleSelectStep(1)} className="cursor-pointer group">
                  <circle
                    cx="150" cy="180" r="20"
                    fill="#ffffff"
                    stroke={currentStep >= 1 ? "#2563eb" : "#e2e8f0"}
                    strokeWidth={currentStep === 1 ? "3" : (currentStep > 1 ? "2.2" : "1.2")}
                    opacity={currentStep >= 1 ? "1" : "0.6"}
                    filter={currentStep === 1 ? "url(#blueGlow)" : undefined}
                    className="transition-all duration-300 group-hover:stroke-blue-400 group-hover:opacity-100"
                  />
                  {currentStep === 1 && (
                    <>
                      <circle cx="150" cy="180" r="26" stroke="#2563eb" strokeWidth="1.5" fill="none" opacity="0.6" className="animate-ping" />
                      <circle cx="150" cy="180" r="30" stroke="#2563eb" strokeWidth="1" fill="none" opacity="0.25" />
                    </>
                  )}
                  <Target x="141" y="171" size={18} className={`transition-all duration-300 ${currentStep >= 1 ? "text-blue-600 opacity-100" : "text-slate-400 opacity-50 group-hover:text-blue-500 group-hover:opacity-100"}`} />
                  <text x="150" y="218" textAnchor="middle" fill={currentStep >= 1 ? "#0f172a" : "#94a3b8"} opacity={currentStep >= 1 ? "1" : "0.7"} style={{ fontSize: currentStep === 1 ? '11.5px' : '10.5px', fontWeight: currentStep >= 1 ? 800 : 500 }} className="transition-all duration-300">Understand</text>
                </g>

                {/* Node 3: Lock (240, 180) */}
                <g onClick={() => handleSelectStep(2)} className="cursor-pointer group">
                  <circle cx="240" cy="180" r="14" fill="#ffffff" stroke={currentStep >= 2 ? "#2563eb" : "#e2e8f0"} strokeWidth={currentStep === 2 ? "2.5" : (currentStep > 2 ? "2" : "1.2")} opacity={currentStep >= 2 ? "1" : "0.55"} filter={currentStep === 2 ? "url(#blueGlow)" : undefined} className="transition-all duration-300 group-hover:stroke-blue-400 group-hover:opacity-100" />
                  {currentStep === 2 && <circle cx="240" cy="180" r="20" stroke="#2563eb" strokeWidth="1.5" fill="none" opacity="0.6" className="animate-ping" />}
                  <ShieldCheck x="233" y="173" size={14} className={`transition-all duration-300 ${currentStep >= 2 ? "text-blue-600 opacity-100" : "text-slate-400 opacity-50 group-hover:text-blue-500"}`} />
                  <text x="240" y="212" textAnchor="middle" fill={currentStep >= 2 ? "#0f172a" : "#94a3b8"} opacity={currentStep >= 2 ? "1" : "0.65"} style={{ fontSize: '9.5px', fontWeight: currentStep >= 2 ? 700 : 500 }}>Lock</text>
                </g>

                {/* Node 4: Docs (330, 180) */}
                <g onClick={() => handleSelectStep(3)} className="cursor-pointer group">
                  <circle cx="330" cy="180" r="14" fill="#ffffff" stroke={currentStep >= 3 ? "#2563eb" : "#e2e8f0"} strokeWidth={currentStep === 3 ? "2.5" : (currentStep > 3 ? "2" : "1.2")} opacity={currentStep >= 3 ? "1" : "0.55"} filter={currentStep === 3 ? "url(#blueGlow)" : undefined} className="transition-all duration-300 group-hover:stroke-blue-400 group-hover:opacity-100" />
                  {currentStep === 3 && <circle cx="330" cy="180" r="20" stroke="#2563eb" strokeWidth="1.5" fill="none" opacity="0.6" className="animate-ping" />}
                  <FileText x="323" y="173" size={14} className={`transition-all duration-300 ${currentStep >= 3 ? "text-blue-600 opacity-100" : "text-slate-400 opacity-50 group-hover:text-blue-500"}`} />
                  <text x="330" y="212" textAnchor="middle" fill={currentStep >= 3 ? "#0f172a" : "#94a3b8"} opacity={currentStep >= 3 ? "1" : "0.65"} style={{ fontSize: '9.5px', fontWeight: currentStep >= 3 ? 700 : 500 }}>Docs</text>
                </g>

                {/* Node 5: Approve (448, 180) */}
                <g onClick={() => handleSelectStep(4)} className="cursor-pointer group">
                  <circle cx="448" cy="180" r="14" fill="#ffffff" stroke={currentStep >= 4 ? "#2563eb" : "#e2e8f0"} strokeWidth={currentStep === 4 ? "2.5" : (currentStep > 4 ? "2" : "1.2")} opacity={currentStep >= 4 ? "1" : "0.55"} filter={currentStep === 4 ? "url(#blueGlow)" : undefined} className="transition-all duration-300 group-hover:stroke-blue-400 group-hover:opacity-100" />
                  {currentStep === 4 && <circle cx="448" cy="180" r="20" stroke="#2563eb" strokeWidth="1.5" fill="none" opacity="0.6" className="animate-ping" />}
                  <Check x="441" y="173" size={14} className={`transition-all duration-300 ${currentStep >= 4 ? "text-blue-600 opacity-100" : "text-slate-400 opacity-50 group-hover:text-blue-500"}`} />
                  <text x="448" y="212" textAnchor="middle" fill={currentStep >= 4 ? "#0f172a" : "#94a3b8"} opacity={currentStep >= 4 ? "1" : "0.65"} style={{ fontSize: '9.5px', fontWeight: currentStep >= 4 ? 700 : 500 }}>Approve</text>
                </g>

                {/* --- PARALLEL DESIGN NODES (590, y) --- */}
                <g onClick={() => handleSelectStep(5)} className="cursor-pointer group">
                  <circle cx="590" cy="56" r="14" fill="#ffffff" stroke={currentStep >= 5 ? "#2563eb" : "#e2e8f0"} strokeWidth={currentStep === 5 ? "2.5" : (currentStep > 5 ? "2" : "1.2")} opacity={currentStep >= 5 ? "1" : "0.55"} filter={currentStep === 5 ? "url(#blueGlow)" : undefined} className="transition-all duration-300 group-hover:stroke-blue-400 group-hover:opacity-100" />
                  {currentStep === 5 && <circle cx="590" cy="56" r="20" stroke="#2563eb" strokeWidth="1.5" fill="none" opacity="0.6" className="animate-ping" />}
                  <Layers3 x="583" y="49" size={14} className={`transition-all duration-300 ${currentStep >= 5 ? "text-blue-600 opacity-100" : "text-slate-400 opacity-50 group-hover:text-blue-500"}`} />
                  <text x="590" y="82" textAnchor="middle" fill={currentStep >= 5 ? "#0f172a" : "#94a3b8"} opacity={currentStep >= 5 ? "1" : "0.65"} style={{ fontSize: '9.5px', fontWeight: currentStep >= 5 ? 700 : 500 }}>System</text>
                </g>
                <g onClick={() => handleSelectStep(5)} className="cursor-pointer group">
                  <circle cx="590" cy="128" r="14" fill="#ffffff" stroke={currentStep >= 5 ? "#2563eb" : "#e2e8f0"} strokeWidth={currentStep === 5 ? "2.5" : (currentStep > 5 ? "2" : "1.2")} opacity={currentStep >= 5 ? "1" : "0.55"} filter={currentStep === 5 ? "url(#blueGlow)" : undefined} className="transition-all duration-300 group-hover:stroke-blue-400 group-hover:opacity-100" />
                  {currentStep === 5 && <circle cx="590" cy="128" r="20" stroke="#2563eb" strokeWidth="1.5" fill="none" opacity="0.6" className="animate-ping" />}
                  <Database x="583" y="121" size={14} className={`transition-all duration-300 ${currentStep >= 5 ? "text-blue-600 opacity-100" : "text-slate-400 opacity-50 group-hover:text-blue-500"}`} />
                  <text x="590" y="154" textAnchor="middle" fill={currentStep >= 5 ? "#0f172a" : "#94a3b8"} opacity={currentStep >= 5 ? "1" : "0.65"} style={{ fontSize: '9.5px', fontWeight: currentStep >= 5 ? 700 : 500 }}>DB</text>
                </g>
                <g onClick={() => handleSelectStep(5)} className="cursor-pointer group">
                  <circle cx="590" cy="200" r="14" fill="#ffffff" stroke={currentStep >= 5 ? "#2563eb" : "#e2e8f0"} strokeWidth={currentStep === 5 ? "2.5" : (currentStep > 5 ? "2" : "1.2")} opacity={currentStep >= 5 ? "1" : "0.55"} filter={currentStep === 5 ? "url(#blueGlow)" : undefined} className="transition-all duration-300 group-hover:stroke-blue-400 group-hover:opacity-100" />
                  {currentStep === 5 && <circle cx="590" cy="200" r="20" stroke="#2563eb" strokeWidth="1.5" fill="none" opacity="0.6" className="animate-ping" />}
                  <Cloud x="583" y="193" size={14} className={`transition-all duration-300 ${currentStep >= 5 ? "text-blue-600 opacity-100" : "text-slate-400 opacity-50 group-hover:text-blue-500"}`} />
                  <text x="590" y="226" textAnchor="middle" fill={currentStep >= 5 ? "#0f172a" : "#94a3b8"} opacity={currentStep >= 5 ? "1" : "0.65"} style={{ fontSize: '9.5px', fontWeight: currentStep >= 5 ? 700 : 500 }}>API Infra</text>
                </g>
                <g onClick={() => handleSelectStep(5)} className="cursor-pointer group">
                  <circle cx="590" cy="272" r="14" fill="#ffffff" stroke={currentStep >= 5 ? "#2563eb" : "#e2e8f0"} strokeWidth={currentStep === 5 ? "2.5" : (currentStep > 5 ? "2" : "1.2")} opacity={currentStep >= 5 ? "1" : "0.55"} filter={currentStep === 5 ? "url(#blueGlow)" : undefined} className="transition-all duration-300 group-hover:stroke-blue-400 group-hover:opacity-100" />
                  {currentStep === 5 && <circle cx="590" cy="272" r="20" stroke="#2563eb" strokeWidth="1.5" fill="none" opacity="0.6" className="animate-ping" />}
                  <Globe2 x="583" y="265" size={14} className={`transition-all duration-300 ${currentStep >= 5 ? "text-blue-600 opacity-100" : "text-slate-400 opacity-50 group-hover:text-blue-500"}`} />
                  <text x="590" y="298" textAnchor="middle" fill={currentStep >= 5 ? "#0f172a" : "#94a3b8"} opacity={currentStep >= 5 ? "1" : "0.65"} style={{ fontSize: '9.5px', fontWeight: currentStep >= 5 ? 700 : 500 }}>UI</text>
                </g>

                {/* --- PARALLEL BUILD NODES (760, y) --- */}
                <g onClick={() => handleSelectStep(6)} className="cursor-pointer group">
                  <circle cx="760" cy="96" r="16" fill="#ffffff" stroke={currentStep >= 6 ? "#2563eb" : "#e2e8f0"} strokeWidth={currentStep === 6 ? "2.8" : (currentStep > 6 ? "2.2" : "1.2")} opacity={currentStep >= 6 ? "1" : "0.55"} filter={currentStep === 6 ? "url(#blueGlow)" : undefined} className="transition-all duration-300 group-hover:stroke-blue-400 group-hover:opacity-100" />
                  {currentStep === 6 && <circle cx="760" cy="96" r="22" stroke="#2563eb" strokeWidth="1.5" fill="none" opacity="0.6" className="animate-ping" />}
                  <Code2 x="751" y="87" size={18} className={`transition-all duration-300 ${currentStep >= 6 ? "text-blue-600 opacity-100" : "text-slate-400 opacity-50 group-hover:text-blue-500"}`} />
                  <text x="760" y="128" textAnchor="middle" fill={currentStep >= 6 ? "#0f172a" : "#94a3b8"} opacity={currentStep >= 6 ? "1" : "0.65"} style={{ fontSize: '10px', fontWeight: currentStep >= 6 ? 700 : 500 }}>Code</text>
                </g>
                <g onClick={() => handleSelectStep(6)} className="cursor-pointer group">
                  <circle cx="760" cy="254" r="16" fill="#ffffff" stroke={currentStep >= 6 ? "#2563eb" : "#e2e8f0"} strokeWidth={currentStep === 6 ? "2.8" : (currentStep > 6 ? "2.2" : "1.2")} opacity={currentStep >= 6 ? "1" : "0.55"} filter={currentStep === 6 ? "url(#blueGlow)" : undefined} className="transition-all duration-300 group-hover:stroke-blue-400 group-hover:opacity-100" />
                  {currentStep === 6 && <circle cx="760" cy="254" r="22" stroke="#2563eb" strokeWidth="1.5" fill="none" opacity="0.6" className="animate-ping" />}
                  <Settings x="751" y="245" size={18} className={`transition-all duration-300 ${currentStep >= 6 ? "text-blue-600 opacity-100" : "text-slate-400 opacity-50 group-hover:text-blue-500"}`} />
                  <text x="760" y="286" textAnchor="middle" fill={currentStep >= 6 ? "#0f172a" : "#94a3b8"} opacity={currentStep >= 6 ? "1" : "0.65"} style={{ fontSize: '10px', fontWeight: currentStep >= 6 ? 700 : 500 }}>Setup</text>
                </g>

                {/* --- PARALLEL VALIDATE NODES (920, y) --- */}
                <g onClick={() => handleSelectStep(7)} className="cursor-pointer group">
                  <circle cx="920" cy="70" r="14" fill="#ffffff" stroke={currentStep >= 7 ? "#2563eb" : "#e2e8f0"} strokeWidth={currentStep === 7 ? "2.5" : (currentStep > 7 ? "2" : "1.2")} opacity={currentStep >= 7 ? "1" : "0.55"} filter={currentStep === 7 ? "url(#blueGlow)" : undefined} className="transition-all duration-300 group-hover:stroke-blue-400 group-hover:opacity-100" />
                  {currentStep === 7 && <circle cx="920" cy="70" r="20" stroke="#2563eb" strokeWidth="1.5" fill="none" opacity="0.6" className="animate-ping" />}
                  <Check x="913" y="63" size={14} className={`transition-all duration-300 ${currentStep >= 7 ? "text-blue-600 opacity-100" : "text-slate-400 opacity-50 group-hover:text-blue-500"}`} />
                  <text x="920" y="96" textAnchor="middle" fill={currentStep >= 7 ? "#0f172a" : "#94a3b8"} opacity={currentStep >= 7 ? "1" : "0.65"} style={{ fontSize: '9.5px', fontWeight: currentStep >= 7 ? 700 : 500 }}>Test</text>
                </g>
                <g onClick={() => handleSelectStep(7)} className="cursor-pointer group">
                  <circle cx="920" cy="180" r="14" fill="#ffffff" stroke={currentStep >= 7 ? "#2563eb" : "#e2e8f0"} strokeWidth={currentStep === 7 ? "2.5" : (currentStep > 7 ? "2" : "1.2")} opacity={currentStep >= 7 ? "1" : "0.55"} filter={currentStep === 7 ? "url(#blueGlow)" : undefined} className="transition-all duration-300 group-hover:stroke-blue-400 group-hover:opacity-100" />
                  {currentStep === 7 && <circle cx="920" cy="180" r="20" stroke="#2563eb" strokeWidth="1.5" fill="none" opacity="0.6" className="animate-ping" />}
                  <FileText x="913" y="173" size={14} className={`transition-all duration-300 ${currentStep >= 7 ? "text-blue-600 opacity-100" : "text-slate-400 opacity-50 group-hover:text-blue-500"}`} />
                  <text x="920" y="206" textAnchor="middle" fill={currentStep >= 7 ? "#0f172a" : "#94a3b8"} opacity={currentStep >= 7 ? "1" : "0.65"} style={{ fontSize: '9.5px', fontWeight: currentStep >= 7 ? 700 : 500 }}>Review</text>
                </g>
                <g onClick={() => handleSelectStep(7)} className="cursor-pointer group">
                  <circle cx="920" cy="288" r="14" fill="#ffffff" stroke={currentStep >= 7 ? "#2563eb" : "#e2e8f0"} strokeWidth={currentStep === 7 ? "2.5" : (currentStep > 7 ? "2" : "1.2")} opacity={currentStep >= 7 ? "1" : "0.55"} filter={currentStep === 7 ? "url(#blueGlow)" : undefined} className="transition-all duration-300 group-hover:stroke-blue-400 group-hover:opacity-100" />
                  {currentStep === 7 && <circle cx="920" cy="288" r="20" stroke="#2563eb" strokeWidth="1.5" fill="none" opacity="0.6" className="animate-ping" />}
                  <ShieldCheck x="913" y="281" size={14} className={`transition-all duration-300 ${currentStep >= 7 ? "text-blue-600 opacity-100" : "text-slate-400 opacity-50 group-hover:text-blue-500"}`} />
                  <text x="920" y="314" textAnchor="middle" fill={currentStep >= 7 ? "#0f172a" : "#94a3b8"} opacity={currentStep >= 7 ? "1" : "0.65"} style={{ fontSize: '9.5px', fontWeight: currentStep >= 7 ? 700 : 500 }}>Secure</text>
                </g>

                {/* --- SEQUENTIAL DELIVERY NODES (1080, 1210, 1330) --- */}
                <g onClick={() => handleSelectStep(8)} className="cursor-pointer group">
                  <circle cx="1080" cy="180" r="14" fill="#ffffff" stroke={currentStep >= 8 ? "#2563eb" : "#e2e8f0"} strokeWidth={currentStep === 8 ? "2.5" : (currentStep > 8 ? "2" : "1.2")} opacity={currentStep >= 8 ? "1" : "0.55"} filter={currentStep === 8 ? "url(#blueGlow)" : undefined} className="transition-all duration-300 group-hover:stroke-blue-400 group-hover:opacity-100" />
                  {currentStep === 8 && <circle cx="1080" cy="180" r="20" stroke="#2563eb" strokeWidth="1.5" fill="none" opacity="0.6" className="animate-ping" />}
                  <Zap x="1073" y="173" size={14} className={`transition-all duration-300 ${currentStep >= 8 ? "text-blue-600 opacity-100" : "text-slate-400 opacity-50 group-hover:text-blue-500"}`} />
                  <text x="1080" y="210" textAnchor="middle" fill={currentStep >= 8 ? "#0f172a" : "#94a3b8"} opacity={currentStep >= 8 ? "1" : "0.65"} style={{ fontSize: '9.5px', fontWeight: currentStep >= 8 ? 700 : 500 }}>Fix</text>
                </g>
                <g onClick={() => handleSelectStep(9)} className="cursor-pointer group">
                  <circle cx="1210" cy="180" r="15" fill="#ffffff" stroke={currentStep >= 9 ? "#2563eb" : "#e2e8f0"} strokeWidth={currentStep === 9 ? "2.5" : (currentStep > 9 ? "2" : "1.2")} opacity={currentStep >= 9 ? "1" : "0.55"} filter={currentStep === 9 ? "url(#blueGlow)" : undefined} className="transition-all duration-300 group-hover:stroke-blue-400 group-hover:opacity-100" />
                  {currentStep === 9 && <circle cx="1210" cy="180" r="21" stroke="#2563eb" strokeWidth="1.5" fill="none" opacity="0.6" className="animate-ping" />}
                  <ArrowRight x="1203" y="173" size={14} className={`transition-all duration-300 ${currentStep >= 9 ? "text-blue-600 opacity-100" : "text-slate-400 opacity-50 group-hover:text-blue-500"}`} />
                  <text x="1210" y="210" textAnchor="middle" fill={currentStep >= 9 ? "#0f172a" : "#94a3b8"} opacity={currentStep >= 9 ? "1" : "0.65"} style={{ fontSize: '9.5px', fontWeight: currentStep >= 9 ? 700 : 500 }}>Deploy</text>
                </g>
                <g onClick={() => handleSelectStep(10)} className="cursor-pointer group">
                  <circle cx="1330" cy="180" r="15" fill="#ffffff" stroke={currentStep >= 10 ? "#2563eb" : "#e2e8f0"} strokeWidth={currentStep === 10 ? "2.5" : (currentStep > 10 ? "2" : "1.2")} opacity={currentStep >= 10 ? "1" : "0.55"} filter={currentStep === 10 ? "url(#blueGlow)" : undefined} className="transition-all duration-300 group-hover:stroke-blue-400 group-hover:opacity-100" />
                  {currentStep === 10 && <circle cx="1330" cy="180" r="21" stroke="#2563eb" strokeWidth="1.5" fill="none" opacity="0.6" className="animate-ping" />}
                  <Activity x="1323" y="173" size={14} className={`transition-all duration-300 ${currentStep >= 10 ? "text-blue-600 opacity-100" : "text-slate-400 opacity-50 group-hover:text-blue-500"}`} />
                  <text x="1330" y="210" textAnchor="middle" fill={currentStep >= 10 ? "#0f172a" : "#94a3b8"} opacity={currentStep >= 10 ? "1" : "0.65"} style={{ fontSize: '9.5px', fontWeight: currentStep >= 10 ? 700 : 500 }}>Maintain</text>
                </g>

              </svg>
            </div>
          </div>

          {/* Navigation Arrows, Play/Pause & Interactive Step Text Footer */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 mt-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                className="text-slate-500 hover:text-blue-600 hover:bg-blue-50 p-2.5 rounded-full transition-all border border-slate-200 shadow-sm"
                aria-label="Previous Step"
              >
                <ArrowRight size={18} className="rotate-180" />
              </button>
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="text-slate-700 hover:text-blue-600 hover:bg-blue-50 p-2.5 rounded-full transition-all border border-slate-200 shadow-sm flex items-center justify-center"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="text-slate-500 hover:text-blue-600 hover:bg-blue-50 p-2.5 rounded-full transition-all border border-slate-200 shadow-sm"
                aria-label="Next Step"
              >
                <ArrowRight size={18} />
              </button>
            </div>

            <div className="text-center max-w-xl">
              <div className="inline-block bg-blue-500/10 text-blue-600 border border-blue-500/20 px-3 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest mb-1.5">
                AMSTURE FLOW · {activeStepInfo.phase} · STEP {String(currentStep + 1).padStart(2, '0')} OF 11
              </div>
              <div className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                <span className="text-blue-600 font-extrabold">{activeStepInfo.name}</span> — {activeStepInfo.desc}
              </div>
            </div>

            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {isPlaying ? (
                <span className="flex items-center gap-1.5 text-blue-600 bg-blue-50 border border-blue-200/80 px-2.5 py-1 rounded-full text-[11px]">
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span> Auto-Playing
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-slate-500 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-full text-[11px]">
                  Paused
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── INTERACTIVE SERVICES & SOLUTIONS SECTION ─── */
function ServicesSection() {
  const [activeCategory, setActiveCategory] = useState<string>("ai");
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const filteredServices = services.filter((s) => s.category === activeCategory);

  return (
    <section id="services" className="nv-section bg-gradient-to-b from-slate-50/70 via-white to-slate-50/50 relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-400/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="nv-wrap relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 nv-reveal">
          <div>
            <div className="nv-eyebrow flex items-center gap-2">
              <Sparkles size={14} className="text-blue-600" />
              <span>BUSINESS SOLUTIONS</span>
            </div>
            <h2 className="nv-section-h2 max-w-xl mt-2">
              Technology solutions <span className="text-blue-600">engineered</span> for outcomes.
            </h2>
          </div>
          <p className="text-[15px] text-[#555] max-w-sm leading-relaxed">
            Select a technology domain below to explore our core capabilities. Every solution addresses operational friction and delivers clear ROI.
          </p>
        </div>

        {/* Filter Category Pills Bar */}
        <div className="flex flex-wrap items-center justify-start sm:justify-center gap-2.5 mb-10 p-2 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-sm max-w-4xl mx-auto">
          {serviceCategories.map((cat) => {
            const CatIcon = cat.icon;
            const count = services.filter(s => s.category === cat.id).length;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/25 scale-[1.02]"
                    : "bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                }`}
              >
                <CatIcon size={16} className={isActive ? "text-white" : "text-blue-600"} />
                <span>{cat.name}</span>
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-extrabold ${
                  isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Animated Services Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((svc) => {
              const Icon = svc.icon;
              return (
                <motion.div
                  key={svc.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 15 }}
                  transition={{ duration: 0.25 }}
                  className="group relative bg-white border border-slate-200/90 hover:border-blue-500/40 rounded-2xl p-7 shadow-xs hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Top Header Card Info */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-xs">
                        <Icon size={22} />
                      </div>
                      <span className="text-[11px] font-extrabold tracking-wider bg-blue-50 text-blue-700 border border-blue-200/60 px-3 py-1 rounded-full uppercase">
                        {svc.badge}
                      </span>
                    </div>

                    <h3 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors mb-4">
                      {svc.title}
                    </h3>

                    {/* Problem & Solution Breakdown */}
                    <div className="space-y-3 mb-5">
                      <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-100">
                        <div className="text-[11px] font-extrabold uppercase text-slate-400 tracking-wider mb-1 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 inline-block" /> Challenge
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {svc.problem}
                        </p>
                      </div>

                      <div className="bg-blue-50/40 rounded-xl p-3 border border-blue-100/60">
                        <div className="text-[11px] font-extrabold uppercase text-blue-600 tracking-wider mb-1 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block" /> Our Solution
                        </div>
                        <p className="text-xs text-slate-700 leading-relaxed font-medium">
                          {svc.solution}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    {/* Benefit Highlight Badge */}
                    <div className="pt-4 border-t border-slate-100 flex items-start gap-2 mb-5">
                      <Check size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                      <p className="text-xs font-bold text-slate-800 leading-tight">
                        <span className="text-emerald-600 font-extrabold">Impact: </span>
                        {svc.benefit}
                      </p>
                    </div>

                    {/* Action Trigger Button */}
                    <button
                      type="button"
                      onClick={() => setSelectedService(svc)}
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 text-xs font-extrabold transition-all flex items-center justify-center gap-2 group/btn"
                    >
                      <span>Explore Tech Stack & Specs</span>
                      <ArrowUpRight size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Integrated Solution Ecosystem Footer Banner */}
        <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white border border-blue-900/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-600/30 border border-blue-400/30 flex items-center justify-center text-blue-400 shrink-0">
              <Zap size={24} />
            </div>
            <div>
              <h4 className="text-lg font-black">Need a custom multi-system solution?</h4>
              <p className="text-xs text-slate-300 mt-1 max-w-xl">
                We combine AI Automation, custom software, and enterprise ERP into a unified digital ecosystem tailored for your exact business requirements.
              </p>
            </div>
          </div>
          <a
            href="#contact"
            className="nv-cta-primary text-xs px-6 py-3 shrink-0 whitespace-nowrap bg-blue-600 hover:bg-blue-500"
          >
            Schedule Technical Assessment <ArrowRight size={16} />
          </a>
        </div>
      </div>

      {/* Interactive Solution Modal Overlay */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white border border-slate-200 max-w-2xl w-full rounded-2xl p-6 sm:p-8 shadow-2xl relative"
            >
              <button
                type="button"
                onClick={() => setSelectedService(null)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center transition-colors"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                  <selectedService.icon size={20} />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-md uppercase">
                    {selectedService.badge}
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mt-0.5">{selectedService.title}</h3>
                </div>
              </div>

              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                {selectedService.solution}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="text-xs font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                    <Check size={14} className="text-blue-600" /> Deliverables & Scope
                  </div>
                  <ul className="space-y-1.5">
                    {selectedService.highlights.map((h, idx) => (
                      <li key={idx} className="text-xs text-slate-600 flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-blue-600" /> {h}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="text-xs font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                    <Code2 size={14} className="text-blue-600" /> Technology Stack
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedService.tech.map((t, idx) => (
                      <span key={idx} className="text-[11px] font-semibold bg-white border border-slate-200 text-slate-700 px-2.5 py-1 rounded-md">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
                <div className="text-xs text-slate-500 text-center sm:text-left">
                  Guaranteed outcome: <span className="font-bold text-slate-800">{selectedService.benefit}</span>
                </div>
                <a
                  href="#contact"
                  onClick={() => setSelectedService(null)}
                  className="nv-cta-primary text-xs px-5 py-2.5 w-full sm:w-auto text-center"
                >
                  Discuss This Solution <ArrowRight size={14} />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
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
                  <div className="text-2xl font-black text-blue-600">15+</div>
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">Projects Delivered</div>
                </div>
                <div className="p-2 text-center border-r border-slate-100 last:border-r-0">
                  <div className="text-2xl font-black text-blue-600">100%</div>
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">Client Satisfaction</div>
                </div>
                <div className="p-2 text-center border-r border-slate-100 last:border-r-0">
                  <div className="text-2xl font-black text-blue-600">35%</div>
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

        {/* ── ULTRA-PREMIUM ANIMATED FEATURE TICKER STRIP ── */}
        <section className="nv-ticker">
          <div className="nv-ticker-inner">
            {[...tickerData, ...tickerData, ...tickerData].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="nv-ticker-item">
                  <div className="w-6 h-6 rounded-lg bg-blue-500/20 text-cyan-400 flex items-center justify-center shrink-0 border border-blue-400/30">
                    <Icon size={13} />
                  </div>
                  <span>{item.name}</span>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-blue-500/20 text-cyan-300 border border-cyan-400/30 tracking-wider">
                    {item.badge}
                  </span>
                  <span className="nv-ticker-sep">✦</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── STATS SECTION ── */}
        <section className="nv-section bg-white">
          <div className="nv-wrap">
            <div className="nv-stats-grid nv-reveal">
              <div className="nv-stat-card">
                <div className="nv-stat-num">15+</div>
                <div className="nv-stat-label">Projects delivered</div>
              </div>
              <div className="nv-stat-card">
                <div className="nv-stat-num">100%</div>
                <div className="nv-stat-label">Client satisfaction</div>
              </div>
              <div className="nv-stat-card">
                <div className="nv-stat-num">6+</div>
                <div className="nv-stat-label">Industries served</div>
              </div>
              <div className="nv-stat-card">
                <div className="nv-stat-num">35%</div>
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

        {/* ── PARALLEL, NOT SEQUENTIAL (AI SDLC) SECTION ── */}
        <ParallelSDLCSection />

        {/* ── SERVICES SECTION ── */}
        <ServicesSection />

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
        <div className="nv-wrap space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-slate-200">
            {/* Brand Column */}
            <div className="md:col-span-4 space-y-4">
              <Logo />
              <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
                Amsture Technologies is a trusted digital transformation partner engineering custom software, AI automation, and cloud infrastructure.
              </p>
            </div>

            {/* Navigation Column */}
            <div className="md:col-span-4 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-900">Quick Links</div>
              <div className="grid grid-cols-2 gap-2 text-xs font-medium text-slate-600">
                <a href="#about" className="hover:text-blue-600 transition-colors">About Us</a>
                <a href="#services" className="hover:text-blue-600 transition-colors">Services</a>
                <a href="#leadership" className="hover:text-blue-600 transition-colors">Leadership</a>
                <a href="#industries" className="hover:text-blue-600 transition-colors">Industries</a>
                <a href="#process" className="hover:text-blue-600 transition-colors">Process</a>
                <a href="#work" className="hover:text-blue-600 transition-colors">Work</a>
                <a href="#faq" className="hover:text-blue-600 transition-colors">FAQ</a>
                <a href="#contact" className="hover:text-blue-600 transition-colors font-bold text-blue-600">Contact Us</a>
              </div>
            </div>

            {/* Direct Contact Column */}
            <div className="md:col-span-4 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-900">Contact Details</div>
              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-blue-600 shrink-0" />
                  <a href="mailto:support@amsture.com" className="hover:text-blue-600 transition-colors">support@amsture.com</a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-blue-600 shrink-0" />
                  <a href="tel:+919698681919" className="hover:text-blue-600 transition-colors">+91 9698681919</a>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-blue-600 shrink-0" />
                  <span>Pune, Maharashtra, India</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2 text-xs text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-4">
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
