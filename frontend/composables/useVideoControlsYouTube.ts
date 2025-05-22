import { ref, reactive, onMounted, onUnmounted } from "vue";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export function useVideoControls() {
  const iframeRef = ref<HTMLIFrameElement | null>(null);
  const player = ref<any>(null);
  const state = reactive({
    isPlaying: false,
    isMuted: true,
    isReady: false, // Track if player is ready
  });

  let observer: IntersectionObserver | null = null;

  // Load YouTube IFrame API
  const loadYouTubeAPI = () => {
    if (window.YT && window.YT.Player) return Promise.resolve();
    return new Promise<void>((resolve) => {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
      window.onYouTubeIframeAPIReady = () => resolve();
    });
  };

  const createPlayer = () => {
    if (!iframeRef.value) return;
    player.value = new window.YT.Player(iframeRef.value, {
      events: {
        onReady: (event: any) => {
          state.isReady = true;
          event.target.mute();
          state.isMuted = true;
          event.target.playVideo(); // Autoplay when ready
          state.isPlaying = true;
        },
        onStateChange: (event: any) => {
          // 1 = playing, 2 = paused
          state.isPlaying = event.data === 1;
        },
      },
    });
  };

  const muteVideo = () => {
    if (state.isReady) {
      player.value?.mute();
      state.isMuted = true;
    }
  };
  const unmuteVideo = () => {
    if (state.isReady) {
      player.value?.unMute();
      state.isMuted = false;
    }
  };
  const playVideo = () => {
    if (state.isReady) {
      player.value?.playVideo();
      state.isPlaying = true;
    }
  };
  const pauseVideo = () => {
    if (state.isReady) {
      player.value?.pauseVideo();
      state.isPlaying = false;
    }
  };

  onMounted(async () => {
    await loadYouTubeAPI();
    createPlayer();

    // Pause/resume video based on visibility
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (player.value && state.isReady) {
            if (entry.isIntersecting) {
              playVideo();
            } else {
              pauseVideo();
            }
          }
        });
      },
      {
        threshold: 0.01,
      }
    );
    if (iframeRef.value) {
      observer.observe(iframeRef.value);
    }
  });

  onUnmounted(() => {
    if (player.value && player.value.destroy) {
      player.value.destroy();
    }
    if (observer && iframeRef.value) {
      observer.unobserve(iframeRef.value);
      observer.disconnect();
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
