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
    <footer
      id="socials"
      className="px-6 mt-16 sm:px-10 md:px-16 py-12 bg-black/90 backdrop-blur-md border-t border-gray-800"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center space-y-16">
        {/* Top Text */}
        <div className="text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight leading-tight">
            Let's Connect Online
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Follow me on social media to get my latest design and dev
            experiments, tutorials, and inspirations.
          </p>
        </div>

        {/* Social Icons */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
          {socialLinks.map(({ name, icon: Icon, href }) => (
            <a
              key={name}
              href={href}
              aria-label={name}
              target="_blank"
              rel="noopener noreferrer"
              className="group w-14 h-14 sm:w-16 sm:h-16 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 flex items-center justify-center hover:scale-110 backdrop-blur-sm"
            >
              <Icon className="w-6 h-6 text-white group-hover:text-purple-400 transition-colors duration-300" />
            </a>
          ))}
        </div>

        {/* Footer Bottom */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-gray-700 text-center md:text-left text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <img src={logo} alt="Logo" width={22} height={22} />
            <span className="font-semibold tracking-wide text-white">
              Sandiego2049
            </span>
          </div>
          <p>
            &copy; {madeYear}
            {currentYear > madeYear ? ` – ${currentYear}` : ""} Oreoluwa Alaba.
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
