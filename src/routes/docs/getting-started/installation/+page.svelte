<script lang="ts">
</script>

<div class="prose max-w-none">
  <h1>Installation</h1>

  <h2>Prerequisites</h2>
  <ul>
    <li>
      <strong>Node.js and npm:</strong> You need Node.js version 16 or higher.
      <ul>
        <li>Windows/macOS: Download from <a href="https://nodejs.org" target="_blank">nodejs.org</a></li>
        <li>Linux: Use your package manager or nvm</li>
      </ul>
    </li>
    <li>
      <strong>Code Editor:</strong> We recommend Visual Studio Code with these extensions:
      <ul>
        <li>Svelte for VS Code</li>
        <li>TypeScript and JavaScript Language Features</li>
        <li>Tailwind CSS IntelliSense</li>
      </ul>
    </li>
    <li><strong>Git:</strong> Required for version control and template installation</li>
  </ul>

  <h2>Installation Methods</h2>

  <h3>Method 1: Using create-p5-svelte-app (Recommended)</h3>
  <p>This is the easiest way to get started. Open your terminal and run:</p>
  <pre><code class="language-bash">npx create-p5-svelte-app my-sketch-app</code></pre>
  <p>This will:</p>
  <ul>
    <li>Create a new directory called 'my-sketch-app'</li>
    <li>Install all required dependencies</li>
    <li>Set up the project structure</li>
    <li>Initialize a Git repository</li>
  </ul>

  <h3>Method 2: Manual Installation</h3>
  <p>If you prefer more control over the installation process:</p>
  <ol>
    <li>
      Clone the repository:
      <pre><code class="language-bash">git clone https://github.com/yourusername/p5-svelte-template.git my-sketch-app</code></pre>
    </li>
    <li>
      Navigate to the project directory:
      <pre><code class="language-bash">cd my-sketch-app</code></pre>
    </li>
    <li>
      Install dependencies:
      <pre><code class="language-bash">npm install</code></pre>
    </li>
    <li>
      Start the development server:
      <pre><code class="language-bash">npm run dev</code></pre>
    </li>
  </ol>

  <h2>Project Structure</h2>
  <pre><code class="language-text">p5-svelte-template/
├── src/
│   ├── lib/
│   │   ├── components/    # Reusable components
│   │   ├── core/          # P5 integration core
│   │   ├── stores/        # State management
│   │   └── utils/         # Utility functions
│   ├── routes/            # Pages and examples
│   └── app.html           # App template
├── static/                # Static assets
├── tests/                 # Test files
├── package.json          # Dependencies and scripts
├── svelte.config.js      # Svelte configuration
├── tailwind.config.js    # Tailwind CSS config
├── tsconfig.json         # TypeScript config
└── vite.config.js        # Vite config</code></pre>

  <h2>Configuration</h2>

  <h3>Environment Variables</h3>
  <p>Create a <code>.env</code> file in the root directory:</p>
  <pre><code class="language-env">PUBLIC_APP_NAME=My P5 App
PUBLIC_APP_DESCRIPTION=My creative coding project</code></pre>

  <h3>TypeScript Configuration</h3>
  <p>The template includes a pre-configured <code>tsconfig.json</code>. You can customize it based on your needs:</p>
  <pre><code class="language-json">{
  "extends": "./.svelte-kit/tsconfig.json",
  "compilerOptions": {
    "strict": true,
    // Add your custom TypeScript options here
  }
}</code></pre>

  <h2>Next Steps</h2>
  <ul>
    <li>Check out the <a href="/docs/getting-started/quickstart">Quick Start Guide</a></li>
    <li>Create your <a href="/docs/getting-started/first-sketch">First Sketch</a></li>
    <li>Explore the <a href="/docs/examples/basic">Example Gallery</a></li>
  </ul>

  <h2>Troubleshooting</h2>
  <h3>Common Issues</h3>
  <details>
    <summary>npm install fails</summary>
    <p>Try:</p>
    <ol>
      <li>Clear npm cache: <code>npm cache clean --force</code></li>
      <li>Delete node_modules: <code>rm -rf node_modules</code></li>
      <li>Delete package-lock.json</li>
      <li>Run <code>npm install</code> again</li>
    </ol>
  </details>

  <details>
    <summary>TypeScript errors</summary>
    <p>Ensure you have the correct TypeScript version:</p>
    <pre><code class="language-bash">npm install typescript@latest</code></pre>
  </details>

  <h2>Support</h2>
  <p>If you need help:</p>
  <ul>
    <li>Check the <a href="/docs/examples">Examples</a></li>
    <li>Join our Discord community</li>
    <li>Open an issue on GitHub</li>
    <li>Email support: support@p5svelte.dev</li>
  </ul>
</div>