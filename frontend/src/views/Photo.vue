<script setup>
import { ref, onMounted } from "vue";
import contactForm from "@/components/contact-form.vue";
import $ from "jquery";
import "magnific-popup";

const isDataLoaded = ref(true);
const img = {
  portrait: {
    desc: "Through bold colors and deep eye contact, each portrait captures the true essence of who you are—moments that feel real and connect on a personal level.",
    handle: "portrait",
    title: "Colorful Portrait",
    column1: [
      {
        src: "https://slavic.media/img/2021-11-13-02059.jpg",
        alt: "Close-up portrait of a man wearing a baseball cap leaning against a wall in Kolding.",
        title: "2021 | Kolding, Denmark | art project",
        flag: "denmark",
      },
      {
        src: "https://slavic.media/img/hvalp.jpg",
        alt: "Band HVALP album cover.",
        title: "2023 | Kolding, Denmark | Hvalp",
        flag: "denmark",
      },
      {
        src: "https://slavic.media/img/2021-08-24-01615.jpg",
        alt: "Close-up of a girl's face with colourful makeup around her eyes, making her look like a butterfly.",
        title: "2021 | Kolding, Denmark | art project",
        flag: "denmark",
      },
    ],
    column2: [
      {
        src: "https://slavic.media/img/2021-09-05-01666.jpg",
        alt: "Close-up of a girl's face leaning on a mirror, creating a reflection, with a pink backdrop, photographed in Kolding.",
        title: "2021 | Kolding, Denmark | art project",
        flag: "denmark",
      },
      {
        src: "https://slavic.media/img/2021-04-25-00693.jpg",
        alt: "Close-up portrait of Tereza Císařová laying on a table with fries, photographed at Divadlo Na Vinohradech.",
        title: "2021 | Prague, Czechia | Divadlo na Vinohradech",
        flag: "czechia",
      },
    ],
    column3: [
      {
        src: "https://slavic.media/img/2021-05-28-01020.jpg",
        alt: "Portrait of Zuzana Částková.",
        title: "2021 | Prague, Czechia | art project",
        flag: "czechia",
      },
      {
        src: "https://slavic.media/img/2023-11-13-00267.jpg",
        alt: "Elf lady holding knife on Kim Kim's throat.",
        title: "2023 | Copenhagen, Denmark | Sort/Hvid",
        flag: "denmark",
      },
    ],
    column4: [
      {
        src: "https://slavic.media/img/2021-04-14-00608.jpg",
        alt: "David Steigerwald unclothed, seated in a cage at Divadlo Na Vinohradech, Prague.",
        title: "2021 | Prague, Czechia | Divadlo na Vinohradech",
        flag: "czechia",
      },
      {
        src: "https://slavic.media/img/2021-06-24-01233-2.jpg",
        alt: "Sára Rychlíková at Divadlo Disk in Prague.",
        title: "2023 | Prague, Czechia | Divadlo Disk",
        flag: "czechia",
      },
    ],
  },
  outdoor: {
    desc: "From the tundra to the desert, we specialize in capturing the raw beauty of nature. With a focus on Nordic tundra, taiga, and winter sports, our outdoor photography brings the wild, untamed landscapes to life.",
    handle: "outdoor",
    title: "Immersive Outdoor",
    column1: [
      {
        src: "https://slavic.media/img/2022-12-03-000465.jpg",
        alt: "Two guys in a survival shelter in tundra.",
        title: "2023 | Björkliden, Sweden | Timetravels Ltd",
        flag: "sweden",
      },
      {
        src: "https://slavic.media/img/2024-03-10-00620.jpg",
        alt: "Kaunispää in Finnish Saariselkä, Northern Lapland.",
        title: "2024 | Saariselkä, Finland | Timetravels Ltd",
        flag: "finland",
      },
      {
        src: "https://slavic.media/img/2023-12-02-00459.jpg",
        alt: "Pair of boys petting husky.",
        title: "2023 | Kiruna, Sweden | Kiruna Sleddog Tours",
        flag: "sweden",
      },
    ],
    column2: [
      {
        src: "https://slavic.media/img/2023-11-30-00006.jpg",
        alt: "Two guys with Norwegian fjord in the background.",
        title: "2023 | Narvik, Norway | Timetravels Ltd",
        flag: "norway",
      },
      {
        src: "https://slavic.media/img/2023-12-01-00250.jpg",
        alt: "Timetravels Herder Experience in Swedish Lapland.",
        title: "2023 | Björkliden, Sweden | Timetravels Ltd",
        flag: "sweden",
      },
    ],
    column3: [
      {
        src: "https://slavic.media/img/2024-03-10-00496.jpg",
        alt: "Ice skating on frozen Inarijärvi in Finnish Lapland.",
        title: "2024 | Inarijärvi, Finland | Timetravels Ltd",
        flag: "finland",
      },
      {
        src: "https://slavic.media/img/2023-12-01-00064.jpg",
        alt: "Ice fishing on frozen lake in Swedish Lapland.",
        title: "2023 | Björkliden, Sweden | Timetravels Ltd",
        flag: "sweden",
      },
    ],
    column4: [
      {
        src: "https://slavic.media/img/2024-03-10-00238.jpg",
        alt: "Timetravels Reindeer Herder experience in Lapland.",
        title: "2024 | Inari, Finland | Timetravels Ltd",
        flag: "finland",
      },
      {
        src: "https://slavic.media/img/2022-10-15-00970.jpg",
        alt: "Photo of a hiker standing on the rock in the forest with a hiking pole out of a tree branch.",
        title: "2022 | Geta, Åland | Expedition Åland",
        flag: "aland",
      },
    ],
  },
  still: {
    desc: "Magnificent moments from concerts, theatre, and live performances—capturing raw emotions and deep eye contact that bring every gesture and glance to life.",
    handle: "still",
    title: "Timeless Still",
    column1: [
      {
        src: "https://slavic.media/img/2023-09-09-10507.jpg",
        alt: "Shirtless Anime Animeaux guitarist starring into a camera.",
        title: "2023 | Kolding, Denmark | Huset Fundament",
        flag: "denmark",
      },
      {
        src: "https://slavic.media/img/2021-06-24-01208.jpg",
        alt: "Performance 'Hrdina Západu' at Divadlo Disk",
        title: "2021 | Prague, Czechia | Divadlo Disk",
        flag: "czechia",
      },
    ],
    column2: [
      {
        src: "https://slavic.media/img/2023-09-01-00086.jpg",
        alt: "Couple listening to stage performance.",
        title: "2023 | Kolding, Denmark | Kolding Kulturnat",
        flag: "denmark",
      },
      {
        src: "https://slavic.media/img/2023-09-09-10524.jpg",
        alt: "Anime Animeaux frontman holding a microphone on a stage.",
        title: "2023 | Kolding, Denmark | Huset Fundament",
        flag: "denmark",
      },
      {
        src: "https://slavic.media/img/2023-09-29-00163.jpg",
        alt: "Stage performance crowd.",
        title: "2023 | Kolding, Denmark | Huset Fundament",
        flag: "denmark",
      },
    ],
    column3: [
      {
        src: "https://slavic.media/img/2023-06-22-00033.jpg",
        alt: "Two ladies mixing liquids in glass cups.",
        title: "2023 | Kolding, Denmark | Huset Fundament",
        flag: "denmark",
      },
      {
        src: "https://slavic.media/img/2022-06-28-00708.jpg",
        alt: "Roskilde Festival.",
        title: "2023 | Roskilde, Denmark | Roskilde Festival",
        flag: "denmark",
      },
      {
        src: "https://slavic.media/img/2023-05-12-08965.jpg",
        alt: "Artist lit by light, looking like a Jesus.",
        title: "2023 | Kolding, Denmark | Huset Fundament",
        flag: "denmark",
      },
    ],
    column4: [
      {
        src: "https://slavic.media/img/2023-05-27-00025.jpg",
        alt: "Lady enjoying live performance in Pitstop.",
        title: "2023 | Kolding, Denmark | Huset Fundament",
        flag: "denmark",
      },
      {
        src: "https://slavic.media/img/2023-09-22-00026.jpg",
        alt: "Singing performer in Pitstop.",
        title: "2023 | Kolding, Denmark | Huset Fundament",
        flag: "denmark",
      },
      {
        src: "https://slavic.media/img/2023-05-12-08969.jpg",
        alt: "Band playing behind foggy glass.",
        title: "2023 | Kolding, Denmark | Huset Fundament",
        flag: "denmark",
      },
    ],
  },
};
onMounted(() => {
  // Initializes Magnific Popup for image-based galleries
  $(".popup-gallery").magnificPopup({
    delegate: "a", // Targets <a> elements directly
    type: "image",
    tLoading: "Loading", // Loading spinner HTML
    mainClass: "mfp-img-mobile",
    gallery: {
      enabled: true,
      fixedContentPos: "false",
      overflowY: "scroll",
      navigateByImgClick: true,
      preload: [0, 1], // Preloads adjacent images
    },
    zoom: {
      enabled: true,
      duration: 300, // Duration of the zoom animation
    },
    image: {
      tError: "Error", // Error message HTML
      titleSrc: function (item) {
        // Gets the URL of the image for the popup
        return item.el.attr("title");
      },
    },
    callbacks: {
      elementParse: function (item) {
        // Function to handle each image source
        item.src = item.el.attr("href");
      },
    },
    fixedContentPos: "false",
    overflowY: "scroll",
  });
});
</script>

<template>
  <div class="main" style="margin-top: 120px">
    <article v-if="isDataLoaded" class="wrapper-wide">
      <contactForm />

      <!-- PAGE INTRO -->
      <div class="grid-container caption-container">
        <div class="grid-item">
          <h1 class="reveal" aria-label="Video Services">
            <span class="highlited">Video</span> Services
          </h1>
        </div>
        <div class="grid-item">
          <p class="reveal">
            From inspiring stories to cinematic visuals, each video project is
            crafted to captivate, impress, and showcase your vision with
            creative precision.
          </p>
          <a class="popup-with-form reveal" href="#request-a-proposal">
            <div class="cta">
              Request a Proposal <i class="pi pi-arrow-right"></i>
            </div>
          </a>
        </div>
      </div>
    </article>

    <!-- GALLERIES -->
    <template v-for="(gallery, galleryKey) in img" :key="galleryKey">
      <article v-if="isDataLoaded" class="wrapper-wide" id="photo">
        <hr class="reveal" role="separator" />
        <div class="grid-container caption-container">
          <div class="grid-item reveal">
            <h2>{{ gallery.title }}</h2>
          </div>
          <div class="grid-item">
            <p class="reveal">{{ gallery.desc }}</p>
          </div>
        </div>
        <hr class="semi" role="separator" />
      </article>

      <article v-if="isDataLoaded" class="popup-gallery">
        <div class="row">
          <div
            v-for="(column, index) in Object.keys(gallery).filter((key) =>
              key.startsWith('column')
            )"
            :key="index"
            class="column"
          >
            <div
              v-for="image in gallery[column]"
              :key="image.src"
              class="reveal"
            >
              <a :href="image.src" :title="image.title">
                <img :src="image.src" :alt="image.alt" />
                <svg class="flag note" :title="'Flag of ' + image.flag">
                  <use :href="'#flag-' + image.flag"></use>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </article>
    </template>
  </div>
</template>

<style lang="scss" scoped>
small a {
  color: rgb(var(--white-color)) !important;
}
.row img {
  height: unset;
  width: unset;
}
.row {
  display: -ms-flexbox; /* IE10 */
  display: -webkit-box;
  display: flex;
  -ms-flex-wrap: wrap; /* IE10 */
  flex-wrap: wrap;
}
.columns {
  display: flex;
  flex-wrap: wrap;
}
.column {
  -ms-flex: 100%; /* IE10 */
  -webkit-box-flex: 100%;
  flex: 100%;
  max-width: 100%;
}
.column:nth-child(2) {
  padding-left: var(--grid-gap-1);
  padding-right: calc(var(--grid-gap-1) / 2);
}
.column:nth-child(3) {
  padding-right: var(--grid-gap-1);
  padding-left: calc(var(--grid-gap-1) / 2);
}
@media only screen and (min-width: 538px) {
  .column {
    -ms-flex: 50%;
    -webkit-box-flex: 50%;
    flex: 50%;
    max-width: 50%;
  }
}
@media only screen and (min-width: 850px) {
  .column {
    -ms-flex: 25%;
    -webkit-box-flex: 25%;
    flex: 25%;
    max-width: 25%;
  }
}
</style>
