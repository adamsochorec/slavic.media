<script setup lang="ts">
import { showRequestAProposal } from "@/composables/useRequestProposal";
import { useSeoMeta } from "nuxt/app";

// Meta SEO
const description =
  "Creative & Production studio based in Denmark (Kolding, Copenhagen) and Czechia (Prague). We tell stories through deep eye contact, magnificent shots, and clean design — helping your project stand out from the noise.";
const title = "Home";

// SEO META
useSeoMeta({
  title: title,
  description: description,
  ogTitle: title,
  ogDescription: description,
  ogImage: "https://cdn.slavic.media/img/thumbnail/thumbnail",
  ogUrl: "https://slavic.media",
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: "https://cdn.slavic.media/img/thumbnail/thumbnail",
  twitterCard: "summary",
});
</script>
<template>
  <main class="homepage">
    <!-- INTRO VIDEO START -->
    <HeroVideo :id="1039054657" alt="Showreel 24' | Slavic Media" :start="7" />
    <!-- INTRO VIDEO END -->
    <section class="wrapper-wide" id="company-intro">
      <hr class="semi" role="separator" />

      <!-- SERVICES START -->
      <div
        class="grid-container caption-container reveal"
        role="region"
        aria-labelledby="services-heading"
      >
        <div class="grid-item">
          <h1 id="services-heading">
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
          <Btn
            tag="button"
            label="Request a proposal"
            icon="arrow-right"
            variant="primary"
            @click="showRequestAProposal('company-intro')"
          />
        </div>
      </div>
      <br />
      <!-- GALLERY START -->
      <div class="gallery">
        <LinkCard
          url="/video"
          title="Video"
          icon="video"
          description="From inspiring stories to cinematic visuals, each video project is
            crafted to captivate, impress, and showcase your vision with
            creative precision."
        />

        <LinkCard
          url="/photo"
          title="Photo"
          icon="camera"
          description="Whether it’s a dynamic performance, a powerful portrait, or the vast outdoors, our photography captures authentic moments, rich in colour."
        />
      </div>
      <!-- GALLERY END -->
      <hr class="reveal" role="separator" />
      <Clients />
      <hr class="semi" role="separator" />
      <!-- REVIEWS START -->
      <section aria-labelledby="reviews-heading">
        <div class="grid-container caption-container" id="reviews-caption">
          <div class="grid-item">
            <h2 id="reviews-heading">
              <span class="gradient">Actions</span> speak louder
              <span class="gradient">than</span> any
              <span class="gradient"> words</span>
            </h2>
          </div>
          <div class="grid-item reveal">
            <p>
              Do you need to fly a drone over the open sea, capture the northern
              lights in cold weather, bike across the whole country, walk
              through the desert, or get up close in a way that nobody else has?
              We are here for you.
            </p>
          </div>
        </div>
        <section id="reviews" role="region">
          <hr class="semi" />
          <Reviews />
          <div class="flex-center reveal">
            <Btn
              tag="a"
              icon="share-alt"
              label="Share Your Experience"
              variant="secondary"
              href="https://g.page/r/CRTkzopg3plWEB0/review"
              target="_blank"
              rel="noopener noreferrer nofollow"
              aria-label="Share your experience"
            />
          </div>
        </section>
      </section>
    </section>
    <!-- REVIEWS END -->
    <article class="wrapper-wide">
      <hr class="semi" />
      <h3 class="docs latest reveal">
        Latest Reading in Our
        <NuxtLink to="/blog" class="gradient">Blog</NuxtLink>
      </h3>
      <latestArticle></latestArticle>
      <div class="flex-center">
        <Btn
          tag="NuxtLink"
          icon="plus-circle"
          label="Read more"
          variant="secondary"
          :to="'/blog'"
          class="reveal"
        />
      </div>
    </article>
    <LightroomPresets />
  </main>
</template>

<style lang="postcss" scoped>
h1,
h2 {
  font-size: var(--font-size-3);

  @media only screen and (max-width: 415px) {
    font-size: var(--font-size-2);
  }
}
h3 {
  text-transform: capitalize;
}
.latest a,
.latest a:hover {
  -webkit-box-shadow: none;
  box-shadow: none;
}
.gallery {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: var(--grid-gap-3);
  @media only screen and (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media only screen and (max-width: 415px) {
  #reviews-caption p {
    margin-bottom: 0;
  }
}
</style>
