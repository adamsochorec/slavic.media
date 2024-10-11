<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper-bundle.css";
import "swiper/element/css/pagination";
import "swiper/element/css/virtual";
import "swiper/element/css/autoplay";
import { register } from "swiper/element/bundle";
import { RouterLink } from "vue-router";
import useImgCrud from "@/modules/imgCrud";

register();

const services = [
  {
    id: 1,
    title: "Video",
    path: "services/video",
    description:
      "From inspiring stories to cinematic visuals, each video project is crafted to captivate, impress, and showcase your vision with creative precision.",
    img: "https://slavic.media/img/cover-video.jpg",
    icon: "pi pi-camera",
  },
  {
    id: 2,
    title: "Photo",
    path: "services/photo",
    description:
      "Whether it’s a dynamic performance, a powerful portrait, or the vast outdoors, our photography captures authentic moments, rich in colour and emotion, that tell your story.",
    img: "https://slavic.media/img/cover-photo.jpg",
    icon: "pi pi-video",
  },
  {
    id: 3,
    title: "Services",
    path: "services/services",
    description:
      "Whether it’s a dynamic performance, a powerful portrait, or the vast outdoors, our photography captures authentic moments, rich in colour and emotion, that tell your story.",
    img: "https://slavic.media/img/cover-drone.jpg",
  },
];

const spaceBetween = 10;
const onProgress = (e) => {
  const [swiper, progress] = e.detail;
  console.log(progress);
};

const onSlideChange = (e) => {
  console.log("slide changed");
};
</script>

<template>
  <swiper-container
    :space-between="spaceBetween"
    :preload-images="false"
    :lazy-loading="true"
    :pagination="{
      hideOnClick: true,
      dynamicBullets: true,
    }"
    :observer="true"
    :observe-parents="true"
    :breakpoints="{
      0: {
        slidesPerView: 3,
      },
      375: {
        slidesPerView: 3,
      },
      620: {
        slidesPerView: 3,
      },
      947: {
        slidesPerView: 3,
      },
    }"
    @swiperprogress="onProgress"
    @swiperslidechange="onSlideChange"
  >
    <swiper-slide v-for="service in services" :key="service.id">
      <router-link :to="service.path">
        <Card style="width: 100%; overflow: hidden">
          <template #header>
            <img
              style="object-fit: cover; height: 200px; width: 100%"
              :src="service.img"
              :title="service.title"
              :alt="service.title"
            />
          </template>
          <template #title>{{ service.title }}</template>
        </Card>
      </router-link>
    </swiper-slide>
  </swiper-container>
</template>

<style></style>
