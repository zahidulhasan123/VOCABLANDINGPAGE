import logo from "./images/logo.png";

function Header({
  mobileMenuOpen,
  setMobileMenuOpen,
  activeSection,
  scrollProgress,
}) {
  return (
    <header className="fixed left-0 right-0 top-0 z-[100] h-[80px] min-h-[80px] w-full bg-[#050811] shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
      <div className="mx-auto flex h-[80px] min-h-[80px] w-full max-w-[1152px] items-center justify-between px-4 sm:px-6 lg:px-0">
        
        {/* Logo */}
        <a
          href="/"
          className="flex items-center gap-3"
          aria-label="Homepage"
        >
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

              <div className="whitespace-nowrap text-[0.46rem] uppercase tracking-[0.1em] text-[#f7c84f] sm:text-[0.56rem] sm:tracking-[0.18em]">
                Vocabulary System
              </div>
            </div>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 text-sm text-white/84 xl:flex">
          {[
            ["how-it-works", "কীভাবে কাজ করে"],
            ["book", "বই দেখুন"],
            ["package", "সম্পূর্ণ প্যাকেজ"],
            ["student-stories", "শিক্ষার্থীদের অভিজ্ঞতা"],
            ["android-app", "App দেখুন"],
            ["faq", "প্রশ্নোত্তর"],
          ].map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className={`nav-menu-link whitespace-nowrap rounded-md px-2 py-1 font-medium transition ${
                activeSection === id
                  ? "bg-white/12 text-white"
                  : "hover:text-white"
              }`}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label={
            mobileMenuOpen ? "মেনু বন্ধ করুন" : "মেনু খুলুন"
          }
          aria-expanded={mobileMenuOpen}
          onClick={() =>
            setMobileMenuOpen((open) => !open)
          }
          className="ml-auto grid h-10 w-10 place-items-center rounded-lg border border-white/15 text-white transition hover:bg-white/10 xl:hidden"
        >
          <span className="sr-only">মেনু</span>

          <span className="flex w-5 flex-col gap-1.5">
            <span className="h-0.5 w-full bg-current" />
            <span className="h-0.5 w-full bg-current" />
            <span className="h-0.5 w-full bg-current" />
          </span>
        </button>

        {/* Desktop Order Button */}
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

        {/* Mobile Navigation */}
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
              <a
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className={`nav-menu-link whitespace-nowrap rounded-lg px-3 py-3 font-medium transition ${
                  activeSection === href.slice(1)
                    ? "bg-white/12 text-white"
                    : "hover:bg-white/10 hover:text-white"
                }`}
              >
                {label}
              </a>
            ))}

            <a
              href="#order"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 flex items-center justify-center rounded-xl bg-[#f8c94b] px-4 py-3 font-bold text-[#10172a]"
            >
              এখনই অর্ডার করুন
            </a>
          </nav>
        )}
      </div>

      {/* Scroll Progress */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-[2px] bg-[#f8c94b] transition-[width] duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
    </header>
  );
}

export default Header; 