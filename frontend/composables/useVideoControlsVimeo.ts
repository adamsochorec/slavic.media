import { ref, reactive, onMounted } from "vue";

export function useVideoControlsVimeo() {
  const iframeRef = ref<HTMLIFrameElement | null>(null);
  const state = reactive({
    isPlaying: false,
    isMuted: true,
  });

  const muteVideo = () => {
    sendMessageToVimeo("setVolume", 0);
    state.isMuted = true;
  };
  const unmuteVideo = () => {
    sendMessageToVimeo("setVolume", 1);
    state.isMuted = false;
  };
  const playVideo = () => {
    sendMessageToVimeo("play", 0);
    state.isPlaying = true;
  };
  const pauseVideo = () => {
    sendMessageToVimeo("pause", 0);
    state.isPlaying = false;
  };
  const sendMessageToVimeo = (method: string, value: number) => {
    if (iframeRef.value) {
      iframeRef.value.contentWindow?.postMessage(
        JSON.stringify({ method, value }),
        "*"
      );
    }
  };

  onMounted(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (iframeRef.value) {
            if (entry.isIntersecting) {
              playVideo();
            } else {
              pauseVideo();
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

  return {
    iframeRef,
    state,
    muteVideo,
    unmuteVideo,
    playVideo,
    pauseVideo,
  };
}
