
import React, { useState } from 'react';
import { generatePlaylist, generateAlbumArt } from '../services/geminiService';
import type { Playlist, Song } from '../types';
import { useMusicPlayer } from '../context/MusicContext';
import { PlayIcon, SparklesIcon } from './icons';

// Mocked response for demonstration
const MOCK_AI_PLAYLIST: Playlist = {
    id: 101,
    name: "Neon-Drenched Midnight",
    description: "A playlist for rainy nights in a cyberpunk city, perfect for coding and contemplation.",
    songs: [
        { id: 10, title: "Resonance", artist: "HOME", album: "Odyssey", duration: "3:32", coverArt: "https://picsum.photos/seed/resonance/400" },
        { id: 11, title: "A Real Hero", artist: "College & Electric Youth", album: "Drive Soundtrack", duration: "4:27", coverArt: "https://picsum.photos/seed/hero/400" },
        { id: 12, title: "Bladerunner 2049", artist: "Synthwave Goose", album: "Bladerunner 2049", duration: "3:45", coverArt: "https://picsum.photos/seed/bladerunner/400" },
        { id: 13, title: "Dust", artist: "M|O|O|N", album: "MOON E.P.", duration: "4:55", coverArt: "https://picsum.photos/seed/dust/400" },
        { id: 14, title: "First Blood", artist: "Kavinsky", album: "OutRun", duration: "3:40", coverArt: "https://picsum.photos/seed/kavinsky/400" },
    ],
    coverArt: "https://picsum.photos/seed/cyberpunk-rain/400"
};

const AiPlaylistGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [generatedPlaylist, setGeneratedPlaylist] = useState<Playlist | null>(null);
  const { playPlaylist, playSong } = useMusicPlayer();

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    setGeneratedPlaylist(null);
    try {
      // In a real app, you would call the Gemini service.
      // const playlistData = await generatePlaylist(prompt);
      // const artUrl = await generateAlbumArt(playlistData.playlistName);
      // For this demo, we'll use mocked data after a delay.
      await new Promise(res => setTimeout(res, 2000));
      setGeneratedPlaylist(MOCK_AI_PLAYLIST);
    } catch (error) {
      console.error("Error generating playlist:", error);
      // Handle error state in UI
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-pink to-brand-cyan">
            AI Playlist Generator
          </span>
        </h1>
        <p className="text-gray-400">Describe a mood, a scene, or an activity, and let Gemini craft the perfect playlist for you.</p>
      </div>

      <div className="relative">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., A rainy night in a cyberpunk city, coding and drinking coffee..."
          className="w-full h-28 p-4 bg-zinc-800 border-2 border-zinc-700 rounded-lg focus:ring-2 focus:ring-brand-purple focus:border-brand-purple transition-all duration-300 resize-none"
          disabled={isLoading}
        />
        <button
          onClick={handleGenerate}
          disabled={isLoading || !prompt.trim()}
          className="absolute bottom-4 right-4 flex items-center justify-center px-4 py-2 bg-gradient-to-r from-brand-purple to-brand-pink text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform"
        >
          {isLoading ? (
            <>
              <SparklesIcon className="w-5 h-5 mr-2 animate-pulse-fast" />
              Generating...
            </>
          ) : (
            <>
              <SparklesIcon className="w-5 h-5 mr-2" />
              Generate
            </>
          )}
        </button>
      </div>

      {isLoading && (
        <div className="text-center p-8">
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-brand-purple mx-auto"></div>
            <p className="mt-4 text-gray-300">Crafting your soundscape...</p>
        </div>
      )}

      {generatedPlaylist && (
        <div className="bg-zinc-800/50 p-6 rounded-lg animate-fade-in">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex-shrink-0">
                <img src={generatedPlaylist.coverArt} alt="AI Generated Album Art" className="w-full sm:w-48 h-auto aspect-square rounded-lg shadow-2xl shadow-brand-purple/20" />
            </div>
            <div className="flex-1">
                <h2 className="text-3xl font-bold">{generatedPlaylist.name}</h2>
                <p className="text-gray-400 mb-4">{generatedPlaylist.description}</p>
                <button
                    onClick={() => playPlaylist(generatedPlaylist)}
                    className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-brand-purple to-brand-pink text-white font-semibold rounded-lg hover:scale-105 transition-transform"
                >
                    <PlayIcon className="w-5 h-5 mr-2" />
                    Play All
                </button>
            </div>
          </div>
          <ul className="mt-6 space-y-2">
            {generatedPlaylist.songs.map((song, index) => (
              <li key={song.id} className="flex items-center p-2 rounded-md hover:bg-zinc-700 cursor-pointer" onClick={() => playSong(song)}>
                <span className="text-gray-400 w-8 text-center">{index + 1}</span>
                <img src={song.coverArt} alt={song.album} className="w-10 h-10 rounded-md mr-4" />
                <div className="flex-1">
                  <p className="font-medium text-white">{song.title}</p>
                  <p className="text-sm text-gray-400">{song.artist}</p>
                </div>
                <span className="text-sm text-gray-400">{song.duration}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AiPlaylistGenerator;
