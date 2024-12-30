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
  onNextEpisode
}: VideoPlayerProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl h-[80vh] p-0 bg-black">
        <DialogTitle className="sr-only">Play {title}</DialogTitle>
        <DialogDescription className="sr-only">Video player for {title}</DialogDescription>
        
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-white hover:bg-white/20">
                Select Provider
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => window.location.href = embedUrl}>
                Embed.su
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => window.location.href = multiEmbedUrl}>
                MultiEmbed
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <iframe
          className="w-full h-full"
          src={embedUrl}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />

        {onNextEpisode && (
          <Button
            onClick={onNextEpisode}
            className="absolute bottom-4 right-4 bg-white/10 hover:bg-white/20 text-white"
          >
            Next Episode
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
};