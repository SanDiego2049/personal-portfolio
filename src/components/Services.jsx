import { useState, useEffect, useRef } from "react";
import AccordionItem from "./AccordionItem";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const [openServiceId, setOpenServiceId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const leftRef = useRef(null);
  const rightRef = useRef(null);

  const servicesList = [
    {
      id: "01",
      title: "Frontend Development",
      description:
        "Building interactive and responsive user interfaces, focusing on modern web technologies and user experience.",
    },
    {
      id: "02",
      title: "Low-code Development",
      description:
        "Leveraging low-code/no-code platforms to rapidly develop custom applications and automate workflows, reducing development time and cost.",
    },
    {
      id: "03",
      title: "3D Capabilities",
      description:
        "Creating immersive 3D visualizations, models, and interactive experiences for architectural, product, and conceptual designs.",
    },
  ];

  const fullDescription = `I specialize in transforming concepts into user-friendly digital
    products — whether it’s through responsive frontend development,
    low-code/no-code tools, or architectural 3D rendering. With a unique
    blend of creativity and technical expertise, I build visually
    compelling interfaces, streamline development and create lifelike 3D
    visuals to communicate architectural intent with clarity. From
    startups needing clean, responsive UIs to businesses looking to
    digitize complex workflows without heavy engineering, I help deliver
    value fast — balancing beauty, function, and performance. Whether I’m
    designing a frontend from scratch, integrating with APIs, or crafting
    photo-realistic visualizations of unbuilt spaces, I ensure the
    end-user experience always comes first. If you're looking for someone
    who can speak the language of code, design, and space, I’m your hybrid
    problem-solver.`;

  const smallScreenTruncationPoint =
    fullDescription.indexOf(
      `With a unique blend of creativity and technical expertise, I build visually compelling interfaces, streamline development and create lifelike 3D visuals to communicate architectural intent with clarity.`
    ) +
    `With a unique blend of creativity and technical expertise, I build visually compelling interfaces, streamline development and create lifelike 3D visuals to communicate architectural intent with clarity.`
      .length;

  const defaultTruncationPoint =
    fullDescription.indexOf(
      `From
    startups needing clean, responsive UIs to businesses looking to
    digitize complex workflows without heavy engineering, I help deliver
    value fast — balancing beauty, function and performance.`
    ) +
    `From
    startups needing clean, responsive UIs to businesses looking to
    digitize complex workflows without heavy engineering, I help deliver
    value fast — balancing beauty, function and performance.`.length;

  const currentTruncationPoint = isMobile
    ? smallScreenTruncationPoint
    : defaultTruncationPoint;

  const truncatedDescription =
    fullDescription.substring(0, currentTruncationPoint) + "...";

  const toggleServiceAccordion = (serviceId) => {
    setOpenServiceId(openServiceId === serviceId ? null : serviceId);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // initial
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        opacity: 0,
        x: -50,
        duration: 1,
        scrollTrigger: {
          trigger: leftRef.current,
          start: "top 80%",
        },
      });

      gsap.from(rightRef.current, {
        opacity: 0,
        x: 50,
        duration: 1,
        scrollTrigger: {
          trigger: rightRef.current,
          start: "top 80%",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      className="min-h-full mb-16 px-6 sm:px-8 md:px-12 flex flex-col lg:flex-row items-start justify-center gap-12"
    >
      {/* Left Section: Title + Description */}
      <div
        ref={leftRef}
        className="md:w-3/4 w-full p-4 text-center md:text-left"
      >
        <div className="flex items-center justify-center lg:justify-start mb-4">
          <span className="hidden md:flex text-4xl mr-2">✨</span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
            Services That I Offer
          </h2>
        </div>
        <p className="text-base sm:text-lg md:text-xl text-gray-400 mx-auto md:mx-0 max-w-prose leading-relaxed text-left">
          {isExpanded ? fullDescription : truncatedDescription}
          {fullDescription.length > currentTruncationPoint && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-purple-500 hover:text-purple-300 ml-2 focus:outline-none text-base sm:text-lg"
            >
              {isExpanded ? "Read less" : "Read more"}
            </button>
          )}
        </p>
      </div>

      {/* Right Section: Accordion List */}
      <div ref={rightRef} className="md:w-1/2 w-full p-4">
        <div className="space-y-4">
          {servicesList.map((service) => (
            <AccordionItem
              key={service.id}
              id={service.id}
              title={service.title}
              isOpen={openServiceId === service.id}
              onToggle={toggleServiceAccordion}
              type="project"
            >
              <p className="text-base sm:text-lg text-gray-400 mb-4">
                {service.description}
              </p>
            </AccordionItem>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
