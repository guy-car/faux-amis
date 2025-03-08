import { useState, useEffect } from 'react'
import './App.css'
import WordContainer from './Components/WordContainer'

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    document.body.classList.add('dark-mode');
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
    document.body.classList.toggle('dark-mode');
  };

  return (
    <div className={`app ${isDarkMode ? 'dark-mode' : ''}`}>
      <WordContainer isDarkMode={isDarkMode} onDarkModeToggle={toggleDarkMode} />
    </div>
  )
}

