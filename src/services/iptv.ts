export interface Channel {
  id: string;
  name: string;
  url: string;
  type: 'mpd' | 'hls';
  drm?: {
    keyId: string;
    key: string;
  };
}

export const channels: Channel[] = [
  {
    id: "tv5_hd",
    name: "TV5 HD",
    url: "https://qp-pldt-live-grp-02-prod.akamaized.net/out/u/tv5_hd.mpd",
    type: "mpd",
    drm: {
      keyId: "2615129ef2c846a9bbd43a641c7303ef",
      key: "07c7f996b1734ea288641a68e1cfdc4d"
    }
  },
  {
    id: "cinemaone",
    name: "Cinema One",
    url: "https://cinemaone-abscbn-ono.amagi.tv/index_3.m3u8",
    type: "hls"
  },
  // ... Add more channels as needed
];

export const getChannel = (id: string) => {
  return channels.find(channel => channel.id === id);
};