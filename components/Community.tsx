
import React, { useState } from 'react';
import { MOCK_UPLOADED_SONGS, MOCK_USERS } from '../data/mock';
import type { UploadedSong } from '../types';
import UploadedSongCard from './UploadedSongCard';
import UploadSongModal from './UploadSongModal';
import { UploadCloudIcon } from './icons';

const Community: React.FC = () => {
    const [songs, setSongs] = useState<UploadedSong[]>(MOCK_UPLOADED_SONGS);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    // In a real app, the current user would come from auth context
    const currentUser = MOCK_USERS[2]; 

    const handleUploadSong = (newSong: UploadedSong) => {
        setSongs(prevSongs => [newSong, ...prevSongs]);
    };

    return (
        <div className="space-y-8">
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-cyan to-brand-pink">
                            Community Spotlight
                        </span>
                    </h1>
                    <p className="text-gray-400 mt-2">Discover music from emerging artists in the community.</p>
                </div>
                <button 
                    onClick={() => setIsUploadModalOpen(true)}
                    className="flex items-center justify-center px-5 py-3 bg-zinc-800 text-white font-semibold rounded-lg hover:bg-zinc-700 transition-colors"
                >
                    <UploadCloudIcon className="w-5 h-5 mr-2" />
                    Upload Your Song
                </button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {songs.map(song => (
                    <UploadedSongCard key={song.id} song={song} />
                ))}
            </div>

            {isUploadModalOpen && (
                <UploadSongModal 
                    onClose={() => setIsUploadModalOpen(false)}
                    onUpload={handleUploadSong}
                    currentUser={currentUser}
                />
            )}
        </div>
    );
};

export default Community;
