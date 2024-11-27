<script setup>
import { ref, onMounted } from "vue";
import heroVideo from "@/components/hero-video.vue";
import requestAProposal from "@/components/request-a-proposal.vue";
import swiperClients from "@/components/swiper-clients.vue";
import swiperReviews from "@/components/swiper-reviews.vue";

// GALLERY START
const galleryItems = ref([
  {
    to: "/services/video",
    img: "https://slavic.media/img/cover-video.jpg",
    iconClass: "pi pi-video bubble",
    title: "Video",
    description:
      "From inspiring stories to cinematic visuals, each video project is crafted to captivate, impress, and showcase your vision with creative precision.",
  },
  {
    to: "/services/photo",
    img: "https://slavic.media/img/cover-photo.jpg",
    iconClass: "pi pi-camera bubble",
    title: "Photo",
    description:
      "Whether it’s a dynamic performance, a powerful portrait, or the vast outdoors, our photography captures authentic moments, rich in colour and emotion, that tell your story.",
  },
]); // GALLERY END

// Function to reveal elements as the user scrolls
function reveal() {
  const reveals = document.querySelectorAll(".reveal"),
    windowHeight = window.innerHeight;

  reveals.forEach((reveal) => {
    const revealtop = reveal.getBoundingClientRect().top,
      revealpoint = 0;
    if (revealtop < windowHeight - revealpoint) {
      reveal.classList.add("active");
    } else {
      // Optional: Remove "active" class if the element is out of view
      reveal.classList.remove("active");
    }
  });
}
onMounted(() => {
  window.addEventListener("scroll", reveal);
  reveal();
});
</script>

<template>
  <article class="main homepage">
    <!-- INTRO VIDEO START -->
    <heroVideo
      src="https://slavic.media/img/showreel.mp4"
      poster="https://slavic.media/img/showreel.png"
      loop
      autoplay
      muted
      vimeo="https://vimeo.com/987964137/870f308e79"
      ariaLabel="Showreel"
    />
    <!-- INTRO VIDEO END -->

    <section class="wrapper-wide" id="company-intro">
      <hr class="semi" role="separator" />

      <!-- SERVICES START -->
      <div
        class="grid-container caption-container reveal"
        role="region"
        aria-label="Services"
      >
        <div class="grid-item">
          <h1>
            Strategy, <span class="gradient">experience</span>, precision and
            hard work<br />at your
            <span class="gradient">service</span>
          </h1>
        </div>
        <div class="grid-item">
          <p>
            We are creative storytellers who believe in good set designs, deep
            eye contact, and the right light that can raise your message above
            the noise.
          </p>
        </div>
      </div>
      <hr role="separator" />
      <swiperClients></swiperClients>
      <hr style="margin-top: 30px" role="separator" />

      <!-- GALLERY START -->
      <section class="gallery" aria-label="Services">
        <router-link
          v-for="(item, index) in galleryItems"
          :key="index"
          :to="item.to"
          class="gallery-item reveal"
        >
          <img :src="item.img" :title="item.title" :alt="item.title" />
          <div class="gallery-item-caption">
            <i :class="item.iconClass"></i>
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
          </div>
        </router-link>
      </section>
      <!-- GALLERY END -->

      <section class="flex-center">
        <requestAProposal></requestAProposal>
      </section>
      <hr class="reveal" role="separator" />

      <div class="grid-container caption-container" id="reviews-caption">
        <div class="grid-item">
          <h2 class="reveal">
            <span class="gradient">Actions</span> speak louder
            <span class="gradient">than</span> any
            <span class="gradient"> words</span>
          </h2>
        </div>
        <div class="grid-item reveal">
          <p>
            Do you need to fly a drone over the open sea, capture the northern
            lights in cold weather, bike across the whole country, walk through
            the desert, or get up close in a way that nobody else has? We are
            here for you.
          </p>
        </div>
      </div>
    </section>
    <!-- REVIEWS START -->
    <section
      class="wrapper-wide"
      id="reviews"
      role="region"
      aria-label="Reviews"
    >
      <hr class="semi" />
      <swiperReviews></swiperReviews>
      <div class="flex-center reveal">
        <a
          class="cta"
          target="_blank"
          rel="noopener noreferrer nofollow"
          href="https://g.page/r/CRTkzopg3plWEB0/review"
          aria-label="Share your experience"
        >
          Share Your Experience<i class="pi pi-arrow-right"></i>
        </a>
      </div>
    </section>
    <!-- REVIEWS END -->
    <bannerLightroomPresets></bannerLightroomPresets>
  </article>
</template>

<style scoped>
h1 {
  font-size: var(--font-size-3);
}
header {
  background-color: red;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
}
@media only screen and (max-width: 415px) {
  h1 {
    font-size: var(--font-size-2);
  }
  #reviews-caption p {
    margin-bottom: 0;
  }
}
</style>
