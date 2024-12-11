export interface IPTVChannel {
  id: string;
  name: string;
  logo: string;
  streamUrl: string;
  category: string;
  drmConfig?: {
    licenseUrl?: string;
    clearkey?: {
      keyId: string;
      key: string;
    };
  };
}

const categories = [
  "Local TV",
  "Movies",
  "Entertainment",
  "News",
  "Sports",
  "Kids",
  "Lifestyle"
];

const channels: IPTVChannel[] = [
  {
    id: "tv5",
    name: "TV5",
    logo: "/placeholder.svg",
    streamUrl: "https://qp-pldt-live-grp-02-prod.akamaized.net/out/u/tv5_hd.mpd",
    category: "Local TV",
    drmConfig: {
      clearkey: {
        keyId: "2615129ef2c846a9bbd43a641c7303ef",
        key: "07c7f996b1734ea288641a68e1cfdc4d"
      }
    }
  },
  {
    id: "a2z",
    name: "A2Z",
    logo: "/placeholder.svg", 
    streamUrl: "https://qp-pldt-live-grp-02-prod.akamaized.net/out/u/cg_a2z.mpd",
    category: "Local TV",
    drmConfig: {
      clearkey: {
        keyId: "f703e4c8ec9041eeb5028ab4248fa094",
        key: "c22f2162e176eee6273a5d0b68d19530"
      }
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
    return channels.filter(channel => channel.category === category);
  },
  
  getAllChannels: (): IPTVChannel[] => channels,
  
  getChannelById: (id: string): IPTVChannel | undefined => {
    return channels.find(channel => channel.id === id);
  }
};