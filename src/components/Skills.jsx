import React, { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import {
  SiHtml5, SiCss3, SiJavascript, SiReact, SiRedux,
  SiNodedotjs, SiExpress, SiMongodb, SiTailwindcss,
  SiGit, SiPostman, SiMysql, SiEjs, SiNpm, SiBootstrap
} from 'react-icons/si';
import { HiChevronDown, HiCheckCircle, HiBadgeCheck, HiOutlineLightBulb } from 'react-icons/hi';

const Skills = () => {
  // State for filtering skills
  const [activeFilter, setActiveFilter] = useState('all');
  const [showSkillDetail, setShowSkillDetail] = useState(null);
  
  const skillCategories = [
    { id: 'all', label: 'All Skills' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'tools', label: 'Tools & Others' }
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    },
    exit: { 
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 }
    },
    hover: {
      y: -5,
      boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.4)",
      borderColor: "#6366f1",
      scale: 1.03
    }
  };

  // Skill levels
  const levels = {
    expert: "Expert",
    advanced: "Advanced",
    intermediate: "Intermediate",
    beginner: "Beginner"
  };

  // Expanded skill details
  const getSkillDetails = (name) => {
    const details = {
      'HTML5': {
        level: levels.expert,
        description: "Semantic markup, accessibility best practices, and modern HTML5 features.",
        yearStarted: 2020,
        relatedSkills: ["CSS3", "JavaScript"]
      },
      'CSS3': {
        level: levels.expert,
        description: "Advanced layouts with Flexbox and Grid, animations, and responsive design.",
        yearStarted: 2020,
        relatedSkills: ["HTML5", "Tailwind CSS"]
      },
      'JavaScript': {
        level: levels.advanced,
        description: "ES6+, DOM manipulation, asynchronous programming, and functional patterns.",
        yearStarted: 2020,
        relatedSkills: ["React", "Node.js"]
      },
      'React': {
        level: levels.advanced,
        description: "Component architecture, hooks, context API, and performance optimization.",
        yearStarted: 2021,
        relatedSkills: ["Redux", "JavaScript"]
      },
      'Redux': {
        level: levels.intermediate,
        description: "State management, reducers, and middleware integration with React applications.",
        yearStarted: 2021,
        relatedSkills: ["React", "JavaScript"]
      },
      'Tailwind CSS': {
        level: levels.advanced,
        description: "Utility-first approach, responsive design, and custom configurations.",
        yearStarted: 2022,
        relatedSkills: ["CSS3", "React"]
      },
      'Bootstrap': {
        level: levels.advanced,
        description: "Component-based UI development, grid system, and customization.",
        yearStarted: 2020,
        relatedSkills: ["CSS3", "HTML5"]
      },
      'Node.js': {
        level: levels.intermediate,
        description: "Server-side JavaScript, asynchronous programming, and API development.",
        yearStarted: 2021,
        relatedSkills: ["Express", "MongoDB"]
      },
      'Express': {
        level: levels.intermediate,
        description: "RESTful API development, middleware integration, and route handling.",
        yearStarted: 2021,
        relatedSkills: ["Node.js", "MongoDB"]
      },
      'MongoDB': {
        level: levels.intermediate,
        description: "NoSQL database design, CRUD operations, and Mongoose ODM.",
        yearStarted: 2021,
        relatedSkills: ["Express", "Node.js"]
      },
      'Firebase': {
        level: levels.intermediate,
        description: "Authentication, Firestore, real-time database, and cloud functions.",
        yearStarted: 2022,
        relatedSkills: ["React", "JavaScript"]
      },
      'Git': {
        level: levels.advanced,
        description: "Version control, branching strategies, and collaborative development.",
        yearStarted: 2020,
        relatedSkills: ["GitHub", "Command Line"]
      },
      'NPM': {
        level: levels.advanced,
        description: "Package management, dependency control, and script automation.",
        yearStarted: 2020,
        relatedSkills: ["Node.js", "JavaScript"]
      },
      'SQL': {
        level: levels.intermediate,
        description: "Relational database design, complex queries, and data manipulation.",
        yearStarted: 2021,
        relatedSkills: ["MySQL", "Node.js"]
      },
      'EJS': {
        level: levels.intermediate,
        description: "Server-side templating, dynamic content generation, and layout management.",
        yearStarted: 2021,
        relatedSkills: ["Express", "Node.js"]
      }
    };
    
    return details[name] || {
      level: levels.intermediate,
      description: "Skill in development and continuous learning.",
      yearStarted: 2021,
      relatedSkills: []
    };
  };

  // Skill data with categories
  const frontendSkills = [
    { name: 'HTML5', icon: <SiHtml5 className="text-4xl text-[#E34F26]" />, category: "frontend" },
    { name: 'CSS3', icon: <SiCss3 className="text-4xl text-[#1572B6]" />, category: "frontend" },
    { name: 'JavaScript', icon: <SiJavascript className="text-4xl text-[#F7DF1E]" />, category: "frontend" },
    { name: 'React', icon: <SiReact className="text-4xl text-[#61DAFB]" />, category: "frontend" },
    { name: 'Redux', icon: <SiRedux className="text-4xl text-[#764ABC]" />, category: "frontend" },
    { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-4xl text-[#06B6D4]" />, category: "frontend" }, 
    { name: 'Bootstrap', icon: <SiBootstrap className="text-4xl text-[#563D7C]" />, category: "frontend" },
  ];

  const backendSkills = [
    { name: 'Node.js', icon: <SiNodedotjs className="text-4xl text-[#339933]" />, category: "backend" },
    { name: 'Express', icon: <SiExpress className="text-4xl text-[#ffffff]" />, category: "backend" },
    { name: 'MongoDB', icon: <SiMongodb className="text-4xl text-[#47A248]" />, category: "backend" },
    { name: 'SQL', icon: <SiMysql className="text-4xl text-[#00758F]" />, category: "backend" },
    { name: 'EJS', icon: <SiEjs className="text-4xl text-[#A91E50]" />, category: "backend" },
  ];
  
  const toolsSkills = [
    { name: 'Postman', icon: <SiPostman className="text-4xl text-[#FFCA28]" />, category: "tools" },
    { name: 'Git', icon: <SiGit className="text-4xl text-[#F05032]" />, category: "tools" },
    { name: 'NPM', icon: <SiNpm className="text-4xl text-[#CB38337]" />, category: "tools" }
  ];
  
  // Combine all skills
  const allSkills = [...frontendSkills, ...backendSkills, ...toolsSkills];
  
  // Filter skills based on active category
  const getFilteredSkills = () => {
    if (activeFilter === 'all') return allSkills;
    return allSkills.filter(skill => skill.category === activeFilter);
  };

  // Calculate experience years
  const calculateYearsOfExperience = (startYear) => {
    const currentYear = new Date().getFullYear();
    const years = currentYear - startYear;
    return years <= 0 ? "< 1" : years;
  };
  
  // Skill detail card component
  const SkillDetailCard = ({ skill }) => {
    const details = getSkillDetails(skill.name);
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-gray-800 rounded-lg p-6 shadow-lg shadow-indigo-500/10 border border-gray-700"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <div className="mr-4">{skill.icon}</div>
            <div>
              <h4 className="text-white text-xl font-semibold">{skill.name}</h4>
              <div className="flex items-center mt-1">
                <span className={`text-sm font-medium px-2 py-1 rounded ${
                  details.level === levels.expert ? "bg-indigo-500/20 text-indigo-300" :
                  details.level === levels.advanced ? "bg-blue-500/20 text-blue-300" :
                  details.level === levels.intermediate ? "bg-purple-500/20 text-purple-300" :
                  "bg-gray-500/20 text-gray-300"
                }`}>
                  <HiBadgeCheck className="inline mr-1" /> {details.level}
                </span>
                <span className="text-gray-400 text-sm ml-3">
                  {calculateYearsOfExperience(details.yearStarted)}+ years
                </span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setShowSkillDetail(null)}
            className="text-gray-400 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        <p className="text-gray-300 mb-4">{details.description}</p>
        
        {details.relatedSkills.length > 0 && (
          <div className="mt-4">
            <h5 className="text-sm text-gray-400 mb-2">Related Skills:</h5>
            <div className="flex flex-wrap gap-2">
              {details.relatedSkills.map((relatedSkill, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded"
                >
                  {relatedSkill}
                </span>
              ))}
            </div>
          </div>
        )}
        
                  <div className="mt-6 text-sm text-gray-400 flex items-center">
          <HiOutlineLightBulb className="mr-2" /> 
          <span>Click on any skill to view details</span>
        </div>
      </motion.div>
    );
  };
  
  return (
    <section id="skills" className="py-24 bg-gray-900 relative">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800/80 to-gray-900 pointer-events-none"></div>
      
      {/* Grid background effect */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full" style={{
          backgroundImage: `radial-gradient(circle, rgba(99, 102, 241, 0.8) 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <motion.h2
            className="text-3xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400">
              Technical Skills
            </span>
          </motion.h2>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 mx-auto mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          ></motion.div>
          <motion.p
            className="text-gray-300 text-lg max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Here are the technologies I work with to bring ideas to life. 
            Click on any skill to learn more about my experience.
          </motion.p>
        </motion.div>
        
        {/* Skill filters */}
        <motion.div 
          className="flex justify-center mb-12 flex-wrap gap-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {skillCategories.map(category => (
            <motion.button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={`px-4 py-2 rounded-full text-sm md:text-base transition-all ${
                activeFilter === category.id 
                  ? 'bg-indigo-500 text-white font-medium' 
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills display */}
        <div className="mb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.2 }}
            >
              {getFilteredSkills().map((skill, index) => (
                <motion.div
                  key={`${activeFilter}-${skill.name}`}
                  className="bg-gray-800/70 backdrop-blur-sm p-6 rounded-xl flex flex-col items-center justify-center transition-all duration-300 border border-gray-700 cursor-pointer group"
                  variants={itemVariants}
                  whileHover="hover"
                  onClick={() => setShowSkillDetail(skill)}
                >
                  <motion.div
                    className="mb-4 group-hover:text-white"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {skill.icon}
                  </motion.div>
                  <h4 className="text-gray-300 group-hover:text-white font-medium text-center">
                    {skill.name}
                  </h4>
                  <motion.div 
                    className="w-0 h-0.5 bg-indigo-500 mt-2 rounded-full" 
                    whileHover={{ width: "100%" }} 
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Skill detail modal */}
        <AnimatePresence>
          {showSkillDetail && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={(e) => {
                if (e.target === e.currentTarget) setShowSkillDetail(null);
              }}
            >
              <motion.div 
                className="w-full max-w-2xl"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25 }}
              >
                <SkillDetailCard skill={showSkillDetail} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Experience summary */}
        <motion.div
          className="mt-16 bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-6 md:p-8 rounded-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">My Learning Journey</h3>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 flex flex-col items-center p-4 border border-gray-700 rounded-lg bg-gray-800/50">
              <div className="text-indigo-400 text-4xl font-bold mb-2">3+</div>
              <div className="text-gray-300 text-center">Years of Web Development</div>
            </div>
            <div className="flex-1 flex flex-col items-center p-4 border border-gray-700 rounded-lg bg-gray-800/50">
              <div className="text-indigo-400 text-4xl font-bold mb-2">15+</div>
              <div className="text-gray-300 text-center">Technologies Mastered</div>
            </div>
            <div className="flex-1 flex flex-col items-center p-4 border border-gray-700 rounded-lg bg-gray-800/50">
              <div className="text-indigo-400 text-4xl font-bold mb-2">8+</div>
              <div className="text-gray-300 text-center">Major Projects Completed</div>
            </div>
          </div>
          <div className="text-gray-400 text-center mt-6 italic">
            Always growing, always learning - the journey never ends!
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}

export default Skills;