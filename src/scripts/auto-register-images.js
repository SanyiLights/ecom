import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const assetsDir = path.join(__dirname, '../assets');
const registryFile = path.join(assetsDir, 'product-images.ts');

console.log('🔍 Scanning for existing product directories...');

// Get all directories in assets (excluding non-product dirs)
const productDirs = fs.readdirSync(assetsDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .filter(dirent => !dirent.name.startsWith('.') && dirent.name !== 'ui')
  .map(dirent => dirent.name);

console.log(`📁 Found ${productDirs.length} product directories:`);
productDirs.forEach(dir => console.log(`  - ${dir}`));

// Generate the registry content
let registryContent = `// Centralized product image registry
// Auto-generated from existing product directories

`;

// Add constants for each product
productDirs.forEach(dir => {
  const constName = dir.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase();
  registryContent += `// ${dir}\n`;
  registryContent += `export const ${constName}_IMAGE = "/src/assets/${dir}/image.png";\n`;
  registryContent += `export const ${constName}_CONTENT = "/src/assets/${dir}/content.png";\n\n`;
});

// Add the helper functions
registryContent += `// Helper function to get product images by model
export const getProductImages = (model: string) => {
  const imageMap: Record<string, { image: string; content: string }> = {
`;

// Add mapping for each product
productDirs.forEach(dir => {
  const constName = dir.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase();
  registryContent += `    "${dir}": {\n`;
  registryContent += `      image: ${constName}_IMAGE,\n`;
  registryContent += `      content: ${constName}_CONTENT\n`;
  registryContent += `    },\n`;
});

registryContent += `  };
  
  return imageMap[model] || { image: "", content: "" };
};

// Helper function to check if a product has images
export const hasProductImages = (model: string): boolean => {
  const images = getProductImages(model);
  return !!(images.image && images.content);
};
`;

// Write the registry file
fs.writeFileSync(registryFile, registryContent);

console.log(`✅ Registry updated with ${productDirs.length} products!`);
console.log(`📝 File: ${registryFile}`);

// Now let's also update the new-products.ts to use these images
console.log('\n🔄 Updating new-products.ts to use the registry...');

const productsFile = path.join(__dirname, '../data/new-products.ts');
let productsContent = fs.readFileSync(productsFile, 'utf8');

// Find all product entries and update their image/content fields
productDirs.forEach(dir => {
  const modelPattern = new RegExp(`"model":\\s*"${dir.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`, 'g');
  
  if (productsContent.includes(`"model": "${dir}"`)) {
    // Update image and content fields for this product
    const imagePattern = new RegExp(`("image":\\s*)"[^"]*"`, 'g');
    const contentPattern = new RegExp(`("content":\\s*)"[^"]*"`, 'g');
    
    productsContent = productsContent.replace(imagePattern, `$1getProductImages("${dir}").image`);
    productsContent = productsContent.replace(contentPattern, `$1getProductImages("${dir}").content`);
    
    console.log(`  ✅ Updated ${dir}`);
  }
});

// Write the updated products file
fs.writeFileSync(productsFile, productsContent);

console.log('🎉 All done! Your products now use the centralized image registry.');
console.log('\n📋 Next steps:');
console.log('  1. Make sure each product directory has image.png and content.png files');
console.log('  2. Run your app to see the images in action!');
