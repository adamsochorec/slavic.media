<script setup>
import { ref } from "vue";
import Gallery from "@/components/Gallery.vue";

const contents = ref([
  {
    id: 1,
    title: "Colorful Portrait",
    url: "portrait",
    description:
      "Through bold colors and deep eye contact, each portrait captures the true essence of who you are—moments that feel real and connect on a personal level.",
    column1: [
      {
        largeURL: "https://slavic.media/img/2021-11-13-02059.jpg",
        thumbnailURL: "https://slavic.media/img/thumbnail/2021-11-13-02059.jpg",
        width: 1279,
        height: 1600,
        flag: "#flag-denmark",
        title: "2021 | Kolding, Denmark | art project",
        alt: "Close-up portrait of a man wearing a baseball cap leaning against a wall in Kolding.",
      },
      {
        largeURL: "https://slavic.media/img/hvalp.jpg",
        thumbnailURL: "https://slavic.media/img/thumbnail/hvalp.jpg",
        width: 1600,
        height: 1600,
        flag: "#flag-denmark",
        title: "2023 | Kolding, Denmark | Hvalp",
        alt: "Band HVALP album cover.",
      },
    ],
    column2: [
      {
        largeURL: "https://slavic.media/img/2021-08-24-01615.jpg",
        thumbnailURL: "https://slavic.media/img/thumbnail/2021-08-24-01615.jpg",
        width: 1600,
        height: 1142,
        flag: "#flag-denmark",
        title: "2021 | Kolding, Denmark | art project",
        alt: "Close-up of a girl's face with colourful makeup around her eyes, making her look like a butterfly.",
      },
      {
        largeURL: "https://slavic.media/img/2021-09-05-01666.jpg",
        thumbnailURL: "https://slavic.media/img/thumbnail/2021-09-05-01666.jpg",
        width: 1279,
        height: 1600,
        flag: "#flag-denmark",
        title: "2021 | Kolding, Denmark | art project",
        alt: "Close-up of a girl's face leaning on a mirror, creating a reflection, with a pink backdrop, photographed in Kolding.",
      },
      {
        largeURL: "https://slavic.media/img/2021-04-25-00693.jpg",
        thumbnailURL: "https://slavic.media/img/thumbnail/2021-04-25-00693.jpg",
        width: 3072,
        height: 1536,
        flag: "#flag-czechia",
        title: "2021 | Prague, Czechia | Divadlo na Vinohradech",
        alt: "Close-up portrait of Tereza Císařová laying on a table with fries, photographed at Divadlo Na Vinohradech.",
      },
    ],
    column3: [
      {
        largeURL: "https://slavic.media/img/2021-05-28-01020.jpg",
        thumbnailURL: "https://slavic.media/img/thumbnail/2021-05-28-01020.jpg",
        width: 1600,
        height: 1600,
        flag: "#flag-czechia",
        title: "2021 | Prague, Czechia | art project",
        alt: "Portrait of Zuzana Částková.",
      },
      {
        largeURL: "https://slavic.media/img/2023-11-13-00267.jpg",
        thumbnailURL: "https://slavic.media/img/thumbnail/2023-11-13-00267.jpg",
        width: 1600,
        height: 1600,
        flag: "#flag-denmark",
        title: "2023 | Copenhagen, Denmark | Sort/Hvid",
        alt: "Elf lady holding knife on Kim Kim's throat.",
      },
      {
        largeURL: "https://slavic.media/img/2021-04-14-00608.jpg",
        thumbnailURL: "https://slavic.media/img/thumbnail/2021-04-14-00608.jpg",
        width: 1600,
        height: 900,
        flag: "#flag-czechia",
        title: "2021 | Prague, Czechia | Divadlo na Vinohradech",
        alt: "David Steigerwald unclothed, seated in a cage at Divadlo Na Vinohradech, Prague.",
      },
    ],
    column4: [
      {
        largeURL: "https://slavic.media/img/2021-06-24-01233-2.jpg",
        thumbnailURL:
          "https://slavic.media/img/thumbnail/2021-06-24-01233-2.jpg",
        width: 1066,
        height: 1600,
        flag: "#flag-czechia",
        title: "2023 | Prague, Czechia | Divadlo Disk",
        alt: "Sára Rychlíková at Divadlo Disk in Prague.",
      },
      {
        largeURL: "https://slavic.media/img/2023-04-03-08707.jpg",
        thumbnailURL: "https://slavic.media/img/thumbnail/2023-04-03-08707.jpg",
        width: 1600,
        height: 1200,
        flag: "#flag-denmark",
        title: "2023 | Kolding, Denmark | Huset Fundament",
        alt: "Girl staring into camera holding old TV.",
      },
    ],
  },
  {
    id: 2,
    title: "Imersive Outdoor",
    url: "outdoor",
    description:
      "From the tundra to the desert, we specialize in capturing the raw beauty of nature. With a focus on Nordic tundra, taiga, and winter sports, our outdoor photography brings the wild, untamed landscapes to life.",
    column1: [
      {
        largeURL: "https://slavic.media/img/2022-12-03-000465.jpg",
        thumbnailURL:
          "https://slavic.media/img/thumbnail/2022-12-03-000465.jpg",
        width: 1600,
        height: 1071,
        flag: "#flag-sweden",
        title: "2023 | Björkliden, Sweden | Timetravels Ltd",
        alt: "Two guys in a survival shelter in tundra.",
      },
      {
        largeURL: "https://slavic.media/img/2024-03-10-00620.jpg",
        thumbnailURL: "https://slavic.media/img/thumbnail/2024-03-10-00620.jpg",
        width: 1600,
        height: 1000,
        flag: "#flag-finland",
        title: "2024 | Saariselkä, Finland | Timetravels Ltd",
        alt: "Kaunispää in Finnish Saariselkä, Northern Lapland.",
      },
      {
        largeURL: "https://slavic.media/img/2023-12-02-00459.jpg",
        thumbnailURL: "https://slavic.media/img/thumbnail/2023-12-02-00459.jpg",
        width: 3056,
        height: 1861,
        flag: "#flag-sweden",
        title: "2023 | Kiruna, Sweden | Kiruna Sleddog Tours",
        alt: "Pair of boys petting husky.",
      },
    ],
    column2: [
      {
        largeURL: "https://slavic.media/img/2023-11-30-00006.jpg",
        thumbnailURL: "https://slavic.media/img/thumbnail/2023-11-30-00006.jpg",
        width: 3072,
        height: 2048,
        flag: "#flag-norway",
        title: "2023 | Narvik, Norway | Timetravels Ltd",
        alt: "Two guys with Norwegian fjord in the background.",
      },
      {
        largeURL: "https://slavic.media/img/2023-12-01-00250.jpg",
        thumbnailURL: "https://slavic.media/img/thumbnail/2023-12-01-00250.jpg",
        width: 3072,
        height: 1728,
        flag: "#flag-sweden",
        title: "2023 | Björkliden, Sweden | Timetravels Ltd",
        alt: "Timetravels Herder Experience in Swedish Lapland.",
      },
      {
        largeURL: "https://slavic.media/img/2024-03-10-00496.jpg",
        thumbnailURL: "https://slavic.media/img/thumbnail/2024-03-10-00496.jpg",
        width: 1875,
        height: 2500,
        flag: "#flag-finland",
        title: "2024 | Inarijärvi, Finland | Timetravels Ltd",
        alt: "Ice skating on frozen Inarijärvi in Finnish Lapland.",
      },
      {
        largeURL: "https://slavic.media/img/2023-12-01-00064.jpg",
        thumbnailURL: "https://slavic.media/img/thumbnail/2023-12-01-00064.jpg",
        width: 1600,
        height: 1066,
        flag: "#flag-sweden",
        title: "2023 | Björkliden, Sweden | Timetravels Ltd",
        alt: "Ice fishing on frozen lake in Swedish Lapland.",
      },
    ],
    column3: [
      {
        largeURL: "https://slavic.media/img/2024-03-10-00238.jpg",
        thumbnailURL: "https://slavic.media/img/thumbnail/2024-03-10-00238.jpg",
        width: 1600,
        height: 1066,
        flag: "#flag-finland",
        title: "2024 | Inari, Finland | Timetravels Ltd",
        alt: "Timetravels Reindeer Herder experience in Lapland.",
      },
      {
        largeURL: "https://slavic.media/img/2022-10-15-00970.jpg",
        thumbnailURL: "https://slavic.media/img/thumbnail/2022-10-15-00970.jpg",
        width: 1600,
        height: 1066,
        flag: "#flag-aland",
        title: "2022 | Geta, Åland | Expedition Åland",
        alt: "Photo of a hiker standing on the rock in the forest with a hiking pole out of a tree branch.",
      },
      {
        largeURL: "https://slavic.media/img/2024-05-11-00184.jpg",
        thumbnailURL: "https://slavic.media/img/thumbnail/2024-05-11-00184.jpg",
        width: 1600,
        height: 1200,
        flag: "#flag-norway",
        title: "2024 | Jostedal, Norway | Timetravels Ltd",
        alt: "Group of hikers descending down through the valley in mountains.",
      },
    ],
    column4: [
      {
        largeURL: "https://slavic.media/img/2023-08-29-01113.jpg",
        thumbnailURL: "https://slavic.media/img/thumbnail/2023-08-29-01113.jpg",
        width: 1561,
        height: 1141,
        flag: "#flag-israel",
        title: "2023 | Dead Sea, Israel | Tourist Israel",
        alt: "Portrait of guide in Judean Desert nearby the Dead Sea.",
      },
      {
        largeURL: "https://slavic.media/img/2023-08-29-01096.jpg",
        thumbnailURL: "https://slavic.media/img/thumbnail/2023-08-29-01096.jpg",
        width: 1549,
        height: 1145,
        flag: "#flag-israel",
        title: "2023 | Nahal Bokek, Israel | Tourist Israel",
        alt: "Girl standing barefoot in the middle of oasis spring in the Judean Desert in Israel.",
      },
      {
        largeURL: "https://slavic.media/img/2023-08-29-01059.jpg",
        thumbnailURL: "https://slavic.media/img/thumbnail/2023-08-29-01059.jpg",
        width: 1559,
        height: 1163,
        flag: "#flag-israel",
        title: "2023 | Masada, Israel | Tourist Israel",
        alt: "Woman hiking on Masada in Israel.",
      },
    ],
  },
  {
    id: 3,
    url: "still",
    title: "Timeless Still",
    description:
      "Magnificent moments from concerts, theatre, and live performances—capturing raw emotions and deep eye contact that bring every gesture and glance to life.",
    column1: [
      {
        largeURL: "https://slavic.media/img/2023-09-09-10507.jpg",
        thumbnailURL: "https://slavic.media/img/thumbnail/2023-09-09-10507.jpg",
        width: 1280,
        height: 1600,
        flag: "#flag-denmark",
        title: "2023 | Kolding, Denmark | Huset Fundament",
        alt: "Shirtless Anime Animeaux guitarist starring into a camera.",
      },
      {
        largeURL: "https://slavic.media/img/2021-06-24-01208.jpg",
        thumbnailURL: "https://slavic.media/img/thumbnail/2021-06-24-01208.jpg",
        width: 1600,
        height: 900,
        flag: "#flag-czechia",
        title: "2021 | Prague, Czechia | Divadlo Disk",
        alt: "Performance 'Hrdina Západu' at Divadlo Disk",
      },
    ],
    column2: [
      {
        largeURL: "https://slavic.media/img/2023-09-01-00086.jpg",
        thumbnailURL: "https://slavic.media/img/thumbnail/2023-09-01-00086.jpg",
        width: 1600,
        height: 1066,
        flag: "#flag-denmark",
        title: "2023 | Kolding, Denmark | Kolding Kulturnat",
        alt: "Couple listening to stage performance.",
      },
      {
        largeURL: "https://slavic.media/img/2023-09-09-10524.jpg",
        thumbnailURL: "https://slavic.media/img/thumbnail/2023-09-09-10524.jpg",
        width: 1600,
        height: 1066,
        flag: "#flag-denmark",
        title: "2023 | Kolding, Denmark | Huset Fundament",
        alt: "Anime Animeaux frontman holding a microphone on a stage.",
      },
      {
        largeURL: "https://slavic.media/img/2023-09-29-00163.jpg",
        thumbnailURL: "https://slavic.media/img/thumbnail/2023-09-29-00163.jpg",
        width: 1600,
        height: 899,
        flag: "#flag-denmark",
        title: "2023 | Kolding, Denmark | Huset Fundament",
        alt: "Stage performance crowd.",
      },
    ],
    column3: [
      {
        largeURL: "https://slavic.media/img/2023-06-22-00033.jpg",
        thumbnailURL: "https://slavic.media/img/thumbnail/2023-06-22-00033.jpg",
        width: 1600,
        height: 1066,
        flag: "#flag-denmark",
        title: "2023 | Kolding, Denmark | Huset Fundament",
        alt: "Two ladies mixing liquids in glass cups.",
      },
      {
        largeURL: "https://slavic.media/img/2022-06-28-00708.jpg",
        thumbnailURL: "https://slavic.media/img/thumbnail/2022-06-28-00708.jpg",
        width: 1600,
        height: 1066,
        flag: "#flag-denmark",
        title: "2023 | Roskilde, Denmark | Rosklide Festival",
        alt: "Roskilde Festival.",
      },
      {
        largeURL: "https://slavic.media/img/2023-05-12-08965.jpg",
        thumbnailURL: "https://slavic.media/img/thumbnail/2023-05-12-08965.jpg",
        width: 1600,
        height: 900,
        flag: "#flag-denmark",
        title: "2023 | Kolding, Denmark | Huset Fundament",
        alt: "Artist lited by light looking like a Jesus.",
      },
    ],
    column4: [
      {
        largeURL: "https://slavic.media/img/2023-05-27-00025.jpg",
        thumbnailURL: "https://slavic.media/img/thumbnail/2023-05-27-00025.jpg",
        width: 1600,
        height: 1066,
        flag: "#flag-denmark",
        title: "2023 | Kolding, Denmark | Huset Fundament",
        alt: "Lady enjoying live performance in Pitstop.",
      },
      {
        largeURL: "https://slavic.media/img/2023-09-22-00026.jpg",
        thumbnailURL: "https://slavic.media/img/thumbnail/2023-09-22-00026.jpg",
        width: 1600,
        height: 1200,
        flag: "#flag-denmark",
        title: "2023 | Kolding, Denmark | Huset Fundament",
        alt: "Singing performer in Pitstop.",
      },
      {
        largeURL: "https://slavic.media/img/2023-05-12-08969.jpg",
        thumbnailURL: "https://slavic.media/img/thumbnail/2023-05-12-08969.jpg",
        width: 1583,
        height: 734,
        flag: "#flag-denmark",
        title: "2023 | Kolding, Denmark | Huset Fundament",
        alt: "Band playing behind foggy glass.",
      },
    ],
  },
]);
</script>

<template>
  <article class="wrapper-wide">
    <hr class="semi" />
    <Fluid>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <h1 style="font-size: var(--font-size-1)">
            <span class="highlited tuscher">Photo</span> Services
          </h1>
        </div>
        <div>
          <p class="mb-5">
            Whether it’s a dynamic performance, a powerful portrait, or the vast
            outdoors, our photography captures authentic moments, rich in detail
            and emotion, that tell your story.
          </p>
          <ContactDialog />
        </div>
      </div>
      <hr />
    </Fluid>
    <div v-for="content in contents" :key="content.id">
      <div :id="content.url"></div>
      <Fluid>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <h1 style="font-size: var(--font-size-2)">
              {{ content.title.split(" ")[0] }}
              <span class="highlited tuscher">{{
                content.title.split(" ")[1]
              }}</span>
            </h1>
          </div>
          <div>
            <p class="mb-5">
              {{ content.description }}
            </p>
          </div>
        </div>
        <hr class="semi" />
      </Fluid>
      <Gallery
        :galleryID="content.id + '-gallery'"
        :images="{
          column1: content.column1,
          column2: content.column2,
          column3: content.column3,
          column4: content.column4,
        }"
      />
      <hr />
    </div>
    <!-- CTA SECTION -->
    <Fluid>
      <div class="grid grid-cols-2 gap-4">
        <ContactDialog />

        <Button
          as="a"
          label="Our Lightroom Presets"
          href="https://store.slavic.media"
          rounded
        /></div
    ></Fluid>
    <hr class="semi" />
  </article>
</template>

<style lang="scss" scoped></style>
