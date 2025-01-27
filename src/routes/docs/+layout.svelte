<script lang="ts">
  import IconHome from "~icons/heroicons/home-20-solid";
  import { page } from "$app/stores";

  const sections = [
    {
      title: "Getting Started",
      items: [
        { href: "/docs/getting-started/installation", label: "Installation" },
        { href: "/docs/getting-started/quickstart", label: "Quick Start" },
        { href: "/docs/getting-started/first-sketch", label: "Your First Sketch" },
      ]
    },
    {
      title: "Core Concepts",
      items: [
        { href: "/docs/core/architecture", label: "Architecture" },
        { href: "/docs/core/sketch-lifecycle", label: "Sketch Lifecycle" },
        { href: "/docs/core/state-management", label: "State Management" },
        { href: "/docs/core/typescript", label: "TypeScript Integration" },
      ]
    },
    {
      title: "Examples",
      items: [
        { href: "/docs/examples/basic", label: "Basic Examples" },
        { href: "/docs/examples/games", label: "Game Development" },
        { href: "/docs/examples/simulations", label: "Simulations" },
        { href: "/docs/examples/advanced", label: "Advanced Techniques" },
      ]
    }
  ];
</script>

<div class="drawer lg:drawer-open">
  <input id="docs-drawer" type="checkbox" class="drawer-toggle" />

  <div class="drawer-content p-8">
    <div class="w-full">
      <slot />
    </div>
  </div>

  <div class="drawer-side">
    <label for="docs-drawer" class="drawer-overlay"></label>
    <div class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
      <div class="mb-4 flex gap-2">
        <a href="/" class="btn btn-ghost gap-2">
          <IconHome />
          Home
        </a>
      </div>

      {#each sections as section}
        <div class="mb-4">
          <h3 class="menu-title">{section.title}</h3>
          <ul>
            {#each section.items as item}
              <li>
                <a
                  href={item.href}
                  class:active={$page.url.pathname === item.href}
                >
                  {item.label}
                </a>
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>
  </div>
</div>