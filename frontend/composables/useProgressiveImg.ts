import { ref, onMounted } from "vue";

export function useProgressiveImg(
  id: string,
  fullSuffix: string = "/HD",
  thumbnailSuffix: string = "/thumbnail"
) {
  const imgLoaded = ref(false);
  const thumbnailUrl = `https://cdn.slavic.media/img/${id}${thumbnailSuffix}`;
  const fullImageUrl = `https://cdn.slavic.media/img/${id}${fullSuffix}`;

  const updateImgSrc = (event: Event) => {
    const target = event.target as HTMLImageElement;
    if (!imgLoaded.value) {
      target.src = fullImageUrl;
      imgLoaded.value = true;
    }
  };

  // Handle cached images (if already loaded)
  const checkIfAlreadyLoaded = (imgRef: HTMLImageElement | null) => {
    if (imgRef && imgRef.complete && !imgLoaded.value) {
      imgRef.src = fullImageUrl;
      imgLoaded.value = true;
    }
  };

  return {
    thumbnailUrl,
    fullImageUrl,
    imgLoaded,
    updateImgSrc,
    checkIfAlreadyLoaded,
  };
}
