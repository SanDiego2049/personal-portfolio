import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const AccordionItem = ({
  id,
  title,
  isOpen,
  onToggle,
  children,
  type = "project",
}) => {
  return (
    <div className="border-b border-gray-700 py-6">
      <button
        className="cursor-pointer flex items-center justify-between w-full text-left focus:outline-none"
        onClick={() => onToggle(id)}
      >
        <div className="flex items-center">
          <span className="text-xl sm:text-2xl md:text-3xl font-light text-gray-500 mr-2 sm:mr-4">
            {id}/
          </span>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold break-words pr-2">
            {title}
          </h3>
        </div>
        <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-white text-black flex items-center justify-center shadow-lg hover:bg-gray-200 transition-colors duration-300 flex-shrink-0">
          {isOpen && type === "project" ? (
            <ArrowDownRight className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10" />
          ) : (
            <ArrowUpRight className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10" />
          )}
        </div>
      </button>

      {type === "project" && (
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? "max-h-[500px]" : "max-h-0"
          }`}
        >
          <div className="mt-4 pl-6 sm:pl-8 md:pl-12 pr-4">{children}</div>
        </div>
      )}
    </div>
  );
};

export default AccordionItem;
