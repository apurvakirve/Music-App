
import React, { useState, useRef, useEffect } from 'react';
import type { UploadedSong, User } from '../types';
import { MicIcon, StopCircleIcon, UploadCloudIcon } from './icons';

interface UploadSongModalProps {
  onClose: () => void;
  onUpload: (song: UploadedSong) => void;
  currentUser: User;
}

const UploadSongModal: React.FC<UploadSongModalProps> = ({ onClose, onUpload, currentUser }) => {
  const [title, setTitle] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const cleanup = () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
    setAudioBlob(null);
  }

  const startRecording = async () => {
    try {
      cleanup();
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setAudioBlob(blob);
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing microphone:", err);
      alert("Microphone access was denied. Please allow microphone access in your browser settings.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      cleanup();
      const url = URL.createObjectURL(file);
      setAudioBlob(file);
      setAudioUrl(url);
      setTitle(file.name.replace(/\.[^/.]+$/, "")); // Auto-fill title from filename
    }
  };

  const handleUpload = () => {
    if (!title.trim() || !audioBlob || !audioUrl) {
      return;
    }
    const newSong: UploadedSong = {
      id: Date.now(),
      title,
      artist: currentUser.name,
      album: "Community Uploads",
      duration: "0:00", // Placeholder
      coverArt: `https://picsum.photos/seed/${title.replace(/\s/g, '-')}/400`,
      uploader: currentUser,
      likes: 0,
      comments: [],
      audioSrc: audioUrl,
    };
    onUpload(newSong);
    onClose();
  };
  
  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);


  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-zinc-900 rounded-lg p-8 w-full max-w-md m-4 space-y-6 relative shadow-2xl shadow-brand-purple/20">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl">&times;</button>
        <h2 className="text-2xl font-bold text-white">Upload Your Song</h2>
        
        <input
          type="text"
          placeholder="Song Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 bg-zinc-800 border-2 border-zinc-700 rounded-lg focus:ring-2 focus:ring-brand-purple focus:border-brand-purple transition-colors"
        />
        
        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="audio/*" className="hidden" />

        <div className="p-6 border-2 border-dashed border-zinc-700 rounded-lg">
            {!audioUrl && !isRecording && (
                 <div className="flex items-center justify-around">
                     <button onClick={startRecording} className="flex flex-col items-center text-brand-cyan hover:text-white transition-colors p-4">
                         <MicIcon className="w-12 h-12" />
                         <span className="mt-2 font-semibold">Record Audio</span>
                     </button>
                     <div className="h-20 w-px bg-zinc-700"></div>
                     <button onClick={() => fileInputRef.current?.click()} className="flex flex-col items-center text-brand-purple hover:text-white transition-colors p-4">
                         <UploadCloudIcon className="w-12 h-12" />
                         <span className="mt-2 font-semibold">Upload File</span>
                     </button>
                 </div>
            )}
            {isRecording && (
                <button onClick={stopRecording} className="flex flex-col items-center w-full text-brand-pink hover:text-white transition-colors">
                    <StopCircleIcon className="w-12 h-12 animate-pulse-fast" />
                    <span className="mt-2 font-semibold">Stop Recording</span>
                </button>
            )}
            {audioUrl && !isRecording && (
                <div className="w-full text-center space-y-4">
                    <p className="text-gray-300">Your audio is ready:</p>
                    <audio controls src={audioUrl} className="w-full"></audio>
                    <div className="flex justify-center gap-4">
                        <button onClick={startRecording} className="text-sm text-brand-cyan hover:underline">Record again</button>
                        <button onClick={() => fileInputRef.current?.click()} className="text-sm text-brand-purple hover:underline">Upload another</button>
                    </div>
                </div>
            )}
        </div>

        <button
          onClick={handleUpload}
          disabled={!title.trim() || !audioUrl}
          className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-brand-purple to-brand-pink text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform"
        >
          <UploadCloudIcon className="w-5 h-5 mr-2" />
          Publish Song
        </button>
      </div>
    </div>
  );
};

export default UploadSongModal;
