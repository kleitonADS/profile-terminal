import React, { useState } from 'react';
import Terminal from './components/Terminal';
import StartScreen from './components/StartScreen';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  const [sessionStarted, setSessionStarted] = useState(false);

  const handleStart = () => {
    setSessionStarted(true);
  };

  const handleExit = () => {
    setSessionStarted(false);
  };

  return (
    <ThemeProvider>
      <div className="w-full h-full">
        {sessionStarted ? <Terminal onExit={handleExit} /> : <StartScreen onStart={handleStart} />}
      </div>
    </ThemeProvider>
  );
}

export default App;