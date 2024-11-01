<script setup>
import { onMounted } from "vue";
import { defineProps } from "vue";

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  poster: {
    type: String,
    default: "",
  },
  muted: {
    type: Boolean,
    default: false,
  },
  autoplay: {
    type: Boolean,
    default: false,
  },
  loop: {
    type: Boolean,
    default: false,
  },
  ariaLabel: {
    type: String,
    default: "",
  },
});

// VIDEO OFFLOAD START
function videoOffload() {
  // Get all video elements with the "video-offload" class
  const videos = document.querySelectorAll(".video-offload");

  // Function to handle the Intersection Observer for a single video
  function handleVideoIntersection(video) {
    // Define the options for the Intersection Observer
    const options = {
      root: null, // Use the viewport as the root
      rootMargin: "0px", // No margin
      threshold: 0.1, // 10% of the target element must be visible to trigger
    };

    // Callback function when the video enters or exits the viewport
    const callback = (entries, observer) => {
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
  <article class="showcase">
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
  </article>
</template>

<style scoped>
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
  transform: translate(-50%, -50%);
  object-fit: cover;
}
.intro-section {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  resize: both;
  scroll-snap-align: start;
  height: calc(var(--dimension-1) - var(--nav-bar-top-position));
  width: 100%;
}
.intro-section h2,
.intro-section h3 {
  text-align: center;
}
.intro-section {
  height: var(--dimension-1);
  background-color: var(--dark-grey-color-full);
}
.intro-section {
  width: 100vw;
}
@media only screen and (max-width: 415px) {
  .intro-section {
    border-radius: 0 !important;
    width: 100vw;
    -webkit-box-shadow: none;
    box-shadow: none;
  }
}
@media only screen and (max-width: 667px) {
  .intro-section {
    height: 300px !important;
  }
}
/* ORIGINAL INTRO VIDEO START
.showcase {
  height: var(--dimension-1);
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  text-align: center;
  padding: 0 20px;
}
.video-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 80%;
  overflow: hidden;
  background-image: url(/img/showreel.png);
  background-position: center;
  background-size: cover;
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
.video-container:after {
  content: "";
  z-index: 1;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0);
  position: absolute;
}
/* INTRO VIDEO END */
</style>
