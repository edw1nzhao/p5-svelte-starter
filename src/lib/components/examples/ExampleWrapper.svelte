<script lang="ts">
  import type { Sketch } from "$lib/core/types";
  import P5Canvas from "$lib/components/p5/P5Canvas.svelte";
  import { settings } from "$lib/stores/settings";

  export let title: string;
  export let description: string = "";
  export let sketch: Sketch;
</script>

<div class="prose max-w-none mb-8">
  <h1>{title}</h1>
  {#if description}
    <p>{description}</p>
  {/if}
</div>

<div class="card bg-base-200">
  <div class="card-body">
    <P5Canvas
      {sketch}
      config={{
        backgroundColor: $settings.theme === "light" ? "#ffffff" : "#1a1a1a"
      }}
    />
  </div>
</div>