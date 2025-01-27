<script lang="ts">
  import IconDatabase from "~icons/heroicons/circle-stack-20-solid";
  import IconArrowsUpDown from "~icons/heroicons/arrows-up-down-20-solid";
  import IconBolt from "~icons/heroicons/bolt-20-solid";
  import P5Canvas from "$lib/components/p5/P5Canvas.svelte";
  import type { Sketch } from "$lib/core/types";
  import { writable } from 'svelte/store';

  // Demo store for the interactive example
  const demoStore = writable({
    color: '#ff0000',
    size: 20,
    speed: 1
  });

  // Demo sketch that uses Svelte store
  const demoSketch: Sketch = {
    setup: (p5) => {
      p5._position = { x: 0, y: p5.height / 2 };
    },
    draw: (p5) => {
      let state;
      demoStore.subscribe(s => state = s)();

      p5.background(220);
      p5._position.x = (p5._position.x + state.speed) % p5.width;

      p5.fill(state.color);
      p5.noStroke();
      p5.circle(p5._position.x, p5._position.y, state.size);
    }
  };

  // UI state management
  let color = '#ff0000';
  let size = 20;
  let speed = 1;

  $: demoStore.set({ color, size, speed });
</script>

<div class="prose max-w-none">
  <h1>State Management</h1>

  <p>
    P5 Svelte provides multiple ways to manage state in your sketches, from local sketch state to
    global application state using Svelte stores.
  </p>

  <h2>Interactive Demo</h2>
  <div class="card bg-base-200 mb-8">
    <div class="card-body">
      <div class="flex flex-col gap-4">
        <div class="form-control">
          <label class="label">
            <span class="label-text">Color</span>
          </label>
          <input type="color" bind:value={color} class="input w-full" />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Size: {size}px</span>
          </label>
          <input type="range" bind:value={size} min="5" max="50" class="range" />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Speed: {speed}</span>
          </label>
          <input type="range" bind:value={speed} min="0" max="5" step="0.1" class="range" />
        </div>

        <P5Canvas sketch={demoSketch} />
      </div>
    </div>
  </div>

  <h2>State Management Approaches</h2>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 not-prose mb-8">
    <div class="card bg-primary text-primary-content">
      <div class="card-body">
        <IconDatabase class="w-8 h-8" />
        <h3 class="card-title">Local State</h3>
        <p>State stored directly on the P5 instance.</p>
        <div class="mockup-code">
<pre><code>{`p5._state = {
  position: { x: 0, y: 0 },
  speed: 5
};`}</code></pre>
        </div>
      </div>
    </div>

    <div class="card bg-secondary text-secondary-content">
      <div class="card-body">
        <IconArrowsUpDown class="w-8 h-8" />
        <h3 class="card-title">Svelte Stores</h3>
        <p>Reactive state management using Svelte stores.</p>
        <div class="mockup-code">
<pre><code>{`const store = writable({
  color: '#ff0000'
});`}</code></pre>
        </div>
      </div>
    </div>

    <div class="card bg-accent text-accent-content">
      <div class="card-body">
        <IconBolt class="w-8 h-8" />
        <h3 class="card-title">Props</h3>
        <p>Configuration passed through component props.</p>
        <div class="mockup-code">
<pre><code>{`<P5Canvas
  sketch={sketch}
  config={config}
/>`}</code></pre>
        </div>
      </div>
    </div>
  </div>

  <h2>Using Svelte Stores</h2>

  <div class="mockup-code mb-4">
<pre><code>{`// stores/sketchState.ts
import { writable } from 'svelte/store';

export const sketchState = writable({
  color: '#ff0000',
  size: 20,
  speed: 1
});

// YourSketch.svelte
const sketch: Sketch = {
  draw: (p5) => {
    sketchState.subscribe(state => {
      p5.fill(state.color);
      p5.circle(x, y, state.size);
    })();
  }
};`}</code></pre>
  </div>

  <h2>Local State Management</h2>

  <div class="collapse-group">
    <div class="collapse collapse-plus bg-base-200 mb-2">
      <input type="radio" name="state-management" checked="checked" />
      <div class="collapse-title text-xl font-medium">
        Initialization
      </div>
      <div class="collapse-content">
        <div class="mockup-code">
<pre><code>{`setup: (p5) => {
  p5._state = {
    entities: [],
    score: 0,
    isActive: true
  };
}`}</code></pre>
        </div>
      </div>
    </div>

    <div class="collapse collapse-plus bg-base-200 mb-2">
      <input type="radio" name="state-management" />
      <div class="collapse-title text-xl font-medium">
        Updates
      </div>
      <div class="collapse-content">
        <div class="mockup-code">
<pre><code>{`draw: (p5) => {
  // Update state
  p5._state.entities.forEach(entity => {
    entity.update();
  });

  // Render based on state
  p5._state.entities.forEach(entity => {
    entity.render(p5);
  });
}`}</code></pre>
        </div>
      </div>
    </div>
  </div>

  <h2>Best Practices</h2>

  <div class="alert alert-warning mb-4">
    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
    <div>
      <h3 class="font-bold">Common Pitfalls to Avoid:</h3>
      <ul class="mt-2">
        <li>Modifying state directly in event handlers without proper synchronization</li>
        <li>Creating new objects every frame instead of updating existing ones</li>
        <li>Not cleaning up subscriptions when the sketch is destroyed</li>
      </ul>
    </div>
  </div>

  <h2>Next Steps</h2>
  <p>
    Learn how to add type safety to your state management with the
    <a href="/docs/core/typescript" class="link">TypeScript Integration</a> guide.
  </p>
</div>