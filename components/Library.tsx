
import React from 'react';
import { MOCK_PLAYLISTS } from '../data/mock';
import { useMusicPlayer } from '../context/MusicContext';

const Library: React.FC = () => {
    const { playPlaylist } = useMusicPlayer();
  return (
    <div className="space-y-8">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-cyan to-brand-purple">
            Your Library
          </span>
        </h1>
      <p className="text-gray-400">All your saved playlists and albums in one place.</p>
      
      <div className="space-y-4">
        {MOCK_PLAYLISTS.map((playlist) => (
            <div key={playlist.id} className="flex items-center p-3 bg-zinc-800/50 rounded-lg hover:bg-zinc-700/80 transition-colors duration-200 cursor-pointer" onClick={() => playPlaylist(playlist)}>
                <img src={playlist.coverArt} alt={playlist.name} className="w-16 h-16 rounded-md mr-4" />
                <div>
                    <h3 className="font-semibold text-white">{playlist.name}</h3>
                    <p className="text-sm text-gray-400">{playlist.songs.length} songs</p>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default Library;
