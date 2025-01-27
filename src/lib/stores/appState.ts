import { writable } from 'svelte/store';
import type { AppState } from '../core/types';

const initialState: AppState = {
  isInitialized: false,
  isPlaying: false,
  currentSketch: null,
  fps: 0,
  error: null
};

export const appState = writable<AppState>(initialState);

export function setError(error: string | null) {
  appState.update(state => ({ ...state, error }));
}

export function setCurrentSketch(sketchId: string | null) {
  appState.update(state => ({ ...state, currentSketch: sketchId }));
}

export function togglePlayback() {
  appState.update(state => ({ ...state, isPlaying: !state.isPlaying }));
}

export function updateFPS(fps: number) {
  appState.update(state => ({ ...state, fps }));
}