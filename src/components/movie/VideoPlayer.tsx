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
  multiEmbedUrl,
  movieId,
  mediaType,
  season,
  episode,
  onNextEpisode
}: VideoPlayerProps) => {
  const [currentProvider, setCurrentProvider] = useState<'vidsrcvip' | 'multiembed' | 'vidsrc'>('vidsrcvip');

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
      case 'multiembed':
        return multiEmbedUrl;
      case 'vidsrc':
        return getVidsrcUrl();
      case 'vidsrcvip':
      default:
        return getVidsrcVipUrl();
    }
  };

  const handleProviderChange = (provider: 'vidsrcvip' | 'multiembed' | 'vidsrc') => {
    setCurrentProvider(provider);
  };

  const providers = [
    { id: 'vidsrcvip' as const, name: 'Source 1' },
    { id: 'multiembed' as const, name: 'Source 2' },
    { id: 'vidsrc' as const, name: 'Source 3' },
  ];

  const handleButtonClick = (e: React.MouseEvent, action: () => void) => {
    e.preventDefault();
    e.stopPropagation();
    action();
  };

  return (
    <Dialog 
      open={isOpen} 
      onOpenChange={onClose}
      onPointerDownOutside={(e) => e.preventDefault()}
    >
      <DialogContent 
        className="max-w-full w-full h-screen p-0 bg-black overflow-y-auto m-0" 
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogTitle className="sr-only">Play {title}</DialogTitle>
        <DialogDescription className="sr-only">Video player for {title}</DialogDescription>
        
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-50">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="text-white hover:bg-white/20"
                onClick={(e) => e.stopPropagation()}
              >
                {providers.find(p => p.id === currentProvider)?.name || 'Select Provider'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {providers.map((provider) => (
                <DropdownMenuItem
                  key={provider.id}
                  onClick={(e) => handleButtonClick(e, () => handleProviderChange(provider.id))}
                >
                  {provider.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-8 top-8 z-50 rounded-full bg-black/50 text-white hover:bg-black/70 w-8 h-8"
          onClick={(e) => handleButtonClick(e, onClose)}
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </Button>

        <iframe
          className="w-full h-[calc(100vh-4rem)] mt-16"
          src={getCurrentUrl()}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          sandbox="allow-same-origin allow-scripts allow-forms"
          referrerPolicy="no-referrer"
        />

        {onNextEpisode && (
          <Button
            className="absolute bottom-8 right-8 z-50"
            onClick={(e) => handleButtonClick(e, onNextEpisode)}
          >
            Next Episode
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
};