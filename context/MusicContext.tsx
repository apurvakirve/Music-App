
import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Song, Playlist } from '../types';
import { MOCK_SONGS } from '../data/mock';

interface MusicContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  playSong: (song: Song, playlist?: Playlist) => void;
  playPlaylist: (playlist: Playlist) => void;
  togglePlay: () => void;
  playNext: () => void;
  playPrev: () => void;
  currentPlaylist: Playlist | null;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(MOCK_SONGS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentPlaylist, setCurrentPlaylist] = useState<Playlist | null>(null);

  const playSong = (song: Song, playlist?: Playlist) => {
    setCurrentSong(song);
    setIsPlaying(true);
    if (playlist) {
      setCurrentPlaylist(playlist);
    } else {
      // If it's a single song (e.g., from community), clear the playlist context
      setCurrentPlaylist(null);
    }
  };

  const playPlaylist = (playlist: Playlist) => {
    if (playlist.songs.length > 0) {
      playSong(playlist.songs[0], playlist);
    }
  };

  const togglePlay = () => {
    if (currentSong) {
      setIsPlaying(!isPlaying);
    }
  };
  
  const playNext = () => {
    if (!currentPlaylist || !currentSong) return;
    const currentIndex = currentPlaylist.songs.findIndex(s => s.id === currentSong.id);
    if (currentIndex > -1 && currentIndex < currentPlaylist.songs.length - 1) {
        playSong(currentPlaylist.songs[currentIndex + 1], currentPlaylist);
    }
  };

  const playPrev = () => {
    if (!currentPlaylist || !currentSong) return;
    const currentIndex = currentPlaylist.songs.findIndex(s => s.id === currentSong.id);
    if (currentIndex > 0) {
        playSong(currentPlaylist.songs[currentIndex - 1], currentPlaylist);
    }
  };


  return (
    <MusicContext.Provider value={{ currentSong, isPlaying, playSong, playPlaylist, togglePlay, playNext, playPrev, currentPlaylist }}>
      {children}
    </MusicContext.Provider>
  );
};

export const useMusicPlayer = (): MusicContextType => {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error('useMusicPlayer must be used within a MusicProvider');
  }
  return context;
};
