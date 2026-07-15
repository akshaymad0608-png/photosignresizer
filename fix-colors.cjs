const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // We want to replace ANY tailwind class related to gradients, and change them to solid colors.
  // Because the previous sed command already replaced `bg-gradient-to-... from-... to-...` with `bg-brand`,
  // we might have stray `from-`, `to-`, `via-` classes, or `bg-brand text-brand` combinations.
  
  // Replace anything that looks like a stray gradient class
  content = content.replace(/\b(from|to|via)-[a-zA-Z0-9\-\/]+\b/g, '');
  content = content.replace(/\bdark:(from|to|via)-[a-zA-Z0-9\-\/]+\b/g, '');

  // Fix buttons that might have become just `bg-brand text-brand`
  content = content.replace(/bg-brand\s+dark:text-brand/g, 'bg-brand text-white dark:text-white');
  content = content.replace(/bg-brand\s+text-brand/g, 'bg-brand text-white');
  content = content.replace(/text-transparent\s+bg-clip-text\s+bg-brand/g, 'text-gray-900 dark:text-white');
  
  // Simplify shadows
  content = content.replace(/shadow-[a-zA-Z0-9\-\/]+/g, 'shadow-sm');
  content = content.replace(/drop-shadow-[a-zA-Z0-9\-\/]+/g, '');

  // Remove blur backgrounds
  content = content.replace(/blur-[a-zA-Z0-9\-\/]+/g, '');
  
  // Clean up extra spaces inside classNames
  content = content.replace(/className="([^"]+)"/g, (match, p1) => {
    return `className="${p1.replace(/\s+/g, ' ').trim()}"`;
  });
  content = content.replace(/className=\{`([^`]+)`\}/g, (match, p1) => {
    return `className={\`${p1.replace(/\s+/g, ' ').trim()}\`}`;
  });

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
if (fs.existsSync('./src')) walkDir('./src');
console.log('Done');
