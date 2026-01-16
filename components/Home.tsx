
import React from 'react';
import MusicCard from './MusicCard';
import { MOCK_PLAYLISTS } from '../data/mock';

const Home: React.FC = () => {
  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-pink">
            Listen Now
          </span>
        </h1>
        <p className="text-gray-400 mt-2">Your daily dose of music, curated just for you.</p>
      </header>
      
      <section>
        <h2 className="text-2xl font-bold mb-4">Made For You</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {MOCK_PLAYLISTS.map((playlist) => (
            <MusicCard key={playlist.id} item={playlist} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Featured Playlists</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {[...MOCK_PLAYLISTS].reverse().map((playlist) => (
            <MusicCard key={playlist.id} item={{...playlist, id: playlist.id + 10}} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
