<script lang="ts">
  import IconClock from "~icons/heroicons/clock-20-solid";
  import IconRefresh from "~icons/heroicons/arrow-path-20-solid";
  import IconPlay from "~icons/heroicons/play-20-solid";
  import P5Canvas from "$lib/components/p5/P5Canvas.svelte";
  import type { Sketch } from "$lib/core/types";

  const demoSketch: Sketch = {
    setup: (p5) => {
      p5._events = [];
      p5.background(220);
      p5._events.push('Setup called');
    },
    draw: (p5) => {
      p5.background(220);
      p5.fill(0);
      p5.textSize(14);
      p5._events.forEach((event: any, i: number) => {
        p5.text(event, 10, 20 + i * 20);
      });
      if (p5._events.length > 10) p5._events.shift();
    },
    mousePressed: (p5) => {
      p5._events.push('Mouse pressed');
    },
    mouseDragged: (p5) => {
      p5._events.push('Mouse dragged');
    },
    mouseReleased: (p5) => {
      p5._events.push('Mouse released');
    }
  };
</script>

<div class="prose max-w-none">
  <h1>Sketch Lifecycle</h1>

  <p>
    Understanding the lifecycle of a P5.js sketch in P5 Svelte is crucial for creating efficient
    and responsive applications. The framework manages initialization, updates, and cleanup automatically.
  </p>

  <div class="card bg-base-200 mb-8">
    <div class="card-body">
      <h3 class="card-title">Interactive Demo</h3>
      <p>Click and drag on the canvas to see lifecycle events in action:</p>
      <P5Canvas sketch={demoSketch} />
    </div>
  </div>

  <h2>Lifecycle Phases</h2>

  <div class="timeline">
    <div class="timeline-item">
      <div class="timeline-content">
        <div class="card bg-primary text-primary-content">
          <div class="card-body">
            <IconPlay class="w-8 h-8" />
            <h3 class="card-title">1. Initialization</h3>
            <ul>
              <li>Component mounted</li>
              <li>P5.js instance created</li>
              <li>Canvas element initialized</li>
              <li>setup() function called</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="timeline-item">
      <div class="timeline-content">
        <div class="card bg-secondary text-secondary-content">
          <div class="card-body">
            <IconRefresh class="w-8 h-8" />
            <h3 class="card-title">2. Runtime Loop</h3>
            <ul>
              <li>draw() function called each frame</li>
              <li>Event handlers triggered</li>
              <li>State updates processed</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="timeline-item">
      <div class="timeline-content">
        <div class="card bg-accent text-accent-content">
          <div class="card-body">
            <IconClock class="w-8 h-8" />
            <h3 class="card-title">3. Cleanup</h3>
            <ul>
              <li>Component unmounted</li>
              <li>Resources released</li>
              <li>Event listeners removed</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

  <h2>Core Functions</h2>

  <div class="collapse-group">
    <div class="collapse collapse-plus bg-base-200 mb-2">
      <input type="radio" name="lifecycle-functions" checked />
      <div class="collapse-title text-xl font-medium">
        setup()
      </div>
      <div class="collapse-content">
        <div class="mockup-code mb-2">
<pre><code>{`setup: (p5) => {
  // Called once when sketch starts
  p5.createCanvas(400, 400);
  p5.background(220);
  // Initialize state
  p5._customState = {};
}`}</code></pre>
        </div>
        <ul>
          <li>Runs once at sketch initialization</li>
          <li>Set up canvas and initial state</li>
          <li>Configure sketch parameters</li>
        </ul>
      </div>
    </div>

    <div class="collapse collapse-plus bg-base-200 mb-2">
      <input type="radio" name="lifecycle-functions" />
      <div class="collapse-title text-xl font-medium">
        draw()
      </div>
      <div class="collapse-content">
        <div class="mockup-code mb-2">
<pre><code>{`draw: (p5) => {
  // Called every frame
  p5.background(220);
  // Update and render
  updateState(p5);
  renderElements(p5);
}`}</code></pre>
        </div>
        <ul>
          <li>Runs continuously (every frame)</li>
          <li>Update sketch state</li>
          <li>Render visual elements</li>
        </ul>
      </div>
    </div>

    <div class="collapse collapse-plus bg-base-200">
      <input type="radio" name="lifecycle-functions" />
      <div class="collapse-title text-xl font-medium">
        Event Handlers
      </div>
      <div class="collapse-content">
        <div class="mockup-code mb-2">
<pre><code>{`mousePressed: (p5) => {
  // Handle mouse interactions
},
keyPressed: (p5) => {
  // Handle keyboard input
}`}</code></pre>
        </div>
        <ul>
          <li>Respond to user interactions</li>
          <li>Update sketch state</li>
          <li>Trigger animations or effects</li>
        </ul>
      </div>
    </div>
  </div>

  <h2>State Management</h2>

  <div class="alert alert-info mb-4">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
    <div>
      <h3 class="font-bold">State Management Tips:</h3>
      <ul class="mt-2">
        <li>Store persistent state on the p5 instance using underscore prefix (e.g., p5._state)</li>
        <li>Use Svelte stores for state that needs to be shared between components</li>
        <li>Clean up state when component unmounts</li>
      </ul>
    </div>
  </div>

  <h2>Performance Considerations</h2>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose mb-8">
    <div class="card bg-warning text-warning-content">
      <div class="card-body">
        <h3 class="card-title">Common Pitfalls</h3>
        <ul>
          <li>Creating new objects every frame</li>
          <li>Not cleaning up resources</li>
          <li>Excessive DOM operations</li>
        </ul>
      </div>
    </div>

    <div class="card bg-success text-success-content">
      <div class="card-body">
        <h3 class="card-title">Best Practices</h3>
        <ul>
          <li>Reuse objects when possible</li>
          <li>Use appropriate data structures</li>
          <li>Implement proper cleanup</li>
        </ul>
      </div>
    </div>
  </div>

  <h2>Next Steps</h2>
  <p>
    Learn more about managing state in your sketches in the
    <a href="/docs/core/state-management" class="link">State Management</a> guide.
  </p>
</div>