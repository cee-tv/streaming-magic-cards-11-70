import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "../ui/dialog";
import { useState } from "react";

interface VideoPlayerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  embedUrl: string;
  multiEmbedUrl: string;
}

export const VideoPlayer = ({ isOpen, onClose, title, embedUrl, multiEmbedUrl }: VideoPlayerProps) => {
  const [currentProvider, setCurrentProvider] = useState<'embed' | 'multiembed'>('embed');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-none w-screen h-screen p-0 bg-black">
        <DialogTitle className="sr-only">Play {title}</DialogTitle>
        <DialogDescription className="sr-only">Video player for {title}</DialogDescription>
        <div className="absolute left-4 top-4 z-50 flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={onClose}
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Return</span>
          </Button>
          <Button
            variant="ghost"
            className="text-white hover:bg-white/20"
            onClick={() => setCurrentProvider(currentProvider === 'embed' ? 'multiembed' : 'embed')}
          >
            Switch Provider
          </Button>
        </div>
        <iframe
          className="w-full h-full"
          src={currentProvider === 'embed' ? embedUrl : multiEmbedUrl}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </DialogContent>
    </Dialog>
  );
};