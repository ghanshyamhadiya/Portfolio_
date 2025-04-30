import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
// import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './index.css';

function App() {
  const { darkMode } = useSelector((state) => state.theme);

  // Apply dark mode class to document when component mounts or theme changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`${darkMode ? 'dark bg-darkBg' : 'bg-white'} min-h-screen transition-colors duration-300`}>
      <Navbar />
      <main>
        <Hero />
        {/* <About /> */}
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;