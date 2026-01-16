
import React, { useState } from 'react';
import type { UploadedSong } from '../types';
import { useMusicPlayer } from '../context/MusicContext';
import { PlayIcon, HeartIcon, MessageCircleIcon } from './icons';

interface UploadedSongCardProps {
  song: UploadedSong;
}

const UploadedSongCard: React.FC<UploadedSongCardProps> = ({ song }) => {
  const { playSong } = useMusicPlayer();
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(song.likes);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };
  
  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    playSong(song);
  };

  return (
    <div className="bg-zinc-800/50 p-4 rounded-lg group animate-slide-up transition-all duration-300 hover:bg-zinc-700/80">
      <div className="flex items-center gap-4">
        <div className="relative flex-shrink-0">
          <img src={song.coverArt} alt={song.title} className="w-24 h-24 rounded-md shadow-lg" />
           <button 
             onClick={handlePlay}
             className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-md cursor-pointer"
           >
             <PlayIcon className="w-8 h-8 text-white"/>
           </button>
        </div>
        <div className="flex-1 overflow-hidden">
          <h3 className="font-bold text-white truncate text-lg">{song.title}</h3>
          <div className="flex items-center text-sm text-gray-400 mt-1">
            <img src={song.uploader.avatar} alt={song.uploader.name} className="w-5 h-5 rounded-full mr-2"/>
            <span>{song.uploader.name}</span>
          </div>
          <div className="flex items-center space-x-4 mt-3 text-sm text-gray-400">
            <button onClick={handleLike} className={`flex items-center space-x-1 hover:text-white transition-colors ${isLiked ? 'text-brand-pink' : ''}`}>
              <HeartIcon className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              <span>{likes}</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-white transition-colors">
              <MessageCircleIcon className="w-4 h-4" />
              <span>{song.comments.length}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadedSongCard;
