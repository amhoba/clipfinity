'use client';

import { useState, useRef, useEffect } from 'react';
import { Heart, Play, Pause } from 'lucide-react';

interface Video {
  id: string;
  src: string;
  description: string;
  likes: number;
  views: number;
  liked: boolean;
}

// Sample video data with CC vertical videos
const sampleVideos: Video[] = [
  {
    id: '1',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    description: 'Big Buck Bunny - A delightful animated short film 🐰',
    likes: 1234,
    views: 5678,
    liked: false,
  },
  {
    id: '2',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    description: 'Elephants Dream - Surreal 3D animated adventure 🐘',
    likes: 987,
    views: 3456,
    liked: false,
  },
  {
    id: '3',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    description: 'Sintel - Epic fantasy short film with dragons 🐉',
    likes: 2341,
    views: 7890,
    liked: true,
  },
  {
    id: '4',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    description: 'Tears of Steel - Sci-fi action packed adventure 🚀',
    likes: 1876,
    views: 4321,
    liked: false,
  },
];

export default function Home() {
  const [videos, setVideos] = useState<Video[]>(sampleVideos);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [mouseStart, setMouseStart] = useState(0);
  const [mouseEnd, setMouseEnd] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle video play/pause
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentIndex && isPlaying) {
          video.currentTime = 0;
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.catch((error) => {
              console.error('Autoplay failed:', error);
            });
          }
        } else {
          video.pause();
        }
      }
    });
  }, [currentIndex, isPlaying]);  

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' && currentIndex < videos.length - 1) {
        setCurrentIndex(prev => prev + 1);
      }
      if (e.key === 'ArrowUp' && currentIndex > 0) {
        setCurrentIndex(prev => prev - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, videos.length]);

  // Handle like button
  const handleLike = (videoId: string) => {
    setVideos(prevVideos =>
      prevVideos.map(video =>
        video.id === videoId
          ? {
            ...video,
            liked: !video.liked,
            likes: video.liked ? video.likes - 1 : video.likes + 1,
          }
          : video
      )
    );
  };

  // Handle video click (play/pause)
  const handleVideoClick = () => {
    setIsPlaying(!isPlaying);
  };

  // Handle touch events for swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY);
    setTouchEnd(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isUpSwipe = distance > 50;
    const isDownSwipe = distance < -50;

    if (isUpSwipe && currentIndex < videos.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    if (isDownSwipe && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }

    // Reset touch values
    setTouchStart(0);
    setTouchEnd(0);
  };

  // Handle mouse events for desktop swiping
  const handleMouseDown = (e: React.MouseEvent) => {
    setMouseStart(e.clientY);
    setMouseEnd(0);
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setMouseEnd(e.clientY);
  };

  const handleMouseUp = () => {
    if (!isDragging || !mouseStart || !mouseEnd) {
      setIsDragging(false);
      return;
    }

    const distance = mouseStart - mouseEnd;
    const isUpSwipe = distance > 50;
    const isDownSwipe = distance < -50;

    if (isUpSwipe && currentIndex < videos.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    if (isDownSwipe && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }

    // Reset mouse values
    setMouseStart(0);
    setMouseEnd(0);
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setMouseStart(0);
    setMouseEnd(0);
  };

  // Handle mouse wheel for desktop
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const isScrollUp = e.deltaY > 0;
    const isScrollDown = e.deltaY < 0;

    if (isScrollUp && currentIndex < videos.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    if (isScrollDown && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Format numbers (1234 -> 1.2K)
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="h-screen bg-black overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/50 to-transparent">
        <div className="flex items-center justify-between p-4 text-white">
          <h1 className="text-2xl font-bold">Clipfinity</h1>
          <div className="flex space-x-4">
            <button className="p-2 rounded-full bg-white/10 backdrop-blur-sm">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="p-2 rounded-full bg-white/10 backdrop-blur-sm">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Video Container */}
      <div
        ref={containerRef}
        className="relative h-full transition-transform duration-300 ease-out touch-pan-y"
        style={{
          transform: `translateY(-${currentIndex * 100}vh)`,
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onWheel={handleWheel}
      >
        {videos.map((video, index) => (
          <div
            key={video.id}
            className={`relative ${index === currentIndex ? 'h-[calc(100vh-64px)]' : 'h-screen'} w-full flex items-center justify-center bg-black touch-pan-y`}
          >
            <video
              ref={el => videoRefs.current[index] = el}
              className="h-full w-full object-cover touch-pan-y"
              src={video.src}
              loop
              autoPlay
              playsInline
              onClick={handleVideoClick}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 600'%3E%3Crect width='400' height='600' fill='%23111827'/%3E%3Ctext x='200' y='300' text-anchor='middle' fill='%23fff' font-size='24' font-family='Arial'%3ELoading...%3C/text%3E%3C/svg%3E"
            />

            {/* Video Info Overlay */}
            <div
              className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 to-transparent p-4 pointer-events-none"
              style={{ touchAction: 'none' }}
            >
              <div className="flex justify-between items-end">
                {/* Description */}
                <div className="flex-1 text-white pr-4">
                  <p className="text-sm font-medium mb-2">{video.description}</p>
                  <p className="text-xs text-white/70">{formatNumber(video.views)} views</p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col items-center space-y-4 pointer-events-auto">
                  {/* Like Button */}
                  <button
                    onClick={() => handleLike(video.id)}
                    className="group relative"
                  >
                    <div className="bg-white/10 backdrop-blur-sm rounded-full p-3 group-hover:bg-white/20 transition-colors">
                      <Heart
                        className={`w-7 h-7 transition-colors ${video.liked
                          ? 'fill-red-500 text-red-500'
                          : 'text-white group-hover:text-red-500'
                          }`}
                      />
                    </div>
                    <span className="text-white text-xs font-medium mt-1 block">
                      {formatNumber(video.likes)}
                    </span>
                  </button>

                  {/* Share Button */}
                  <button className="group pointer-events-auto">
                    <div className="bg-white/10 backdrop-blur-sm rounded-full p-3 group-hover:bg-white/20 transition-colors">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                    </div>
                  </button>

                  {/* More Options */}
                  <button className="group pointer-events-auto">
                    <div className="bg-white/10 backdrop-blur-sm rounded-full p-3 group-hover:bg-white/20 transition-colors">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0 z-30 bg-black/80 backdrop-blur-sm">
        <div className="flex items-center justify-around py-3 px-4 text-white">
          <button className="flex flex-col items-center space-y-1">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
            <span className="text-xs">Home</span>
          </button>
          <button className="flex flex-col items-center space-y-1 text-white/60">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-xs">Explore</span>
          </button>
          <button className="flex flex-col items-center space-y-1 text-white/60">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span className="text-xs">Create</span>
          </button>
          <button className="flex flex-col items-center space-y-1 text-white/60">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="text-xs">Likes</span>
          </button>
          <button className="flex flex-col items-center space-y-1 text-white/60">
            <div className="w-6 h-6 bg-white/20 rounded-full"></div>
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}