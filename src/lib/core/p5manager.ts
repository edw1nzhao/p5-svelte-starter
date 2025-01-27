import type { Sketch, P5Configuration } from './types';
import { get } from 'svelte/store';
import { appState } from '../stores/appState';
import { settings } from '../stores/settings';

export class P5Manager {
  private p5Instance: any = null;
  private sketch: Sketch;
  private container: HTMLElement;
  private config: Required<P5Configuration>;

  constructor(container: HTMLElement, sketch: Sketch, config: P5Configuration = {}) {
    this.container = container;
    this.sketch = sketch;
    this.config = {
      width: config.width ?? 800,
      height: config.height ?? 600,
      backgroundColor: config.backgroundColor ?? '#ffffff',
      frameRate: config.frameRate ?? 60,
      antialias: config.antialias ?? true
    };
  }

  async initialize() {
    if (this.p5Instance) {
      this.destroy();
    }

    const p5Module = await import('p5');
    const p5 = p5Module.default;

    const wrappedSketch = (p: any) => {
      p.setupDone = false;


      p.setup = () => {
        if (p.setupDone) return;

        const canvas = p.createCanvas(this.config.width, this.config.height);
        canvas.parent(this.container);
        p.frameRate(this.config.frameRate);

        if (this.sketch.setup) {
          this.sketch.setup(p);
        }

        p.setupDone = true;
        appState.update(state => ({
          ...state,
          isInitialized: true
        }));
      };

      p.draw = () => {
        const currentSettings = get(settings);
        if (this.config.backgroundColor.startsWith('#')) {
          p.background(this.config.backgroundColor);
        } else {
          p.background(0);
        }

        if (this.sketch.draw) {
          this.sketch.draw(p, currentSettings);
        }
      };

      if (this.sketch.mousePressed) {
        p.mousePressed = () => {
          if (this.sketch.mousePressed) {
            this.sketch.mousePressed(p);
          }
          return false;
        };
      }

      if (this.sketch.mouseDragged) {
        p.mouseDragged = () => {
          if (this.sketch.mouseDragged) {
            this.sketch.mouseDragged(p);
          }
          return false;
        };
      }

      if (this.sketch.mouseReleased) {
        p.mouseReleased = () => {
          if (this.sketch.mouseReleased) {
            this.sketch.mouseReleased(p);
          }
          return false;
        };
      }

      if (this.sketch.keyPressed) {
        p.keyPressed = () => {
          if (this.sketch.keyPressed) {
            this.sketch.keyPressed(p);
          }
          return false;
        };
      }
    };

    this.p5Instance = new p5(wrappedSketch);
  }

  destroy() {
    if (this.p5Instance) {
      this.p5Instance.remove();
      this.p5Instance = null;
    }
  }

  resize(width: number, height: number) {
    if (this.p5Instance) {
      this.config.width = width;
      this.config.height = height;
      this.p5Instance.resizeCanvas(width, height);
    }
  }

  toggleLoop(shouldLoop: boolean) {
    if (this.p5Instance) {
      if (shouldLoop) {
        this.p5Instance.loop();
      } else {
        this.p5Instance.noLoop();
      }
    }
  }

  getP5Instance(): any | null {
    return this.p5Instance;
  }
}