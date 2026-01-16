
import React from 'react';
import { useMusicPlayer } from '../context/MusicContext';
import type { Playlist } from '../types';
import { PlayIcon } from './icons';

interface MusicCardProps {
  item: Playlist;
}

const MusicCard: React.FC<MusicCardProps> = ({ item }) => {
  const { playPlaylist } = useMusicPlayer();

  return (
    <div
      className="bg-zinc-800/50 p-4 rounded-lg group relative cursor-pointer transition-all duration-300 hover:bg-zinc-700/80 animate-slide-up"
      onClick={() => playPlaylist(item)}
      style={{ animationDelay: `${item.id * 50}ms` }}
    >
      <div className="relative">
        <img src={item.coverArt} alt={item.name} className="w-full h-auto aspect-square rounded-md mb-4 shadow-lg group-hover:shadow-xl transition-shadow" />
        <div className="absolute bottom-2 right-2 w-12 h-12 bg-brand-purple rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 group-hover:bottom-4 transition-all duration-300 shadow-2xl">
          <PlayIcon className="w-6 h-6" />
        </div>
      </div>
      <h3 className="font-bold text-white truncate">{item.name}</h3>
      <p className="text-sm text-gray-400 truncate">{item.description}</p>
    </div>
  );
};

export default MusicCard;
