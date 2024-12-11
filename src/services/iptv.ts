export interface IPTVChannel {
  id: string;
  name: string;
  logo: string;
  streamUrl: string;
  category: string;
}

const categories = [
  "Sports",
  "News",
  "Entertainment",
  "Movies",
  "Kids"
];

// Simulated IPTV data - replace with your actual IPTV data source
const channels: IPTVChannel[] = [
  // Add your channel data here
  {
    id: "1",
    name: "Sports Channel",
    logo: "/placeholder.svg",
    streamUrl: "your-stream-url",
    category: "Sports"
  },
  // ... more channels
];

export const iptvService = {
  getCategories: () => categories,
  
  getChannelsByCategory: (category: string): IPTVChannel[] => {
    return channels
      .filter(channel => channel.category === category)
      .slice(0, 10); // Limit to 10 channels per category
  },
  
  getAllChannels: (): IPTVChannel[] => channels
};