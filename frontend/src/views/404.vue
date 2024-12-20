<script setup lang="ts">
import { DotLottieVue } from "@lottiefiles/dotlottie-vue";
</script>

<template>
  <article class="main" style="margin-top: 120px">
    <section
      class="wrapper-narrow flex-center"
      role="article"
      aria-labelledby="error-heading"
    >
      <DotLottieVue
        class="reveal"
        background="transparent"
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
        Return to the homepage</router-link
      >
    </section>
  </article>
</template>

<style scoped>
h1 {
  font-size: var(--font-size-4);
  font-weight: var(--paragraph-weight);
  text-transform: unset;
  text-align: center;
}
</style>
