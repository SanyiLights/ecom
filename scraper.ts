import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';

interface Product {
  id: string;
  name: string;
  image: string;
  category: string;
  description: string;
  video: string;
  manual: string;
}

const CATEGORY_HEADERS = [
  'AUTOMATIC LIGHTS',
  'STATIC LIGHTS',
  'TV & STUDIO',
  'CONTROLLER',
  'EFFECT LIGHT',
  'EFFECT MACHINE',
];

function normalizeCategory(header: string): string {
  const h = header.toUpperCase();
  if (h.includes('AUTOMATED') || h.includes('AUTOMATIC')) return 'Automatic Lights';
  if (h.includes('STATIC')) return 'Static Lights';
  if (h.includes('CONTROLLER')) return 'Controller';
  if (h.includes('TV') || h.includes('STUDIO')) return 'TV & Studio';
  if (h.includes('EFFECT LIGHT')) return 'Effect Light';
  if (h.includes('EFFECT MACHINE')) return 'Effect Machine';
  return header.trim();
}

function cleanProductName(name: string): string {
  return name.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
}

async function scrapeAllProducts(): Promise<void> {
  try {
    console.log('Fetching Sanyi Lights download page...');
    const response = await axios.get('https://www.sanyilights.us/download', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    const $ = cheerio.load(response.data);
    const products: Product[] = [];
    let currentCategory = '';
    let productId = 1;

    // Traverse all elements in the main content
    $("body *").each((_, el) => {
      const tag = el.tagName?.toLowerCase();
      const text = $(el).text().trim();
      if (!text) return;
      // Detect category headers
      if (["h1", "h2", "h3"].includes(tag)) {
        if (CATEGORY_HEADERS.some(h => text.toUpperCase().includes(h))) {
          currentCategory = normalizeCategory(text);
        }
      }
      // Detect product names
      if (["h4", "h5", "h6"].includes(tag)) {
        if (text.length < 3) return;
        // Skip if it's a known non-product
        if (text.match(/(Download|Center|Lights|Controller|Machine|Studio|Wall|Profile|Package|FOR|ALL SANYI|PROFILE FOR|STATIC|EFFECT|VIDEO)/i)) return;
        // Try to find image in the same or previous sibling
        let imageUrl = '';
        const container = $(el).closest('div');
        if (container.length) {
          const img = container.find('img').first();
          if (img.length && img.attr('src')) {
            imageUrl = img.attr('src') || '';
          }
        }
        products.push({
          id: productId.toString(),
          name: cleanProductName(text),
          image: imageUrl,
          category: currentCategory || 'Uncategorized',
          description: `${cleanProductName(text)} - Professional lighting equipment`,
          video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          manual: `https://example.com/manual-${productId}.pdf`
        });
        productId++;
      }
    });

    console.log(`Found ${products.length} products.`);
    fs.writeFileSync('scraped-products.json', JSON.stringify(products, null, 2));
    const tsCode = `import { Product } from './products';\n\nexport const products: Product[] = ${JSON.stringify(products, null, 2)};\n`;
    fs.writeFileSync('src/data/products-scraped.ts', tsCode);
    console.log('Saved to scraped-products.json and src/data/products-scraped.ts');
    products.slice(0, 10).forEach(p => console.log(`- ${p.name} (${p.category})`));
  } catch (error) {
    console.error('Error:', error);
  }
}

scrapeAllProducts();
