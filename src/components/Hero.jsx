import { Mail, Download } from "lucide-react";
import coverLetter from "../assets/Oreoluwa Alaba Cover Letter.pdf";
import SplitText from "./SplitText";
import bg_image from "../assets/—Pngtree—developers are coding programs on_14867886.png";

const Hero = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Get navbar height dynamically
      const navbar = document.querySelector("nav");
      const navbarHeight = navbar ? navbar.offsetHeight : 80;

      // Calculate the target position
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const targetPosition = elementPosition - navbarHeight - 20; // 20px extra padding

      // Smooth scroll to the calculated position
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleResumeDownload = () => {
    const resumeUrl = coverLetter;
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.download = "Oreoluwa_Alaba_Cover_Letter.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="hero"
      className="min-h-[calc(100vh+80px)] flex flex-col items-center justify-center p-4 overflow-hidden"
      style={{
        minHeight: "calc(100vh + var(--navbar-height, 80px))",
      }}
    >
      <div className="max-w-6xl mx-auto text-center relative z-10 w-full h-full flex flex-col justify-center items-center">
        <div className="absolute inset-0 flex justify-center items-center animate-pulse">
          <img
            src={bg_image}
            alt="Oreoluwa Alaba Avatar"
            className=" w-[400px] h-[400px] md:w-[600px] md:h-[600px] object-cover opacity-30 md:opacity-50"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/500x500/000000/FFFFFF?text=👨‍💻";
            }}
          />
        </div>
        <div className="relative z-20 flex flex-col items-center">
          {/* Name */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold mb-8 animate-fade-in">
            <span>
              <SplitText
                text="Oreoluwa Alaba"
                delay={100}
                duration={0.6}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="center"
              />
            </span>
          </h1>
          {/* Title */}
          <p className="text-3xl md:text-5xl dark:text-gray-400 text-gray-600 font-semibold mb-12 animate-slide-up">
            Turning coffee ☕ into code, and ideas 💡 into reality!
          </p>
          <div className="w-full flex flex-col md:flex-row items-center justify-between mb-16">
            <p className="text-2xl md:text-3xl font-medium">
              Frontend Developer.
            </p>
            <p className="text-2xl md:text-3xl font-medium">
              Based in Lagos, Nigeria.
            </p>
          </div>
          {/* CTA buttons */}
          <div className="w-full px-10 sm:px-0 flex flex-col sm:flex-row justify-between animate-slide-up delay-500">
            <button
              onClick={() => scrollToSection("contact")}
              className="lg:w-1/4 cursor-pointer flex items-center justify-center gap-3 px-10 py-4 rounded-full bg-white text-black text-lg font-semibold shadow-xl  transform hover:-translate-y-1 transition-all duration-300 border border-gray-200 mb-5"
            >
              <Mail className="w-6 h-6" />
              Get in touch
            </button>
            <button
              onClick={handleResumeDownload}
              className="lg:w-1/4 cursor-pointer flex items-center justify-center gap-3 px-10 py-4 rounded-full bg-dark text-purple-500 text-lg font-semibold shadow-xl transform hover:-translate-y-1 transition-transform duration-300 border border-purple-500 mb-5"
            >
              <Download className="w-6 h-6" />
              Learn more
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
