import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { WatchlistProvider } from "./contexts/WatchlistContext";
import Index from "./pages/Index";
import MoviesPage from "./pages/MoviesPage";
import TVShowsPage from "./pages/TVShowsPage";
import IPTVPage from "./pages/IPTVPage";
import MyList from "./pages/MyList";
import SearchPage from "./pages/SearchPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WatchlistProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/tv" element={<TVShowsPage />} />
            <Route path="/iptv" element={<IPTVPage />} />
            <Route path="/my-list" element={<MyList />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </Router>
        <Toaster />
      </WatchlistProvider>
    </QueryClientProvider>
  );
}

export default App;