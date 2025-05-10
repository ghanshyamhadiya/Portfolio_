import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend, FiArrowRight, FiCheck, FiX } from 'react-icons/fi';
import emailjs from '@emailjs/browser';

const Button = ({ children, primary, className, onClick, type, disabled }) => {
  return (
    <button
      type={type || "button"}
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
        primary
          ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-purple-500/20"
          : "bg-darkCard text-white hover:bg-darkBg border border-gray-700"
      } ${disabled ? "opacity-60 cursor-not-allowed" : ""} ${className}`}
    >
      {children}
    </button>
  );
};

const Contact = () => {
  const form = useRef();
  const [formData, setFormData] = useState({
    name: '', // Changed from user_name to name to match template
    email: '', // Changed from user_email to email to match template
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Set visibility after component mounts for animations
    setIsVisible(true);
    
    emailjs.init('BpiqXCZe24GyY1hc9');
  }, []);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    
    // Create template parameters to match EmailJS template variables
    const templateParams = {
      name: formData.name,        // This will match {{name}} in your template
      email: formData.email,      // This will match {{email}} in your template
      subject: formData.subject,  // This will match {{subject}} in your template
      message: formData.message   // This will match {{message}} in your template
    };
    
    // Send email using EmailJS
    emailjs.send(
      'service_qig13fs',            // Your EmailJS service ID
      'template_huvdi7a',           // Your EmailJS template ID
      templateParams,               // Parameters that match your template variables
      'BpiqXCZe24GyY1hc9'           // Your EmailJS public key
    )
    .then((result) => {
      console.log('Email sent successfully:', result.text);
      setIsSubmitting(false);
      setSubmitStatus('success');
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    })
    .catch((error) => {
      console.error('Failed to send email:', error);
      setIsSubmitting(false);
      setSubmitStatus('error');
      setErrorMessage('Failed to send your message. Please try again later.');
      
      // Reset error after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
        setErrorMessage('');
      }, 5000);
    });
  };
  
  const contactInfo = [
    {
      icon: <FiMail className="text-2xl" />,
      title: 'Email',
      contact: 'ghanshyamhadiya013@gmail.com',
      link: 'mailto:ghanshyamhadiya013@gmail.com'
    },
    {
      icon: <FiPhone className="text-2xl" />,
      title: 'Phone',
      contact: '+91 7622******',
      link: 'tel:+917622******'
    },
    {
      icon: <FiMapPin className="text-2xl" />,
      title: 'Location',
      contact: 'Gujarat, India',
      link: 'https://goo.gl/maps/india'
    }
  ];

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 }
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const inputAnimation = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  const cardHover = {
    rest: { scale: 1, boxShadow: "0px 0px 0px rgba(124, 58, 237, 0)" },
    hover: { 
      scale: 1.03, 
      boxShadow: "0px 10px 20px rgba(124, 58, 237, 0.2)",
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  };
  
  return (
    <section id="contact" className="relative py-28 bg-gradient-to-b from-gray-900 to-black text-gray-100 overflow-hidden">
      {/* Background particles effect */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-purple-900/10 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-indigo-900/10 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-64 bg-gradient-to-r from-purple-900/5 to-indigo-900/5 blur-3xl"></div>
        
        {/* Animated floating dots */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-purple-500/10"
            style={{
              width: Math.random() * 8 + 4,
              height: Math.random() * 8 + 4,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 20 - 10],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">Get In Touch</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-indigo-600 mx-auto mb-6"></div>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Ready to collaborate or have a question? Reach out and I'll respond as soon as possible!
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {contactInfo.map((info, index) => (
            <motion.a
              key={index}
              href={info.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 p-8 rounded-2xl flex flex-col items-center text-center"
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              initial="rest"
              whileHover="hover"
              animate={isVisible ? "visible" : "hidden"}
            >
              <motion.div 
                variants={cardHover}
                className="w-full h-full absolute top-0 left-0 rounded-2xl"
              />
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600/20 to-indigo-600/20 flex items-center justify-center mb-5 transform transition-all duration-500 group-hover:scale-110 relative z-10">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white">
                  {info.icon}
                </div>
              </div>
              <h4 className="text-xl font-bold text-white mb-2 relative z-10">{info.title}</h4>
              <p className="text-gray-400 group-hover:text-gray-200 transition-colors relative z-10">{info.contact}</p>
              <div className="mt-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 relative z-10">
                <span className="text-purple-400 flex items-center justify-center gap-2 text-sm font-medium">
                  Connect <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>
        
        <motion.div 
          className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            <motion.div
              className="p-8 md:p-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.h3 
                className="text-2xl font-bold text-white mb-8"
                variants={fadeInRight}
              >
                Send Me a Message
              </motion.h3>
              
              <form ref={form} onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6">
                  <motion.div variants={inputAnimation}>
                    <div className="relative group">
                      <input
                        type="text"
                        name="name" // Changed from user_name to name
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        required
                        className="w-full px-5 py-4 bg-gray-900/50 border border-gray-700/50 text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 placeholder-gray-500"
                      />
                      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-300 group-focus-within:w-full"></div>
                    </div>
                  </motion.div>
                  
                  <motion.div variants={inputAnimation}>
                    <div className="relative group">
                      <input
                        type="email"
                        name="email" // Changed from user_email to email
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your Email"
                        required
                        className="w-full px-5 py-4 bg-gray-900/50 border border-gray-700/50 text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 placeholder-gray-500"
                      />
                      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-300 group-focus-within:w-full"></div>
                    </div>
                  </motion.div>
                  
                  <motion.div variants={inputAnimation}>
                    <div className="relative group">
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Subject"
                        required
                        className="w-full px-5 py-4 bg-gray-900/50 border border-gray-700/50 text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 placeholder-gray-500"
                      />
                      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-300 group-focus-within:w-full"></div>
                    </div>
                  </motion.div>
                  
                  <motion.div variants={inputAnimation}>
                    <div className="relative group">
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Your Message"
                        required
                        rows={6}
                        className="w-full px-5 py-4 bg-gray-900/50 border border-gray-700/50 text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 placeholder-gray-500 resize-none"
                      ></textarea>
                      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-300 group-focus-within:w-full"></div>
                    </div>
                  </motion.div>
                  
                  <motion.div variants={inputAnimation}>
                    <Button
                      type="submit"
                      primary={true}
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 py-4 text-lg"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Sending...</span>
                        </div>
                      ) : (
                        <>
                          Send Message <FiSend className="ml-1" />
                        </>
                      )}
                    </Button>
                    
                    <AnimatePresence>
                      {submitStatus === 'success' && (
                        <motion.div
                          className="mt-6 bg-green-500/20 border border-green-500/30 rounded-lg p-4 flex items-center gap-3"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="bg-green-500 rounded-full p-1 flex-shrink-0">
                            <FiCheck className="text-white" />
                          </div>
                          <p className="text-green-300 text-sm">
                            Thanks! Your message has been sent successfully. I'll respond soon.
                          </p>
                        </motion.div>
                      )}
                      
                      {submitStatus === 'error' && (
                        <motion.div
                          className="mt-6 bg-red-500/20 border border-red-500/30 rounded-lg p-4 flex items-center gap-3"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="bg-red-500 rounded-full p-1 flex-shrink-0">
                            <FiX className="text-white" />
                          </div>
                          <p className="text-red-300 text-sm">
                            {errorMessage || "Something went wrong. Please try again."}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </form>
            </motion.div>
            
            <motion.div
              className="hidden md:block relative overflow-hidden rounded-r-2xl"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInLeft}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-indigo-900/40 z-10"></div>
              
              {/* Abstract animated background */}
              <div className="absolute inset-0 z-0">
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full bg-gradient-to-r from-purple-600/20 to-indigo-600/20"
                    style={{
                      width: Math.random() * 300 + 100,
                      height: Math.random() * 300 + 100,
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.2, 0.3],
                    }}
                    transition={{
                      duration: Math.random() * 10 + 10,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                ))}
              </div>
             
              <div className="relative z-20 h-full flex flex-col items-center justify-center p-12 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <h3 className="text-3xl font-bold text-white mb-6">Let's Connect</h3>
                  <div className="w-16 h-1 bg-gradient-to-r from-purple-600 to-indigo-600 mx-auto mb-6"></div>
                  <p className="text-gray-300 mb-8 max-w-lg">
                    I'm currently available for freelance work or full-time positions. 
                    If you have a project that you want to get started or need help with 
                    something, feel free to reach out.
                  </p>
                  
                  {/* Animated envelope icon */}
                  <motion.div 
                    className="inline-block"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="rounded-full p-1 bg-gradient-to-r from-purple-600 to-indigo-600">
                      <div className="bg-gray-900 rounded-full p-5">
                        <motion.svg 
                          className="w-10 h-10 text-purple-400" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24" 
                          xmlns="http://www.w3.org/2000/svg"
                          animate={{ 
                            y: [0, -5, 0],
                            rotate: [0, 5, 0, -5, 0]  
                          }}
                          transition={{ 
                            duration: 5,
                            repeat: Infinity,
                            repeatType: "loop"
                          }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </motion.svg>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
};

export default Contact;
