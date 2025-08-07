import axios from 'axios';

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  duration: string;
  viewCount: string;
  url: string;
}

interface YouTubeChannelResponse {
  items: Array<{
    contentDetails: {
      relatedPlaylists: {
        uploads: string;
      };
    };
  }>;
}

interface YouTubePlaylistResponse {
  items: Array<{
    snippet: {
      resourceId: {
        videoId: string;
      };
      title: string;
      description: string;
      thumbnails: {
        high: {
          url: string;
        };
      };
      publishedAt: string;
    };
  }>;
}

interface YouTubeVideoDetailsResponse {
  items: Array<{
    contentDetails: {
      duration: string;
    };
    statistics: {
      viewCount: string;
    };
  }>;
}

// RapidAPI configuration
const RAPIDAPI_KEY = process.env.REACT_APP_RAPIDAPI_KEY || 'YOUR_RAPIDAPI_KEY';
const RAPIDAPI_HOST = 'youtube-v31.p.rapidapi.com';

/**
 * Fetch videos from YouTube channel using RapidAPI
 * @param channelId - The YouTube channel ID (e.g., "@yispark")
 * @returns Promise<YouTubeVideo[]>
 */
export const fetchYouTubeVideos = async (channelId: string = "@yispark"): Promise<YouTubeVideo[]> => {
  try {
    // First, get the channel's uploads playlist
    const channelResponse = await axios.get<YouTubeChannelResponse>(`https://${RAPIDAPI_HOST}/channels`, {
      params: {
        part: 'contentDetails',
        forHandle: channelId
      },
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': RAPIDAPI_HOST
      }
    });

    if (!channelResponse.data.items || channelResponse.data.items.length === 0) {
      throw new Error('Channel not found');
    }

    const uploadsPlaylistId = channelResponse.data.items[0].contentDetails.relatedPlaylists.uploads;

    // Get videos from the uploads playlist
    const videosResponse = await axios.get<YouTubePlaylistResponse>(`https://${RAPIDAPI_HOST}/playlistItems`, {
      params: {
        part: 'snippet',
        playlistId: uploadsPlaylistId,
        maxResults: 20
      },
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': RAPIDAPI_HOST
      }
    });

    if (!videosResponse.data.items) {
      return [];
    }

    // Get detailed information for each video
    const videoIds = videosResponse.data.items.map((item) => item.snippet.resourceId.videoId).join(',');
    
    const detailsResponse = await axios.get<YouTubeVideoDetailsResponse>(`https://${RAPIDAPI_HOST}/videos`, {
      params: {
        part: 'contentDetails,statistics',
        id: videoIds
      },
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': RAPIDAPI_HOST
      }
    });

    // Combine the data
    return videosResponse.data.items.map((item, index) => {
      const details = detailsResponse.data.items?.[index];
      return {
        id: item.snippet.resourceId.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.high.url,
        publishedAt: item.snippet.publishedAt,
        duration: details?.contentDetails?.duration || 'PT0S',
        viewCount: details?.statistics?.viewCount || '0',
        url: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`
      };
    });
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    
    // Fallback to sample data if API fails
    return [
      {
        id: "dQw4w9WgXcQ",
        title: "VERSATILIS PROFILE 800 - Demo",
        description: "Demostración del VERSATILIS PROFILE 800",
        thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
        publishedAt: "2024-01-15T10:00:00Z",
        duration: "4:13",
        viewCount: "1.2K",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      },
      {
        id: "PHGPwOyD0kY",
        title: "SOLSTICE QUAD 616F - Setup Guide",
        description: "Guía de configuración del SOLSTICE QUAD 616F",
        thumbnail: "https://img.youtube.com/vi/PHGPwOyD0kY/hqdefault.jpg",
        publishedAt: "2024-01-10T14:30:00Z",
        duration: "8:45",
        viewCount: "856",
        url: "https://www.youtube.com/watch?v=PHGPwOyD0kY"
      }
    ];
  }
};

/**
 * Get video thumbnail URL
 * @param videoId - YouTube video ID
 * @returns Thumbnail URL
 */
export const getVideoThumbnail = (videoId: string): string => {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
};

/**
 * Get video embed URL
 * @param videoId - YouTube video ID
 * @returns Embed URL
 */
export const getVideoEmbedUrl = (videoId: string): string => {
  return `https://www.youtube.com/embed/${videoId}`;
};

/**
 * Format duration from ISO 8601 format to readable format
 * @param duration - ISO 8601 duration string (e.g., "PT4M13S")
 * @returns Formatted duration string
 */
export const formatDuration = (duration: string): string => {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return '0:00';
  
  const hours = (match[1] || '').replace('H', '');
  const minutes = (match[2] || '').replace('M', '');
  const seconds = (match[3] || '').replace('S', '');
  
  if (hours) {
    return `${hours}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
  } else if (minutes) {
    return `${minutes}:${seconds.padStart(2, '0')}`;
  } else {
    return `0:${seconds.padStart(2, '0')}`;
  }
};

/**
 * Format view count with appropriate suffix
 * @param viewCount - Number of views as string
 * @returns Formatted view count
 */
export const formatViewCount = (viewCount: string): string => {
  const count = parseInt(viewCount);
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
};

/**
 * Get channel ID from channel URL
 * @param channelUrl - YouTube channel URL
 * @returns Channel ID
 */
export const getChannelIdFromUrl = (channelUrl: string): string => {
  const match = channelUrl.match(/youtube\.com\/@([^/]+)/);
  return match ? match[1] : '';
};
