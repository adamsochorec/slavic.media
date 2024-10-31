<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper-bundle.css";
import heroVideo from "@/components/hero-video.vue";
import swiperOurteam from "@/components/swiper-ourteam.vue";

/* // CAROUSEL
const employees = [
  {
    id: 1,
    name: "Marcel H.",
    department: "Director of Photography",
    image: "https://slavic.media/img/marcel.jpg",
    icons: [
      { class: "pi pi-envelope", url: "mailto:marcel@slavic.media" },
      { class: "pi pi-linkedin", url: "https://linkedin.com/in/marcelhajik" },
    ],
    flagId: "flag-slovakia",
    flagTitle: "Flag of Slovakia",
  },
  {
    id: 2,
    name: "Adam S.",
    department: "Sales & Communication",
    image: "https://slavic.media/img/adam.jpg",
    icons: [
      { class: "pi pi-envelope", url: "mailto:adam@slavic.media" },
      { class: "pi pi-linkedin", url: "https://linkedin.com/in/adamsochorec" },
    ],
    flagId: "flag-slovakia",
    flagTitle: "Flag of Slovakia",
  },
  {
    id: 4,
    name: "Dominik T.",
    department: "Graphic Designer",
    image: "https://slavic.media/img/dominik.jpg",
    icons: [
      { class: "pi pi-envelope", url: "mailto:dominik@slavic.media" },
      {
        class: "pi pi-linkedin",
        url: "https://www.linkedin.com/in/dominik-tószegi-07872a248/",
      },
    ],
    flagId: "flag-slovakia",
    flagTitle: "Flag of Slovakia",
  },
  {
    id: 5,
    name: "Ferdinand P.",
    department: "Sound Engineer",
    image: "https://slavic.media/img/ferdinand.jpg",
    icons: [{ class: "pi pi-envelope", url: "mailto:ferda.petrs@gmail.com" }],
    flagId: "flag-slovakia",
    flagTitle: "Flag of Slovakia",
  },
]; */
</script>

<template>
  <div class="main">
    <heroVideo
      src="https://slavic.media/img/bts.mp4"
      poster="https://slavic.media/img/bts.png"
      loop
      autoplay
      muted
      ariaLabel="Behind the scenes"
    />

    <article class="wrapper-standard">
      <hr class="semi" />
      <h1 style="font-size: var(--font-size-1)">Our Team</h1>
      <p>
        Creative & Production studio based in Denmark and Czechia. We tell
        stories with deep eye contact, magnificent shots and clean designs to
        help your project stand out from the noise.
      </p>
      <hr class="semi" />

      <swiperOurteam></swiperOurteam>
      <hr class="semi" />
    </article>
  </div>
</template>

<style lang="scss" scoped></style>
