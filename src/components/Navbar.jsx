import { useState, useEffect } from "react";
import { Menu, X, Download } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import resume from "../assets/Oreoluwa Alaba Resume.pdf";
import logo from "../assets/portfolio_favicon.svg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const menuItems = [
    { id: "hero", label: "home" },
    { id: "about", label: "about" },
    { id: "projects", label: "projects" },
    { id: "contact", label: "contact" },
    { id: "socials", label: "socials" },
  ];

  // Handle scroll effect for active section
  useEffect(() => {
    const handleScroll = () => {
      // Get navbar height dynamically
      const navbar = document.querySelector("nav");
      const navbarHeight = navbar ? navbar.offsetHeight : 80;
      const offset = navbarHeight + 50;

      // Update active section based on scroll position
      const sections = menuItems.map((item) => item.id);
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= offset && rect.bottom >= offset;
        }
        return false;
      });

      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Get navbar height dynamically
      const navbar = document.querySelector("nav");
      const navbarHeight = navbar ? navbar.offsetHeight : 80;

      // Calculate the target position
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const targetPosition = elementPosition - navbarHeight - 20;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Handle resume download
  const handleResumeDownload = () => {
    const resumeUrl = resume;
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.download = "Oreoluwa_Alaba_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-black">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <img width={40} height={40} src={logo} alt="My Logo" />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`
                    text-sm font-medium transition-all duration-300 relative uppercase
                    ${
                      activeSection === item.id
                        ? "text-black dark:text-white"
                        : "text-gray-400 hover:text-black dark:hover:text-white"
                    }
                  `}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-black dark:bg-white"></div>
                  )}
                </button>
              ))}
              <ThemeToggle />
            </div>

            {/* Desktop Resume Button */}
            <div className="hidden md:flex items-center">
              <button
                onClick={handleResumeDownload}
                className="flex items-center gap-2 text-black dark:text-white font-extrabold py-2 text-md uppercase cursor-pointer transition-colors duration-300 hover:text-purple-500"
              >
                Resume
                <Download size={20} />
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center gap-3">
              <ThemeToggle />
              <button
                onClick={toggleMenu}
                className="p-2 text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300"
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
        <div
          className={`
          md:hidden absolute top-full left-0 right-0 transition-all duration-300 overflow-hidden
          ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
        `}
        >
          <div className="bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800">
            <div className="container mx-auto px-6 py-6">
              <div className="space-y-4">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`
                      block w-full text-sm text-left py-3 font-medium uppercase transition-colors duration-300
                      ${
                        activeSection === item.id
                          ? "text-black dark:text-white"
                          : "text-gray-400 hover:text-black dark:hover:text-white"
                      }
                    `}
                  >
                    {item.label}
                  </button>
                ))}

                {/* Mobile Resume Button */}
                <button
                  onClick={handleResumeDownload}
                  className="w-full flex items-center justify-center gap-2 bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-full font-medium hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors duration-300 mt-6"
                >
                  Resume
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu backdrop */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
