<script setup>
import heroVideo from "@/components/hero-video.vue";
import contactForm from "@/components/contact-form.vue";
import swiperClients from "@/components/swiper-clients.vue";
import swiperReviews from "@/components/swiper-reviews.vue";
</script>
<template>
  <div class="main">
    <!-- INTRO VIDEO START -->
    <heroVideo
      src="https://slavic.media/img/showreel.mp4"
      poster="https://slavic.media/img/showreel.png"
      loop
      autoplay
      muted
      ariaLabel="Showreel"
    />
    <!-- INTRO VIDEO END -->

    <article class="wrapper-wide" id="company-intro">
      <br />

      <!-- SERVICES START -->
      <div
        class="grid-container caption-container reveal"
        role="region"
        aria-label="Services"
      >
        <div class="grid-item">
          <h1>
            Strategy, <span class="highlited tuscher">experience</span>,
            precision and hard work<br />at your
            <span class="highlited tuscher">service</span>
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

      <!-- FEATURES START -->
      <article id="visual" class="gallery" aria-label="Services">
        <router-link to="/video" class="gallery-item reveal">
          <img
            src="https://slavic.media/img/cover-video.jpg"
            title="Video services cover."
            alt="Video services cover."
          />
          <div class="gallery-item-caption">
            <i class="pi pi-video bubble"></i>
            <h3>Video</h3>
            <p>
              From inspiring stories to cinematic visuals, each video project is
              crafted to captivate, impress, and showcase your vision with
              creative precision.
            </p>
          </div>
        </router-link>
        <router-link
          to="photo"
          class="gallery-item reveal"
          aria-label="Huset Fundament 2023"
        >
          <img
            src="https://slavic.media//img/cover-photo.jpg"
            alt="Photo services cover."
            title="Photo services cover."
          />
          <div class="gallery-item-caption">
            <i class="pi pi-camera bubble"></i>
            <h3>Photo</h3>
            <p>
              Whether it’s a dynamic performance, a powerful portrait, or the
              vast outdoors, our photography captures authentic moments, rich in
              colour and emotion, that tell your story.
            </p>
          </div>
        </router-link>
      </article>
      <contactForm></contactForm>

      <section class="flex-center">
        <a class="popup-with-form reveal" href="#request-a-proposal">
          <div class="cta">
            Request a Proposal<i class="pi pi-arrow-right"></i>
          </div>
        </a>
      </section>
      <!-- FEATURES END -->
      <hr class="reveal" role="separator" />

      <div class="grid-container caption-container" id="reviews-caption">
        <div class="grid-item">
          <h2 class="reveal">
            <span class="highlited tuscher">Actions</span> speak louder
            <span class="highlited tuscher">than</span> any
            <span class="highlited tuscher"> words</span>
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
    </article>
    <!-- REVIEWS START -->
    <article
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
          Share your experience<i class="pi pi-arrow-right"></i>
        </a>
      </div>
    </article>
    <!-- REVIEWS END -->
    <hr class="semi" id="ourteam" />
  </div>
</template>

<style scoped></style>
