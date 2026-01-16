
import { GoogleGenAI, Type } from "@google/genai";
import type { Playlist, Song } from '../types';

// This is a placeholder for the API key.
// In a real application, this would be handled securely.
const API_KEY = process.env.API_KEY;
const ai = new GoogleGenAI({ apiKey: API_KEY! });

const playlistSchema = {
    type: Type.OBJECT,
    properties: {
        playlistName: {
            type: Type.STRING,
            description: 'An evocative and creative name for the playlist, based on the user\'s prompt.',
        },
        description: {
            type: Type.STRING,
            description: 'A short, one-sentence description of the playlist\'s mood and theme.',
        },
        songs: {
            type: Type.ARRAY,
            description: 'An array of 5 to 10 song objects that fit the user\'s prompt.',
            items: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING },
                    artist: { type: Type.STRING },
                    album: { type: Type.STRING },
                },
                required: ['title', 'artist', 'album'],
            },
        },
    },
    required: ['playlistName', 'description', 'songs'],
};

interface GeminiPlaylistResponse {
    playlistName: string;
    description: string;
    songs: Omit<Song, 'id' | 'duration' | 'coverArt'>[];
}

export const generatePlaylist = async (prompt: string): Promise<Playlist> => {
    if (!API_KEY) {
        throw new Error("API key is not configured.");
    }
    
    const result = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Create a playlist based on this prompt: "${prompt}". Follow the provided JSON schema precisely.`,
        config: {
            responseMimeType: 'application/json',
            responseSchema: playlistSchema,
        },
    });

    const responseText = result.text;
    if (!responseText) {
        throw new Error("Failed to generate playlist. The model returned an empty response.");
    }

    const parsedResponse: GeminiPlaylistResponse = JSON.parse(responseText);

    const playlistSongs: Song[] = parsedResponse.songs.map((song, index) => ({
        ...song,
        id: Date.now() + index,
        duration: "3:30", // Placeholder duration
        coverArt: `https://picsum.photos/seed/${song.title.replace(/\s/g, '-')}/400`, // Placeholder art
    }));

    return {
        id: Date.now(),
        name: parsedResponse.playlistName,
        description: parsedResponse.description,
        songs: playlistSongs,
        coverArt: `https://picsum.photos/seed/${parsedResponse.playlistName.replace(/\s/g, '-')}/400`,
    };
};

export const generateAlbumArt = async (playlistName: string): Promise<string> => {
    if (!API_KEY) {
        throw new Error("API key is not configured.");
    }

    const imagePrompt = `Create a stunning, moody, and atmospheric album cover for a playlist named "${playlistName}". The style should be abstract and evocative of the playlist's title. Digital painting style.`;
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: imagePrompt }] },
    });
    
    for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
            const base64EncodeString: string = part.inlineData.data;
            return `data:image/png;base64,${base64EncodeString}`;
        }
    }

    // Fallback image if generation fails
    return `https://picsum.photos/seed/${playlistName.replace(/\s/g, '-')}/400`;
};
