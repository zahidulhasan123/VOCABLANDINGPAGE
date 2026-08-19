import { useEffect, useState } from "react";
import logo from "./images/logo.png";
import heroArtwork from "./images/image1.png";
import videoThumb from "./images/image2.png";
import bookImage from "./images/image3.png";
import pdfFile from "./assets/PDF/Oxford_3k.pdf";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import bookDetail from "./images/image4.png";
import androidApp from "./images/image5.png";
import image6 from "./images/image6.png";
import infoIcon from "./assets/Info icon.svg";
// bookDetail (image4.png) removed per request

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

const featureCards = [
  {
    badge: "ভিডিও সহায়তা",
    title: "৩,০০০ Dedicated Video Lesson",
    description: "প্রতিটি শব্দ বুঝতে রয়েছে dedicated visual lesson",
    icon: "video",
    color: "#D9F6F8",
    badgeColor: "#147D89",
    accent: "bg-[#dff7fb] text-[#2c7f93]",
    bubble: "০১",
    bubbleTone: "bg-[#e2f1f4]",
  },
  {
    badge: "শুনে শিখুন",
    title: "সম্পূর্ণ বইয়ের Audio Podcast",
    description: "যেকোনো সময় শুনে শিখতে পারবেন অডিও দিয়ে",
    icon: "audio",
    color: "#FFF0CE",
    badgeColor: "#A86600",
    accent: "bg-[#f9efd7] text-[#bb7a10]",
    bubble: "০২",
    bubbleTone: "bg-[#f3ead6]",
  },
  {
    badge: "যেকোনো জায়গায়",
    title: "Dedicated Android App",
    description: "Offline ব্যবহারযোগ্য—ইন্টারনেট ছাড়াও প্র্যাকটিস করুন।",
    icon: "app",
    color: "#E2EAFF",
    badgeColor: "#3158A5",
    accent: "bg-[#dee7ff] text-[#4561d7]",
    bubble: "০৩",
    bubbleTone: "bg-[#e2e8f7]",
  },
  {
    badge: "বলার অনুশীলন",
    title: "Vocal Exercise",
    description: "উচ্চারণ ঠিক করতে বলার অভ্যাস গড়ে তুলুন।",
    icon: "mic",
    color: "#F0E5FB",
    badgeColor: "#7B4CA1",
    accent: "bg-[#eadcff] text-[#8b60d7]",
    bubble: "০৪",
    bubbleTone: "bg-[#ece2ff]",
  },
  {
    badge: "মজার চ্যালেঞ্জ",
    title: "২৮টি Tongue Twister",
    description: "শব্দ বলার জড়তা কাটাতে ছোট ছোট অনুশীলন।",
    icon: "note",
    color: "#FDE8E3",
    badgeColor: "#7B4CA1",
    accent: "bg-[#fee0db] text-[#d06a57]",
    bubble: "০৫",
    bubbleTone: "bg-[#f8e4e1]",
  },
  {
    badge: "মনে রাখার সিস্টেম",
    title: "Practice + Revision Support",
    description: "বারবার চর্চায় শেখা শব্দগুলো মনে ধরে রাখুন।",
    icon: "refresh",
    color: "#E1F3E7",
    badgeColor: "#396D4F",
    accent: "bg-[#dff0dd] text-[#5f9b57]",
    bubble: "০৬",
    bubbleTone: "bg-[#e7efdf]",
  },
];

const learningSteps = [
  {
    step: "ধাপ ০১",
    title: "দেখুন ও বুঝুন",
    desc: "শব্দ, বাংলা অর্থ, উচ্চারণ ও Example দেখুন।",
  },
  {
    step: "ধাপ ০২",
    title: "শুনুন ও বলুন",
    desc: "Audio শুনুন, নিজে উচ্চারণ করুন; দরকার হলে Video দেখুন।",
  },
  {
    step: "ধাপ ০৩",
    title: "ব্যবহার করে দেখুন",
    desc: "Example বুঝুন, নিজের বাক্যে ব্যবহার করুন এবং App-এ Practice করুন।",
  },
  {
    step: "ধাপ ০৪",
    title: "মনে করুন ও Revision দিন",
    desc: "বই না দেখে মনে করার চেষ্টা করুন; নিশ্চিত হলে টিক দিন।",
  },
];

function CardIcon({ type, className = "" }) {
  const common = "h-5 w-5 stroke-current fill-none stroke-[1.8]";

  switch (type) {
    case "video":
      return (
        <svg
          viewBox="0 0 24 24"
          className={`${common} ${className}`}
          aria-hidden="true"
        >
          <rect x="4" y="6" width="13" height="12" rx="3" />
          <path d="M17 10.5 20 8.5V15.5L17 13.5Z" strokeLinejoin="round" />
          <path d="M8 10.5h3" strokeLinecap="round" />
        </svg>
      );
    case "audio":
      return (
        <svg
          viewBox="0 0 24 24"
          className={`${common} ${className}`}
          aria-hidden="true"
        >
          <path d="M6 12a6 6 0 0 1 12 0" strokeLinecap="round" />
          <path d="M5 13a2 2 0 0 1 2-2h1v6H7a2 2 0 0 1-2-2v-2Z" />
          <path d="M17 11h1a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-1v-6Z" />
        </svg>
      );
    case "app":
      return (
        <svg
          viewBox="0 0 24 24"
          className={`${common} ${className}`}
          aria-hidden="true"
        >
          <rect x="7" y="4.5" width="10" height="15" rx="2.5" />
          <path d="M10 7.5h4" strokeLinecap="round" />
          <path d="M10.2 15.2h3.6" strokeLinecap="round" />
        </svg>
      );
    case "mic":
      return (
        <svg
          viewBox="0 0 24 24"
          className={`${common} ${className}`}
          aria-hidden="true"
        >
          <rect x="9" y="4" width="6" height="9" rx="3" />
          <path d="M7 12a5 5 0 0 0 10 0" strokeLinecap="round" />
          <path d="M12 16v3" strokeLinecap="round" />
          <path d="M9 19h6" strokeLinecap="round" />
        </svg>
      );
    case "note":
      return (
        <svg
          viewBox="0 0 24 24"
          className={`${common} ${className}`}
          aria-hidden="true"
        >
          <path d="M8 5.5h7l3 3V18a1.5 1.5 0 0 1-1.5 1.5H8A1.5 1.5 0 0 1 6.5 18V7A1.5 1.5 0 0 1 8 5.5Z" />
          <path d="M15 5.5V9h3.5" strokeLinejoin="round" />
          <path d="M9 12.2h5" strokeLinecap="round" />
          <path d="M9 15h4" strokeLinecap="round" />
        </svg>
      );
    case "refresh":
      return (
        <svg
          viewBox="0 0 24 24"
          className={`${common} ${className}`}
          aria-hidden="true"
        >
          <path d="M4.5 12a7.5 7.5 0 0 1 12.7-5.3" strokeLinecap="round" />
          <path
            d="M15.5 4.8h2.3V7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M19.5 12a7.5 7.5 0 0 1-12.7 5.3" strokeLinecap="round" />
          <path
            d="M8.5 19.2H6.2V17"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return null;
  }
}

function App() {
  const [expandedIndex, setExpandedIndex] = useState(-1);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [bookPage, setBookPage] = useState(0);
  const [pdfPages, setPdfPages] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState("next");
  const [mobilePage, setMobilePage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const handleResize = () => setIsMobile(mediaQuery.matches);
    handleResize();
    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  const pdfSpreadCount = Math.ceil(pdfPages / 2);

  const handlePdfLoad = ({ numPages }) => setPdfPages(numPages);
  const handleNextPage = () => {
    if (isFlipping) return;
    if (isMobile) {
      if (bookPage === 0) {
        setMobilePage(1);
        setBookPage(1);
      } else if (pdfPages > 0) {
        setMobilePage((page) => Math.min(page + 1, pdfPages));
      }
      return;
    }
    if (bookPage === 0) {
      setBookPage(1);
    } else if (bookPage < pdfSpreadCount) {
      setFlipDirection("next");
      setIsFlipping(true);
    }
  };
  const handlePreviousPage = () => {
    if (isFlipping) return;
    if (isMobile) {
      if (mobilePage <= 1) setBookPage(0);
      else setMobilePage((page) => Math.max(1, page - 1));
      return;
    }
    if (bookPage === 1) setBookPage(0);
    else if (bookPage > 1) {
      setFlipDirection("prev");
      setIsFlipping(true);
    }
  };

  useEffect(() => {
    const sectionIds = [
      "how-it-works",
      "book",
      "package",
      "student-stories",
      "android-app",
      "faq",
      "order",
    ];

    const updateNavigation = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0);

      const marker = window.scrollY + window.innerHeight * 0.28;
      let current = "";
      sectionIds.forEach((id) => {
        const section = document.getElementById(id);
        if (section && section.offsetTop <= marker) current = id;
      });
      setActiveSection(current);
    };

    updateNavigation();
    window.addEventListener("scroll", updateNavigation, { passive: true });
    window.addEventListener("resize", updateNavigation);
    return () => {
      window.removeEventListener("scroll", updateNavigation);
      window.removeEventListener("resize", updateNavigation);
    };
  }, []);

  const faqItems = [
    {
      question: "এই প্যাকেজে ঠিক কী কী থাকছে?",
      answer:
        "Oxford 3000 Vocabulary Book-এর সাথে Dedicated Android App, Audio, Video Lesson, Practice এবং Progress Support আসবে।",
    },
    {
      question: "মোট মূল্য কত? ডেলিভারি চার্জ আছে?",
      answer:
        "সম্পূর্ণ প্যাকেজের মূল্য ৩,৫০০ টাকা। সারা বাংলাদেশে বিনামূল্যে ডেলিভারি পাবেন। কোনো অতিরিক্ত চার্জ নেই।",
    },
    {
      question: "App কি Android-এর জন্য?",
      answer:
        "Google Play Store থেকে Oxford 3000 অ্যাপ ডাউনলোড করুন এবং আপনার অ্যাকাউন্ট দিয়ে লগইন করুন।",
    },
    {
      question: "আমি একদম beginner হলে শুরু করতে পারব?",
      answer:
        "অবশ্যই। আমাদের কোর্স বিগিনার থেকে শুরু করে ডিজাইন করা হয়েছে। ধাপে ধাপে শিখুন এবং সহজেই Oxford 3000 শব্দ আয়ত্ত করুন।",
    },
    {
      question: "অর্ডার করতে কী করতে হবে?",
      answer:
        "ওয়েবসাইট থেকে সরাসরি অর্ডার করুন অথবা ০১৪০-৫৪৫-৮৮০০-২ নম্বরে কল করে অর্ডার নিশ্চিত করুন। আমরা আপনার বই দ্রুত পৌঁছে দেব।",
    },
    {
      question: "অর্ডারের আগে কথা বলতে চাইলে?",
      answer: "আমরা 30 দিনের মানি-ব্যাক গ্যারান্টি দিচ্ছি।",
    },
    {
      question: "আর্ডারের আগে আমায় খোঁজার প্রশ্ন?",
      answer: "যেকোনো প্রশ্নের জন্য 0140-545-8800-2 নম্বরে যোগাযোগ করুন।",
    },
  ];

  return (
    <main className="min-h-screen bg-[#050812] text-white">

      {/* Section - 01 */}
      <section id="top" className="relative overflow-hidden bg-[#060b18]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_30%,rgba(65,118,255,0.34),transparent_0_22%),radial-gradient(circle_at_82%_70%,rgba(249,199,75,0.12),transparent_0_18%),linear-gradient(180deg,#060b18_0%,#0b172f_100%)]" />
        <div className="relative mx-auto max-w-[1240px] px-3 pb-4 pt-[92px] sm:px-5 sm:pt-[96px] lg:px-0 lg:pt-[84px]">
          <header className="fixed left-0 right-0 top-0 z-[100] h-[80px] min-h-[80px] w-full bg-[#050811] shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
            <div className="mx-auto flex h-[80px] min-h-[80px] w-full max-w-[1152px] items-center justify-between px-4 sm:px-6 lg:px-0">
            <a href="/" className="flex items-center gap-3" aria-label="Homepage">
              <div className="flex items-center gap-2 sm:gap-3">
                <img
                  src={logo}
                  alt="Oxford 3000 logo"
                  className="h-10 w-10 rounded-full object-contain sm:h-11 sm:w-11"
                />
                <div>
                  <div className="text-sm font-semibold leading-none sm:text-base">
                    Oxford 3000
                  </div>
                  <div className="text-[0.62rem] uppercase tracking-[0.32em] text-[#f7c84f] sm:text-xs">
                    Vocabulary System
                  </div>
                </div>
              </div>
            </a>

            <nav className="hidden items-center gap-6 text-sm text-white/84 xl:flex">
              {[
                ["how-it-works", "কীভাবে কাজ করে"],
                ["book", "বই দেখুন"],
                ["package", "সম্পূর্ণ প্যাকেজ"],
                ["student-stories", "শিক্ষার্থীদের অভিজ্ঞতা"],
                ["android-app", "App দেখুন"],
                ["faq", "প্রশ্নোত্তর"],
              ].map(([id, label]) => (
                <a key={id} href={`#${id}`} className={`nav-menu-link whitespace-nowrap rounded-md px-2 py-1 font-medium transition ${activeSection === id ? "bg-white/12 text-white" : "hover:text-white"}`}>
                  {label}
                </a>
              ))}
            </nav>

            <button
              type="button"
              aria-label={mobileMenuOpen ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="ml-auto grid h-10 w-10 place-items-center rounded-lg border border-white/15 text-white transition hover:bg-white/10 xl:hidden"
            >
              <span className="sr-only">মেনু</span>
              <span className="flex w-5 flex-col gap-1.5">
                <span className="h-0.5 w-full bg-current" />
                <span className="h-0.5 w-full bg-current" />
                <span className="h-0.5 w-full bg-current" />
              </span>
            </button>

            <a
              href="#order"
              className="hidden h-[46.938px] min-h-[46.4px] w-[242.047px] items-center justify-center gap-[8.8px] rounded-[12px] border border-[rgba(0,0,0,0)] bg-[linear-gradient(135deg,#FFE38E_0%,#F8C94B_46%,#F2B81E_100%)] px-[18.4px] py-[12.48px] text-sm font-bold text-[#10172a] shadow-[0_11px_26px_0_rgba(248,201,75,0.22),0_1px_0_0_rgba(255,255,255,0.50)_inset] transition hover:-translate-y-0.5 hover:brightness-105 xl:flex"
            >
              এখনই অর্ডার করুন
              <svg
                viewBox="0 0 20 20"
                className="h-4 w-4 shrink-0"
                aria-hidden="true"
              >
                <path
                  d="M4 10h11M10.5 5.5 15 10l-4.5 4.5"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                />
              </svg>
            </a>

            {mobileMenuOpen && (
              <nav className="absolute left-0 right-0 top-full z-50 flex flex-col gap-1 border-t border-white/10 bg-[#050811] p-4 text-sm text-white/85 shadow-xl xl:hidden">
                {[
                  ["#how-it-works", "কীভাবে কাজ করে"],
                  ["#book", "বই দেখুন"],
                  ["#package", "সম্পূর্ণ প্যাকেজ"],
                  ["#student-stories", "শিক্ষার্থীদের অভিজ্ঞতা"],
                  ["#android-app", "App দেখুন"],
                  ["#faq", "প্রশ্নোত্তর"],
                ].map(([href, label]) => (
                  <a key={href} href={href} onClick={() => setMobileMenuOpen(false)} className={`nav-menu-link whitespace-nowrap rounded-lg px-3 py-3 font-medium transition ${activeSection === href.slice(1) ? "bg-white/12 text-white" : "hover:bg-white/10 hover:text-white"}`}>
                    {label}
                  </a>
                ))}
                <a href="#order" onClick={() => setMobileMenuOpen(false)} className="mt-2 flex items-center justify-center rounded-xl bg-[#f8c94b] px-4 py-3 font-bold text-[#10172a]">
                  এখনই অর্ডার করুন
                </a>
              </nav>
            )}
            </div>
            <div className="pointer-events-none absolute bottom-0 left-0 h-[2px] bg-[#f8c94b] transition-[width] duration-150 ease-out" style={{ width: `${scrollProgress}%` }} />
          </header>

          <div className="grid items-center gap-6 px-3 pb-10 pt-20 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8 lg:pt-24">
            <div className="max-w-[560px] lg:pr-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#f7c84f]/30 bg-[#0c1426] px-4 py-2 text-[0.72rem] font-medium text-[#f7c84f] shadow-soft">
                <span className="text-sm">◂</span>
                বাংলাদেশে আমরাই প্রথম
              </div>

              <h1
                className="mt-8 whitespace-nowrap text-[clamp(2.15rem,5vw,4.12rem)] font-black tracking-[-0.05em] text-[#f8cb54] leading-[0.98]"
                aria-label="Oxford 3000 Vocab"
              >
                {['Oxford', '3000', 'Vocab'].map((word, index) => (
                  <span
                    key={word}
                    className="hero-word mr-[0.28em] last:mr-0"
                    style={{ animationDelay: `${index * 140}ms` }}
                  >
                    {word}
                  </span>
                ))}
              </h1>
              <h2
                className="mt-3 whitespace-nowrap text-[clamp(2rem,4.1vw,3.18rem)] font-black tracking-[-0.05em] text-white leading-[1.02]"
                aria-label="Complete Learning System"
              >
                {['Complete', 'Learning', 'System'].map((word, index) => (
                  <span
                    key={word}
                    className="hero-word mr-[0.28em] last:mr-0"
                    style={{ animationDelay: `${420 + index * 140}ms` }}
                  >
                    {word}
                  </span>
                ))}
              </h2>

              <p className="mt-8 max-w-[34rem] text-[0.98rem] leading-8 text-white/65 sm:text-[1.02rem]">
                বই, App, Audio, Video ও Practice - সব একসাথে।
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="#order"
                  className="flex h-[46.938px] min-h-[46.4px] w-[242.047px] items-center justify-center gap-[8.8px] rounded-[12px] border border-[rgba(0,0,0,0)] bg-[linear-gradient(135deg,#FFE38E_0%,#F8C94B_46%,#F2B81E_100%)] px-[18.4px] py-[12.48px] text-center text-sm font-extrabold text-[#10172a] shadow-[0_11px_26px_0_rgba(248,201,75,0.22),0_1px_0_0_rgba(255,255,255,0.50)_inset] transition hover:-translate-y-0.5 hover:brightness-105"
                >
                  এখনই অর্ডার করুন
                  <svg
                    viewBox="0 0 20 20"
                    className="h-4 w-4 shrink-0"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 10h11M10.5 5.5 15 10l-4.5 4.5"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.8"
                    />
                  </svg>
                </a>
                <a
                  href="#book"
                  className="flex h-[46.938px] min-h-[46.4px] w-full max-w-[242.047px] shrink-0 items-center justify-center gap-[8.8px] rounded-[12px] border border-white/20 bg-white/[0.04] px-[18.4px] py-[12.48px] text-center text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/[0.08]"
                >
                  <span>বইয়ের ভেতর দেখুন</span>
                  <svg
                    viewBox="0 0 20 20"
                    className="h-4 w-4 shrink-0"
                    aria-hidden="true"
                  >
                    <path
                      d="M5.5 7.5 10 12l4.5-4.5"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.8"
                    />
                  </svg>
                </a>
              </div>

              <div className="mt-4 flex items-center gap-2 text-sm text-white/55">
                <span className="text-[#69d7a7]">✓</span>
                সারা দেশে ক্যাশ অন ডেলিভারি
              </div>
            </div>

            <div className="relative justify-self-end w-[min(100%,640px)] translate-x-3 lg:translate-x-6">
              <img
                src={heroArtwork}
                alt="Oxford 3000 vocabulary pack"
                className="block w-full select-none object-contain drop-shadow-[0_18px_40px_rgba(0,0,0,0.45)]"
              />
            </div>
          </div>

          <div className="mx-3 grid gap-4 border-t border-white/10 pb-8 pt-8 sm:grid-cols-2 lg:grid-cols-6 lg:gap-0 lg:px-8">
            {[
              ["৩,০০০", "মূল শব্দ"],
              ["৩,০০০", "Dedicated Video"],
              ["সম্পূর্ণ", "Audio"],
              ["Learning Principles", "অনুযায়ী সাজান"],
              ["Offline", "Android App"],
              ["৳৫০", "ডেলিভারি চার্জ মাত্র"],
            ].map(([title, subtitle]) => (
              <div
                key={title + subtitle}
                className="border-l border-white/10 pl-4 first:border-l-0 first:pl-0 lg:px-4"
              >
                <div className="text-2xl font-black text-[#f7c84f]">
                  {title}
                </div>
                <div className="mt-1 text-sm text-white/60">{subtitle}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

{/* Section - 02 */}

      <section id="how-it-works" className="relative overflow-hidden bg-[#050812] px-4 py-20 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-[980px] text-center">
          <h2 className="text-[clamp(1.6rem,3.2vw,2.6rem)] font-black text-white">
            ১ মিনিটে দেখে নিন
          </h2>
          <p className="mt-2 text-sm text-white/60">
            পুরো সিস্টেমটি ১ মিনিটে বুঝে নিন
          </p>

          <div className="mt-8">
            <div className="relative mx-auto aspect-video max-w-[990px] overflow-hidden rounded-xl bg-[#040914] shadow-[0_18px_40px_rgba(0,0,0,0.45)]">
              {videoPlaying ? (
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src="https://www.youtube.com/embed/brdP8Tgy1nM?autoplay=1&rel=0"
                  title="Oxford 3000 Vocab introduction"
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                />
              ) : (
                <>
                  <img
                    src={videoThumb}
                    alt="Watch 1 minute"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setVideoPlaying(true)}
                    aria-label="১ মিনিটের ভিডিও চালু করুন"
                    className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#F8C94B] shadow-[0_0_0_12.8px_rgba(248,201,75,0.12)] transition hover:scale-105 hover:bg-[#ffd86d]"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-6 w-6 text-[#10172a]"
                      aria-hidden="true"
                    >
                      <path d="M10 8l6 4-6 4V8z" fill="currentColor" />
                    </svg>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f6efdf] px-4 py-16 text-[#102034] sm:px-6 lg:px-8 lg:py-20">
        {/* decorative overlay removed */}
        <div className="absolute right-0 top-0 h-32 w-32 rounded-full border border-[#d9d3c8] opacity-60" />
        <div className="absolute left-0 bottom-0 h-28 w-28 rounded-full border border-[#d9d3c8] opacity-60" />

        <div className="mx-auto max-w-[1152px] text-center">
          <div className="text-[0.72rem] font-bold uppercase tracking-[0.42em] text-[#af8f46]">
            Included with the book
          </div>
          <h2 className="mt-4 text-[clamp(2rem,4vw,3.35rem)] font-black tracking-[-0.05em] text-[#22314a]">
            বইটির সাথে ফ্রিতে যা পাচ্ছেন
          </h2>
          <p className="mt-4 text-[0.95rem] text-[#6b7487] sm:text-[1.02rem]">
            বই কিনলেই এগুলো পাচ্ছেন—আলাদা কোনো চার্জ নেই।
          </p>

          <div className="included-card-grid mt-12">
            {featureCards.map((card) => (
              <article
                key={card.title}
                className="included-card group"
                style={{
                  "--card-color": card.color,
                  "--badge-color": card.badgeColor,
                }}
              >
                <div className="included-card-corner" />
                <div className="included-card-icon">
                  <CardIcon type={card.icon} />
                </div>
                <div className="included-card-badge">{card.badge}</div>
                <h3 className="included-card-title">{card.title}</h3>
                <p className="included-card-description">{card.description}</p>
                <div className="included-card-number">
                  {card.bubble}
                </div>
              </article>
            ))}
          </div>

          <div className="mx-auto mt-6 max-w-[790px] rounded-[1rem] bg-[#102948] px-5 py-4 text-left text-[0.82rem] leading-7 text-white shadow-[0_16px_36px_rgba(9,15,28,0.18)] sm:px-6 sm:text-[0.92rem]">
            <span className="flex w-full items-center justify-center gap-3 text-center">
              <img src={infoIcon} alt="" className="h-5 w-5 shrink-0" />
              Offline App, Vocal Exercise ও Tongue Twister বইয়ের Study Guide-এ সরাসরি আছে।
            </span>
          </div>
        </div>
      </section>

      <section className="relative flex min-h-[670px] flex-col items-center justify-center self-stretch overflow-hidden bg-[linear-gradient(170deg,#040914_6.17%,#071022_93.83%)] px-6 py-24 text-white">
        <div className="relative z-10 mx-auto w-full max-w-[896px] text-center">
          <div className="text-[0.72rem] font-bold uppercase tracking-[0.42em] text-[#f7c84f]">
            THE MASTERY LOOP
          </div>
          <h2 className="mt-4 text-[clamp(2rem,4vw,3rem)] font-normal tracking-[-0.04em] text-white">
            একটি শব্দ শিখবেন যেভাবে
          </h2>
          <p className="mx-auto mt-5 max-w-[620px] text-sm leading-7 text-white/45 sm:text-[0.95rem]">
            চারটি ধাপ পরপর একসঙ্গে কাজ করে — দেখা, শোনা, বলা ও রিভিশন একই ছন্দে।
          </p>

          <div className="mastery-loop-grid mt-14 text-left">
            {learningSteps.map((step, index) => {
              const cardStyles = [
                "border-[#8f6d2a]/45 bg-[#1a1b1d]",
                "border-[#2f7592]/45 bg-[#0d1c2c]",
                "border-[#5451a6]/45 bg-[#13152f]",
                "border-[#9b6334]/45 bg-[#1b191f]",
              ];
              const textStyles = [
                "text-[#f7c84f]",
                "text-[#72d9e8]",
                "text-[#a99aff]",
                "text-[#f7a23e]",
              ];

              return (
                <article
                  key={step.step}
                  className={`relative min-h-[144px] overflow-hidden rounded-[16px] border p-7 ${cardStyles[index]}`}
                >
                  <div className={`text-[0.68rem] font-bold uppercase tracking-[0.28em] ${textStyles[index]}`}>
                    {step.step}
                  </div>
                  <h3 className="mt-4 text-[1.18rem] font-normal text-white sm:text-[1.3rem]">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[0.82rem] leading-6 text-white/60 sm:text-sm">
                    {step.desc}
                  </p>
                  <div className={`absolute -bottom-8 -right-3 text-[6rem] font-black leading-none opacity-[0.06] ${textStyles[index]}`}>
                    {index + 1}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>





      <section id="book"  className="relative overflow-hidden bg-[#f0e8df] px-4 py-20 sm:py-24 lg:py-28 text-[#102034]">
        <div className="mx-auto max-w-[1120px] text-center">
          <div className="text-[0.72rem] font-bold uppercase tracking-[0.42em] text-[#af8f46]">
           - INSIDE THE BOOK -
          </div>
          <h3 className="mt-4 text-[clamp(1.9rem,3.6vw,2.8rem)] font-black tracking-[-0.02em] text-[#122034]">
            বইটি একটু পড়ে দেখুন।
          </h3>
          <p className="mt-3 max-w-[700px] mx-auto text-sm text-[#background: #0D1F35;]">
            প্রতিটি পেজে রয়েছে শেখার প্রয়োজনীয় সব উপাদান।
          </p>

          <div className="mt-8">
            <div className="mx-auto max-w-[920px] relative overflow-hidden">
              {bookPage === 0 ? (
                <img
                  src={bookImage}
                  alt="Open book preview"
                  className="mx-auto mb-8 h-auto w-[min(860px,88%)] rounded-[8px] object-contain drop-shadow-[0_18px_40px_rgba(16,20,24,0.12)]"
                />
              ) : (
                <div className="mx-auto mb-8 w-[min(860px,88%)] overflow-hidden rounded-[8px] bg-[#fffdf7] shadow-[0_18px_40px_rgba(16,20,24,0.12)]">
                  <Document
                    file={pdfFile}
                    onLoadSuccess={handlePdfLoad}
                    loading={<div className="flex min-h-[420px] items-center justify-center text-sm text-[#8B6500]">PDF loading...</div>}
                    error={<div className="flex min-h-[420px] items-center justify-center text-sm text-red-600">PDF load করা যাচ্ছে না।</div>}
                  >
                    {isMobile ? (
                      <Page
                        key={`mobile-page-${mobilePage}`}
                        pageNumber={mobilePage}
                        width={430}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        renderMode="canvas"
                        className="block h-auto w-full [&>canvas]:block [&>canvas]:h-auto [&>canvas]:w-full"
                      />
                    ) : (
                      <div className="relative flex w-full overflow-hidden bg-[#fffdf7] [perspective:1800px]">
                        <div className="relative z-10 flex w-full will-change-transform">
                          <div className="relative min-w-0 w-1/2 overflow-hidden">
                            <Page
                              key={`current-${bookPage * 2 - 1}`}
                              pageNumber={bookPage * 2 - 1}
                              width={430}
                              renderTextLayer={false}
                              renderAnnotationLayer={false}
                              renderMode="canvas"
                              className="block h-auto w-full [&>canvas]:block [&>canvas]:h-auto [&>canvas]:w-full"
                            />
                          </div>
                          <div className="relative z-20 w-[3px] shrink-0 bg-[#10243b] shadow-[0_0_10px_rgba(0,0,0,0.18)]" />
                          <div className="relative min-w-0 w-1/2 overflow-hidden">
                            {bookPage * 2 <= pdfPages && (
                              <Page
                                key={`current-${bookPage * 2}`}
                                pageNumber={bookPage * 2}
                                width={430}
                                renderTextLayer={false}
                                renderAnnotationLayer={false}
                                renderMode="canvas"
                                className="block h-auto w-full [&>canvas]:block [&>canvas]:h-auto [&>canvas]:w-full"
                              />
                            )}
                          </div>
                        </div>
                        {isFlipping && (
                          <div
                            className={`absolute inset-y-0 z-40 w-1/2 ${flipDirection === "next" ? "right-0 origin-left book-sheet-next" : "left-0 origin-right book-sheet-prev"}`}
                            onAnimationEnd={() => {
                              setBookPage((page) => flipDirection === "next" ? page + 1 : Math.max(1, page - 1));
                              setIsFlipping(false);
                            }}
                          >
                            <div className="book-sheet-front absolute inset-0 overflow-hidden bg-[#fffdf7]">
                              <Page
                                pageNumber={flipDirection === "next" ? bookPage * 2 : bookPage * 2 - 1}
                                width={430}
                                renderTextLayer={false}
                                renderAnnotationLayer={false}
                                renderMode="canvas"
                                className="block h-auto w-full [&>canvas]:block [&>canvas]:h-auto [&>canvas]:w-full"
                              />
                            </div>
                            <div className="book-sheet-back absolute inset-0 overflow-hidden bg-[#fffdf7]">
                              {(flipDirection === "next"
                                ? bookPage * 2 + 1 <= pdfPages
                                : bookPage * 2 - 2 >= 1) && (
                                <Page
                                  pageNumber={flipDirection === "next" ? bookPage * 2 + 1 : bookPage * 2 - 2}
                                  width={430}
                                  renderTextLayer={false}
                                  renderAnnotationLayer={false}
                                  renderMode="canvas"
                                  className="block h-auto w-full [&>canvas]:block [&>canvas]:h-auto [&>canvas]:w-full"
                                />
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </Document>
                </div>
              )}

 <div className="mt-[24px] flex flex-col items-center">

  {/* ================= CONTROLS ================= */}
  <div className="flex items-center justify-center gap-[24px]">

    {/* Previous Button */}
    <button
      type="button"
      onClick={handlePreviousPage}
      disabled={bookPage === 0 || isFlipping}
      className="
        w-[164px]
        h-[56px]
        rounded-[14px]
        border
        border-[#D4BC88]
        bg-[#FFF8E8]
        px-[20px]
        py-[9px]
        flex
        items-center
        justify-center
        gap-[10px]
        text-[#17140D]
        font-['Hind_Siliguri']
        text-[18px]
        font-semibold
        leading-none
        whitespace-nowrap
        disabled:cursor-not-allowed
        disabled:opacity-60
      "
    >
      <span
        className="
          text-[28px]
          font-normal
          leading-none
          -mt-[2px]
        "
      >
        ‹
      </span>

      <span>
        আগের পৃষ্ঠা
      </span>
    </button>


    {/* ================= PAGE INDICATORS ================= */}
    <div className="flex items-center gap-[10px]">

      {/* Dot 1 */}
      <span
        className="
          w-[8px]
          h-[8px]
          rounded-full
          bg-[#D8C9A8]
        "
      />

      {/* Dot 2 */}
      <span
        className="
          w-[8px]
          h-[8px]
          rounded-full
          bg-[#D8C9A8]
        "
      />

      {/* Active */}
      <span
        className="
          w-[32px]
          h-[6px]
          rounded-full
          bg-[#8B6500]
        "
      />

    </div>


    {/* ================= NEXT BUTTON ================= */}
    <button
      type="button"
      onClick={handleNextPage}
      disabled={
        isFlipping ||
        (isMobile
          ? pdfPages > 0 && mobilePage >= pdfPages
          : pdfPages > 0 && bookPage >= pdfSpreadCount)
      }
      className="
        w-[154px]
        h-[56px]
        rounded-[14px]
        border
        border-[#D4BC88]
        bg-[#FFF8E8]
        px-[20px]
        py-[9px]
        flex
        items-center
        justify-center
        gap-[10px]
        text-[#17140D]
        font-['Hind_Siliguri']
        text-[18px]
        font-semibold
        leading-none
        whitespace-nowrap
        disabled:cursor-not-allowed
        disabled:opacity-60
      "
    >
      <span>
        পরের পৃষ্ঠা
      </span>

      <span
        className="
          text-[28px]
          font-normal
          leading-none
          -mt-[2px]
        "
      >
        ›
      </span>
    </button>

  </div>


  {/* ================= KEYBOARD HINT ================= */}
  <p
    className="
      mt-[16px]
      font-['Inter']
      text-[10px]
      font-normal
      tracking-[1px]
      text-[#B7A88E]
    "
  >
    ← → arrow keys to flip pages
  </p>

</div>
            </div>
          </div>
        </div>
      </section>









<section id="package"
  className="
    relative
    overflow-hidden
    bg-[#FBF5E8]
    px-4
    py-[86.4px]
    sm:px-6
    lg:px-8
  "
>
  {/* ================= MAIN CONTAINER ================= */}
  <div className="mx-auto w-full max-w-[1440px]">

    {/* ================= TOP CONTENT ================= */}
    <div
      className="
        mx-auto
        grid
        w-full
        max-w-[1152px]
        grid-cols-1
        gap-[40px]
        lg:grid-cols-2
        lg:gap-[72px]
      "
    >

      {/* ================= LEFT CONTENT ================= */}
      <div className="text-left">

        {/* THE BOOK, UNPACKED */}
        <div
          className="
            font-['Inter']
            text-[11px]
            font-bold
            uppercase
            leading-[17px]
            tracking-[2.8px]
            text-[#73500C]
            whitespace-nowrap
          "
        >
          THE BOOK, UNPACKED
        </div>


        {/* MAIN TITLE */}
        <h2
          className="
            mt-[14px]
            w-full
            whitespace-nowrap
            font-['Hind_Siliguri']
            text-[40px]
            font-bold
            leading-[52.53px]
            tracking-[-0.79px]
            text-[#0A1730]
          "
        >
          বইটিতে যা যা রয়েছে
        </h2>

      </div>


      {/* ================= RIGHT DESCRIPTION ================= */}
      <div
        className="
          flex
          items-start
          lg:justify-end
        "
      >
        <p
          className="
            m-0
            w-full
            max-w-[405px]
            font-['Hind_Siliguri']
            text-[17.6px]
            font-normal
            leading-[30.27px]
            tracking-[-0.44px]
            text-[#4D5A6B]
            text-left
          "
        >
          একটি Word Page-এ শুধু অর্থ নয়—উচ্চারণ, ব্যবহার ও
          Revision-এর প্রয়োজনীয় Cue-গুলোও একই Learning Sequence-এ
          সাজানো হয়েছে।
        </p>
      </div>

    </div>


    {/* ================= SINGLE BOOK IMAGE ================= */}
    <div
      className="
        mx-auto
        mt-[52px]
        w-full
        max-w-[1152px]
      "
    >
      <img
        src={bookDetail}
        alt="Book detail"
        className="
          block
          h-auto
          w-full
          object-contain
          rounded-tl-[9.6px]
          rounded-tr-[20px]
          rounded-br-[20px]
          rounded-bl-[9.6px]
        "
        style={{
          boxShadow: "0px 14px 38px 0px #04091417",
        }}
      />
    </div>

  </div>
</section>
      
      <section
  className="
    relative
    overflow-hidden
    bg-[#050812]
    px-4
    py-[64px]
    sm:px-6
    sm:py-[80px]
    lg:px-8
    lg:py-[96px]
  "
>
  <div className="mx-auto w-full max-w-[1120px]">

    {/* =========================================================
        HERO
    ========================================================= */}
    <div
      className="
        grid
        items-center
        gap-[48px]
        lg:grid-cols-[1fr_1.05fr]
        lg:gap-[32px]
      "
    >

      {/* ================= LEFT CONTENT ================= */}
      <div className="max-w-[560px] text-left">

        {/* BOOK + DIGITAL SUPPORT */}
        <div
          className="
            flex
            items-center
            gap-[8px]
            font-['Inter']
            text-[11px]
            font-bold
            uppercase
            leading-[17px]
            tracking-[2px]
            text-[#F7C84F]
          "
        >
          <span className="text-[13px]">—</span>
          <span>BOOK + DIGITAL SUPPORT</span>
        </div>


        {/* MAIN HEADING */}
<h2
  className="
    mt-[14px]
    w-full
    max-w-[560px]
    font-['Hind_Siliguri']
    text-[46.08px]
    font-bold
    leading-[52.53px]
    tracking-[-0.79px]
    text-white
  "
>
  <span className="block whitespace-nowrap font-['Hind_Siliguri'] font-bold">
    শুধু বই নয়—পুরো একটি
  </span>

  <span className="block font-['Inter'] font-bold">
    Learning System
  </span>
</h2>


        {/* DESCRIPTION */}
        <p
          className="
            mt-[18px]
            max-w-[520px]
            font-['Hind_Siliguri']
            text-[15px]
            font-normal
            leading-[25px]
            text-[#9AA6B6]
            sm:text-[16px]
          "
        >
          একই Vocabulary পড়া, শোনা, দেখা, প্র্যাকটিস ও ট্র্যাক
          করার জন্য ছয়টি পরস্পর সংযুক্ত Learning Support।
        </p>

      </div>


      {/* ================= HERO ARTWORK ================= */}
      <div
        className="
          relative
          flex
          items-center
          justify-center
          lg:justify-end
        "
      >
        <img
          src={heroArtwork}
          alt="Book and digital learning support"
          className="
            block
            w-[min(600px,100%)]
            select-none
            object-contain
            drop-shadow-[0_20px_45px_rgba(0,0,0,0.45)]
          "
        />
      </div>

    </div>


    {/* =========================================================
        FEATURE CARDS
    ========================================================= */}
    <div
      className="
        mt-[58px]
        grid
        grid-cols-1
        gap-[12px]
        sm:grid-cols-2
        lg:grid-cols-3
        lg:gap-[12px]
      "
    >

      {/* ================= CARD 01 ================= */}
      <article
        className="
          relative
          min-h-[150px]
          overflow-hidden
          rounded-[14px]
          border
          border-[#202A3A]
          bg-[#0B111D]
          px-[20px]
          py-[20px]
          text-left
          shadow-[0_12px_28px_rgba(0,0,0,0.22)]
        "
      >
        <div className="flex items-start gap-[14px]">

          <div
            className="
              flex
              h-[44px]
              w-[44px]
              shrink-0
              items-center
              justify-center
              rounded-[11px]
              bg-[#F7C84F]
              font-['Hind_Siliguri']
              text-[14px]
              font-bold
              text-[#10172A]
            "
          >
            ০১
          </div>

          <div>
            <h3 className="font-['Inter'] text-[16px] font-bold leading-[22px] text-white">
              Vocabulary Book
            </h3>

            <p className="mt-[7px] max-w-[230px] font-['Hind_Siliguri'] text-[13px] leading-[21px] text-[#8E99AA]">
              Oxford sequence-এ সাজানো বাংলা অর্থ,
              উচ্চারণ, Example ও Short Note।
            </p>
          </div>

        </div>

        <div className="absolute bottom-[16px] left-[64px] h-[2px] w-[64px] bg-gradient-to-r from-[#F7C84F] to-transparent" />
      </article>


      {/* ================= CARD 02 ================= */}
      <article
        className="
          relative
          min-h-[150px]
          overflow-hidden
          rounded-[14px]
          border
          border-[#202A3A]
          bg-[#0B111D]
          px-[20px]
          py-[20px]
          text-left
          shadow-[0_12px_28px_rgba(0,0,0,0.22)]
        "
      >
        <div className="flex items-start gap-[14px]">

          <div
            className="
              flex
              h-[44px]
              w-[44px]
              shrink-0
              items-center
              justify-center
              rounded-[11px]
              bg-[#F7C84F]
              font-['Hind_Siliguri']
              text-[14px]
              font-bold
              text-[#10172A]
            "
          >
            ০২
          </div>

          <div>
            <h3 className="font-['Inter'] text-[16px] font-bold leading-[22px] text-white">
              Dedicated Android App
            </h3>

<p className="mt-[7px] font-['Hind_Siliguri'] text-[13px] leading-[21px] text-[#8E99AA]">
  <span className="block whitespace-nowrap">
    শব্দ অনুশীলন ও revision-এর জন্য বইয়ের সঙ্গে
  </span>

  <span className="block">
    যুক্ত digital support।
  </span>
</p>
          </div>

        </div>

        <div className="absolute bottom-[16px] left-[64px] h-[2px] w-[64px] bg-gradient-to-r from-[#F7C84F] to-transparent" />
      </article>


      {/* ================= CARD 03 ================= */}
      <article
        className="
          relative
          min-h-[150px]
          overflow-hidden
          rounded-[14px]
          border
          border-[#202A3A]
          bg-[#0B111D]
          px-[20px]
          py-[20px]
          text-left
          shadow-[0_12px_28px_rgba(0,0,0,0.22)]
        "
      >
        <div className="flex items-start gap-[14px]">

          <div
            className="
              flex
              h-[44px]
              w-[44px]
              shrink-0
              items-center
              justify-center
              rounded-[11px]
              bg-[#F7C84F]
              font-['Hind_Siliguri']
              text-[14px]
              font-bold
              text-[#10172A]
            "
          >
            ০৩
          </div>

          <div>
            <h3 className="font-['Inter'] text-[16px] font-bold leading-[22px] text-white">
              Audio
            </h3>

<p className="mt-[7px] font-['Hind_Siliguri'] text-[13px] leading-[21px] text-[#8E99AA]">
  <span className="block whitespace-nowrap">
    শুনুন, নিজে উচ্চারণ করুন এবং মনে রাখার চেষ্টা
  </span>
  <span className="block">
    করুন।
  </span>
</p>
          </div>

        </div>

        <div className="absolute bottom-[16px] left-[64px] h-[2px] w-[64px] bg-gradient-to-r from-[#F7C84F] to-transparent" />
      </article>


      {/* ================= CARD 04 ================= */}
      <article
        className="
          relative
          min-h-[150px]
          overflow-hidden
          rounded-[14px]
          border
          border-[#202A3A]
          bg-[#0B111D]
          px-[20px]
          py-[20px]
          text-left
          shadow-[0_12px_28px_rgba(0,0,0,0.22)]
        "
      >
        <div className="flex items-start gap-[14px]">

          <div
            className="
              flex
              h-[44px]
              w-[44px]
              shrink-0
              items-center
              justify-center
              rounded-[11px]
              bg-[#F7C84F]
              font-['Hind_Siliguri']
              text-[14px]
              font-bold
              text-[#10172A]
            "
          >
            ০৪
          </div>

          <div>
            <h3 className="font-['Inter'] text-[16px] font-bold leading-[22px] text-white">
              Video Lesson
            </h3>

<p className="mt-[7px] font-['Hind_Siliguri'] text-[13px] leading-[21px] text-[#8E99AA]">
  <span className="block whitespace-nowrap">
    কঠিন অংশ ও ব্যবহার বুঝতে ধাপে ধাপে video
  </span>
  <span className="block">
    support।
  </span>
</p>
          </div>

        </div>

        <div className="absolute bottom-[16px] left-[64px] h-[2px] w-[64px] bg-gradient-to-r from-[#F7C84F] to-transparent" />
      </article>


      {/* ================= CARD 05 ================= */}
      <article
        className="
          relative
          min-h-[150px]
          overflow-hidden
          rounded-[14px]
          border
          border-[#202A3A]
          bg-[#0B111D]
          px-[20px]
          py-[20px]
          text-left
          shadow-[0_12px_28px_rgba(0,0,0,0.22)]
        "
      >
        <div className="flex items-start gap-[14px]">

          <div
            className="
              flex
              h-[44px]
              w-[44px]
              shrink-0
              items-center
              justify-center
              rounded-[11px]
              bg-[#F7C84F]
              font-['Hind_Siliguri']
              text-[14px]
              font-bold
              text-[#10172A]
            "
          >
            ০৫
          </div>

          <div>
            <h3 className="font-['Inter'] text-[16px] font-bold leading-[22px] text-white">
              Practice Support
            </h3>

            <p className="mt-[7px] max-w-[230px] font-['Hind_Siliguri'] text-[13px] leading-[21px] text-[#8E99AA]">
              Practice Check Box, Tongue Twister ও Vocal
              Exercise দিয়ে active recall।
            </p>
          </div>

        </div>

        <div className="absolute bottom-[16px] left-[64px] h-[2px] w-[64px] bg-gradient-to-r from-[#F7C84F] to-transparent" />
      </article>


      {/* ================= CARD 06 ================= */}
      <article
        className="
          relative
          min-h-[150px]
          overflow-hidden
          rounded-[14px]
          border
          border-[#202A3A]
          bg-[#0B111D]
          px-[20px]
          py-[20px]
          text-left
          shadow-[0_12px_28px_rgba(0,0,0,0.22)]
        "
      >
        <div className="flex items-start gap-[14px]">

          <div
            className="
              flex
              h-[44px]
              w-[44px]
              shrink-0
              items-center
              justify-center
              rounded-[11px]
              bg-[#F7C84F]
              font-['Hind_Siliguri']
              text-[14px]
              font-bold
              text-[#10172A]
            "
          >
            ০৬
          </div>

          <div>
            <h3 className="font-['Inter'] text-[16px] font-bold leading-[22px] text-white">
              Progress Support
            </h3>

<p className="mt-[7px] font-['Hind_Siliguri'] text-[13px] leading-[21px] text-[#8E99AA]">
  <span className="block whitespace-nowrap">
    শেখা, revision ও পরবর্তী ধাপ গুছিয়ে এগোনোর
  </span>
  <span className="block">
    ব্যবস্থা।
  </span>
</p>
          </div>

        </div>

        <div className="absolute bottom-[16px] left-[64px] h-[2px] w-[64px] bg-gradient-to-r from-[#F7C84F] to-transparent" />
      </article>

    </div>


    {/* =========================================================
        BOTTOM CTA
    ========================================================= */}
    <div
      className="
        mt-[14px]
        flex
        min-h-[78px]
        flex-col
        items-start
        justify-between
        gap-[20px]
        rounded-[14px]
        border
        border-[#173044]
        bg-[#0A1A26]
        px-[20px]
        py-[14px]
        sm:flex-row
        sm:items-center
        sm:px-[24px]
      "
    >

      {/* PRICE */}
      <div className="flex items-center gap-[14px]">

        <span
          className="
            font-['Hind_Siliguri']
            text-[30px]
            font-bold
            leading-none
            text-[#F7C84F]
          "
        >
          ৳৪৯৯
        </span>

        <span
          className="
            font-['Hind_Siliguri']
            text-[13px]
            font-normal
            leading-[20px]
            text-[#8E99AA]
          "
        >
          সারা দেশে ক্যাশ অন ডেলিভারি
        </span>

      </div>


      {/* ORDER BUTTON */}
      <a
        href="#"
        className="
          flex
          h-[48px]
          min-w-[198px]
          items-center
          justify-center
          gap-[10px]
          rounded-[11px]
          bg-[#F7C84F]
          px-[24px]
          font-['Hind_Siliguri']
          text-[15px]
          font-bold
          text-[#10172A]
          shadow-[0_12px_30px_rgba(247,200,79,0.28)]
          transition
          duration-200
          hover:-translate-y-[2px]
          hover:bg-[#FFD35F]
        "
      >
        এখনই অর্ডার করুন
        <span className="text-[20px] leading-none">→</span>
      </a>

    </div>

  </div>
</section>

      


{/* ================= WHO IT IS FOR ================= */}
<section
  className="
    relative
    overflow-hidden
    bg-[#FFFDF7]
    px-4
    py-[70px]
    sm:px-6
    sm:py-[76px]
    lg:px-8
    lg:py-[80px]
  "
>
  <div className="mx-auto w-full max-w-[1440px]">

    {/* ================= HEADER ================= */}
    <div className="mx-auto flex w-full flex-col items-center">

      {/* WHO IT IS FOR */}
      <div
        className="
          flex
          h-[17px]
          items-center
          justify-center
          gap-[8px]
          font-['Inter']
          text-[10px]
          font-bold
          uppercase
          leading-[15px]
          tracking-[2.5px]
          text-[#73500C]
          sm:text-[11px]
        "
      >
        <span
          className="
            h-[2px]
            w-[16px]
            shrink-0
            rounded-full
            bg-[#73500C]
          "
        />

        <span>WHO IT IS FOR</span>

        <span
          className="
            h-[2px]
            w-[16px]
            shrink-0
            rounded-full
            bg-[#73500C]
          "
        />
      </div>


      {/* ================= MAIN TITLE ================= */}
      <h2
        className="
          mt-[7px]
          whitespace-nowrap
          text-center
          font-['Hind_Siliguri']
          text-[32px]
          font-bold
          leading-[42px]
          tracking-[-0.6px]
          text-[#0A1730]
          sm:text-[36px]
          sm:leading-[48px]
          lg:text-[40px]
          lg:leading-[53px]
          lg:tracking-[-0.7929px]
        "
      >
        এই বইটি কাদের জন্য
      </h2>

    </div>


    {/* ================= CARDS ================= */}
    <div
      className="
        mx-auto
        mt-[42px]
        grid
        w-full
        max-w-[1152px]
        grid-cols-1
        gap-[16px]
        md:grid-cols-2
        lg:mt-[44px]
        lg:grid-cols-3
      "
    >

      {/* =========================================================
          CARD 01
      ========================================================= */}
      <article
        className="
          relative
          box-border
          h-[250px]
          overflow-hidden
          rounded-[16px]
          border
          border-[#DCD3C0]
          bg-[rgba(255,253,248,0.82)]
          px-[28.8px]
          py-[28.8px]
          shadow-[0px_14px_38px_rgba(4,9,20,0.09)]
        "
      >

        {/* Circle */}
        <div
          className="
            pointer-events-none
            absolute
            -bottom-[43px]
            -right-[43px]
            z-0
            h-[144px]
            w-[144px]
            rounded-full
            bg-[#FFF0B7]
          "
        />

        {/* Text ABOVE circle */}
        <div className="relative z-10">

          {/* Number */}
          <div
            className="
              h-[21px]
              font-['Hind_Siliguri']
              text-[12px]
              font-bold
              leading-[20px]
              tracking-[1.44px]
              text-[#7F6D4A]
            "
          >
            ০১
          </div>

          {/* Title */}
          <h3
  className="
    mt-[12px]
    h-[32px]
    font-['Hind_Siliguri']
    text-[18.88px]
    font-bold
    leading-[32px]
    tracking-[-0.444712px]
    text-[#071229]
  "
>
  পরীক্ষার প্রস্তুতি
</h3>

          {/* Audience */}
<div
  className="
    mt-[14px]
    w-full
    max-w-[314px]
    font-['Inter']
    text-[14.4px]
    font-bold
    leading-[24px]
    tracking-[-0.182812px]
    text-[#8D6213]
  "
>
  SSC, HSC, University, BCS ও Bank Job
  <br />
  Candidate
</div>

          {/* Description */}
          <p
            className="
              mt-[13.6px]
              w-full
              max-w-[314px]
              font-['Hind_Siliguri']
              text-[16px]
              font-normal
              leading-[27px]
              tracking-[-0.3125px]
              text-[#536174]
            "
          >
            প্রয়োজনীয় vocabulary একটি নির্দিষ্ট sequence-এ
            revise করুন।
          </p>

        </div>
      </article>


      {/* =========================================================
          CARD 02
      ========================================================= */}
      <article
        className="
          relative
          box-border
          h-[250px]
          overflow-hidden
          rounded-[16px]
          border
          border-[#DCD3C0]
          bg-[rgba(255,253,248,0.82)]
          px-[28.8px]
          py-[28.8px]
          shadow-[0px_14px_38px_rgba(4,9,20,0.09)]
        "
      >

        {/* Circle */}
        <div
          className="
            pointer-events-none
            absolute
            -bottom-[43px]
            -right-[43px]
            z-0
            h-[144px]
            w-[144px]
            rounded-full
            bg-[#FFD6B7]
          "
        />

        {/* Text ABOVE circle */}
        <div className="relative z-10">

          {/* Number */}
          <div
            className="
              h-[21px]
              font-['Hind_Siliguri']
              text-[12px]
              font-bold
              leading-[20px]
              tracking-[1.44px]
              text-[#7F6D4A]
            "
          >
            ০২
          </div>

          {/* Title */}
          <h3
            className="
              mt-[5px]
              h-[32px]
              font-['Hind_Siliguri']
              text-[18.88px]
              font-bold
              leading-[32px]
              tracking-[-0.444712px]
              text-[#071229]
            "
          >
            যোগাযোগ দক্ষতা
          </h3>

          {/* Audience */}
          <div
            className="
              mt-[14px]
              w-full
              max-w-[314px]
              font-['Inter']
              text-[14.4px]
              font-bold
              leading-[24px]
              tracking-[-0.182812px]
              text-[#8D6213]
            "
          >
            IELTS ও Spoken English Learner
          </div>

          {/* Description */}
          <p
            className="
              mt-[13.6px]
              w-full
              max-w-[314px]
              font-['Hind_Siliguri']
              text-[16px]
              font-normal
              leading-[27px]
              tracking-[-0.3125px]
              text-[#536174]
            "
          >
            অর্থ জানার পাশাপাশি pronunciation, example ও
            ব্যবহার শিখুন।
          </p>

        </div>
      </article>


      {/* =========================================================
          CARD 03
      ========================================================= */}
      <article
        className="
          relative
          box-border
          h-[250px]
          overflow-hidden
          rounded-[16px]
          border
          border-[#DCD3C0]
          bg-[rgba(255,253,248,0.82)]
          px-[28.8px]
          py-[28.8px]
          shadow-[0px_14px_38px_rgba(4,9,20,0.09)]
        "
      >

        {/* Circle */}
        <div
          className="
            pointer-events-none
            absolute
            -bottom-[43px]
            -right-[43px]
            z-0
            h-[144px]
            w-[144px]
            rounded-full
            bg-[#FFF0B7]
          "
        />

        {/* Text ABOVE circle */}
        <div className="relative z-10">

          {/* Number */}
          <div
            className="
              h-[21px]
              font-['Hind_Siliguri']
              text-[12px]
              font-bold
              leading-[20px]
              tracking-[1.44px]
              text-[#7F6D4A]
            "
          >
            ০৩
          </div>

          {/* Title */}
          <h3
            className="
              mt-[5px]
              h-[32px]
              font-['Hind_Siliguri']
              text-[18.88px]
              font-bold
              leading-[32px]
              tracking-[-0.444712px]
              text-[#071229]
            "
          >
            নিজে শেখার যাত্রা
          </h3>

          {/* Audience */}
          <div
            className="
              mt-[14px]
              w-full
              max-w-[314px]
              font-['Inter']
              text-[14.4px]
              font-bold
              leading-[24px]
              tracking-[-0.182812px]
              text-[#8D6213]
            "
          >
            Vocabulary Beginner ও Self Learner
          </div>

          {/* Description */}
<p
  className="
    mt-[13.6px]
    w-[calc(100%+20px)]
    max-w-none
    font-['Hind_Siliguri']
    text-[16px]
    font-normal
    leading-[27px]
    tracking-[-0.3125px]
    text-[#536174]
  "
>
  বই, App ও support একসাথে রেখে প্রতিদিনের শেখা
  <br />
  সহজ করুন।
</p>

        </div>
      </article>

    </div>
  </div>
</section>


      {/* Section - 9 */}

 {/* ================= STUDENT PROOF ================= */}
{/* =========================================================
    STUDENT PROOF
========================================================= */}
<section
  className="
    relative
    overflow-hidden
    bg-[#050A14]
    px-4
    py-[80px]
    sm:px-6
    sm:py-[96px]
    lg:px-8
    lg:py-[108px]
  "
>
  <div className="mx-auto w-full max-w-[1152px]">

{/* =========================================================
    HEADER
========================================================= */}
<div id="student-stories" className="flex flex-col items-center text-center">

  {/* STUDENT PROOF */}
  <div 
    className="
      flex
      items-center
      justify-center
      gap-[8px]
      font-['Inter']
      text-[11px]
      font-bold
      uppercase
      leading-[16px]
      tracking-[2.5px]
      text-[#F7C84F]
    "
  >
    <span
      className="
        h-[2px]
        w-[16px]
        shrink-0
        rounded-full
        bg-[#F7C84F]
      "
    />

    <span>STUDENT PROOF</span>

    <span
      className="
        h-[2px]
        w-[16px]
        shrink-0
        rounded-full
        bg-[#F7C84F]
      "
    />
  </div>


  {/* MAIN TITLE */}
  <h2
    className="
      mt-[8px]
      whitespace-nowrap
      font-['Hind_Siliguri']
      text-[40px]
      font-bold
      leading-[53px]
      tracking-[-0.8px]
      text-white
      sm:text-[44px]
      sm:leading-[58px]
    "
  >
    শিক্ষার্থীদের অভিজ্ঞতা
  </h2>

</div>


    {/* =========================================================
        STUDENT STORIES
    ========================================================= */}
    <div className="mt-[72px]">

      {/* Sub heading */}
<div className="text-center">

  {/* STUDENT STORIES */}
  <div
    className="
      flex
      items-center
      justify-center
      gap-[8px]
      font-['Inter']
      text-[10px]
      font-bold
      uppercase
      leading-[15px]
      tracking-[2.5px]
      text-[#F7C84F]
    "
  >
    <span
      className="
        h-[2px]
        w-[16px]
        shrink-0
        rounded-full
        bg-[#F7C84F]
      "
    />

    <span>STUDENT STORIES</span>

    <span
      className="
        h-[2px]
        w-[16px]
        shrink-0
        rounded-full
        bg-[#F7C84F]
      "
    />
  </div>


  {/* VIDEO TITLE */}
  <h3
    className="
      mt-[6px]
      font-['Hind_Siliguri']
      text-[28px]
      font-bold
      leading-[38px]
      text-white
      sm:text-[30px]
      sm:leading-[40px]
    "
  >
    ভিডিও অভিজ্ঞতা
  </h3>

</div>


      {/* =========================================================
          VIDEO CARDS
      ========================================================= */}
<div
  className="
    mx-auto
    mt-[24px]
    grid
    w-full
    max-w-[910px]
    grid-cols-1
    gap-[22px]
    sm:grid-cols-3
  "
>

        {/* =======================================================
            CARD 01
        ======================================================= */}
        <div
          className="
            relative
            h-[570px]
            overflow-hidden
            rounded-[16px]
            border
            border-[#24354D]
            bg-[#07152D]
            shadow-[0_20px_45px_rgba(0,0,0,0.35)]
          "
        >

          {/* Background */}
          <div
            className="
              absolute
              inset-0
              bg-[radial-gradient(circle_at_70%_18%,rgba(49,108,140,0.48),transparent_34%),linear-gradient(145deg,#183E67_0%,#071A39_42%,#06122A_100%)]
            "
          />

          {/* Top horizontal line */}
          <div
            className="
              pointer-events-none
              absolute
              left-0
              top-[66px]
              z-10
              h-[2px]
              w-[68px]
              bg-[#718398]
              opacity-60
            "
          />

          {/* ================= DIAGONAL LINE 01 ================= */}
          <div
            className="
              pointer-events-none
              absolute
              left-[-30px]
              top-[155px]
              z-10
              h-[1px]
              w-[370px]
              rotate-[-29deg]
              origin-center
              bg-[#B79A42]
              opacity-80
            "
          />

          {/* ================= CIRCLE ================= */}
          <div
            className="
              pointer-events-none
              absolute
              left-[58px]
              top-[175px]
              z-10
              h-[180px]
              w-[180px]
              rounded-full
              border
              border-[#B79A42]
              opacity-80
            "
          />

          {/* ================= DIAGONAL LINE 02 ================= */}
          <div
            className="
              pointer-events-none
              absolute
              left-[-30px]
              top-[375px]
              z-10
              h-[1px]
              w-[370px]
              rotate-[-29deg]
              origin-center
              bg-[#B79A42]
              opacity-70
            "
          />

          {/* ================= YELLOW GLOW DOT ================= */}
          <div
            className="
              pointer-events-none
              absolute
              right-[42px]
              top-[132px]
              z-20
              flex
              h-[28px]
              w-[28px]
              items-center
              justify-center
              rounded-full
              bg-[#F7C84F]/15
              shadow-[0_0_18px_rgba(247,200,79,0.16)]
            "
          >
            <div
              className="
                h-[8px]
                w-[8px]
                rounded-full
                bg-[#F7C84F]
                shadow-[0_0_10px_3px_rgba(247,200,79,0.35)]
              "
            />
          </div>

          {/* ================= CENTER NUMBER ================= */}
          <div
            className="
              absolute
              left-1/2
              top-[220px]
              z-30
              flex
              h-[90px]
              w-[120px]
              -translate-x-1/2
              items-center
              justify-center
              font-['Hind_Siliguri']
              text-[64px]
              font-bold
              leading-none
              tracking-[-5px]
              text-[#F7C84F]
            "
          >
            ০১
          </div>

          {/* Bottom right line */}
          <div
            className="
              pointer-events-none
              absolute
              bottom-[73px]
              right-0
              z-20
              h-[2px]
              w-[68px]
              bg-[#718398]
              opacity-60
            "
          />

          {/* Oxford label */}
          <div
            className="
              absolute
              bottom-[54px]
              left-[18px]
              z-30
              font-['Inter']
              text-[10px]
              font-bold
              uppercase
              tracking-[1.8px]
              text-white/75
            "
          >
            OXFORD 3000
          </div>

          {/* Student info */}
          <div
            className="
              absolute
              bottom-0
              left-0
              right-0
              z-40
              h-[66px]
              bg-[#121925]
              px-[18px]
              py-[10px]
            "
          >
            <div
              className="
                font-['Hind_Siliguri']
                text-[17px]
                font-bold
                leading-[24px]
                text-white
              "
            >
              শিক্ষার্থীর নাম
            </div>

            <div
              className="
                font-['Hind_Siliguri']
                text-[12px]
                leading-[18px]
                text-white/55
              "
            >
              পেশা
            </div>
          </div>
        </div>


        {/* =======================================================
            CARD 02
        ======================================================= */}
        <div
          className="
            relative
            h-[570px]
            overflow-hidden
            rounded-[16px]
            border
            border-[#24354D]
            bg-[#07152D]
            shadow-[0_20px_45px_rgba(0,0,0,0.35)]
          "
        >

          {/* Background */}
          <div
            className="
              absolute
              inset-0
              bg-[radial-gradient(circle_at_70%_18%,rgba(49,108,140,0.48),transparent_34%),linear-gradient(145deg,#183E67_0%,#071A39_42%,#06122A_100%)]
            "
          />

          {/* Top horizontal line */}
          <div
            className="
              pointer-events-none
              absolute
              left-0
              top-[66px]
              z-10
              h-[2px]
              w-[68px]
              bg-[#718398]
              opacity-60
            "
          />

          {/* Diagonal line 01 */}
          <div
            className="
              pointer-events-none
              absolute
              left-[-30px]
              top-[155px]
              z-10
              h-[1px]
              w-[370px]
              rotate-[-29deg]
              origin-center
              bg-[#B79A42]
              opacity-80
            "
          />

          {/* Circle */}
          <div
            className="
              pointer-events-none
              absolute
              left-[58px]
              top-[175px]
              z-10
              h-[180px]
              w-[180px]
              rounded-full
              border
              border-[#B79A42]
              opacity-80
            "
          />

          {/* Diagonal line 02 */}
          <div
            className="
              pointer-events-none
              absolute
              left-[-30px]
              top-[375px]
              z-10
              h-[1px]
              w-[370px]
              rotate-[-29deg]
              origin-center
              bg-[#B79A42]
              opacity-70
            "
          />

          {/* Yellow glow dot */}
          <div
            className="
              pointer-events-none
              absolute
              right-[42px]
              top-[132px]
              z-20
              flex
              h-[28px]
              w-[28px]
              items-center
              justify-center
              rounded-full
              bg-[#F7C84F]/15
              shadow-[0_0_18px_rgba(247,200,79,0.16)]
            "
          >
            <div
              className="
                h-[8px]
                w-[8px]
                rounded-full
                bg-[#F7C84F]
                shadow-[0_0_10px_3px_rgba(247,200,79,0.35)]
              "
            />
          </div>

          {/* Center number */}
          <div
            className="
              absolute
              left-1/2
              top-[220px]
              z-30
              flex
              h-[90px]
              w-[120px]
              -translate-x-1/2
              items-center
              justify-center
              font-['Hind_Siliguri']
              text-[64px]
              font-bold
              leading-none
              tracking-[-5px]
              text-[#F7C84F]
            "
          >
            ০২
          </div>

          {/* Bottom right line */}
          <div
            className="
              pointer-events-none
              absolute
              bottom-[73px]
              right-0
              z-20
              h-[2px]
              w-[68px]
              bg-[#718398]
              opacity-60
            "
          />

          {/* Oxford */}
          <div
            className="
              absolute
              bottom-[54px]
              left-[18px]
              z-30
              font-['Inter']
              text-[10px]
              font-bold
              uppercase
              tracking-[1.8px]
              text-white/75
            "
          >
            OXFORD 3000
          </div>

          {/* Student info */}
          <div
            className="
              absolute
              bottom-0
              left-0
              right-0
              z-40
              h-[66px]
              bg-[#121925]
              px-[18px]
              py-[10px]
            "
          >
            <div
              className="
                font-['Hind_Siliguri']
                text-[17px]
                font-bold
                leading-[24px]
                text-white
              "
            >
              শিক্ষার্থীর নাম
            </div>

            <div
              className="
                font-['Hind_Siliguri']
                text-[12px]
                leading-[18px]
                text-white/55
              "
            >
              পেশা
            </div>
          </div>
        </div>


        {/* =======================================================
            CARD 03
        ======================================================= */}
        <div
          className="
            relative
            h-[570px]
            overflow-hidden
            rounded-[16px]
            border
            border-[#24354D]
            bg-[#07152D]
            shadow-[0_20px_45px_rgba(0,0,0,0.35)]
          "
        >

          {/* Background */}
          <div
            className="
              absolute
              inset-0
              bg-[radial-gradient(circle_at_70%_18%,rgba(49,108,140,0.48),transparent_34%),linear-gradient(145deg,#183E67_0%,#071A39_42%,#06122A_100%)]
            "
          />

          {/* Top horizontal line */}
          <div
            className="
              pointer-events-none
              absolute
              left-0
              top-[66px]
              z-10
              h-[2px]
              w-[68px]
              bg-[#718398]
              opacity-60
            "
          />

          {/* Diagonal line 01 */}
          <div
            className="
              pointer-events-none
              absolute
              left-[-30px]
              top-[155px]
              z-10
              h-[1px]
              w-[370px]
              rotate-[-29deg]
              origin-center
              bg-[#B79A42]
              opacity-80
            "
          />

          {/* Circle */}
          <div
            className="
              pointer-events-none
              absolute
              left-[58px]
              top-[175px]
              z-10
              h-[180px]
              w-[180px]
              rounded-full
              border
              border-[#B79A42]
              opacity-80
            "
          />

          {/* Diagonal line 02 */}
          <div
            className="
              pointer-events-none
              absolute
              left-[-30px]
              top-[375px]
              z-10
              h-[1px]
              w-[370px]
              rotate-[-29deg]
              origin-center
              bg-[#B79A42]
              opacity-70
            "
          />

          {/* Yellow glow dot */}
          <div
            className="
              pointer-events-none
              absolute
              right-[42px]
              top-[132px]
              z-20
              flex
              h-[28px]
              w-[28px]
              items-center
              justify-center
              rounded-full
              bg-[#F7C84F]/15
              shadow-[0_0_18px_rgba(247,200,79,0.16)]
            "
          >
            <div
              className="
                h-[8px]
                w-[8px]
                rounded-full
                bg-[#F7C84F]
                shadow-[0_0_10px_3px_rgba(247,200,79,0.35)]
              "
            />
          </div>

          {/* Center number */}
          <div
            className="
              absolute
              left-1/2
              top-[220px]
              z-30
              flex
              h-[90px]
              w-[120px]
              -translate-x-1/2
              items-center
              justify-center
              font-['Hind_Siliguri']
              text-[64px]
              font-bold
              leading-none
              tracking-[-5px]
              text-[#F7C84F]
            "
          >
            ০৩
          </div>

          {/* Bottom right line */}
          <div
            className="
              pointer-events-none
              absolute
              bottom-[73px]
              right-0
              z-20
              h-[2px]
              w-[68px]
              bg-[#718398]
              opacity-60
            "
          />

          {/* Oxford */}
          <div
            className="
              absolute
              bottom-[54px]
              left-[18px]
              z-30
              font-['Inter']
              text-[10px]
              font-bold
              uppercase
              tracking-[1.8px]
              text-white/75
            "
          >
            OXFORD 3000
          </div>

          {/* Student info */}
          <div
            className="
              absolute
              bottom-0
              left-0
              right-0
              z-40
              h-[66px]
              bg-[#121925]
              px-[18px]
              py-[10px]
            "
          >
            <div
              className="
                font-['Hind_Siliguri']
                text-[17px]
                font-bold
                leading-[24px]
                text-white
              "
            >
              শিক্ষার্থীর নাম
            </div>

            <div
              className="
                font-['Hind_Siliguri']
                text-[12px]
                leading-[18px]
                text-white/55
              "
            >
              পেশা
            </div>
          </div>
        </div>

      </div>
    </div>


{/* =========================================================
    WRITTEN FEEDBACK
========================================================= */}
<div className="mt-[52px]">

  {/* ================= HEADING ================= */}
  <div className="text-center">

    <div
      className="
        flex
        items-center
        justify-center
        gap-[8px]
        font-['Inter']
        text-[11px]
        font-bold
        uppercase
        leading-[16px]
        tracking-[2.5px]
        text-[#F7C84F]
      "
    >
      <span
        className="
          h-[2px]
          w-[16px]
          shrink-0
          rounded-full
          bg-[#F7C84F]
        "
      />

      <span>WRITTEN FEEDBACK</span>

      <span
        className="
          h-[2px]
          w-[16px]
          shrink-0
          rounded-full
          bg-[#F7C84F]
        "
      />
    </div>

    <h3
      className="
        mt-[6px]
        font-['Hind_Siliguri']
        text-[28px]
        font-bold
        leading-[38px]
        text-white
      "
    >
      লিখিত মতামত
    </h3>

  </div>


  {/* ================= FEEDBACK CARDS ================= */}
  <div
    className="
      mx-auto
      mt-[24px]
      grid
      w-full
      max-w-[1120px]
      grid-cols-1
      gap-[12px]
      sm:grid-cols-3
    "
  >

    {/* ================= FEEDBACK 01 ================= */}
    <div
      className="
        flex
        min-h-[96px]
        items-start
        rounded-[14px]
        border
        border-[#202A3A]
        bg-[#0B111D]
        px-[18px]
        py-[16px]
        text-left
      "
    >
      <div
        className="
          shrink-0
          font-['Georgia']
          text-[32px]
          font-bold
          leading-[28px]
          text-[#F7C84F]
        "
      >
        “
      </div>

      <p
        className="
          ml-[10px]
          pt-[1px]
          font-['Hind_Siliguri']
          text-[15px]
          font-normal
          leading-[24px]
          tracking-[-0.15px]
          text-[#D8DEE8]
        "
      >
        আগে শুধু word meaning পড়তাম, কিন্তু মনে থাকত না।
        এখন example, audio আর app দিয়ে revise করতে পারছি।
      </p>
    </div>


    {/* ================= FEEDBACK 02 ================= */}
    <div
      className="
        flex
        min-h-[96px]
        items-start
        rounded-[14px]
        border
        border-[#202A3A]
        bg-[#0B111D]
        px-[18px]
        py-[16px]
        text-left
      "
    >
      <div
        className="
          shrink-0
          font-['Georgia']
          text-[32px]
          font-bold
          leading-[28px]
          text-[#F7C84F]
        "
      >
        “
      </div>

      <p
        className="
          ml-[10px]
          max-w-[310px]
          pt-[1px]
          font-['Hind_Siliguri']
          text-[15px]
          font-normal
          leading-[24px]
          tracking-[-0.15px]
          text-[#D8DEE8]
        "
      >
        Oxford 3000 এক জায়গায় সাজানো থাকায়
        আলাদা করে meaning খুঁজতে হয় না। সময় বাঁচে।
      </p>
    </div>


    {/* ================= FEEDBACK 03 ================= */}
    <div
      className="
        flex
        min-h-[96px]
        items-start
        rounded-[14px]
        border
        border-[#202A3A]
        bg-[#0B111D]
        px-[18px]
        py-[16px]
        text-left
      "
    >
      <div
        className="
          shrink-0
          font-['Georgia']
          text-[32px]
          font-bold
          leading-[28px]
          text-[#F7C84F]
        "
      >
        “
      </div>

      <p
        className="
          ml-[10px]
          pt-[1px]
          font-['Hind_Siliguri']
          text-[15px]
          font-normal
          leading-[24px]
          tracking-[-0.15px]
          text-[#D8DEE8]
        "
      >
        বইয়ের সাথে app, audio আর video পাওয়ায়
        vocabulary শেখা অনেক সহজ হয়েছে।
      </p>
    </div>

  </div>
</div>
  </div>
</section>





      
 {/* =========================================================
    THE DECISION
========================================================= */}

<section
  className="
    relative
    overflow-hidden
    bg-[#FFFDF7]
    px-4
    py-[70px]
    sm:px-6
    sm:py-[76px]
    lg:px-8
    lg:py-[86.4px]
  "
>
  {/* Subtle Figma background glow */}
  <div
    className="
      pointer-events-none
      absolute
      inset-0
      bg-[radial-gradient(106.02%_147.25%_at_85%_12%,rgba(248,201,75,0.13)_0%,rgba(248,201,75,0)_21%)]
    "
  />

  <div
    className="
      relative
      mx-auto
      flex
      w-full
      max-w-[1440px]
      flex-col
      items-center
    "
  >

    {/* =========================================================
        HEADER
    ========================================================= */}

    <div
      className="
        flex
        w-full
        max-w-[752px]
        flex-col
        items-center
      "
    >

      {/* THE DECISION */}
      <div
        className="
          flex
          h-[17px]
          items-center
          justify-center
          gap-[8px]
          font-['Inter']
          text-[12px]
          font-bold
          uppercase
          leading-[16px]
          tracking-[1.56px]
          text-[#73500C]
        "
      >
        <span
          className="
            h-[2px]
            w-[16px]
            shrink-0
            rounded-full
            bg-[#73500C]
          "
        />

        <span>
          THE DECISION
        </span>

        <span
          className="
            h-[2px]
            w-[16px]
            shrink-0
            rounded-full
            bg-[#73500C]
          "
        />
      </div>


      {/* MAIN TITLE */}
<h2
  className="
    mt-[8px]
    w-full
    text-center
    whitespace-nowrap
    text-[40px]
    font-bold
    leading-[52.53px]
    tracking-[-0.79px]
    text-[#0A1730]
  "
>
  <span className="font-['Hind_Siliguri'] font-bold">
    সাধারণ{" "}
  </span>

  <span className="font-['Inter'] font-bold">
    Word List
  </span>

  <span className="font-['Hind_Siliguri'] font-bold">
    {" "}থেকে এটি কীভাবে আলাদা?
  </span>
</h2>

      {/* DESCRIPTION */}
 <p
  className="
    mt-[14px]
    w-full
    text-center
    whitespace-nowrap
    text-[17.6px]
    font-normal
    leading-[30px]
    tracking-[-0.44px]
    text-[#536174]
  "
>
  <span className="font-['Hind_Siliguri']">
    সঠিক{" "}
  </span>

  <span className="font-['Inter']">
    Learning System
  </span>

  <span className="font-['Hind_Siliguri']">
    {" "}কীভাবে আপনার শেখার জার্নি বদলে দিতে পারে, জেনে নিন।
  </span>
</p>

    </div>


    {/* =========================================================
        TABLE WRAPPER
    ========================================================= */}

    <div
      className="
        mt-[42px]
        w-full
        max-w-[1152px]
        overflow-x-auto
        pb-1
        lg:mt-[52px]
      "
    >

      {/* Fixed desktop table width.
          On mobile user can scroll horizontally. */}
      <div
        className="
          mx-auto
          min-w-[736px]
          w-[1150px]
          overflow-hidden
          rounded-[16px]
          border
          border-[#DCD3C0]
          bg-[#FFFDF8]
          shadow-[0px_12px_36px_rgba(4,9,20,0.08)]
        "
      >

        {/* =====================================================
            TABLE HEADER
        ===================================================== */}

        <div
          className="
            grid
            h-[65.59px]
            grid-cols-[345px_482.36px_322.66px]
          "
        >

          {/* Column 01 */}
          <div
            className="
              flex
              items-center
              bg-[#071229]
              px-[24px]
              font-['Hind_Siliguri']
              text-[14.4px]
              font-bold
              leading-[24px]
              tracking-[-0.182812px]
              text-white
            "
          >
            শেখার প্রয়োজন
          </div>


          {/* Column 02 */}
          <div
            className="
              flex
              items-center
              bg-[#F8C94B]
              px-[24px]
              font-['Inter']
              text-[14.4px]
              font-bold
              leading-[24px]
              tracking-[-0.182812px]
              text-[#040914]
            "
          >
            Oxford 3000 System
          </div>


          {/* Column 03 */}
          <div
            className="
              flex
              items-center
              bg-[#071229]
              px-[24px]
              font-['Hind_Siliguri']
              text-[14.4px]
              font-bold
              leading-[24px]
              tracking-[-0.182812px]
              text-white
            "
          >
            সাধারণ বই
          </div>

        </div>


        {/* =====================================================
            ROW 01
        ===================================================== */}

        <div
          className="
            grid
            h-[68.09px]
            grid-cols-[345px_482.36px_322.66px]
          "
        >

          {/* শেখার প্রয়োজন */}
          <div
            className="
              flex
              items-center
              border-b
              border-[#DCD3C0]
              px-[24px]
              font-['Hind_Siliguri']
              text-[16px]
              font-bold
              leading-[27px]
              tracking-[-0.3125px]
              text-[#071229]
            "
          >
            শব্দ শেখার ক্রম
          </div>


          {/* Oxford */}
          <div
            className="
              flex
              items-center
              gap-[8.8px]
              border-b
              border-[#DCD3C0]
              bg-[#FFF8DC]
              px-[24px]
            "
          >

            {/* Check */}
            <span
              className="
                flex
                h-[20.8px]
                w-[20.8px]
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[#071229]
                font-['Inter']
                text-[11.52px]
                font-semibold
                leading-[19px]
                text-white
              "
            >
              ✓
            </span>

            <span
              className="
                font-['Inter']
                text-[16px]
                font-semibold
                leading-[27px]
                tracking-[-0.3125px]
                text-[#071229]
              "
            >
              Oxford 3000 sequence
            </span>

          </div>


          {/* সাধারণ বই */}
          <div
            className="
              flex
              items-center
              border-b
              border-[#DCD3C0]
              px-[24px]
              font-['Hind_Siliguri']
              text-[16px]
              font-normal
              leading-[27px]
              tracking-[-0.3125px]
              text-[#536174]
            "
          >
            বিচ্ছিন্ন word list
          </div>

        </div>


        {/* =====================================================
            ROW 02
        ===================================================== */}

        <div
          className="
            grid
            h-[68.59px]
            grid-cols-[345px_482.36px_322.66px]
          "
        >

          {/* শেখার প্রয়োজন */}
          <div
            className="
              flex
              items-center
              border-b
              border-[#DCD3C0]
              px-[24px]
              font-['Hind_Siliguri']
              text-[16px]
              font-bold
              leading-[27px]
              tracking-[-0.3125px]
              text-[#071229]
            "
          >
            বোঝা ও উচ্চারণ
          </div>


          {/* Oxford */}
          <div
            className="
              flex
              items-center
              gap-[8.8px]
              border-b
              border-[#DCD3C0]
              bg-[#FFF8DC]
              px-[24px]
            "
          >

            <span
              className="
                flex
                h-[20.8px]
                w-[20.8px]
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[#071229]
                font-['Inter']
                text-[11.52px]
                font-semibold
                leading-[19px]
                text-white
              "
            >
              ✓
            </span>

            <span
              className="
                font-['Hind_Siliguri']
                text-[16px]
                font-semibold
                leading-[27px]
                tracking-[-0.3125px]
                text-[#071229]
              "
            >
              বাংলা অর্থ + উচ্চারণ + Example
            </span>

          </div>


          {/* সাধারণ বই */}
          <div
            className="
              flex
              items-center
              border-b
              border-[#DCD3C0]
              px-[24px]
              font-['Hind_Siliguri']
              text-[16px]
              font-normal
              leading-[27px]
              tracking-[-0.3125px]
              text-[#536174]
            "
          >
            সাধারণত meaning-কেন্দ্রিক
          </div>

        </div>


        {/* =====================================================
            ROW 03
        ===================================================== */}

        <div
          className="
            grid
            h-[68.59px]
            grid-cols-[345px_482.36px_322.66px]
          "
        >

          {/* শেখার প্রয়োজন */}
          <div
            className="
              flex
              items-center
              border-b
              border-[#DCD3C0]
              px-[24px]
              font-['Inter']
              text-[16px]
              font-bold
              leading-[27px]
              tracking-[-0.3125px]
              text-[#071229]
            "
          >
            Practice support
          </div>


          {/* Oxford */}
          <div
            className="
              flex
              items-center
              gap-[8.8px]
              border-b
              border-[#DCD3C0]
              bg-[#FFF8DC]
              px-[24px]
            "
          >

            <span
              className="
                flex
                h-[20.8px]
                w-[20.8px]
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[#071229]
                font-['Inter']
                text-[11.52px]
                font-semibold
                leading-[19px]
                text-white
              "
            >
              ✓
            </span>

            <span
              className="
                font-['Inter']
                text-[16px]
                font-semibold
                leading-[27px]
                tracking-[-0.3125px]
                text-[#071229]
              "
            >
              App + Audio + Video + Check Box
            </span>

          </div>


          {/* সাধারণ বই */}
          <div
            className="
              flex
              items-center
              border-b
              border-[#DCD3C0]
              px-[24px]
              font-['Hind_Siliguri']
              text-[16px]
              font-normal
              leading-[27px]
              tracking-[-0.3125px]
              text-[#536174]
            "
          >
            বইয়ের ভেতরেই সীমিত
          </div>

        </div>


        {/* =====================================================
            ROW 04
        ===================================================== */}

        <div
          className="
            grid
            h-[68.09px]
            grid-cols-[345px_482.36px_322.66px]
          "
        >

          {/* শেখার প্রয়োজন */}
          <div
            className="
              flex
              items-center
              px-[24px]
              font-['Hind_Siliguri']
              text-[16px]
              font-bold
              leading-[27px]
              tracking-[-0.3125px]
              text-[#071229]
            "
          >
            এগিয়ে যাওয়ার cue
          </div>


          {/* Oxford */}
          <div
            className="
              flex
              items-center
              gap-[8.8px]
              bg-[#FFF8DC]
              px-[24px]
            "
          >

            <span
              className="
                flex
                h-[20.8px]
                w-[20.8px]
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[#071229]
                font-['Inter']
                text-[11.52px]
                font-semibold
                leading-[19px]
                text-white
              "
            >
              ✓
            </span>

            <span
              className="
                font-['Inter']
                text-[16px]
                font-semibold
                leading-[27px]
                tracking-[-0.3125px]
                text-[#071229]
              "
            >
              Practice ও Progress support
            </span>

          </div>


          {/* সাধারণ বই */}
          <div
            className="
              flex
              items-center
              px-[24px]
              font-['Hind_Siliguri']
              text-[16px]
              font-normal
              leading-[27px]
              tracking-[-0.3125px]
              text-[#536174]
            "
          >
            নিজে tracking করতে হয়
          </div>

        </div>

      </div>

    </div>

  </div>
</section>




{/* Section - 10 */}

{/* =========================================================
    ANDROID COMPANION
========================================================= */}
<section
  id="android-app"
  className="
    relative
    overflow-hidden
    bg-[#FDEEC2]
    px-4
    py-[70px]
    text-[#0A1730]
    sm:px-6
    sm:py-[76px]
    lg:px-8
    lg:py-[86.4px]
  "
>
  <div
    className="
      mx-auto
      flex
      w-full
      max-w-[1152px]
      flex-col
      lg:h-[465.81px]
      lg:flex-row
      lg:items-start
      lg:justify-between
    "
  >

    {/* =======================================================
        LEFT CONTENT
    ======================================================= */}
    <div
      className="
        flex
        w-full
        max-w-[447.55px]
        flex-col
        items-start
        lg:mt-[1px]
      "
    >

      {/* ANDROID COMPANION */}
      <div
        className="
          flex
          h-[36.19px]
          w-full
          items-start
        "
      >
        <div
          className="
            flex
            h-[17px]
            items-center
            gap-[8px]
            font-['Inter']
            text-[12px]
            font-bold
            uppercase
            leading-[16px]
            tracking-[1.56px]
            text-[#73500C]
          "
        >
          <span
            className="
              h-[2px]
              w-[16px]
              shrink-0
              rounded-full
              bg-[#73500C]
            "
          />

          <span>
            ANDROID COMPANION
          </span>
        </div>
      </div>


      {/* MAIN HEADING */}
      <h2
        className="
          m-0
          w-full
          max-w-[448px]
          font-['Hind_Siliguri']
          text-[40px]
          font-bold
          leading-[53px]
          tracking-[-0.7929px]
          text-[#0A1730]
        "
      >
        ফ্রি Android App ডাউনলোড করুন
      </h2>


      {/* DESCRIPTION */}
      <p
        className="
          m-0
          mt-[14.39px]
          w-full
          max-w-[447.55px]
          font-['Inter']
          text-[16px]
          font-normal
          leading-[27px]
          tracking-[-0.3125px]
          text-[#0A1730]
        "
      >
        Offline—যেকোনো সময় Practice করুন।
      </p>


      {/* FREE ACCESS NOTE */}
      <div
        className="
          mt-[17.59px]
          mb-[21.59px]
          box-border
          flex
          min-h-[24px]
          w-full
          max-w-[447.55px]
          items-center
          border-l-2
          border-[#1F9FB5]
          pl-[13.6px]
        "
      >
        <p
          className="
            m-0
            font-['Hind_Siliguri']
            text-[14.08px]
            font-semibold
            leading-[24px]
            tracking-[-0.15675px]
            text-[#0A1730]
          "
        >
          বইয়ের সঙ্গে ডেডিকেটেড Android App-এর অ্যাক্সেস সম্পূর্ণ ফ্রি।
        </p>
      </div>


      {/* =======================================================
          DOWNLOAD BUTTON
          APP LINK
      ======================================================= */}
      <div
        className="
          flex
          h-[46.94px]
          w-full
          items-start
        "
      >
        <a
          href="https://app.englishcommando.bd/"
          target="_blank"
          rel="noopener noreferrer"
          className="
            box-border
            flex
            h-[46.94px]
            min-h-[46.4px]
            w-[167.5px]
            items-center
            justify-center
            gap-[8.8px]
            whitespace-nowrap
            rounded-[12px]
            bg-gradient-to-br
            from-[#FFE38E]
            via-[#F8C94B]
            to-[#F2B81E]
            px-[18.4px]
            py-[12.48px]
            font-['Hind_Siliguri']
            text-[15.2px]
            font-bold
            leading-[19px]
            tracking-[-0.325375px]
            text-[#071229]
            shadow-[0px_11px_26px_rgba(248,201,75,0.22),inset_0px_1px_0px_rgba(255,255,255,0.5)]
            transition-all
            duration-200
            hover:-translate-y-[2px]
            hover:shadow-[0px_14px_30px_rgba(248,201,75,0.28),inset_0px_1px_0px_rgba(255,255,255,0.5)]
          "
        >
          <span className="whitespace-nowrap">
            ডাউনলোড করুন
          </span>

          {/* Download Icon */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0"
          >
            <path
              d="M12 4V15"
              stroke="#071229"
              strokeWidth="1.6"
              strokeLinecap="round"
            />

            <path
              d="M7.5 11.5L12 16L16.5 11.5"
              stroke="#071229"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <path
              d="M5 20H19"
              stroke="#071229"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </a>
      </div>

    </div>


    {/* =======================================================
        RIGHT CONTENT
    ======================================================= */}
    <div
      className="
        relative
        mt-[45px]
        flex
        w-full
        max-w-[544px]
        flex-col
        items-center
        lg:mt-0
      "
    >

      {/* =====================================================
          ANDROID APP IMAGE
      ===================================================== */}
      <div
        className="
          flex
          h-[334px]
          w-full
          items-center
          justify-center
        "
      >
        <img
          src={androidApp}
          alt="Dedicated Android App — Word Practice, Audio, Video and Progress"
          className="
            block
            h-[334px]
            w-[344px]
            max-w-full
            select-none
            object-contain
            drop-shadow-[0px_18px_48px_rgba(0,0,0,0.25)]
          "
        />
      </div>


      {/* =====================================================
          SUPPORT PILLS
      ===================================================== */}
      <div
        className="
          mt-[24px]
          flex
          w-full
          max-w-[544px]
          flex-wrap
          items-center
          justify-center
          gap-[8.8px]
          lg:flex-nowrap
          lg:justify-center
        "
      >

        {/* Word Practice */}
        <span
          className="
            box-border
            flex
            h-[46.4px]
            min-h-[46.4px]
            w-[129.39px]
            shrink-0
            items-center
            justify-center
            rounded-full
            border
            border-[rgba(31,159,181,0.25)]
            bg-[#FFFDF7]
            px-[11.4px]
            py-[15.7px]
            font-['Inter']
            text-[12.16px]
            font-bold
            leading-[15px]
            tracking-[-0.0114px]
            text-[#071229]
            shadow-[0px_7px_17px_rgba(4,9,20,0.06)]
          "
        >
          Word Practice
        </span>


        {/* Audio */}
        <span
          className="
            box-border
            flex
            h-[46.4px]
            min-h-[46.4px]
            w-[129.41px]
            shrink-0
            items-center
            justify-center
            rounded-full
            border
            border-[rgba(31,159,181,0.25)]
            bg-[#FFFDF7]
            px-[11.4px]
            py-[15.7px]
            font-['Inter']
            text-[12.16px]
            font-bold
            leading-[15px]
            tracking-[-0.0114px]
            text-[#071229]
            shadow-[0px_7px_17px_rgba(4,9,20,0.06)]
          "
        >
          Audio
        </span>


        {/* Video */}
        <span
          className="
            box-border
            flex
            h-[46.4px]
            min-h-[46.4px]
            w-[129.41px]
            shrink-0
            items-center
            justify-center
            rounded-full
            border
            border-[rgba(31,159,181,0.25)]
            bg-[#FFFDF7]
            px-[11.4px]
            py-[15.7px]
            font-['Inter']
            text-[12.16px]
            font-bold
            leading-[15px]
            tracking-[-0.0114px]
            text-[#071229]
            shadow-[0px_7px_17px_rgba(4,9,20,0.06)]
          "
        >
          Video
        </span>


        {/* Progress */}
        <span
          className="
            box-border
            flex
            h-[46.4px]
            min-h-[46.4px]
            w-[129.41px]
            shrink-0
            items-center
            justify-center
            rounded-full
            border
            border-[rgba(31,159,181,0.25)]
            bg-[#FFFDF7]
            px-[11.4px]
            py-[15.7px]
            font-['Inter']
            text-[12.16px]
            font-bold
            leading-[15px]
            tracking-[-0.0114px]
            text-[#071229]
            shadow-[0px_7px_17px_rgba(4,9,20,0.06)]
          "
        >
          Progress
        </span>

      </div>

    </div>

  </div>
</section>


      {/* Section - 11 */}

{/* =========================================================
    QUESTIONS, ANSWERED / FAQ
========================================================= */}

<section id="faq" className="
    relative
    overflow-hidden
    bg-[#FFFDF7]
    px-4
    py-[86.4px]
    text-[#071229]
  "
>
  <div
    className="
      mx-auto
      w-full
      max-w-[1152px]
    "
  >
    <div
      className="
        flex
        w-full
        flex-col
        lg:flex-row
        lg:items-start
        lg:gap-[72px]
      "
    >

      {/* =====================================================
          LEFT SIDE
      ===================================================== */}

      <div
        className="
          flex
          w-full
          flex-col
          items-start
          lg:w-[324px]
          lg:min-w-[324px]
        "
      >

        {/* QUESTIONS, ANSWERED */}

        <div
          className="
            flex
            h-[36.19px]
            w-full
            items-start
          "
        >
          <div
            className="
              mt-[9px]
              flex
              h-[17px]
              items-center
              gap-[8px]
              font-['Inter']
              text-[12px]
              font-bold
              uppercase
              leading-[16px]
              tracking-[1.56px]
              text-[#73500C]
            "
          >
            <span
              className="
                h-[2px]
                w-[16px]
                shrink-0
                rounded-full
                bg-[#73500C]
              "
            />

            <span>
              QUESTIONS, ANSWERED
            </span>
          </div>
        </div>


        {/* TITLE */}

        <h2
  className="
    m-0
    w-full
    whitespace-nowrap
    font-['Hind_Siliguri']
    text-[34px]
    font-bold
    leading-[48px]
    tracking-[0.367031px]
    text-[#071229]
  "
>
  সাধারণ প্রশ্ন ও উত্তর
</h2>


        {/* DESCRIPTION + PHONE */}

        <div
          className="
            flex
            w-full
            flex-col
            items-start
            pt-[16px]
          "
        >
          <p
            className="
              m-0
              w-full
              font-['Hind_Siliguri']
              text-[16px]
              font-normal
              leading-[27px]
              tracking-[-0.3125px]
              text-[#536174]
            "
          >
            আরও কিছু জানতে চান? সরাসরি কল করুন
          </p>


          <a
            href="tel:01405458800"
            className="
              mt-[10px]
              inline-flex
              min-h-[44px]
              items-center
              font-['Inter']
              text-[16px]
              font-bold
              leading-[27px]
              tracking-[-0.3125px]
              text-[#72500E]
              underline
              decoration-[1px]
              underline-offset-[3px]
              transition-colors
              hover:text-[#F2B81E]
            "
          >
            0140-545-8800-2
          </a>
        </div>

      </div>


      {/* =====================================================
          RIGHT SIDE / FAQ
      ===================================================== */}

      <div
        className="
          mt-[48px]
          w-full
          lg:mt-0
          lg:w-[756px]
          lg:border-t
          lg:border-[#DCD3C0]
        "
      >

        {/* ===================================================
            FAQ 01
        =================================================== */}

        <div
          className="
            w-full
            border-b
            border-[#DCD3C0]
          "
        >

          {/* QUESTION */}

          <button
            type="button"
            onClick={() =>
              setExpandedIndex(
                expandedIndex === 0 ? -1 : 0
              )
            }
            className="
              flex
              h-[68px]
              min-h-[68px]
              w-full
              items-center
              justify-between
              gap-[24px]
              bg-transparent
              p-0
              text-left
            "
          >
            <span
              className="
                flex-1
                font-['Hind_Siliguri']
                text-[16px]
                font-bold
                leading-[27px]
                tracking-[-0.3125px]
                text-[#071229]
              "
            >
              এই প্যাকেজে ঠিক কী কী থাকছে?
            </span>

            <span
              className="
                relative
                flex
                h-[20.8px]
                w-[20.8px]
                shrink-0
                items-center
                justify-center
              "
            >
              <span
                className="
                  absolute
                  left-[20%]
                  right-[20%]
                  top-1/2
                  h-[1.04px]
                  -translate-y-1/2
                  bg-[#72500E]
                "
              />

              {expandedIndex !== 0 && (
                <span
                  className="
                    absolute
                    bottom-[20%]
                    left-1/2
                    top-[20%]
                    w-[1.04px]
                    -translate-x-1/2
                    bg-[#72500E]
                  "
                />
              )}
            </span>
          </button>


          {/* ANSWER */}

          {expandedIndex === 0 && (
            <div
              className="
                w-full
                pb-[21.5938px]
                pr-[44.8px]
              "
            >
              <p
                className="
                  m-0
                  font-['Inter']
                  text-[16px]
                  font-normal
                  leading-[27px]
                  tracking-[-0.3125px]
                  text-[#536174]
                "
              >
                Oxford 3000 Vocabulary Book-এর সঙ্গে Dedicated
                Android App, Audio, Video Lesson, Practice এবং
                Progress Support থাকছে।
              </p>
            </div>
          )}

        </div>


        {/* ===================================================
            FAQ 02
        =================================================== */}

        <div
          className="
            w-full
            border-b
            border-[#DCD3C0]
          "
        >
          <button
            type="button"
            onClick={() =>
              setExpandedIndex(
                expandedIndex === 1 ? -1 : 1
              )
            }
            className="
              flex
              h-[68px]
              min-h-[68px]
              w-full
              items-center
              justify-between
              gap-[24px]
              bg-transparent
              p-0
              text-left
            "
          >
            <span
              className="
                flex-1
                font-['Hind_Siliguri']
                text-[16px]
                font-bold
                leading-[27px]
                tracking-[-0.3125px]
                text-[#071229]
              "
            >
              মোট মূল্য কত? ডেলিভারি চার্জ আছে?
            </span>

            <span
              className="
                relative
                flex
                h-[20.8px]
                w-[20.8px]
                shrink-0
                items-center
                justify-center
              "
            >
              <span
                className="
                  absolute
                  left-[20%]
                  right-[20%]
                  top-1/2
                  h-[1.04px]
                  -translate-y-1/2
                  bg-[#72500E]
                "
              />

              {expandedIndex !== 1 && (
                <span
                  className="
                    absolute
                    bottom-[20%]
                    left-1/2
                    top-[20%]
                    w-[1.04px]
                    -translate-x-1/2
                    bg-[#72500E]
                  "
                />
              )}
            </span>
          </button>

          {expandedIndex === 1 && (
            <div
              className="
                w-full
                pb-[21.5938px]
                pr-[44.8px]
              "
            >
              <p
                className="
                  m-0
                  font-['Hind_Siliguri']
                  text-[16px]
                  font-normal
                  leading-[27px]
                  tracking-[-0.3125px]
                  text-[#536174]
                "
              >
                মোট অফার মূল্য ৳৫৪৮। ডেলিভারি চার্জ মাত্র ৳৪৯।
              </p>
            </div>
          )}
        </div>


        {/* ===================================================
            FAQ 03
        =================================================== */}

        <div
          className="
            w-full
            border-b
            border-[#DCD3C0]
          "
        >
          <button
            type="button"
            onClick={() =>
              setExpandedIndex(
                expandedIndex === 2 ? -1 : 2
              )
            }
            className="
              flex
              h-[68px]
              min-h-[68px]
              w-full
              items-center
              justify-between
              gap-[24px]
              bg-transparent
              p-0
              text-left
            "
          >
            <span
              className="
                flex-1
                font-['Inter']
                text-[16px]
                font-bold
                leading-[27px]
                tracking-[-0.3125px]
                text-[#071229]
              "
            >
              App কি Android-এর জন্য?
            </span>

            <span
              className="
                relative
                flex
                h-[20.8px]
                w-[20.8px]
                shrink-0
                items-center
                justify-center
              "
            >
              <span
                className="
                  absolute
                  left-[20%]
                  right-[20%]
                  top-1/2
                  h-[1.04px]
                  -translate-y-1/2
                  bg-[#72500E]
                "
              />

              {expandedIndex !== 2 && (
                <span
                  className="
                    absolute
                    bottom-[20%]
                    left-1/2
                    top-[20%]
                    w-[1.04px]
                    -translate-x-1/2
                    bg-[#72500E]
                  "
                />
              )}
            </span>
          </button>

          {expandedIndex === 2 && (
            <div
              className="
                w-full
                pb-[21.5938px]
                pr-[44.8px]
              "
            >
              <p
                className="
                  m-0
                  font-['Hind_Siliguri']
                  text-[16px]
                  font-normal
                  leading-[27px]
                  tracking-[-0.3125px]
                  text-[#536174]
                "
              >
                হ্যাঁ, বর্তমানে Appটি শুধু Android ফোনের জন্য
                উপলভ্য। তবে খুব শিগগিরই iOS-এর জন্যও চালু করা হবে।
              </p>
            </div>
          )}
        </div>


        {/* ===================================================
            FAQ 04
        =================================================== */}

        <div
          className="
            w-full
            border-b
            border-[#DCD3C0]
          "
        >
          <button
            type="button"
            onClick={() =>
              setExpandedIndex(
                expandedIndex === 3 ? -1 : 3
              )
            }
            className="
              flex
              h-[68px]
              min-h-[68px]
              w-full
              items-center
              justify-between
              gap-[24px]
              bg-transparent
              p-0
              text-left
            "
          >
            <span
              className="
                flex-1
                font-['Hind_Siliguri']
                text-[16px]
                font-bold
                leading-[27px]
                tracking-[-0.3125px]
                text-[#071229]
              "
            >
              শুধু পরীক্ষার জন্যই কি এই বই?
            </span>

            <span
              className="
                relative
                flex
                h-[20.8px]
                w-[20.8px]
                shrink-0
                items-center
                justify-center
              "
            >
              <span
                className="
                  absolute
                  left-[20%]
                  right-[20%]
                  top-1/2
                  h-[1.04px]
                  -translate-y-1/2
                  bg-[#72500E]
                "
              />

              {expandedIndex !== 3 && (
                <span
                  className="
                    absolute
                    bottom-[20%]
                    left-1/2
                    top-[20%]
                    w-[1.04px]
                    -translate-x-1/2
                    bg-[#72500E]
                  "
                />
              )}
            </span>
          </button>

          {expandedIndex === 3 && (
            <div
              className="
                w-full
                pb-[21.5938px]
                pr-[44.8px]
              "
            >
              <p
                className="
                  m-0
                  font-['Hind_Siliguri']
                  text-[16px]
                  font-normal
                  leading-[27px]
                  tracking-[-0.3125px]
                  text-[#536174]
                "
              >
                না। পরীক্ষার প্রস্তুতির পাশাপাশি Spoken English,
                IELTS এবং দৈনন্দিন ব্যবহারের জন্য শব্দের অর্থ,
                উচ্চারণ ও Example বুঝতে এটি সাজানো হয়েছে।
              </p>
            </div>
          )}
        </div>


        {/* ===================================================
            FAQ 05
        =================================================== */}

        <div
          className="
            w-full
            border-b
            border-[#DCD3C0]
          "
        >
          <button
            type="button"
            onClick={() =>
              setExpandedIndex(
                expandedIndex === 4 ? -1 : 4
              )
            }
            className="
              flex
              h-[68px]
              min-h-[68px]
              w-full
              items-center
              justify-between
              gap-[24px]
              bg-transparent
              p-0
              text-left
            "
          >
            <span
              className="
                flex-1
                font-['Hind_Siliguri']
                text-[16px]
                font-bold
                leading-[27px]
                tracking-[-0.3125px]
                text-[#071229]
              "
            >
              আমি একদম beginner হলে শুরু করতে পারব?
            </span>

            <span
              className="
                relative
                flex
                h-[20.8px]
                w-[20.8px]
                shrink-0
                items-center
                justify-center
              "
            >
              <span
                className="
                  absolute
                  left-[20%]
                  right-[20%]
                  top-1/2
                  h-[1.04px]
                  -translate-y-1/2
                  bg-[#72500E]
                "
              />

              {expandedIndex !== 4 && (
                <span
                  className="
                    absolute
                    bottom-[20%]
                    left-1/2
                    top-[20%]
                    w-[1.04px]
                    -translate-x-1/2
                    bg-[#72500E]
                  "
                />
              )}
            </span>
          </button>

          {expandedIndex === 4 && (
            <div
              className="
                w-full
                pb-[21.5938px]
                pr-[44.8px]
              "
            >
              <p
                className="
                  m-0
                  font-['Inter']
                  text-[16px]
                  font-normal
                  leading-[27px]
                  tracking-[-0.3125px]
                  text-[#536174]
                "
              >
                Oxford sequence, বাংলা অর্থ ও উচ্চারণ এবং ধাপে
                ধাপে learning loop থাকায় beginner-ও শুরু করতে পারবেন।
              </p>
            </div>
          )}
        </div>


        {/* ===================================================
            FAQ 06
        =================================================== */}

        <div
          className="
            w-full
            border-b
            border-[#DCD3C0]
          "
        >
          <button
            type="button"
            onClick={() =>
              setExpandedIndex(
                expandedIndex === 5 ? -1 : 5
              )
            }
            className="
              flex
              h-[68px]
              min-h-[68px]
              w-full
              items-center
              justify-between
              gap-[24px]
              bg-transparent
              p-0
              text-left
            "
          >
            <span
              className="
                flex-1
                font-['Hind_Siliguri']
                text-[16px]
                font-bold
                leading-[27px]
                tracking-[-0.3125px]
                text-[#071229]
              "
            >
              অর্ডার করতে কী করতে হবে?
            </span>

            <span
              className="
                relative
                flex
                h-[20.8px]
                w-[20.8px]
                shrink-0
                items-center
                justify-center
              "
            >
              <span
                className="
                  absolute
                  left-[20%]
                  right-[20%]
                  top-1/2
                  h-[1.04px]
                  -translate-y-1/2
                  bg-[#72500E]
                "
              />

              {expandedIndex !== 5 && (
                <span
                  className="
                    absolute
                    bottom-[20%]
                    left-1/2
                    top-[20%]
                    w-[1.04px]
                    -translate-x-1/2
                    bg-[#72500E]
                  "
                />
              )}
            </span>
          </button>

          {expandedIndex === 5 && (
            <div
              className="
                w-full
                pb-[21.5938px]
                pr-[44.8px]
              "
            >
              <p
                className="
                  m-0
                  font-['Hind_Siliguri']
                  text-[16px]
                  font-normal
                  leading-[27px]
                  tracking-[-0.3125px]
                  text-[#536174]
                "
              >
                শুধু আপনার নাম, মোবাইল নম্বর ও ঠিকানা দিন। বই
                পাঠানোর আগে আমাদের টিম ফোন করে অর্ডারটি নিশ্চিত করবে।
              </p>
            </div>
          )}
        </div>


        {/* ===================================================
            FAQ 07
        =================================================== */}

        <div
          className="
            w-full
            border-b
            border-[#DCD3C0]
          "
        >
          <button
            type="button"
            onClick={() =>
              setExpandedIndex(
                expandedIndex === 6 ? -1 : 6
              )
            }
            className="
              flex
              h-[68px]
              min-h-[68px]
              w-full
              items-center
              justify-between
              gap-[24px]
              bg-transparent
              p-0
              text-left
            "
          >
            <span
              className="
                flex-1
                font-['Hind_Siliguri']
                text-[16px]
                font-bold
                leading-[27px]
                tracking-[-0.3125px]
                text-[#071229]
              "
            >
              অর্ডারের আগে কথা বলতে চাইলে?
            </span>

            <span
              className="
                relative
                flex
                h-[20.8px]
                w-[20.8px]
                shrink-0
                items-center
                justify-center
              "
            >
              <span
                className="
                  absolute
                  left-[20%]
                  right-[20%]
                  top-1/2
                  h-[1.04px]
                  -translate-y-1/2
                  bg-[#72500E]
                "
              />

              {expandedIndex !== 6 && (
                <span
                  className="
                    absolute
                    bottom-[20%]
                    left-1/2
                    top-[20%]
                    w-[1.04px]
                    -translate-x-1/2
                    bg-[#72500E]
                  "
                />
              )}
            </span>
          </button>

          {expandedIndex === 6 && (
            <div
              className="
                w-full
                pb-[21.5938px]
                pr-[44.8px]
              "
            >
              <p
                className="
                  m-0
                  font-['Inter']
                  text-[16px]
                  font-normal
                  leading-[27px]
                  tracking-[-0.3125px]
                  text-[#536174]
                "
              >
                0140-545-8800-2 নম্বরে কল করে support-এর সঙ্গে
                কথা বলতে পারেন।
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  </div>
</section>



      <section className="relative overflow-hidden bg-[#fff0c9] px-6 py-14 sm:px-8 lg:px-0 lg:py-[56px]">
        <div className="mx-auto grid w-full max-w-[1152px] grid-cols-1 items-center gap-6 rounded-[24px] border border-[rgba(248,201,75,0.34)] bg-[#071229] p-7 shadow-[0_28px_70px_0_rgba(4,9,20,0.18)] sm:grid-cols-[68px_minmax(0,1fr)] lg:h-[160.375px] lg:grid-cols-[68px_760.41px_200px] lg:gap-8 lg:p-[28.8px]">
          <div className="grid h-[68px] w-[68px] place-items-center rounded-full border border-[#f8c94b]">
            <svg viewBox="0 0 32 32" className="h-7 w-7 text-[#f8c94b]" fill="none" aria-hidden="true">
              <path d="M16 3.5 26 7v7.3c0 6.2-4.1 11.5-10 14.2C10.1 25.8 6 20.5 6 14.3V7l10-3.5Z" stroke="currentColor" strokeWidth="1.5" />
              <path d="m11.5 15.8 3 3 6-6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </svg>
          </div>
          <div className="min-w-0">
            <div className="font-['Inter'] text-[12px] font-bold leading-[16.2px] tracking-[1.56px] text-[#f8c94b]">YOUR CONFIDENCE, PROTECTED</div>
            <h2 className="mt-1 font-['Hind_Siliguri'] text-[clamp(1.7rem,3vw,2.15rem)] font-bold leading-tight text-white">১০০% মানি-ব্যাক গ্যারান্টি</h2>
            <p className="mt-1 font-['Hind_Siliguri'] text-sm leading-6 text-white/65">বইটি হাতে নিয়ে নিশ্চিন্তে দেখুন। কোনো কারণে সন্তুষ্ট না হলে আমাদের জানালেই ১০০% টাকা ফেরত।</p>
          </div>
          <a href="tel:01405458800" className="flex min-h-[80px] items-center justify-center rounded-[14px] bg-[#f8c94b] px-5 py-3 text-center font-['Hind_Siliguri'] text-sm font-bold leading-5 text-[#071229] transition hover:bg-[#ffd86d] lg:min-h-0">
            <span><span className="block text-xs font-normal">কোনো প্রশ্ন আছে?</span><span className="block text-[1rem] font-bold">0140-545-8800-2</span><span className="block text-xs font-normal">কল করে কথা বলুন</span></span>
          </a>
        </div>
      </section>

      {/* Section - 11 */}

{/* =========================================================
    FINAL OFFER / ORDER SECTION
========================================================= */}
<section id="order"
  className="
    relative
    overflow-hidden
    bg-[#071229]
    px-4
    py-12
    sm:px-6
    sm:py-16
    lg:min-h-[1046px]
    lg:px-0
    lg:py-0
  "
>
  {/* =====================================================
      WARM AMBIENT GLOW
  ===================================================== */}
  <div
    className="
      pointer-events-none
      absolute
      -right-[70px]
      -top-[230px]
      h-[480px]
      w-[480px]
      rounded-full
      bg-[rgba(248,201,75,0.10)]
      blur-[12px]
    "
  />

  {/* =====================================================
      CYAN AMBIENT GLOW
  ===================================================== */}
  <div
    className="
      pointer-events-none
      absolute
      -left-[160px]
      top-[625px]
      h-[560px]
      w-[560px]
      rounded-full
      bg-[rgba(116,221,234,0.11)]
      blur-[12px]
    "
  />

  {/* =====================================================
      MAIN 1152px CONTAINER
  ===================================================== */}
  <div
    className="
      relative
      mx-auto
      w-full
      max-w-[1152px]
      rounded-[32px]
      shadow-[0px_28px_70px_rgba(4,9,20,0.18)]
      lg:mt-[109px]
      lg:min-h-[828px]
    "
    style={{
      background: `
        radial-gradient(
          105.33% 153.99% at 10% 20%,
          rgba(248,201,75,0.11) 0%,
          rgba(248,201,75,0) 35%
        ),
        linear-gradient(
          135deg,
          #071229 0%,
          #040914 100%
        )
      `,
    }}
  >

    {/* =====================================================
        LEFT SIDE CONTENT
    ===================================================== */}
    <div
      className="
        relative
        z-10
        px-6
        py-12
        sm:px-10
        lg:absolute
        lg:left-[64px]
        lg:top-[155.64px]
        lg:w-[437.91px]
        lg:px-0
        lg:py-0
      "
    >

      {/* =================================================
          EYEBROW
      ================================================= */}
      <div
        className="
          font-['Inter']
          text-[15px]
          font-medium
          leading-[19px]
          text-[#F8C94B]
        "
      >
        START YOUR MASTERY LOOP
      </div>


      {/* =================================================
          MAIN HEADING
      ================================================= */}
      <h2
        className="
          mt-[19px]
          whitespace-nowrap
          font-['Hind_Siliguri']
          text-[30px]
          font-bold
          leading-[1.55]
          tracking-[-0.02em]
          text-white
          sm:text-[36px]
          lg:text-[36px]
          lg:leading-[62px]
        "
      >
        আগে বই বুঝে নিন,
        <br />
        পণ্য হাতে পেয়ে টাকা দিন।
      </h2>


      {/* =================================================
          DELIVERY PROMISE
      ================================================= */}
      <p
        className="
          mt-[18px]
          font-['Hind_Siliguri']
          text-[17px]
          font-normal
          leading-[30px]
          text-[#F8C94B]
          sm:text-[18px]
          lg:text-[20px]
        "
      >
        <span className="block whitespace-nowrap">
          সারা দেশে ক্যাশ অন ডেলিভারি — ডেলিভারি চার্জ মাত্র
        </span>

        <span className="block whitespace-nowrap font-normal">
          ৳৫০
        </span>
      </p>


      {/* =================================================
          BENEFIT CARDS
      ================================================= */}
      <div
        className="
          mt-[28px]
          grid
          w-full
          max-w-[438px]
          grid-cols-1
          gap-[10px]
          sm:grid-cols-2
        "
      >

        {/* =================================================
            BENEFIT CARD 1
        ================================================= */}
        <div
          className="
            relative
            box-border
            h-[106px]
            w-full
            rounded-[14px]
            border
            border-[rgba(255,255,255,0.12)]
            bg-[rgba(255,255,255,0.055)]
            px-[62px]
            py-[15px]
          "
        >

          {/* Icon */}
          <div
            className="
              absolute
              left-[11px]
              top-[28px]
              flex
              h-[39px]
              w-[39px]
              items-center
              justify-center
              rounded-[11px]
              border
              border-[rgba(248,201,75,0.30)]
              bg-[rgba(248,201,75,0.13)]
            "
          >
            <svg
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
            >
              <rect
                x="4"
                y="3"
                width="16"
                height="18"
                rx="2"
                stroke="#F8C94B"
                strokeWidth="1.75"
              />

              <path
                d="M8 8H16"
                stroke="#F8C94B"
                strokeWidth="1.75"
                strokeLinecap="round"
              />

              <path
                d="M8 12H14"
                stroke="#F8C94B"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            </svg>
          </div>


          {/* Text */}
          <p
            className="
              m-0
              w-[150px]
              font-['Inter']
              text-[15px]
              font-normal
              leading-[23px]
              text-[#FFFDF8]
            "
          >
            Oxford 3000
            <br />
            Vocab বই +
            <br />
            Dedicated
            <br />
            Android App
          </p>

        </div>


        {/* =================================================
            BENEFIT CARD 2
        ================================================= */}
        <div
          className="
            relative
            box-border
            h-[106px]
            w-full
            rounded-[14px]
            border
            border-[rgba(255,255,255,0.12)]
            bg-[rgba(255,255,255,0.055)]
            px-[62px]
            py-[15px]
          "
        >

          {/* Icon */}
          <div
            className="
              absolute
              left-[11px]
              top-[28px]
              flex
              h-[39px]
              w-[39px]
              items-center
              justify-center
              rounded-[11px]
              border
              border-[rgba(248,201,75,0.30)]
              bg-[rgba(248,201,75,0.13)]
            "
          >
            <svg
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                cx="12"
                cy="12"
                r="8"
                stroke="#F8C94B"
                strokeWidth="1.75"
              />

              <path
                d="M8 14C8 10.8 9.8 8 12 8C14.2 8 16 10.8 16 14"
                stroke="#F8C94B"
                strokeWidth="1.75"
                strokeLinecap="round"
              />

              <path
                d="M7 14H17"
                stroke="#F8C94B"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            </svg>
          </div>


          {/* Text */}
          <p
            className="
              m-0
              w-[150px]
              font-['Inter']
              text-[15px]
              font-normal
              leading-[23px]
              text-[#FFFDF8]
            "
          >
            Audio, Video,
            <br />
            Practice ও
            <br />
            Progress Support
          </p>

        </div>

      </div>


      {/* =================================================
          PAY ON DELIVERY CARD
      ================================================= */}
      <div
        className="
          relative
          mt-[10px]
          min-h-[74.4px]
          rounded-[14px]
          border
          border-[rgba(255,255,255,0.12)]
          bg-[rgba(255,255,255,0.055)]
          px-[62px]
          py-[24px]
        "
      >

        {/* Icon */}
        <div
          className="
            absolute
            left-[11.4px]
            top-[17.61px]
            flex
            h-[39.2px]
            w-[39.2px]
            items-center
            justify-center
            rounded-[11.2px]
            border
            border-[rgba(248,201,75,0.22)]
            bg-[rgba(248,201,75,0.13)]
          "
        >
          <svg
            width="19.2"
            height="19.2"
            viewBox="0 0 24 24"
            fill="none"
          >
            <rect
              x="3"
              y="6"
              width="18"
              height="12"
              rx="2"
              stroke="#F8C94B"
              strokeWidth="1.75"
            />

            <path
              d="M3 10H21"
              stroke="#F8C94B"
              strokeWidth="1.75"
            />

            <path
              d="M12 10V18"
              stroke="#F8C94B"
              strokeWidth="1.75"
            />

            <circle
              cx="12"
              cy="13"
              r="1.5"
              stroke="#F8C94B"
              strokeWidth="1.75"
            />
          </svg>
        </div>


        <p
          className="
            m-0
            whitespace-nowrap
            font-['Hind_Siliguri']
            text-[14px]
            font-normal
            leading-[23px]
            text-[#FFFDF8]
            sm:text-[16px]
          "
        >
          হাতে পেয়ে দেখে তারপর পেমেন্ট করুন
        </p>

      </div>

    </div>


    {/* =====================================================
        RIGHT ORDER FORM
    ===================================================== */}
    <form
      onSubmit={(e) => e.preventDefault()}
      className="
        relative
        z-20
        pointer-events-auto
        mx-4
        mb-8
        rounded-[24px]
        border
        border-[rgba(248,201,75,0.5)]
        bg-[#FBF5E8]
        p-[20px]
        shadow-[0px_20px_55px_rgba(0,0,0,0.22)]
        sm:mx-auto
        sm:max-w-[514.09px]
        lg:absolute
        lg:right-[64px]
        lg:top-[64px]
        lg:mx-0
        lg:mb-0
        lg:h-[714px]
        lg:w-[514.09px]
        lg:max-w-none
        lg:p-[34px]
      "
    >

      <div className="flex flex-col gap-[16.17px]">

        {/* =================================================
            DELIVERY RIBBON
        ================================================= */}
        <div
          className="
            flex
            h-[44.5px]
            w-full
            flex-col
            items-center
            justify-center
            gap-0
            rounded-[12px]
            bg-[#0D1F35]
            px-[24px]
            py-[6px]
            sm:flex-row
            sm:gap-[8px]
            sm:py-[11px]
          "
        >

          {/* Truck */}
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            className="shrink-0"
          >
            <path
              d="M3 6H14V17H3V6Z"
              stroke="#F8C94B"
              strokeWidth="1.75"
            />

            <path
              d="M14 10H18L21 13V17H14V10Z"
              stroke="#F8C94B"
              strokeWidth="1.75"
              strokeLinejoin="round"
            />

            <circle
              cx="7"
              cy="18"
              r="2"
              stroke="#F8C94B"
              strokeWidth="1.75"
            />

            <circle
              cx="17"
              cy="18"
              r="2"
              stroke="#F8C94B"
              strokeWidth="1.75"
            />
          </svg>


          {/* Delivery text */}
          <span
            className="
              whitespace-nowrap
              font-['Hind_Siliguri']
              text-[12px]
              font-normal
              leading-[12px]
              text-[#DBEAF4]
            "
          >
            সারা দেশে ক্যাশ অন ডেলিভারি — ডেলিভারি চার্জ মাত্র
          </span>


          {/* 50 */}
          <span
            className="
              whitespace-nowrap
              font-['Hind_Siliguri']
              text-[13.6px]
              font-bold
              leading-[14px]
              text-[#FFE180]
            "
          >
            ৳৫০
          </span>

        </div>


        {/* =================================================
            ORDER SUMMARY
        ================================================= */}
        <div
          className="
            relative
            min-h-[159.95px]
            rounded-[13.6px]
            border
            border-[#DFD4BF]
            bg-[rgba(255,255,255,0.6)]
            px-[16.2px]
            py-[16.2px]
          "
        >

          {/* Top row */}
          <div className="flex items-start justify-between">

            <div>

              <div
                className="
                  font-['Hind_Siliguri']
                  text-[11.84px]
                  font-normal
                  leading-[15px]
                  text-[#4D5A6B]
                "
              >
                আপনার অর্ডার
              </div>


              <div
                className="
                  mt-[2px]
                  font-['Inter']
                  text-[15.04px]
                  font-bold
                  leading-[20px]
                  tracking-[-0.23735px]
                  text-[#071229]
                "
              >
                Oxford 3000 Vocab বই + App
              </div>

            </div>


            {/* TOTAL */}
            <div className="text-right">

              <div
                className="
                  font-['Hind_Siliguri']
                  text-[11.84px]
                  font-normal
                  leading-[15px]
                  text-[#4D5A6B]
                "
              >
                মোট
              </div>


              <div
                className="
                  font-['Hind_Siliguri']
                  text-[20.48px]
                  font-bold
                  leading-[34px]
                  tracking-[-0.512px]
                  text-[#071229]
                "
              >
                ৳৫৪৯
              </div>

            </div>

          </div>


          {/* Divider */}
          <div className="mt-[10px] border-t border-[#DFD4BF]" />


          {/* Price details */}
          <div
            className="
              mt-[9px]
              flex
              items-center
              gap-[8px]
              font-['Hind_Siliguri']
              text-[12.16px]
              leading-[17px]
              text-[#4D5A6B]
            "
          >

            <span>
              বই{" "}
              <strong className="font-bold text-[#071229]">
                ৳৪৯৯
              </strong>
            </span>


            <span className="font-['Inter']">
              +
            </span>


            <span>
              ডেলিভারি চার্জ মাত্র{" "}
              <strong className="font-bold text-[#071229]">
                ৳৫০
              </strong>
            </span>

          </div>


          {/* COD chip */}
          <div
            className="
              mt-[14px]
              inline-flex
              h-[25.22px]
              items-center
              justify-center
              rounded-full
              bg-[rgba(248,201,75,0.15)]
              px-[8.96px]
              py-[5.12px]
            "
          >
            <span
              className="
                font-['Hind_Siliguri']
                text-[11.52px]
                font-bold
                leading-[12px]
                text-[#73500C]
              "
            >
              সারা দেশে ক্যাশ অন ডেলিভারি
            </span>
          </div>

        </div>


        {/* =================================================
            DELIVERY INFORMATION
        ================================================= */}
        <div>

          <h3
            className="
              m-0
              font-['Hind_Siliguri']
              text-[17.28px]
              font-bold
              leading-[22px]
              tracking-[-0.434025px]
              text-[#071229]
            "
          >
            ডেলিভারির তথ্য দিন
          </h3>


          {/* NAME + PHONE */}
          <div
            className="
              mt-[8px]
              grid
              grid-cols-1
              gap-3
              sm:grid-cols-2
            "
          >

            {/* NAME */}
            <div>

              <label
                htmlFor="name"
                className="
                  block
                  font-['Hind_Siliguri']
                  text-[13.12px]
                  font-bold
                  leading-[22px]
                  tracking-[-0.0845625px]
                  text-[#071229]
                "
              >
                আপনার নাম{" "}
                <span className="text-[#C0392B]">*</span>
              </label>


              <input
                id="name"
                name="name"
                type="text"
                className="
                  mt-[4.47px]
                  box-border
                  h-[47.78px]
                  w-full
                  rounded-[10.4px]
                  border
                  border-[#CFC5B3]
                  bg-white
                  px-3
                  text-[#000000]
                  caret-[#000000]
                  outline-none
                  focus:border-[#F8C94B]
                  focus:ring-2
                  focus:ring-[#F8C94B]/20
                "
              />

            </div>


            {/* PHONE */}
            <div>

              <label
                htmlFor="phone"
                className="
                  block
                  font-['Hind_Siliguri']
                  text-[13.12px]
                  font-bold
                  leading-[22px]
                  tracking-[-0.0845625px]
                  text-[#071229]
                "
              >
                মোবাইল নম্বর{" "}
                <span className="text-[#C0392B]">*</span>
              </label>


              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="০১XXXXXXXXX"
                className="
                  mt-[4.47px]
                  box-border
                  h-[47.78px]
                  w-full
                  rounded-[10.4px]
                  border
                  border-[#CFC5B3]
                  bg-white
                  px-3
                  font-['Hind_Siliguri']
                  text-[15.04px]
                  text-[#000000]
                  caret-[#000000]
                  placeholder:text-[#536174]
                  outline-none
                  focus:border-[#F8C94B]
                  focus:ring-2
                  focus:ring-[#F8C94B]/20
                "
              />

            </div>

          </div>


          {/* DISTRICT */}
          <div className="mt-[13px]">

            <label
              htmlFor="district"
              className="
                block
                font-['Hind_Siliguri']
                text-[13.12px]
                font-bold
                leading-[22px]
                tracking-[-0.0845625px]
                text-[#071229]
              "
            >
              জেলা / এলাকা{" "}
              <span className="text-[#C0392B]">*</span>
            </label>


            <input
              id="district"
              name="district"
              type="text"
              className="
                mt-[4.47px]
                box-border
                h-[47.78px]
                w-full
                rounded-[10.4px]
                border
                border-[#CFC5B3]
                bg-white
                px-3
                text-[#000000]
                caret-[#000000]
                outline-none
                focus:border-[#F8C94B]
                focus:ring-2
                focus:ring-[#F8C94B]/20
              "
            />

          </div>


          {/* FULL ADDRESS */}
          <div className="mt-[13px]">

            <label
              htmlFor="address"
              className="
                block
                font-['Hind_Siliguri']
                text-[13.12px]
                font-bold
                leading-[22px]
                tracking-[-0.0845625px]
                text-[#071229]
              "
            >
              সম্পূর্ণ ঠিকানা{" "}
              <span className="text-[#C0392B]">*</span>
            </label>


            <textarea
              id="address"
              name="address"
              rows={3}
              className="
                mt-[4.47px]
                box-border
                h-[83.2px]
                w-full
                resize-none
                rounded-[10.4px]
                border
                border-[#CFC5B3]
                bg-white
                px-3
                py-2
                text-[#000000]
                caret-[#000000]
                outline-none
                focus:border-[#F8C94B]
                focus:ring-2
                focus:ring-[#F8C94B]/20
              "
            />

          </div>

        </div>


        {/* =================================================
            CONFIRM ORDER BUTTON
        ================================================= */}
        <button
          type="submit"
          className="
            box-border
            flex
            h-[46.94px]
            w-full
            min-h-[46.4px]
            items-center
            justify-center
            gap-[8.8px]
            rounded-[12px]
            border-0
            bg-gradient-to-br
            from-[#FFE38E]
            via-[#F8C94B]
            to-[#F2B81E]
            px-[18.4px]
            py-[12.48px]
            font-['Hind_Siliguri']
            text-[15.2px]
            font-bold
            leading-[19px]
            tracking-[-0.325375px]
            text-[#071229]
            shadow-[0px_11px_26px_rgba(248,201,75,0.22),inset_0px_1px_0px_rgba(255,255,255,0.5)]
            transition
            hover:brightness-105
            active:scale-[0.99]
          "
        >

          <span>
            অর্ডার কনফার্ম করুন
          </span>


          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M5 12H19"
              stroke="#071229"
              strokeWidth="0.833333"
              strokeLinecap="round"
            />

            <path
              d="M14 7L19 12L14 17"
              stroke="#071229"
              strokeWidth="0.833333"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

        </button>


        {/* =================================================
            PRIVACY / POLICY
        ================================================= */}
        <p
          className="
            m-0
            w-full
            text-center
            font-['Hind_Siliguri']
            text-[12.8px]
            font-normal
            leading-[20px]
            tracking-[-0.06px]
            text-[#4D5A6B]
          "
        >
          তথ্য শুধু ডেলিভারির জন্য ব্যবহার হবে{" "}

          <a
            href="#privacy-policy"
            className="
              font-medium
              text-[#73500C]
              underline
              decoration-[#73500C]
              underline-offset-[3px]
              transition
              hover:text-[#A47A19]
            "
          >
            নীতিমালা
          </a>
        </p>

      </div>

    </form>

  </div>

</section>


{/* =========================================================
    FOOTER
========================================================= */}
<footer
  className="
    box-border
    w-full
    border-t
    border-[rgba(255,255,255,0.13)]
    bg-[#040914]
    px-4
    pb-[20px]
    pt-[52px]
    sm:px-6
    lg:px-8
  "
>
  {/* =====================================================
      MAIN CONTAINER
  ===================================================== */}
  <div
    className="
      mx-auto
      flex
      w-full
      max-w-[1152px]
      flex-col
      justify-between
      gap-[48px]
      lg:flex-row
      lg:items-start
    "
  >

    {/* =================================================
        LEFT BRAND AREA
    ================================================= */}
    <div
      className="
        flex
        w-full
        flex-col
        items-start
        lg:w-[371.5px]
      "
    >

      {/* Logo + Brand */}
      <a
        href="#top"
        className="
          flex
          h-[55.19px]
          min-h-[44px]
          items-center
          gap-[10.4px]
          no-underline
        "
      >

        {/* Logo */}
        <img
          src={logo}
          alt="Oxford 3000 Vocabulary System"
          className="
            h-[37.64px]
            w-[49.59px]
            shrink-0
            object-contain
          "
        />

        {/* Brand */}
        <div
          className="
            flex
            h-[31px]
            w-[148.97px]
            shrink-0
            flex-col
          "
        >

          {/* Oxford 3000 */}
          <div
            className="
              whitespace-nowrap
              font-['Inter']
              text-[15.36px]
              font-bold
              leading-[16px]
              tracking-[-0.0312px]
              text-white
            "
          >
            Oxford 3000
          </div>

          {/* Vocabulary System */}
          <div
            className="
              mt-[4px]
              whitespace-nowrap
              font-['Inter']
              text-[11.36px]
              font-semibold
              uppercase
              leading-[12px]
              tracking-[1.1786px]
              text-[#F8C94B]
            "
          >
            Vocabulary System
          </div>

        </div>
      </a>


      {/* Description */}
      <p
        className="
          m-0
          mt-[8px]
          w-full
          max-w-[371.5px]
          whitespace-nowrap
          font-['Inter']
          text-[13.76px]
          font-normal
          leading-[23px]
          tracking-[-0.131688px]
          text-[#B2BFD0]
        "
      >
        English Commando-এর বই ও digital learning support একসাথে।
      </p>

    </div>


    {/* =================================================
        RIGHT SIDE
    ================================================= */}
    <div
      className="
        flex
        w-full
        flex-col
        items-start
        lg:w-[204.31px]
        lg:items-start
      "
    >

      {/* Phone */}
      <a
        href="tel:01405458800"
        className="
          flex
          h-[44px]
          min-h-[44px]
          items-center
          whitespace-nowrap
          no-underline
          transition-colors
          hover:text-white
        "
      >
        <span
          className="
            font-['Hind_Siliguri']
            text-[16px]
            font-normal
            leading-[27px]
            tracking-[-0.3125px]
            text-[#D0D9E6]
          "
        >
          কল করুন: 0140-545-8800-2
        </span>
      </a>


      {/* Privacy Policy */}
      <a
        href="#privacy-policy"
        className="
          ml-0
          flex
          h-[44px]
          min-h-[44px]
          items-center
          whitespace-nowrap
          no-underline
          transition-colors
          hover:text-white
          lg:ml-[106px]
        "
      >
        <span
          className="
            font-['Hind_Siliguri']
            text-[16px]
            font-normal
            leading-[27px]
            tracking-[-0.3125px]
            text-[#D0D9E6]
          "
        >
          গোপনীয়তা নীতি
        </span>
      </a>


      {/* Back To Top */}
      <a
        href="#top"
        className="
          ml-0
          flex
          h-[44px]
          min-h-[44px]
          items-center
          gap-[6.4px]
          whitespace-nowrap
          no-underline
          transition-colors
          hover:text-white
          lg:ml-[86px]
        "
      >
        <span
          className="
            font-['Hind_Siliguri']
            text-[16px]
            font-normal
            leading-[27px]
            tracking-[-0.3125px]
            text-[#D0D9E6]
          "
        >
          উপরে ফিরে যান
        </span>

        <svg
          width="17.59"
          height="17.59"
          viewBox="0 0 24 24"
          fill="none"
          className="shrink-0"
        >
          <path
            d="M6 14L12 8L18 14"
            stroke="#D0D9E6"
            strokeWidth="0.88"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>

    </div>

  </div>


  {/* =====================================================
      COPYRIGHT
  ===================================================== */}
  <div
  className="
    mx-auto
    mt-[18px]
    w-full
    max-w-[1152px]
    border-t
    border-[rgba(255,255,255,0.13)]
    pt-[18px]
  "
>
    <div
      className="
        font-['Hind_Siliguri']
        text-[11.4667px]
        font-normal
        leading-[19px]
        tracking-[0.0358334px]
        text-[#7F8DA2]
      "
    >
      © 2026 English Commando. সর্বস্বত্ব সংরক্ষিত।
    </div>
  </div>

</footer>

    </main>
  );
}

export default App;
