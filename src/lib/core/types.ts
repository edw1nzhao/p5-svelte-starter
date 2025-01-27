import type p5 from 'p5';

export type P5Extended = p5 & {
  [key: string]: any;  // This allows for any custom properties
};

export interface P5Configuration {
  width?: number;
  height?: number;
  backgroundColor?: string;
  frameRate?: number;
  antialias?: boolean;
}

export interface Sketch {
  setup?: (p5: P5Extended) => void;
  draw?: (p5: P5Extended, settings: AppSettings) => void;
  mousePressed?: (p5: P5Extended) => void;
  mouseDragged?: (p5: P5Extended) => void;
  mouseReleased?: (p5: P5Extended) => void;
  keyPressed?: (p5: P5Extended) => void;
}

export interface AppSettings {
  frameRate: number;
  showFPS: boolean;
  debugMode: boolean;
  theme: 'light' | 'dark';
  quality: 'low' | 'medium' | 'high';
}

export interface AppState {
  isInitialized: boolean;
  isPlaying: boolean;
  currentSketch: string | null;
  fps: number;
  error: string | null;
}

export type ExampleCategory = 'games' | 'visualizations' | 'simulations' | 'art';

export interface Example {
  id: string;
  title: string;
  description: string;
  category: ExampleCategory;
  thumbnail?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
}