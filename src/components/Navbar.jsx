import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { FiGithub, FiLinkedin, FiTwitter, FiInstagram } from 'react-icons/fi';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' }
];

const socialLinks = [
  { icon: <FiGithub />, href: 'https://github.com/ghanshyamhadiya', label: 'GitHub', color: 'hover:text-gray-100 group-hover:text-violet-300' },
  { icon: <FiLinkedin />, href: 'https://www.linkedin.com/in/ghanshyam-hadiya-13971b2bb', label: 'LinkedIn', color: 'hover:text-gray-100 group-hover:text-blue-300' },
  { icon: <FiTwitter />, href: 'https://twitter.com', label: 'Twitter', color: 'hover:text-gray-100 group-hover:text-sky-300' },
  { icon: <FiInstagram />, href: 'https://www.instagram.com/ghnshym__00', label: 'Instagram', color: 'hover:text-gray-100 group-hover:text-pink-300' }
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

  // Enhanced animations with better transitions
  const navbarVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.5, 
        ease: [0.22, 1, 0.36, 1] 
      }
    }
  };

  // Mobile menu animations
  const menuVariants = {
    closed: { 
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: { 
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.4,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const menuItemVariants = {
    closed: { x: -20, opacity: 0 },
    open: { x: 0, opacity: 1 }
  };

  return (
    <motion.nav 
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-gray-900/95 backdrop-blur-lg py-3 shadow-lg shadow-black/30 border-b border-violet-900/30' 
          : 'bg-transparent py-5'
      }`}
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <motion.div 
          className="text-xl font-bold text-white flex items-center"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <a href="#home" className="flex items-center">
            <motion.span 
              className="text-violet-400 mr-1"
              animate={{ 
                opacity: [1, 0.7, 1],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 2.5, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              &lt;
            </motion.span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-indigo-400">Ghanshyam</span>
            <motion.span 
              className="text-violet-400 ml-1"
              animate={{ 
                opacity: [1, 0.7, 1],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 2.5, 
                repeat: Infinity,
                repeatType: "reverse",
                delay: 0.2
              }}
            >
              /&gt;
            </motion.span>
          </a>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center">
          <div className="flex space-x-6 mr-6">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                className={`relative py-2 px-1 text-base font-medium transition-colors ${
                  activeSection === link.href.substring(1) 
                    ? 'text-white' 
                    : 'text-gray-300 hover:text-white'
                }`}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                {link.name}
                {activeSection === link.href.substring(1) && (
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-violet-500 to-indigo-500"
                    layoutId="activeNavSection"
                    transition={{ duration: 0.3, type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.a>
            ))}
          </div>

          {/* Social Icons for Desktop */}
          <div className="flex space-x-4 border-l border-gray-700 pl-6">
            {socialLinks.slice(0, 3).map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-gray-400 ${social.color} group transition-colors p-2 rounded-full hover:bg-gray-800/70`}
                whileHover={{ y: -2, scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                aria-label={social.label}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <motion.button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-200 focus:outline-none p-2 rounded-lg hover:bg-gray-800/70"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden absolute top-full left-0 right-0 bg-gray-900/95 backdrop-blur-lg shadow-xl border-t border-violet-900/30 overflow-hidden"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="py-6 px-6">
              <div className="flex flex-col space-y-4 mb-6">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    className={`text-lg py-3 px-2 rounded-lg transition-colors ${
                      activeSection === link.href.substring(1) 
                        ? 'text-white bg-gray-800/70 border-l-4 border-violet-500 pl-4' 
                        : 'text-gray-300 hover:bg-gray-800/40 hover:pl-2'
                    }`}
                    onClick={() => setIsOpen(false)}
                    variants={menuItemVariants}
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>
              
              {/* Social links for mobile */}
              <motion.div 
                className="grid grid-cols-4 gap-4 pt-4 border-t border-gray-800"
                variants={menuItemVariants}
              >
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center p-3 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-800/70"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-xl mb-1">{social.icon}</span>
                    <span className="text-xs">{social.label}</span>
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
