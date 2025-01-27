<script lang="ts">
  import IconBolt from "~icons/heroicons/bolt-20-solid";
  import IconCode from "~icons/heroicons/code-bracket-20-solid";
  import IconPuzzle from "~icons/heroicons/puzzle-piece-20-solid";
  import P5Canvas from "$lib/components/p5/P5Canvas.svelte";
  import type { Sketch } from "$lib/core/types";

  const simpleSketch: Sketch = {
    setup: (p5) => {
      p5.background(220);
    },
    draw: (p5) => {
      p5.fill(255, 0, 0);
      p5.noStroke();
      p5.ellipse(p5.mouseX, p5.mouseY, 20, 20);
    }
  };

  const interactiveSketch: Sketch = {
    setup: (p5) => {
      p5._circles = [];
      p5.background(220);
    },
    draw: (p5) => {
      p5.background(220);
      for (let circle of p5._circles) {
        p5.fill(circle.color);
        p5.ellipse(circle.x, circle.y, circle.size);
      }
    },
    mousePressed: (p5) => {
      p5._circles.push({
        x: p5.mouseX,
        y: p5.mouseY,
        size: p5.random(10, 50),
        color: p5.color(p5.random(255), p5.random(255), p5.random(255))
      });
    }
  };
</script>

<div class="prose max-w-none">
  <h1>Your First Sketch</h1>

  <p>
    Let's create an interactive sketch that demonstrates the core concepts of P5 Svelte.
    We'll start simple and gradually add more features.
  </p>

  <h2>Basic Setup</h2>
  <p>First, let's create a simple sketch that follows the mouse:</p>

  <div class="mockup-code mb-4">
<pre><code>{`<script lang="ts">
  import P5Canvas from "$lib/components/p5/P5Canvas.svelte";
  import type { Sketch } from "$lib/core/types";

  const sketch: Sketch = {
    setup: (p5) => {
      p5.background(220);
    },
    draw: (p5) => {
      p5.fill(255, 0, 0);
      p5.noStroke();
      p5.ellipse(p5.mouseX, p5.mouseY, 20, 20);
    }
  };
</script>

<P5Canvas {sketch} />`}</code></pre>
  </div>

  <div class="card bg-base-200 mb-4">
    <div class="card-body">
      <h3 class="card-title">Result:</h3>
      <P5Canvas sketch={simpleSketch} />
    </div>
  </div>

  <h2>Adding Interactivity</h2>
  <p>
    Now let's create a more interactive sketch that stores state and responds to mouse clicks:
  </p>

  <div class="mockup-code mb-4">
<pre><code>{`const sketch: Sketch = {
  setup: (p5) => {
    p5._circles = [];  // Store state in p5 instance
    p5.background(220);
  },
  draw: (p5) => {
    p5.background(220);
    for (let circle of p5._circles) {
      p5.fill(circle.color);
      p5.ellipse(circle.x, circle.y, circle.size);
    }
  },
  mousePressed: (p5) => {
    p5._circles.push({
      x: p5.mouseX,
      y: p5.mouseY,
      size: p5.random(10, 50),
      color: p5.color(p5.random(255), p5.random(255), p5.random(255))
    });
  }
};`}</code></pre>
  </div>

  <div class="card bg-base-200 mb-4">
    <div class="card-body">
      <h3 class="card-title">Try it out! Click anywhere on the canvas:</h3>
      <P5Canvas sketch={interactiveSketch} />
    </div>
  </div>

  <h2>Key Concepts</h2>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 not-prose mb-4">
    <div class="card bg-primary text-primary-content">
      <div class="card-body">
        <h3 class="card-title">Sketch Lifecycle</h3>
        <p>Understanding setup(), draw(), and event handlers</p>
      </div>
    </div>

    <div class="card bg-secondary text-secondary-content">
      <div class="card-body">
        <h3 class="card-title">State Management</h3>
        <p>Storing and updating sketch state</p>
      </div>
    </div>

    <div class="card bg-accent text-accent-content">
      <div class="card-body">
        <h3 class="card-title">Event Handling</h3>
        <p>Responding to user interactions</p>
      </div>
    </div>
  </div>

  <h2>Breaking Down the Code</h2>

  <div class="collapse collapse-plus bg-base-200 mb-2">
    <input type="radio" name="code-breakdown" checked />
    <div class="collapse-title text-xl font-medium">
      Setup Function
    </div>
    <div class="collapse-content">
      <p>The setup function runs once when the sketch starts:</p>
      <ul>
        <li>Initializes the circles array to store our state</li>
        <li>Sets the initial background color</li>
      </ul>
    </div>
  </div>

  <div class="collapse collapse-plus bg-base-200 mb-2">
    <input type="radio" name="code-breakdown" />
    <div class="collapse-title text-xl font-medium">
      Draw Function
    </div>
    <div class="collapse-content">
      <p>The draw function runs continuously:</p>
      <ul>
        <li>Clears the background each frame</li>
        <li>Renders all circles stored in our state</li>
      </ul>
    </div>
  </div>

  <div class="collapse collapse-plus bg-base-200 mb-2">
    <input type="radio" name="code-breakdown" />
    <div class="collapse-title text-xl font-medium">
      Mouse Events
    </div>
    <div class="collapse-content">
      <p>The mousePressed function handles click events:</p>
      <ul>
        <li>Creates a new circle at the mouse position</li>
        <li>Adds it to our circles array with random properties</li>
      </ul>
    </div>
  </div>

  <h2>Next Steps</h2>
  <div class="alert alert-info mb-4">
    <IconBolt class="w-6 h-6" />
    <span>
      Ready to learn more? Check out the <a href="/docs/core/architecture" class="link">Architecture</a> guide
      or explore some <a href="/docs/examples/basic" class="link">Basic Examples</a>.
    </span>
  </div>
</div>