import { onMounted, onUnmounted, Ref } from "vue";

interface VideoControls {
  playVideo: () => void;
  pauseVideo: () => void;
  state: {
    isReady?: boolean;
  };
}

export function useVideoVisibility(
  iframeRef: Ref<HTMLIFrameElement | null>,
  controls: VideoControls
) {
  let observer: IntersectionObserver | null = null;

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (controls.state.isReady !== false) {
            // Check if undefined (Vimeo) or true (YouTube)
            if (entry.isIntersecting) {
              controls.playVideo();
            } else {
              controls.pauseVideo();
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (iframeRef.value) {
      observer.observe(iframeRef.value);
    }
  });

  onUnmounted(() => {
    if (observer && iframeRef.value) {
      observer.unobserve(iframeRef.value);
      observer.disconnect();
    }
  });
}
