'use client';

import { useState, useRef, useEffect } from 'react';
import { Heart, Play, Pause, User, X, ChevronUp, Upload } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

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
    src: 'http://127.0.0.1:8080/Pixar_Dog_and_Cat_s_Rainy_Dash.mp4',
    description: 'Big Buck Bunny - A delightful animated short film 🐰',
    likes: 1234,
    views: 5678,
    liked: false,
  },
  {
    id: '2',
    src: 'http://127.0.0.1:8080/Pixar_Friends_Warmth_and_Trust.mp4',
    description: 'Elephants Dream - Surreal 3D animated adventure 🐘',
    likes: 987,
    views: 3456,
    liked: false,
  },
  {
    id: '3',
    src: 'http://127.0.0.1:8080/Pixar_Rain_Scene_Video_Ready.mp4',
    description: 'Sintel - Epic fantasy short film with dragons 🐉',
    likes: 2341,
    views: 7890,
    liked: true,
  },
  {
    id: '4',
    src: 'http://127.0.0.1:8080/Pixar_Video_Max_and_Whiskers.mp4',
    description: 'Tears of Steel - Sci-fi action packed adventure 🚀',
    likes: 1876,
    views: 4321,
    liked: false,
  },
];

export default function Home() {
  const [videos, setVideos] = useState<Video[]>(sampleVideos);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [showPlayOverlay, setShowPlayOverlay] = useState(true);
  const [expandedDescription, setExpandedDescription] = useState(false);
  const [hasEnteredFullscreen, setHasEnteredFullscreen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle video play/pause on swipe
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      if (index === currentIndex) {
        if (!showPlayOverlay) {
          video.play().catch((error) =>
            console.error('Autoplay failed:', error)
          );
        }
        setIsPlaying(true)
      } else {
        video.pause();
        video.currentTime = 0; // Reset only other videos
        setExpandedDescription(false) // Also shorten the description section
      }
    });
  }, [currentIndex]);

  // Handle video play/pause on click
  useEffect(() => {
    const video = videoRefs.current[currentIndex]
    if (!video) return;

    if (!showPlayOverlay) {
      if (isPlaying) {
        video.play().catch((error) =>
          console.error('Autoplay failed:', error)
        );
      } else {
        video.pause();
      }
    }
  }, [isPlaying, showPlayOverlay]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (expandedDescription || isSliderOpen) return;

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
  }, [currentIndex, videos.length, expandedDescription, isSliderOpen]);

  useEffect(() => {
    const checkOrCreateUser = async () => {
      try {
        const response = await fetch('/backend/users/profile', {
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to check user profile.');
        }

        const userData = await response.json();
        console.log('User synced. User data:', userData);
      } catch (error) {
        console.error('User check/create failed:', error);
      }
    };

    checkOrCreateUser();
  }, []);

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
    if (expandedDescription || isSliderOpen) return;

    if (!hasEnteredFullscreen) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch((err) => {
          console.error('Fullscreen request failed:', err);
        });
      }
      setHasEnteredFullscreen(true);
    }

    if (showPlayOverlay) {
      setShowPlayOverlay(false);
      setIsPlaying(true);
    } else {
      setIsPlaying(prev => !prev);
    }
  };

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      setSelectedFile(file);
    } else {
      alert('Please select a video file');
      setSelectedFile(null);
    }
  };

  // Handle form submission
  const handleFormSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!selectedFile || !title || !description) {
      alert('Please fill in all fields and select a video file');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Step 1: Upload the video file
      const formData = new FormData();
      formData.append('video', selectedFile);

      const uploadResponse = await fetch('/backend/upload', {
        method: 'POST',
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error(`Upload failed: ${uploadResponse.statusText}`);
      }

      const uploadResult = await uploadResponse.json();

      // Step 2: Create video entry in database
      const createVideoResponse = await fetch('/backend/videos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
        }),
        credentials: 'include',
      });

      if (!createVideoResponse.ok) {
        throw new Error(`Video creation failed: ${createVideoResponse.statusText}`);
      }

      const videoData = await createVideoResponse.json();

      // Add the uploaded video to the videos array
      const newVideo: Video = {
        id: videoData.id || Date.now().toString(),
        src: `/backend${uploadResult.url}`,
        description: description,
        likes: 0,
        views: 0,
        liked: false,
      };

      setVideos(prevVideos => [newVideo, ...prevVideos]);
      setCurrentIndex(0);
      setIsSliderOpen(false);
      setTitle('');
      setDescription('');
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      alert('Video uploaded and created successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload video. Please try again.');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  // Handle add button click
  const handleAddButtonClick = () => {
    setIsSliderOpen(true);
  };

  // Handle slider close
  const handleCloseSlider = () => {
    setIsSliderOpen(false);
    setTitle('');
    setDescription('');
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Handle touch events for swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    if (expandedDescription || isSliderOpen) return;

    setTouchStart(e.targetTouches[0].clientY);
    setTouchEnd(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (expandedDescription || isSliderOpen) return;

    setTouchEnd(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (expandedDescription || isSliderOpen) return;

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

    setTouchStart(0);
    setTouchEnd(0);
  };

  // Handle mouse wheel for desktop
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();

    if (expandedDescription || isSliderOpen) return;

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
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Upload Progress Overlay */}
      {isUploading && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 text-white text-center">
            <Upload className="w-12 h-12 mx-auto mb-4 animate-bounce" />
            <p className="text-lg font-medium mb-2">Uploading video...</p>
            <div className="w-48 h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p className="text-sm text-white/70 mt-2">{uploadProgress}%</p>
          </div>
        </div>
      )}

      {/* Video Creation Slider */}
      <Dialog open={isSliderOpen} onOpenChange={setIsSliderOpen}>
        <DialogContent className="max-w-full h-full rounded-l-lg border-none bg-gray-900 p-6 sm:max-w-full sm:rounded-r-none">
          <DialogHeader className="flex flex-row items-center justify-between mb-6">
            <DialogTitle className="text-2xl font-bold text-white text-left">Create New Video</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCloseSlider}
              className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors cursor-pointer"
            >
              <X className="h-7 w-7 text-white" />
            </Button>
          </DialogHeader>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-lg text-white/70 font-medium">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter video title"
                className="bg-white/10 border-white/20 text-white text-lg p-3 h-12 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description" className="text-lg text-white/70 font-medium">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter video description"
                rows={4}
                className="bg-white/10 border-white/20 text-white text-lg p-3 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="video" className="text-lg text-white/70 font-medium">Video File</Label>
              <Button
                variant="outline"
                className="w-full bg-white/10 text-white border-white/20 hover:bg-white/20 text-lg p-3 h-12"
                onClick={() => fileInputRef.current?.click()}
              >
                {selectedFile ? selectedFile.name : 'Select video file'}
              </Button>
            </div>
            <Button
              onClick={handleFormSubmit}
              disabled={isUploading}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white text-lg p-3 h-12"
            >
              {isUploading ? 'Uploading...' : 'Upload Video'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/50 to-transparent pointer-events-none">
        <div className="flex items-start justify-between p-4 text-white">
          <h1 className="text-2xl font-bold">Clipfinity</h1>
          <div className="flex flex-col space-y-2 items-end pointer-events-auto">
            {/* Add Button */}
            <button
              onClick={handleAddButtonClick}
              disabled={isUploading}
              className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? (
                <div className="w-7 h-7 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              )}
            </button>
            {/* Profile Button */}
            <button className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors cursor-pointer">
              <User className="w-7 h-7 text-white" />
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
            className={`relative h-screen w-full flex items-center justify-center bg-black touch-pan-y`}
          >
            <video
              ref={el => videoRefs.current[index] = el}
              className="h-full w-full touch-pan-y"
              src={video.src}
              loop
              autoPlay
              playsInline
              onClick={handleVideoClick}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            />
            {/* Video Play Button */}
            {index === currentIndex && showPlayOverlay && (
              <div
                className="absolute inset-0 flex items-center justify-center z-10 bg-black/40 cursor-pointer"
                onClick={handleVideoClick}
              >
                <div className="bg-white/20 p-4 rounded-full backdrop-blur-md">
                  <Play className="w-10 h-10 text-white" />
                </div>
              </div>
            )}
            {/* Video Info Overlay */}
            <div
              className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 to-transparent p-4 pointer-events-none"
              style={{ touchAction: 'none' }}
            >
              <div className="flex justify-between items-end">
                {/* Description */}
                <div className="flex-1 text-white pr-4 relative">
                  <div
                    className={`relative text-sm font-medium mb-2 whitespace-pre-line transition-all duration-300 ${expandedDescription ? "pointer-events-auto" : "line-clamp-4"
                      }`}
                  >
                    {expandedDescription && (
                      <div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedDescription(false);
                          }}
                          className="group relative cursor-pointer pointer-events-auto"
                        >
                          <div className="bg-white/10 backdrop-blur-sm rounded-full p-3 group-hover:bg-white/20 transition-colors">
                            <X className="w-7 h-7 text-white group-hover:text-red-500 transition-colors" />
                          </div>
                        </button>
                      </div>
                    )}
                    {!expandedDescription && (
                      <div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedDescription(true);
                          }}
                          className="group relative cursor-pointer pointer-events-auto"
                        >
                          <div className="bg-white/10 backdrop-blur-sm rounded-full p-3 group-hover:bg-white/20 transition-colors">
                            <ChevronUp className="w-7 h-7 text-white group-hover:text-green-400 transition-colors" />
                          </div>
                        </button>
                      </div>
                    )}
                    <p className={`${expandedDescription ? "overflow-y-auto max-h-[50vh]" : ""}`} style={{ scrollbarWidth: 'none' }}>
                      {video.description}
                    </p>
                  </div>
                  <div className="text-xs text-white/70">{formatNumber(video.views)} views</div>
                </div>
                {/* Action Buttons */}
                <div className="flex flex-col items-center space-y-4 pointer-events-auto">
                  {/* Like Button */}
                  <button
                    onClick={() => handleLike(video.id)}
                    className="group relative cursor-pointer"
                  >
                    <div className="bg-white/10 backdrop-blur-sm rounded-full p-3 group-hover:bg-white/20 transition-colors">
                      <Heart
                        className={`w-7 h-7 transition-colors ${video.liked ? 'fill-red-500 text-red-500' : 'text-white group-hover:text-red-500'
                          }`}
                      />
                    </div>
                    <span className="text-white text-xs font-medium mt-1 block">
                      {formatNumber(video.likes)}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}