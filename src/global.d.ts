/// <reference types="@sveltejs/kit" />
import type p5 from 'p5';

declare global {
  interface Window {
    p5: typeof p5 & {
      prototype: any;
    };
  }
}

export {};