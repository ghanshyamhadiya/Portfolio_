import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  primary = true, 
  onClick, 
  className = '',
  type = 'button',
  download = false,
  href = null,
  icon = null,
  size = 'md'
}) => {
  // Enhanced base styles with better sizing options
  const baseStyles = "rounded-lg font-semibold transition-all flex items-center justify-center gap-2";
  
  // Size variants
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };
  
  // Enhanced color schemes with better contrast
  const primaryStyles = "bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-500 hover:to-indigo-500 hover:shadow-lg shadow-indigo-600/30 border border-indigo-500/30";
  const secondaryStyles = "bg-transparent border-2 border-violet-500 text-violet-300 hover:bg-violet-900/30 hover:text-violet-200 hover:shadow-lg shadow-violet-600/20";
  
  const buttonStyles = `${baseStyles} ${sizeStyles[size]} ${primary ? primaryStyles : secondaryStyles} ${className}`;
  
  // Enhanced motion variants
  const buttonVariants = {
    hover: { 
      scale: 1.03, 
      boxShadow: primary ? 
        '0 10px 25px -5px rgba(99, 102, 241, 0.4)' : 
        '0 10px 25px -5px rgba(139, 92, 246, 0.25)'
    },
    tap: { scale: 0.97 }
  };
  
  if (href) {
    return (
      <motion.a
        href={href}
        download={download}
        className={buttonStyles}
        whileHover="hover"
        whileTap="tap"
        variants={buttonVariants}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {icon && <span className="text-lg">{icon}</span>}
        {children}
      </motion.a>
    );
  }
  
  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={buttonStyles}
      whileHover="hover"
      whileTap="tap"
      variants={buttonVariants}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {icon && <span className="text-lg">{icon}</span>}
      {children}
    </motion.button>
  );
};

export default Button;
