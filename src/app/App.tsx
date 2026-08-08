import { useState, useEffect, useRef } from "react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import primaryLogo from "@/imports/primary_logo.png";
import darkLogo from "@/imports/dark_version.png";
import favcon1 from "@/imports/favcon-1.png";
import {
  Menu, X, ArrowRight, ChevronDown, ChevronUp,
  BookOpen, FileText, GraduationCap, Globe, BarChart2,
  Shield, Book, Briefcase, Target, Users, DollarSign,
  CheckCircle2, Star, Zap, Award, TrendingUp,
  MapPin, Mail, Phone, Send, Building2,
  Linkedin, Twitter, Instagram, Youtube,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ─── Utilities ───────────────────────────────────────────────────────────────

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

function useScrolled(threshold = 80) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, [threshold]);
  return scrolled;
}

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ─── Data ────────────────────────────────────────────────────────────────────

const navLinks = [
  { label: "Services", id: "services" },
  { label: "Who We Serve", id: "who-we-serve" },
  { label: "Workflow", id: "workflow" },
  { label: "Industries", id: "industries" },
  { label: "FAQ", id: "faq" },
  { label: "Contact", id: "contact" },
];

interface ServeItem { label: string; icon: LucideIcon }
const whoWeServeList: ServeItem[] = [
  { label: "Undergraduate Students", icon: GraduationCap },
  { label: "Postgraduate Students", icon: GraduationCap },
  { label: "Research Scholars", icon: BookOpen },
  { label: "PhD Scholars", icon: Award },
  { label: "Professors & Faculty Members", icon: Users },
  { label: "Academic Institutions", icon: Building2 },
  { label: "Independent Researchers", icon: Target },
  { label: "Startups & Innovators", icon: Zap },
  { label: "R&D Teams", icon: Briefcase },
  { label: "Universities", icon: Building2 },
  { label: "Research Organizations", icon: Globe },
];

interface Service {
  id: number;
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  color: string;
}
const servicesList: Service[] = [
  {
    id: 1, icon: BookOpen, color: "#2563EB",
    title: "Research & Publication Support",
    description: "End-to-end assistance for high-quality academic research and publication, from conception to global recognition.",
    features: ["Research Planning", "Literature Review Support", "Research Methodology Guidance", "Data Analysis Support", "Statistical Analysis", "Research Paper Drafting", "Technical Writing", "Manuscript Editing", "Journal Formatting", "Reviewer Response Preparation", "Research Consultation", "Publication Strategy"],
  },
  {
    id: 2, icon: FileText, color: "#2563EB",
    title: "Academic Writing Support",
    description: "Professional academic writing assistance while maintaining ethical research practices and academic integrity.",
    features: ["Research Papers", "Review Articles", "Survey Papers", "Conference Papers", "Technical Reports", "Case Studies", "White Papers", "Literature Reviews", "Book Chapters", "Academic Essays", "Project Reports", "Dissertation Support"],
  },
  {
    id: 3, icon: GraduationCap, color: "#2563EB",
    title: "Thesis & Dissertation Support",
    description: "Comprehensive support for postgraduate and doctoral research at every stage of your academic journey.",
    features: ["Thesis Planning", "Chapter-wise Guidance", "Proposal Development", "Literature Review", "Research Framework", "Methodology Design", "Data Interpretation", "Results Analysis", "Discussion Writing", "Referencing", "Formatting", "University Guideline Compliance", "Final Documentation"],
  },
  {
    id: 4, icon: Globe, color: "#06B6D4",
    title: "Research Publication Services",
    description: "Helping researchers publish in reputed journals with complete publication lifecycle support.",
    features: ["SCIE Journals", "Scopus Indexed Journals", "Web of Science Journals", "UGC Care Journals", "International Journals", "National Journals", "Conference Proceedings", "Journal Selection", "Scope Matching", "Plagiarism Reduction Guidance", "Language Editing", "Final Publication Assistance"],
  },
  {
    id: 5, icon: BarChart2, color: "#06B6D4",
    title: "Research Metrics & Academic Profile",
    description: "Improve academic visibility and research impact through strategic profile development and citation optimization.",
    features: ["H-Index Guidance", "Citation Strategy", "Research Profile Development", "Google Scholar Profile", "ORCID Profile", "Research Visibility Consultation", "Publication Portfolio Planning"],
  },
  {
    id: 6, icon: Shield, color: "#10B981",
    title: "Patent Services",
    description: "Protect innovative ideas with professional intellectual property support from patentability assessment to filing.",
    features: ["Patentability Assessment", "Prior Art Search", "Patent Documentation", "Claims Drafting", "Specification Writing", "Drawings & Illustrations", "Technical Documentation", "Utility Patent", "Design Patent", "National Patent Filing Support", "International Patent Guidance", "Office Action Support"],
  },
  {
    id: 7, icon: Book, color: "#10B981",
    title: "Book Publishing Services",
    description: "Publish professional books with complete publishing assistance from manuscript development to distribution.",
    features: ["Manuscript Development", "Editing", "Proofreading", "Interior Formatting", "Cover Design", "ISBN Registration", "National Publishing", "International Publishing", "Print Publishing", "Digital Publishing", "eBook Publishing", "Distribution Guidance"],
  },
  {
    id: 8, icon: Briefcase, color: "#2563EB",
    title: "Research Project Consulting",
    description: "Supporting research and innovation projects from concept to completion with expert domain guidance.",
    features: ["Academic Projects", "Final Year Projects", "Research Projects", "Innovation Projects", "Prototype Development Support", "Documentation", "Technical Reports", "Project Evaluation Preparation"],
  },
  {
    id: 9, icon: Target, color: "#2563EB",
    title: "Career & Research Consulting",
    description: "Helping individuals build successful academic and research careers through personalized strategic guidance.",
    features: ["Research Career Planning", "Higher Education Guidance", "PhD Roadmap", "Publication Strategy", "Research Profile Building", "Faculty Career Guidance", "Academic Portfolio Development", "International Research Opportunities"],
  },
  {
    id: 10, icon: Users, color: "#06B6D4",
    title: "Hiring & Research Talent Services",
    description: "Connecting institutions with qualified research professionals and opening doors for academic careers.",
    features: ["Research Hiring", "Faculty Recruitment", "Research Assistant Hiring", "Project Staff Recruitment", "Research Internship Programs", "Career Opportunities", "Research Positions", "Faculty Opportunities", "Internship Support", "Industry Research Roles"],
  },
  {
    id: 11, icon: DollarSign, color: "#10B981",
    title: "Grant & Funding Support",
    description: "Helping innovators secure funding for research and development through strategic proposal preparation.",
    features: ["Grant Opportunity Identification", "Proposal Writing", "Budget Planning", "Documentation", "Funding Applications", "Startup Innovation Grants", "Research Funding Consultation", "Proposal Review"],
  },
];

interface WorkflowStep { step: number; icon: LucideIcon; title: string; description: string }
const workflowSteps: WorkflowStep[] = [
  { step: 1, icon: Target, title: "Research Consultation", description: "Connect with our experts to discuss your research goals, timeline, and requirements in detail." },
  { step: 2, icon: Zap, title: "Idea Validation & Planning", description: "Validate your research idea and co-develop a comprehensive, milestone-driven roadmap." },
  { step: 3, icon: BookOpen, title: "Research & Documentation", description: "Conduct thorough research with expert guidance through every phase of documentation." },
  { step: 4, icon: FileText, title: "Writing & Drafting", description: "Transform research findings into polished academic manuscripts with professional writing support." },
  { step: 5, icon: CheckCircle2, title: "Review & Quality Assurance", description: "Rigorous multi-stage review ensuring quality, accuracy, and compliance with academic standards." },
  { step: 6, icon: Globe, title: "Publication / Patent Filing / Book Publishing", description: "Submit to target journals, file patents, or publish books with expert end-to-end assistance." },
  { step: 7, icon: TrendingUp, title: "Post-Publication Growth Support", description: "Ongoing support to build citations, improve metrics, and grow your global academic footprint." },
];

interface WhyItem { icon: LucideIcon; title: string; description: string }
const whyChooseList: WhyItem[] = [
  { icon: CheckCircle2, title: "End-to-End Research Support", description: "Complete assistance from research conception to publication and beyond." },
  { icon: Star, title: "Expert Academic Guidance", description: "Seasoned researchers and academics with deep domain-specific expertise." },
  { icon: Award, title: "Patent & Publication Specialists", description: "Dedicated IP and journal publication specialists with proven track records." },
  { icon: Globe, title: "International Publishing Assistance", description: "Global reach supporting international journals and conferences worldwide." },
  { icon: Shield, title: "Ethical Research Practices", description: "Committed to academic integrity and responsible research standards." },
  { icon: FileText, title: "Quality Documentation", description: "Meticulous attention to detail in every document and manuscript produced." },
  { icon: Target, title: "Personalized Consultation", description: "Tailored guidance that fits your unique research journey and goals." },
  { icon: TrendingUp, title: "Research Career Development", description: "Strategic support for building a distinguished and impactful academic career." },
  { icon: Zap, title: "Innovation-Centered Approach", description: "Cutting-edge methods and tools for modern and complex research challenges." },
  { icon: Globe, title: "Global Academic Standards", description: "Aligned with international benchmarks for research and scholarly excellence." },
];

const industriesList = [
  "Computer Science", "Artificial Intelligence", "Data Science", "Electronics",
  "Mechanical Engineering", "Civil Engineering", "Biotechnology", "Healthcare",
  "Business & Management", "Law", "Education", "Social Sciences",
  "Agriculture", "Environmental Science", "Interdisciplinary Research",
];

const faqList = [
  {
    q: "Do you help publish papers in Scopus and SCIE journals?",
    a: "Yes. We provide journal selection, manuscript preparation, formatting, submission guidance, revision support, and publication assistance for eligible journals.",
  },
  {
    q: "Do you write research papers on behalf of researchers?",
    a: "We support drafting, structuring, editing, formatting, and improving manuscripts while encouraging ethical authorship. Researchers remain responsible for the originality, accuracy, and integrity of their work.",
  },
  {
    q: "Do you provide thesis support?",
    a: "Yes. We assist with research planning, literature review, methodology, analysis, formatting, and adherence to university guidelines at every stage.",
  },
  {
    q: "Can you help with patent filing?",
    a: "Yes. We support prior-art searches, patent drafting, utility and design patent documentation, filing assistance, and related intellectual property processes.",
  },
  {
    q: "Do you publish books with ISBN?",
    a: "Yes. We provide complete book publishing support including editing, formatting, ISBN registration, and national and international publishing assistance.",
  },
  {
    q: "Do you help secure research grants?",
    a: "Yes. We assist with identifying funding opportunities, preparing grant proposals, documentation, and submission support for research and innovation grants.",
  },
];

// ─── Components ──────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest mb-5">
      {children}
    </div>
  );
}

function SectionLabelDark({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 bg-blue-900/40 border border-blue-700/40 text-blue-300 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest mb-5">
      {children}
    </div>
  );
}

// ─── Navbar ──────────────────────────────────────────────────────────────────

function Navbar() {
  const scrolled = useScrolled(80);
  const [open, setOpen] = useState(false);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/97 backdrop-blur-md shadow-sm border-b border-gray-100"
            : "bg-[#0F172A]/85 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 xl:px-16 flex items-center justify-between h-18" style={{ height: "72px" }}>
          {/* Logo */}
          <button onClick={() => scrollTo("hero")} className="flex-shrink-0 focus:outline-none" aria-label="RISE Collective home">
            <ImageWithFallback
              src={scrolled ? primaryLogo : darkLogo}
              alt="RISE Collective"
              className="object-contain transition-all duration-300"
              style={{ height: "40px", width: "auto", maxWidth: "180px" }}
            />
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`text-sm font-medium transition-colors duration-200 hover:text-blue-500 ${
                  scrolled ? "text-gray-600" : "text-white/80"
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => scrollTo("contact")}
              className={`text-sm font-semibold px-5 py-2.5 rounded-[14px] border transition-all duration-200 hover:scale-[1.03] ${
                scrolled
                  ? "border-blue-600 text-blue-600 hover:bg-blue-50"
                  : "border-white/30 text-white hover:bg-white/10"
              }`}
            >
              Book a Consultation
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="text-sm font-semibold px-5 py-2.5 rounded-[14px] bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:shadow-lg hover:shadow-blue-600/30 hover:scale-[1.03] transition-all duration-200"
            >
              Get Started
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(true)}
            className={`lg:hidden p-2 rounded-xl transition-colors ${scrolled ? "text-gray-800 hover:bg-gray-100" : "text-white hover:bg-white/10"}`}
            aria-label="Open navigation menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile fullscreen menu */}
      {open && (
        <div className="fixed inset-0 z-[200] bg-[#0F172A] flex flex-col">
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
            <ImageWithFallback
              src={darkLogo}
              alt="RISE Collective"
              className="object-contain"
              style={{ height: "36px", width: "auto", maxWidth: "160px" }}
            />
            <button
              onClick={() => setOpen(false)}
              className="p-2 text-white hover:text-blue-400 transition-colors rounded-xl hover:bg-white/10"
              aria-label="Close navigation menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex-1 flex flex-col px-6 pt-8 overflow-y-auto">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => { scrollTo(link.id); setOpen(false); }}
                className="text-left text-xl font-semibold text-white hover:text-blue-400 transition-colors py-4 border-b border-white/8 flex items-center justify-between group"
              >
                {link.label}
                <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
              </button>
            ))}
          </nav>
          <div className="px-6 pb-12 pt-6 space-y-3">
            <button
              onClick={() => { scrollTo("contact"); setOpen(false); }}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-4 rounded-2xl text-base font-semibold hover:shadow-xl hover:shadow-blue-600/30 transition-all"
            >
              Get Started →
            </button>
            <button
              onClick={() => { scrollTo("contact"); setOpen(false); }}
              className="w-full border border-white/20 text-white py-4 rounded-2xl text-base font-semibold hover:bg-white/10 transition-all"
            >
              Book a Consultation
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section id="hero" className="relative min-h-screen bg-[#0F172A] flex items-center overflow-hidden" style={{ paddingTop: "72px" }}>
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[700px] h-[700px] bg-blue-600/18 rounded-full blur-[120px] animate-rise-pulse" />
        <div className="absolute top-1/2 -right-48 w-[600px] h-[600px] bg-cyan-500/12 rounded-full blur-[100px] animate-rise-pulse-delayed" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[80px] animate-rise-pulse-delayed-2" />
      </div>

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 xl:px-16 grid lg:grid-cols-2 gap-12 xl:gap-20 items-center py-20 lg:py-28">
        {/* Left – content */}
        <div>
          {/* Label pill */}
          <div className="inline-flex items-center gap-2.5 bg-blue-600/15 border border-blue-500/25 rounded-full px-5 py-2 mb-8">
            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-rise-pulse flex-shrink-0" />
            <span className="text-cyan-300 text-xs font-semibold tracking-wider uppercase">Research · Innovation · Publications · IP</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl xl:text-6xl 2xl:text-7xl font-extrabold text-white leading-[1.08] tracking-tight mb-6">
            Accelerating{" "}
            <span
              className="animate-rise-gradient bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #60A5FA, #06B6D4, #818CF8, #60A5FA)" }}
            >
              Research
            </span>
            {" "}and Academic Excellence
          </h1>

          {/* Description */}
          <p className="text-lg text-gray-300 leading-relaxed mb-10 max-w-[520px]">
            A comprehensive academic and research support platform that helps students, researchers, scholars, and innovators transform ideas into published research, patented innovations, and successful academic outcomes.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => scrollTo("contact")}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-7 py-3.5 rounded-[14px] font-semibold text-sm hover:shadow-xl hover:shadow-blue-600/40 hover:scale-[1.04] transition-all duration-200"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="flex items-center gap-2 border border-white/25 text-white px-7 py-3.5 rounded-[14px] font-semibold text-sm hover:bg-white/10 hover:border-white/40 transition-all duration-200"
            >
              Book a Consultation
            </button>
            <button
              onClick={() => scrollTo("services")}
              className="flex items-center gap-1.5 text-blue-400 px-2 py-3.5 font-medium text-sm hover:text-cyan-400 transition-colors duration-200"
            >
              Explore Services <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Stats row */}
          <div className="mt-14 pt-8 border-t border-white/10 flex flex-wrap gap-8">
            {[
              { value: "500+", label: "Research Papers" },
              { value: "200+", label: "Patents Filed" },
              { value: "1,000+", label: "Researchers Served" },
              { value: "11", label: "Core Services" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-gray-400 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right – abstract visual */}
        <div className="hidden lg:flex items-center justify-center">
          <div className="relative w-[460px] h-[460px]">
            {/* Glow behind */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-72 h-72 bg-gradient-to-br from-blue-600/35 to-cyan-500/25 rounded-full blur-3xl" />
            </div>

            {/* Spinning rings */}
            <div className="absolute inset-10 rounded-full border border-blue-500/20 animate-rise-spin" />
            <div className="absolute inset-2 rounded-full border border-cyan-500/10 animate-rise-spin-reverse" />
            <div className="absolute inset-24 rounded-full border border-blue-400/15 animate-rise-spin" style={{ animationDuration: "18s" }} />

            {/* Center card – brand icon */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-36 h-36 rounded-3xl overflow-hidden shadow-2xl shadow-blue-600/50">
              <ImageWithFallback
                src={favcon1}
                alt="RISE Collective"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating stat cards */}
            <div className="absolute top-4 left-0 z-20 animate-rise-float">
              <div className="bg-white/8 backdrop-blur-md border border-white/15 rounded-2xl p-4 min-w-[120px]">
                <div className="text-2xl font-bold text-white">500+</div>
                <div className="text-[11px] text-blue-200 mt-0.5 font-medium">Papers Published</div>
              </div>
            </div>

            <div className="absolute top-1/3 -right-4 z-20 animate-rise-float-delayed">
              <div className="bg-white/8 backdrop-blur-md border border-white/15 rounded-2xl p-4 min-w-[120px]">
                <div className="text-2xl font-bold text-white">200+</div>
                <div className="text-[11px] text-cyan-200 mt-0.5 font-medium">Patents Filed</div>
              </div>
            </div>

            <div className="absolute bottom-4 right-8 z-20 animate-rise-float-delayed-2">
              <div className="bg-white/8 backdrop-blur-md border border-white/15 rounded-2xl p-4 min-w-[130px]">
                <div className="text-2xl font-bold text-white">1,000+</div>
                <div className="text-[11px] text-emerald-200 mt-0.5 font-medium">Researchers Served</div>
              </div>
            </div>

            <div className="absolute bottom-1/3 -left-2 z-20 animate-rise-float-delayed-3">
              <div className="bg-white/8 backdrop-blur-md border border-white/15 rounded-2xl p-4">
                <div className="text-2xl font-bold text-white">11</div>
                <div className="text-[11px] text-blue-200 mt-0.5 font-medium">Core Services</div>
              </div>
            </div>

            {/* Orbit dots */}
            {[0, 72, 144, 216, 288].map((deg) => (
              <div
                key={deg}
                className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-blue-500/50"
                style={{
                  transform: `rotate(${deg}deg) translateX(180px) translateY(-50%)`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/30 animate-rise-bounce">
        <span className="text-[10px] font-medium tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4" />
      </div>
    </section>
  );
}

// ─── Who We Serve ────────────────────────────────────────────────────────────

function WhoWeServeSection() {
  const { ref, visible } = useInView();
  return (
    <section
      id="who-we-serve"
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-24 bg-[#F8FAFC] transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 xl:px-16">
        <div className="text-center mb-14">
          <SectionLabel>Who We Serve</SectionLabel>
          <h2 className="text-4xl xl:text-5xl font-extrabold text-[#0F172A] leading-tight mb-4">
            Built for Every{" "}
            <span className="text-blue-600">Research Professional</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            We provide specialized support for a wide range of academic and research professionals across all career stages.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
          {whoWeServeList.map(({ label, icon: Icon }) => (
            <div
              key={label}
              className="flex items-center gap-3 bg-white border border-gray-100 rounded-2xl p-4 hover:border-blue-200 hover:shadow-md hover:shadow-blue-100/50 hover:-translate-y-0.5 transition-all duration-200 cursor-default group"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-50 group-hover:bg-blue-100 transition-colors flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors leading-tight">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Services ────────────────────────────────────────────────────────────────

function ServicesSection() {
  const { ref, visible } = useInView();
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section
      id="services"
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-24 bg-white transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 xl:px-16">
        <div className="text-center mb-14">
          <SectionLabel>Our Services</SectionLabel>
          <h2 className="text-4xl xl:text-5xl font-extrabold text-[#0F172A] leading-tight mb-4">
            Comprehensive{" "}
            <span className="text-blue-600">Research Services</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            From research conception to global publication and patent protection — we support every stage of your journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {servicesList.map((service) => {
            const Icon = service.icon;
            const isOpen = expanded === service.id;
            return (
              <div
                key={service.id}
                className={`border rounded-[20px] p-6 flex flex-col transition-all duration-300 group hover:shadow-lg ${
                  isOpen ? "border-blue-200 shadow-md shadow-blue-50" : "border-gray-100 hover:border-gray-200"
                }`}
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200 flex-shrink-0"
                  style={{ background: `${service.color}14` }}
                >
                  <Icon className="w-6 h-6" style={{ color: service.color }} />
                </div>

                {/* Number badge */}
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-[15px] font-bold text-[#0F172A] leading-snug flex-1 pr-2">{service.title}</h3>
                  <span className="text-xs font-bold text-gray-300 flex-shrink-0 mt-0.5">#{String(service.id).padStart(2, "0")}</span>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-500 leading-relaxed mb-5 flex-1">{service.description}</p>

                {/* Expanded features */}
                {isOpen && (
                  <div className="mb-5 pt-4 border-t border-gray-100">
                    <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-3">What's Included</p>
                    <div className="grid grid-cols-2 gap-1.5">
                      {service.features.map((feature) => (
                        <div key={feature} className="flex items-start gap-1.5 text-xs text-gray-600">
                          <span className="w-1.5 h-1.5 rounded-full mt-[5px] flex-shrink-0" style={{ background: service.color }} />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between mt-auto">
                  <button
                    onClick={() => setExpanded(isOpen ? null : service.id)}
                    className="flex items-center gap-1.5 text-xs font-semibold transition-colors"
                    style={{ color: service.color }}
                  >
                    {isOpen ? (
                      <><ChevronUp className="w-3.5 h-3.5" /> Show Less</>
                    ) : (
                      <>View Details <ChevronDown className="w-3.5 h-3.5" /></>
                    )}
                  </button>
                  <button
                    onClick={() => scrollTo("contact")}
                    className="flex items-center gap-1.5 text-xs font-semibold text-white px-4 py-2 rounded-[10px] hover:opacity-90 hover:scale-[1.04] transition-all"
                    style={{ background: `linear-gradient(135deg, ${service.color}, #06B6D4)` }}
                  >
                    Get Started <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Workflow ────────────────────────────────────────────────────────────────

function WorkflowSection() {
  const { ref, visible } = useInView();
  return (
    <section
      id="workflow"
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-24 bg-[#0F172A] relative overflow-hidden transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      {/* Background orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <SectionLabelDark>Research Workflow</SectionLabelDark>
          <h2 className="text-4xl xl:text-5xl font-extrabold text-white leading-tight mb-4">
            Your Journey,{" "}
            <span
              className="animate-rise-gradient bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #60A5FA, #06B6D4, #60A5FA)" }}
            >
              Step by Step
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-xl mx-auto leading-relaxed">
            Our proven workflow ensures comprehensive expert support at every stage of your research journey.
          </p>
        </div>

        <div className="relative">
          {workflowSteps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === workflowSteps.length - 1;
            return (
              <div key={step.step} className="flex gap-5 sm:gap-8">
                {/* Left: step number + connector */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/30 z-10 flex-shrink-0">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  {!isLast && (
                    <div
                      className="w-px flex-1 mt-3"
                      style={{ background: "linear-gradient(to bottom, rgba(37,99,235,0.4), rgba(6,182,212,0.1))", minHeight: "40px" }}
                    />
                  )}
                </div>

                {/* Right: content */}
                <div className={`flex-1 ${isLast ? "pb-0" : "pb-10"}`}>
                  <div className="flex items-center gap-3 mb-1.5">
                    <span className="text-[10px] font-bold text-blue-400 tracking-widest uppercase">Step {step.step}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1.5">{step.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed max-w-lg">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Why Choose Us ───────────────────────────────────────────────────────────

function WhyChooseUsSection() {
  const { ref, visible } = useInView();
  return (
    <section
      id="why-us"
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-24 bg-[#F8FAFC] transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 xl:px-16">
        <div className="text-center mb-14">
          <SectionLabel>Why Choose Us</SectionLabel>
          <h2 className="text-4xl xl:text-5xl font-extrabold text-[#0F172A] leading-tight mb-4">
            The RISE{" "}
            <span className="text-blue-600">Advantage</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            What sets RISE Collective apart as the trusted global partner for academic and research excellence.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {whyChooseList.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="bg-white border border-gray-100 rounded-[20px] p-5 hover:border-blue-100 hover:shadow-lg hover:shadow-blue-50/80 hover:-translate-y-1 transition-all duration-250 group cursor-default"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 group-hover:bg-blue-100 transition-colors flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-xs font-bold text-[#0F172A] mb-2 leading-snug">{title}</h3>
              <p className="text-[11px] text-gray-500 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Industries ───────────────────────────────────────────────────────────────

function IndustriesSection() {
  const { ref, visible } = useInView();
  const tagColors = [
    "bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-100",
    "bg-cyan-50 text-cyan-700 border-cyan-100 hover:bg-cyan-100",
    "bg-indigo-50 text-indigo-700 border-indigo-100 hover:bg-indigo-100",
    "bg-sky-50 text-sky-700 border-sky-100 hover:bg-sky-100",
    "bg-violet-50 text-violet-700 border-violet-100 hover:bg-violet-100",
  ];

  return (
    <section
      id="industries"
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-24 bg-white transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 xl:px-16">
        <div className="text-center mb-14">
          <SectionLabel>Domains</SectionLabel>
          <h2 className="text-4xl xl:text-5xl font-extrabold text-[#0F172A] leading-tight mb-4">
            Industries &{" "}
            <span className="text-blue-600">Domains Supported</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            We support research across a wide spectrum of academic disciplines and industry verticals worldwide.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          {industriesList.map((industry, i) => (
            <span
              key={industry}
              className={`px-5 py-2.5 rounded-full border text-sm font-medium cursor-default hover:scale-[1.04] transition-all duration-150 ${tagColors[i % tagColors.length]}`}
            >
              {industry}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

function FAQSection() {
  const { ref, visible } = useInView();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-24 bg-[#F8FAFC] transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      <div className="max-w-3xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-14">
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="text-4xl xl:text-5xl font-extrabold text-[#0F172A] leading-tight mb-4">
            Frequently Asked{" "}
            <span className="text-blue-600">Questions</span>
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed">
            Everything you need to know about working with RISE Collective.
          </p>
        </div>

        <div className="space-y-3">
          {faqList.map((faq, index) => (
            <div
              key={index}
              className={`bg-white border rounded-2xl overflow-hidden transition-all duration-200 ${
                openIndex === index ? "border-blue-200 shadow-md shadow-blue-50" : "border-gray-100 hover:border-gray-200"
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between px-6 py-5 text-left gap-4 group"
              >
                <span className="text-[15px] font-semibold text-[#0F172A] leading-snug">{faq.q}</span>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${openIndex === index ? "bg-blue-600" : "bg-gray-100 group-hover:bg-gray-200"}`}>
                  {openIndex === index ? (
                    <ChevronUp className="w-4 h-4 text-white" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  )}
                </div>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6 border-t border-gray-50">
                  <p className="text-sm text-gray-600 leading-relaxed pt-4">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact ─────────────────────────────────────────────────────────────────

function ContactSection() {
  const { ref, visible } = useInView();
  const [form, setForm] = useState({ name: "", email: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1200);
  };

  return (
    <section
      id="contact"
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-24 bg-[#0F172A] relative overflow-hidden transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      {/* Background orbs */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-blue-600/12 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 xl:px-16">
        {/* Header */}
        <div className="text-center mb-16">
          <SectionLabelDark>Get Started Today</SectionLabelDark>
          <h2 className="text-4xl xl:text-5xl font-extrabold text-white leading-tight mb-4">
            Transform Your Research{" "}
            <span
              className="animate-rise-gradient bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #60A5FA, #06B6D4, #60A5FA)" }}
            >
              into Global Impact
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Whether you're writing your first research paper, completing a PhD thesis, filing a patent, or building an academic career — we're here at every step.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-start">
          {/* Form */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/30 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-gray-400 text-sm leading-relaxed">Our research experts will get back to you within 24 hours.</p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", service: "", message: "" }); }}
                  className="mt-6 text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors"
                >
                  Send another message →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-xl font-bold text-white mb-6">Send us a Message</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">Full Name</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                      placeholder="Your name"
                      className="w-full bg-white/8 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-blue-500 focus:bg-white/12 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">Email Address</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                      placeholder="your@email.com"
                      className="w-full bg-white/8 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-blue-500 focus:bg-white/12 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">Service Interested In</label>
                  <select
                    value={form.service}
                    onChange={(e) => setForm((p) => ({ ...p, service: e.target.value }))}
                    className="w-full bg-white/8 border border-white/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-all"
                    style={{ color: form.service ? "white" : "rgb(75,85,99)" }}
                  >
                    <option value="" style={{ background: "#0F172A", color: "#9CA3AF" }}>Select a service…</option>
                    {servicesList.map((s) => (
                      <option key={s.id} value={s.title} style={{ background: "#0F172A", color: "white" }}>{s.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">Message</label>
                  <textarea
                    required
                    value={form.message}
                    onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                    placeholder="Tell us about your research needs…"
                    rows={4}
                    className="w-full bg-white/8 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-blue-500 focus:bg-white/12 transition-all resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3.5 rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-blue-600/30 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" /><path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                      Sending…
                    </span>
                  ) : (
                    <><Send className="w-4 h-4" /> Send Message</>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact info */}
          <div className="space-y-10">
            <div>
              <h3 className="text-2xl font-bold text-white mb-3">{"Let's Talk Research"}</h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                Schedule a free consultation with our research experts and discover how we can accelerate your academic and innovation journey.
              </p>
            </div>

            {/* Quick action cards */}
            <div className="space-y-3">
              {[
                { label: "Schedule a Free Consultation", desc: "30-minute expert session", icon: Target },
                { label: "Talk to a Research Expert", desc: "One-on-one guidance", icon: Users },
                { label: "Request a Service Quote", desc: "Custom pricing for your needs", icon: FileText },
              ].map(({ label, desc, icon: Icon }) => (
                <button
                  key={label}
                  onClick={() => scrollTo("contact")}
                  className="w-full flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all group text-left"
                >
                  <div className="w-10 h-10 bg-blue-600/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600/30 transition-colors">
                    <Icon className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-white">{label}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{desc}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
                </button>
              ))}
            </div>

            {/* Contact details */}
            <div className="space-y-3 pt-6 border-t border-white/10">
              {[
                { icon: Mail, text: "contact@risecollective.com" },
                { icon: Phone, text: "+1 (800) RISE-COL" },
                { icon: MapPin, text: "Global Research Network · Worldwide" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-gray-400 hover:text-gray-300 transition-colors">
                  <Icon className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span className="text-sm">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="bg-[#080E1A] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 xl:px-16 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-8 mb-14">
          {/* Brand col – spans 2 cols */}
          <div className="col-span-2">
            <ImageWithFallback
              src={darkLogo}
              alt="RISE Collective"
              className="object-contain mb-4"
              style={{ height: "36px", width: "auto", maxWidth: "160px" }}
            />
            <p className="text-gray-500 text-sm leading-relaxed max-w-[260px]">
              A global academic and research support platform accelerating innovation, publication, and intellectual property development worldwide.
            </p>
            {/* Tagline */}
            <p className="text-blue-500 text-xs font-semibold mt-3 tracking-wider">The Future Starts Here.</p>
            {/* Social */}
            <div className="flex gap-2.5 mt-5">
              {[
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Linkedin, href: "#", label: "LinkedIn" },
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: Youtube, href: "#", label: "YouTube" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-gray-500 hover:text-white hover:bg-blue-600/20 hover:border-blue-500/30 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[11px] font-bold text-white uppercase tracking-widest mb-4">Services</h4>
            <ul className="space-y-2.5">
              {["Research & Publication", "Academic Writing", "Thesis Support", "Patent Services", "Book Publishing"].map((item) => (
                <li key={item}>
                  <button onClick={() => scrollTo("services")} className="text-sm text-gray-500 hover:text-blue-400 transition-colors text-left">
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* More Services */}
          <div>
            <h4 className="text-[11px] font-bold text-white uppercase tracking-widest mb-4">More Services</h4>
            <ul className="space-y-2.5">
              {["Grant Support", "Career Consulting", "Project Consulting", "Research Metrics", "Hiring Services"].map((item) => (
                <li key={item}>
                  <button onClick={() => scrollTo("services")} className="text-sm text-gray-500 hover:text-blue-400 transition-colors text-left">
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[11px] font-bold text-white uppercase tracking-widest mb-4">Company</h4>
            <ul className="space-y-2.5">
              {[
                { label: "About Us", id: "hero" },
                { label: "Workflow", id: "workflow" },
                { label: "Industries", id: "industries" },
                { label: "FAQ", id: "faq" },
                { label: "Contact", id: "contact" },
              ].map(({ label, id }) => (
                <li key={label}>
                  <button onClick={() => scrollTo(id)} className="text-sm text-gray-500 hover:text-blue-400 transition-colors text-left">
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-[11px] font-bold text-white uppercase tracking-widest mb-4">Stay Updated</h4>
            <p className="text-xs text-gray-500 leading-relaxed mb-3">Get research insights and updates delivered to your inbox.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 bg-white/8 border border-white/15 rounded-xl px-3 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors min-w-0"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2.5 rounded-xl transition-colors flex-shrink-0">
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} RISE Collective. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <a key={item} href="#" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  useEffect(() => {
    document.title = "RISE Collective | The Future Starts Here";
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <WhoWeServeSection />
      <ServicesSection />
      <WorkflowSection />
      <WhyChooseUsSection />
      <IndustriesSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
