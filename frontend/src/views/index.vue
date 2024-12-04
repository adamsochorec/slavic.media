<script setup lang="ts">
import { ref, onMounted } from "vue";
import heroVideo from "@/components/hero-video.vue";
import requestAProposal from "@/components/request-a-proposal.vue";
import swiperClients from "@/components/swiper-clients.vue";
import swiperReviews from "@/components/swiper-reviews.vue";
import galleryItem from "@/components/gallery-item.vue";
import services from "@/modules/services";

const { state, getAllServices } = services();
const isDataLoaded = ref<boolean>(false);

onMounted(async () => {
  await getAllServices();
  isDataLoaded.value = true;
});
</script>

<template>
  <article class="main homepage">
    <!-- INTRO VIDEO START -->
    <heroVideo
      src="https://slavic.media/img/showreel.mp4"
      poster="https://cdn.slavic.media/images/showreel/height=800,sharpen=100"
      loop
      autoplay
      muted
      vimeo="https://vimeo.com/slavicmedia/showreel?share=copy"
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
            hard work at your
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
      <hr class="semi" />
      <!-- GALLERY START -->
      <section class="gallery reveal" aria-label="Services">
        <galleryItem
          v-for="service in state.services"
          :key="service._id"
          :img="service._id"
          :opacity="0.5"
          :url="`/services/${service._id}`"
          :title="service._id"
          :desc="service.desc"
          :icon="service.icon"
        />
      </section>
      <!-- GALLERY END -->

      <hr class="quater reveal" role="separator" />
      <swiperClients></swiperClients>

      <section class="flex-center">
        <requestAProposal></requestAProposal>
      </section>
      <hr class="quater reveal" role="separator" />

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
h1,
h2 {
  font-size: var(--font-size-3);
}
h3 {
  text-transform: capitalize;
}
.gallery {
  grid-template-columns: repeat(4, 1fr);
}
@media only screen and (max-width: 415px) {
  h1,
  h2 {
    font-size: var(--font-size-2);
  }
  #reviews-caption p {
    margin-bottom: 0;
  }
  .gallery {
    grid-template-columns: repeat(1, 1fr);
  }
}
@media only screen and (min-width: 375px) {
  hr.quater {
    margin: 60px 0 !important;
  }
}
@media only screen and (max-width: 667px) {
  .gallery {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media only screen and (max-width: 375px) {
  .gallery-item {
    height: 120px;
  }
}
</style>
