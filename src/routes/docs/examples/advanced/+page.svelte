<script lang="ts">
  import IconCpu from "~icons/heroicons/cpu-chip-20-solid";
  import IconBolt from "~icons/heroicons/bolt-20-solid";
  import IconWrench from "~icons/heroicons/wrench-screwdriver-20-solid";
  import P5Canvas from "$lib/components/p5/P5Canvas.svelte";
  import type { Sketch } from "$lib/core/types";
  import { writable } from 'svelte/store';

  // Shader-like Effect Example
  const shaderSketch: Sketch = {
    setup: (p5) => {
      p5._time = 0;
    },
    draw: (p5) => {
      p5.loadPixels();
      let d = p5.pixelDensity();
      let halfH = p5.height / 2;
      let halfW = p5.width / 2;

      for (let x = 0; x < p5.width; x++) {
        for (let y = 0; y < p5.height; y++) {
          let dx = x - halfW;
          let dy = y - halfH;
          let dist = p5.sqrt(dx * dx + dy * dy);

          let angle = p5.atan2(dy, dx);
          let noise = p5.noise(
            dist * 0.01,
            angle * 0.1,
            p5._time * 0.01
          );

          let c = p5.color(
            p5.map(noise, 0, 1, 0, 255),
            p5.map(dist, 0, halfW, 255, 0),
            p5.map(angle, -p5.PI, p5.PI, 0, 255)
          );

          let idx = 4 * ((y * d) * p5.width * d + (x * d));
          p5.pixels[idx] = p5.red(c);
          p5.pixels[idx + 1] = p5.green(c);
          p5.pixels[idx + 2] = p5.blue(c);
          p5.pixels[idx + 3] = 255;
        }
      }
      p5.updatePixels();
      p5._time++;
    }
  };

  // Store for custom parameters
  const params = writable({
    resolution: 50,
    speed: 0.01,
    complexity: 0.5
  });
</script>

<div class="prose max-w-none">
  <h1>Advanced Techniques</h1>

  <p>
    Explore advanced creative coding techniques using P5 Svelte. These examples demonstrate
    complex rendering techniques, optimization strategies, and integration with Svelte's
    reactive system.
  </p>

  <h2>Pixel Manipulation</h2>
  <div class="card bg-base-200 mb-8">
    <div class="card-body">
      <h3 class="card-title">Shader-like Effects</h3>
      <p>Direct pixel manipulation creating shader-like effects:</p>
      <P5Canvas sketch={shaderSketch} />

      <div class="collapse collapse-plus bg-base-100">
        <input type="checkbox" />
        <div class="collapse-title text-xl font-medium">
          View Code
        </div>
        <div class="collapse-content">
          <div class="mockup-code">
<pre><code>{`const shaderSketch: Sketch = {
  setup: (p5) => {
    p5._time = 0;
  },
  draw: (p5) => {
    p5.loadPixels();
    // Pixel manipulation logic...
    p5.updatePixels();
  }
};`}</code></pre>
          </div>
        </div>
      </div>
    </div>
  </div>

  <h2>Advanced Topics</h2>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 not-prose mb-8">
    <div class="card bg-primary text-primary-content">
      <div class="card-body">
        <IconCpu class="w-8 h-8" />
        <h3 class="card-title">Performance</h3>
        <ul>
          <li>WebGL integration</li>
          <li>Memory management</li>
          <li>Worker threads</li>
        </ul>
      </div>
    </div>

    <div class="card bg-secondary text-secondary-content">
      <div class="card-body">
        <IconBolt class="w-8 h-8" />
        <h3 class="card-title">Reactive Integration</h3>
        <ul>
          <li>Svelte stores</li>
          <li>Custom events</li>
          <li>State synchronization</li>
        </ul>
      </div>
    </div>

    <div class="card bg-accent text-accent-content">
      <div class="card-body">
        <IconWrench class="w-8 h-8" />
        <h3 class="card-title">Advanced Rendering</h3>
        <ul>
          <li>Custom shaders</li>
          <li>Post-processing</li>
          <li>Render targets</li>
        </ul>
      </div>
    </div>
  </div>

  <h2>Performance Optimization</h2>

  <div class="collapse-group">
    <div class="collapse collapse-plus bg-base-200 mb-2">
      <input type="radio" name="advanced-topics" checked />
      <div class="collapse-title text-xl font-medium">
        Memory Management
      </div>
      <div class="collapse-content">
        <div class="mockup-code">
<pre><code>{`// Object pooling example
class ParticlePool {
  constructor(size) {
    this.pool = new Array(size)
      .fill(null)
      .map(() => new Particle());
  }

  get() {
    return this.pool.find(p => !p.active);
  }
}`}</code></pre>
        </div>
      </div>
    </div>

    <div class="collapse collapse-plus bg-base-200 mb-2">
      <input type="radio" name="advanced-topics" />
      <div class="collapse-title text-xl font-medium">
        WebGL Integration
      </div>
      <div class="collapse-content">
        <div class="mockup-code">
<pre><code>{`const sketch: Sketch = {
  setup: (p5) => {
    let shader = p5.createShader(vertSrc, fragSrc);
    p5.shader(shader);
  }
};`}</code></pre>
        </div>
      </div>
    </div>

    <div class="collapse collapse-plus bg-base-200 mb-2">
      <input type="radio" name="advanced-topics" />
      <div class="collapse-title text-xl font-medium">
        Worker Threads
      </div>
      <div class="collapse-content">
        <div class="mockup-code">
<pre><code>{`// Web Worker example
const worker = new Worker('compute.js');
worker.postMessage({ data });
worker.onmessage = (e) => {
  // Handle computed results
};`}</code></pre>
        </div>
      </div>
    </div>
  </div>

  <h2>Integration Patterns</h2>

  <div class="alert alert-info mb-4">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
    <div>
      <h3 class="font-bold">Advanced Integration Tips:</h3>
      <ul class="mt-2">
        <li>Use custom events for complex interactions</li>
        <li>Implement proper cleanup in onDestroy</li>
        <li>Leverage Svelte's reactive statements</li>
        <li>Handle WebGL context loss and restoration</li>
      </ul>
    </div>
  </div>

  <h2>Additional Resources</h2>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose mb-8">
    <a href="https://github.com/processing/p5.js/wiki/Getting-started-with-WebGL-in-p5" target="_blank" class="card bg-base-200 hover:bg-base-300 transition-colors">
      <div class="card-body">
        <h3 class="card-title">WebGL Guide</h3>
        <p>Learn more about P5.js WebGL capabilities</p>
      </div>
    </a>

    <a href="https://svelte.dev/tutorial/reactive-statements" target="_blank" class="card bg-base-200 hover:bg-base-300 transition-colors">
      <div class="card-body">
        <h3 class="card-title">Svelte Reactivity</h3>
        <p>Deep dive into Svelte's reactive system</p>
      </div>
    </a>
  </div>

  <h2>Contributing</h2>
  <p>
    Have an advanced technique you'd like to share? Consider contributing to our
    examples repository on GitHub. We welcome new examples and improvements to existing ones.
  </p>
</div>