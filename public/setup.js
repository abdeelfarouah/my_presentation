// Script pour configurer les images de démonstration
const fs = require('fs');
const https = require('https');
const path = require('path');

// URLs des images de démonstration
const demoImages = [
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop&q=60'
];

// Créer le dossier projects s'il n'existe pas
const projectsDir = path.join(__dirname, 'public', 'images', 'projects');
if (!fs.existsSync(projectsDir)) {
    fs.mkdirSync(projectsDir, { recursive: true });
}

// Télécharger les images
demoImages.forEach((url, index) => {
    const fileName = `project${index + 1}.jpg`;
    const filePath = path.join(projectsDir, fileName);
    
    const file = fs.createWriteStream(filePath);
    https.get(url, (response) => {
        response.pipe(file);
        console.log(`Téléchargement de ${fileName} terminé`);
    }).on('error', (err) => {
        console.error(`Erreur lors du téléchargement de ${url}:`, err);
    });
});

console.log('Configuration terminée. Les images de démonstration ont été ajoutées.');
