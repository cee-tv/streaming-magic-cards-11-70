import { Dialog, DialogContent, DialogTitle, DialogDescription } from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

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
    { id: 'vidsrcvip', name: 'Source 1' },
    { id: 'embed', name: 'Source 2' },
    { id: 'multiembed', name: 'Source 3' },
    { id: 'vidsrc', name: 'Source 4' },
  ] as const;

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="max-w-full w-full h-[90vh] p-0 bg-black overflow-hidden m-0">
        <DialogTitle className="sr-only">Play {title}</DialogTitle>
        <DialogDescription className="sr-only">Video player for {title}</DialogDescription>
        
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-50">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-white hover:bg-white/20">
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
        </div>

        <iframe
          className="w-full h-[calc(90vh-4rem)] mt-16"
          src={getCurrentUrl()}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </DialogContent>
    </Dialog>
  );
};