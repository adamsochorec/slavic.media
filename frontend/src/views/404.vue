<script setup>
import { DotLottieVue } from "@lottiefiles/dotlottie-vue";
</script>
<template>
  <div class="main" style="margin: 120px 0">
    <article
      class="wrapper-narrow flex-center"
      role="article"
      aria-labelledby="error-heading"
    >
      <DotLottieVue
        class="reveal"
        background="transparent"
        speed="1"
        loop
        autoplay
        aria-label="Page not found animation."
        style="height: 276px; margin-bottom: -70px"
        src="https://lottie.host/a6502c3c-0553-41df-96d5-ebccd619e634/Zd9lglu2le.lottie"
      />
      <h1
        class="reveal"
        id="error-heading"
        aria-describedby="error-description"
      >
        The page you’re looking<br />for can't be found.
      </h1>
      <router-link
        class="cta"
        to="/"
        role="link"
        aria-label="Return to the homepage"
      >
        Return to the homepage<i class="pi pi-arrow-right"></i
      ></router-link>
    </article>
  </div>
</template>

<style scoped>
h1 {
  font-size: var(--font-size-4);
  font-weight: var(--paragraph-weight);
  text-transform: unset;
  text-align: center;
}
</style>
