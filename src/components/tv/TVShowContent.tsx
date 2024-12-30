import { Movie } from "@/services/tmdb";
import { TVShowHeader } from "../tv/TVShowHeader";
import { TVShows } from "../TVShows";
import { useState } from "react";

interface TVShowContentProps {
  trending: Movie[];
  currentShowIndex: number;
  isPaused: boolean;
  onModalOpen: () => void;
  onModalClose: () => void;
  onPlayStart: () => void;
  onPlayEnd: () => void;
}

export const TVShowContent = ({
  trending,
  currentShowIndex,
  isPaused,
  onModalOpen,
  onModalClose,
  onPlayStart,
  onPlayEnd
}: TVShowContentProps) => {
  const currentShow = trending[currentShowIndex];

  if (!currentShow) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <>
      <TVShowHeader 
        show={currentShow}
        onModalOpen={onModalOpen}
        onPlayStart={onPlayStart}
        onPlayEnd={onPlayEnd}
      />
      <div className="pt-4">
        <TVShows />
      </div>
    </>
  );
};