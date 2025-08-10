# Product Image Management System

This system makes it super easy to manage product images across your e-commerce application.

## 🚀 Quick Start

### 1. Add Product Images
Simply run the script with your product model name:

```bash
node src/scripts/add-product-images.js "SPL-LED-681"
```

This will:
- ✅ Create the product directory in `src/assets/SPL-LED-681/`
- ✅ Add image constants to the registry
- ✅ Update the image mapping
- ✅ Show you exactly where to place your images

### 2. Place Your Images
Put your images in the created directory:
```
src/assets/SPL-LED-681/
├── image.png      # Product thumbnail/card image
└── content.png    # Product detail/information image
```

### 3. Use in Product Data
Now you can easily use the images in your product data:

```typescript
import { getProductImages } from "../assets/product-images";

export const productData = {
  model: "SPL-LED-681",
  description: "LED BSW Moving Head Light",
  category: Category.MOVING_HEAD,
  image: getProductImages("SPL-LED-681").image,      // Automatically gets the right image
  content: getProductImages("SPL-LED-681").content,  // Automatically gets the right content
  video: "https://www.youtube.com/watch?v=...",
  new: false
};
```

## 🎯 Benefits

- **No more manual imports** - Everything is centralized
- **Automatic path management** - No more broken image links
- **Easy to add new products** - Just run one command
- **Type-safe** - TypeScript knows about all your images
- **Consistent naming** - All products follow the same pattern

## 📁 File Structure

```
src/assets/
├── product-images.ts          # Central registry (auto-generated)
├── SPL-LED-700/              # Product 1
│   ├── image.png
│   └── content.png
├── SPL-LED-681/              # Product 2 (when you add it)
│   ├── image.png
│   └── content.png
└── README.md                  # This file
```

## 🔧 Available Functions

```typescript
import { 
  getProductImages, 
  hasProductImages 
} from "../assets/product-images";

// Get both images for a product
const images = getProductImages("SPL-LED-700");
console.log(images.image);    // "/src/assets/SPL-LED-700/image.png"
console.log(images.content);  // "/src/assets/SPL-LED-700/content.png"

// Check if a product has images
if (hasProductImages("SPL-LED-700")) {
  console.log("Product has images!");
}
```

## 🆕 Adding a New Product

1. **Run the script:**
   ```bash
   node src/scripts/add-product-images.js "YOUR-PRODUCT-MODEL"
   ```

2. **Add your images** to the created directory

3. **Use in your product data:**
   ```typescript
   image: getProductImages("YOUR-PRODUCT-MODEL").image,
   content: getProductImages("YOUR-PRODUCT-MODEL").content,
   ```

That's it! 🎉
