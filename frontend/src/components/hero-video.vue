<script setup lang="ts">
import { onMounted } from "vue";
import { defineProps } from "vue";

interface Props {
  src: string;
  poster?: string;
  muted?: boolean;
  autoplay?: boolean;
  loop?: boolean;
  ariaLabel?: string;
  vimeo?: string;
}

const props = defineProps<Props>();

// VIDEO OFFLOAD START
function videoOffload() {
  // Get all video elements with the "video-offload" class
  const videos = document.querySelectorAll<HTMLVideoElement>(".video-offload");

  // Function to handle the Intersection Observer for a single video
  function handleVideoIntersection(video: HTMLVideoElement) {
    // Define the options for the Intersection Observer
    const options = {
      root: null, // Use the viewport as the root;
      rootMargin: "0px", // No margin;
      threshold: 0.1, // 10% of the target element must be visible to trigger
    };

    // Callback function when the video enters or exits the viewport
    const callback = (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // The video is in the viewport, so play it and show controls
          video.play();
          video.removeAttribute("controls");
        } else {
          // The video is out of the viewport, so pause it and hide controls
          video.pause();
        }
      });
    };

    // Create an Intersection Observer with the specified options and callback for the current video
    const observer = new IntersectionObserver(callback, options);

    // Start observing the current video element
    observer.observe(video);
  }

  // Iterate over all video elements and apply the Intersection Observer
  videos.forEach((video) => {
    video.setAttribute("autoplay", "false"); // Disable autoplay initially

    // Apply Intersection Observer to the current video
    handleVideoIntersection(video);
  });
}

// Call videoOffload in onMounted hook
onMounted(() => {
  videoOffload();
});
</script>

<template>
  <section class="showcase">
    <div class="video-container">
      <video
        :src="src"
        :loop="loop"
        :autoplay="autoplay"
        :muted="muted"
        class="video-offload"
        preload="auto"
        :aria-label="ariaLabel"
        aria-describedby="video"
        playsinline
        role="video"
        :poster="poster"
      ></video>
    </div>
    <a
      class="link"
      target="_blank"
      rel="noopener noreferrer nofollow"
      :href="vimeo"
      v-tooltip.left="{ value: 'Watch on Vimeo', autoHide: true }"
    >
      <i class="pi pi-vimeo"></i
    ></a>
  </section>
</template>

<style scoped>
.link {
  position: absolute;
  left: var(--grid-gap-1);
  text-shadow: var(--box-shadow-1);
}
.showcase {
  height: var(--dimension-1);
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  text-align: center;
}
.video-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--dimension-1);
  overflow: hidden;
  background-position: center;
  background-size: cover;
  z-index: -1;
}
.video-container video {
  min-width: 100%;
  min-height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  -o-object-fit: cover;
  object-fit: cover;
}

@media only screen and (max-width: 415px) {
  .video-container,
  .showcase {
    height: 100vh;
  }
  .link {
    bottom: 5px;
  }
}
@media only screen and (min-width: 415px) {
  .link {
    position: absolute;
    top: calc(var(--dimension-1) - 2.7 * var(--grid-gap-1));
    left: var(--grid-gap-1);
  }
}
</style>
