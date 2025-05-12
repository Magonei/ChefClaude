
import Header from "./components/header.jsx"
import Main from "./components/main.jsx"
import "./index.css"
import { useState, useEffect } from "react";

/**
 * Challenge: Build the Header component in a separate file
 * and render it here in the App component
 */

export default function App() {
  const [currentGlobalLanguage, setCurrentGlobalLanguage] = useState('es'); // 'es' or 'en'
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Apply dark mode class to body when isDarkMode changes
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const handleChangeLanguage = (newLanguage) => {
    setCurrentGlobalLanguage(newLanguage);
    console.log(`Idioma global cambiado a: ${newLanguage}`);
  }
  
  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
    console.log(`Dark mode ${!isDarkMode ? 'enabled' : 'disabled'}`);
  }
  return (
    <>
      <Header 
        handleChangeLanguage={handleChangeLanguage}
        currentGlobalLanguage={currentGlobalLanguage}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />
      <Main handleChangeLanguage={handleChangeLanguage}
      currentGlobalLanguage={currentGlobalLanguage}
      />
    </>
  )
}
