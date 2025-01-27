<script lang="ts">
  import IconBolt from "~icons/heroicons/bolt-20-solid";
  import IconCode from "~icons/heroicons/code-bracket-20-solid";
  import IconPuzzle from "~icons/heroicons/puzzle-piece-20-solid";
</script>

<div class="prose max-w-none">
  <h1>Documentation</h1>

  <h2>Getting Started</h2>
  <p>
    P5 Svelte is a framework that combines the power of P5.js with the reactivity and component-based architecture of Svelte.
    It provides a seamless way to create interactive visualizations, games, and creative coding projects.
  </p>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 not-prose my-8">
    <div class="card bg-primary text-primary-content">
      <div class="card-body">
        <IconBolt class="w-8 h-8" />
        <h3 class="card-title">Quick Setup</h3>
        <p>Get started quickly with our preconfigured environment including P5.js, TypeScript, and DaisyUI.</p>
      </div>
    </div>

    <div class="card bg-secondary text-secondary-content">
      <div class="card-body">
        <IconCode class="w-8 h-8" />
        <h3 class="card-title">Type Safety</h3>
        <p>Full TypeScript support with proper type definitions for P5.js and framework utilities.</p>
      </div>
    </div>

    <div class="card bg-accent text-accent-content">
      <div class="card-body">
        <IconPuzzle class="w-8 h-8" />
        <h3 class="card-title">Component-Based</h3>
        <p>Create reusable P5.js sketches as Svelte components with built-in lifecycle management.</p>
      </div>
    </div>
  </div>

  <h2>Basic Usage</h2>
  <p>To create a new P5.js sketch, use the P5Canvas component:</p>

  <pre><code class="language-typescript">{`import P5Canvas from "$lib/components/p5/P5Canvas.svelte";
import type { Sketch } from "$lib/core/types";

const sketch: Sketch = {
  setup: (p5) => {
    // Your setup code
  },
  draw: (p5) => {
    // Your draw code
  }
};

<P5Canvas {sketch} />`}</code></pre>

  <h2>Features</h2>
  <ul>
    <li>Automatic canvas management and cleanup</li>
    <li>Reactive settings and state management</li>
    <li>Dark/light theme support</li>
    <li>Built-in FPS counter and performance monitoring</li>
    <li>Responsive canvas sizing</li>
    <li>TypeScript support</li>
  </ul>

  <h2>API Reference</h2>
  <h3>P5Canvas Props</h3>
  <table>
    <thead>
      <tr>
        <th>Prop</th>
        <th>Type</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>sketch</td>
        <td>Sketch</td>
        <td>The P5.js sketch configuration object</td>
      </tr>
      <tr>
        <td>config</td>
        <td>P5Configuration</td>
        <td>Optional configuration for the canvas</td>
      </tr>
    </tbody>
  </table>
</div>