// build.js
const fs = require('fs-extra');
const { minify } = require('html-minifier');
const { execSync } = require('child_process');

console.log('Démarrage du processus de build...');

// Créer le dossier de build s'il n'existe pas
const buildDir = './dist';
if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir);
}

// Copier les fichiers statiques
console.log('Copie des fichiers statiques...');
fs.copySync('./public', buildDir);

// Minifier les fichiers HTML
console.log('Minification des fichiers HTML...');
const htmlFiles = fs.readdirSync(buildDir).filter(file => file.endsWith('.html'));

htmlFiles.forEach(file => {
  const filePath = `${buildDir}/${file}`;
  const content = fs.readFileSync(filePath, 'utf8');
  const result = minify(content, {
    collapseWhitespace: true,
    removeComments: true,
    minifyCSS: true,
    minifyJS: true
  });
  fs.writeFileSync(filePath, result);
});

console.log('Build terminé avec succès !');