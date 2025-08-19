import { useState } from "react";
import AccordionItem from "./AccordionItem";
import { ArrowUpRight } from "lucide-react";

const LatestProjects = () => {
  const [openProjectId, setOpenProjectId] = useState(null);

  const projectsList = [
    {
      id: "01",
      title: "The BookWorm – Smart Library Management System",
      description:
        "The BookWorm is a modern library management system built to simplify cataloging, automate lending processes, and enhance the reading experience. With real-time tracking, seamless book check-ins/checkouts, and a clean, intuitive interface, it empowers libraries to operate efficiently and serve readers better.",
      link: "https://the-bookworm-library.vercel.app/",
    },

    {
      id: "02",
      title: "Umber – Minimal URL Shortener for Modern Sharing",
      description:
        "Umber is a clean, high-performance URL shortening platform built for modern users who value speed and simplicity. With intuitive link management, trackable analytics, and a fully responsive design, it offers a seamless way to shorten, organize, and share URLs with clarity and control.",
      link: "https://shorter-umber-black.vercel.app/",
    },
    {
      id: "03",
      title: "The Digital Agency – Creative Solutions, Modern Presence",
      description:
        "A sleek, responsive landing page for a forward-thinking digital agency. Built to capture attention and convey credibility, it showcases services, values, and brand personality with bold visuals, smooth animations, and a strategic content layout that converts visitors into clients.",
      link: "https://the-digital-agency.vercel.app/",
    },
    {
      id: "04",
      title: "Ryde™ – Seamless Car Rentals, Anytime, Anywhere",
      description:
        "A modern web experience for CR Rentals, Ryde™ allows users to effortlessly explore, reserve, and manage car rentals across multiple locations. Designed with a mobile-first approach, it ensures a smooth, intuitive journey from vehicle selection to confirmation, empowering travelers with flexibility, transparency, and confidence on the road.",
      link: "https://ryde-car-rentals.vercel.app/",
    },
    {
      id: "05",
      title: "VMS - The Best Visitor Management System",
      description:
        "A smart and secure visitor management system designed to streamline check-ins, enhance workplace security, and provide real-time tracking — all through a clean, user-friendly interface.",
      link: "https://visitor-management-system-beta.vercel.app/",
    },
  ];

  const toggleAccordion = (projectId) => {
    setOpenProjectId(openProjectId === projectId ? null : projectId);
  };

  return (
    <section
      id="projects"
      className="mb-16 px-6 sm:px-10 md:px-16 py-8 flex flex-col items-center"
    >
      {/* Section Title */}
      <div className="relative mb-12 text-center">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold relative inline-block">
          Latest Projects
          <span className="absolute -bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-20 rounded-full"></span>
        </h2>
      </div>

      {/* Projects Accordion List */}
      <div className="w-full max-w-screen-lg space-y-6">
        {projectsList.map((project) => (
          <AccordionItem
            key={project.id}
            id={project.id}
            title={project.title}
            isOpen={openProjectId === project.id}
            onToggle={toggleAccordion}
            type="project"
          >
            <p className="text-base sm:text-lg text-gray-400 mb-4 leading-relaxed">
              {project.description}
            </p>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-purple-500 hover:text-purple-300 font-semibold transition-colors duration-300 text-base sm:text-lg"
            >
              Visit Site
              <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
          </AccordionItem>
        ))}
      </div>

      {/* Explore More Button */}
      <div className="mt-16">
        <a
          href="https://github.com/SanDiego2049?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-2.5 sm:px-8 sm:py-3 rounded-full bg-white text-black text-base sm:text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
        >
          Explore More
        </a>
      </div>
    </section>
  );
};

export default LatestProjects;
