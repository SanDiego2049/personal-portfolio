import { useState, useEffect } from "react"; 
import AccordionItem from "./AccordionItem";

const Services = () => {
  const [openServiceId, setOpenServiceId] = useState(null);
  const [isMobile, setIsMobile] = useState(false); 

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

  // Toggle function for the service accordion
  const toggleServiceAccordion = (serviceId) => {
    setOpenServiceId(openServiceId === serviceId ? null : serviceId);
  };

  const [isExpanded, setIsExpanded] = useState(false);

  // The full text content
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

  // Define different truncation points based on screen size
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

  // Effect to determine if it's a mobile screen
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); 
    };

    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Choose truncation point based on screen size
  const currentTruncationPoint = isMobile
    ? smallScreenTruncationPoint
    : defaultTruncationPoint;

  const truncatedDescription =
    fullDescription.substring(0, currentTruncationPoint) + "...";

  return (
    <section
      id="about"
      className="min-h-full mb-16 px-6 sm:px-8 md:px-12 flex flex-col lg:flex-row lg:items-start items-center justify-center"
    >
      {/* Left Section: Title and Description */}
      <div className="md:w-3/4 p-4 text-center md:text-left mb-12 md:mb-0">
        <div className="flex items-center justify-center lg:justify-start mb-4">
          <span className="hidden md:flex text-4xl mr-2">✨</span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
            Services That I Offer
          </h2>
        </div>
        {/* Paragraph with Read More functionality */}
        <p className="text-base sm:text-lg md:text-xl text-gray-400 mx-auto md:mx-0 leading-snug text-justify">
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
      {/* Right Section: Services List using AccordionItem for consistent styling */}
      <div className="md:w-1/2 p-4 w-full">
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
