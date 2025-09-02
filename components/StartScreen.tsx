import React, { useEffect, useState } from 'react';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPrompt(true);
    }, 500);

    const handleEnter = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        onStart();
      }
    };
    window.addEventListener('keydown', handleEnter);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleEnter);
    };
  }, [onStart]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-2 sm:p-4 text-center">
      <img
        src="/profile-terminal/FotoPerfilHome.png"
        alt="Logo Kleiton Souza"
        className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 ] mb-4 shadow-lg object-cover"
        draggable="false"
      />
      <div className="font-mono w-full max-w-3xl">
        <p className="text-sm md:text-lg text-[var(--color-text-default)] font-bold">
          WELCOME TO KLEITON SOUZA'S PROFILE TERMINAL
        </p>

        <p className="mt-6 text-xs md:text-sm text-[var(--color-text-secondary)]">
          Para ver a lista de comandos disponíveis, digite <span className="text-[var(--color-text-default)] font-bold">'help'</span> assim que a sessão começar.
        </p>
        
        {showPrompt && (
          <p className="mt-8 text-[var(--color-text-default)] text-base md:text-lg animate-pulse">
            PRESS ENTER TO START SESSION
          </p>
        )}
      </div>
    </div>
  );
};

export default StartScreen;