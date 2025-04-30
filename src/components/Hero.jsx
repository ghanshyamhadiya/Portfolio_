import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';
import { HiDownload, HiChevronDown, HiOutlineMail } from 'react-icons/hi';
import { FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';
import Button from './Button';
import profileImage from '../assets/ghibli_profile.jpg';
import resumeImage from '../assets/Ghanshyam_Hadiya.pdf';

const Hero = () => {
  const controls = useAnimation();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  // Enhanced parallax effect
  const yBg = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacitySection = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  
  // Animated text variants with improved timing
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.15, duration: 0.6, ease: "easeOut" }
    })
  };

  // Improved TypeWriter effect for job titles with ellipsis
  const jobTitles = ["Full Stack Developer", "React Developer", "Node.js Engineer", "UI/UX Enthusiast"];
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showEllipsis, setShowEllipsis] = useState(false);
  
  useEffect(() => {
    controls.start("visible");
    
    const interval = setInterval(() => {
      // When full word is typed, show ellipsis for a period
      if (!isDeleting && displayText === jobTitles[currentTitleIndex] && !showEllipsis) {
        setShowEllipsis(true);
        return;
      }
      
      // After showing ellipsis for a while, start deleting
      if (!isDeleting && showEllipsis) {
        setTimeout(() => {
          setShowEllipsis(false);
          setIsDeleting(true);
        }, 1200);
        return;
      }
      
      // When deletion complete, move to next title
      if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setCurrentTitleIndex((prev) => (prev + 1) % jobTitles.length);
        return;
      }

      // Handle typing and deleting
      setDisplayText(prev => {
        if (isDeleting) {
          return prev.slice(0, -1);
        } else {
          return jobTitles[currentTitleIndex].slice(0, prev.length + 1);
        }
      });
    }, isDeleting ? 60 : 100);

    return () => clearInterval(interval);
  }, [controls, currentTitleIndex, displayText, isDeleting, jobTitles, showEllipsis]);

  // Mouse follow animation with enhanced smoothness
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cursorRef = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      id="home" 
      ref={containerRef}
      className="min-h-screen flex items-center bg-gray-900 py-20 relative overflow-hidden"
    >
      {/* Moving background gradient - keeping original */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-tr from-indigo-900/30 via-gray-900/50 to-purple-900/20"
        style={{ y: yBg }}
      />
      
      {/* 3D grid - keeping original */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute inset-0" style={{ 
          backgroundImage: `linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px), 
                           linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          backgroundPosition: '-20px -20px',
          transform: 'perspective(1000px) rotateX(60deg) translateY(-100px)',
          transformOrigin: 'center center'
        }} />
      </div>
      
      {/* Enhanced animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              backgroundColor: Math.random() > 0.5 ? 'rgba(99, 102, 241, 0.6)' : 'rgba(167, 139, 250, 0.6)',
              filter: "blur(1px)"
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.1, 0.5, 0.1],
              scale: [1, 1.5, 1],
              y: [0, -40 * Math.random(), 0]
            }}
            transition={{
              duration: 3 + Math.random() * 7,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>
      
      {/* Enhanced mouse follow glow effect */}
      <motion.div
        className="hidden lg:block absolute rounded-full pointer-events-none"
        style={{
          width: 500,
          height: 500,
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, rgba(167, 139, 250, 0.1) 30%, rgba(99, 102, 241, 0) 70%)",
          left: mousePosition.x - 250,
          top: mousePosition.y - 250,
          zIndex: 1,
          mixBlendMode: "lighten"
        }}
        animate={{
          x: 0,
          y: 0
        }}
        transition={{ type: "spring", damping: 15, stiffness: 100 }}
      />
      
      <motion.div 
        className="container mx-auto px-4 lg:px-8 relative z-10"
        style={{ opacity: opacitySection, scale }}
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div 
            className="w-full lg:w-3/5 text-center lg:text-left"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-block p-2 px-4 rounded-full bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border border-indigo-500/20 backdrop-blur-sm mb-6"
              custom={0}
              variants={textVariants}
              initial="hidden"
              animate={controls}
            >
              <span className="text-indigo-300 font-medium text-sm">Hello World, I'm</span>
            </motion.div>
            
            <motion.h1 
              custom={1}
              variants={textVariants}
              initial="hidden"
              animate={controls}
              className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            >
              Ghanshyam <span className="inline-block relative">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-indigo-500 animate-gradient-x">Hadiya</span>
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-indigo-500/20 blur-xl -z-10 opacity-50"></span>
              </span>
            </motion.h1>
            
            <motion.div 
              custom={2}
              variants={textVariants}
              initial="hidden"
              animate={controls}
              className="text-2xl lg:text-3xl font-semibold text-gray-200 h-12 mb-8 flex items-center justify-center lg:justify-start gap-2"
            >
              <span>I'm a</span>
              <div className="text-indigo-400 relative min-w-[180px] inline-flex">
                <span>{displayText}{showEllipsis ? "..." : ""}</span>
                <span className="absolute -right-1 top-0 h-full w-1 bg-indigo-400 animate-cursor"></span>
              </div>
            </motion.div>
            
            <motion.p 
              custom={3}
              variants={textVariants}
              initial="hidden"
              animate={controls}
              className="text-gray-300 text-lg mb-10 max-w-xl leading-relaxed"
            >
              I build modern web applications with cutting-edge technologies.
              Passionate about creating elegant solutions to complex problems
              and delivering exceptional user experiences.
            </motion.p>
            
            <motion.div 
              custom={4}
              variants={textVariants}
              initial="hidden"
              animate={controls}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <Button 
                href={resumeImage} 
                download={true}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-indigo-500/30"
              >
                <HiDownload size={18} className="mr-2" /> Download Resume
              </Button>
              <Button 
                primary={false} 
                href="#contact"
                className="border border-indigo-500/50 text-indigo-300 hover:bg-indigo-800/30 px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
              >
                <HiOutlineMail size={18} className="mr-2" /> Contact Me
              </Button>
            </motion.div>
            
            <motion.div 
              custom={5}
              variants={textVariants}
              initial="hidden"
              animate={controls}
              className="flex mt-10 gap-6 justify-center lg:justify-start"
            >
              {[
                { icon: <FiGithub size={22} />, href: "https://github.com/ghanshyamhadiya", color: "hover:text-indigo-400", bg: "hover:bg-indigo-900/50" },
                { icon: <FiLinkedin size={22} />, href: "https://linkedin.com", color: "hover:text-blue-400", bg: "hover:bg-blue-900/50" },
                { icon: <FiTwitter size={22} />, href: "https://twitter.com", color: "hover:text-sky-400", bg: "hover:bg-sky-900/50" }
              ].map((social, index) => (
                <motion.a 
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-300 ${social.color} ${social.bg} transition-all w-10 h-10 rounded-full flex items-center justify-center border border-gray-700/50 backdrop-blur-sm`}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="w-full lg:w-2/5 flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="relative w-72 h-72 lg:w-96 lg:h-96">
              {/* Glass card effect */}
              <motion.div 
                className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-600/20 to-purple-600/20 backdrop-blur-md border border-indigo-500/30 shadow-xl shadow-indigo-500/10"
                animate={{ rotate: [0, 2, 0, -2, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Image container with gradient border */}
              <div className="absolute inset-4 rounded-2xl overflow-hidden bg-gradient-to-br p-[2px] from-indigo-500 via-purple-500 to-indigo-500">
                <div className="w-full h-full rounded-2xl overflow-hidden bg-gray-900 relative">
                  {/* Actual image */}
                  <img 
                    src={profileImage} 
                    alt="Ghanshyam Hadiya"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '';
                    }}
                  />
                  
                  {/* Overlay glass effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/30 to-transparent mix-blend-overlay" />
                  
                  {/* Light reflection effect */}
                  <div className="absolute top-0 left-[5%] right-[45%] h-[1px] bg-gradient-to-r from-transparent via-indigo-400/70 to-transparent" />
                </div>
              </div>
              
              {/* Decorative elements */}
              <motion.div
                className="absolute w-20 h-20 rounded-full bg-indigo-500/10 border border-indigo-500/20 z-[-1]"
                style={{ top: '-10%', right: '-5%' }}
                animate={{ y: [0, -15, 0], x: [0, 10, 0], rotate: [0, 10, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute w-16 h-16 rounded-full bg-purple-500/10 border border-purple-500/20 z-[-1]"
                style={{ bottom: '5%', left: '-10%' }}
                animate={{ y: [0, 15, 0], x: [0, -10, 0], rotate: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute w-12 h-12 rounded-lg bg-indigo-500/10 border border-indigo-500/20 z-[-1]"
                style={{ top: '75%', right: '-8%' }}
                animate={{ y: [0, 10, 0], x: [0, 5, 0], rotate: [0, 15, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-gray-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <motion.div
            className="p-2 rounded-full bg-gray-900/50 backdrop-blur-sm border border-gray-800"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <HiChevronDown size={24} className="text-indigo-400" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;