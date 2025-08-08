// API para obtener los últimos reels de Instagram
export interface InstagramReel {
  id: string;
  media_type: 'REELS' | 'VIDEO' | 'IMAGE';
  media_url: string;
  thumbnail_url?: string;
  caption?: string;
  permalink: string;
  timestamp: string;
  like_count?: number;
  comments_count?: number;
  owner: {
    id: string;
    username: string;
  };
}

export interface InstagramApiResponse {
  data: InstagramReel[];
  paging?: {
    cursors?: {
      before?: string;
      after?: string;
    };
    next?: string;
  };
}

// Función para obtener los últimos reels usando la API de Instagram Graph
export const getLatestReels = async (): Promise<InstagramReel[]> => {
  try {
    // Usar la API de Instagram Graph
    const accessToken = process.env.VITE_INSTAGRAM_ACCESS_TOKEN;
    const userId = process.env.VITE_INSTAGRAM_USER_ID; // ID de la cuenta de Sanyi Lights
    
    if (!accessToken || !userId) {
      console.warn('Instagram API credentials not found. Using fallback data.');
      return getFallbackReels();
    }

    const response = await fetch(
      `https://graph.instagram.com/v18.0/${userId}/media?fields=id,media_type,media_url,thumbnail_url,caption,permalink,timestamp,like_count,comments_count,owner&media_type=REELS&limit=10&access_token=${accessToken}`
    );

    if (!response.ok) {
      throw new Error(`Instagram API error: ${response.status}`);
    }

    const data: InstagramApiResponse = await response.json();
    
    // Filtrar solo reels y ordenar por fecha más reciente
    const reels = data.data
      .filter(item => item.media_type === 'REELS')
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 3);

    return reels;
  } catch (error) {
    console.error('Error fetching Instagram reels:', error);
    return getFallbackReels();
  }
};

// Función para obtener reels usando la API pública de Instagram (sin autenticación)
export const getPublicReels = async (): Promise<InstagramReel[]> => {
  try {
    // Usar la API pública de Instagram (limitada pero funcional)
    const username = 'sanyilightsar';
    
    // Nota: Esta es una implementación simplificada
    // En producción, necesitarías usar la API oficial de Instagram Graph
    const response = await fetch(
      `https://www.instagram.com/${username}/?__a=1&__d=dis`
    );

    if (!response.ok) {
      throw new Error(`Instagram public API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Procesar los datos de la respuesta pública
    const reels = data.graphql?.user?.edge_owner_to_timeline_media?.edges
      ?.filter((edge: any) => edge.node.is_video)
      ?.slice(0, 3)
      ?.map((edge: any) => ({
        id: edge.node.id,
        media_type: 'REELS' as const,
        media_url: edge.node.video_url,
        thumbnail_url: edge.node.display_url,
        caption: edge.node.edge_media_to_caption?.edges?.[0]?.node?.text || '',
        permalink: `https://www.instagram.com/p/${edge.node.shortcode}/`,
        timestamp: new Date(edge.node.taken_at_timestamp * 1000).toISOString(),
        like_count: edge.node.edge_media_preview_like?.count || 0,
        comments_count: edge.node.edge_media_to_comment?.count || 0,
        owner: {
          id: edge.node.owner.id,
          username: username
        }
      })) || [];

    return reels;
  } catch (error) {
    console.error('Error fetching public Instagram reels:', error);
    return getFallbackReels();
  }
};

// Datos de fallback cuando la API no está disponible
export const getFallbackReels = (): InstagramReel[] => {
  return [
    {
      id: '1',
      media_type: 'REELS',
      media_url: 'https://www.instagram.com/reel/DMLaS7fOaU9/',
      permalink: 'https://www.instagram.com/reel/DMLaS7fOaU9/',
      timestamp: new Date().toISOString(),
      caption: 'Nuevo Cabezal Móvil LED - Demostración en vivo del nuevo modelo Sanyi',
      owner: {
        id: 'sanyilightsar',
        username: 'sanyilightsar'
      }
    },
    {
      id: '2',
      media_type: 'REELS',
      media_url: 'https://www.instagram.com/reel/DLprHr3uWNG/',
      permalink: 'https://www.instagram.com/reel/DLprHr3uWNG/',
      timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 día atrás
      caption: 'LED Display Profesional - Configuración para eventos masivos',
      owner: {
        id: 'sanyilightsar',
        username: 'sanyilightsar'
      }
    },
    {
      id: '3',
      media_type: 'REELS',
      media_url: 'https://www.instagram.com/reel/DLlP7pyuQEq/',
      permalink: 'https://www.instagram.com/reel/DLlP7pyuQEq/',
      timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 días atrás
      caption: 'Consola DMX Avanzada - Control total de iluminación escénica',
      owner: {
        id: 'sanyilightsar',
        username: 'sanyilightsar'
      }
    }
  ];
};

// Función para obtener reels usando RapidAPI (alternativa)
export const getReelsViaRapidAPI = async (): Promise<InstagramReel[]> => {
  try {
    const apiKey = process.env.VITE_RAPIDAPI_KEY;
    
    if (!apiKey) {
      console.warn('RapidAPI key not found. Using fallback data.');
      return getFallbackReels();
    }

    const response = await fetch('https://instagram-bulk-profile-scrapper.p.rapidapi.com/clients/api/ig/media_by_username/instagram', {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'instagram-bulk-profile-scrapper.p.rapidapi.com'
      }
    });

    if (!response.ok) {
      throw new Error(`RapidAPI error: ${response.status}`);
    }

    const data = await response.json();
    
    // Procesar los datos de RapidAPI
    const reels = data.response?.posts
      ?.filter((post: any) => post.is_video)
      ?.slice(0, 3)
      ?.map((post: any) => ({
        id: post.id,
        media_type: 'REELS' as const,
        media_url: post.video_url,
        thumbnail_url: post.display_url,
        caption: post.caption?.text || '',
        permalink: post.shortcode ? `https://www.instagram.com/p/${post.shortcode}/` : '',
        timestamp: new Date(post.taken_at_timestamp * 1000).toISOString(),
        like_count: post.likes || 0,
        comments_count: post.comments || 0,
        owner: {
          id: 'sanyilightsar',
          username: 'sanyilightsar'
        }
      })) || [];

    return reels;
  } catch (error) {
    console.error('Error fetching reels via RapidAPI:', error);
    return getFallbackReels();
  }
};

// Función principal que intenta diferentes métodos
export const fetchLatestReels = async (): Promise<InstagramReel[]> => {
  // Intentar primero con la API oficial de Instagram
  try {
    const reels = await getLatestReels();
    if (reels.length > 0) {
      return reels;
    }
  } catch (error) {
    console.log('Instagram Graph API failed, trying RapidAPI...');
  }

  // Intentar con RapidAPI
  try {
    const reels = await getReelsViaRapidAPI();
    if (reels.length > 0) {
      return reels;
    }
  } catch (error) {
    console.log('RapidAPI failed, trying public API...');
  }

  // Intentar con la API pública
  try {
    const reels = await getPublicReels();
    if (reels.length > 0) {
      return reels;
    }
  } catch (error) {
    console.log('Public API failed, using fallback data...');
  }

  // Usar datos de fallback
  return getFallbackReels();
};

// Función para formatear las fechas de los reels
export const formatReelDate = (timestamp: string): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) {
    return 'Hace menos de 1 hora';
  } else if (diffInHours < 24) {
    return `Hace ${diffInHours} horas`;
  } else {
    const diffInDays = Math.floor(diffInHours / 24);
    return `Hace ${diffInDays} días`;
  }
};

// Función para generar títulos automáticos basados en el caption
export const generateReelTitle = (caption: string): string => {
  if (!caption) return 'Nuevo Producto Sanyi';
  
  // Extraer palabras clave del caption
  const keywords = caption.toLowerCase().match(/\b(led|dmx|wash|beam|moving|head|light|fixture|professional|concert|stage|theatre|theater|dj|club|event|wedding|party|rental|rent|sanyi|argentina)\b/g);
  
  if (keywords && keywords.length > 0) {
    const mainKeyword = keywords[0].charAt(0).toUpperCase() + keywords[0].slice(1);
    return `${mainKeyword} Profesional`;
  }
  
  // Si no hay palabras clave, usar las primeras palabras del caption
  const words = caption.split(' ').slice(0, 3);
  return words.join(' ') || 'Nuevo Producto Sanyi';
};

// Función para generar descripciones automáticas
export const generateReelDescription = (caption: string): string => {
  if (!caption) return 'Descubre nuestros últimos productos en acción';
  
  // Limitar la descripción a 100 caracteres
  if (caption.length <= 100) {
    return caption;
  }
  
  return caption.substring(0, 97) + '...';
};
