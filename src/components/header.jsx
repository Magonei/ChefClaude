import React, { useState } from 'react';
import logo from "../images/chef-claude-icon.png"

// Changed function name to PascalCase for React component convention
// Icons for dark/light mode
const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
);

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
);

export default function Header(props) { // props includes currentGlobalLanguage, handleChangeLanguage, isDarkMode, onToggleDarkMode
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
            {/* Left slot - Dark Mode Toggle */}
            <div className="header-left-slot">
                <div 
                    className="dark-mode-toggle"
                    onClick={props.onToggleDarkMode}
                    role="button"
                    aria-label={props.isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                    tabIndex={0}
                >
                    <div className={`dark-mode-icon ${props.isDarkMode ? 'dark' : 'light'}`}>
                        {props.isDarkMode ? <SunIcon /> : <MoonIcon />}
                    </div>
                </div>
            </div>

            {/* Center - Logo and App Name */}
            <div className="header-main-content">
                <div style={{ pointerEvents: 'auto', display: 'flex', alignItems: 'center', gap: '11px' }}>
                    <img src={logo} className="logo" alt="logo"/>
                    <span className="appName">Chef Claude</span>
                </div>
            </div>

            {/* Right slot - Language Toggle */}
            <div className="header-right-slot">
                <div 
                    className={`toggle ${props.currentGlobalLanguage === 'en' ? 'english-active' : ''}`} 
                    onClick={toggleLanguage}
                    role="button"
                    aria-label={`Switch to ${props.currentGlobalLanguage === 'es' ? 'English' : 'Spanish'}`}
                    tabIndex={0}
                >
                    <div className={`toggle-ball ${props.currentGlobalLanguage === 'en' ? 'english-flag-mode' : ''}`}>
                        {props.currentGlobalLanguage === 'es' ? <SpanishFlag /> : <EnglishFlag />}
                    </div>
                </div>
            </div>
        </header>
    )
}
