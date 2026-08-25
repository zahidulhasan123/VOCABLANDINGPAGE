import logo from "./images/logo.png";

function Footer() {
  return (
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
              footer-description
              whitespace-nowrap
              font-['Inter']
              text-[13.76px]
              font-normal
              leading-[23px]
              tracking-[-0.131688px]
              text-[#B2BFD0]
            "
          >
            English Commando-এর বই ও digital learning support{" "}
            <span className="footer-description-last">একসাথে।</span>
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
            href="/privacy-policy"
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
  );
}

export default Footer;
