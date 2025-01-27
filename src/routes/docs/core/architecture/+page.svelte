<script lang="ts">
  import IconFlow from "~icons/heroicons/arrow-path-20-solid";
  import IconCube from "~icons/heroicons/cube-20-solid";
  import IconLayout from "~icons/heroicons/square-2-stack-20-solid";
  import IconData from "~icons/heroicons/circle-stack-20-solid";
</script>

<div class="prose max-w-none">
  <h1>Architecture</h1>

  <p>
    P5 Svelte is built on a component-based architecture that seamlessly integrates P5.js with Svelte's
    reactive paradigm. Understanding the core architecture will help you build more efficient and maintainable sketches.
  </p>

  <h2>Core Components</h2>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose mb-8">
    <div class="card bg-base-200">
      <div class="card-body">
        <IconCube class="w-8 h-8" />
        <h3 class="card-title">P5Canvas Component</h3>
        <p>The primary component that manages P5.js instance lifecycle and rendering.</p>
        <div class="mockup-code mt-2">
<pre><code>{`<P5Canvas
  sketch={sketchConfig}
  config={canvasConfig}
/>`}</code></pre>
        </div>
      </div>
    </div>

    <div class="card bg-base-200">
      <div class="card-body">
        <IconFlow class="w-8 h-8" />
        <h3 class="card-title">P5Manager</h3>
        <p>Handles P5.js instance creation, destruction, and event management.</p>
        <div class="mockup-code mt-2">
<pre><code>{`class P5Manager {
  initialize()
  destroy()
  resize()
  toggleLoop()
}`}</code></pre>
        </div>
      </div>
    </div>
  </div>

  <h2>Framework Structure</h2>

  <div class="card bg-base-200 mb-8">
    <div class="card-body">
      <div class="mockup-code">
<pre><code>lib/
├── components/
│   ├── p5/
│   │   ├── P5Canvas.svelte    # Main canvas component
│   │   └── P5Controls.svelte  # Optional controls
│   └── examples/              # Example components
├── core/
│   ├── p5manager.ts          # P5.js instance management
│   └── types.ts              # TypeScript definitions
├── stores/
│   ├── settings.ts           # Global settings store
│   └── appState.ts           # Application state
└── utils/
    ├── constants.ts          # Configuration constants
    └── helpers.ts            # Utility functions</code></pre>
      </div>
    </div>
  </div>

  <h2>Key Concepts</h2>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 not-prose mb-8">
    <div class="card bg-primary text-primary-content">
      <div class="card-body">
        <IconLayout class="w-8 h-8" />
        <h3 class="card-title">Component Hierarchy</h3>
        <ul class="list-none p-0">
          <li>P5Canvas as root</li>
          <li>Managed P5 instance</li>
          <li>Sketch configuration</li>
        </ul>
      </div>
    </div>

    <div class="card bg-secondary text-secondary-content">
      <div class="card-body">
        <IconData class="w-8 h-8" />
        <h3 class="card-title">State Management</h3>
        <ul class="list-none p-0">
          <li>Svelte stores</li>
          <li>P5 instance state</li>
          <li>Reactive updates</li>
        </ul>
      </div>
    </div>

    <div class="card bg-accent text-accent-content">
      <div class="card-body">
        <IconFlow class="w-8 h-8" />
        <h3 class="card-title">Lifecycle Management</h3>
        <ul class="list-none p-0">
          <li>Setup and teardown</li>
          <li>Event handling</li>
          <li>Resource cleanup</li>
        </ul>
      </div>
    </div>
  </div>

  <h2>Data Flow</h2>

  <div class="overflow-x-auto">
    <table class="table">
      <thead>
        <tr>
          <th>Component</th>
          <th>Responsibility</th>
          <th>Data Direction</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>P5Canvas</td>
          <td>Canvas management and rendering</td>
          <td>↓ Props, ↑ Events</td>
        </tr>
        <tr>
          <td>P5Manager</td>
          <td>Instance lifecycle and state</td>
          <td>↕ Bidirectional</td>
        </tr>
        <tr>
          <td>Stores</td>
          <td>Global state management</td>
          <td>↔ Reactive</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h2>Configuration</h2>

  <div class="collapse collapse-plus bg-base-200 mb-4">
    <input type="radio" name="config-section" checked />
    <div class="collapse-title text-xl font-medium">
      Canvas Configuration
    </div>
    <div class="collapse-content">
      <div class="mockup-code">
<pre><code>{`interface P5Configuration {
  width?: number;
  height?: number;
  backgroundColor?: string;
  frameRate?: number;
  antialias?: boolean;
}`}</code></pre>
      </div>
    </div>
  </div>

  <div class="collapse collapse-plus bg-base-200 mb-4">
    <input type="radio" name="config-section" />
    <div class="collapse-title text-xl font-medium">
      Sketch Configuration
    </div>
    <div class="collapse-content">
      <div class="mockup-code">
<pre><code>{`interface Sketch {
  setup?: (p5: P5Extended) => void;
  draw?: (p5: P5Extended) => void;
  mousePressed?: (p5: P5Extended) => void;
  // Additional event handlers...
}`}</code></pre>
      </div>
    </div>
  </div>

  <h2>Best Practices</h2>

  <div class="alert alert-info mb-4">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
    <div>
      <h3 class="font-bold">Follow these guidelines for optimal performance:</h3>
      <ul class="mt-2">
        <li>Always cleanup resources in component destruction</li>
        <li>Use Svelte stores for shared state</li>
        <li>Maintain type safety with TypeScript</li>
        <li>Leverage reactive statements for state updates</li>
      </ul>
    </div>
  </div>

  <h2>Next Steps</h2>
  <p>
    Now that you understand the architecture, learn more about the
    <a href="/docs/core/sketch-lifecycle" class="link">Sketch Lifecycle</a> or
    dive into <a href="/docs/core/state-management" class="link">State Management</a>.
  </p>
</div>