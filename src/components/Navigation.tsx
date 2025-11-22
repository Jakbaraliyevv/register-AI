import { useState } from "react";
import { Menu, X, UserPlus } from "lucide-react@0.487.0";
import { RegistrationModal } from "./RegistrationModal";
import { useModal } from "../context/context";
import { Link } from "react-router-dom";
import logo from "../assets/dg.png";
export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { showRegister, setShowRegister } = useModal();
  // const [language, setLanguage] = useState("UZ");

  const navLinks = ["Haqida", "Manzil", "Homiylar", "Bog‘lanish"];
  // const languages = [

  // ];

  // 'Nutqchilar' "Jadval",

  const scrollToSection = (section: string) => {
    const id = section.toLowerCase();
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const scrollToSectionMobile = (section: string) => {
    setIsMenuOpen(false);
    setTimeout(() => {
      const id = section.toLowerCase();
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-purple-500/20 transition-all ">
      <div className="px-20 w-[70%] px-8">
        <div className=" mx-auto flex items-center justify-between h-20">
          {/* Logo */}
          <div className="cursor-pointer flex items-center gap-2">
            <Link to="/">
              <img src={logo} alt="Logo" className="h-12" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <div
                key={link}
                onClick={() => scrollToSection(link)}
                className="text-gray-300 transition-colors duration-200 cursor-pointer"
              >
                {link}
              </div>
            ))}
          </div>

          {/* Desktop CTA + Language */}
          <div className="btnn">
            <a href="/nizom.pdf" target="_blank" rel="noopener noreferrer">
              Nizomni ko‘rish
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-white p-2"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-black/95 border-t border-purple-500/20 transition-all duration-300">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => scrollToSectionMobile(link)}
                className="block w-full text-left text-gray-300 hover:text-purple-400 py-2 transition-colors duration-200"
              >
                {link}
              </button>
            ))}

            <div className="flex gap-2 py-2">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-3 py-1 rounded-full ${
                    language === lang
                      ? "bg-purple-600 text-white"
                      : "bg-purple-900/30 text-gray-400"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                setShowRegister(true);
                setIsMenuOpen(false);
              }}
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-full text-white flex items-center justify-center gap-2 transition-all duration-200"
            >
              <UserPlus size={18} />
              Ro‘yxatdan o‘tish
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
