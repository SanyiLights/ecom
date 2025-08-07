/**
 * Upscales Wix static images by modifying URL parameters
 * @param originalUrl - The original Wix image URL
 * @param targetWidth - Desired width (default: 400)
 * @param targetHeight - Desired height (default: 400)
 * @returns Upscaled image URL
 */
export const upscaleWixImage = (
  originalUrl: string, 
  targetWidth: number = 400, 
  targetHeight: number = 400
): string => {
  if (!originalUrl || !originalUrl.includes('static.wixstatic.com')) {
    return originalUrl;
  }

  try {
    // Replace the width and height parameters in the URL
    let upscaledUrl = originalUrl
      .replace(/\/w_\d+/, `/w_${targetWidth}`)
      .replace(/\/h_\d+/, `/h_${targetHeight}`)
      .replace(/\/fill\/w_\d+,h_\d+/, `/fill/w_${targetWidth},h_${targetHeight}`)
      .replace(/\/al_c,q_\d+/, `/al_c,q_90`) // Increase quality to 90
      .replace(/\/q_\d+/, `/q_90`); // Increase quality to 90

    return upscaledUrl;
  } catch (error) {
    console.warn('Failed to upscale image URL:', originalUrl);
    return originalUrl;
  }
};

/**
 * Gets a high-quality version of a product image
 * @param imageUrl - The original image URL
 * @returns High-quality image URL
 */
export const getHighQualityImage = (imageUrl: string): string => {
  if (!imageUrl) return '';
  
  // For Wix images, upscale them
  if (imageUrl.includes('static.wixstatic.com')) {
    return upscaleWixImage(imageUrl, 400, 400);
  }
  
  return imageUrl;
};
