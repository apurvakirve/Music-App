
import React from 'react';
import { useMusicPlayer } from '../context/MusicContext';
import { PlayIcon, PauseIcon, SkipBackIcon, SkipForwardIcon, Volume2Icon } from './icons';

const Player: React.FC = () => {
  const { currentSong, isPlaying, togglePlay, playNext, playPrev } = useMusicPlayer();

  if (!currentSong) {
    return (
        <div className="h-24 bg-zinc-900 border-t border-zinc-800 flex items-center justify-center text-gray-500">
            No song selected.
        </div>
    );
  }

  return (
    <div className="h-24 bg-black/50 backdrop-blur-xl border-t border-zinc-800 text-white p-4 flex items-center justify-between">
      <div className="flex items-center space-x-4 w-1/3">
        <img src={currentSong.coverArt} alt={currentSong.album} className="w-14 h-14 rounded-md" />
        <div>
          <h3 className="font-semibold text-white">{currentSong.title}</h3>
          <p className="text-sm text-gray-400">{currentSong.artist}</p>
        </div>
        {/* Simple audio element for playback demonstration, would be more complex in a real app */}
        {isPlaying && currentSong.audioSrc && <audio src={currentSong.audioSrc} autoPlay onEnded={playNext} />}
      </div>

      <div className="flex flex-col items-center space-y-2 w-1/3">
        <div className="flex items-center space-x-6">
          <button onClick={playPrev} className="text-gray-400 hover:text-white transition-colors"><SkipBackIcon /></button>
          <button onClick={togglePlay} className="w-10 h-10 flex items-center justify-center bg-white text-black rounded-full hover:scale-105 transition-transform">
            {isPlaying ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5" />}
          </button>
          <button onClick={playNext} className="text-gray-400 hover:text-white transition-colors"><SkipForwardIcon /></button>
        </div>
        <div className="w-full flex items-center space-x-2">
            <span className="text-xs text-gray-400">0:42</span>
            <div className="w-full h-1 bg-zinc-700 rounded-full overflow-hidden">
                <div className="h-full bg-white" style={{width: '30%'}}></div>
            </div>
            <span className="text-xs text-gray-400">{currentSong.duration}</span>
        </div>
      </div>
      
      <div className="flex items-center justify-end space-x-3 w-1/3">
        <Volume2Icon />
        <div className="w-24 h-1 bg-zinc-700 rounded-full">
            <div className="h-full bg-white w-3/4"></div>
        </div>
      </div>
    </div>
  );
};

export default Player;
