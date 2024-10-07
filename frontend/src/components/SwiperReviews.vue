<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper-bundle.css";
import "swiper/element/css/pagination";
import "swiper/element/css/virtual";
import "swiper/element/css/autoplay";
import { register } from "swiper/element/bundle";
import { RouterLink } from "vue-router";

register();

const reviews = [
  {
    id: 1,
    title: "FranklinCovey, Leadership company",
    subtitle: "Leadership company",
    message:
      "Za FranklinCovey Česká republika mohu potvrdit, že vždy můžeme spolehnout na rychlé dodání, flexibilita, pozornost k detailům, kreativní nápady a doporučení k tomu, jak dosáhnout nejlepšího výsledku. Slavic Media drží krok s dobou a co je nejlepší - práce je baví a na výsledcích je to znát. Adame a Marceli, děkujeme!",
    img: "https://lh3.googleusercontent.com/a-/ALV-UjWKliCjpb5tKTxfmg-jhSqjGanrg583NhOCJO2SXl-PuVxnCKI=w120-h120-p-rp-mo-br100",
    path: "https://www.google.com/maps/contrib/102868388374755508982?hl=en-US",
    rating: 5,
  },
  {
    id: 2,
    title: "Armando P., Musician",
    subtitle: "Musician",
    message:
      "Amazing services from talented young professionals. Smart solutions, serious and creative attitude. Excellent.",
    img: "https://lh3.googleusercontent.com/a-/ALV-UjVp41MBuTxuz4HQIt172lk5B4Tsj2hUAFLIRZKBl0gZd_Ax=w120-h120-p-rp-mo-br100",
    path: "https://www.google.com/maps/contrib/106744506446456654416?hl=en-US",
    rating: 5,
  },
  {
    id: 3,
    title: "Daniel D., Musician",
    subtitle: "Musician",
    message:
      "Adam photographed SLOEVSINDs first show a Pitstop Kolding. Great and lively pictures capturing the high energy and mood from the show - awesome work!",
    img: "https://lh3.googleusercontent.com/a/ACg8ocJpEE9rIHxCOIQH2O6oQH2G7MSYNf71eC5poj-WNPe8=w120-h120-p-rp-mo-br100",
    path: "https://www.google.com/maps/contrib/110738271589854335121?hl=en-US",
    rating: 5,
  },
  {
    id: 4,
    title: "Nikos S., UX Researcher",
    subtitle: "UX Researcher",
    message:
      "These guys are very talented, professional and always deliver in time. I am very happy with our collaboration as they can easily adapt to concepts and masterfully capture moments through their media art.",
    img: "https://lh3.googleusercontent.com/a-/ALV-UjWr3R2B2S2VxsEfKZXltWT611uRPhp1ViWHxYRuxj9G9q4=w120-h120-p-rp-mo-br100",
    path: "https://www.google.com/maps/contrib/109240411528056870351?hl=en-US",
    rating: 5,
  },
  {
    id: 5,
    title: "Bygning 5, Collaborator",
    subtitle: "Collaborator",
    message: "Collaboration with pros :)",
    img: "https://lh3.googleusercontent.com/a-/ALV-UjX0xNwelhtHQ_46afqwRvy8K1_gBCCVFzmw9C-GNY9nTQ=w120-h120-p-rp-mo-br100",
    path: "https://www.google.com/maps/contrib/116209661109434700092?hl=en-US",
    rating: 5,
  },
  {
    id: 6,
    title: "Annesofie B., Project Assistant",
    subtitle: "Project Assistant",
    message:
      "Have had them take photos for a few events and they are just a great team. good guys, easy to work with, great eye for photography. 10/10 would recommend 🙌",
    img: "https://lh3.googleusercontent.com/a-/ALV-UjUdOj4ktRKka0VAUcovtfK8anD-Utkduwcj5YrTJ7bnjGs=w120-h120-p-rp-mo-br100",
    path: "https://www.google.com/maps/contrib/100383834414028866094?hl=en-US",
    rating: 5,
  },
  {
    id: 7,
    title: "Erika H., Client",
    subtitle: "Client",
    message: "They were amazing to work with. Definitely not the last collab.",
    img: "https://lh3.googleusercontent.com/a/ACg8ocLtiYezKjjGk3MmzuuwgUbI9BNNjkq5y8xXZVNlGvKb=w120-h120-p-rp-mo-br100",
    path: "https://www.google.com/maps/contrib/108504332332452488678?hl=en-US",
    rating: 5,
  },
  {
    id: 8,
    title: "Yaan D., Client",
    subtitle: "Client",
    message:
      "Adam photographed my wedding. I was looking for someone who could pull of a combination of digital and analogue photography on the go and this guy just straight nailed it.",
    img: "https://lh3.googleusercontent.com/a/ACg8ocK_dqNUXsyTgNgQCIZRtpaaYHgydI3xXSg6CaJCS7Er=w120-h120-p-rp-mo-br100",
    path: "https://www.google.com/maps/contrib/118217763143382642144?hl=en-US",
    rating: 5,
  },
  {
    id: 9,
    title: "Isbjörg, Band",
    subtitle: "Band",
    message: "Great photos! 🙏🔥",
    img: "https://lh3.googleusercontent.com/a-/ALV-UjXZ14eIvhbSg9Qmpyeu_NaaYcqbgv-I6A1vJ46rin9gn8I=w120-h120-p-rp-mo-br100",
    path: "https://www.google.com/maps/contrib/116120348225372955039?hl=en-US",
    rating: 5,
  },
  {
    id: 10,
    title: "Nicole J., Client",
    subtitle: "Client",
    message:
      "To fantastiske fyre! Slavic Media forstår at levere til tiden og i en upåklagelig kvalitet - hver gang. De mestrer at indfange de øjeblikke, der er med til at formidle den historie man vil fortælle. De største anbefalinger herfra.",
    img: "https://lh3.googleusercontent.com/a-/ALV-UjWHqZSf5lbWhEHNQtRhjD7R1VPDDXILC0-_fTAdps0N0w=w120-h120-p-rp-mo-br100",
    path: "https://www.google.com/maps/contrib/100363374932860666953?hl=en-US",
    rating: 5,
  },
  {
    id: 11,
    title: "Janka H., Client",
    subtitle: "Client",
    message: "Amazing service! 🤩",
    img: "https://lh3.googleusercontent.com/a-/ALV-UjVWC7FZLpPknVEpxrdB7NFfgLVs18Vs92Sfdpgo9ENmWYk=w120-h120-p-rp-mo-br100",
    path: "https://www.google.com/maps/contrib/101149448207142561689?hl=en-US",
    rating: 5,
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
    :speed="600"
    :autoplay="{ delay: 1000, pauseOnMouseEnter: true }"
    :lazy-loading="true"
    :loop="true"
    :pagination="{
      hideOnClick: true,
      dynamicBullets: true,
    }"
    :observer="true"
    :observe-parents="true"
    :breakpoints="{
      0: {
        slidesPerView: 1,
      },
      375: {
        slidesPerView: 2,
      },
      620: {
        slidesPerView: 3,
      },
      947: {
        slidesPerView: 4,
      },
    }"
    @swiperprogress="onProgress"
    @swiperslidechange="onSlideChange"
  >
    <swiper-slide v-for="review in reviews" :key="review.id">
      <router-link :to="review.path">
        <Card style="width: 100%; overflow: hidden">
          <template #header>
            <Fluid>
              <div class="p-3 grid grid-cols-2 gap-0">
                <Avatar :image="review.img" shape="circle" />
                <div>
                  <a
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    :href="review.path"
                    >{{ review.title }}</a
                  >
                  <Rating
                    height="10"
                    width="10"
                    v-model="review.rating"
                    readonly
                  />
                </div></div
            ></Fluid>
          </template>

          <template #content>
            <p style="font-size: var(--font-size-8)">
              {{ review.message }}
            </p>
          </template>
          <template #footer> </template>
        </Card>
      </router-link>
    </swiper-slide>
    <div class="swiper-pagination"></div>
  </swiper-container>
</template>

<style></style>
