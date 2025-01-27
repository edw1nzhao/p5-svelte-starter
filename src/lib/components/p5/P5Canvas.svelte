<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import type { Sketch, P5Configuration } from '$lib/core/types';
  import { P5Manager } from '$lib/core/p5manager';
  import { settings } from '$lib/stores/settings';

  export let sketch: Sketch;
  export let config: P5Configuration = {};

  let containerDiv: HTMLDivElement;
  let p5Manager: P5Manager;
  let resizeObserver: ResizeObserver;
  let canvasElement: HTMLElement | null = null;

  function handleMouseEvent(e: MouseEvent) {
    if (canvasElement) {
      const rect = canvasElement.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x < 0 || x > rect.width || y < 0 || y > rect.height) {
        return;
      }
    }
  }

  function updateCanvasStyle() {
    if (canvasElement) {
      const canvas = canvasElement as HTMLCanvasElement;
      canvas.style.width = `${config.width || 800}px`;
      canvas.style.height = `${config.height || 600}px`;
    }
  }

  onMount(() => {
    if (!browser || !containerDiv) return;

    const init = async () => {
      p5Manager = new P5Manager(containerDiv, sketch, config);
      await p5Manager.initialize();

      canvasElement = containerDiv.querySelector('canvas');
      updateCanvasStyle();

      resizeObserver = new ResizeObserver(() => {
        updateCanvasStyle();
      });

      resizeObserver.observe(containerDiv);
    };

    init();

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  });

  onDestroy(() => {
    if (browser && p5Manager) {
      p5Manager.destroy();
    }
    if (resizeObserver) {
      resizeObserver.disconnect();
    }
  });

  $: if (browser && p5Manager && $settings) {
    p5Manager.toggleLoop($settings.frameRate > 0);
  }
</script>

<div
  bind:this={containerDiv}
  class="relative flex justify-center items-center w-full bg-base-200 rounded-lg overflow-hidden p-4"
  role="application"
  aria-label="P5.js Canvas"
  on:mousedown={handleMouseEvent}
  on:mouseup={handleMouseEvent}
  on:mousemove={handleMouseEvent}
>
  {#if $settings.showFPS}
    <div class="absolute top-2 right-2 bg-base-300 px-2 py-1 rounded text-sm opacity-75">
      FPS: {Math.round($settings.frameRate)}
    </div>
  {/if}
</div>