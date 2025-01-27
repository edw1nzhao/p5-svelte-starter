#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const projectName = process.argv[2] || 'p5-svelte-project';

// Clone the template
console.log('Cloning template...');
execSync(`git clone https://github.com/yourusername/p5-svelte-template.git ${projectName}`);

// Remove git history
const projectPath = path.join(process.cwd(), projectName);
fs.rmSync(path.join(projectPath, '.git'), { recursive: true, force: true });

// Initialize new git repository
console.log('Initializing new git repository...');
execSync('git init', { cwd: projectPath });

// Install dependencies
console.log('Installing dependencies...');
execSync('npm install', { cwd: projectPath });

console.log(`
🎨 P5 Svelte Template setup complete!

To get started:
1. cd ${projectName}
2. npm run dev

Check out the examples in src/routes/examples to see how to create your own sketches.
For more information, visit the documentation at https://github.com/yourusername/p5-svelte-template
`);