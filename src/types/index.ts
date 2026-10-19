export interface PhotoItem {
  id: string;
  url: string;
  caption: string;
  subCaption?: string;
  style?: 'polaroid' | 'classic' | 'ribbon' | 'rounded';
  sticker?: 'heart' | 'bow' | 'sparkle' | 'flower' | 'star';
  rotation?: number; // initial slight tilt in degrees, e.g. -6 to 6
  depth?: number; // z-depth layer: 1 (near), 2 (mid), 3 (far)
  aspectRatio?: string; // e.g. 'aspect-square' or 'aspect-[4/5]'
}

export interface LyricLine {
  time: number; // in seconds
  text: string;
}

export interface SiteConfig {
  recipientName: string;
  senderName: string;
  secretPasscode: string; // 6 digits
  passcodeHint?: string;
  greeting: {
    badge: string;
    title: string;
    subtitle: string;
    buttonText: string;
  };
  letter: {
    title: string;
    salutation: string;
    paragraphs: string[];
    closing: string;
    sender: string;
    date: string;
  };
  music: {
    title: string;
    artist: string;
    audioSrc: string;
    autoPlayOnUnlock: boolean;
    fallbackToSynth: boolean;
  };
  photos: PhotoItem[];
  lyrics: LyricLine[];
}

