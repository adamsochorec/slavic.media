import Swiper from "swiper";

export function useArrowNavigation(swiper: Swiper): () => void {
  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      swiper.slidePrev();
    } else if (event.key === "ArrowRight") {
      swiper.slideNext();
    }
  };

  document.addEventListener("keydown", handleKeydown);

  return () => {
    document.removeEventListener("keydown", handleKeydown);
  };
}
