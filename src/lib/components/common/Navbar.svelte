<script lang="ts">
  import { page } from '$app/stores';
  import IconMoon from "~icons/heroicons/moon-20-solid";
  import IconSun from "~icons/heroicons/sun-20-solid";
  import { settings } from "$lib/stores/settings";

  const examples = [
    { title: 'Basic Drawing', path: '/examples/basic-drawing' },
    { title: 'Particle System', path: '/examples/particle-system' },
    { title: 'Game of Life', path: '/examples/game-of-life' },
    { title: 'Pong Game', path: '/examples/pong' },
    { title: 'Forces Simulation', path: '/examples/forces' }
  ];

  function toggleTheme() {
    settings.update(s => ({
      ...s,
      theme: s.theme === "light" ? "dark" : "light"
    }));
  }
</script>

<div class="navbar bg-base-100 relative z-50">
  <div class="navbar-start">
    <div class="dropdown">
      <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li><a href="/" class:active={$page.url.pathname === "/"}>Home</a></li>
        <li><a href="/docs" class:active={$page.url.pathname === "/docs"}>Docs</a></li>
        <li>
          <a>Examples</a>
          <ul class="p-2">
            {#each examples as example}
              <li>
                <a
                  href={example.path}
                  class:active={$page.url.pathname === example.path}
                >
                  {example.title}
                </a>
              </li>
            {/each}
          </ul>
        </li>
      </ul>
    </div>
    <a href="/" class="btn btn-ghost text-xl">P5 Forge</a>
  </div>

  <div class="navbar-center hidden lg:flex">
    <ul class="menu menu-horizontal px-1">
      <li><a href="/" class:active={$page.url.pathname === "/"}>Home</a></li>
      <li><a href="/docs" class:active={$page.url.pathname === "/docs"}>Docs</a></li>
      <li>
        <details>
          <summary>Examples</summary>
          <ul class="p-2 bg-base-100 rounded-t-none">
            {#each examples as example}
              <li>
                <a
                  href={example.path}
                  class:active={$page.url.pathname === example.path}
                >
                  {example.title}
                </a>
              </li>
            {/each}
          </ul>
        </details>
      </li>
    </ul>
  </div>

  <div class="navbar-end">
    <button
      class="btn btn-ghost btn-circle"
      on:click={toggleTheme}
    >
      {#if $settings.theme === "light"}
        <IconMoon />
      {:else}
        <IconSun />
      {/if}
    </button>
  </div>
</div>