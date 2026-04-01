const fs = require('fs');
const path = require('path');

const DIST_DIR = path.join(__dirname, '..', 'dist');

function rewriteHtmlToRelativePaths(htmlContent) {
  return htmlContent
    .replace(/(href|src)="\/(?!\/)/g, '$1="./')
    .replace(/content="\/(?!\/)/g, 'content="./');
}

function processHtmlFile(filePath) {
  const original = fs.readFileSync(filePath, 'utf8');
  const updated = rewriteHtmlToRelativePaths(original);

  if (original !== updated) {
    fs.writeFileSync(filePath, updated, 'utf8');
    console.log(`Updated paths in ${path.relative(process.cwd(), filePath)}`);
  }
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }

    if (entry.isFile() && fullPath.endsWith('.html')) {
      processHtmlFile(fullPath);
    }
  }
}

if (!fs.existsSync(DIST_DIR)) {
  console.error('No se encontró la carpeta dist. Ejecuta primero: npm run export:web');
  process.exit(1);
}

walk(DIST_DIR);
console.log('GitHub Pages path fix completado.');
