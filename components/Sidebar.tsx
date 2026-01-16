
import React from 'react';
import type { View } from '../types';
import { HomeIcon, LibraryIcon, SparklesIcon, UsersIcon } from './icons';
import { MOCK_PLAYLISTS } from '../data/mock';

interface SidebarProps {
  activeView: View;
  setActiveView: (view: View) => void;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
      isActive
        ? 'bg-gradient-to-r from-brand-purple to-brand-pink text-white shadow-lg'
        : 'text-gray-400 hover:bg-zinc-800 hover:text-white'
    }`}
  >
    <span className="mr-4">{icon}</span>
    {label}
  </button>
);

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
  return (
    <aside className="hidden md:flex flex-col w-64 bg-black p-4 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white px-2 mb-6">
          <span className="text-brand-purple">Pilgrim</span>
          <span className="text-brand-pink">Godman</span>
        </h1>
        <nav className="space-y-2">
          <NavItem
            icon={<HomeIcon />}
            label="Home"
            isActive={activeView === 'home'}
            onClick={() => setActiveView('home')}
          />
          <NavItem
            icon={<LibraryIcon />}
            label="Your Library"
            isActive={activeView === 'library'}
            onClick={() => setActiveView('library')}
          />
          <NavItem
            icon={<SparklesIcon />}
            label="AI Playlist"
            isActive={activeView === 'ai-generator'}
            onClick={() => setActiveView('ai-generator')}
          />
          <NavItem
            icon={<UsersIcon />}
            label="Community"
            isActive={activeView === 'community'}
            onClick={() => setActiveView('community')}
          />
        </nav>
      </div>
      <div className="flex-1 overflow-y-auto space-y-4">
        <h2 className="text-xs font-semibold tracking-wider text-gray-500 uppercase px-4">Playlists</h2>
        <div className="space-y-2">
          {MOCK_PLAYLISTS.map((playlist) => (
            <button key={playlist.id} className="w-full text-left px-4 py-2 text-gray-300 hover:bg-zinc-800 hover:text-white rounded-md text-sm truncate transition-colors duration-200">
              {playlist.name}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
