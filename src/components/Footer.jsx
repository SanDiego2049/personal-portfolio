import {
  Instagram,
  Github,
  Youtube,
  Linkedin,
  Palette,
  Twitter,
} from "lucide-react";
import logo from "../assets/portfolio_favicon.svg";

const Footer = () => {
  const socialLinks = [
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://www.instagram.com/san.diego_2049/",
    },
    {
      name: "GitHub",
      icon: Github,
      href: "https://www.github.com/sandiego2049",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://www.linkedin.com/in/oreoluwa-alaba-5240b1219",
    },
    {
      name: "YouTube",
      icon: Youtube,
      href: "https://www.youtube.com/@oreoluwaalaba5908",
    },
    {
      name: "Figma",
      icon: Palette,
      href: "https://www.figma.com/files/team/1096493476351494439/recents-and-sharing?fuid=1096493467193411164",
    },
    {
      name: "Twitter",
      icon: Twitter,
      href: "https://x.com/Sandiego2049",
    },
  ];

  const currentYear = new Date().getFullYear();
  const madeYear = 2025;

  return (
    <footer id="socials" className="min-h-full px-6 sm:px-8 md:px-12 py-8">
      <div className="max-w-8xl mx-auto flex flex-col items-center">
        {/* Top Section: Follow Me and Social Icons */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full mb-10 sm:mb-12 md:mb-16 text-center md:text-left">
          <div className="md:w-1/2 lg:w-2/3">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-4 md:mb-0">
              Check Out My Socials
            </h2>
            {/* Tagline */}
            <p className="text-base sm:text-lg text-gray-400 max-w-sm sm:max-w-md md:max-w-xl lg:max-w-2xl mx-auto md:mx-0 mb-8 sm:mb-12 md:mb-0">
              Stay tuned for the latest design trends and development insights!
            </p>
          </div>
          {/* Social Icons */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-6 flex-shrink-0">
            {socialLinks.map((social) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full border dark:border-white flex items-center justify-center hover:bg-purple-500 hover:text-white transition-colors duration-300"
                >
                  <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Bottom Section: Logo and Copyright */}
        <div className="border-t border-gray-700 pt-6 sm:pt-8 flex flex-col md:flex-row items-center justify-between w-full text-center md:text-left">
          {/* Logo/Name */}
          <div className="flex items-center mb-4 md:mb-0">
            {/* Logo */}
            <div className="flex-shrink-0 mr-1">
              <img width={25} height={25} src={logo} alt="My Logo" />
            </div>

            <span className="text-lg sm:text-xl font-bold">Sandiego2049</span>
          </div>
          <p className="text-xs sm:text-sm text-gray-500">
            Copyright &copy; {madeYear}
            {currentYear > madeYear ? `- ${currentYear}` : ""} Oreoluwa Alaba
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
