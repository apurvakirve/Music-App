
import type { Song, Playlist, User, Comment, UploadedSong } from '../types';

export const MOCK_SONGS: Song[] = [
  { id: 1, title: "Mirage", artist: "Else", album: "Mirage", duration: "4:20", coverArt: "https://picsum.photos/seed/mirage/400" },
  { id: 2, title: "Genesis", artist: "Grimes", album: "Visions", duration: "4:15", coverArt: "https://picsum.photos/seed/genesis/400" },
  { id: 3, title: "Midnight City", artist: "M83", album: "Hurry Up, We're Dreaming", duration: "4:04", coverArt: "https://picsum.photos/seed/midnight/400" },
  { id: 4, title: "Solar Sailer", artist: "Daft Punk", album: "TRON: Legacy", duration: "2:42", coverArt: "https://picsum.photos/seed/solar/400" },
  { id: 5, title: "Intro", artist: "The xx", album: "xx", duration: "2:08", coverArt: "https://picsum.photos/seed/intro/400" },
  { id: 6, title: "Nightcall", artist: "Kavinsky", album: "OutRun", duration: "4:19", coverArt: "https://picsum.photos/seed/nightcall/400" },
];

export const MOCK_PLAYLISTS: Playlist[] = [
  { id: 1, name: "Synthwave Dreams", songs: MOCK_SONGS.slice(0, 3), coverArt: "https://picsum.photos/seed/synth/400", description: "Futuristic sounds for late night drives." },
  { id: 2, name: "Lo-Fi Focus", songs: MOCK_SONGS.slice(2, 5), coverArt: "https://picsum.photos/seed/lofi/400", description: "Chill beats to study and relax to." },
  { id: 3, name: "Indie Chillout", songs: MOCK_SONGS.slice(1, 4), coverArt: "https://picsum.photos/seed/indie/400", description: "Relax and unwind with these indie gems." },
  { id: 4, name: "Electronic Escape", songs: MOCK_SONGS.slice(3, 6), coverArt: "https://picsum.photos/seed/electronic/400", description: "Get lost in the world of electronic music." },
];

export const MOCK_USERS: User[] = [
  { id: 1, name: "SynthFan92", avatar: "https://i.pravatar.cc/150?u=user1", followers: 120, following: 45 },
  { id: 2, name: "VocalVibes", avatar: "https://i.pravatar.cc/150?u=user2", followers: 580, following: 12 },
  { id: 3, name: "KaraokeKing", avatar: "https://i.pravatar.cc/150?u=user3", followers: 32, following: 100 },
];

export const MOCK_COMMENTS: Comment[] = [
    { id: 1, user: MOCK_USERS[1], text: "Wow, what a voice! Goosebumps!", timestamp: "2 days ago" },
    { id: 2, user: MOCK_USERS[2], text: "This is amazing! Keep it up!", timestamp: "1 day ago" },
];

export const MOCK_UPLOADED_SONGS: UploadedSong[] = [
    {
        id: 201,
        title: "Echoes in the Rain",
        artist: "SynthFan92",
        album: "Community Uploads",
        duration: "2:15",
        coverArt: "https://picsum.photos/seed/echoes/400",
        uploader: MOCK_USERS[0],
        likes: 42,
        comments: MOCK_COMMENTS,
    },
    {
        id: 202,
        title: "Starlight Serenade",
        artist: "VocalVibes",
        album: "Community Uploads",
        duration: "3:05",
        coverArt: "https://picsum.photos/seed/starlight/400",
        uploader: MOCK_USERS[1],
        likes: 158,
        comments: [MOCK_COMMENTS[0]],
    },
];
