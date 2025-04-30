import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { FiGithub, FiLinkedin } from 'react-icons/fi';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Determine active section based on scroll position
      const sections = navLinks.map(link => link.href.substring(1));
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled ? 'bg-gray-900/90 backdrop-blur-md py-3 shadow-lg shadow-black/30' : 'bg-transparent py-6'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <motion.div 
          className="text-xl font-bold text-white flex items-center"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <a href="#home" className="flex items-center">
            <span className="text-indigo-500 mr-2">&lt;</span>
            <span>Ghanshyam</span>
            <span className="text-indigo-500">/&gt;</span>
          </a>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              className={`relative py-2 transition-colors ${
                activeSection === link.href.substring(1) 
                  ? 'text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              {link.name}
              {activeSection === link.href.substring(1) && (
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500"
                  layoutId="activeSection"
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.a>
          ))}

          
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <motion.button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden absolute top-full left-0 right-0 bg-gray-900 shadow-xl"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="py-4 px-6 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className={`text-lg py-2 ${
                    activeSection === link.href.substring(1) 
                      ? 'text-indigo-400' 
                      : 'text-gray-300'
                  }`}
                  onClick={() => setIsOpen(false)}
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  {link.name}
                </motion.a>
              ))}
              <div className="flex space-x-6 pt-2">
                <a 
                  href="https://github.com/ghanshyamhadiya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <FiGithub size={22} />
                </a>
                <a 
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <FiLinkedin size={22} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;