'use client';

import { useState, useEffect } from 'react';
import { ExternalLink, Globe, Link2 } from 'lucide-react';
import { getFavicon } from '@/lib/thumbnail';

interface LinkCardProps {
  title: string;
  url: string;
  username?: string; // Add username prop for tracking
}

export default function LinkCard({ title, url, username }: LinkCardProps) {
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [thumbnailError, setThumbnailError] = useState(false);
  const [faviconError, setFaviconError] = useState(false);

  // Track link click
  const handleLinkClick = async () => {
    if (!username) return; // Only track if username is provided
    
    try {
      // Track the click asynchronously (don't block navigation)
      fetch('/api/analytics/link-click', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          linkTitle: title,
          linkUrl: url,
        }),
      }).catch((error) => {
        console.error('Failed to track link click:', error);
      });
    } catch (error) {
      console.error('Error tracking link click:', error);
    }
  };

  useEffect(() => {
    const fetchThumbnail = async () => {
      setLoading(true);
      setThumbnailError(false);
      setFaviconError(false);

      try {
        // Step 1: Try to fetch thumbnail from API (OG image/Twitter card)
        const response = await fetch(`/api/thumbnail?url=${encodeURIComponent(url)}`);
        if (response.ok) {
          const data = await response.json();
          if (data.thumbnail) {
            // Verify the thumbnail URL is valid by testing if it loads
            const img = new Image();
            img.onload = () => {
              setThumbnail(data.thumbnail);
              setLoading(false);
            };
            img.onerror = () => {
              // Thumbnail URL exists but image fails to load, try favicon
              console.warn('Thumbnail image failed to load, trying favicon:', data.thumbnail);
              setThumbnailError(true);
              tryFaviconFallback();
            };
            img.src = data.thumbnail;
            return;
          }
        }
      } catch (error) {
        console.error('Error fetching thumbnail from API:', error);
      }
      
      // Step 2: Fallback to favicon if API didn't return a thumbnail
      tryFaviconFallback();
    };

    const tryFaviconFallback = () => {
      const faviconUrl = getFavicon(url);
      if (faviconUrl) {
        const img = new Image();
        img.onload = () => {
          setThumbnail(faviconUrl);
          setLoading(false);
        };
        img.onerror = () => {
          // Favicon also failed, show default icon
          console.warn('Favicon failed to load, using default icon');
          setFaviconError(true);
          setThumbnail(null);
          setLoading(false);
        };
        img.src = faviconUrl;
      } else {
        // No favicon URL generated, show default icon
        setThumbnail(null);
        setLoading(false);
      }
    };

    fetchThumbnail();
  }, [url]);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full group"
      onClick={handleLinkClick}
    >
      <div className="bg-bg-primary rounded-2xl p-4 md:p-5 hover:shadow-lg hover:scale-[1.02] transition-all duration-200 flex items-start md:items-center gap-3 md:gap-4 border-2 border-transparent hover:border-accent/30 relative">
        {/* Thumbnail - Larger on mobile */}
        <div className="flex-shrink-0">
          {thumbnail && !loading ? (
            <div className="w-20 h-20 md:w-16 md:h-16 rounded-xl overflow-hidden bg-white flex items-center justify-center border-2 border-accent/20 shadow-sm">
              <img
                src={thumbnail}
                alt={title}
                className="object-cover w-full h-full"
                onError={() => {
                  // If thumbnail fails to load even after verification, try favicon
                  if (!thumbnailError) {
                    setThumbnailError(true);
                    const faviconUrl = getFavicon(url);
                    if (faviconUrl) {
                      setThumbnail(faviconUrl);
                    } else {
                      setThumbnail(null);
                    }
                  } else if (!faviconError) {
                    // Favicon also failed, show default icon
                    setFaviconError(true);
                    setThumbnail(null);
                  }
                }}
              />
            </div>
          ) : (
            <div className="w-20 h-20 md:w-16 md:h-16 rounded-xl bg-white flex items-center justify-center border-2 border-accent/20 shadow-sm">
              {loading ? (
                <div className="w-8 h-8 md:w-6 md:h-6 border-2 border-accent/30 border-t-accent rounded-full animate-spin"></div>
              ) : (
                // Default icon when all image fetching fails
                <Link2 className="w-8 h-8 md:w-6 md:h-6 text-accent/60" />
              )}
            </div>
          )}
        </div>

        {/* Link Content - Allows wrapping on mobile and desktop */}
        <div className="flex-1 min-w-0 pr-8 md:pr-12">
          <h3 className="text-xl md:text-lg font-bold md:font-semibold text-text-primary leading-tight mb-1.5 md:mb-1 break-words line-clamp-2">
            {title}
          </h3>
          <p className="text-base md:text-sm text-text-primary/50 truncate font-medium md:font-normal flex items-center gap-1.5">
            <Globe className="text-text-primary/30 flex-shrink-0" size={14} />
            <span>{url.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0]}</span>
          </p>
        </div>

        {/* External Link Icon - Always visible on both mobile and desktop */}
        <div className="absolute top-4 right-4 md:relative md:top-auto md:right-auto flex-shrink-0">
          <ExternalLink 
            className="text-accent opacity-100 transition-opacity" 
            size={22} 
          />
        </div>
      </div>
    </a>
  );
}

