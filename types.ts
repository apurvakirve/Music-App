
export interface Song {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: string;
  coverArt: string;
  audioSrc?: string; // For uploaded songs
}

export interface Playlist {
  id: number;
  name: string;
  songs: Song[];
  coverArt: string;
  description?: string;
}

export interface User {
  id: number;
  name: string;
  avatar: string;
  followers: number;
  following: number;
}

export interface Comment {
  id: number;
  user: User;
  text: string;
  timestamp: string;
}

export interface UploadedSong extends Song {
  uploader: User;
  likes: number;
  comments: Comment[];
}


export type View = 'home' | 'search' | 'library' | 'ai-generator' | 'community';
