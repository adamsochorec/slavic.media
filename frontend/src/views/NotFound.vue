<script setup>
import { ref } from "vue";
import Button from "primevue/button";
</script>
<template>
  <div class="not-found">
    <article
      class="wrapper-narrow flex-center"
      role="article"
      aria-labelledby="error-heading"
    >
      <div class="pathname-container" aria-hidden="true"></div>
      <div class="lottie" role="img" aria-label="Animation: Page Not Found">
        <dotlottie-player
          src="https://slavic.media/assets/lottie/error.lottie"
          background="transparent"
          speed="0.7"
          loop
          autoplay
          aria-label="Animation player"
          aria-controls="error-heading"
        ></dotlottie-player>
      </div>
      <h1 id="error-heading" aria-describedby="error-description">
        The page you’re looking<br />for can't be found.
      </h1>
      <div class="card flex justify-center">
        <router-link to="/" role="link" aria-label="Return to the homepage">
          <Button
            class="cta"
            type="button"
            label="Return to the homepage"
            icon="pi pi-home"
        /></router-link>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  name: "NotFound",
  mounted() {
    const script = document.createElement("script");
    script.src =
      "https://unpkg.com/@dotlottie/player-component@1.0.0/dist/dotlottie-player.js";
    script.defer = true;
    document.head.appendChild(script);
  },
};
</script>

<style scoped>
h1 {
  font-size: var(--font-size-4);
  font-weight: var(--paragraph-weight);
  text-transform: unset;
  text-align: center;
}
.lottie {
  height: 176px;
  z-index: 0;
}
@media only screen and (min-width: 310px) {
  .lottie {
    margin-bottom: 64px;
  }
}
</style>
