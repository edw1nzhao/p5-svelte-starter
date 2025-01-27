<script lang="ts">
  import IconController from "~icons/heroicons/command-line-20-solid";
  import IconCode from "~icons/heroicons/code-bracket-20-solid";
  import IconPuzzle from "~icons/heroicons/puzzle-piece-20-solid";
  import P5Canvas from "$lib/components/p5/P5Canvas.svelte";
  import type { Sketch } from "$lib/core/types";

  // Simple Paddle Game Example
  const paddleGameSketch: Sketch = {
    setup: (p5) => {
      p5._state = {
        paddleX: p5.width / 2,
        ballX: p5.width / 2,
        ballY: p5.height / 2,
        ballSpeedX: 5,
        ballSpeedY: -5,
        score: 0
      };
    },
    draw: (p5) => {
      p5.background(220);

      // Update paddle position
      p5._state.paddleX = p5.mouseX;

      // Draw paddle
      p5.fill(0);
      p5.rectMode(p5.CENTER);
      p5.rect(p5._state.paddleX, p5.height - 20, 100, 10);

      // Update ball position
      p5._state.ballX += p5._state.ballSpeedX;
      p5._state.ballY += p5._state.ballSpeedY;

      // Ball collisions
      if (p5._state.ballX < 0 || p5._state.ballX > p5.width) {
        p5._state.ballSpeedX *= -1;
      }
      if (p5._state.ballY < 0) {
        p5._state.ballSpeedY *= -1;
      }

      // Paddle collision
      if (p5._state.ballY > p5.height - 30 &&
          Math.abs(p5._state.ballX - p5._state.paddleX) < 50) {
        p5._state.ballSpeedY *= -1;
        p5._state.score += 1;
      }

      // Draw ball
      p5.fill(255, 0, 0);
      p5.ellipse(p5._state.ballX, p5._state.ballY, 20, 20);

      // Draw score
      p5.fill(0);
      p5.textSize(32);
      p5.textAlign(p5.LEFT);
      p5.text(`Score: ${p5._state.score}`, 10, 40);

      // Game over
      if (p5._state.ballY > p5.height) {
        p5.background(220);
        p5.fill(0);
        p5.textAlign(p5.CENTER);
        p5.text('Game Over!', p5.width/2, p5.height/2);
        p5.noLoop();
      }
    },
    mousePressed: (p5) => {
      // Restart game on click if game over
      if (p5._state.ballY > p5.height) {
        p5._state = {
          paddleX: p5.width / 2,
          ballX: p5.width / 2,
          ballY: p5.height / 2,
          ballSpeedX: 5,
          ballSpeedY: -5,
          score: 0
        };
        p5.loop();
      }
    }
  };
</script>

<div class="prose max-w-none">
  <h1>Game Development</h1>

  <p>
    Learn how to create interactive games using P5 Svelte. These examples demonstrate
    essential game development concepts like collision detection, score tracking, and game state management.
  </p>

  <div class="alert alert-info mb-4">
    <IconController class="w-6 h-6" />
    <span>
      Each example includes fully commented source code and explanations of key game development concepts.
    </span>
  </div>

  <h2>Simple Paddle Game</h2>
  <div class="card bg-base-200 mb-8">
    <div class="card-body">
      <h3 class="card-title">Paddle and Ball Game</h3>
      <p>Move your mouse to control the paddle. Keep the ball from falling!</p>
      <P5Canvas sketch={paddleGameSketch} />

      <div class="collapse collapse-plus bg-base-100">
        <input type="checkbox" />
        <div class="collapse-title text-xl font-medium">
          View Code
        </div>
        <div class="collapse-content">
          <div class="mockup-code">
<pre><code>{`const paddleGameSketch: Sketch = {
  setup: (p5) => {
    p5._state = {
      paddleX: p5.width / 2,
      ballX: p5.width / 2,
      ballY: p5.height / 2,
      ballSpeedX: 5,
      ballSpeedY: -5,
      score: 0
    };
  },
  draw: (p5) => {
    // Game logic here...
  },
  mousePressed: (p5) => {
    // Restart logic...
  }
};`}</code></pre>
          </div>
        </div>
      </div>
    </div>
  </div>

  <h2>Key Game Development Concepts</h2>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 not-prose mb-8">
    <div class="card bg-primary text-primary-content">
      <div class="card-body">
        <IconController class="w-8 h-8" />
        <h3 class="card-title">Game Loop</h3>
        <ul>
          <li>State updates</li>
          <li>Collision detection</li>
          <li>Score tracking</li>
        </ul>
      </div>
    </div>

    <div class="card bg-secondary text-secondary-content">
      <div class="card-body">
        <IconCode class="w-8 h-8" />
        <h3 class="card-title">Input Handling</h3>
        <ul>
          <li>Mouse control</li>
          <li>Keyboard events</li>
          <li>Touch support</li>
        </ul>
      </div>
    </div>

    <div class="card bg-accent text-accent-content">
      <div class="card-body">
        <IconPuzzle class="w-8 h-8" />
        <h3 class="card-title">Game State</h3>
        <ul>
          <li>Score management</li>
          <li>Game over conditions</li>
          <li>Restart functionality</li>
        </ul>
      </div>
    </div>
  </div>

  <h2>Additional Examples</h2>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose mb-8">
    <a href="/examples/pong" class="card bg-base-200 hover:bg-base-300 transition-colors">
      <div class="card-body">
        <h3 class="card-title">Pong</h3>
        <p>A complete two-player Pong implementation</p>
      </div>
    </a>

    <a href="/examples/game-of-life" class="card bg-base-200 hover:bg-base-300 transition-colors">
      <div class="card-body">
        <h3 class="card-title">Game of Life</h3>
        <p>Conway's Game of Life simulation</p>
      </div>
    </a>
  </div>

  <h2>Game Development Tips</h2>

  <div class="collapse-group">
    <div class="collapse collapse-plus bg-base-200 mb-2">
      <input type="radio" name="game-tips" checked />
      <div class="collapse-title text-xl font-medium">
        Performance Optimization
      </div>
      <div class="collapse-content">
        <ul>
          <li>Use efficient collision detection algorithms</li>
          <li>Minimize object creation in the game loop</li>
          <li>Implement object pooling for frequently created/destroyed objects</li>
          <li>Use appropriate data structures for game state</li>
        </ul>
      </div>
    </div>

    <div class="collapse collapse-plus bg-base-200 mb-2">
      <input type="radio" name="game-tips" />
      <div class="collapse-title text-xl font-medium">
        State Management
      </div>
      <div class="collapse-content">
        <ul>
          <li>Keep game state centralized</li>
          <li>Use TypeScript interfaces for type safety</li>
          <li>Implement proper state reset mechanics</li>
          <li>Consider using Svelte stores for global state</li>
        </ul>
      </div>
    </div>

    <div class="collapse collapse-plus bg-base-200 mb-2">
      <input type="radio" name="game-tips" />
      <div class="collapse-title text-xl font-medium">
        User Experience
      </div>
      <div class="collapse-content">
        <ul>
          <li>Add clear visual feedback</li>
          <li>Implement smooth animations</li>
          <li>Add sound effects (when appropriate)</li>
          <li>Include clear game over and restart mechanics</li>
        </ul>
      </div>
    </div>
  </div>

  <h2>Next Steps</h2>
  <div class="alert alert-info mb-4">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
    <div>
      <p>Ready to explore more advanced topics? Check out:</p>
      <ul class="mt-2">
        <li><a href="/docs/examples/simulations" class="link">Simulations</a></li>
        <li><a href="/docs/examples/advanced" class="link">Advanced Techniques</a></li>
      </ul>
    </div>
  </div>
</div>