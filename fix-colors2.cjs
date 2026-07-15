const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Fix repeated shadows
  content = content.replace(/shadow-sm\s+shadow-sm(\s+dark:shadow-sm)?/g, 'shadow-sm');
  content = content.replace(/shadow-sm\s+shadow-sm/g, 'shadow-sm');

  // Ensure simple background for GlobalActionButton
  content = content.replace(/bg-brand\s+to-blue-600/g, 'bg-brand text-white');

  // Fix header text-transparent bg-clip-text 
  content = content.replace(/text-transparent\s+bg-clip-text\s+bg-brand/g, 'text-gray-900 dark:text-white');

  fs.writeFileSync(filePath, content, 'utf8');
}

function walkDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      processFile(fullPath);
    }
  }
}

walkDir('./components');
walkDir('./pages');
console.log('Done');
