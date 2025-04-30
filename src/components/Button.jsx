import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  primary = true, 
  onClick, 
  className = '',
  type = 'button',
  download = false,
  href = null
}) => {
  const baseStyles = "px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2";
  const primaryStyles = "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg shadow-indigo-500/20";
  const secondaryStyles = "bg-transparent border-2 border-indigo-600 text-indigo-400 hover:bg-indigo-900 hover:bg-opacity-30";
  
  const buttonStyles = `${baseStyles} ${primary ? primaryStyles : secondaryStyles} ${className}`;
  
  if (href) {
    return (
      <motion.a
        href={href}
        download={download}
        className={buttonStyles}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.a>
    );
  }
  
  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={buttonStyles}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.button>
  );
};

export default Button;