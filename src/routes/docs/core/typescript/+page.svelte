<script lang="ts">
  import IconCode from "~icons/heroicons/code-bracket-20-solid";
  import IconShield from "~icons/heroicons/shield-check-20-solid";
  import IconBug from "~icons/heroicons/bug-ant-20-solid";
</script>

<div class="prose max-w-none">
  <h1>TypeScript Integration</h1>

  <p>
    P5 Svelte is built with TypeScript from the ground up, providing excellent type safety and developer
    experience. This guide will show you how to leverage TypeScript effectively in your sketches.
  </p>

  <h2>Type Definitions</h2>

  <div class="card bg-base-200 mb-8">
    <div class="card-body">
      <h3 class="card-title">Core Types</h3>
      <div class="mockup-code">
<pre><code>{`// lib/core/types.ts
export type P5Extended = p5 & {
  [key: string]: any;  // Custom properties
};

export interface Sketch {
  setup?: (p5: P5Extended) => void;
  draw?: (p5: P5Extended) => void;
  mousePressed?: (p5: P5Extended) => void;
  // ... other event handlers
}

export interface P5Configuration {
  width?: number;
  height?: number;
  backgroundColor?: string;
  frameRate?: number;
  antialias?: boolean;
}`}</code></pre>
      </div>
    </div>
  </div>

  <h2>Using Types in Sketches</h2>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose mb-8">
    <div class="card bg-base-200">
      <div class="card-body">
        <h3 class="card-title">Basic Usage</h3>
        <div class="mockup-code">
<pre><code>{`import type { Sketch, P5Extended } from '$lib/core/types';

interface GameState {
  score: number;
  isPlaying: boolean;
}

const sketch: Sketch = {
  setup: (p5: P5Extended) => {
    p5._state = {
      score: 0,
      isPlaying: false
    } as GameState;
  }
};`}</code></pre>
        </div>
      </div>
    </div>

    <div class="card bg-base-200">
      <div class="card-body">
        <h3 class="card-title">With Custom Types</h3>
        <div class="mockup-code">
<pre><code>{`interface Particle {
  x: number;
  y: number;
  velocity: { x: number; y: number };
}

interface SketchState {
  particles: Particle[];
}

const sketch: Sketch = {
  setup: (p5: P5Extended) => {
    p5._state = {
      particles: []
    } as SketchState;
  }
};`}</code></pre>
        </div>
      </div>
    </div>
  </div>

  <h2>Type-Safe State Management</h2>

  <div class="collapse-group">
    <div class="collapse collapse-plus bg-base-200 mb-2">
      <input type="radio" name="typescript-examples" checked />
      <div class="collapse-title text-xl font-medium">
        Svelte Store Types
      </div>
      <div class="collapse-content">
        <div class="mockup-code">
<pre><code>{`import { writable } from 'svelte/store';

interface AppSettings {
  theme: 'light' | 'dark';
  frameRate: number;
  showFPS: boolean;
}

export const settings = writable<AppSettings>({
  theme: 'light',
  frameRate: 60,
  showFPS: true
});`}</code></pre>
        </div>
      </div>
    </div>

    <div class="collapse collapse-plus bg-base-200 mb-2">
      <input type="radio" name="typescript-examples" />
      <div class="collapse-title text-xl font-medium">
        Component Props
      </div>
      <div class="collapse-content">
        <div class="mockup-code">
<pre><code>{`<script lang="ts">
  import type { Sketch, P5Configuration } from '$lib/core/types';

  export let sketch: Sketch;
  export let config: P5Configuration = {};
</script>`}</code></pre>
        </div>
      </div>
    </div>
  </div>

  <h2>Advanced Types</h2>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 not-prose mb-8">
    <div class="card bg-primary text-primary-content">
      <div class="card-body">
        <IconCode class="w-8 h-8" />
        <h3 class="card-title">Utility Types</h3>
        <div class="mockup-code">
<pre><code>{`type Vector = {
  x: number;
  y: number;
};

type Dimension = {
  width: number;
  height: number;
};`}</code></pre>
        </div>
      </div>
    </div>

    <div class="card bg-secondary text-secondary-content">
      <div class="card-body">
        <IconShield class="w-8 h-8" />
        <h3 class="card-title">Type Guards</h3>
        <div class="mockup-code">
<pre><code>{`function isVector(obj: any):
  obj is Vector {
  return 'x' in obj
    && 'y' in obj;
}`}</code></pre>
        </div>
      </div>
    </div>

    <div class="card bg-accent text-accent-content">
      <div class="card-body">
        <IconBug class="w-8 h-8" />
        <h3 class="card-title">Debug Types</h3>
        <div class="mockup-code">
<pre><code>{`type Debug = {
  logs: string[];
  isDebug: boolean;
  level: 'info' | 'warn' | 'error';
};`}</code></pre>
        </div>
      </div>
    </div>
  </div>

  <h2>Best Practices</h2>

  <div class="alert alert-info mb-4">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
    <div>
      <h3 class="font-bold">TypeScript Tips:</h3>
      <ul class="mt-2">
        <li>Always define interfaces for state objects</li>
        <li>Use strict type checking (strict: true in tsconfig.json)</li>
        <li>Leverage type inference when possible</li>
        <li>Document complex types with JSDoc comments</li>
      </ul>
    </div>
  </div>

  <h2>Configuration</h2>

  <div class="card bg-base-200 mb-4">
    <div class="card-body">
      <h3 class="card-title">tsconfig.json</h3>
      <div class="mockup-code">
<pre><code>{`{
  "extends": "./.svelte-kit/tsconfig.json",
  "compilerOptions": {
    "strict": true,
    "allowUnreachableCode": false,
    "exactOptionalPropertyTypes": true,
    "noImplicitAny": true,
    "noImplicitThis": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}`}</code></pre>
    </div>
  </div>
</div>

  <h2>Next Steps</h2>
  <p>
    Now that you understand TypeScript integration, explore the
    <a href="/docs/examples/basic" class="link">Examples</a> section to see these concepts in action.
  </p>
</div>
