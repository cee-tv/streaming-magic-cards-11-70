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
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-300" 
         style={{
           background: 'linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 50%, transparent 100%)',
           backdropFilter: 'blur(5px)'
         }}>
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center">
          <svg
            viewBox="0 0 111 30"
            className="h-6 md:h-8 w-24 md:w-28 fill-red-600 cursor-pointer"
            aria-hidden="true"
            focusable="false"
            onClick={() => navigate('/')}
          >
            <g>
              <path d="M105.06233,14.2806261 L110.999156,30 C109.249227,29.7497422 107.500234,29.4366857 105.718437,29.1554972 L102.374168,20.4686475 L98.9371075,28.4375293 C97.2499766,28.1563408 95.5928391,28.061674 93.9057081,27.8432843 L99.9372012,14.0931671 L94.4680851,-5.68434189e-14 L99.5313525,-5.68434189e-14 L102.593495,7.87421502 L105.874965,-5.68434189e-14 L110.999156,-5.68434189e-14 L105.06233,14.2806261 Z M90.4686475,-5.68434189e-14 L85.8749649,-5.68434189e-14 L85.8749649,27.2499766 C87.3746368,27.3437061 88.9371075,27.4055675 90.4686475,27.5930265 L90.4686475,-5.68434189e-14 Z M81.9055207,26.93692 C77.7186241,26.6557316 73.5307901,26.4064111 69.250164,26.3117443 L69.250164,-5.68434189e-14 L73.9366389,-5.68434189e-14 L73.9366389,21.8745899 C76.6248008,21.9373887 79.3120255,22.1557784 81.9055207,22.2804387 L81.9055207,26.93692 Z M64.2496954,10.6561065 L64.2496954,15.3435186 L57.8442216,15.3435186 L57.8442216,25.9996251 L53.2186709,25.9996251 L53.2186709,-5.68434189e-14 L66.3436123,-5.68434189e-14 L66.3436123,4.68741213 L57.8442216,4.68741213 L57.8442216,10.6561065 L64.2496954,10.6561065 Z M45.3435186,4.68741213 L45.3435186,26.2498828 C43.7810479,26.2498828 42.1876465,26.2498828 40.6561065,26.3117443 L40.6561065,4.68741213 L35.8121661,4.68741213 L35.8121661,-5.68434189e-14 L50.2183897,-5.68434189e-14 L50.2183897,4.68741213 L45.3435186,4.68741213 Z M30.749836,15.5928391 C28.687787,15.5928391 26.2498828,15.5928391 24.4999531,15.6875059 L24.4999531,22.6562939 C27.2499766,22.4678976 30,22.2495079 32.7809542,22.1557784 L32.7809542,26.6557316 L19.812541,27.6876933 L19.812541,-5.68434189e-14 L32.7809542,-5.68434189e-14 L32.7809542,4.68741213 L24.4999531,4.68741213 L24.4999531,10.9991564 C26.3126816,10.9991564 29.0936358,10.9054269 30.749836,10.9054269 L30.749836,15.5928391 Z M4.78114163,12.9684132 L4.78114163,29.3429562 C3.09401069,29.5313525 1.59340144,29.7497422 0,30 L0,-5.68434189e-14 L4.4690224,-5.68434189e-14 L10.562377,17.0315868 L10.562377,-5.68434189e-14 L15.2497891,-5.68434189e-14 L15.2497891,28.061674 C13.5935889,28.3437998 11.906458,28.4375293 10.1246602,28.6868498 L4.78114163,12.9684132 Z" />
            </g>
          </svg>
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
              <Button 
                variant="ghost" 
                size="icon" 
                className={`text-white hover:bg-white/10 ${showSearch ? 'bg-white/20' : ''}`}
                onClick={() => setShowSearch(!showSearch)}
              >
                <Search className="h-6 w-6" />
              </Button>
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
              <Button 
                variant="ghost" 
                className={`text-white hover:bg-white/10 ${showSearch ? 'bg-white/20' : ''}`}
                onClick={() => setShowSearch(!showSearch)}
              >
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          )}
          
          {showSearch && (
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