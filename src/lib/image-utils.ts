export const getHighQualityImage = (imageUrl: string): string => {
  if (!imageUrl) return '';
  
  if (imageUrl.includes('static.wixstatic.com')) {
    return upscaleWixImage(imageUrl, 400, 400);
  }
  return imageUrl;
};

const upscaleWixImage = (
  originalUrl: string, 
  targetWidth: number = 400, 
  targetHeight: number = 400
): string => {
  if (!originalUrl || !originalUrl.includes('static.wixstatic.com')) {
    return originalUrl;
  }

  try {
    const upscaledUrl = originalUrl
      .replace(/\/w_\d+/, `/w_${targetWidth}`)
      .replace(/\/h_\d+/, `/h_${targetHeight}`)
      .replace(/\/fill\/w_\d+,h_\d+/, `/fill/w_${targetWidth},h_${targetHeight}`)
      .replace(/\/al_c,q_\d+/, `/al_c,q_90`)
      .replace(/\/q_\d+/, `/q_90`);

    return upscaledUrl;
  } catch (error) {
    console.warn('Failed to upscale image URL:', originalUrl);
    return originalUrl;
  }
};


