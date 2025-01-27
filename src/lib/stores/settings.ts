import { writable } from 'svelte/store';
import type { AppSettings } from '../core/types';

const defaultSettings: AppSettings = {
  frameRate: 60,
  showFPS: true,
  debugMode: false,
  theme: 'light',
  quality: 'medium'
};

export const settings = writable<AppSettings>(defaultSettings);
