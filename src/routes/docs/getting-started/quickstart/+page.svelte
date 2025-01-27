<script lang="ts">
  import IconBolt from "~icons/heroicons/bolt-20-solid";
  import IconTerminal from "~icons/heroicons/command-line-20-solid";
  import IconCode from "~icons/heroicons/code-bracket-20-solid";
</script>

<div class="prose max-w-none">
  <h1>Quick Start</h1>

  <div class="alert alert-info mb-4">
    <IconBolt class="w-6 h-6" />
    <span>Before starting, make sure you've completed the <a href="/docs/getting-started/installation" class="link">installation steps</a>.</span>
  </div>

  <h2>Create Your First Project</h2>

  <div class="mockup-code mb-4">
    <pre><code>npx create-p5-svelte-app my-first-sketch</code></pre>
  </div>

  <h2>Project Structure</h2>
  <div class="mockup-code mb-4">
<pre><code>my-first-sketch/
├── src/
│   ├── lib/
│   │   ├── components/    # P5 components
│   │   ├── core/         # Framework core
│   │   └── stores/       # State management
│   └── routes/           # Your sketches
├── static/
└── package.json</code></pre>
  </div>

  <h2>Starting Development</h2>
  <div class="steps steps-vertical my-4">
    <div class="step step-primary">
      <div class="step-content">
        <h3 class="text-lg font-bold">Navigate to your project</h3>
        <div class="mockup-code my-2">
          <pre><code>cd my-first-sketch</code></pre>
        </div>
      </div>
    </div>

    <div class="step step-primary">
      <div class="step-content">
        <h3 class="text-lg font-bold">Install dependencies</h3>
        <div class="mockup-code my-2">
          <pre><code>npm install</code></pre>
        </div>
      </div>
    </div>

    <div class="step step-primary">
      <div class="step-content">
        <h3 class="text-lg font-bold">Start development server</h3>
        <div class="mockup-code my-2">
          <pre><code>npm run dev</code></pre>
        </div>
      </div>
    </div>
  </div>

  <h2>Create Your First Sketch</h2>
  <p>Create a new file in <code>src/routes/</code> with the following content:</p>

  <div class="mockup-code mb-4">
<pre><code>{`<script lang="ts">
  import P5Canvas from "$lib/components/p5/P5Canvas.svelte";
  import type { Sketch } from "$lib/core/types";

  const sketch: Sketch = {
    setup: (p5) => {
      p5.background(220);
    },
    draw: (p5) => {
      p5.ellipse(p5.mouseX, p5.mouseY, 20, 20);
    }
  };
</script>

<P5Canvas {sketch} />`}</code></pre>
  </div>

  <div class="alert alert-success mb-4">
    <IconCode class="w-6 h-6" />
    <span>
      You should now see a canvas that draws circles following your mouse movement!
    </span>
  </div>

  <h2>Next Steps</h2>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose">
    <a href="/docs/getting-started/first-sketch" class="card bg-primary text-primary-content">
      <div class="card-body">
        <h3 class="card-title">Create Your First Sketch</h3>
        <p>Learn how to create more complex interactive sketches</p>
      </div>
    </a>

    <a href="/docs/core/architecture" class="card bg-secondary text-secondary-content">
      <div class="card-body">
        <h3 class="card-title">Understand the Architecture</h3>
        <p>Learn about the framework's core concepts</p>
      </div>
    </a>
  </div>
</div>