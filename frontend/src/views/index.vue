<script setup lang="ts">
import { ref, onMounted } from "vue";
import services from "@/modules/services";
import eventBus from "@/functions/event-bus";

const { state, getAllServices } = services();
const isDataLoaded = ref<boolean>(false);
// REQUEST A PROPOSAL ID
const showRequestAProposal = (identifier: string) => {
  eventBus.emit("showRequestAProposal", identifier);
};

onMounted(async () => {
  await getAllServices();
  isDataLoaded.value = true;
});
</script>

<template>
  <article class="main homepage">
    <!-- INTRO VIDEO START -->
    <heroVideo
      :id="1039054657"
      ariaLabel="Showreel 24' | Slavic Media"
      :start="7"
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
          <requestAProposal />
          <button @click="showRequestAProposal('company-intro')">
            <div class="cta">Request a Proposal</div>
          </button>
        </div>
      </div>
      <br />
      <!-- GALLERY START -->
      <swiperServices></swiperServices>
      <!-- GALLERY END -->

      <hr class="reveal" role="separator" />
      <swiperClients></swiperClients>

      <section class="flex-center">
        <requestAProposal></requestAProposal>
      </section>
      <hr class="semi reveal" role="separator" />

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
          Share Your Experience
        </a>
      </div>
    </section>
    <!-- REVIEWS END -->
    <article class="wrapper-wide">
      <hr class="reveal" />
      <h3 class="latest reveal">
        Latest Reading in Our
        <router-link to="/blog" class="gradient">Blog</router-link>
      </h3>

      <br />

      <latestArticle></latestArticle>
      <div v-if="isDataLoaded" class="flex-center">
        <router-link to="/blog" class="cta reveal">Read more</router-link>
      </div>
    </article>
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
.latest a,
.latest a:hover {
  -webkit-box-shadow: none;
  box-shadow: none;
}

@media only screen and (max-width: 415px) {
  h1,
  h2 {
    font-size: var(--font-size-2);
  }
  #reviews-caption p {
    margin-bottom: 0;
  }
}
</style>
