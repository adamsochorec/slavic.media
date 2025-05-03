<script setup lang="ts">
import { DotLottieVue } from "@lottiefiles/dotlottie-vue";

const layout = "default";
defineProps({
  error: Object as () => NuxtError,
});
</script>

<template>
  <div>
    <aside><Cookies></Cookies></aside>
    <NuxtLayout :name="layout">
      <article style="margin: 120px 0">
        <section
          class="wrapper-wide flex-center"
          role="article"
          aria-labelledby="error-heading"
        >
          <DotLottieVue
            id="lottie"
            background="transparent"
            loop
            autoplay
            aria-label="Page not found animation."
            src="https://lottie.host/a6502c3c-0553-41df-96d5-ebccd619e634/Zd9lglu2le.lottie"
          />
          <h1
            class="logo-font"
            style="
              font-family: var(--content-font);
              font-optical-sizing: auto;
              font-weight: 100;
              font-style: normal;
            "
            id="error-heading"
            aria-describedby="error-description"
          >
            {{ error?.statusMessage }}
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
      </article></NuxtLayout
    >
  </div>
</template>

<style scoped>
#lottie {
  height: 700px;
  width: 100%;
  margin: -200px 0;
}
h1 {
  font-size: var(--font-size-4);
  font-weight: var(--paragraph-weight);
  text-transform: unset;
  text-align: center;
}
@media only screen and (max-width: 500px) {
  #lottie {
    height: 250px;
    width: 100%;
    margin: -70px 0;
  }
}
</style>
