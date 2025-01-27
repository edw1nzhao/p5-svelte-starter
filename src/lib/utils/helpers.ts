import type p5 from 'p5';
import { CANVAS_DEFAULTS } from './constants';

export function constrainCanvasSize(width: number, height: number): [number, number] {
  const constrainedWidth = Math.min(
    Math.max(width, CANVAS_DEFAULTS.MIN_WIDTH),
    CANVAS_DEFAULTS.MAX_WIDTH
  );
  const constrainedHeight = Math.min(
    Math.max(height, CANVAS_DEFAULTS.MIN_HEIGHT),
    CANVAS_DEFAULTS.MAX_HEIGHT
  );
  return [constrainedWidth, constrainedHeight];
}

export function calculateFPS(p5: p5): number {
  return Math.round(p5.frameRate());
}

export function hexToRGB(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

export function getCanvasContainer(element: HTMLElement | null): HTMLElement | null {
  if (!element) return null;
  return element.querySelector('[data-p5-container]') || element;
}