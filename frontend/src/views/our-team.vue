<script setup>
import { onMounted } from "vue";
import Player from "@vimeo/player";
import Flags from "@/components/Flags.vue"; // Corrected import path
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper-bundle.css";

onMounted(() => {
  // Load the Vimeo script dynamically
  const script = document.createElement("script");
  script.src = "https://player.vimeo.com/api/player.js";
  script.onload = initializeVimeoPlayer;
  document.head.appendChild(script);
});

function initializeVimeoPlayer() {
  const iframe = document.querySelector("iframe");
  const player = new Player(iframe);

  player.on("play", function () {
    console.log("Played the video!");
  });
}

// CAROUSEL
const products = [
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
  <article class="wrapper-standard">
    <h1 style="font-size: var(--font-size-1)" class="mt-5 mb-5">Our Team</h1>
    <iframe
      style="width: 100%; aspect-ratio: 16/9"
      src="https://player.vimeo.com/video/987964137?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
      frameborder="0"
      allowfullscreen
      allow="autoplay; encrypted-media"
    ></iframe>
    <Swiper
      class="mt-10 p-0"
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
      loop
      autoplay
    >
      <SwiperSlide v-for="product in products" :key="product.id">
        <div class="rounded m-3 p-0">
          <div class="mb-4">
            <div class="relative mx-auto">
              <img
                style="box-shadow: var(--box-shadow-1)"
                :src="product.image"
                :alt="product.name"
                class="w-full rounded"
              />
            </div>
          </div>
          <div style="text-align: center">
            <section>
              <h3 style="font-size: var(--font-size-5)">
                {{ product.name }}
              </h3>
              <h4 style="font-size: var(--font-size-6)">
                {{ product.department }}
              </h4>
            </section>
            <span>
              <a
                v-for="icon in product.icons"
                :key="icon.class"
                :href="icon.url"
                :class="icon.class"
                class="mr-2"
              ></a>
              <Flags :flagId="product.flagId" :title="product.flagTitle" />
            </span>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </article>
</template>

<style lang="scss" scoped></style>
