<script lang="ts">
  import { browser } from '$app/environment';
  import P5Canvas from "$lib/components/p5/P5Canvas.svelte";
  import type { Sketch } from "$lib/core/types";
  import { settings } from "$lib/stores/settings";

  const demoSketch: Sketch = {
    setup: (p5) => {
      p5.noStroke();
    },
    draw: (p5) => {
      p5.fill(255, 0, 0);
      p5.ellipse(p5.mouseX, p5.mouseY, 20, 20);
    }
  };
</script>

<div class="container mx-auto p-4">
  {#if browser}
    <div class="card bg-base-200">
      <div class="card-body">
        <P5Canvas
          sketch={demoSketch}
          config={{
            width: 800,
            height: 400,
            backgroundColor: $settings.theme === "light" ? "#ffffff" : "#1a1a1a"
          }}
        />
      </div>
    </div>
  {/if}
</div>