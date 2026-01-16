
import React, { useState } from 'react';
import { MusicProvider } from './context/MusicContext';
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import Home from './components/Home';
import Library from './components/Library';
import AiPlaylistGenerator from './components/AiPlaylistGenerator';
import Community from './components/Community';
import type { View } from './types';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('home');

  const renderView = () => {
    switch (activeView) {
      case 'home':
        return <Home />;
      case 'library':
        return <Library />;
      case 'ai-generator':
        return <AiPlaylistGenerator />;
      case 'community':
        return <Community />;
      default:
        return <Home />;
    }
  };

  return (
    <MusicProvider>
      <div className="h-screen w-full flex flex-col font-sans bg-black overflow-hidden">
        <div className="flex flex-1 overflow-hidden">
          <Sidebar activeView={activeView} setActiveView={setActiveView} />
          <main className="flex-1 overflow-y-auto bg-zinc-900/50">
            <div className="p-4 sm:p-6 lg:p-8 animate-fade-in">
              {renderView()}
            </div>
          </main>
        </div>
        <Player />
      </div>
    </MusicProvider>
  );
};

export default App;
