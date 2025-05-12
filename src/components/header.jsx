import React, { useState } from 'react';
import logo from "../images/chef-claude-icon.png"

// Changed function name to PascalCase for React component convention
export default function Header(props) { // props ya incluye currentGlobalLanguage y handleChangeLanguage
    // Eliminamos el estado local, usaremos las props
    // const [currentLanguage, setCurrentLanguage] = useState('es'); 

    const toggleLanguage = () => {
        const newLang = props.currentGlobalLanguage === 'es' ? 'en' : 'es';
        props.handleChangeLanguage(newLang); // Llamamos a la función del App.jsx
    };

    const SpanishFlag = () => (
        <>
            <div className="flag-stripe flag-red-top"></div>
            <div className="flag-stripe flag-yellow"></div>
            <div className="flag-stripe flag-red-bottom"></div>
        </>
    );

    const EnglishFlag = () => (
        <>
            {/* El fondo blanco lo da .toggle-ball.english-flag-mode */}
            <div className="flag-cross flag-cross-vertical"></div>
            <div className="flag-cross flag-cross-horizontal"></div>
        </>
    );

    return (
        <header>
            <div className="header-spacer-left"></div>
            <div className="header-main-content">
                <img src={logo} className="logo" alt="logo"/>
                <span className="appName">Chef Claude</span>
            </div>
            <div className="header-right-slot">
                <div 
                    className={`toggle ${props.currentGlobalLanguage === 'en' ? 'english-active' : ''}`} 
                    onClick={toggleLanguage}
                    role="button" // Accessibility
                    aria-label={`Switch to ${props.currentGlobalLanguage === 'es' ? 'English' : 'Spanish'}`} // Accessibility
                    tabIndex={0} // Accessibility
                >
                    <div className={`toggle-ball ${props.currentGlobalLanguage === 'en' ? 'english-flag-mode' : ''}`}>
                        {props.currentGlobalLanguage === 'es' ? <SpanishFlag /> : <EnglishFlag />}
                    </div>
                </div>
            </div>
        </header>
    )
}
