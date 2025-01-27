<script lang="ts">
  import ExampleWrapper from "$lib/components/examples/ExampleWrapper.svelte";
  import type { Sketch, P5Extended } from "$lib/core/types";
  import type p5 from "p5";

  class Mover {
    mass: number;
    position: p5.Vector;
    velocity: p5.Vector;
    acceleration: p5.Vector;
    color: any;
    p5: P5Extended;

    constructor(p5: P5Extended, m: number, x: number, y: number, c: any) {
      this.mass = m;
      this.position = p5.createVector(x, y);
      this.velocity = p5.createVector(0, 0);
      this.acceleration = p5.createVector(0, 0);
      this.color = c;
      this.p5 = p5;
    }

    applyForce(force: p5.Vector) {
      // Use p5.Vector static methods directly from p5 instance
      const f = (this.p5 as any).constructor.Vector.div(force, this.mass);
      this.acceleration.add(f);
    }

    update() {
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      this.acceleration.mult(0);
    }

    display() {
      this.p5.stroke(0);
      this.p5.strokeWeight(2);
      this.p5.fill(this.color);
      this.p5.ellipse(this.position.x, this.position.y, this.mass * 16, this.mass * 16);
    }

    checkEdges() {
      if (this.position.y > this.p5.height - this.mass * 8) {
        this.velocity.y *= -0.9;
        this.position.y = this.p5.height - this.mass * 8;
      }
    }
  }

  class Liquid {
    x: number;
    y: number;
    w: number;
    h: number;
    c: number;
    p5: P5Extended;

    constructor(p5: P5Extended, x: number, y: number, w: number, h: number, c: number) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.c = c;
      this.p5 = p5;
    }

    contains(m: Mover) {
      let l = m.position;
      return (
        l.x > this.x &&
        l.x < this.x + this.w &&
        l.y > this.y &&
        l.y < this.y + this.h
      );
    }

    calculateDrag(m: Mover) {
      let speed = m.velocity.mag();
      let dragMagnitude = this.c * speed * speed;
      let dragForce = m.velocity.copy();
      dragForce.mult(-1);
      dragForce.setMag(dragMagnitude);
      return dragForce;
    }

    display() {
      this.p5.noStroke();
      this.p5.fill(50);
      this.p5.rect(this.x, this.y, this.w, this.h);
    }
  }

  const sketch: Sketch = {
    setup: (p5) => {
      p5.colorMode(p5.HSB, 9, 100, 100);

      // Initialize state
      p5._state = {
        movers: [],
        liquid: new Liquid(p5, 0, p5.height / 2, p5.width, p5.height / 2, 0.1)
      };

      initializeMovers(p5);
    },

    draw: (p5) => {
      p5.background(20);

      const s = p5._state;
      s.liquid.display();

      for (let mover of s.movers) {
        if (s.liquid.contains(mover)) {
          let dragForce = s.liquid.calculateDrag(mover);
          mover.applyForce(dragForce);
        }

        let gravity = p5.createVector(0, 0.1 * mover.mass);
        mover.applyForce(gravity);

        mover.update();
        mover.display();
        mover.checkEdges();
      }
    },

    mousePressed: (p5) => {
      initializeMovers(p5);
    }
  };

  function initializeMovers(p5: P5Extended) {
    const xSpacing = p5.width / 9;
    p5._state.movers = [];

    for (let i = 0; i < 9; i++) {
      const mass = p5.random(0.5, 3);
      const xPosition = xSpacing * i + xSpacing / 2;
      p5._state.movers[i] = new Mover(p5, mass, xPosition, 0, p5.color(i, 100, 100));
    }
  }
</script>

<ExampleWrapper
  title="Forces Simulation"
  description="A simulation demonstrating forces, gravity, and fluid resistance. Click to reset."
  {sketch}
/>