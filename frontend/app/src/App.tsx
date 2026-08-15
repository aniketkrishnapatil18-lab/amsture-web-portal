import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { Route, Switch, Router as WouterRouter } from "wouter";
import { motion, AnimatePresence, useAnimationControls } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bot,
  BrainCircuit,
  Check,
  ChevronDown,
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
  Network,
  Phone,
  Plus,
  Quote,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users,
  X,
  Zap,
  Building2,
  Code2,
  Database,
  Settings,
  Smartphone,
  HeartHandshake,
  Award as Trophy,
  Calendar,
  Cpu,
  Activity,
  Shield,
  Play,
  Pause,
  Sun,
  Moon,
  Palette,
} from "lucide-react";
import heroImage from "@assets/generated_images/nexovate-hero.png";
import aiImage from "@assets/generated_images/nexovate-ai.png";
import aniketImage from "@assets/generated_images/aniket-patil.jpg";
import shrutikaImage from "@assets/generated_images/shrutika-salunke.jpg";
import mayurImage from "@assets/generated_images/Mayur-Deshmukh.png";
import atOfficialLogo from "@assets/generated_images/at-official-logo.png";
import React, {
  FormEvent,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

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
  image: string;
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
    image: "/images/services/ai-auto.jpg",
    title: "AI Automation & Workflows",
    badge: "HIGH ROI",
    problem:
      "Repetitive manual tasks consuming your team's best productive hours.",
    solution:
      "Custom AI agents & intelligent automation connected to your software stack.",
    benefit: "80% reduction in processing time & zero human data entry errors.",
    highlights: [
      "Custom LLM & Agent Integration",
      "Automated Document Processing",
      "Intelligent Triaging",
    ],
    tech: ["Python", "OpenAI / Claude", "LangChain", "Node.js"],
  },
  {
    id: "process",
    category: "ai",
    icon: Settings,
    image: "/images/services/process.jpg",
    title: "Process Automation & RPA",
    badge: "POPULAR",
    problem:
      "Manual, fragmented business processes causing operational delays.",
    solution:
      "End-to-end workflow automation mapped directly to your core operations.",
    benefit:
      "Fewer operational bottlenecks & 20+ hours saved per employee weekly.",
    highlights: [
      "REST API Connectors",
      "Automated Approval Chains",
      "Real-Time Triggers",
    ],
    tech: ["n8n", "Zapier Enterprise", "Node.js", "Python"],
  },
  {
    id: "dashboards",
    category: "ai",
    icon: BarChart3,
    image: "/images/services/dashboards.jpg",
    title: "AI Analytics & Dashboards",
    badge: "REAL-TIME",
    problem:
      "No real-time visibility into operational KPIs and business health.",
    solution:
      "Interactive dashboards surfacing actionable insights with predictive analytics.",
    benefit:
      "Faster, data-backed decisions across executive and operations teams.",
    highlights: [
      "Live Streamed Metrics",
      "Predictive Trend Forecasting",
      "Role-Based Views",
    ],
    tech: ["Recharts", "PostgreSQL", "React", "TypeScript"],
  },
  {
    id: "web",
    category: "software",
    icon: Globe2,
    image: "/images/services/web.jpg",
    title: "Business Websites & Portals",
    badge: "SEO FIRST",
    problem:
      "Outdated, slow websites that fail to convert visitors into qualified leads.",
    solution:
      "Fast, mobile-optimized, SEO-first websites engineered for business growth.",
    benefit: "3x lead conversion boost & top-tier Google search rankings.",
    highlights: [
      "Sub-second Page Load Speed",
      "Schema.org Structured Data",
      "Conversion-Focused UX",
    ],
    tech: ["React", "Vite", "TailwindCSS", "TypeScript"],
  },
  {
    id: "apps",
    category: "software",
    icon: Code2,
    image: "/images/services/apps.jpg",
    title: "Custom Business Software",
    badge: "TAILORED",
    problem:
      "Off-the-shelf software failing to fit your unique operational workflows.",
    solution:
      "Bespoke web applications built precisely around your company's rules.",
    benefit:
      "Seamless operational scale without costly per-user licensing fees.",
    highlights: [
      "Custom Database Architecture",
      "Granular Access Control",
      "Scalable REST APIs",
    ],
    tech: ["Node.js", "Express", "React", "PostgreSQL"],
  },
  {
    id: "mobile",
    category: "software",
    icon: Smartphone,
    image: "/images/services/mobile.jpg",
    title: "Native Mobile Applications",
    badge: "IOS & ANDROID",
    problem:
      "No dedicated mobile application limiting customer reach and access.",
    solution:
      "High-performance iOS & Android mobile apps with frictionless UX.",
    benefit: "Direct customer communication channel & increased engagement.",
    highlights: [
      "Cross-Platform Efficiency",
      "Offline Data Sync",
      "Push Notification Hub",
    ],
    tech: ["React Native", "Expo", "TypeScript", "REST APIs"],
  },
  {
    id: "erp",
    category: "enterprise",
    icon: Database,
    image: "/images/services/erp.jpg",
    title: "Enterprise ERP Systems",
    badge: "CORE OPS",
    problem:
      "Disconnected software creating blind spots between inventory, sales & finance.",
    solution:
      "Unified ERP connecting operations, inventory, finance & HR in real-time.",
    benefit: "Complete operational clarity & automated multi-department sync.",
    highlights: [
      "Inventory & Supply Chain",
      "Automated Financial Billing",
      "Multi-Location Support",
    ],
    tech: ["Drizzle ORM", "PostgreSQL", "Express", "TypeScript"],
  },
  {
    id: "crm",
    category: "enterprise",
    icon: Users,
    image: "/images/services/crm.jpg",
    title: "Custom CRM Platforms",
    badge: "SALES BOOST",
    problem:
      "Lead data scattered across spreadsheets and missed deal follow-ups.",
    solution:
      "Tailored CRM structured directly around your lead-to-close pipeline.",
    benefit: "40% faster proposal cycle & increased customer retention.",
    highlights: [
      "Kanban Deal Pipelines",
      "Automated Email Sequences",
      "Interaction Timelines",
    ],
    tech: ["React", "Node.js", "PostgreSQL", "TailwindCSS"],
  },
  {
    id: "cloud",
    category: "cloud",
    icon: Cloud,
    image: "/images/services/cloud.jpg",
    title: "Cloud & DevOps Infrastructure",
    badge: "99.9% UPTIME",
    problem:
      "Scaling server infrastructure is slow, vulnerable, and expensive.",
    solution:
      "Modern cloud migration, serverless architecture, and CI/CD pipelines.",
    benefit: "99.99% uptime, robust enterprise security & lower hosting costs.",
    highlights: [
      "Automated Deployments",
      "Containerized Architecture",
      "24/7 Health Monitoring",
    ],
    tech: ["Docker", "AWS", "GitHub Actions", "Nginx"],
  },
  {
    id: "transformation",
    category: "cloud",
    icon: Compass,
    image: "/images/services/transformation.jpg",
    title: "Digital Transformation & Strategy",
    badge: "STRATEGIC",
    problem:
      "Fragmented tech stack creating internal friction and slow execution.",
    solution:
      "Senior strategic advisory connecting technology investments directly to ROI.",
    benefit:
      "A streamlined tech roadmap & elimination of redundant software spend.",
    highlights: [
      "Tech Architecture Audit",
      "Legacy Modernization Plan",
      "Security Compliance",
    ],
    tech: ["Enterprise Blueprints", "ROI Metrics", "Security Standards"],
  },
];

const industries = [
  {
    name: "Healthcare",
    icon: HeartHandshake,
    stat: "31%",
    label: "less admin time",
    body: "Give care teams more time for patients and less time on paperwork with intelligent systems built for compliance and speed.",
  },
  {
    name: "Education",
    icon: FileText,
    stat: "43k",
    label: "hours returned annually",
    body: "Streamline enrolment, learning management and reporting so your institution can focus on student outcomes.",
  },
  {
    name: "Manufacturing",
    icon: Layers3,
    stat: "18%",
    label: "fewer production delays",
    body: "Connect the shop floor to the boardroom with live operational data and automated quality control.",
  },
  {
    name: "Retail",
    icon: Sparkles,
    stat: "26%",
    label: "more repeat customers",
    body: "Personalise every customer experience while streamlining your inventory, loyalty and operations.",
  },
  {
    name: "Real Estate",
    icon: Building2,
    stat: "2.1x",
    label: "faster deal closings",
    body: "Digitise your property pipeline from first enquiry to signed contract with intelligent CRM and document workflows.",
  },
  {
    name: "Finance",
    icon: TrendingUp,
    stat: "40%",
    label: "faster reporting",
    body: "Build compliant, intelligent systems your clients trust with their money — from onboarding to reporting.",
  },
  {
    name: "Professional Services",
    icon: Network,
    stat: "2.4x",
    label: "faster proposals",
    body: "From scattered expertise to one confident client journey — with connected CRM, proposals and delivery tracking.",
  },
];

const faqs = [
  {
    q: "How long does a typical project take?",
    a: "Most engagements run 4–12 weeks depending on scope. Discovery usually takes two weeks, and we share a clear milestone roadmap so you always know what comes next.",
  },
  {
    q: "How does pricing work?",
    a: "We offer transparent fixed-scope and retainer models. You receive a detailed proposal with no hidden costs after a free consultation.",
  },
  {
    q: "Do you work with our existing team?",
    a: "Yes. Amsture Technologies works alongside your internal team and existing partners with a clear ownership model from day one.",
  },
  {
    q: "What does post-launch support look like?",
    a: "Every project includes a handover period and close support. We offer flexible maintenance and continuous improvement plans.",
  },
  {
    q: "How do you approach AI projects responsibly?",
    a: "We start with the business goal, not the tool. Every AI workflow is scoped around privacy, review points and explainability.",
  },
  {
    q: "What happens during the discovery phase?",
    a: "Discovery is a focused working session to map your friction, understand your priorities and identify the smallest valuable next step.",
  },
];

const testimonials = [
  {
    quote:
      "Amsture Technologies gave us the confidence to make a difficult technology decision. The work was sharp, but the real difference was how understood we felt throughout.",
    name: "Elena Morris",
    role: "COO, Wellstead Group",
    stars: 5,
  },
  {
    quote:
      "We stopped talking about transformation as a project. It became a better way of making decisions every week. Productivity improved 35% in the first quarter.",
    name: "Marcus Iqbal",
    role: "MD, Kindred Advisory",
    stars: 5,
    featured: true,
  },
  {
    quote:
      "The team brought structure without slowing us down. Within a month our people could see where the business was heading.",
    name: "Priya Sharma",
    role: "Operations Director, Harlow Works",
    stars: 5,
  },
];

/* ── EXACTLY THREE LEADERS: ANIKET PATIL (FOUNDER), SHRUTIKA SALUNKE (CEO) & MAYUR DESHMUKH (CO-FOUNDER) ── */
const executiveTeam = [
  {
    name: "Aniket Patil",
    role: "Founder & Owner",
    tag: "FOUNDER & OWNER",
    img: aniketImage,
    bio: "Pioneered Amsture Technologies' founding vision with hands-on expertise in modern software development, cloud infrastructure, and DevOps automation.",
    highlights: [
      "Software Engineering",
      "DevOps Specialist",
      "Cloud Infrastructure",
    ],
    linkedin: "https://linkedin.com",
    email: "aniket.patil@amsture.com",
  },
  {
    name: "Shrutika Salunke",
    role: "Chief Executive Officer (CEO)",
    tag: "CEO",
    img: shrutikaImage,
    bio: "Leads Amsture Technologies as CEO, driving company strategy, operational excellence, high-performance web applications, and UI design systems.",
    highlights: [
      "Corporate Leadership",
      "Frontend Engineering",
      "Software Development",
    ],
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
  {
    name: "AI Automation & Workflows",
    icon: BrainCircuit,
    badge: "HIGH ROI",
    desc: "Autonomous AI agents & LLM task pipelines.",
  },
  {
    name: "Custom Web Software",
    icon: Code2,
    badge: "BESPOKE",
    desc: "Tailored enterprise web applications.",
  },
  {
    name: "Enterprise ERP Systems",
    icon: Database,
    badge: "CORE OPS",
    desc: "Unified business & operational control.",
  },
  {
    name: "Native Mobile Apps",
    icon: Smartphone,
    badge: "IOS & ANDROID",
    desc: "High-performance mobile applications.",
  },
  {
    name: "Business Websites",
    icon: Globe2,
    badge: "SEO FIRST",
    desc: "Fast, search-ranked lead generation.",
  },
  {
    name: "Cloud Infrastructure",
    icon: Cloud,
    badge: "99.99% UPTIME",
    desc: "DevOps automation & secure hosting.",
  },
  {
    name: "Tailored CRM Platforms",
    icon: Users,
    badge: "SALES BOOST",
    desc: "Pipeline management & automated leads.",
  },
  {
    name: "Process Automation",
    icon: Settings,
    badge: "WORKFLOWS",
    desc: "Eliminate manual tasks & approvals.",
  },
  {
    name: "AI Business Analytics",
    icon: BarChart3,
    badge: "REAL-TIME",
    desc: "Predictive dashboards & live metrics.",
  },
  {
    name: "Digital Strategy & Advisory",
    icon: Compass,
    badge: "GROWTH",
    desc: "Tech roadmap planning & execution.",
  },
  {
    name: "DevOps & CI/CD",
    icon: Activity,
    badge: "AUTOMATED",
    desc: "Continuous integration & deployment pipelines.",
  },
  {
    name: "Security & Compliance",
    icon: Shield,
    badge: "HARDENED",
    desc: "Threat modeling & regulatory compliance.",
  },
  {
    name: "QA & Testing",
    icon: Target,
    badge: "VERIFIED",
    desc: "Automated & manual test coverage.",
  },
  {
    name: "UI/UX Design",
    icon: Palette,
    badge: "DESIGN-LED",
    desc: "Research-driven interfaces & prototypes.",
  },
];

type CapabilityItem = (typeof tickerData)[number];

interface FlipCardHandle {
  flipTo: (item: CapabilityItem) => Promise<void>;
}

/* ─── 3D flip tile: swaps its icon/label via a two-phase rotateX flip ─── */
const FlipCapabilityCard = forwardRef<
  FlipCardHandle,
  { initial: CapabilityItem }
>(function FlipCapabilityCard({ initial }, ref) {
  const [item, setItem] = useState<CapabilityItem>(initial);
  const controls = useAnimationControls();
  const isFlipping = useRef(false);

  useImperativeHandle(ref, () => ({
    flipTo: async (nextItem: CapabilityItem) => {
      if (isFlipping.current) return;
      isFlipping.current = true;
      try {
        // Flip up / out — rotate to the invisible vertical edge.
        await controls.start({
          rotateX: -90,
          filter: "blur(8px)",
          opacity: 0,
          transition: { duration: 0.1, ease: [0.4, 0, 1, 1] },
        });
        // Swap content at the invisible midpoint, then snap to the mirrored edge.
        setItem(nextItem);
        await controls.start({
          rotateX: 90,
          filter: "blur(8px)",
          opacity: 0,
          transition: { duration: 0 },
        });
        // Flip down / in — settle into the resting position.
        await controls.start({
          rotateX: 0,
          filter: "blur(0px)",
          opacity: 1,
          transition: { duration: 0.32, ease: [0, 0, 0.2, 1] },
        });
      } finally {
        isFlipping.current = false;
      }
    },
  }));

  const Icon = item.icon;

  return (
    <a
      href="#services"
      className="group flex flex-col items-center justify-center text-center gap-2.5 py-8 px-4 border-r border-b border-slate-200 dark:border-slate-800 no-underline hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
      style={{ perspective: 500 }}
    >
      <motion.div
        animate={controls}
        initial={false}
        style={{ transformStyle: "preserve-3d" }}
        className="flex flex-col items-center gap-2.5"
      >
        <Icon
          size={26}
          className="text-slate-400 group-hover:text-blue-600 dark:text-slate-500 dark:group-hover:text-blue-400 transition-colors"
        />
        <span className="text-sm font-bold text-slate-700 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
          {item.name}
        </span>
      </motion.div>
    </a>
  );
});

const CAPABILITY_SLOT_COUNT = 10;

/* ─── Grid of flip tiles with a background scheduler that subtly rotates
   in capabilities not currently shown, one flip at a time ─── */
function CapabilitiesFlipGrid() {
  const [mounted, setMounted] = useState(false);
  const slotItemsRef = useRef<CapabilityItem[]>(
    tickerData.slice(0, CAPABILITY_SLOT_COUNT),
  );
  const cardRefs = useRef<(FlipCardHandle | null)[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    let cancelled = false;
    let flipping = false;

    async function loop() {
      while (!cancelled) {
        const delay = 1600 + Math.random() * 2800;
        await new Promise((resolve) => setTimeout(resolve, delay));
        if (cancelled || flipping) continue;

        const visibleNames = new Set(
          slotItemsRef.current.map((it) => it.name),
        );
        const candidates = tickerData.filter(
          (it) => !visibleNames.has(it.name),
        );
        if (candidates.length === 0) continue;

        const slotIdx = Math.floor(Math.random() * CAPABILITY_SLOT_COUNT);
        const nextItem =
          candidates[Math.floor(Math.random() * candidates.length)];

        // Claim the slot + item synchronously (no await above) to avoid races.
        slotItemsRef.current[slotIdx] = nextItem;
        flipping = true;

        cardRefs.current[slotIdx]?.flipTo(nextItem).finally(() => {
          flipping = false;
        });
      }
    }

    loop();
    return () => {
      cancelled = true;
    };
  }, [mounted]);

  const gridClassName =
    "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 border-t border-l border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden max-w-7xl mx-auto nv-reveal d2";

  // Static fallback on first paint — avoids animating before the client has mounted.
  if (!mounted) {
    return (
      <div className={gridClassName}>
        {tickerData.slice(0, CAPABILITY_SLOT_COUNT).map((item, idx) => {
          const Icon = item.icon;
          return (
            <a
              key={idx}
              href="#services"
              className="group flex flex-col items-center justify-center text-center gap-2.5 py-8 px-4 border-r border-b border-slate-200 dark:border-slate-800 no-underline hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
            >
              <Icon
                size={26}
                className="text-slate-400 group-hover:text-blue-600 dark:text-slate-500 dark:group-hover:text-blue-400 transition-colors"
              />
              <span className="text-sm font-bold text-slate-700 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                {item.name}
              </span>
            </a>
          );
        })}
      </div>
    );
  }

  return (
    <div className={gridClassName}>
      {slotItemsRef.current.map((item, idx) => (
        <FlipCapabilityCard
          key={idx}
          ref={(el) => {
            cardRefs.current[idx] = el;
          }}
          initial={item}
        />
      ))}
    </div>
  );
}

/* ─── About story panels (used by the animated carousel) ─── */
const aboutStory = [
  {
    tag: "THE BEGINNING",
    num: "01",
    title: "We know your business before we write a line.",
    italic: "Not another dev shop.",
    stat: "15+ projects delivered",
    statSub: "for growing businesses worldwide",
    tone: "light" as const,
  },
  {
    tag: "THE VISION",
    num: "02",
    title: "The trusted transformation partner.",
    italic: "For businesses that refuse to settle.",
    stat: "100% client satisfaction",
    statSub: "across every engagement",
    tone: "tint" as const,
  },
  {
    tag: "THE MISSION",
    num: "03",
    title: "Software that removes friction.",
    italic: "And unlocks real growth.",
    stat: "35% avg. efficiency gain",
    statSub: "measured post-launch",
    tone: "solid" as const,
  },
  {
    tag: "WHY US",
    num: "GO",
    title: "Business first. Technology second.",
    italic: "Transparent. Dependable. Focused.",
    stat: "6+ industries served",
    statSub: "and counting",
    tone: "navy" as const,
  },
];

/* ─── About Section Story Carousel (scroll-snap panels, progress bar, dots) ─── */
function AboutStoryCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const maxIndexRef = useRef(0);
  const [index, setIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const scrollToIndex = (i: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(i, maxIndexRef.current));
    const panelWidth = el.scrollWidth / aboutStory.length;
    el.scrollTo({ left: clamped * panelWidth, behavior: "smooth" });
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    // How many panels actually fit on screen determines how many snap
    // positions are reachable (e.g. 4 panels, 3 visible on desktop = only
    // 2 valid stops) — without this, scrollToIndex() past the last
    // reachable stop is silently clamped by the browser and looks "stuck".
    const computeMaxIndex = () => {
      const panelWidth = el.scrollWidth / aboutStory.length;
      const visibleCount = Math.max(1, Math.round(el.clientWidth / panelWidth));
      const next = Math.max(0, aboutStory.length - visibleCount);
      maxIndexRef.current = next;
      setMaxIndex(next);
    };

    const handleScroll = () => {
      const maxScroll = el.scrollWidth - el.clientWidth;
      setProgress(maxScroll > 0 ? (el.scrollLeft / maxScroll) * 100 : 0);
      const panelWidth = el.scrollWidth / aboutStory.length;
      const newIndex = Math.round(el.scrollLeft / panelWidth);
      indexRef.current = newIndex;
      setIndex(newIndex);
    };

    computeMaxIndex();
    handleScroll();
    el.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", computeMaxIndex);
    return () => {
      el.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", computeMaxIndex);
    };
  }, []);

  // Auto-advance to the next reachable card, looping back to the first; pauses on hover.
  useEffect(() => {
    if (isHovering) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => {
      const next = (indexRef.current + 1) % (maxIndexRef.current + 1);
      scrollToIndex(next);
    }, 4000);
    return () => clearInterval(timer);
  }, [isHovering]);

  const toneBg: Record<string, string> = {
    light: "bg-white",
    tint: "bg-blue-50/70",
    solid: "bg-blue-600",
    navy: "bg-[#0d2f7a]",
  };
  const toneNum: Record<string, string> = {
    light: "text-blue-600",
    tint: "text-blue-600",
    solid: "text-white",
    navy: "text-white",
  };
  const toneBgNum: Record<string, string> = {
    light: "text-blue-600/[0.06]",
    tint: "text-blue-600/[0.08]",
    solid: "text-white/10",
    navy: "text-white/[0.06]",
  };
  const darkTones = ["solid", "navy"];

  return (
    <div>
      <div
        className="rounded-3xl border border-slate-200 overflow-hidden shadow-sm"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {aboutStory.map((item, idx) => {
            const isDark = darkTones.includes(item.tone);
            return (
              <div
                key={idx}
                className={`relative flex-none w-full sm:w-1/2 lg:w-1/3 snap-start overflow-hidden px-8 py-10 sm:px-10 sm:py-12 ${toneBg[item.tone]}`}
              >
                <span
                  className={`absolute -bottom-4 right-4 font-black leading-none select-none pointer-events-none text-[140px] sm:text-[170px] ${toneBgNum[item.tone]}`}
                >
                  {item.num}
                </span>

                <div className="relative z-10">
                  <div
                    className={`flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase mb-6 ${
                      isDark ? "text-blue-100" : "text-slate-500"
                    }`}
                  >
                    <span
                      className={`w-5 h-px ${isDark ? "bg-blue-200" : "bg-slate-400"}`}
                    />
                    {item.tag}
                  </div>

                  <div
                    className={`text-6xl font-black tracking-tight mb-8 ${toneNum[item.tone]}`}
                  >
                    {item.num}
                  </div>

                  <p
                    className={`text-lg font-semibold leading-snug ${isDark ? "text-white" : "text-slate-800"}`}
                  >
                    {item.title}
                    <em
                      className={`block font-serif italic font-medium mt-1 ${
                        isDark ? "text-blue-100" : "text-slate-500"
                      }`}
                    >
                      {item.italic}
                    </em>
                  </p>

                  <div
                    className={`mt-10 pt-5 border-t ${isDark ? "border-white/25" : "border-slate-200"}`}
                  >
                    <div
                      className={`text-sm font-bold ${isDark ? "text-white" : "text-slate-900"}`}
                    >
                      {item.stat}
                    </div>
                    <div
                      className={`text-xs mt-0.5 ${isDark ? "text-blue-100" : "text-slate-500"}`}
                    >
                      {item.statSub}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 h-[3px] w-full bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-600 transition-[width] duration-200 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              type="button"
              aria-label={`Go to slide ${idx + 1}`}
              onClick={() => scrollToIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === index ? "w-6 bg-blue-600" : "w-2 bg-slate-300"
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous"
            onClick={() => scrollToIndex(index - 1)}
            disabled={index === 0}
            className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:border-blue-600 hover:text-blue-600 disabled:opacity-30 disabled:hover:border-slate-200 disabled:hover:text-slate-500 transition-colors"
          >
            <ArrowRight size={16} className="rotate-180" />
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => scrollToIndex(index + 1)}
            disabled={index === maxIndex}
            className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:border-blue-600 hover:text-blue-600 disabled:opacity-30 disabled:hover:border-slate-200 disabled:hover:text-slate-500 transition-colors"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Refined Robotics Animated HUD Background Component ─── */
function RoboticsHeaderAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-40">
      <svg
        className="w-full h-full"
        viewBox="0 0 1200 700"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="hudGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0066ff" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0066ff" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Radial HUD Glow centered behind hero header */}
        <circle cx="600" cy="320" r="380" fill="url(#hudGlow)" />

        {/* Rotating Outer HUD Ring */}
        <g
          className="nv-robotics-hud-ring-1"
          style={{ transformOrigin: "600px 320px" }}
        >
          <circle
            cx="600"
            cy="320"
            r="300"
            stroke="#0066ff"
            strokeWidth="1.5"
            strokeDasharray="12 8 4 8"
            opacity="0.5"
          />
          <circle
            cx="600"
            cy="320"
            r="270"
            stroke="#00d4e8"
            strokeWidth="1"
            strokeDasharray="40 10 10 10"
            opacity="0.4"
          />
        </g>

        {/* Counter Rotating Mid Ring */}
        <g
          className="nv-robotics-hud-ring-2"
          style={{ transformOrigin: "600px 320px" }}
        >
          <circle
            cx="600"
            cy="320"
            r="220"
            stroke="#0066ff"
            strokeWidth="2"
            strokeDasharray="80 30"
            opacity="0.4"
          />
          <circle
            cx="600"
            cy="320"
            r="195"
            stroke="#00d4e8"
            strokeWidth="1"
            strokeDasharray="6 6"
            opacity="0.5"
          />
          <line
            x1="380"
            y1="320"
            x2="820"
            y2="320"
            stroke="#0066ff"
            strokeWidth="1"
            opacity="0.25"
          />
          <line
            x1="600"
            y1="100"
            x2="600"
            y2="540"
            stroke="#0066ff"
            strokeWidth="1"
            opacity="0.25"
          />
        </g>

        {/* Inner Fast HUD Target Ring */}
        <g
          className="nv-robotics-hud-ring-3"
          style={{ transformOrigin: "600px 320px" }}
        >
          <circle
            cx="600"
            cy="320"
            r="140"
            stroke="#0066ff"
            strokeWidth="2"
            strokeDasharray="20 40 10 30"
            opacity="0.6"
          />
          <circle
            cx="600"
            cy="320"
            r="100"
            stroke="#00d4e8"
            strokeWidth="1.5"
            opacity="0.5"
          />
        </g>

        {/* Target Reticle Precision Lines */}
        <g opacity="0.75">
          <path
            d="M585 305 L595 305 L595 315"
            stroke="#0066ff"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M615 305 L605 305 L605 315"
            stroke="#0066ff"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M585 335 L595 335 L595 325"
            stroke="#0066ff"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M615 335 L605 335 L605 325"
            stroke="#0066ff"
            strokeWidth="2"
            fill="none"
          />
        </g>
      </svg>
    </div>
  );
}

/* ─── Cursor-Reactive Bubble Field (hero background particles that hug the text, never behind it) ─── */
type ExclusionRect = {
  left: number;
  right: number;
  top: number;
  bottom: number;
};

function CursorBubbleField({
  excludeRef,
}: {
  excludeRef?: React.RefObject<HTMLElement | null>;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const colors = ["#5b9dff", "#5ee3f2"];
    const HALO = 120; // how far the "near the text" band extends beyond the text block
    const TEXT_PAD = 24; // breathing room kept clear right against the text edges

    let width = 0;
    let height = 0;
    let exclusion: ExclusionRect | null = null;
    let particles: {
      baseX: number;
      baseY: number;
      x: number;
      y: number;
      r: number;
      color: string;
      phase: number;
      speed: number;
      drift: number;
    }[] = [];

    const getExclusionRect = (): ExclusionRect | null => {
      const el = excludeRef?.current;
      if (!el) return null;
      const elRect = el.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      return {
        left: elRect.left - containerRect.left - TEXT_PAD,
        right: elRect.right - containerRect.left + TEXT_PAD,
        top: elRect.top - containerRect.top - TEXT_PAD,
        bottom: elRect.bottom - containerRect.top + TEXT_PAD,
      };
    };

    // Pushes a point that's inside the text's exclusion box out to its nearest edge,
    // so particles only ever sit in the halo band around the text, never on top of it.
    const keepOutsideText = (
      x: number,
      y: number,
    ): { x: number; y: number } => {
      if (!exclusion) return { x, y };
      const { left, right, top, bottom } = exclusion;
      if (x <= left || x >= right || y <= top || y >= bottom) return { x, y };
      const distLeft = x - left;
      const distRight = right - x;
      const distTop = y - top;
      const distBottom = bottom - y;
      const minDist = Math.min(distLeft, distRight, distTop, distBottom);
      if (minDist === distLeft) return { x: left, y };
      if (minDist === distRight) return { x: right, y };
      if (minDist === distTop) return { x, y: top };
      return { x, y: bottom };
    };

    const sampleNearText = (): { x: number; y: number } => {
      if (!exclusion)
        return { x: Math.random() * width, y: Math.random() * height };
      const outer = {
        left: Math.max(0, exclusion.left - HALO),
        right: Math.min(width, exclusion.right + HALO),
        top: Math.max(0, exclusion.top - HALO),
        bottom: Math.min(height, exclusion.bottom + HALO),
      };
      for (let attempt = 0; attempt < 24; attempt++) {
        const x = outer.left + Math.random() * (outer.right - outer.left);
        const y = outer.top + Math.random() * (outer.bottom - outer.top);
        if (
          x < exclusion.left ||
          x > exclusion.right ||
          y < exclusion.top ||
          y > exclusion.bottom
        ) {
          return { x, y };
        }
      }
      return keepOutsideText(
        outer.left + Math.random() * (outer.right - outer.left),
        outer.top + Math.random() * (outer.bottom - outer.top),
      );
    };

    const buildParticles = () => {
      const count = width < 640 ? 16 : width < 1024 ? 26 : 36;
      particles = Array.from({ length: count }, () => {
        const { x: baseX, y: baseY } = sampleNearText();
        return {
          baseX,
          baseY,
          x: baseX,
          y: baseY,
          r: 2 + Math.random() * 2.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          phase: Math.random() * Math.PI * 2,
          speed: 0.2 + Math.random() * 0.3,
          drift: 10 + Math.random() * 12,
        };
      });
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      exclusion = getExclusionRect();
      buildParticles();
    };
    resize();
    // Re-measure once more after fonts/layout settle, since the text block's
    // size can still shift slightly right after first paint.
    const settleTimer = window.setTimeout(resize, 250);

    let clientX = -9999;
    let clientY = -9999;
    const handlePointerMove = (e: PointerEvent) => {
      clientX = e.clientX;
      clientY = e.clientY;
    };
    if (isFinePointer && !prefersReducedMotion) {
      window.addEventListener("pointermove", handlePointerMove, {
        passive: true,
      });
    }

    const INFLUENCE = 170;
    const PULL = 0.42;
    let raf = 0;
    let t = 0;

    const draw = () => {
      const rect = container.getBoundingClientRect();
      const mouseX = clientX - rect.left;
      const mouseY = clientY - rect.top;

      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        const wanderX =
          p.baseX + Math.cos(t * 0.01 * p.speed + p.phase) * p.drift;
        const wanderY =
          p.baseY + Math.sin(t * 0.013 * p.speed + p.phase) * p.drift;

        let targetX = wanderX;
        let targetY = wanderY;

        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.hypot(dx, dy);
        if (dist < INFLUENCE) {
          const pull = (1 - dist / INFLUENCE) * PULL;
          targetX = p.x + dx * pull;
          targetY = p.y + dy * pull;
        }

        const kept = keepOutsideText(targetX, targetY);
        p.x += (kept.x - p.x) * 0.08;
        p.y += (kept.y - p.y) * 0.08;

        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.55;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      t += 1;
    };

    const loop = () => {
      draw();
      raf = requestAnimationFrame(loop);
    };

    if (prefersReducedMotion) {
      draw();
    } else {
      raf = requestAnimationFrame(loop);
    }

    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(settleTimer);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [excludeRef]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}

/* ─── Hero heading: letter-by-letter reveal with a continuous gradient
   shimmer sweeping across the emphasized phrase. Flashy treatment reserved
   for the hero only — regular section h2s stay on the badge → h2 → subcopy
   pattern with subtle fade-up motion. ─── */
const HERO_HEADING_TEXT = "Technology that grows your business.";
const HERO_HEADING_HIGHLIGHT = "grows";

const heroCharVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

function AnimatedHeroHeading() {
  const splitIdx = HERO_HEADING_TEXT.indexOf(HERO_HEADING_HIGHLIGHT);
  const line1Before = HERO_HEADING_TEXT.slice(0, splitIdx);
  const line2 = HERO_HEADING_TEXT.slice(
    splitIdx + HERO_HEADING_HIGHLIGHT.length,
  ).trimStart();

  return (
    <motion.h1
      aria-label={HERO_HEADING_TEXT}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        visible: {
          transition: { staggerChildren: 0.04, delayChildren: 0.4 },
        },
      }}
      style={{
        fontFamily: "var(--font-rubik)",
        fontSize: "clamp(42px, 6vw, 64px)",
        fontWeight: 550,
        transform: "scaleX(0.94)",
        letterSpacing: "-0.025em",
        lineHeight: 1.2,
        color: "#353535",
      }}
      className="mb-6"
    >
      <span className="block">
        {Array.from(line1Before).map((char, i) => (
          <motion.span key={`hero-line1-${i}`} aria-hidden="true" variants={heroCharVariants}>
            {char}
          </motion.span>
        ))}
        <motion.span aria-hidden="true" variants={heroCharVariants}>
          <motion.span
            style={{
              backgroundImage:
                "linear-gradient(90deg, #0066ff 0%, #0066ff 40%, #7db2ff 46%, #ffffff 50%, #7db2ff 54%, #0066ff 60%, #0066ff 100%)",
              backgroundSize: "200% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
            animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
          >
            {HERO_HEADING_HIGHLIGHT}
          </motion.span>
        </motion.span>
      </span>
      <span className="block">
        {Array.from(line2).map((char, i) => (
          <motion.span key={`hero-line2-${i}`} aria-hidden="true" variants={heroCharVariants}>
            {char}
          </motion.span>
        ))}
      </span>
    </motion.h1>
  );
}

/* ─── Hooks ─── */
function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
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

function usePastHero() {
  const [pastHero, setPastHero] = useState(false);
  useEffect(() => {
    const update = () => setPastHero(window.scrollY > window.innerHeight - 120);
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  return pastHero;
}

/* ─── Count-up number (runs once, when the stat scrolls into view) ─── */
function CountUp({
  value,
  duration = 1400,
}: {
  value: string;
  duration?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState("0");
  const hasRun = useRef(false);

  useEffect(() => {
    const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
    const target = match ? parseFloat(match[1]) : 0;
    const suffix = match ? match[2] : "";
    const decimals =
      match && match[1].includes(".") ? match[1].split(".")[1].length : 0;

    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }

    const runCountUp = () => {
      if (hasRun.current) return;
      hasRun.current = true;
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        if (progress < 1) {
          setDisplay(`${(target * eased).toFixed(decimals)}${suffix}`);
          requestAnimationFrame(tick);
        } else {
          setDisplay(value);
        }
      };
      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) runCountUp();
        });
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <div ref={ref} className="nv-stat-num">
      {display}
    </div>
  );
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
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );
    const elements = document.querySelectorAll(".nv-reveal");
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/* ─── Animated Logo ───
   Flat icon + wordmark lockup, no card/border/shadow around the mark —
   the pattern shared by Vercel, Linear, Stripe and most modern SaaS sites,
   rather than treating the icon as a separate boxed app-icon. */
function Logo() {
  return (
    <a
      href="#top"
      className="flex items-center gap-2 no-underline shrink-0 group py-0.5"
    >
      <img
        src={atOfficialLogo}
        alt="Amsture Technologies"
        className="h-7 sm:h-8 w-auto object-contain shrink-0 transition-transform group-hover:scale-105"
      />
      {/* Brand Text Name - "Technologies" hides on very small screens so the pill nav never overflows. */}
      <div className="flex items-center gap-1 text-[16px] min-[480px]:text-[18px] sm:text-[19px] font-black tracking-tight text-[#0a0a0a] leading-none min-w-0">
        <span className="font-extrabold text-[#0a0a0a] truncate">Amsture</span>
        <span className="text-blue-600 font-extrabold hidden min-[480px]:inline">
          Technologies
        </span>
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
          <a href="#about" className="nv-nav-link">
            About
          </a>
          <a href="#services" className="nv-nav-link">
            Services
          </a>
          <a href="#leadership" className="nv-nav-link">
            Leadership
          </a>
          <a href="#industries" className="nv-nav-link">
            Industries
          </a>
          <a href="#process" className="nv-nav-link">
            Process
          </a>
          <a href="#work" className="nv-nav-link">
            Work
          </a>
          <a href="#faq" className="nv-nav-link">
            FAQ
          </a>
          <a href="#contact" className="nv-nav-link">
            Contact
          </a>
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
              <Moon
                size={17}
                className="text-slate-700 hover:text-blue-600 transition-colors"
              />
            ) : (
              <Sun
                size={17}
                className="text-amber-400 hover:text-amber-300 transition-colors"
              />
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
              <img
                src={atOfficialLogo}
                alt="Amsture Technologies"
                className="h-6 w-auto object-contain shrink-0"
              />
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
              Popular searches:{" "}
              <span
                className="text-blue-600 font-semibold cursor-pointer"
                onClick={() => {
                  setSearchQuery("AI Automation");
                  setSearchOpen(false);
                  window.location.href = "#services";
                }}
              >
                AI Automation
              </span>
              ,{" "}
              <span
                className="text-blue-600 font-semibold cursor-pointer"
                onClick={() => {
                  setSearchQuery("Leadership");
                  setSearchOpen(false);
                  window.location.href = "#leadership";
                }}
              >
                Leadership
              </span>
              ,{" "}
              <span
                className="text-blue-600 font-semibold cursor-pointer"
                onClick={() => {
                  setSearchQuery("ERP");
                  setSearchOpen(false);
                  window.location.href = "#services";
                }}
              >
                ERP Systems
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="nv-mobile-menu">
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="absolute top-6 right-6 nv-icon-btn"
          >
            <X size={22} />
          </button>
          <a
            href="#about"
            onClick={() => setMobileOpen(false)}
            className="nv-mobile-link"
          >
            About
          </a>
          <a
            href="#services"
            onClick={() => setMobileOpen(false)}
            className="nv-mobile-link"
          >
            Services
          </a>
          <a
            href="#leadership"
            onClick={() => setMobileOpen(false)}
            className="nv-mobile-link"
          >
            Leadership
          </a>
          <a
            href="#industries"
            onClick={() => setMobileOpen(false)}
            className="nv-mobile-link"
          >
            Industries
          </a>
          <a
            href="#process"
            onClick={() => setMobileOpen(false)}
            className="nv-mobile-link"
          >
            Process
          </a>
          <a
            href="#work"
            onClick={() => setMobileOpen(false)}
            className="nv-mobile-link"
          >
            Work
          </a>
          <a
            href="#faq"
            onClick={() => setMobileOpen(false)}
            className="nv-mobile-link"
          >
            FAQ
          </a>
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="nv-mobile-link font-bold text-blue-600"
          >
            Contact Us
          </a>
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="nv-cta-primary mt-4"
          >
            Book a Free Consultation <ArrowRight size={16} />
          </a>
        </div>
      )}
    </>
  );
}

/* ─── PARALLEL, NOT SEQUENTIAL (AI-ORCHESTRATED SDLC) SECTION ─── */
type SdlcAccent = "blue" | "indigo" | "purple" | "green" | "amber" | "teal";

const SDLC_ACCENTS: Record<
  SdlcAccent,
  { solid: string; badgeBg: string; badgeText: string; dot: string; hoverBorder: string }
> = {
  blue: {
    solid: "bg-blue-600",
    badgeBg: "bg-blue-50 dark:bg-blue-500/10",
    badgeText: "text-blue-700 dark:text-blue-300",
    dot: "bg-blue-500",
    hoverBorder: "hover:border-blue-300 dark:hover:border-blue-500/40",
  },
  indigo: {
    solid: "bg-indigo-600",
    badgeBg: "bg-indigo-50 dark:bg-indigo-500/10",
    badgeText: "text-indigo-700 dark:text-indigo-300",
    dot: "bg-indigo-500",
    hoverBorder: "hover:border-indigo-300 dark:hover:border-indigo-500/40",
  },
  purple: {
    solid: "bg-purple-600",
    badgeBg: "bg-purple-50 dark:bg-purple-500/10",
    badgeText: "text-purple-700 dark:text-purple-300",
    dot: "bg-purple-500",
    hoverBorder: "hover:border-purple-300 dark:hover:border-purple-500/40",
  },
  green: {
    solid: "bg-green-600",
    badgeBg: "bg-green-50 dark:bg-green-500/10",
    badgeText: "text-green-700 dark:text-green-300",
    dot: "bg-green-500",
    hoverBorder: "hover:border-green-300 dark:hover:border-green-500/40",
  },
  amber: {
    solid: "bg-amber-500",
    badgeBg: "bg-amber-50 dark:bg-amber-500/10",
    badgeText: "text-amber-700 dark:text-amber-300",
    dot: "bg-amber-500",
    hoverBorder: "hover:border-amber-300 dark:hover:border-amber-500/40",
  },
  teal: {
    solid: "bg-teal-600",
    badgeBg: "bg-teal-50 dark:bg-teal-500/10",
    badgeText: "text-teal-700 dark:text-teal-300",
    dot: "bg-teal-500",
    hoverBorder: "hover:border-teal-300 dark:hover:border-teal-500/40",
  },
};

type SdlcStep = {
  id: number;
  name: string;
  desc: string;
  who: "ai" | "human";
  tag?: string;
  accent: SdlcAccent;
};

// Plain-language, non-technical descriptions — one clear sentence each.
const sdlcSteps: SdlcStep[] = [
  {
    id: 0,
    name: "Requirement",
    desc: "You tell us what you need — the goal, the users, and what success looks like.",
    who: "human",
    accent: "blue",
  },
  {
    id: 1,
    name: "Understanding",
    desc: "AI turns your request into a clear, structured plan everyone can follow.",
    who: "ai",
    accent: "blue",
  },
  {
    id: 2,
    name: "Lock Scope",
    desc: "That plan is finalized, so nothing gets missed or changed midway.",
    who: "ai",
    accent: "blue",
  },
  {
    id: 3,
    name: "Generate Docs",
    desc: "AI writes the technical blueprint — the specs, screens, and data it will build from.",
    who: "ai",
    accent: "indigo",
  },
  {
    id: 4,
    name: "Approve Gate",
    desc: "A human engineer checks the blueprint and signs off before any building starts.",
    who: "human",
    tag: "Human checkpoint",
    accent: "indigo",
  },
  {
    id: 5,
    name: "Parallel Design",
    desc: "AI designs the architecture, database, APIs, and screens — all at the same time.",
    who: "ai",
    tag: "Runs in parallel",
    accent: "purple",
  },
  {
    id: 6,
    name: "Parallel Build",
    desc: "AI writes the real, working code for every part of the product at once.",
    who: "ai",
    tag: "Runs in parallel",
    accent: "green",
  },
  {
    id: 7,
    name: "Parallel Validate",
    desc: "AI tests everything automatically, checking for bugs and security issues.",
    who: "ai",
    tag: "Runs in parallel",
    accent: "amber",
  },
  {
    id: 8,
    name: "Auto Fix",
    desc: "Anything that fails gets fixed automatically, without waiting on a person.",
    who: "ai",
    accent: "teal",
  },
  {
    id: 9,
    name: "Deploy Release",
    desc: "The finished product goes live for real users with a single click.",
    who: "ai",
    accent: "teal",
  },
  {
    id: 10,
    name: "Maintain & Feedback",
    desc: "We watch it around the clock, and everything we learn feeds back into Step 1.",
    who: "ai",
    tag: "Repeats the cycle",
    accent: "teal",
  },
];

const SDLC_COLUMNS: { label: string; sub: string; ids: number[] }[] = [
  { label: "Discovery", sub: "Capture & structure intent", ids: [0, 1, 2] },
  { label: "Specification", sub: "Freeze scope & get sign-off", ids: [3, 4] },
  { label: "Parallel Execution", sub: "Design → Build → Validate", ids: [5, 6, 7] },
  { label: "Delivery", sub: "Ship, observe, and loop back", ids: [8, 9, 10] },
];

// Every step connects to the next in one continuous chain (1 → 2 → 3 … → 11),
// plus a final loop back from the last step to the first.
const SDLC_CHAIN: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5],
  [5, 6], [6, 7], [7, 8], [8, 9], [9, 10],
];

type SdlcPath = {
  id: string;
  d: string;
  loop?: boolean;
  label?: string;
  labelX: number;
  labelY: number;
};

type Rect = { left: number; right: number; top: number; bottom: number; cx: number; cy: number };

// Right-angle "flowchart" connector with softly rounded corners — easier to
// trace by eye than a diagonal line crossing over unrelated cards.
function elbowPath(p1: { x: number; y: number }, p2: { x: number; y: number }, orientation: "horizontal" | "vertical") {
  const r = 12;
  if (orientation === "horizontal") {
    const midX = (p1.x + p2.x) / 2;
    const vDir = p2.y === p1.y ? 0 : p2.y > p1.y ? 1 : -1;
    if (vDir === 0) return `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y}`;
    const rr = Math.min(r, Math.abs(p2.y - p1.y) / 2, Math.abs(midX - p1.x));
    return `M ${p1.x} ${p1.y} L ${midX - rr} ${p1.y} Q ${midX} ${p1.y} ${midX} ${p1.y + rr * vDir} L ${midX} ${p2.y - rr * vDir} Q ${midX} ${p2.y} ${midX + rr} ${p2.y} L ${p2.x} ${p2.y}`;
  }
  const midY = (p1.y + p2.y) / 2;
  const hDir = p2.x === p1.x ? 0 : p2.x > p1.x ? 1 : -1;
  if (hDir === 0) return `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y}`;
  const rr = Math.min(r, Math.abs(p2.x - p1.x) / 2, Math.abs(midY - p1.y));
  return `M ${p1.x} ${p1.y} L ${p1.x} ${midY - rr} Q ${p1.x} ${midY} ${p1.x + rr * hDir} ${midY} L ${p2.x - rr * hDir} ${midY} Q ${p2.x} ${midY} ${p2.x} ${midY + rr} L ${p2.x} ${p2.y}`;
}

// Big rounded "U" beneath the whole diagram for the one connector that runs
// backwards (last step feeding back into the first).
function loopPath(p1: { x: number; y: number }, p2: { x: number; y: number }, dropY: number) {
  const r = 18;
  const sign = p2.x >= p1.x ? 1 : -1;
  return `M ${p1.x} ${p1.y} L ${p1.x} ${dropY - r} Q ${p1.x} ${dropY} ${p1.x + r * sign} ${dropY} L ${p2.x - r * sign} ${dropY} Q ${p2.x} ${dropY} ${p2.x} ${dropY - r} L ${p2.x} ${p2.y}`;
}

function ParallelSDLCSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const [paths, setPaths] = useState<SdlcPath[]>([]);

  useLayoutEffect(() => {
    const recompute = () => {
      const container = containerRef.current;
      if (!container) return;
      const cRect = container.getBoundingClientRect();

      const rectOf = (id: number): Rect | null => {
        const el = nodeRefs.current[id];
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return {
          left: r.left - cRect.left,
          right: r.right - cRect.left,
          top: r.top - cRect.top,
          bottom: r.bottom - cRect.top,
          cx: (r.left + r.right) / 2 - cRect.left,
          cy: (r.top + r.bottom) / 2 - cRect.top,
        };
      };

      const newPaths: SdlcPath[] = [];

      SDLC_CHAIN.forEach(([a, b]) => {
        const ra = rectOf(a);
        const rb = rectOf(b);
        if (!ra || !rb) return;
        const dx = rb.cx - ra.cx;
        const dy = rb.cy - ra.cy;

        let p1: { x: number; y: number };
        let p2: { x: number; y: number };
        let d: string;

        if (Math.abs(dx) > Math.abs(dy) * 1.15) {
          p1 = { x: dx >= 0 ? ra.right : ra.left, y: ra.cy };
          p2 = { x: dx >= 0 ? rb.left : rb.right, y: rb.cy };
          d = elbowPath(p1, p2, "horizontal");
        } else {
          p1 = { x: ra.cx, y: dy >= 0 ? ra.bottom : ra.top };
          p2 = { x: rb.cx, y: dy >= 0 ? rb.top : rb.bottom };
          d = elbowPath(p1, p2, "vertical");
        }

        newPaths.push({
          id: `${a}-${b}`,
          d,
          labelX: (p1.x + p2.x) / 2,
          labelY: (p1.y + p2.y) / 2,
        });
      });

      // Loop back: the last step (Maintain & Feedback) feeds back into the first (Requirement).
      const rLast = rectOf(10);
      const rFirst = rectOf(0);
      if (rLast && rFirst) {
        // Drop below the tallest card in the grid, not just the first/last
        // columns, so the loop line and its label never sit under a card
        // from a taller middle column (e.g. Parallel Validate).
        const allBottoms = Array.from({ length: 11 }, (_, id) => rectOf(id)?.bottom ?? 0);
        const dropY = Math.max(...allBottoms) + 60;
        newPaths.push({
          id: "loop",
          d: loopPath({ x: rLast.cx, y: rLast.bottom }, { x: rFirst.cx, y: rFirst.bottom }, dropY),
          loop: true,
          label: "Repeats — feeds back into Step 1",
          labelX: (rLast.cx + rFirst.cx) / 2,
          labelY: dropY,
        });
      }

      setPaths(newPaths);
    };

    recompute();
    const ro = new ResizeObserver(() => recompute());
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", recompute);
    const settleTimeout = setTimeout(recompute, 300);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", recompute);
      clearTimeout(settleTimeout);
    };
  }, []);

  return (
    <section
      id="how-it-works"
      className="py-20 md:py-28 relative overflow-hidden border-t border-slate-200 dark:border-slate-800"
    >
      <div className="nv-wrap relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 nv-reveal">
          <div className="nv-eyebrow">HOW IT WORKS · AI-ORCHESTRATED SDLC</div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Parallel, <span className="text-blue-600">not sequential</span>.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            Traditional software development is a relay race — one step waits
            for the last. Ours runs four tracks at once, guided by AI and
            checked by humans at the key moments.
          </p>
        </div>

        <div className="mb-10">
          <h3 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
            How it works, in short
          </h3>
          <p className="text-slate-500 dark:text-slate-400 mt-3 max-w-xl text-sm sm:text-base">
            11 simple steps, grouped into 4 phases. Follow the numbers — every
            step leads straight into the next.
          </p>
        </div>

        {/* Plain-language phase overview — the big picture before the detail */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-3 mb-14">
          {SDLC_COLUMNS.map((col, i) => (
            <React.Fragment key={col.label}>
              <div className="flex items-center gap-2 pl-2 pr-4 py-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <span className="w-6 h-6 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[11px] font-bold flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <span className="text-sm font-semibold text-slate-800 dark:text-slate-100 whitespace-nowrap">
                  {col.label}
                </span>
              </div>
              {i < SDLC_COLUMNS.length - 1 && (
                <ArrowRight size={16} className="text-slate-300 dark:text-slate-700 shrink-0" />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Numbered step diagram */}
        <div ref={containerRef} className="relative max-w-7xl mx-auto">
          <svg className="absolute inset-0 overflow-visible pointer-events-none" aria-hidden="true">
            <defs>
              <marker
                id="sdlc-arrow"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M0,0 L10,5 L0,10 z" fill="currentColor" />
              </marker>
            </defs>
            {paths.map((p) => (
              <g key={p.id} className={p.loop ? "text-blue-400 dark:text-blue-500" : "text-slate-300 dark:text-slate-700"}>
                <path
                  d={p.d}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={p.loop ? 1.75 : 1.5}
                  strokeDasharray={p.loop ? "5 5" : undefined}
                  strokeLinecap="round"
                  markerEnd="url(#sdlc-arrow)"
                />
                {p.loop && (
                  <circle r="3.5" className="fill-blue-500 dark:fill-blue-400">
                    <animateMotion dur="3s" repeatCount="indefinite" path={p.d} rotate="auto" />
                  </circle>
                )}
              </g>
            ))}
          </svg>

          {paths
            .filter((p) => p.label)
            .map((p) => (
              <div
                key={`label-${p.id}`}
                className="absolute z-20 -translate-x-1/2 -translate-y-1/2 px-3 py-1 rounded-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-[11px] font-semibold tracking-wide shadow-sm whitespace-nowrap"
                style={{ left: p.labelX, top: p.labelY }}
              >
                {p.label}
              </div>
            ))}

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-start gap-y-14 lg:gap-x-8 pb-24">
            {SDLC_COLUMNS.map((col, colIdx) => (
              <div
                key={col.label}
                className="flex-1 flex flex-col gap-8 min-w-0 rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 p-5 lg:p-6"
              >
                <div>
                  <span className="text-[11px] font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase">
                    Phase {colIdx + 1} · {col.label}
                  </span>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{col.sub}</p>
                </div>

                {col.ids.map((id) => {
                  const step = sdlcSteps[id];
                  const accent = SDLC_ACCENTS[step.accent];
                  return (
                    <div
                      key={step.id}
                      ref={(el) => {
                        nodeRefs.current[step.id] = el;
                      }}
                      className={`bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow duration-300 p-5 ${accent.hoverBorder}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full ${accent.solid} text-white font-bold text-sm flex items-center justify-center shrink-0`}>
                          {step.id + 1}
                        </div>
                        <h4 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                          {step.name}
                        </h4>
                      </div>

                      {step.tag && (
                        <span className={`inline-block mt-3 text-[11px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap ${accent.badgeBg} ${accent.badgeText}`}>
                          {step.tag}
                        </span>
                      )}

                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
                        {step.desc}
                      </p>

                      <div className="flex items-center gap-1.5 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                        {step.who === "ai" ? <Bot size={14} className="shrink-0" /> : <Users size={14} className="shrink-0" />}
                        <span className="text-xs font-medium">
                          {step.who === "ai" ? "Handled by AI" : "Handled by a person"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── INTERACTIVE SERVICES & BUSINESS SOLUTIONS SECTION WITH CENTRAL AI ORCHESTRATOR ENGINE ─── */
function ServicesSection() {
  const [activeCategory, setActiveCategory] = useState<string>("ai");
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(
    null,
  );
  const [activeConnectedCardIndex, setActiveConnectedCardIndex] =
    useState<number>(0);

  const filteredServices = services.filter(
    (s) => s.category === activeCategory,
  );

  const activeIdx = filteredServices.length
    ? activeConnectedCardIndex % filteredServices.length
    : 0;
  const activeSvc = filteredServices[activeIdx];

  // Auto-advance the card stack; once the last card in a category has had
  // its turn, move on to the next category and start its stack from the top.
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (activeConnectedCardIndex + 1 >= filteredServices.length) {
        const catIdx = serviceCategories.findIndex(
          (c) => c.id === activeCategory,
        );
        const nextCat =
          serviceCategories[(catIdx + 1) % serviceCategories.length].id;
        setActiveCategory(nextCat);
        setActiveConnectedCardIndex(0);
      } else {
        setActiveConnectedCardIndex((prev) => prev + 1);
      }
    }, 4200);
    return () => clearTimeout(timeout);
  }, [activeCategory, activeConnectedCardIndex, filteredServices.length]);

  return (
    <section
      id="services"
      className="nv-section bg-white dark:bg-slate-950 relative overflow-hidden"
    >
      {/* Background Decorative Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-400/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="nv-wrap relative z-10">
        {/* Central Engine Hub Header */}
        <div className="flex flex-col items-start max-w-2xl mb-6 nv-reveal">
          <div className="nv-eyebrow">CORE ENGINE · BUSINESS SOLUTIONS</div>

          <h2 className="nv-section-h2 text-[#0a0a0a] dark:text-white">
            Technology solutions{" "}
            <span className="text-blue-600">engineered</span> for outcomes.
          </h2>
          <p className="text-[15px] text-[#555] dark:text-slate-300 max-w-xl leading-relaxed mt-2">
            Central AI Orchestrator assigns tasks, coordinates intelligent
            agents across technology domains, and delivers outcome-driven
            business systems.
          </p>
        </div>

        {/* Filter Category Pills Bar (Exact pill style from user screenshot) */}
        <div className="flex flex-wrap items-center justify-start sm:justify-center gap-2.5 mb-10 p-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm max-w-4xl mx-auto relative z-10">
          {serviceCategories.map((cat) => {
            const CatIcon = cat.icon;
            const count = services.filter((s) => s.category === cat.id).length;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setActiveCategory(cat.id);
                  setActiveConnectedCardIndex(0);
                }}
                className={`flex items-center gap-2 px-4.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/25 scale-[1.02]"
                    : "bg-transparent text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800"
                }`}
              >
                <CatIcon
                  size={16}
                  className={
                    isActive ? "text-white" : "text-blue-600 dark:text-blue-400"
                  }
                />
                <span>{cat.name}</span>
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full font-extrabold ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Split Layout: Written Content (left) & Animated Stacked Cards (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.1fr] gap-10 lg:gap-16 items-center relative z-10">
          {/* LEFT: Written content for the spotlighted service */}
          <div className="order-2 lg:order-1">
            <AnimatePresence mode="wait">
              {activeSvc && (
                <motion.div
                  key={activeSvc.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-xs shrink-0">
                      <activeSvc.icon size={22} />
                    </div>
                    <span className="text-[11px] font-extrabold tracking-wider bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/60 px-3 py-1 rounded-full uppercase">
                      {activeSvc.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-5 leading-tight">
                    {activeSvc.title}
                  </h3>

                  <div className="space-y-4 mb-6">
                    <div>
                      <div className="text-[11px] font-extrabold uppercase text-rose-500 tracking-wider mb-1.5 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 inline-block" />
                        Challenge
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {activeSvc.problem}
                      </p>
                    </div>

                    <div>
                      <div className="text-[11px] font-extrabold uppercase text-blue-600 dark:text-blue-400 tracking-wider mb-1.5 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block" />
                        Our Solution
                      </div>
                      <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                        {activeSvc.solution}
                      </p>
                    </div>
                  </div>

                  <div className="pt-5 border-t border-slate-100 dark:border-slate-800 flex items-start gap-2 mb-6">
                    <Check size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-100 leading-tight">
                      <span className="text-emerald-600 font-extrabold">
                        Impact:{" "}
                      </span>
                      {activeSvc.benefit}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedService(activeSvc)}
                    className="py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500 text-white text-sm font-extrabold transition-all inline-flex items-center gap-2 group/btn"
                  >
                    <span>Explore Tech Stack & Specs</span>
                    <ArrowUpRight
                      size={16}
                      className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"
                    />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Progress dots synced with the card stack on the right */}
            {filteredServices.length > 1 && (
              <div className="flex items-center gap-2 mt-8">
                {filteredServices.map((svc, idx) => (
                  <button
                    key={svc.id}
                    type="button"
                    aria-label={`Show ${svc.title}`}
                    onClick={() => setActiveConnectedCardIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === activeIdx
                        ? "w-8 bg-blue-600"
                        : "w-1.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Stacked white-card animation */}
          <div className="order-1 lg:order-2 relative h-[380px] sm:h-[420px] max-w-sm mx-auto w-full">
            {filteredServices.map((svc, idx) => {
              const total = filteredServices.length;
              const offset = (idx - activeIdx + total) % total;
              if (offset > 2) return null;
              const Icon = svc.icon;
              const gradient =
                idx % 4 === 0
                  ? "from-blue-500 via-indigo-500 to-blue-700"
                  : idx % 4 === 1
                    ? "from-purple-500 via-fuchsia-500 to-purple-700"
                    : idx % 4 === 2
                      ? "from-emerald-500 via-teal-500 to-emerald-700"
                      : "from-orange-500 via-amber-500 to-orange-700";

              const isFront = offset === 0;

              return (
                <motion.div
                  key={svc.id}
                  className="absolute inset-0 bg-white dark:bg-slate-900 rounded-[28px] border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-300/40 dark:shadow-black/40 p-5 flex flex-col cursor-pointer"
                  style={{ zIndex: total - offset }}
                  animate={{
                    scale: 1 - offset * 0.055,
                    x: offset * 26,
                    y: offset * -22,
                    rotate: offset * 3.5,
                    opacity: isFront ? 1 : 0.9 - offset * 0.25,
                  }}
                  transition={{ type: "spring", stiffness: 220, damping: 24, mass: 0.9 }}
                  whileHover={
                    isFront
                      ? { y: -10, scale: 1.02, boxShadow: "0 30px 60px -15px rgba(37,99,235,0.35)" }
                      : undefined
                  }
                  onClick={() => setActiveConnectedCardIndex(idx)}
                >
                  <motion.div
                    className="flex flex-col h-full"
                    animate={isFront ? { y: [0, -6, 0] } : { y: 0 }}
                    transition={
                      isFront
                        ? { duration: 3.4, repeat: Infinity, ease: "easeInOut" }
                        : { duration: 0.3 }
                    }
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                        <Icon size={18} />
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedService(svc);
                        }}
                        aria-label={`Explore ${svc.title}`}
                        className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-600 dark:text-slate-300 flex items-center justify-center transition-colors shrink-0"
                      >
                        <ArrowUpRight size={16} />
                      </button>
                    </div>

                    <h4 className="text-lg font-black text-slate-900 dark:text-white leading-snug mb-4">
                      {svc.title}
                    </h4>

                    <div
                      className={`relative flex-1 rounded-2xl bg-gradient-to-br ${gradient} overflow-hidden flex items-center justify-center`}
                    >
                      {/* Fallback gradient + icon, shown until the real photo (added by you) loads */}
                      {isFront && (
                        <div className="absolute w-24 h-24 rounded-full bg-white/25 blur-2xl animate-pulse" />
                      )}
                      <Icon
                        size={72}
                        className={`relative text-white/20 ${isFront ? "animate-pulse" : ""}`}
                      />
                      <img
                        src={svc.image}
                        alt={svc.title}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                      <span className="absolute bottom-3 left-3 bg-black/40 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1.5 rounded-full">
                        {svc.badge}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-4 leading-relaxed line-clamp-2">
                      {svc.solution}
                    </p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Integrated Solution Ecosystem Footer Banner */}
        <div className="mt-12 p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
              <Zap size={24} />
            </div>
            <div>
              <h4 className="text-lg font-black text-slate-900 dark:text-white">
                Need a custom multi-system solution?
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-xl">
                We combine AI Automation, custom software, and enterprise ERP
                into a unified digital ecosystem tailored for your exact
                business requirements.
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
                  <h3 className="text-xl font-black text-slate-900 mt-0.5">
                    {selectedService.title}
                  </h3>
                </div>
              </div>

              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                {selectedService.solution}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="text-xs font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                    <Check size={14} className="text-blue-600" /> Deliverables &
                    Scope
                  </div>
                  <ul className="space-y-1.5">
                    {selectedService.highlights.map((h, idx) => (
                      <li
                        key={idx}
                        className="text-xs text-slate-600 flex items-center gap-1.5"
                      >
                        <span className="w-1 h-1 rounded-full bg-blue-600" />{" "}
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="text-xs font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                    <Code2 size={14} className="text-blue-600" /> Technology
                    Stack
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedService.tech.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-semibold bg-white border border-slate-200 text-slate-700 px-2.5 py-1 rounded-md"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
                <div className="text-xs text-slate-500 text-center sm:text-left">
                  Guaranteed outcome:{" "}
                  <span className="font-bold text-slate-800">
                    {selectedService.benefit}
                  </span>
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
  const heroTextRef = useRef<HTMLDivElement>(null);
  const [activeIndustry, setActiveIndustry] = useState(industries[0].name);
  const [isIndAutoPlaying, setIsIndAutoPlaying] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formSent, setFormSent] = useState(false);
  const [cookieClosed, setCookieClosed] = useState(false);
  const progress = useScrollProgress();
  const pastHero = usePastHero();
  useScrollReveal();

  useEffect(() => {
    document.documentElement.classList.remove("dark");
  }, []);

  // Automatic rotation for "INDUSTRIES WE SERVE" section without requiring manual clicks
  useEffect(() => {
    if (!isIndAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveIndustry((prev) => {
        const currentIndex = industries.findIndex((ind) => ind.name === prev);
        const nextIndex = (currentIndex + 1) % industries.length;
        return industries[nextIndex].name;
      });
    }, 3500);
    return () => clearInterval(interval);
  }, [isIndAutoPlaying]);

  const handleForm = (e: FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  const currentInd =
    industries.find((i) => i.name === activeIndustry) || industries[0];
  const IndIcon = currentInd.icon;

  return (
    <div id="top" className="relative">
      <div className="nv-progress" style={{ width: `${progress}%` }} />
      <Header />

      <main>
        {/* ── HERO SECTION (CENTERED & PROPER WITHOUT SECOND IMAGE CARD) ── */}
        <section className="nv-hero relative overflow-hidden min-h-screen flex items-center justify-center pt-28 pb-16">
          {/* Animated Robotics Cybernetic HUD & Circuit Background */}
          <RoboticsHeaderAnimation />

          <div className="nv-hero-bg" />
          <div className="nv-hero-bg-left" />

          {/* Cursor-reactive floating bubble particles (kept clear of the text below via heroTextRef) */}
          <CursorBubbleField excludeRef={heroTextRef} />
          <div className="nv-wrap relative z-10 max-w-4xl mx-auto text-center">
            <div
              ref={heroTextRef}
              className="nv-reveal flex flex-col items-center -mt-8 sm:-mt-10"
            >
              <AnimatedHeroHeading />

              <p className="nv-hero-sub text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8">
                We turn complex technology into simple business outcomes —
                custom software, AI automation, and cloud solutions engineered
                to drive measurable growth and ROI.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 mt-6 sm:mt-8">
                <a
                  href="#contact"
                  className="nv-cta-primary text-base px-8 py-3.5"
                >
                  Book a Free Consultation <ArrowRight size={18} />
                </a>
                <a
                  href="#services"
                  className="nv-cta-secondary text-base px-8 py-3.5"
                >
                  View Our Services
                </a>
              </div>

              <div className="nv-stats-grid mt-24 sm:mt-28 w-full">
                <div className="nv-stat-card">
                  <CountUp value="15+" />
                  <div className="nv-stat-label">Projects delivered</div>
                </div>
                <div className="nv-stat-card">
                  <CountUp value="100%" />
                  <div className="nv-stat-label">Client satisfaction</div>
                </div>
                <div className="nv-stat-card">
                  <CountUp value="6+" />
                  <div className="nv-stat-label">Industries served</div>
                </div>
                <div className="nv-stat-card">
                  <CountUp value="35%" />
                  <div className="nv-stat-label">Avg. efficiency gain</div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll-down cue, pinned to the hero's bottom edge regardless of content height */}
          <a
            href="#services"
            aria-label="Scroll down"
            className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors z-10"
          >
            <span className="text-[11px] font-semibold tracking-widest uppercase">
              Scroll
            </span>
            <div className="w-6 h-10 rounded-full border-2 border-slate-300 flex items-start justify-center p-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce" />
            </div>
          </a>
        </section>

        {/* ── CORE CAPABILITIES & SOLUTIONS BENTO GRID (STRUCTURED, ELEGANT & ANIMATED) ── */}
        <section className="py-16 border-y border-slate-200/80 dark:border-slate-800/80 relative z-10 overflow-hidden">
          <div className="nv-wrap">
            <div className="max-w-2xl mb-12 nv-reveal">
              <div className="nv-eyebrow">
                CORE CAPABILITIES & ENGINEERING SERVICES
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Engineered for operational speed & measurable growth
              </h3>
            </div>

            {/* Hairline-divided logo-wall grid; tiles subtly flip in unseen capabilities over time */}
            <CapabilitiesFlipGrid />
          </div>
        </section>

        {/* ── ABOUT SECTION ── */}
        <section id="about" className="nv-section">
          <div className="nv-wrap">
            <div className="max-w-2xl nv-reveal mb-12">
              <div className="nv-eyebrow">ABOUT AMSTURE TECHNOLOGIES</div>
              <h2 className="nv-section-h2">
                A partner in your growth, not just a vendor.
              </h2>
              <p className="mt-6 text-[15.5px] leading-relaxed text-[#666]">
                Our core values — integrity, craft, clarity and partnership —
                shape every engagement from first call to long-term support.
              </p>
            </div>

            <div className="nv-reveal d2">
              <AboutStoryCarousel />
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
                Meet the founder, co-founder, and CEO building Amsture
                Technologies' legacy of technology craft and client ROI.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 nv-reveal d2">
              {executiveTeam.map((exec, idx) => (
                <div
                  key={idx}
                  className="nv-team-card flex flex-col justify-between group rounded-2xl p-6 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-blue-500/60 dark:hover:border-blue-500 shadow-sm hover:shadow-xl hover:shadow-blue-500/15 transition-all duration-300"
                >
                  <div>
                    {/* Animated Circular Avatar Frame */}
                    <div className="relative w-44 h-44 mx-auto mb-6">
                      {/* Outer Rotating Glowing Gradient Ring */}
                      <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-blue-600 via-cyan-400 to-indigo-600 animate-spin-slow opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 blur-xs" />

                      {/* Ambient Pulsing Glow Backdrop */}
                      <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl group-hover:bg-blue-500/40 transition-all duration-500 animate-pulse" />

                      {/* Inner Circular Image Container */}
                      <div className="relative w-full h-full rounded-full p-1 bg-white dark:bg-slate-900 border-2 border-white dark:border-slate-800 shadow-xl overflow-hidden z-10">
                        <img
                          src={exec.img}
                          alt={exec.name}
                          className="w-full h-full rounded-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>

                      {/* Tag Badge Floating Below Avatar */}
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-slate-900/90 dark:bg-blue-950/90 backdrop-blur-md text-white text-[10px] font-extrabold uppercase px-3.5 py-1 rounded-full border border-blue-400/40 shadow-md whitespace-nowrap z-20">
                        {exec.tag}
                      </div>
                    </div>

                    <div className="text-center pt-2">
                      <h3 className="text-xl font-extrabold text-[#0a0a0a] dark:text-white group-hover:text-blue-600 transition-colors">
                        {exec.name}
                      </h3>
                      <div className="text-xs font-bold text-blue-600 dark:text-blue-400 mt-1 mb-3 uppercase tracking-wider">
                        {exec.role}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-300 leading-relaxed mb-4">
                        {exec.bio}
                      </p>

                      <div className="flex flex-wrap items-center justify-center gap-1.5 mb-4">
                        {exec.highlights.map((h, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-full border border-slate-200/60 dark:border-slate-700/60"
                          >
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

        {/* ── INDUSTRIES SECTION (AUTO-ROTATING FEATURES WITHOUT CLICKING) ── */}
        <section id="industries" className="nv-section">
          <div className="nv-wrap">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <div className="nv-eyebrow nv-reveal">INDUSTRIES WE SERVE</div>
                <h2 className="nv-section-h2 nv-reveal">
                  Deep industry knowledge, tailored solutions.
                </h2>
              </div>

              {/* Auto-Rotation Control Tag */}
              <div className="nv-reveal flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsIndAutoPlaying(!isIndAutoPlaying)}
                  className="inline-flex items-center gap-2 text-xs font-bold px-3.5 py-1.5 rounded-full border border-blue-200 dark:border-slate-700 bg-blue-50/80 dark:bg-slate-800/80 text-blue-700 dark:text-blue-400 hover:scale-105 transition-all shadow-2xs"
                  title={
                    isIndAutoPlaying
                      ? "Click to pause auto-rotation"
                      : "Click to play auto-rotation"
                  }
                >
                  {isIndAutoPlaying ? (
                    <>
                      <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                      <span>Auto-Loading</span>
                      <Pause size={12} className="ml-1 text-blue-600" />
                    </>
                  ) : (
                    <>
                      <span className="w-2 h-2 rounded-full bg-slate-400" />
                      <span>Paused</span>
                      <Play size={12} className="ml-1 text-slate-500" />
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start nv-reveal d2">
              {/* Left Industry Tabs (Highlights active rotating tab) */}
              <div className="lg:col-span-4 flex flex-col gap-2">
                {industries.map((ind) => {
                  const Icon = ind.icon;
                  const isActive = ind.name === activeIndustry;
                  return (
                    <button
                      key={ind.name}
                      type="button"
                      onClick={() => {
                        setActiveIndustry(ind.name);
                        setIsIndAutoPlaying(false);
                      }}
                      className={`nv-industry-tab relative transition-all duration-300 ${
                        isActive
                          ? "active font-bold border-l-4 border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 shadow-xs translate-x-1"
                          : "hover:translate-x-0.5 opacity-80 hover:opacity-100"
                      }`}
                    >
                      <Icon
                        size={18}
                        className={
                          isActive ? "text-blue-600 dark:text-blue-400" : ""
                        }
                      />
                      <span className="flex-1 text-left">{ind.name}</span>
                      {isActive && isIndAutoPlaying && (
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Right Feature Display Card (Smoothly rotates with AnimatePresence) */}
              <div className="lg:col-span-8 bg-blue-50/90 dark:bg-slate-900 border border-blue-100 dark:border-slate-800 text-slate-900 dark:text-slate-100 rounded-[24px] p-8 md:p-12 relative overflow-hidden min-h-[360px] flex flex-col justify-between shadow-md">
                {/* Top Auto-Rotation Animated Progress Accent Line */}
                {isIndAutoPlaying && (
                  <motion.div
                    key={activeIndustry}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3.5, ease: "linear" }}
                    className="absolute top-0 left-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-400 z-10"
                  />
                )}

                <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/5 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentInd.name}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="flex flex-col justify-between h-full flex-1"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shrink-0">
                          <IndIcon size={20} />
                        </div>
                        <span className="text-xs font-extrabold tracking-widest text-blue-600 dark:text-blue-400 uppercase">
                          {currentInd.name} Solutions
                        </span>
                      </div>
                      <p className="text-lg md:text-xl font-semibold leading-relaxed text-slate-800 dark:text-slate-200">
                        {currentInd.body}
                      </p>
                    </div>

                    <div className="mt-8 pt-8 border-t border-blue-200/60 dark:border-slate-800 flex flex-wrap items-end justify-between gap-6">
                      <div>
                        <div className="text-4xl font-black text-blue-600 dark:text-blue-400">
                          {currentInd.stat}
                        </div>
                        <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 mt-1">
                          {currentInd.label}
                        </div>
                      </div>
                      <a href="#contact" className="nv-book-btn">
                        Get in touch <ArrowUpRight size={14} />
                      </a>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* ── AI & AUTOMATION SECTION ── */}
        <section className="nv-section border-y border-slate-200">
          <div className="nv-wrap">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 nv-reveal">
                <div className="nv-eyebrow text-blue-600">AI & AUTOMATION</div>
                <h2 className="nv-section-h2 text-slate-900 mb-6">
                  Practical AI that drives real business efficiency.
                </h2>
                <p className="text-[16px] leading-relaxed text-slate-600 mb-8">
                  AI shouldn't be a gimmick. We build grounded, task-focused
                  automation that removes friction from your operations while
                  keeping your people in full control.
                </p>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                      <Bot size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-[15px]">
                        Document & Data Processing
                      </h4>
                      <p className="text-xs text-slate-600 mt-1">
                        Extract structured signal from PDFs, emails and invoices
                        automatically.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                      <BrainCircuit size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-[15px]">
                        Intelligent Workflow Copilots
                      </h4>
                      <p className="text-xs text-slate-600 mt-1">
                        Assist your team with smart recommendations and
                        automated draft generation.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 rounded-xl bg-blue-50/80 border border-blue-200 flex items-center gap-3">
                  <ShieldCheck size={20} className="text-blue-600 shrink-0" />
                  <p className="text-xs text-slate-800 font-medium">
                    <strong className="text-slate-900">
                      Human review, designed in:
                    </strong>{" "}
                    Every AI workflow includes audit trails and manual override
                    points.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-6 nv-reveal d2 flex justify-center items-center">
                <div className="relative w-72 h-72 sm:w-80 sm:h-80 mx-auto my-4">
                  {/* Outer Rotating Glowing Gradient Ring */}
                  <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-blue-600 via-cyan-400 to-indigo-600 animate-spin-slow opacity-85 blur-xs" />
                  <div className="absolute -inset-4 rounded-full bg-blue-500/20 blur-2xl animate-pulse" />

                  {/* Circular Image Container */}
                  <div className="relative w-full h-full rounded-full p-1.5 bg-white dark:bg-slate-900 border-4 border-white dark:border-slate-800 shadow-2xl overflow-hidden group">
                    <img
                      src={aiImage}
                      alt="AI automation visual"
                      className="w-full h-full rounded-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
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
                  We analyze your processes, pain points and commercial goals to
                  define precise technical requirements.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="text-3xl font-black text-blue-600 mb-4">02</div>
                <h3 className="font-bold text-lg mb-2">
                  Architecture & Design
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  We model clean system architectures and intuitive user
                  interfaces reviewed and approved by your team.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="text-3xl font-black text-blue-600 mb-4">03</div>
                <h3 className="font-bold text-lg mb-2">Agile Development</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  We build in bi-weekly sprints with regular working demos so
                  progress is transparent and verifiable.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="text-3xl font-black text-blue-600 mb-4">04</div>
                <h3 className="font-bold text-lg mb-2">Deployment & Support</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Smooth launch with full team enablement, complete
                  documentation and ongoing proactive optimization.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section id="work" className="nv-section">
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
                  <p
                    className={`text-[15px] leading-relaxed mb-6 ${t.featured ? "text-white" : "text-slate-700"}`}
                  >
                    "{t.quote}"
                  </p>
                  <div>
                    <div
                      className={`font-bold text-sm ${t.featured ? "text-white" : "text-slate-900"}`}
                    >
                      {t.name}
                    </div>
                    <div
                      className={`text-xs ${t.featured ? "text-blue-100" : "text-slate-500"}`}
                    >
                      {t.role}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" className="nv-section">
          <div className="nv-wrap">
            <div className="nv-eyebrow nv-reveal">
              FREQUENTLY ASKED QUESTIONS
            </div>
            <h2 className="nv-section-h2 mb-12 nv-reveal">
              Clear answers to common questions.
            </h2>

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
        <section
          id="contact"
          className="nv-section border-t border-slate-200"
        >
          <div className="nv-wrap">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 nv-reveal">
                <div className="nv-eyebrow text-blue-600">LET'S TALK</div>
                <h2 className="nv-section-h2 text-slate-900 mb-6">
                  Ready to transform your technology?
                </h2>
                <p className="text-slate-600 text-base leading-relaxed mb-8">
                  Book a free 30-minute consultation with our senior team. We'll
                  review your challenge and outline practical next steps.
                </p>

                <div className="space-y-5 text-sm text-slate-700 font-medium">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 shadow-sm">
                    <Mail size={20} className="text-blue-600 shrink-0" />
                    <a
                      href="mailto:support@amsture.com"
                      className="hover:text-blue-600 transition-colors"
                    >
                      support@amsture.com
                    </a>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 shadow-sm">
                    <Phone size={20} className="text-blue-600 shrink-0" />
                    <a
                      href="tel:+919698681919"
                      className="hover:text-blue-600 transition-colors"
                    >
                      +91 9698681919
                    </a>
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
                      <h3 className="text-2xl font-bold mb-2 text-slate-900">
                        Thank you!
                      </h3>
                      <p className="text-slate-600 text-sm">
                        We've received your request and will reach out within 24
                        hours.
                      </p>
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
                          <label className="block text-xs font-bold text-slate-800 uppercase mb-1">
                            Your Name
                          </label>
                          <input
                            required
                            type="text"
                            placeholder="Jane Doe"
                            className="nv-input"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-800 uppercase mb-1">
                            Work Email
                          </label>
                          <input
                            required
                            type="email"
                            placeholder="jane@company.com"
                            className="nv-input"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-800 uppercase mb-1">
                          Company / Organization
                        </label>
                        <input
                          type="text"
                          placeholder="Acme Inc."
                          className="nv-input"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-800 uppercase mb-1">
                          How can we help?
                        </label>
                        <textarea
                          required
                          rows={4}
                          placeholder="Tell us about your project or current technical challenges..."
                          className="nv-input resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="nv-cta-primary w-full justify-center py-4 text-base"
                      >
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
                Amsture Technologies is a trusted digital transformation partner
                engineering custom software, AI automation, and cloud
                infrastructure.
              </p>
            </div>

            {/* Navigation Column */}
            <div className="md:col-span-4 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Quick Links
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs font-medium text-slate-600">
                <a
                  href="#about"
                  className="hover:text-blue-600 transition-colors"
                >
                  About Us
                </a>
                <a
                  href="#services"
                  className="hover:text-blue-600 transition-colors"
                >
                  Services
                </a>
                <a
                  href="#leadership"
                  className="hover:text-blue-600 transition-colors"
                >
                  Leadership
                </a>
                <a
                  href="#industries"
                  className="hover:text-blue-600 transition-colors"
                >
                  Industries
                </a>
                <a
                  href="#process"
                  className="hover:text-blue-600 transition-colors"
                >
                  Process
                </a>
                <a
                  href="#work"
                  className="hover:text-blue-600 transition-colors"
                >
                  Work
                </a>
                <a
                  href="#faq"
                  className="hover:text-blue-600 transition-colors"
                >
                  FAQ
                </a>
                <a
                  href="#contact"
                  className="hover:text-blue-600 transition-colors font-bold text-blue-600"
                >
                  Contact Us
                </a>
              </div>
            </div>

            {/* Direct Contact Column */}
            <div className="md:col-span-4 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Contact Details
              </div>
              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-blue-600 shrink-0" />
                  <a
                    href="mailto:support@amsture.com"
                    className="hover:text-blue-600 transition-colors"
                  >
                    support@amsture.com
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-blue-600 shrink-0" />
                  <a
                    href="tel:+919698681919"
                    className="hover:text-blue-600 transition-colors"
                  >
                    +91 9698681919
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-blue-600 shrink-0" />
                  <span>Pune, Maharashtra, India</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2 text-xs text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              © {new Date().getFullYear()} Amsture Technologies Inc. All rights
              reserved.
            </div>
            <div className="flex gap-4 font-medium">
              <a href="#" className="hover:text-slate-800">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-slate-800">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* ── FLOATING BUTTONS (hidden on the hero, shown once scrolled past it) ── */}
      <a
        href="https://wa.me/919698681919"
        target="_blank"
        rel="noreferrer"
        className={`nv-float-whatsapp ${pastHero ? "" : "nv-float-hidden"}`}
        aria-label="WhatsApp"
      >
        <MessageCircle size={22} />
      </a>

      <a
        href="#contact"
        className={`nv-float-consult ${pastHero ? "" : "nv-float-hidden"}`}
        aria-label="Book a free consultation"
      >
        <Calendar size={15} />{" "}
        <span className="hidden sm:inline">Free Consultation</span>
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
