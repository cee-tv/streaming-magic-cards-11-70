import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WatchlistProvider } from "./contexts/WatchlistContext";
import { Footer } from "./components/Footer";
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

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <WatchlistProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="flex flex-col min-h-screen">
              <div className="flex-grow">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/movies" element={<MoviesPage />} />
                  <Route path="/tv" element={<TVShowsPage />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/watchlist" element={<Watchlist />} />
                  <Route path="/iptv" element={<IPTVPage />} />
                </Routes>
              </div>
              <Footer />
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </WatchlistProvider>
    </QueryClientProvider>
  );
};

export default App;