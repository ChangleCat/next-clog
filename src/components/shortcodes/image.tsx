// components/mdx/Image.tsx
import React from 'react';

interface ImageProps {
  src: string;
  caption: string; // 在 HTML 中，caption 通常作为 alt 文本
}

const Image: React.FC<ImageProps> = ({ src, caption }) => {
  return (
    <div className="mb-8 rounded-xl banner-container onload-animation overflow-hidden relative"> {/* */}
      <div className="transition absolute inset-0 dark:bg-black/10 bg-opacity-50 pointer-events-none"></div> {/* */}
      <img 
        src={src} //
        alt={caption} //
        loading="lazy" //
        className="w-full h-full object-center object-cover" //
        data-zoomable //
      />
    </div>
  );
};

export default Image;