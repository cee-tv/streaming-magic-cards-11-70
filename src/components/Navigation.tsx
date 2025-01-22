import { Film, Search, Tv, Bookmark, X, MonitorPlay } from "lucide-react";
import { Button } from "./ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const Navigation = ({ onMediaTypeChange }: { onMediaTypeChange: (type: 'movie' | 'tv') => void }) => {
  const isMobile = useIsMobile();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.trim()) {
      navigate(`/search?q=${encodeURIComponent(value.trim())}`);
    }
  };

  const isActive = (path: string) => location.pathname === path;
  const isSearchPage = location.pathname === '/search';

  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-300" 
         style={{
           background: 'linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 50%, transparent 100%)',
           backdropFilter: 'blur(5px)'
         }}>
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center">
          <img
            src="https://raw.githubusercontent.com/cee-tv/Chinatv/refs/heads/main/logo.png"
            alt="Logo"
            className="h-6 md:h-8 w-auto cursor-pointer"
            onClick={() => navigate('/')}
          />
        </div>

        <div className="flex flex-col items-end gap-2">
          {isMobile ? (
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="icon" 
                className={`text-white hover:bg-white/10 ${isActive('/movies') ? 'bg-white/20' : ''}`}
                onClick={() => navigate('/movies')}
              >
                <Film className="h-6 w-6" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className={`text-white hover:bg-white/10 ${isActive('/tv') ? 'bg-white/20' : ''}`}
                onClick={() => navigate('/tv')}
              >
                <Tv className="h-6 w-6" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className={`text-white hover:bg-white/10 ${isActive('/iptv') ? 'bg-white/20' : ''}`}
                onClick={() => navigate('/iptv')}
              >
                <MonitorPlay className="h-6 w-6" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className={`text-white hover:bg-white/10 ${isActive('/watchlist') ? 'bg-white/20' : ''}`}
                onClick={() => navigate('/watchlist')}
              >
                <Bookmark className="h-6 w-6" />
              </Button>
              {!isSearchPage && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`text-white hover:bg-white/10 ${showSearch ? 'bg-white/20' : ''}`}
                  onClick={() => setShowSearch(!showSearch)}
                >
                  <Search className="h-6 w-6" />
                </Button>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                className={`text-white hover:bg-white/10 ${isActive('/movies') ? 'bg-white/20' : ''}`}
                onClick={() => navigate('/movies')}
              >
                Movies
              </Button>
              <Button 
                variant="ghost" 
                className={`text-white hover:bg-white/10 ${isActive('/tv') ? 'bg-white/20' : ''}`}
                onClick={() => navigate('/tv')}
              >
                TV Shows
              </Button>
              <Button 
                variant="ghost" 
                className={`text-white hover:bg-white/10 ${isActive('/iptv') ? 'bg-white/20' : ''}`}
                onClick={() => navigate('/iptv')}
              >
                <MonitorPlay className="h-4 w-4 mr-2" />
                IPTV
              </Button>
              <Button 
                variant="ghost" 
                className={`text-white hover:bg-white/10 ${isActive('/watchlist') ? 'bg-white/20' : ''}`}
                onClick={() => navigate('/watchlist')}
              >
                <Bookmark className="h-4 w-4 mr-2" />
                Watchlist
              </Button>
              {!isSearchPage && (
                <Button 
                  variant="ghost" 
                  className={`text-white hover:bg-white/10 ${showSearch ? 'bg-white/20' : ''}`}
                  onClick={() => setShowSearch(!showSearch)}
                >
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              )}
            </div>
          )}
          
          {showSearch && !isSearchPage && (
            <form onSubmit={handleSearch} className="absolute mt-12 right-4">
              <input
                type="text"
                placeholder="Search movies and TV shows..."
                value={searchQuery}
                onChange={handleSearchInputChange}
                className="w-40 h-8 bg-black/50 text-sm text-white border border-white/20 rounded-md px-2 py-1 focus:outline-none focus:border-white/40"
                autoFocus
              />
            </form>
          )}
        </div>
      </div>
    </nav>
  );
};