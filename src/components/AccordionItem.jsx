import { ChevronDown } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

const AccordionItem = ({
  id,
  title,
  isOpen,
  onToggle,
  children,
  type = "project",
}) => {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <div className="border-b border-gray-700 py-6">
      <button
        className="w-full flex items-center justify-between text-left group transition-all"
        onClick={() => onToggle(id)}
        aria-expanded={isOpen}
        role="button"
      >
        <div className="flex items-center text-start">
          <span className="text-xl sm:text-2xl md:text-3xl font-light text-gray-500 mr-4">
            {id}/
          </span>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold break-words group-hover:text-purple-400 transition-colors duration-300">
            {title}
          </h3>
        </div>

        <div
          className={`w-12 flex-shrink-0 h-12 sm:w-14 sm:h-14 rounded-full bg-white text-black flex items-center justify-center shadow-xl transition-transform duration-500 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          <ChevronDown className="w-6 h-6 sm:w-7 sm:h-7" />
        </div>
      </button>

      {type === "project" && (
        <div
          ref={contentRef}
          className="overflow-hidden transition-all duration-500 ease-in-out"
          style={{
            maxHeight: `${height}px`,
          }}
        >
          <div className="mt-4 pl-6 sm:pl-8 md:pl-12 pr-4 text-gray-400 text-base sm:text-lg">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default AccordionItem;
