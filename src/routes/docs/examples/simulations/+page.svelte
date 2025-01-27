<script lang="ts">
  import IconAtom from "~icons/heroicons/beaker-20-solid";
  import IconChart from "~icons/heroicons/chart-bar-20-solid";
  import IconClock from "~icons/heroicons/clock-20-solid";
  import P5Canvas from "$lib/components/p5/P5Canvas.svelte";
  import type { Sketch } from "$lib/core/types";

  // Particle System Example
  const particleSystemSketch: Sketch = {
    setup: (p5) => {
      p5._particles = [];
      p5._gravity = 0.1;
    },
    draw: (p5) => {
      p5.background(220, 10);

      // Add new particles
      if (p5.mouseIsPressed) {
        p5._particles.push({
          x: p5.mouseX,
          y: p5.mouseY,
          vx: p5.random(-2, 2),
          vy: p5.random(-2, 0),
          life: 255
        });
      }

      // Update and draw particles
      for (let i = p5._particles.length - 1; i >= 0; i--) {
        let p = p5._particles[i];

        p.x += p.vx;
        p.y += p.vy;
        p.vy += p5._gravity;
        p.life -= 2;

        p5.fill(255, 0, 0, p.life);
        p5.noStroke();
        p5.ellipse(p.x, p.y, 8, 8);

        if (p.life <= 0) {
          p5._particles.splice(i, 1);
        }
      }
    }
  };

  // Double Pendulum Example
  const pendulumSketch: Sketch = {
    setup: (p5) => {
      p5._state = {
        r1: 125, r2: 125,    // pendulum lengths
        m1: 10, m2: 10,      // masses
        a1: p5.PI/2, a2: p5.PI/2,  // angles
        a1_v: 0, a2_v: 0,    // angular velocities
        g: 1,                // gravity
        px2: 0, py2: 0       // previous positions for trail
      };
    },
    draw: (p5) => {
      p5.background(220, 10);
      p5.translate(p5.width/2, p5.height/3);

      let s = p5._state;

      // Calculate positions
      let x1 = s.r1 * p5.sin(s.a1);
      let y1 = s.r1 * p5.cos(s.a1);
      let x2 = x1 + s.r2 * p5.sin(s.a2);
      let y2 = y1 + s.r2 * p5.cos(s.a2);

      // Draw pendulum
      p5.stroke(0);
      p5.strokeWeight(2);
      p5.line(0, 0, x1, y1);
      p5.line(x1, y1, x2, y2);

      p5.fill(0);
      p5.ellipse(x1, y1, 20, 20);
      p5.ellipse(x2, y2, 20, 20);

      // Update angles (simplified physics)
      s.a1_v += 0.01;
      s.a2_v += 0.02;
      s.a1 += s.a1_v;
      s.a2 += s.a2_v;

      // Damping
      s.a1_v *= 0.99;
      s.a2_v *= 0.99;
    }
  };
</script>

<div class="prose max-w-none">
  <h1>Simulations</h1>

  <p>
    Discover how to create physics simulations and particle systems using P5 Svelte.
    These examples demonstrate various simulation techniques and mathematical concepts.
  </p>

  <h2>Particle System</h2>
  <div class="card bg-base-200 mb-8">
    <div class="card-body">
      <h3 class="card-title">Interactive Particle System</h3>
      <p>Click and drag to create particles affected by gravity:</p>
      <P5Canvas sketch={particleSystemSketch} />

      <div class="collapse collapse-plus bg-base-100">
        <input type="checkbox" />
        <div class="collapse-title text-xl font-medium">
          View Code
        </div>
        <div class="collapse-content">
          <div class="mockup-code">
<pre><code>{`const particleSystemSketch: Sketch = {
  setup: (p5) => {
    p5._particles = [];
    p5._gravity = 0.1;
  },
  draw: (p5) => {
    // Particle system logic...
  }
};`}</code></pre>
          </div>
        </div>
      </div>
    </div>
  </div>

  <h2>Double Pendulum</h2>
  <div class="card bg-base-200 mb-8">
    <div class="card-body">
      <h3 class="card-title">Double Pendulum Simulation</h3>
      <p>A demonstration of coupled harmonic motion:</p>
      <P5Canvas sketch={pendulumSketch} />

      <div class="collapse collapse-plus bg-base-100">
        <input type="checkbox" />
        <div class="collapse-title text-xl font-medium">
          View Code
        </div>
        <div class="collapse-content">
          <div class="mockup-code">
<pre><code>{`const pendulumSketch: Sketch = {
  setup: (p5) => {
    p5._state = {
      r1: 125, r2: 125,
      m1: 10, m2: 10,
      a1: p5.PI/2, a2: p5.PI/2,
      // ... more initialization
    };
  },
  draw: (p5) => {
    // Pendulum physics...
  }
};`}</code></pre>
          </div>
        </div>
      </div>
    </div>
  </div>

  <h2>Simulation Concepts</h2>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 not-prose mb-8">
    <div class="card bg-primary text-primary-content">
      <div class="card-body">
        <IconAtom class="w-8 h-8" />
        <h3 class="card-title">Physics Engine</h3>
        <ul>
          <li>Force calculations</li>
          <li>Velocity and acceleration</li>
          <li>Collision detection</li>
        </ul>
      </div>
    </div>

    <div class="card bg-secondary text-secondary-content">
      <div class="card-body">
        <IconChart class="w-8 h-8" />
        <h3 class="card-title">Performance</h3>
        <ul>
          <li>Optimization techniques</li>
          <li>Spatial partitioning</li>
          <li>Object pooling</li>
        </ul>
      </div>
    </div>

    <div class="card bg-accent text-accent-content">
      <div class="card-body">
        <IconClock class="w-8 h-8" />
        <h3 class="card-title">Time Management</h3>
        <ul>
          <li>Delta time</li>
          <li>Frame independent motion</li>
          <li>Animation timing</li>
        </ul>
      </div>
    </div>
  </div>

  <h2>Additional Resources</h2>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose mb-8">
    <a href="/examples/forces" class="card bg-base-200 hover:bg-base-300 transition-colors">
      <div class="card-body">
        <h3 class="card-title">Forces Simulation</h3>
        <p>Complex force interactions and fluid dynamics</p>
      </div>
    </a>

    <a href="/examples/flocking" class="card bg-base-200 hover:bg-base-300 transition-colors">
      <div class="card-body">
        <h3 class="card-title">Flocking Behavior</h3>
        <p>Boids algorithm and emergent behavior</p>
      </div>
    </a>
  </div>

  <h2>Next Steps</h2>
  <div class="alert alert-info mb-4">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
    <div>
      <p>Ready to explore more advanced topics? Check out:</p>
      <ul class="mt-2">
        <li><a href="/docs/examples/advanced" class="link">Advanced Techniques</a></li>
      </ul>
    </div>
  </div>
</div>