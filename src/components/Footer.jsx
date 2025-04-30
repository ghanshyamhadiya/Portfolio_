import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiInstagram, FiArrowUp, FiMail, FiCode } from 'react-icons/fi';

const Footer = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const currentYear = new Date().getFullYear();
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const socialLinks = [
    { icon: <FiGithub size={20} />, href: 'https://github.com/ghanshyamhadiya', label: 'GitHub' },
    { icon: <FiLinkedin size={20} />, href: 'https://www.linkedin.com/in/ghanshyam-hadiya-13971b2bb?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', label: 'LinkedIn' },
    { icon: <FiTwitter size={20} />, href: 'https://twitter.com', label: 'Twitter' },
    { icon: <FiInstagram size={20} />, href: 'https://www.instagram.com/ghnshym__00?igsh=OTNmcTFmNjFoZWNt', label: 'Instagram' },
    { icon: <FiMail size={20} />, href: 'mailto:ghanshyamhadiya013@gmail.com', label: 'Email' },
    { icon: <FiCode size={20} />, href: '#', label: 'Portfolio' }
  ];

  const footerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.footer 
      className="bg-gradient-to-b from-gray-900 to-black py-16 relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={footerVariants}
    >
      {/* Abstract background shapes */}
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-64 h-64 rounded-full bg-purple-600 blur-3xl"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 rounded-full bg-blue-600 blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-cyan-600 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.button
          onClick={scrollToTop}
          className="w-14 h-14 rounded-full bg-indigo-600 hover:bg-indigo-700 flex items-center justify-center mx-auto mb-10 shadow-lg shadow-indigo-600/30"
          whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(79, 70, 229, 0.4)" }}
          whileTap={{ scale: 0.9 }}
          variants={itemVariants}
        >
          <FiArrowUp className="text-white" size={24} />
        </motion.button>

        <motion.div
          className="text-center mb-10"
          variants={itemVariants}
        >
          <motion.h2 
            className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400 mb-4 inline-block"
            whileHover={{ scale: 1.05 }}
          >
            Ghanshyam Hadiya
          </motion.h2>
          <p className="text-gray-300 max-w-md mx-auto text-lg">
            Building digital experiences with creativity and code.
          </p>
        </motion.div>

        <motion.div 
          className="flex flex-wrap justify-center gap-6 mb-12"
          variants={itemVariants}
        >
          {socialLinks.map((link, index) => (
            <motion.div
              key={index}
              className="relative"
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <motion.a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:text-white transition-all duration-300 border border-gray-700"
                whileHover={{ 
                  scale: 1.15, 
                  backgroundColor: "#4F46E5",
                  borderColor: "#818CF8",
                  y: -5
                }}
                whileTap={{ scale: 0.95 }}
              >
                {link.icon}
              </motion.a>
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.div
                    className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm py-1 px-3 rounded-md whitespace-nowrap"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                  >
                    {link.label}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-8 border-t border-gray-800 pt-10 pb-6 text-gray-400"
          variants={itemVariants}
        >
          <div className="text-center md:text-left">
            <h3 className="text-white font-semibold mb-3">About</h3>
            <p className="text-sm">Full-stack developer passionate about creating innovative web solutions with modern technologies.</p>
          </div>
          <div className="text-center">
            <h3 className="text-white font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Home</a></li>
              <li><a href="#projects" className="hover:text-indigo-400 transition-colors">Projects</a></li>
              <li><a href="#skills" className="hover:text-indigo-400 transition-colors">Skills</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Contact</a></li>
            </ul>
          </div>
          <div className="text-center md:text-right">
            <h3 className="text-white font-semibold mb-3">Contact</h3>
            <p className="text-sm mb-2">ghanshyamhadiya013@gmail.com</p>
            <p className="text-sm">Available for freelance opportunities</p>
          </div>
        </motion.div>

        <motion.div 
          className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center"
          variants={itemVariants}
        >
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {currentYear} Ghanshyam Hadiya. All rights reserved.
          </p>
          <motion.p 
            className="text-sm text-gray-500"
            whileHover={{ color: "#818CF8" }}
          >
            Designed & Built with <span className="text-red-500">♥</span>
          </motion.p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;