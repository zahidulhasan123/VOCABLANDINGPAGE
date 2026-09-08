import { forwardRef, useEffect, useRef, useState } from "react";
import "./App.css";
import logo from "./images/logo.png";
import heroArtwork from "./images/image1.png";
import videoThumb from "./images/image2.png";
import pdfFile from "./assets/PDF/Oxford_3k.pdf";
import { Document, Page, pdfjs } from "react-pdf";
import HTMLFlipBook from "react-pageflip";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import bookDetail from "./images/image4.png";
import androidApp from "./images/image5.png";
import image6 from "./images/image6.png";
import explainerUnderline from "./images/Vector 35.png";
import infoIcon from "./assets/Info icon.svg";
import sparkleIcon from "./assets/Icon.svg";
import Footer from "./footer";
import Header from "./header";
import PrivacyPolicy from "./privacy-policy";
// bookDetail (image4.png) removed per request

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

const featureCards = [
  {
    badge: "যেকোনো জায়গায়",
    title: "অ্যান্ড্রয়েড অ্যাপ",
    description: "অফলাইনে ব্যবহারযোগ্য—ইন্টারনেট ছাড়াও প্র্যাকটিস করুন।",
    icon: "app",
    color: "#E2EAFF",
    badgeColor: "#3158A5",
    bubble: "০১",
  },
  {
    badge: "ভিডিও সহায়তা",
    title: "ভিডিও লেসন",
    description: "প্রতিটি শব্দ বুঝতে রয়েছে ডেডিকেটেড ভিজুয়াল লেসন।",
    icon: "video",
    color: "#D9F6F8",
    badgeColor: "#147D89",
    bubble: "০২",
  },
  {
    badge: "শুনে শিখুন",
    title: "অডিও পডকাস্ট",
    description: "যেকোনো সময় শুনে শব্দগুলো ঝালিয়ে নিন।",
    icon: "audio",
    color: "#FFF0CE",
    badgeColor: "#A86600",
    bubble: "০৩",
  },
  {
    badge: "বলার অনুশীলন",
    title: "ভোকাল এক্সারসাইজ",
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
    title: "টাং টুইস্টার",
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
    title: "প্র্যাকটিস + রিভিশন",
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

const PdfFlipPage = forwardRef(function PdfFlipPage({ children }, ref) {
  return (
    <div ref={ref} className="pdf-flip-page">
      {children}
    </div>
  );
});

function App() {
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(
    () =>
      typeof window !== "undefined" &&
      (window.location.pathname === "/privacy-policy" ||
        window.location.hash === "#privacy-policy"),
  );
  const [expandedIndex, setExpandedIndex] = useState(-1);

  const [videoPlaying, setVideoPlaying] = useState(false);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [activeSection, setActiveSection] = useState("");

  const [scrollProgress, setScrollProgress] = useState(0);

  const [bookPage, setBookPage] = useState(1);

  const [pdfPages, setPdfPages] = useState(0);

  const [mobilePage, setMobilePage] = useState(1);

  const [isMobile, setIsMobile] = useState(false);

  const [isBookFlipping, setIsBookFlipping] = useState(false);

  const [mobileTurnDirection, setMobileTurnDirection] = useState("next");

  // =========================
  // ORDER FORM STATE
  // =========================
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderMessage, setOrderMessage] = useState("");
  const [orderError, setOrderError] = useState("");

  useEffect(() => {
    const handleLocationChange = () =>
      setShowPrivacyPolicy(
        window.location.pathname === "/privacy-policy" ||
          window.location.hash === "#privacy-policy",
      );
    window.addEventListener("hashchange", handleLocationChange);
    window.addEventListener("popstate", handleLocationChange);
    return () => {
      window.removeEventListener("hashchange", handleLocationChange);
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, []);

  // =========================
  // AUTO HIDE ORDER ALERT
  // =========================
  useEffect(() => {
    if (!orderMessage && !orderError) return;

    const timer = setTimeout(() => {
      setOrderMessage("");
      setOrderError("");
    }, 5000);

    return () => clearTimeout(timer);
  }, [orderMessage, orderError]);

  // =========================
  // ORDER SUBMIT
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setOrderMessage("");
    setOrderError("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = formData.get("name")?.trim();
    const phone = formData.get("phone")?.trim();
    const city = formData.get("district")?.trim();
    const address = formData.get("address")?.trim();

    // Required field validation
    if (!name || !phone || !city || !address) {
      setOrderError("সব তথ্য পূরণ করুন।");
      setIsSubmitting(false);
      return;
    }

    const orderData = {
      name,
      phone,
      secondary_phone: "",
      address,
      city,
      book_id: 1,
      quantity: 1,
      customer_note: "",
      delivery_charge: "50",
      discount_amount: "0",
      source: "website",
      landing_page: window.location.href,
      landing_page_slug: "",
      campaign: "",
      utm_source: "",
      utm_medium: "",
      utm_campaign: "",
      utm_term: "",
      utm_content: "",
      idempotency_key: `${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 10)}`,
    };

    try {
      const response = await fetch("/api/orders/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.detail ||
            data?.message ||
            "অর্ডার করা যায়নি। আবার চেষ্টা করুন।",
        );
      }

      console.log("Order created:", data);

      setOrderMessage("অর্ডার সফলভাবে গ্রহণ করা হয়েছে।");

      form.reset();
    } catch (error) {
      console.error("Order submission error:", error);

      setOrderError(error.message || "অর্ডার করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setIsSubmitting(false);
    }
  };

  const flipBookRef = useRef(null);

  const pointerStartX = useRef(null);

  const suppressPdfClick = useRef(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const handleResize = () => setIsMobile(mediaQuery.matches);

    handleResize();

    mediaQuery.addEventListener("change", handleResize);

    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  const handlePdfLoad = ({ numPages }) => setPdfPages(numPages);
  const handleNextPage = () => {
    if (isMobile) {
      setMobileTurnDirection("next");
      if (pdfPages > 0) setMobilePage((page) => Math.min(page + 1, pdfPages));
      return;
    }
    if (bookPage < pdfPages) {
      flipBookRef.current?.pageFlip()?.flipNext();
    }
  };
  const handlePreviousPage = () => {
    if (isMobile) {
      setMobileTurnDirection("previous");
      setMobilePage((page) => Math.max(1, page - 1));
      return;
    }
    if (bookPage > 1) {
      flipBookRef.current?.pageFlip()?.flipPrev();
    }
  };

  const handlePdfPointerDown = (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    pointerStartX.current = event.clientX;
    suppressPdfClick.current = false;
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const handlePdfPointerUp = (event) => {
    if (pointerStartX.current === null) return;
    const distance = event.clientX - pointerStartX.current;
    pointerStartX.current = null;
    if (Math.abs(distance) < 36) return;
    suppressPdfClick.current = true;
    if (distance < 0) handleNextPage();
    else handlePreviousPage();
  };

  const handlePdfSurfaceClick = (event) => {
    if (suppressPdfClick.current) {
      suppressPdfClick.current = false;
      return;
    }
    const bounds = event.currentTarget.getBoundingClientRect();
    if (event.clientX < bounds.left + bounds.width / 2) handlePreviousPage();
    else handleNextPage();
  };

  const handleFlipBookChange = (event) => {
    const pageIndex = event.data;
    setBookPage(pageIndex + 1);
  };

  const handleFlipBookState = (event) => {
    setIsBookFlipping(event.data !== "read");
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
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(
        scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0,
      );

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

  if (showPrivacyPolicy) {
    return (
      <main className="min-h-screen bg-[#050812] text-white">
        <Header
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          activeSection={activeSection}
          scrollProgress={scrollProgress}
        />
        <PrivacyPolicy />
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050812] text-white">
      {/* =================================================
    TOP ORDER ALERT
================================================= */}

      {(orderMessage || orderError) && (
        <div
          className={`order-toast ${orderError ? "order-toast-error" : "order-toast-success"}`}
        >
          <div className="order-toast-card">
            <div className="order-toast-icon" aria-hidden="true">
              {orderError ? "!" : "✓"}
            </div>
            <div className="order-toast-content">
              <strong>
                {orderError ? "অর্ডার সম্পন্ন হয়নি" : "অর্ডার সফল হয়েছে"}
              </strong>
              <p>{orderError || orderMessage}</p>
            </div>
            <button
              type="button"
              className="order-toast-close"
              aria-label="অ্যালার্ট বন্ধ করুন"
              onClick={() => {
                setOrderMessage("");
                setOrderError("");
              }}
            >
              ×
            </button>
            <span className="order-toast-progress" aria-hidden="true" />
          </div>
        </div>
      )}

      {/* Section - 01 */}
      <section
        id="top"
        className="relative overflow-hidden bg-[#060b18]"
        style={{ height: "829px", opacity: 1, transform: "rotate(0deg)" }}
      >
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_76%_30%,rgba(65,118,255,0.34),transparent_0_22%),radial-gradient(circle_at_82%_70%,rgba(249,199,75,0.12),transparent_0_18%),linear-gradient(180deg,#060b18_0%,#0b172f_100%)]"
          style={{ height: "829px", opacity: 1, transform: "rotate(0deg)" }}
        />
        <div className="relative mx-auto flex h-full max-w-[1240px] flex-col px-3 pb-4 pt-[92px] sm:px-5 sm:pt-[96px] lg:px-0 lg:pt-[84px]">
          <Header
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
            activeSection={activeSection}
            scrollProgress={scrollProgress}
          />

          <div className="grid flex-1 items-center gap-4 px-3 pb-10 pt-8 sm:px-5 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-6 lg:px-8 lg:pt-24">
            <div className="order-2 mx-auto w-full max-w-[560px] text-center lg:order-1 lg:pr-6 lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#f7c84f]/30 bg-[#0c1426] px-4 py-2 text-[0.72rem] font-medium text-[#f7c84f] shadow-soft">
                <span className="text-sm" aria-hidden="true">
                  <img
                    src={sparkleIcon}
                    alt=""
                    className="sparkle-icon h-4 w-4"
                  />
                </span>
                বাংলাদেশে আমরাই প্রথম
              </div>

              <h1
                className="hero-title-primary mt-6 mx-auto w-full max-w-[300px] text-center text-[clamp(32px,7vw,48px)] font-black tracking-[-0.05em] text-[#f8cb54] leading-[0.98] lg:mx-0 lg:max-w-none lg:mt-8 lg:text-left"
                aria-label="অক্সফোর্ড ৩০০০ ভোকাব"
              >
                <span className="hero-word block">
                  <span className="mr-[0.2em]">অক্সফোর্ড</span>
                  <span className="mr-[0.2em]">৩০০০</span>
                </span>
                <span className="hero-word block">ভোকাব</span>
              </h1>
              <h2
                className="hero-title-secondary mt-3 mx-auto w-full max-w-[300px] text-center text-[clamp(32px,7vw,48px)] font-black tracking-[-0.05em] text-white leading-[1.02] lg:mx-0 lg:max-w-none lg:mt-3 lg:text-left"
                aria-label="সম্পূর্ণ লার্নিং সিস্টেম"
              >
                <span className="hero-word block">
                  <span className="mr-[0.2em]">সম্পূর্ণ</span>
                  <span className="mr-[0.2em]">লার্নিং</span>
                </span>
                <span className="hero-word block">সিস্টেম</span>
              </h2>

              <p className="mt-5 max-w-[34rem] text-[0.98rem] leading-8 text-white/65 sm:text-[1.02rem] lg:mt-8">
                বই, App, Audio, Video ও Practice - সব একসাথে।
              </p>

              <div className="mt-6 flex flex-row items-center justify-center gap-3 sm:flex-row sm:items-center lg:mt-7 lg:justify-start">
                <a
                  href="#order"
                  className="flex h-[48px] min-h-[32.48px] w-[174px] items-center justify-center gap-[8px] rounded-[12px] border border-[rgba(0,0,0,0)] bg-[linear-gradient(135deg,#FFE38E_0%,#F8C94B_46%,#F2B81E_100%)] px-[12px] py-[12px] text-center text-[12px] font-extrabold text-[#10172a] shadow-[0_11px_26px_0_rgba(248,201,75,0.22),0_1px_0_0_rgba(255,255,255,0.50)_inset] transition hover:-translate-y-0.5 hover:brightness-105 sm:w-[242.047px]"
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
                  className="flex h-[48px] min-h-[32.48px] w-[174px] items-center justify-center gap-[8px] rounded-[12px] border border-white/20 bg-white/[0.04] px-[12px] py-[12px] text-center text-[12px] font-semibold text-white transition hover:border-white/30 hover:bg-white/[0.08] sm:max-w-[242.047px]"
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

              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-white/55 lg:justify-start">
                <span className="text-[#69d7a7]">✓</span>
                সারা দেশে ক্যাশ অন ডেলিভারি
              </div>
            </div>

            <div className="order-1 relative mx-auto w-full max-w-[420px] justify-self-center translate-x-0 lg:order-2 lg:max-w-[640px] lg:justify-self-end lg:translate-x-6">
              <img
                src={heroArtwork}
                alt="Oxford 3000 vocabulary pack"
                className="mx-auto block w-full select-none object-contain drop-shadow-[0_18px_40px_rgba(0,0,0,0.45)]"
              />
            </div>
          </div>

        </div>
      </section>

      {/* Section - 02 */}

      <section
        id="how-it-works"
        className="relative flex h-[337px] flex-col items-center gap-6 overflow-hidden bg-[#050B18] px-5 py-10 lg:h-[910.19px] lg:gap-0 lg:px-0 lg:py-[86.4px]"
      >
        <div className="w-full max-w-[350px] text-center lg:max-w-[1152px]">
          <div className="flex flex-col items-center">
            <h2 className="font-['Baloo_Da_2'] text-[28px] font-semibold leading-9 text-white lg:text-[44px] lg:leading-[74px] lg:tracking-[-0.79px]">
              ১ মিনিটে দেখে নিন
            </h2>
            <img
              src={explainerUnderline}
              alt=""
              aria-hidden="true"
              className="mt-[-1px] h-auto w-[81px] lg:mt-[-3px] lg:w-[120px]"
            />
            <p className="hidden font-['Baloo_Da_2'] text-[17.6px] font-normal leading-[30px] text-[#B8C4D5] lg:mt-2 lg:block">
              পুরো সিস্টেমটি ১ মিনিটে বুঝে নিন।
            </p>
          </div>

          <div className="mt-6 lg:mt-[52px]">
            <div className="relative mx-auto h-[197px] w-full overflow-hidden rounded-2xl border border-[#12345A] bg-[#071526] shadow-[0_18px_42px_rgba(2,8,24,0.28)] lg:h-[558px] lg:w-[992px] lg:rounded-[32px] lg:border-[#E8B84E]/[0.28]">
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
                    className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#F6C84B] transition hover:scale-105 hover:bg-[#ffd86d] lg:h-20 lg:w-20 lg:shadow-[0_0_0_12.8px_rgba(232,184,78,0.12)]"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5 text-[#071526] lg:h-7 lg:w-7"
                      aria-hidden="true"
                    >
                      <path d="M10 8l6 4-6 4V8z" fill="currentColor" />
                    </svg>
                  </button>
                </>
              )}
              <span className="absolute right-3 top-3 rounded-full border border-white/[0.14] bg-[#050B18]/[0.78] px-2 py-1 font-['Baloo_Da_2'] text-[12px] font-normal leading-[18px] text-white lg:right-4 lg:top-4 lg:px-3 lg:py-[6.4px] lg:text-[12.8px] lg:font-semibold lg:text-white">
                ১ মিনিটে দেখুন
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="benefits-section">
        <div className="benefits-glow benefits-glow-top" />
        <div className="benefits-glow benefits-glow-bottom" />
        <div className="benefits-ring benefits-ring-top" />
        <div className="benefits-ring benefits-ring-bottom" />

        <div className="benefits-content">
          <div className="benefits-heading">
            <div className="benefits-eyebrow">
              <span />
              INCLUDED WITH THE BOOK
            </div>
            <div className="benefits-title-wrap">
              <h2>বইটির সাথে ফ্রি পাচ্ছেন</h2>
              <img src={explainerUnderline} alt="" aria-hidden="true" />
            </div>
            <p>বই কিনলেই এগুলো পাচ্ছেন—আলাদা কোনো চার্জ নেই।</p>
          </div>

          <div className="benefits-grid">
            {featureCards.map((card) => (
              <article
                key={card.title}
                className="benefits-card"
                style={{
                  "--card-color": card.color,
                  "--badge-color": card.badgeColor,
                }}
              >
                <div className="benefits-card-halo" />
                <div className="benefits-card-header">
                  <div className="benefits-card-icon">
                    <CardIcon type={card.icon} />
                  </div>
                  <span className="benefits-card-number">{card.bubble}</span>
                </div>
                <div className="benefits-card-badge">{card.badge}</div>
                <h3 className="benefits-card-title">{card.title}</h3>
                <p className="benefits-card-description">{card.description}</p>
              </article>
            ))}
          </div>

          <div className="benefits-note">
            <span>
              <img src={infoIcon} alt="" className="h-5 w-5 shrink-0" />
              Offline App, Vocal Exercise ও Tongue Twister বইয়ের Study Guide-এ
              সরাসরি আছে।
            </span>
          </div>
        </div>
      </section>

      

      <section
        id="book"
        className="relative overflow-hidden bg-[#f0e8df] px-4 py-20 sm:py-24 lg:py-28 text-[#102034]"
      >
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
            <div className="pdf-viewer-shell mx-auto max-w-[920px]">
              <div className="pdf-preloader" aria-hidden="true">
                <Document file={pdfFile} onLoadSuccess={handlePdfLoad}>
                  <Page
                    pageNumber={1}
                    width={430}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    renderMode="canvas"
                    className="pdf-preload-page"
                  />
                  <Page
                    pageNumber={2}
                    width={430}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    renderMode="canvas"
                    className="pdf-preload-page"
                  />
                </Document>
              </div>
              <div className="pdf-frame mx-auto mb-8 w-[min(860px,88%)]">
                <Document
                  file={pdfFile}
                  onLoadSuccess={handlePdfLoad}
                  loading={<div className="pdf-loading">PDF loading...</div>}
                  error={
                    <div className="pdf-loading pdf-loading-error">
                      PDF load করা যাচ্ছে না।
                    </div>
                  }
                >
                  {isMobile ? (
                    <div
                      key={`mobile-view-${mobilePage}`}
                      className={`pdf-page-viewport pdf-page-viewport-mobile pdf-mobile-page pdf-mobile-turn-${mobileTurnDirection} pdf-page-reveal`}
                      onPointerDown={handlePdfPointerDown}
                      onPointerUp={handlePdfPointerUp}
                      onClick={handlePdfSurfaceClick}
                    >
                      <div className="pdf-mobile-single-stage">
                        <div className="pdf-mobile-single-sheet">
                          <Page
                            pageNumber={mobilePage}
                            width={430}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                            renderMode="canvas"
                            className="pdf-page"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`pdf-pageflip-viewport ${isBookFlipping ? "is-flipping" : ""}`}
                    >
                      <HTMLFlipBook
                        ref={flipBookRef}
                        width={430}
                        height={555}
                        size="stretch"
                        minWidth={280}
                        maxWidth={430}
                        minHeight={360}
                        maxHeight={555}
                        showCover={false}
                        mobileScrollSupport
                        useMouseEvents
                        flippingTime={950}
                        onFlip={handleFlipBookChange}
                        onChangeState={handleFlipBookState}
                      >
                        {Array.from({ length: pdfPages }, (_, index) => (
                          <PdfFlipPage key={`pdf-flip-page-${index + 1}`}>
                            <Page
                              pageNumber={index + 1}
                              width={430}
                              renderTextLayer={false}
                              renderAnnotationLayer={false}
                              renderMode="canvas"
                              className="pdf-page"
                            />
                          </PdfFlipPage>
                        ))}
                      </HTMLFlipBook>
                    </div>
                  )}
                </Document>
              </div>

              <div className="mt-[24px] flex flex-col items-center">
                {/* ================= CONTROLS ================= */}
                <div className="pdf-controls flex items-center justify-center gap-[24px]">
                  {/* Previous Button */}
                  <button
                    type="button"
                    onClick={handlePreviousPage}
                    disabled={isMobile ? mobilePage <= 1 : bookPage <= 1}
                    className="
                  pdf-control-button
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

                    <span>আগের পৃষ্ঠা</span>
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
                      isMobile
                        ? pdfPages > 0 && mobilePage >= pdfPages
                        : pdfPages > 0 && bookPage >= pdfPages
                    }
                    className="
                  pdf-control-button
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
                    <span>পরের পৃষ্ঠা</span>

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

      <section
        id="package"
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
        <div className="word-atlas-container">
          <div className="word-atlas-intro">
            <div>
              <div className="word-atlas-eyebrow">THE BOOK, UNPACKED</div>
              <h2>প্রতিটি শব্দের জন্য রয়েছে</h2>
              <img src={explainerUnderline} alt="" aria-hidden="true" />
            </div>
            <p>
              একটি Word Page-এ শুধু অর্থ নয়—উচ্চারণ, ব্যবহার ও Revision-এর
              প্রয়োজনীয় Cue-গুলোও একই Learning Sequence-এ সাজানো হয়েছে।
            </p>
          </div>

          <div className="word-atlas-shell">
            <div className="word-atlas-topbar">
              <div className="word-atlas-mark">১২</div>
              <div>
                <h3>একটি শব্দের সম্পূর্ণ study kit</h3>
                <p>
                  শুরু থেকে revision পর্যন্ত প্রয়োজনীয় অংশ একসাথে খুঁজে নিন।
                </p>
              </div>
            </div>

            <div className="word-atlas-body">
              <div className="word-atlas-practice">
                <span>FEATURED PRACTICE TOOLS</span>
                <h3>শুনুন, বলুন, মনে রাখুন</h3>
                <div className="word-atlas-practice-row">
                  <b>০১</b>
                  <div>
                    <strong>Tongue Twister</strong>
                    <small>
                      দেখা শব্দটি বারবার বলার জন্য practice support।
                    </small>
                  </div>
                </div>
                <div className="word-atlas-practice-row">
                  <b>০২</b>
                  <div>
                    <strong>Vocal Exercise</strong>
                    <small>
                      শব্দটি active recall-এ ব্যবহারের জন্য practice support।
                    </small>
                  </div>
                </div>
              </div>

              <div className="word-atlas-anatomy">
                <span>একটি WORD PAGE-এর ANATOMY</span>
                <h3>শেখার দরকারি তথ্য একসাথে</h3>
                <div className="word-atlas-fields">
                  {[
                    ["০১", "Serial Number"],
                    ["০২", "Level"],
                    ["০৩", "Parts of Speech"],
                    ["০৪", "বাংলা অর্থ"],
                    ["০৫", "বাংলা উচ্চারণ"],
                    ["০৬", "IPA / Phonetic"],
                    ["০৭", "Example"],
                    ["০৮", "উদাহরণের অর্থ"],
                    ["০৯", "Short Note"],
                    ["১০", "Synonym"],
                    ["১১", "Antonym"],
                    ["১২", "Practice Check"],
                  ].map(([number, label]) => (
                    <div className="word-atlas-field" key={number}>
                      <b>{number}</b>
                      <strong>{label}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="decision"
        className="decision-section
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
    max-lg:text-[clamp(2rem,7vw,46.08px)]
    font-bold
    leading-[52.53px]
    max-lg:leading-[1.18]
    tracking-[-0.79px]
    text-white
  "
              >
                <span className="block font-['Hind_Siliguri'] font-bold">
                  ফ্রি অ্যান্ড্রয়েড অ্যাপ ডাউনলোড করুন
                </span>
              </h2>
              <img
                src={explainerUnderline}
                alt=""
                aria-hidden="true"
                className="learning-underline"
              />

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
                একই Vocabulary পড়া, শোনা, দেখা, প্র্যাকটিস ও ট্র্যাক করার জন্য
                ছয়টি পরস্পর সংযুক্ত Learning Support।
              </p>
              <a
                href="https://play.google.com/store/search?q=Oxford%203000%20Vocab&c=apps"
                target="_blank"
                rel="noreferrer"
                className="learning-download learning-download-desktop"
              >
                ডাউনলোড করুন
                <span aria-hidden="true">→</span>
              </a>
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
                src={androidApp}
                alt="Book and digital learning support"
                className="
            block
              w-full
              max-w-[600px]
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
                    <span className="learning-desktop-title">
                      Vocabulary Book
                    </span>
                    <span className="learning-mobile-title">
                      ব্রিটিশ উচ্চারণ
                    </span>
                  </h3>

                  <p className="mt-[7px] max-w-[230px] font-['Hind_Siliguri'] text-[13px] leading-[21px] text-[#8E99AA]">
                    Oxford sequence-এ সাজানো বাংলা অর্থ, উচ্চারণ, Example ও
                    Short Note।
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
                    <span className="learning-desktop-title">
                      অ্যান্ড্রয়েড অ্যাপ
                    </span>
                    <span className="learning-mobile-title">
                      আমেরিকান উচ্চারণ
                    </span>
                  </h3>

                  <p className="mt-[7px] font-['Hind_Siliguri'] text-[13px] leading-[21px] text-[#8E99AA]">
                    <span className="block">
                      শব্দ অনুশীলন ও revision-এর জন্য বইয়ের সঙ্গে
                    </span>

                    <span className="block">যুক্ত digital support।</span>
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
                    <span className="learning-desktop-title">অডিও পডকাস্ট</span>
                    <span className="learning-mobile-title">ভিডিও লেসন</span>
                  </h3>

                  <p className="mt-[7px] font-['Hind_Siliguri'] text-[13px] leading-[21px] text-[#8E99AA]">
                    <span className="block">
                      শুনুন, নিজে উচ্চারণ করুন এবং মনে রাখার চেষ্টা
                    </span>
                    <span className="block">করুন।</span>
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
                    <span className="learning-desktop-title">ভিডিও লেসন</span>
                    <span className="learning-mobile-title">অডিও পডকাস্ট</span>
                  </h3>

                  <p className="mt-[7px] font-['Hind_Siliguri'] text-[13px] leading-[21px] text-[#8E99AA]">
                    <span className="block">
                      কঠিন অংশ ও ব্যবহার বুঝতে ধাপে ধাপে video
                    </span>
                    <span className="block">support।</span>
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
                    <span className="learning-desktop-title">
                      Practice Support
                    </span>
                    <span className="learning-mobile-title">
                      প্রগ্রেস ট্র্যাকার
                    </span>
                  </h3>

                  <p className="mt-[7px] max-w-[230px] font-['Hind_Siliguri'] text-[13px] leading-[21px] text-[#8E99AA]">
                    Practice Check Box, Tongue Twister ও Vocal Exercise দিয়ে
                    active recall।
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
                    <span className="learning-desktop-title">
                      প্রগ্রেস ট্র্যাকার
                    </span>
                    <span className="learning-mobile-title">
                      সম্পূর্ণ অফলাইন
                    </span>
                  </h3>

                  <p className="mt-[7px] font-['Hind_Siliguri'] text-[13px] leading-[21px] text-[#8E99AA]">
                    <span className="block">
                      শেখা, revision ও পরবর্তী ধাপ গুছিয়ে এগোনোর
                    </span>
                    <span className="block">ব্যবস্থা।</span>
                  </p>
                </div>
              </div>

              <div className="absolute bottom-[16px] left-[64px] h-[2px] w-[64px] bg-gradient-to-r from-[#F7C84F] to-transparent" />
            </article>
          </div>

          <a
            href="https://play.google.com/store/search?q=Oxford%203000%20Vocab&c=apps"
            target="_blank"
            rel="noreferrer"
            className="learning-download learning-download-mobile"
          >
            ডাউনলোড করুন
            <span aria-hidden="true">→</span>
          </a>

          {/* =========================================================
        BOTTOM CTA
    ========================================================= */}
          <div
            className="decision-cta
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
              href="#order"
              className="button button--primary
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
        className="audience-section
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
            <img
              src={explainerUnderline}
              alt=""
              aria-hidden="true"
              className="audience-underline"
            />
            <p className="audience-lead">
              প্রয়োজনীয় ভোকাবুলারি একটি নির্দিষ্ট ক্রমে রিভাইজ করুন।
            </p>
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
                  SSC, HSC, University, BCS & Bank Jobs
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
                  প্রয়োজনীয় vocabulary একটি নির্দিষ্ট sequence-এ revise করুন।
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
                  Communication Skills
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
                  অর্থ জানার পাশাপাশি pronunciation, example ও ব্যবহার শিখুন।
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
                  Beginners & Self-Learners
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
        className="student-proof-section
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
          <div
            id="student-stories"
            className="flex flex-col items-center text-center"
          >
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
              student-proof-label-line
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
            <img
              src={explainerUnderline}
              alt=""
              aria-hidden="true"
              className="student-proof-underline"
            />
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
      student-stories-label
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
    student-proof-grid
    student-proof-track
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
              student-proof-card
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
                <iframe
                  className="absolute inset-0 z-50 h-full w-full border-0"
                  src="https://www.youtube.com/embed/Pa0QmStjIUE?rel=0"
                  title="Student review video 1"
                  loading="eager"
                  fetchPriority="high"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
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
                    শিক্ষার্থী ০১
                  </div>

                  <div
                    className="
                font-['Hind_Siliguri']
                text-[12px]
                leading-[18px]
                text-white/55
              "
                  >
                    ব্যবহারকারী
                  </div>
                </div>
              </div>

              {/* =======================================================
            CARD 02
        ======================================================= */}
              <div
                className="
              student-proof-card
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
                <iframe
                  className="absolute inset-0 z-50 h-full w-full border-0"
                  src="https://www.youtube.com/embed/3OSRv0XbYQE?rel=0"
                  title="Student review video 2"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
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
                    শিক্ষার্থী ০২
                  </div>

                  <div
                    className="
                font-['Hind_Siliguri']
                text-[12px]
                leading-[18px]
                text-white/55
              "
                  >
                    ব্যবহারকারী
                  </div>
                </div>
              </div>

              {/* =======================================================
            CARD 03
        ======================================================= */}
              <div
                className="
              student-proof-card
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
                <iframe
                  className="absolute inset-0 z-50 h-full w-full border-0"
                  src="https://www.youtube.com/embed/_YxU5qvYSYg?rel=0"
                  title="Student review video 3"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
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
                    শিক্ষার্থী ০৩
                  </div>

                  <div
                    className="
                font-['Hind_Siliguri']
                text-[12px]
                leading-[18px]
                text-white/55
              "
                  >
                    ব্যবহারকারী
                  </div>
                </div>
              </div>
            </div>

            <p className="student-proof-swipe-hint">ভিডিও দেখতে সোয়াইপ করুন</p>
          </div>

          {/* =========================================================
    WRITTEN FEEDBACK
========================================================= */}
          <div className="mt-[52px] hidden">
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
                  আগে শুধু word meaning পড়তাম, কিন্তু মনে থাকত না। এখন example,
                  audio আর app দিয়ে revise করতে পারছি।
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
                  Oxford 3000 এক জায়গায় সাজানো থাকায় আলাদা করে meaning খুঁজতে
                  হয় না। সময় বাঁচে।
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
                  বইয়ের সাথে app, audio আর video পাওয়ায় vocabulary শেখা অনেক
                  সহজ হয়েছে।
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
        className="comparison-section"
        aria-labelledby="comparison-title"
      >
        <div className="comparison-content">
          <h2 id="comparison-title">অন্যান্য বইয়ের সাথে আমাদের পার্থক্য</h2>
          <img
            src={explainerUnderline}
            alt=""
            aria-hidden="true"
            className="comparison-underline"
          />

          <div className="comparison-table comparison-feature-table">
            <div className="comparison-row comparison-header-row">
              <div>বৈশিষ্ট্য</div>
              <div>আমাদের বই</div>
              <div>অন্যান্য বই</div>
            </div>
            {[
              ["অ্যান্ড্রয়েড অ্যাপ", true, false],
              ["ভিডিও লেসন", true, false],
              ["অডিও পডকাস্ট", true, false],
              ["প্রগ্রেস ট্র্যাকার", true, false],
              ["বাংলা অর্থ", true, true],
              ["গ্রামার নোট", true, false],
              ["চেকলিস্ট বক্স", true, false],
              ["পার্টস অব স্পিচ", true, true],
              ["ভোকাল এক্সারসাইজ", true, false],
              ["টাং টুইস্টার", true, false],
              ["অক্সফোর্ড সিকোয়েন্স", true, false],
              ["এক্সাম্পল", true, true],
            ].map(([feature, ours, others]) => (
              <div className="comparison-row" key={feature}>
                <div className="comparison-feature">{feature}</div>
                <div className="comparison-status comparison-ours">
                  <span className="comparison-check">{ours ? "✓" : "×"}</span>
                </div>
                <div className="comparison-status comparison-others">
                  <span
                    className={
                      others
                        ? "comparison-check is-positive"
                        : "comparison-check is-negative"
                    }
                  >
                    {others ? "✓" : "×"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="comparison-legacy-section relative overflow-hidden bg-[#FFFDF7] px-4 py-[70px] sm:px-6 sm:py-[76px] lg:px-8 lg:py-[86.4px]">
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
        decision-header
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

              <span>THE DECISION</span>

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
      decision-title
    mt-[8px]
    w-full
    text-center
    text-[40px]
    font-bold
    leading-[52.53px]
    tracking-[-0.79px]
    text-[#0A1730]
  "
            >
              <span className="font-['Hind_Siliguri'] font-bold">সাধারণ </span>

              <span className="font-['Inter'] font-bold">Word List</span>

              <span className="font-['Hind_Siliguri'] font-bold">
                {" "}
                থেকে এটি কীভাবে আলাদা?
              </span>
            </h2>

            {/* DESCRIPTION */}
            <p
              className="
      decision-description
    mt-[14px]
    w-full
    text-center
    text-[17.6px]
    font-normal
    leading-[30px]
    tracking-[-0.44px]
    text-[#536174]
  "
            >
              <span className="font-['Hind_Siliguri']">সঠিক </span>

              <span className="font-['Inter']">Learning System</span>

              <span className="font-['Hind_Siliguri']">
                {" "}
                কীভাবে আপনার শেখার জার্নি বদলে দিতে পারে, জেনে নিন।
              </span>
            </p>
          </div>

          {/* =========================================================
        TABLE WRAPPER
    ========================================================= */}

          <div
            className="
        decision-table-scroll
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
          decision-table
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

          <div className="decision-mobile-cards">
            {[
              [
                "শব্দ শেখার ক্রম",
                "Oxford 3000 sequence",
                "বিচ্ছিন্ন word list",
              ],
              [
                "বোঝা ও উচ্চারণ",
                "বাংলা অর্থ + উচ্চারণ + Example",
                "সাধারণত meaning-কেন্দ্রিক",
              ],
              [
                "Practice support",
                "App + Audio + Video + Check Box",
                "বইয়ের ভেতরেই সীমিত",
              ],
              [
                "এগিয়ে যাওয়ার cue",
                "Practice ও Progress support",
                "নিজে tracking করতে হয়",
              ],
            ].map(([need, system, usual]) => (
              <article key={need} className="decision-mobile-card">
                <h3>{need}</h3>
                <div className="decision-mobile-card-row decision-mobile-card-system">
                  <span className="decision-mobile-check">✓</span>
                  <p>{system}</p>
                </div>
                <div className="decision-mobile-card-row">
                  <span className="decision-mobile-label">সাধারণ বই</span>
                  <p>{usual}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Section - 10 */}

      {/* =========================================================
    ANDROID COMPANION
========================================================= */}

      {/* Section - 11 */}

      {/* =========================================================
    QUESTIONS, ANSWERED / FAQ
========================================================= */}

      <section
        id="faq"
        className="
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
              className="faq-sidebar
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

                  <span>QUESTIONS, ANSWERED</span>
                </div>
              </div>

              {/* TITLE */}

              <h2
                className="
    m-0
    w-full
    whitespace-nowrap
    font-['Baloo_Da_2']
    text-[40px]
    font-semibold
    leading-[67px]
    tracking-[0.367031px]
    text-[#071229]
  "
              >
                সাধারণ প্রশ্ন ও উত্তর
              </h2>

              <img
                src={explainerUnderline}
                alt=""
                aria-hidden="true"
                className="faq-title-underline"
              />

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
                  onClick={() => setExpandedIndex(expandedIndex === 0 ? -1 : 0)}
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
                      Oxford 3000 Vocabulary Book-এর সঙ্গে Dedicated Android
                      App, Audio, Video Lesson, Practice এবং Progress Support
                      থাকছে।
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
                  onClick={() => setExpandedIndex(expandedIndex === 1 ? -1 : 1)}
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
                    মোট মূল্য কত? ডেলিভারি কি ফ্রি?
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
                      মোট মূল্য ৳৪৯৯। সারা দেশে ডেলিভারি ফ্রি।
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
                  onClick={() => setExpandedIndex(expandedIndex === 2 ? -1 : 2)}
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
                    অ্যাপ কি অ্যান্ড্রয়েডের জন্য?
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
                      হ্যাঁ, বর্তমানে Appটি শুধু Android ফোনের জন্য উপলভ্য। তবে
                      খুব শিগগিরই iOS-এর জন্যও চালু করা হবে।
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
                  onClick={() => setExpandedIndex(expandedIndex === 3 ? -1 : 3)}
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
                      না। পরীক্ষার প্রস্তুতির পাশাপাশি স্পোকেন ইংলিশ, আইইএলটিএস
                      এবং দৈনন্দিন ব্যবহারের জন্য শব্দের অর্থ, উচ্চারণ ও
                      এক্সাম্পল বুঝতে এটি সাজানো হয়েছে।
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
                  onClick={() => setExpandedIndex(expandedIndex === 4 ? -1 : 4)}
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
                    আমি একদম বিগিনার হলে শুরু করতে পারব?
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
                      অক্সফোর্ড ক্রম, বাংলা অর্থ ও উচ্চারণ এবং ধাপে ধাপে লার্নিং
                      লুপ থাকায় বিগিনারও শুরু করতে পারবেন।
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
                  onClick={() => setExpandedIndex(expandedIndex === 5 ? -1 : 5)}
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
                      শুধু আপনার নাম, মোবাইল নম্বর ও ঠিকানা দিন। বই পাঠানোর আগে
                      আমাদের টিম ফোন করে অর্ডারটি নিশ্চিত করবে।
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
                  onClick={() => setExpandedIndex(expandedIndex === 6 ? -1 : 6)}
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
                      0140-545-8800-2 নম্বরে কল করে সাপোর্ট-এর সঙ্গে কথা বলতে
                      পারেন।
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
          <div className="grid h-[68px] w-[68px] place-self-center place-items-center rounded-full border border-[#f8c94b]">
            <svg
              viewBox="0 0 32 32"
              className="h-7 w-7 text-[#f8c94b]"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M16 3.5 26 7v7.3c0 6.2-4.1 11.5-10 14.2C10.1 25.8 6 20.5 6 14.3V7l10-3.5Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="m11.5 15.8 3 3 6-6"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
            </svg>
          </div>
          <div className="min-w-0">
            <div className="font-['Inter'] text-[12px] font-bold leading-[16.2px] tracking-[1.56px] text-[#f8c94b]">
              YOUR CONFIDENCE, PROTECTED
            </div>
            <h2 className="mt-1 font-['Hind_Siliguri'] text-[clamp(1.7rem,3vw,2.15rem)] font-bold leading-tight text-white">
              ১০০% মানি-ব্যাক গ্যারান্টি
            </h2>
            <p className="mt-1 font-['Hind_Siliguri'] text-sm leading-6 text-white/65">
              বইটি হাতে নিয়ে নিশ্চিন্তে দেখুন। কোনো কারণে সন্তুষ্ট না হলে
              আমাদের জানালেই ১০০% টাকা ফেরত।
            </p>
          </div>
          <a
            href="tel:01405458800"
            className="flex min-h-[80px] items-center justify-center rounded-[14px] bg-[#f8c94b] px-5 py-3 text-center font-['Hind_Siliguri'] text-sm font-bold leading-5 text-[#071229] transition hover:bg-[#ffd86d] lg:min-h-0"
          >
            <span>
              <span className="block text-xs font-normal">
                কোনো প্রশ্ন আছে?
              </span>
              <span className="block text-[1rem] font-bold">
                0140-545-8800-2
              </span>
              <span className="block text-xs font-normal">কল করে কথা বলুন</span>
            </span>
          </a>
        </div>
      </section>

      {/* Section - 11 */}

      {/* =========================================================
    FINAL OFFER / ORDER SECTION
========================================================= */}
      <section
        id="order"
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
            className="order-copy
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
              আগে বই বুঝে নিন তার পরে
              <br />
              টাকা দিন
            </h2>

            <img
              src={explainerUnderline}
              alt=""
              aria-hidden="true"
              className="checkout-title-underline"
            />

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
              <span className="order-promise-full block whitespace-nowrap">
                সারা দেশে ক্যাশ অন ডেলিভারি — ফ্রি ডেলিভারি
              </span>
              <span className="order-promise-short hidden whitespace-nowrap font-normal">
                ক্যাশ অন ডেলিভারি · ফ্রি ডেলিভারি
              </span>
            </p>

            {/* =================================================
          BENEFIT CARDS
      ================================================= */}
            <div
              className="order-benefit-grid
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
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
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
                  Oxford 3000 Vocab বই +
                  <br />
                  Dedicated Android App
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
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
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
                  Audio, Video, Practice ও
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
                <svg width="19.2" height="19.2" viewBox="0 0 24 24" fill="none">
                  <rect
                    x="3"
                    y="6"
                    width="18"
                    height="12"
                    rx="2"
                    stroke="#F8C94B"
                    strokeWidth="1.75"
                  />

                  <path d="M3 10H21" stroke="#F8C94B" strokeWidth="1.75" />

                  <path d="M12 10V18" stroke="#F8C94B" strokeWidth="1.75" />

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
            onSubmit={handleSubmit}
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
        max-[520px]:p-[16px]
  "
          >
            <div className="flex flex-col gap-[16.17px] max-[520px]:gap-[10px]">
              {/* =================================================
            DELIVERY RIBBON
        ================================================= */}
              <div
                className="order-delivery-ribbon
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
            max-[520px]:h-[38px]
            max-[520px]:px-[5px]
            max-[520px]:py-0
            max-[520px]:flex-row
            max-[520px]:gap-[5px]
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
              max-[520px]:whitespace-normal
              max-[520px]:text-center
            "
                >
                  সারা দেশে ক্যাশ অন ডেলিভারি — ফ্রি ডেলিভারি
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
            max-[520px]:min-h-[126px]
            max-[520px]:px-[12px]
            max-[520px]:py-[12px]
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
                      অক্সফোর্ড ৩০০০ ভোকাব + অ্যাপ
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
                      ৳৪৯৯
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="mt-[10px] border-t border-[#DFD4BF]" />

                {/* Price details */}
                <div
                  className="order-price-details
              mt-[9px]
              flex
              items-center
              justify-start
              gap-[8px]
              font-['Hind_Siliguri']
              text-[12.16px]
              leading-[17px]
              text-[#4D5A6B]
            "
                >
                  <span>বই ৳৪৯৯ · ডেলিভারি ফ্রি</span>
                </div>

                {/* COD chip */}
                <div
                  className="order-cod-chip
              mt-[14px]
              inline-flex
              h-[25.22px]
              items-center
              justify-center
              rounded-full
              bg-[rgba(248,201,75,0.15)]
              px-[8.96px]
              py-[5.12px]
              flex
              w-fit
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
                      আপনার নাম <span className="text-[#C0392B]">*</span>
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="আপনার পূর্ণ নাম"
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
                  max-[520px]:mt-[2px]
                  max-[520px]:h-[42px]
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
                      মোবাইল নম্বর <span className="text-[#C0392B]">*</span>
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
                  max-[520px]:mt-[2px]
                  max-[520px]:h-[42px]
                "
                    />
                  </div>
                </div>

                {/* DISTRICT */}
                <div className="mt-[13px] max-[520px]:mt-[10px]">
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
                    জেলা / এলাকা <span className="text-[#C0392B]">*</span>
                  </label>

                  <input
                    id="district"
                    name="district"
                    type="text"
                    placeholder="জেলা / এলাকা লিখুন"
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
                max-[520px]:mt-[2px]
                max-[520px]:h-[42px]
              "
                  />
                </div>

                {/* FULL ADDRESS */}
                <div className="mt-[13px] max-[520px]:mt-[10px]">
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
                    সম্পূর্ণ ঠিকানা <span className="text-[#C0392B]">*</span>
                  </label>

                  <textarea
                    id="address"
                    name="address"
                    rows={3}
                    placeholder="বাড়ি, রোড, থানা সহ সম্পূর্ণ ঠিকানা"
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
                max-[520px]:mt-[2px]
                max-[520px]:h-[68px]
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
                <span>অর্ডার কনফার্ম করুন</span>

                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
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
                আপনার তথ্য শুধু ডেলিভারির জন্য ব্যবহার হবে।
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* =========================================================
          FOOTER
      ========================================================= */}

      <Footer />
    </main>
  );
}

export default App;
