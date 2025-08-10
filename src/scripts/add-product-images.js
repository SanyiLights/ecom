#!/usr/bin/env node

/**
 * Script to easily add new product images to the registry
 * Usage: node add-product-images.js "PRODUCT-MODEL"
 * 
 * Example: node add-product-images.js "SPL-LED-681"
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productModel = process.argv[2];

if (!productModel) {
  console.error('❌ Please provide a product model name');
  console.log('Usage: node add-product-images.js "PRODUCT-MODEL"');
  console.log('Example: node add-product-images.js "SPL-LED-681"');
  process.exit(1);
}

const assetsDir = path.join(__dirname, '../../assets');
const productDir = path.join(assetsDir, productModel);
const registryFile = path.join(__dirname, '../assets/product-images.ts');

// Check if product directory exists
if (!fs.existsSync(productDir)) {
  console.log(`📁 Creating product directory: ${productModel}`);
  fs.mkdirSync(productDir, { recursive: true });
}

// Check if image files exist
const imagePath = path.join(productDir, 'image.png');
const contentPath = path.join(productDir, 'content.png');

if (!fs.existsSync(imagePath)) {
  console.log(`⚠️  Warning: ${imagePath} doesn't exist`);
  console.log(`   Please add your product image as: ${imagePath}`);
}

if (!fs.existsSync(contentPath)) {
  console.log(`⚠️  Warning: ${contentPath} doesn't exist`);
  console.log(`   Please add your product content image as: ${contentPath}`);
}

// Read current registry
let registryContent = fs.readFileSync(registryFile, 'utf8');

// Check if product already exists
if (registryContent.includes(`${productModel.toUpperCase().replace(/-/g, '_')}_IMAGE`)) {
  console.log(`✅ Product ${productModel} already exists in registry`);
  process.exit(0);
}

// Generate constants
const constantName = productModel.toUpperCase().replace(/-/g, '_');
const imageConstant = `${constantName}_IMAGE`;
const contentConstant = `${constantName}_CONTENT`;

// Add constants after existing ones
const constantsToAdd = `
// ${productModel}
export const ${imageConstant} = "/src/assets/${productModel}/image.png";
export const ${contentConstant} = "/src/assets/${productModel}/content.png";`;

// Insert after last export
const lastExportIndex = registryContent.lastIndexOf('export const');
const insertIndex = registryContent.indexOf('\n', lastExportIndex) + 1;
registryContent = registryContent.slice(0, insertIndex) + constantsToAdd + registryContent.slice(insertIndex);

// Add to imageMap
const imageMapPattern = /(\s*"SPL-LED-700":\s*{[^}]+})/;
const newImageMapEntry = `\n    "${productModel}": {
      image: ${imageConstant},
      content: ${contentConstant}
    }`;

if (imageMapPattern.test(registryContent)) {
  registryContent = registryContent.replace(
    imageMapPattern,
    `$1,${newImageMapEntry}`
  );
}

// Write updated registry
fs.writeFileSync(registryFile, registryContent);

console.log(`✅ Successfully added ${productModel} to image registry!`);
console.log(`📝 Added constants: ${imageConstant}, ${contentConstant}`);
console.log(`📁 Product directory: ${productDir}`);
console.log(`🖼️  Please add your images as:`);
console.log(`   - ${imagePath}`);
console.log(`   - ${contentPath}`);
console.log(`\n💡 Now you can use getProductImages("${productModel}") in your product data!`);
