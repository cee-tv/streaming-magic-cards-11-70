export const getMobileDetect = (userAgent: string) => {
  const isAndroid = () => Boolean(userAgent.match(/Android/i));
  const isIos = () => Boolean(userAgent.match(/iPhone|iPad|iPod/i));
  const isOpera = () => Boolean(userAgent.match(/Opera Mini/i));
  const isWindows = () => Boolean(userAgent.match(/IEMobile/i));
  const isMobile = () => Boolean(isAndroid() || isIos() || isOpera() || isWindows());

  return {
    isMobile,
    isAndroid,
    isIos,
  };
};

export const getVideoConfig = () => {
  const userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;
  const { isMobile } = getMobileDetect(userAgent);

  return {
    playerVars: {
      rel: 0,
      mute: isMobile() ? 1 : 0,
      loop: 1,
      autoplay: 1,
      controls: 0,
      showinfo: 0,
      disablekb: 1,
      enablejsapi: 1,
      playsinline: 1,
      cc_load_policy: 0,
      modestbranding: 3,
    },
  };
};