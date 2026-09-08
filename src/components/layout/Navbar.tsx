import { useEffect, useState, useRef, useCallback } from "react";

import { styles } from "../../constants/styles";
import { navLinks } from "../../constants";
import { logo, menu, close } from "../../assets";
import { config } from "../../constants/config";
import ThemeToggle from "./ThemeToggle";

type NavbarProps = {
  activeSection?: string | null;
  contactOpen?: boolean;
};

const Navbar = ({ activeSection = null, contactOpen = false }: NavbarProps) => {
  const [active, setActive] = useState<string | null>("home");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const rafRef = useRef<number>(0);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) return;

      rafRef.current = requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        lastScrollY.current = scrollTop;

        setScrolled(scrollTop > 100);
        if (scrollTop <= 100) {
          setActive("home");
        }

        const sections = document.querySelectorAll("section[id]");
        sections.forEach((current) => {
          const sectionId = current.getAttribute("id");
          // @ts-ignore
          const sectionHeight = current.offsetHeight;
          const sectionTop =
            current.getBoundingClientRect().top - sectionHeight * 0.2;

          if (sectionTop < 0 && sectionTop + sectionHeight > 0) {
            setActive(sectionId);
          }
        });

        rafRef.current = 0;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const handleLogoClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const displayedActive = activeSection ?? (contactOpen ? "contact" : active);

  return (
    <nav
      aria-label="Main Navigation"
      className={`${
        styles.paddingX
      } fixed top-0 z-20 flex w-full items-center py-5 transition-all duration-500 ${
        scrolled
          ? "nav-scrolled backdrop-blur-xl border-b shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between">
        <a
          href="#"
          className="flex items-center gap-2 group"
          aria-label={`${config.html.title} - Back to top`}
          onClick={(e) => {
            e.preventDefault();
            handleLogoClick();
          }}
        >
          <div className="relative">
            <img src={logo} alt="" className="h-9 w-9 object-contain transition-transform duration-300 group-hover:scale-110" />
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ boxShadow: '0 0 15px rgba(0, 240, 255, 0.4)' }} />
          </div>
          <p className="flex cursor-pointer text-[18px] font-bold text-white group-hover:text-accent-cyan transition-colors duration-300">
            {config.html.title}
          </p>
        </a>

        <ul className="hidden list-none flex-row gap-10 sm:flex">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`nav-underline ${
                displayedActive === nav.id ? "active" : ""
              } cursor-pointer text-[16px] font-medium transition-all duration-300 ${
                displayedActive === nav.id
                  ? "nav-link-active"
                  : "text-secondary hover:text-white"
              }`}
            >
              <a href={`#${nav.id}`} data-nav-link="true">
                {nav.title}
              </a>
            </li>
          ))}
        </ul>

        {/* Theme toggle — desktop */}
        <div className="hidden sm:flex items-center ml-6 pl-6" style={{ borderLeft: '1px solid rgba(255,255,255,0.08)' }}>
          <ThemeToggle />
        </div>

        <div className="flex flex-1 items-center justify-end sm:hidden">
          <button
            type="button"
            className="flex items-center justify-center p-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-cyan/50"
            aria-label={toggle ? "Close Navigation Menu" : "Open Navigation Menu"}
            aria-expanded={toggle}
            onClick={() => setToggle(!toggle)}
          >
            <img
              src={toggle ? close : menu}
              alt=""
              className="h-[28px] w-[28px] object-contain cursor-pointer"
            />
          </button>

          {/* Mobile menu with glassmorphism */}
          <div
            className={`${
              !toggle ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"
            } absolute right-0 top-20 z-10 mx-4 my-2 min-w-[200px] rounded-2xl p-6 transition-all duration-300 origin-top-right`}
            style={{
              background: 'rgba(12, 10, 30, 0.9)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(0, 240, 255, 0.1)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 30px rgba(0, 240, 255, 0.05)',
            }}
          >
            <ul className="flex flex-1 list-none flex-col items-start justify-end gap-4">
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`cursor-pointer text-[16px] font-medium transition-colors duration-200 ${
                    displayedActive === nav.id ? "text-accent-cyan" : "text-secondary hover:text-white"
                  }`}
                  onClick={() => {
                    setToggle(false);
                  }}
                >
                  <a href={`#${nav.id}`} data-nav-link="true">{nav.title}</a>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

