declare module 'react-medium-image-zoom' {
  import * as React from 'react';

  export interface ZoomProps {
    overlayBgColorStart?: string;
    overlayBgColorEnd?: string;
    zoomMargin?: number;
    children: React.ReactNode;
  }

  const Zoom: React.FC<ZoomProps>;
  export default Zoom;
}


