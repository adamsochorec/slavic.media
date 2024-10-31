<script setup>
import { DotLottieVue } from "@lottiefiles/dotlottie-vue";
</script>
<template>
  <div class="main" style="margin-top: 120px">
    <article
      class="wrapper-narrow flex-center"
      role="article"
      aria-labelledby="error-heading"
    >
      <div class="pathname-container" aria-hidden="true"></div>
      <div class="lottie" role="img" aria-label="Animation: Page Not Found">
        <DotLottieVue
          background="transparent"
          speed="0.7"
          loop
          autoplay
          aria-label="Page not found animation."
          src="https://lottie.host/8b1a0c1b-94ec-42a8-b75c-92e88eeb0558/CaBerXe4yy.lottie"
        />
      </div>
      <h1 id="error-heading" aria-describedby="error-description">
        The page you’re looking<br />for can't be found.
      </h1>
      <div class="card flex justify-center">
        <router-link
          class="cta"
          to="/"
          role="link"
          aria-label="Return to the homepage"
        >
          Return to the homepage<i class="pi pi-arrow-right"></i
        ></router-link>
      </div>
    </article>
  </div>
</template>

<style scoped>
DotLottieVue {
  height: 176px;
  z-index: 0;
}
h1 {
  font-size: var(--font-size-4);
  font-weight: var(--paragraph-weight);
  text-transform: unset;
  text-align: center;
}
@media only screen and (min-width: 310px) {
  DotLottieVue {
    margin-bottom: 64px;
  }
}
@media only screen and (max-width: 560px) {
  .noindex .pathname-container {
    margin-top: 64px;
  }
  .intro-section {
    background-attachment: scroll;
  }
}
@media only screen and (min-height: 700px) {
  footer {
    position: absolute;
    bottom: 0;
  }
}
</style>
