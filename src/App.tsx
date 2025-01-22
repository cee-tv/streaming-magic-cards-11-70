import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { WatchlistProvider } from "./contexts/WatchlistContext";
import { useEffect } from "react";
import Index from "./pages/Index";
import MoviesPage from "./pages/MoviesPage";
import TVShowsPage from "./pages/TVShowsPage";
import SearchPage from "./pages/SearchPage";
import Watchlist from "./components/Watchlist";
import IPTVPage from "./pages/IPTVPage";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 2,
    },
  },
});

const NavigationHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle if no input/textarea is focused
      if (document.activeElement?.tagName === 'INPUT' || 
          document.activeElement?.tagName === 'TEXTAREA') {
        return;
      }

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          // Navigate between main sections
          if (location.pathname === '/movies') {
            navigate('/');
          } else if (location.pathname === '/tv') {
            navigate('/movies');
          } else if (location.pathname === '/iptv') {
            navigate('/tv');
          } else if (location.pathname === '/watchlist') {
            navigate('/iptv');
          }
          break;
        case 'ArrowRight':
          e.preventDefault();
          // Navigate between main sections
          if (location.pathname === '/') {
            navigate('/movies');
          } else if (location.pathname === '/movies') {
            navigate('/tv');
          } else if (location.pathname === '/tv') {
            navigate('/iptv');
          } else if (location.pathname === '/iptv') {
            navigate('/watchlist');
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          // Handle volume up or previous item in lists
          const volumeUpEvent = new CustomEvent('remote-volume-up');
          window.dispatchEvent(volumeUpEvent);
          break;
        case 'ArrowDown':
          e.preventDefault();
          // Handle volume down or next item in lists
          const volumeDownEvent = new CustomEvent('remote-volume-down');
          window.dispatchEvent(volumeDownEvent);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, location]);

  return null;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <WatchlistProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <NavigationHandler />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/movies" element={<MoviesPage />} />
              <Route path="/tv" element={<TVShowsPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/watchlist" element={<Watchlist />} />
              <Route path="/iptv" element={<IPTVPage />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </WatchlistProvider>
    </QueryClientProvider>
  );
};

export default App;