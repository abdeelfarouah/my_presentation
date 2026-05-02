import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import SEO utilities
const { generateSitemap, generateRobotsTxt } = await import('../src/utils/seo.ts');

// Generate SEO files
function generateSEOFiles() {
  try {
    // Generate sitemap
    const sitemap = generateSitemap();
    fs.writeFileSync(path.join(__dirname, '../dist/sitemap.xml'), sitemap);
    
    // Generate robots.txt
    const robots = generateRobotsTxt();
    fs.writeFileSync(path.join(__dirname, '../dist/robots.txt'), robots);
    
    console.log('✅ SEO files generated successfully!');
    console.log('📅 Date:', new Date().toISOString().split('T')[0]);
    console.log('📁 Files: sitemap.xml, robots.txt');
  } catch (error) {
    console.error('❌ Error generating SEO files:', error);
    process.exit(1);
  }
}

// Run generation
generateSEOFiles();
