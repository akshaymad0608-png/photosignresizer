const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace gradients that were partially replaced by sed
  content = content.replace(/bg-brand\s+dark:from-[a-z0-9\-\/]+\s+dark:to-[a-z0-9\-\/]+/g, 'bg-gray-100 dark:bg-gray-800');
  content = content.replace(/bg-brand\s+to-[a-z0-9\-\/]+/g, 'bg-brand text-white');
  content = content.replace(/bg-brand\s+dark:from-[a-z0-9\-\/]+/g, 'bg-brand text-white');

  // Replace remaining bg-gradient-to-* and related classes
  content = content.replace(/bg-gradient-to-[a-zA-Z]+\s+from-[a-zA-Z0-9\-\/]+\s+(via-[a-zA-Z0-9\-\/]+\s+)?to-[a-zA-Z0-9\-\/]+/g, 'bg-brand text-white');
  
  // Replace dark variants of gradients
  content = content.replace(/dark:from-[a-zA-Z0-9\-\/]+\s+(dark:via-[a-zA-Z0-9\-\/]+\s+)?dark:to-[a-zA-Z0-9\-\/]+/g, 'dark:bg-brand');

  // Fix text colors inside elements that became bg-brand
  // E.g., text-brand inside bg-brand is unreadable.
  // We can't easily parse DOM structure with regex, but we can look for specific patterns
  content = content.replace(/bg-brand\s+text-brand/g, 'bg-brand text-white');
  content = content.replace(/bg-brand\s+dark:text-brand/g, 'bg-brand text-white');

  fs.writeFileSync(filePath, content, 'utf8');
}

function walkDir(dir) {
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
walkDir('./src'); // if exists
console.log('Done');
