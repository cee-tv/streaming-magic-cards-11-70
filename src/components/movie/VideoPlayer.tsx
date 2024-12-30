import { X } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "../ui/dialog";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

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
  const [currentProvider, setCurrentProvider] = useState<'vidsrcvip' | 'embed' | 'multiembed' | 'vidsrc'>('vidsrcvip');

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
    { id: 'vidsrcvip', name: 'VidSrc VIP (Primary HD)' },
    { id: 'embed', name: 'Embed.su (Backup HD)' },
    { id: 'multiembed', name: 'MultiEmbed (Alternative HD)' },
    { id: 'vidsrc', name: 'VidSrc.to (Secondary HD)' },
  ] as const;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] w-full h-[90vh] p-0 bg-black">
        <DialogTitle className="sr-only">Play {title}</DialogTitle>
        <DialogDescription className="sr-only">Video player for {title}</DialogDescription>
        
        <div className="relative w-full h-full">
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-white bg-black/50 hover:bg-black/70 backdrop-blur-sm">
                  {providers.find(p => p.id === currentProvider)?.name || 'Select Provider'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {providers.map((provider) => (
                  <DropdownMenuItem
                    key={provider.id}
                    onClick={() => setCurrentProvider(provider.id)}
                  >
                    {provider.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-black/50 text-white hover:bg-black/70 backdrop-blur-sm w-8 h-8 border border-white/20"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </div>

          <iframe
            className="w-full h-full"
            src={getCurrentUrl()}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};