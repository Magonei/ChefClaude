import Header from "./components/header.jsx"
import Main from "./components/main.jsx"
import "./index.css"
import { useState } from "react";

/**
 * Challenge: Build the Header component in a separate file
 * and render it here in the App component
 */

export default function App() {

  const [currentGlobalLanguage, setCurrentGlobalLanguage] = useState('es'); // 'es' or 'en'
  const handleChangeLanguage = (newLanguage) => {
    setCurrentGlobalLanguage(newLanguage);
    console.log(`Idioma global cambiado a: ${newLanguage}`);
  }
  return (
    <>
      <Header handleChangeLanguage={handleChangeLanguage}
              currentGlobalLanguage={currentGlobalLanguage}
              />
      <Main handleChangeLanguage={handleChangeLanguage}
      currentGlobalLanguage={currentGlobalLanguage}
      />
    </>
  )
}
