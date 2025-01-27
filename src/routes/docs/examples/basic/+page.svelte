<script lang="ts">
  import IconBolt from "~icons/heroicons/bolt-20-solid";
  import IconCode from "~icons/heroicons/code-bracket-20-solid";
  import P5Canvas from "$lib/components/p5/P5Canvas.svelte";
  import type { Sketch } from "$lib/core/types";

  // Basic Drawing Example
  const drawingSketch: Sketch = {
    setup: (p5) => {
      p5.background(220);
    },
    draw: (p5) => {
      p5.stroke(0);
      if (p5.mouseIsPressed) {
        p5.line(p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY);
      }
    }
  };

  // Shapes and Colors Example
  const shapesSketch: Sketch = {
    setup: (p5) => {
      p5._hue = 0;
    },
    draw: (p5) => {
      p5.background(220);
      p5.colorMode(p5.HSB, 360, 100, 100);

      p5._hue = (p5._hue + 1) % 360;

      p5.fill(p5._hue, 80, 90);
      p5.noStroke();
      p5.rect(50, 50, 100, 100);

      p5.fill((p5._hue + 120) % 360, 80, 90);
      p5.ellipse(250, 100, 100, 100);

      p5.fill((p5._hue + 240) % 360, 80, 90);
      p5.triangle(400, 50, 350, 150, 450, 150);
    }
  };

  // Animation Example
  const animationSketch: Sketch = {
    setup: (p5) => {
      p5._angle = 0;
    },
    draw: (p5) => {
      p5.background(220);
      p5.translate(p5.width/2, p5.height/2);
      p5.rotate(p5._angle);

      p5.fill(255, 0, 0);
      p5.rectMode(p5.CENTER);
      p5.rect(0, 0, 100, 100);

      p5._angle += 0.02;
    }
  };
</script>

<div class="prose max-w-none">
  <h1>Basic Examples</h1>

  <p>
    These examples demonstrate fundamental concepts in P5 Svelte. Each example showcases different
    features and can serve as a starting point for your own sketches.
  </p>

  <h2>Drawing Example</h2>
  <div class="card bg-base-200 mb-8">
    <div class="card-body">
      <h3 class="card-title">Basic Drawing</h3>
      <p>Click and drag to draw on the canvas:</p>
      <P5Canvas sketch={drawingSketch} />

      <div class="collapse collapse-plus bg-base-100">
        <input type="checkbox" />
        <div class="collapse-title text-xl font-medium">
          View Code
        </div>
        <div class="collapse-content">
          <div class="mockup-code">
<pre><code>{`const sketch: Sketch = {
  setup: (p5) => {
    p5.background(220);
  },
  draw: (p5) => {
    p5.stroke(0);
    if (p5.mouseIsPressed) {
      p5.line(p5.mouseX, p5.mouseY,
        p5.pmouseX, p5.pmouseY);
    }
  }
};`}</code></pre>
          </div>
        </div>
      </div>
    </div>
  </div>

  <h2>Shapes and Colors</h2>
  <div class="card bg-base-200 mb-8">
    <div class="card-body">
      <h3 class="card-title">Basic Shapes with Color Animation</h3>
      <p>Demonstrates different shapes with animated color transitions:</p>
      <P5Canvas sketch={shapesSketch} />

      <div class="collapse collapse-plus bg-base-100">
        <input type="checkbox" />
        <div class="collapse-title text-xl font-medium">
          View Code
        </div>
        <div class="collapse-content">
          <div class="mockup-code">
<pre><code>{`const sketch: Sketch = {
  setup: (p5) => {
    p5._hue = 0;
  },
  draw: (p5) => {
    p5.background(220);
    p5.colorMode(p5.HSB, 360, 100, 100);

    p5._hue = (p5._hue + 1) % 360;

    p5.fill(p5._hue, 80, 90);
    p5.noStroke();
    p5.rect(50, 50, 100, 100);

    p5.fill((p5._hue + 120) % 360, 80, 90);
    p5.ellipse(250, 100, 100, 100);

    p5.fill((p5._hue + 240) % 360, 80, 90);
    p5.triangle(400, 50, 350, 150, 450, 150);
  }
};`}</code></pre>
          </div>
        </div>
      </div>
    </div>
  </div>

  <h2>Basic Animation</h2>
  <div class="card bg-base-200 mb-8">
    <div class="card-body">
      <h3 class="card-title">Rotating Square</h3>
      <p>Demonstrates basic animation and transformation:</p>
      <P5Canvas sketch={animationSketch} />

      <div class="collapse collapse-plus bg-base-100">
        <input type="checkbox" />
        <div class="collapse-title text-xl font-medium">
          View Code
        </div>
        <div class="collapse-content">
          <div class="mockup-code">
<pre><code>{`const sketch: Sketch = {
  setup: (p5) => {
    p5._angle = 0;
  },
  draw: (p5) => {
    p5.background(220);
    p5.translate(p5.width/2, p5.height/2);
    p5.rotate(p5._angle);

    p5.fill(255, 0, 0);
    p5.rectMode(p5.CENTER);
    p5.rect(0, 0, 100, 100);

    p5._angle += 0.02;
  }
};`}</code></pre>
          </div>
        </div>
      </div>
    </div>
  </div>

  <h2>Key Concepts Demonstrated</h2>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 not-prose mb-8">
    <div class="card bg-primary text-primary-content">
      <div class="card-body">
        <IconBolt class="w-8 h-8" />
        <h3 class="card-title">Setup and Draw</h3>
        <p>Understanding the basic lifecycle of a P5.js sketch</p>
      </div>
    </div>

    <div class="card bg-secondary text-secondary-content">
      <div class="card-body">
        <IconCode class="w-8 h-8" />
        <h3 class="card-title">Event Handling</h3>
        <p>Responding to mouse and keyboard input</p>
      </div>
    </div>

    <div class="card bg-accent text-accent-content">
      <div class="card-body">
        <IconBolt class="w-8 h-8" />
        <h3 class="card-title">State Management</h3>
        <p>Managing and updating sketch state</p>
      </div>
    </div>
  </div>

  <h2>Next Steps</h2>
  <div class="alert alert-info mb-4">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
    <div>
      <p>Ready for more advanced examples? Check out:</p>
      <ul class="mt-2">
        <li><a href="/docs/examples/games" class="link">Game Development</a></li>
        <li><a href="/docs/examples/simulations" class="link">Simulations</a></li>
        <li><a href="/docs/examples/advanced" class="link">Advanced Techniques</a></li>
      </ul>
    </div>
  </div>
</div>