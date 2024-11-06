<script setup>
import { ref, onMounted } from "vue";
import contactForm from "@/components/contact-form.vue";
import $ from "jquery";
import "magnific-popup";

const isDataLoaded = ref(true);

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
        item.src = item.el.attr("src");
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
      <contactForm></contactForm>

      <!-- PAGE INTRO -->
      <div class="grid-container caption-container">
        <div class="grid-item">
          <h1 class="reveal" aria-label="Video Services">
            <span class="highlited">Video</span>
            Services
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
              Request a Proposal<i class="pi pi-arrow-right"></i>
            </div>
          </a>
        </div>
      </div>
    </article>
    <!-- PHOTO GALLERY 1 -->
    <article v-if="isDataLoaded" class="wrapper-wide" id="photo">
      <hr class="reveal" role="separator" />
      <div class="grid-container caption-container">
        <div class="grid-item reveal">
          <h2>Colorful <span class="highlited">Portrait</span></h2>
        </div>
        <div class="grid-item">
          <p class="reveal">
            Through bold colors and deep eye contact, each portrait captures the
            true essence of who you are—moments that feel real and connect on a
            personal level.
          </p>
        </div>
      </div>
      <hr class="semi" role="separator" />
    </article>
    <article v-if="isDataLoaded" class="popup-gallery">
      <div class="row">
        <div class="column">
          <div class="reveal">
            <a
              src="https://slavic.media/img/2021-11-13-02059.jpg"
              title="2021 | Kolding, Denmark | art project"
            >
              <img
                src="https://slavic.media/img/2021-11-13-02059.jpg"
                title="Close-up portrait of a man wearing a baseball cap leaning against a wall in Kolding."
                alt="Close-up portrait of a man wearing a baseball cap leaning against a wall in Kolding."
              />
              <svg class="flag note" title="Flag of Denmark">
                <use href="#flag-denmark"></use>
              </svg>
            </a>
          </div>
          <div class="reveal">
            <a
              src="https://slavic.media/img/hvalp.jpg"
              title="2023 | Kolding, Denmark | Hvalp"
            >
              <img
                src="https://slavic.media/img/hvalp.jpg"
                alt="Band HVALP album cover."
                title="2023 | Kolding, Denmark | Hvalp"
              />
              <svg class="flag note" title="Flag of Denmark">
                <use href="#flag-denmark"></use>
              </svg>
            </a>
          </div>
        </div>
        <div class="column column-padding-1">
          <div class="reveal">
            <a
              src="https://slavic.media/img/2021-08-24-01615.jpg"
              title="2021 | Kolding, Denmark | art project"
            >
              <img
                src="https://slavic.media/img/2021-08-24-01615.jpg"
                title="Close-up of a girl's face with colourful makeup around her eyes, making her look like a butterfly."
                alt="Close-up of a girl's face with colourful makeup around her eyes, making her look like a butterfly."
              />
              <svg class="flag note" title="Flag of Denmark">
                <use href="#flag-denmark"></use>
              </svg>
            </a>
          </div>
          <div class="reveal">
            <a
              src="https://slavic.media/img/2021-09-05-01666.jpg"
              title="2021 | Kolding, Denmark | art project"
            >
              <img
                src="https://slavic.media/img/2021-09-05-01666.jpg"
                title="Close-up of a girl's face leaning on a mirror, creating a reflection, with a pink backdrop, photographed in Kolding."
                alt="Close-up of a girl's face leaning on a mirror, creating a reflection, with a pink backdrop, photographed in Kolding."
              />
              <svg class="flag note" title="Flag of Denmark">
                <use href="#flag-denmark"></use>
              </svg>
            </a>
          </div>
          <div class="reveal">
            <a
              src="https://slavic.media/img/2021-04-25-00693.jpg"
              title="2021 | Prague, Czechia | Divadlo na Vinohradech"
            >
              <img
                src="https://slavic.media/img/2021-04-25-00693.jpg"
                title="Close-up portrait of Tereza Císařová laying on a table with fries, photographed at Divadlo Na Vinohradech."
                alt="Close-up portrait of Tereza Císařová laying on a table with fries, photographed at Divadlo Na Vinohradech."
              />
              <svg class="flag note" title="Flag of Czechia">
                <use href="#flag-czechia"></use>
              </svg>
            </a>
          </div>
        </div>
        <div class="column column-padding-2">
          <div class="reveal">
            <a
              src="https://slavic.media/img/2021-05-28-01020.jpg"
              title="2021 | Prague, Czechia | art project"
            >
              <img
                src="https://slavic.media/img/2021-05-28-01020.jpg"
                title="Portrait of Zuzana Částková."
                alt="Portrait of Zuzana Částková."
              />
              <svg class="flag note" title="Flag of Czechia">
                <use href="#flag-czechia"></use>
              </svg>
            </a>
          </div>
          <div class="reveal">
            <a
              src="https://slavic.media/img/2023-11-13-00267.jpg"
              title="2023 | Copenhagen, Denmark | Sort/Hvid"
            >
              <img
                src="https://slavic.media/img/2023-11-13-00267.jpg"
                title="Elf lady holding knife on Kim Kim's throat."
                alt="Elf lady holding knife on Kim Kim's throat."
              />
              <svg class="flag note" title="Flag of Denmark">
                <use href="#flag-denmark"></use>
              </svg>
            </a>
          </div>
          <div class="reveal">
            <a
              src="https://slavic.media/img/2021-04-14-00608.jpg"
              title="2021 | Prague, Czechia | Divadlo na Vinohradech"
            >
              <img
                src="https://slavic.media/img/2021-04-14-00608.jpg"
                title="David Steigerwald unclothed, seated in a cage at Divadlo Na Vinohradech, Prague."
                alt="David Steigerwald unclothed, seated in a cage at Divadlo Na Vinohradech, Prague."
              />
              <svg class="flag note" title="Flag of Czechia">
                <use href="#flag-czechia"></use>
              </svg>
            </a>
          </div>
        </div>
        <div class="column">
          <div class="reveal">
            <a
              src="https://slavic.media/img/2021-06-24-01233-2.jpg"
              title="2023 | Prague, Czechia | Divadlo Disk"
            >
              <img
                src="https://slavic.media/img/2021-06-24-01233-2.jpg"
                alt="Sára Rychlíková at Divadlo Disk in Prague."
                title="2023 | Prague, Czechia | Divadlo Disk"
              />
              <svg class="flag note" title="Flag of Czechia">
                <use href="#flag-czechia"></use>
              </svg>
            </a>
          </div>
          <div class="reveal">
            <a
              src="https://slavic.media/img/2023-04-03-08707.jpg"
              title="2023 | Kolding, Denmark | Huset Fundament"
            >
              <img
                src="https://slavic.media/img/2023-04-03-08707.jpg"
                title="2023 | Kolding, Denmark | Huset Fundament"
                alt="Girl staring into camera holding old TV.."
              />
              <svg class="flag note" title="Flag of Denmark">
                <use href="#flag-denmark"></use>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div id="outdoor"></div>
    </article>
    <!-- PHOTO GALLERY 2 -->
    <article v-if="isDataLoaded" class="wrapper-wide" id="photo">
      <hr class="reveal" role="separator" />
      <div class="grid-container caption-container">
        <div class="grid-item reveal">
          <h2>Immersive <span class="highlited">Outdoor</span></h2>
        </div>
        <div class="grid-item">
          <p class="reveal">
            From the tundra to the desert, we specialize in capturing the raw
            beauty of nature. With a focus on Nordic tundra, taiga, and winter
            sports, our outdoor photography brings the wild, untamed landscapes
            to life.
          </p>
        </div>
      </div>
      <hr class="semi" role="separator" />
    </article>
    <article v-if="isDataLoaded" class="popup-gallery">
      <div class="row">
        <div class="column">
          <div class="reveal">
            <a
              src="https://slavic.media/img/2022-12-03-000465.jpg"
              title="2023 | Björkliden, Sweden | Timetravels Ltd"
            >
              <img
                src="https://slavic.media/img/2022-12-03-000465.jpg"
                alt="Two guys in a survival shelter in tundra."
                title="2023 | Björkliden, Sweden | Timetravels Ltd"
              />
              <svg
                class="flag note"
                title="Flag of Sweden"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <use href="#flag-sweden"></use>
              </svg>
            </a>
          </div>
          <div class="reveal">
            <a
              src="https://slavic.media/img/2024-03-10-00620.jpg"
              title="2024 | Saariselkä, Finland | Timetravels Ltd"
            >
              <img
                src="https://slavic.media/img/2024-03-10-00620.jpg"
                alt="Kaunispää in Finnish Saariselkä, Northern Lapland."
                title="2024 | Saariselkä, Finland | Timetravels Ltd"
              />
              <svg
                class="flag note"
                title="Flag of Finland"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <use href="#flag-finland"></use>
              </svg>
            </a>
          </div>
          <div class="reveal">
            <a
              src="https://slavic.media/img/2023-12-02-00459.jpg"
              title="2023 | Kiruna, Sweden | Kiruna Sleddog Tours"
            >
              <img
                src="https://slavic.media/img/2023-12-02-00459.jpg"
                alt="Pair of boys petting husky."
                title="2023 | Kiruna, Sweden | Kiruna Sleddog Tours"
              />
              <svg
                class="flag note"
                title="Flag of Sweden"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <use href="#flag-sweden"></use>
              </svg>
            </a>
          </div>
        </div>
        <div class="column column-padding-1">
          <div class="reveal">
            <a
              src="https://slavic.media/img/2023-11-30-00006.jpg"
              title="2023 | Narvik, Norway | Timetravels Ltd"
            >
              <img
                src="https://slavic.media/img/2023-11-30-00006.jpg"
                alt="Two guys with Norwegian fjord in the background."
                title="2023 | Narvik, Norway | Timetravels Ltd"
              />
              <svg
                class="flag note"
                title="Flag of Norway"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <use href="#flag-norway"></use>
              </svg>
            </a>
          </div>
          <div class="reveal">
            <a
              src="https://slavic.media/img/2023-12-01-00250.jpg"
              title="2023 | Björkliden, Sweden | Timetravels Ltd"
            >
              <img
                src="https://slavic.media/img/2023-12-01-00250.jpg"
                alt="Timetravels Herder Experience in Swedish Lapland."
                title="2023 | Björkliden, Sweden | Timetravels Ltd"
              />
              <svg
                class="flag note"
                title="Flag of Sweden"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <use href="#flag-sweden"></use>
              </svg>
            </a>
          </div>
          <div class="reveal">
            <a
              src="https://slavic.media/img/2024-03-10-00496.jpg"
              title="2024 | Inarijärvi, Finland | Timetravels Ltd"
            >
              <img
                src="https://slavic.media/img/2024-03-10-00496.jpg"
                alt="Ice skating on frozen Inarijärvi in Finnish Lapland."
                title="2024 | Inarijärvi, Finland | Timetravels Ltd"
              />
              <svg
                class="flag note"
                title="Flag of Finland"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <use href="#flag-finland"></use>
              </svg>
            </a>
          </div>
          <div class="reveal">
            <a
              src="https://slavic.media/img/2023-12-01-00064.jpg"
              title="2023 | Björkliden, Sweden | Timetravels Ltd"
            >
              <img
                src="https://slavic.media/img/2023-12-01-00064.jpg"
                alt="Ice fishing on frozen lake in Swedish Lapland."
                title="2023 | Björkliden, Sweden | Timetravels Ltd"
              />
              <svg
                class="flag note"
                title="Flag of Sweden"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <use href="#flag-sweden"></use>
              </svg>
            </a>
          </div>
        </div>
        <div class="column column-padding-2">
          <div class="reveal">
            <a
              src="https://slavic.media/img/2024-03-10-00238.jpg"
              title="2024 | Inari, Finland | Timetravels Ltd"
            >
              <img
                src="https://slavic.media/img/2024-03-10-00238.jpg"
                alt="Timetravels Reindeer Herder experience in Lapland."
                title="2024 | Inari, Finland | Timetravels Ltd"
              />
              <svg
                class="flag note"
                title="Flag of Finland"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <use href="#flag-finland"></use>
              </svg>
            </a>
          </div>
          <div class="reveal">
            <a
              src="https://slavic.media/img/2022-10-15-00970.jpg"
              title="2022 | Geta, Åland | Expedition Åland"
            >
              <img
                src="https://slavic.media/img/2022-10-15-00970.jpg"
                alt="Photo of a hiker standing on the rock in the forest with a hiking pole out of a tree branch."
                title="2022 | Geta, Åland | Expedition Åland"
              />
              <svg class="flag note" title="Flag of Åland">
                <use href="#flag-aland"></use>
              </svg>
            </a>
          </div>
          <div class="reveal">
            <a
              src="https://slavic.media/img/2024-05-11-00184.jpg"
              title="2024 | Jostedal, Norway | Timetravels Ltd"
            >
              <img
                src="https://slavic.media/img/2024-05-11-00184.jpg"
                alt="Group of hikers descending down through the valley in mountains."
                title="2024 | Jostedal, Norway | Timetravels Ltd"
              />
              <svg class="flag note" title="Flag of Norway">
                <use href="#flag-norway"></use>
              </svg>
            </a>
          </div>
        </div>
        <div class="column">
          <div class="reveal">
            <a
              src="https://slavic.media/img/2023-08-29-01113.jpg"
              title="2023 | Dead Sea, Israel | Tourist Israel"
            >
              <img
                src="https://slavic.media/img/2023-08-29-01113.jpg"
                alt="Portrait of guide in Judean Derest nearby the Dead Sea."
                title="2023 | Dead Sea, Israel | Tourist Israel"
              />
              <svg class="flag note" title="Flag of Israel">
                <use href="#flag-israel"></use>
              </svg>
            </a>
          </div>
          <div class="reveal">
            <a
              src="https://slavic.media/img/2023-08-29-01096.jpg"
              title="2023 | Nahal Bokek, Israel | Tourist Israel"
            >
              <img
                src="https://slavic.media/img/2023-08-29-01096.jpg"
                alt="Girl standing barefoot in the middle of oasis spring in the Judean Desert in Israel."
                title="2023 | Nahal Bokek, Israel | Tourist Israel"
              />
              <svg class="flag note" title="Flag of Israel">
                <use href="#flag-israel"></use>
              </svg>
            </a>
          </div>
          <div class="reveal">
            <a
              src="https://slavic.media/img/2023-08-29-01059.jpg"
              title="2023 | Masada, Israel | Tourist Israel"
            >
              <img
                src="https://slavic.media/img/2023-08-29-01059.jpg"
                alt="Woman hiking on Masada in Israel."
                title="2023 | Masada, Israel | Tourist Israel"
              />
              <svg class="flag note" title="Flag of Israel">
                <use href="#flag-israel"></use>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div id="still"></div>
    </article>
    <!-- PHOTO GALLERY 3 -->
    <article v-if="isDataLoaded" class="wrapper-wide" id="photo">
      <hr class="reveal" role="separator" />
      <div class="grid-container caption-container">
        <div class="grid-item reveal">
          <h2>Timeless <span class="highlited">Still</span></h2>
        </div>
        <div class="grid-item">
          <p class="reveal">
            Magnificent moments from concerts, theatre, and live
            performances—capturing raw emotions and deep eye contact that bring
            every gesture and glance to life.
          </p>
        </div>
      </div>
      <hr class="semi" role="separator" />
    </article>
    <article v-if="isDataLoaded" class="popup-gallery">
      <div class="row">
        <div class="column">
          <div class="reveal">
            <a
              src="https://slavic.media/img/2023-09-09-10507.jpg"
              title="2023 | Kolding, Denmark | Huset Fundament"
            >
              <img
                src="https://slavic.media/img/2023-09-09-10507.jpg"
                alt="Shirtless Anime Animeaux guitarist starring into a camera."
                title="2023 | Kolding, Denmark | Huset Fundament"
              />
              <svg class="flag note" title="Flag of Denmark">
                <use href="#flag-denmark"></use>
              </svg>
            </a>
          </div>

          <div class="reveal">
            <a
              src="https://slavic.media/img/2021-06-24-01208.jpg"
              title="2021 | Prague, Czechia | Divadlo Disk"
            >
              <img
                src="https://slavic.media/img/2021-06-24-01208.jpg"
                alt="Performance 'Hrdina Západu' at Divadlo Disk"
              />
              <svg class="flag note" title="Flag of Czechia">
                <use href="#flag-czechia"></use>
              </svg>
            </a>
          </div>
        </div>
        <div class="column column-padding-1">
          <div class="reveal">
            <a
              src="https://slavic.media/img/2023-09-01-00086.jpg"
              title="2023 | Kolding, Denmark | Kolding Kulturnat"
            >
              <img
                src="https://slavic.media/img/2023-09-01-00086.jpg"
                alt="Couple listening to stage performance."
                title="2023 | Kolding, Denmark | Kolding Kulturnat"
              />
              <svg
                class="flag note"
                title="Flag of Denmark"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <use href="#flag-denmark"></use>
              </svg>
            </a>
          </div>
          <div class="reveal">
            <a
              src="https://slavic.media/img/2023-09-09-10524.jpg"
              title="2023 | Kolding, Denmark | Huset Fundament"
            >
              <img
                src="https://slavic.media/img/2023-09-09-10524.jpg"
                alt="Anime Animeaux frontman holding a microphone on a stage."
                title="2023 | Kolding, Denmark | Huset Fundament"
              />
              <svg
                class="flag note"
                title="Flag of Denmark"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <use href="#flag-denmark"></use>
              </svg>
            </a>
          </div>
          <div class="reveal">
            <a
              src="https://slavic.media/img/2023-09-29-00163.jpg"
              title="2023 | Kolding, Denmark | Huset Fundament"
            >
              <img
                src="https://slavic.media/img/2023-09-29-00163.jpg"
                alt="Stage performance crowd."
                title="2023 | Kolding, Denmark | Huset Fundament"
              />
              <svg
                class="flag note"
                title="Flag of Denmark"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <use href="#flag-denmark"></use>
              </svg>
            </a>
          </div>
        </div>
        <div class="column column-padding-2">
          <div class="reveal">
            <a
              src="https://slavic.media/img/2023-06-22-00033.jpg"
              title="2023 | Kolding, Denmark | Huset Fundament"
            >
              <img
                src="https://slavic.media/img/2023-06-22-00033.jpg"
                alt="Two ladies mixing liquids in glass cups."
                title="2023 | Kolding, Denmark | Huset Fundament"
              />
              <svg class="flag note" title="Flag of Denmark">
                <use href="#flag-denmark"></use>
              </svg>
            </a>
          </div>
          <div class="reveal">
            <a
              src="https://slavic.media/img/2022-06-28-00708.jpg"
              title="2023 | Roskilde, Denmark | Rosklide Festival"
            >
              <img
                src="https://slavic.media/img/2022-06-28-00708.jpg"
                alt="Roskilde Festival."
                title="2023 | Roskilde, Denmark | Rosklide Festival"
              />
              <svg class="flag note" title="Flag of Denmark">
                <use href="#flag-denmark"></use>
              </svg>
            </a>
          </div>
          <div class="reveal">
            <a
              src="https://slavic.media/img/2023-05-12-08965.jpg"
              title="2023 | Kolding, Denmark | Huset Fundament"
            >
              <img
                src="https://slavic.media/img/2023-05-12-08965.jpg"
                title="2023 | Kolding, Denmark | Huset Fundament"
                alt="Artist lited by light looking like a Jesus."
              />
              <svg class="flag note" title="Flag of Denmark">
                <use href="#flag-denmark"></use>
              </svg>
            </a>
          </div>
        </div>
        <div class="column">
          <div class="reveal">
            <a
              src="https://slavic.media/img/2023-05-27-00025.jpg"
              title="2023 | Kolding, Denmark | Huset Fundament"
            >
              <img
                src="https://slavic.media/img/2023-05-27-00025.jpg"
                title="2023 | Kolding, Denmark | Huset Fundament"
                alt="Lady enjoying live performance in Pitstop."
              />
              <svg class="flag note" title="Flag of Denmark">
                <use href="#flag-denmark"></use>
              </svg>
            </a>
          </div>
          <div class="reveal">
            <a
              src="https://slavic.media/img/2023-09-22-00026.jpg"
              title="2023 | Kolding, Denmark | Huset Fundament"
            >
              <img
                src="https://slavic.media/img/2023-09-22-00026.jpg"
                title="2023 | Kolding, Denmark | Huset Fundament"
                alt="Singing performer in Pitstop."
              />
              <svg class="flag note" title="Flag of Denmark">
                <use href="#flag-denmark"></use>
              </svg>
            </a>
          </div>
          <div class="reveal">
            <a
              src="https://slavic.media/img/2023-05-12-08969.jpg"
              title="2023 | Kolding, Denmark | Huset Fundament"
            >
              <img
                src="https://slavic.media/img/2023-05-12-08969.jpg"
                title="2023 | Kolding, Denmark | Huset Fundament"
                alt="Band playing behind foggy glass."
              />
              <svg class="flag note" title="Flag of Denmark">
                <use href="#flag-denmark"></use>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </article>
    <div class="wrapper-wide" v-else>
      <div class="flex flex-wrap">
        <div class="w-full xl:w-6/12 p-4">
          <Skeleton
            style="background-color: rgb(var(--dark-grey-color))"
            height="2rem"
            class="mb-2"
          ></Skeleton>
          <Skeleton
            style="background-color: rgb(var(--dark-grey-color))"
            height="2rem"
            width="10rem"
            class="mb-2"
          ></Skeleton>
        </div>
        <div class="w-full xl:w-6/12 p-4">
          <Skeleton
            style="background-color: rgb(var(--dark-grey-color))"
            height="4rem"
            class="mb-2"
          ></Skeleton>

          <Skeleton
            style="background-color: rgb(var(--dark-grey-color))"
            width="10rem"
            class="mb-10"
          ></Skeleton>
          <Skeleton
            style="background-color: rgb(var(--dark-grey-color))"
            width="10rem"
            height="2rem"
            borderRadius="16px"
          ></Skeleton>
        </div>
      </div>
      <div class="flex justify-between mt-4">
        <Skeleton
          style="background-color: rgb(var(--dark-grey-color))"
          width="48%"
          height="200px"
        ></Skeleton>
        <Skeleton
          style="background-color: rgb(var(--dark-grey-color))"
          width="24%"
          height="200px"
        ></Skeleton>
        <Skeleton
          style="background-color: rgb(var(--dark-grey-color))"
          width="24%"
          height="200px"
        ></Skeleton>
      </div>
    </div>
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
