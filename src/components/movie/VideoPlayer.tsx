import { X, ChevronRight } from "lucide-react";
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
  onNextEpisode?: () => void;
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
  episode,
  onNextEpisode
}: VideoPlayerProps) => {
  const [currentProvider, setCurrentProvider] = useState<'embed' | 'multiembed' | 'vidsrc' | 'vidsrcvip'>('vidsrcvip');

  const getVidsrcUrl = () => {
    if (mediaType === 'movie') {
      return `https://vidsrc.to/embed/movie/${movieId}`;
    }
    return `https://vidsrc.to/embed/tv/${movieId}/${season}/${episode}`;
  };

  const getVidsrcVipUrl = () => {
    if (mediaType === 'movie') {
      return `https://vidsrc.vip/embed/movie/${movieId}`;
    }
    return `https://vidsrc.vip/embed/tv/${movieId}/${season}/${episode}`;
  };

  const getCurrentUrl = () => {
    switch (currentProvider) {
      case 'embed':
        return embedUrl;
      case 'multiembed':
        return multiEmbedUrl;
      case 'vidsrc':
        return getVidsrcUrl();
      case 'vidsrcvip':
        return getVidsrcVipUrl();
      default:
        return getVidsrcVipUrl();
    }
  };

  const providers = [
    { id: 'vidsrcvip', name: 'VidSrc VIP' },
    { id: 'embed', name: 'Embed.su' },
    { id: 'multiembed', name: 'MultiEmbed' },
    { id: 'vidsrc', name: 'VidSrc' },
  ] as const;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl h-[80vh] p-0 bg-black">
        <DialogTitle className="sr-only">Play {title}</DialogTitle>
        <DialogDescription className="sr-only">Video player for {title}</DialogDescription>
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {providers.map((provider) => (
              <Button
                key={provider.id}
                variant="ghost"
                className={`text-white hover:bg-white/20 ${
                  currentProvider === provider.id ? 'bg-white/20' : ''
                }`}
                onClick={() => setCurrentProvider(provider.id)}
              >
                {provider.name}
              </Button>
            ))}
          </div>
          {mediaType === 'tv' && onNextEpisode && (
            <Button
              variant="ghost"
              className="text-white hover:bg-white/20 mt-2 w-full"
              onClick={onNextEpisode}
            >
              Next Episode
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 z-50 rounded-full text-white hover:bg-white/20 w-8 h-8"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </Button>
        <iframe
          className="w-full h-full"
          src={getCurrentUrl()}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </DialogContent>
    </Dialog>
  );
};