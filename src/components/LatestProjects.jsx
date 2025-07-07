import { useState } from "react";
import AccordionItem from "./AccordionItem";
import { ArrowUpRight } from "lucide-react";

const LatestProjects = () => {
  const [openProjectId, setOpenProjectId] = useState(null);

  const projectsList = [
    {
      id: "01",
      title: "Umber - A Modern URL Shortener",
      description:
        "A sleek and efficient URL shortening platform designed for simplicity and speed. Users can shorten long links, manage them in one place, and share clean, trackable URLs effortlessly through a responsive and user-friendly interface.",
      link: "https://shorter-umber-black.vercel.app/",
    },
    {
      id: "02",
      title: "Task App - A Simple Task Management App",
      description:
        "A modern and intuitive task management application designed to boost productivity through a clean interface, seamless interactions, and a focus on simplicity and efficiency.",
      link: "https://task-managerial-app.vercel.app/",
    },
    {
      id: "03",
      title: "Currency Converter - Monitor Your Currency Changes",
      description:
        "A mobile application designed to help users convert currencies in real-time, track exchange rates, and make informed financial decisions with ease and accuracy.",
      link: "https://currency-converter-eta-seven.vercel.app/",
    },
    {
      id: "04",
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
      className="mb-12 px-6 sm:px-8 md:px-12 py-8 font-inter flex flex-col items-center"
    >
      {/* Section Title */}
      <div className="text-center mb-10 sm:mb-12 md:mb-16">
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight relative inline-block">
          Latest Projects
          {/* Decorative underline/element */}
          <span className="absolute bottom-0 left-0 w-full h-1.5 sm:h-2 bg-gradient-to-r from-purple-500 to-blue-500 opacity-30"></span>
        </h2>
      </div>

      {/* Projects Accordion List */}
      <div className="w-full max-w-full sm:max-w-xl md:max-w-3xl lg:max-w-6xl">
        {projectsList.map((project) => (
          <AccordionItem
            key={project.id}
            id={project.id}
            title={project.title}
            isOpen={openProjectId === project.id}
            onToggle={toggleAccordion}
            type="project"
          >
            {/* Content to be rendered inside the accordion */}
            <p className="text-base sm:text-lg text-gray-400 mb-4">
              {project.description}
            </p>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-purple-500 hover:text-purple-300 font-semibold transition-colors duration-300 text-base sm:text-lg"
            >
              Visit Site
              <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
            </a>
          </AccordionItem>
        ))}
      </div>

      {/* Explore More Button */}
      <div className="mt-12 sm:mt-14 md:mt-16">
        <a
          href="https://github.com/sandiego2049"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-2.5 sm:px-8 sm:py-3 rounded-full bg-white text-black text-base sm:text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 inline-block text-center"
        >
          Explore More
        </a>
      </div>
    </section>
  );
};

export default LatestProjects;
