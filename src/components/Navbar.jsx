import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Menu, X, Download } from "lucide-react";
import resume from "../assets/Oreoluwa Alaba Resume.pdf";
import logo from "../assets/portfolio_favicon.svg";
import ThemeToggle from "./ThemeToggle";

gsap.registerPlugin(ScrollTrigger);

const menuItems = [
  { id: "hero", label: "home" },
  { id: "services", label: "about" },
  { id: "projects", label: "projects" },
  { id: "contact", label: "contact" },
  { id: "socials", label: "socials" },
];

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [isOpen, setIsOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  // GSAP animation on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.from(".nav-logo", {
        opacity: 0,
        y: 0,
        duration: 0.6,
      });

      tl.from(".nav-link", {
        opacity: 0,
        y: -10,
        duration: 0.4,
        stagger: 0.1,
      });

      if (window.innerWidth >= 768) {
        tl.from(".resume-btn", {
          opacity: 0,
          y: 0,
          duration: 0.4,
        });
      }
    });

    return () => ctx.revert();
  }, []);

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const offset = 100;
      const current = menuItems.find((section) => {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= offset && rect.bottom >= offset;
        }
        return false;
      });
      if (current) setActiveSection(current.id);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animate mobile menu with GSAP
  useEffect(() => {
    if (!mobileMenuRef.current) return;

    if (isOpen) {
      gsap.fromTo(
        mobileMenuRef.current,
        { height: 0, opacity: 0, display: "none" },
        {
          height: "auto",
          opacity: 1,
          display: "block",
          duration: 0.4,
          ease: "power2.out",
        }
      );
    } else {
      gsap.to(mobileMenuRef.current, {
        height: 0,
        opacity: 0,
        display: "none",
        duration: 0.3,
        ease: "power2.inOut",
      });
    }
  }, [isOpen]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const navHeight = document.querySelector("nav")?.offsetHeight || 80;
      const offsetTop = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: offsetTop - navHeight - 10, behavior: "smooth" });
      setIsOpen(false);
    }
  };

  const handleResumeDownload = () => {
    const link = document.createElement("a");
    link.href = resume;
    link.download = "Oreoluwa_Alaba_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 shadow-md transition-all">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("hero")}
            aria-label="Scroll to top"
            className="nav-logo"
          >
            <img src={logo} alt="Logo" className="w-10 h-10" />
          </button>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`nav-link cursor-pointer relative uppercase text-sm font-medium transition-colors duration-300 ${
                  activeSection === item.id
                    ? "text-black dark:text-white"
                    : "text-gray-400 hover:text-black dark:hover:text-white"
                }`}
              >
                <span className="relative z-10">{item.label}</span>
                {activeSection === item.id && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black dark:bg-white rounded" />
                )}
              </button>
            ))}
            <ThemeToggle />
          </div>

          {/* Resume Button (Desktop) */}
          <div className="hidden lg:flex items-center">
            <button
              onClick={handleResumeDownload}
              className="resume-btn cursor-pointer group flex items-center gap-2 bg-black text-white dark:bg-white dark:text-black px-4 py-2 rounded-full text-sm font-semibold hover:scale-105 transition-transform"
            >
              Resume
              <Download className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-black dark:text-white"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (always rendered, animated with GSAP) */}
      <div
        ref={mobileMenuRef}
        className="lg:hidden overflow-hidden px-6 pt-4 pb-8 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800"
        style={{ display: "none", height: 0, opacity: 0 }}
      >
        <div className="flex flex-col space-y-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`uppercase cursor-pointer text-sm font-medium text-left ${
                activeSection === item.id
                  ? "text-black dark:text-white"
                  : "text-gray-400 hover:text-black dark:hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}

          <button
            onClick={handleResumeDownload}
            className="mt-6 cursor-pointer w-full flex items-center justify-center gap-2 bg-black text-white dark:bg-white dark:text-black py-3 rounded-full text-sm font-medium hover:scale-105 transition-transform"
          >
            Resume
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
