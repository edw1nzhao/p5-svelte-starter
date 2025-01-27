<!-- // routes/examples/pong/+page.svelte -->
<script lang="ts">
  import ExampleWrapper from "$lib/components/examples/ExampleWrapper.svelte";
  import type { Sketch, P5Extended } from "$lib/core/types";

  function resetBall(p5: P5Extended) {
    const s = p5._state;
    s.ballPosX = p5.width / 2;
    s.ballPosY = p5.height / 2;
    s.ballSpeedX = p5.random([-3, 3]);
    s.ballSpeedY = p5.random([-1, 1]);
  }

  const sketch: Sketch = {
    setup: (p5) => {
      // Initialize game state
      p5._state = {
        paddleLeftX: 20,
        paddleLeftY: 200,
        paddleRightX: p5.width - 20,
        paddleRightY: 200,
        paddleSpeed: 2,
        paddleHeight: 80,
        paddleWidth: 10,
        leftScore: 0,
        rightScore: 0,
        ballPosX: p5.width / 2,
        ballPosY: p5.height / 2,
        ballSpeedX: 0,
        ballSpeedY: 0,
        ballSize: 10,
        isPlaying: false
      };

      p5.rectMode(p5.CENTER);
      p5.fill(255);
      p5.noStroke();
      p5.textSize(40);
      p5.textAlign(p5.CENTER);
    },

    draw: (p5) => {
      const s = p5._state;
      p5.background(0);

      // Draw paddles
      p5.rect(s.paddleLeftX, s.paddleLeftY, s.paddleWidth, s.paddleHeight);
      p5.rect(s.paddleRightX, s.paddleRightY, s.paddleWidth, s.paddleHeight);

      // Draw ball
      p5.square(s.ballPosX, s.ballPosY, s.ballSize);

      // Draw score
      p5.text(s.leftScore, p5.width * 0.25, p5.height * 0.1);
      p5.text(s.rightScore, p5.width * 0.75, p5.height * 0.1);

      if (!s.isPlaying) {
        p5.text('Click to start', p5.width / 2, p5.height / 2 - 20);
        return;
      }

      // Move ball
      s.ballPosX += s.ballSpeedX;
      s.ballPosY += s.ballSpeedY;

      // Paddle collisions
      const checkPaddleCollision = (paddleX: number, paddleY: number) => {
        const collisionLeft = paddleX - s.paddleWidth / 2 - s.ballSize / 2;
        const collisionRight = paddleX + s.paddleWidth / 2 + s.ballSize / 2;
        const collisionTop = paddleY - s.paddleHeight / 2 - s.ballSize / 2;
        const collisionBottom = paddleY + s.paddleHeight / 2 + s.ballSize / 2;

        if (
          s.ballPosX >= collisionLeft &&
          s.ballPosX <= collisionRight &&
          s.ballPosY >= collisionTop &&
          s.ballPosY <= collisionBottom
        ) {
          s.ballSpeedX = -s.ballSpeedX;
          s.ballSpeedY = (s.ballPosY - paddleY) / 20;
        }
      };

      checkPaddleCollision(s.paddleLeftX, s.paddleLeftY);
      checkPaddleCollision(s.paddleRightX, s.paddleRightY);

      // Ball out of bounds
      if (s.ballPosX < 0) {
        s.rightScore += 1;
        resetBall(p5);
      } else if (s.ballPosX > p5.width) {
        s.leftScore += 1;
        resetBall(p5);
      }

      // Ball hitting top/bottom
      if (s.ballPosY < 0 || s.ballPosY > p5.height) {
        s.ballSpeedY = -s.ballSpeedY;
      }

      // Paddle movement
      if (p5.keyIsDown(83)) { // S key
        s.paddleLeftY = p5.constrain(
          s.paddleLeftY + s.paddleSpeed,
          s.paddleHeight / 2,
          p5.height - s.paddleHeight / 2
        );
      }
      if (p5.keyIsDown(87)) { // W key
        s.paddleLeftY = p5.constrain(
          s.paddleLeftY - s.paddleSpeed,
          s.paddleHeight / 2,
          p5.height - s.paddleHeight / 2
        );
      }
      if (p5.keyIsDown(p5.DOWN_ARROW)) {
        s.paddleRightY = p5.constrain(
          s.paddleRightY + s.paddleSpeed,
          s.paddleHeight / 2,
          p5.height - s.paddleHeight / 2
        );
      }
      if (p5.keyIsDown(p5.UP_ARROW)) {
        s.paddleRightY = p5.constrain(
          s.paddleRightY - s.paddleSpeed,
          s.paddleHeight / 2,
          p5.height - s.paddleHeight / 2
        );
      }
    },

    mousePressed: (p5) => {
      if (!p5._state.isPlaying) {
        resetBall(p5);
        p5._state.isPlaying = true;
      }
    }
  };
</script>

<ExampleWrapper
  title="Pong Game"
  description="Classic Pong game. Use W/S keys for left paddle and UP/DOWN arrows for right paddle. Click to start."
  {sketch}
/>