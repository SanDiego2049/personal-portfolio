import { useTheme } from "../contexts/ThemeContext";

const ThemeToggle = ({ className = "" }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`flex items-center gap-2 sm:gap-3 md:gap-4 ${className}`}>
      <span
        className={`uppercase hidden sm:block font-medium text-xs sm:text-sm ${
          theme === "light" ? "dark:text-white" : "text-gray-400"
        }`}
      >
        Light
      </span>

      <div className="sm:hidden flex items-center">
        <span
          className={`text-lg ${
            theme === "light" ? "text-white" : "text-gray-400"
          }`}
        >
          ☀️
        </span>
      </div>

      <button
        onClick={toggleTheme}
        className="relative w-12 h-4 sm:w-14 md:w-16 rounded-full border-2 border-purple-500 bg-transparent transition-all duration-300"
        aria-label={
          theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
        }
      >
        <div
          className={`
            absolute top-0.5 w-4.5 h-2 sm:w-5.5 md:w-6.5 rounded-full
            bg-purple-500 transition-transform duration-300 ease-in-out
            ${
              theme === "dark"
                ? "translate-x-6 sm:translate-x-7 md:translate-x-8"
                : "translate-x-0.5"
            }
          `}
        />
      </button>

      <div className="sm:hidden flex items-center">
        <span
          className={`text-lg ${
            theme === "dark" ? "text-white" : "text-gray-400"
          }`}
        >
          🌙
        </span>
      </div>

      <span
        className={`uppercase hidden sm:block font-medium text-xs sm:text-sm ${
          theme === "dark" ? "text-white" : "text-gray-400"
        }`}
      >
        Dark
      </span>
    </div>
  );
};

export default ThemeToggle;
