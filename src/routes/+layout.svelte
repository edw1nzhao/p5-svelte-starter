<script>
  import "tailwindcss/tailwind.css";

  import { onMount } from "svelte";
  import { settings } from "$lib/stores/settings";
  import Navbar from "../lib/components/common/Navbar.svelte";

 onMount(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      settings.update(s => ({ ...s, theme: "dark" }));
    }
  });
</script>

<div class="min-h-screen" data-theme={$settings.theme}>
  <Navbar />
  <main class="container mx-auto p-4">
    <slot />
  </main>
</div>