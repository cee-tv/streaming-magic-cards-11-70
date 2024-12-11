import { Dialog, DialogContent } from "./ui/dialog";

interface IPTVPlayerProps {
  isOpen: boolean;
  onClose: () => void;
  streamUrl: string;
  channelName: string;
}

export const IPTVPlayer = ({ isOpen, onClose, streamUrl, channelName }: IPTVPlayerProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl h-[80vh] p-0 bg-black">
        <div id="jwplayer-container" className="w-full h-full">
          {/* JW Player will be initialized here */}
          <div className="text-white">
            {/* Add your JW Player implementation here */}
            Playing: {channelName}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};