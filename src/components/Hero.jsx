import { useLayoutEffect, useRef } from "react";
import { Mail, Download } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "./SplitText";
import bg_image from "../assets/—Pngtree—developers are coding programs on_14867886.png";
import coverLetter from "../assets/Oreoluwa Alaba Cover Letter.pdf";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Container entrance
      gsap.from(".hero-container", {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
      });

      // Buttons hover (magnetic-ish feel)
      gsap.utils.toArray(".hero-button").forEach((btn) => {
        gsap.set(btn, { willChange: "transform" });

        const hover = gsap.to(btn, {
          scale: 1.05,
          duration: 0.3,
          paused: true,
          ease: "power1.out",
        });

        btn.addEventListener("mouseenter", () => hover.play());
        btn.addEventListener("mouseleave", () => hover.reverse());
      });

      // Background image parallax
      gsap.to(".hero-bg", {
        scale: 1.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    const navHeight = document.querySelector("nav")?.offsetHeight || 80;
    if (el) {
      const offset = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: offset - navHeight - 20, behavior: "smooth" });
    }
  };

  const handleResumeDownload = () => {
    const link = document.createElement("a");
    link.href = coverLetter;
    link.download = "Oreoluwa_Alaba_Cover_Letter.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="min-h-[calc(100vh+80px)] flex items-center justify-center p-4 overflow-hidden relative"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0 flex justify-center items-center">
        <img
          src={bg_image}
          alt="Oreoluwa Alaba Avatar"
          className="hero-bg w-[400px] h-[400px] md:w-[600px] md:h-[600px] object-cover opacity-30 md:opacity-50"
        />
      </div>

      {/* Foreground */}
      <div className="hero-container relative z-10 max-w-6xl mx-auto text-center flex flex-col items-center justify-center w-full">
        {/* Name */}
        <h1 className="text-4xl md:text-6xl lg:text-9xl font-extrabold mb-8 text-neutral-900 dark:text-white">
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
        </h1>

        {/* Tagline */}
        <p className="text-2xl md:text-4xl font-semibold mb-12 text-neutral-800 dark:text-neutral-200">
          Designing Systems. Building Interfaces. Engineering Experiences.
        </p>

        {/* CTA buttons */}
        <div className="w-full px-10 sm:px-0 flex flex-col sm:flex-row justify-between gap-4 max-w-xl">
          <button
            onClick={() => scrollToSection("contact")}
            className="hero-button w-full sm:w-1/2 cursor-pointer flex items-center justify-center gap-3 px-6 py-4 rounded-full bg-white text-black text-lg font-semibold shadow-lg border border-gray-200"
          >
            <Mail className="w-6 h-6" />
            Get in touch
          </button>
          <button
            onClick={handleResumeDownload}
            className="hero-button w-full sm:w-1/2 cursor-pointer flex items-center justify-center gap-3 px-6 py-4 rounded-full bg-black text-white text-lg font-semibold shadow-lg border border-gray-700"
          >
            <Download className="w-6 h-6" />
            Learn more
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
