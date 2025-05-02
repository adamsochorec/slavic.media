import Swiper from "swiper/bundle";

export function useSwiperAutoplay(swiper: Swiper, selector: string) {
  const swiperElement = document.querySelector(selector);
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          swiper.autoplay.start();
        } else {
          swiper.autoplay.stop();
        }
      });
    },
    { threshold: 0.1 }
  );

  if (swiperElement) {
    observer.observe(swiperElement);
  }

  return () => {
    if (swiperElement) {
      observer.unobserve(swiperElement);
    }
  };
}
