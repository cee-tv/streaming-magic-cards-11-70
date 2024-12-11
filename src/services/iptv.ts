export interface IPTVChannel {
  id: string;
  name: string;
  logo: string;
  streamUrl: string;
  category: string;
  drmConfig?: {
    licenseUrl: string;
    clearkey: string;
  };
}

const categories = [
  "Local TV",
  "Movies",
  "Entertainment",
  "News",
  "Sports"
];

const channels: IPTVChannel[] = [
  {
    id: "1",
    name: "TV5",
    logo: "/placeholder.svg", // Replace with actual TV5 logo URL
    streamUrl: "https://qp-pldt-live-grp-02-prod.akamaized.net/out/u/tv5_hd.mpd",
    category: "Local TV",
    drmConfig: {
      licenseUrl: "https://clearkey-base64-2-hex-json.herokuapp.com/api/",
      clearkey: "2615129ef2c846a9bbd43a641c7303ef:07c7f996b1734ea288641a68e1cfdc4d"
    }
  },
  {
    id: "2",
    name: "Cinema One",
    logo: "/placeholder.svg", // Replace with actual Cinema One logo URL
    streamUrl: "https://cinemaone-abscbn-ono.amagi.tv/index_3.m3u8",
    category: "Movies"
  },
  // Add more channels here as needed
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