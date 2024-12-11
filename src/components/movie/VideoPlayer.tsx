import { X } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "../ui/dialog";
import { useState } from "react";

interface VideoPlayerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  embedUrl: string;
  multiEmbedUrl: string;
  movieId: string | number;
  mediaType: 'movie' | 'tv';
  season?: number;
  episode?: number;
}

export const VideoPlayer = ({ 
  isOpen, 
  onClose, 
  title, 
  embedUrl, 
  multiEmbedUrl,
  movieId,
  mediaType,
  season,
  episode
}: VideoPlayerProps) => {
  const [currentProvider, setCurrentProvider] = useState<'embed' | 'multiembed' | 'vidsrc'>('embed');

  const getVidsrcUrl = () => {
    if (mediaType === 'movie') {
      return `https://vidsrc.to/embed/movie/${movieId}`;
    }
    return `https://vidsrc.to/embed/tv/${movieId}/${season}/${episode}`;
  };

  const getCurrentUrl = () => {
    switch (currentProvider) {
      case 'embed':
        return embedUrl;
      case 'multiembed':
        return multiEmbedUrl;
      case 'vidsrc':
        return getVidsrcUrl();
      default:
        return embedUrl;
    }
  };

  const switchProvider = () => {
    if (currentProvider === 'embed') {
      setCurrentProvider('multiembed');
    } else if (currentProvider === 'multiembed') {
      setCurrentProvider('vidsrc');
    } else {
      setCurrentProvider('embed');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl h-[80vh] p-0 bg-black">
        <DialogTitle className="sr-only">Play {title}</DialogTitle>
        <DialogDescription className="sr-only">Video player for {title}</DialogDescription>
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 flex gap-2">
          <Button
            variant="ghost"
            className="text-white hover:bg-white/20"
            onClick={switchProvider}
          >
            Switch Provider ({currentProvider})
          </Button>
        </div>
        <div className="absolute right-4 top-4 z-50">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={onClose}
          >
            <X className="h-8 w-8" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
        <iframe
          className="w-full h-full"
          src={getCurrentUrl()}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          sandbox="allow-same-origin allow-scripts allow-forms allow-presentation"
          loading="lazy"
          referrerPolicy="no-referrer"
          allowFullScreen
        />
      </DialogContent>
    </Dialog>
  );
};