<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper-bundle.css";
import CoverVideo from "@/components/HeroVideo.vue";

// CAROUSEL
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
];
</script>

<template>
  <div>
    <CoverVideo
      src="https://slavic.media/img/showreel-ourteam.mp4"
      poster="https://slavic.media/img/showreel-ourteam.png"
      loop
      autoplay
      muted
      ariaLabel="Behind the scenes"
    />
    <hr class="semi" />

    <article class="wrapper-standard">
      <h1 style="font-size: var(--font-size-1)" class="mb-5">Our Team</h1>
      <p>
        Creative & Production studio based in Denmark and Czechia. We tell
        stories with deep eye contact, magnificent shots and clean designs to
        help your project stand out from the noise.
      </p>
      <Swiper
        class="mt-10 p-0"
        preloadImages="false"
        :direction="'horizontal'"
        :lazyLoading="true"
        :observer="true"
        :observeParents="true"
        :slidesPerView="3"
        :spaceBetween="30"
        :breakpoints="{
          0: {
            slidesPerView: 2.3,
          },
          375: {
            slidesPerView: 3.3,
          },
          620: {
            slidesPerView: 3.5,
          },
        }"
      >
        <SwiperSlide v-for="employee in employees" :key="employee.id">
          <div class="rounded m-3 p-0">
            <div class="mb-4">
              <div class="relative mx-auto">
                <img
                  style="box-shadow: var(--box-shadow-1)"
                  :src="employee.image"
                  :alt="employee.name"
                  class="w-full rounded"
                />
              </div>
            </div>
            <div style="text-align: center">
              <h3 style="font-size: var(--font-size-5)" class="mb-1">
                {{ employee.name }}
              </h3>
              <h4 style="font-size: var(--font-size-8)" class="mb-2">
                {{ employee.department }}
              </h4>
              <span>
                <a
                  v-for="icon in employee.icons"
                  :key="icon.class"
                  :href="icon.url"
                  :class="icon.class"
                  class="mr-2"
                ></a>
              </span>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      <hr class="semi" />
    </article>
  </div>
</template>

<style lang="scss" scoped>

</style>
