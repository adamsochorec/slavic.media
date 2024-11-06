<script setup>
import { ref } from "vue";

const isDataLoaded = ref(true);

const columns = [
  {
    paddingClass: "",
    images: [
      {
        src: "https://slavic.media/img/2021-11-13-02059.jpg",
        title: "2021 | Kolding, Denmark | art project",
        alt: "Close-up portrait of a man wearing a baseball cap leaning against a wall in Kolding.",
        flagTitle: "Flag of Denmark",
        flagHref: "#flag-denmark",
      },
      {
        src: "https://slavic.media/img/hvalp.jpg",
        title: "2023 | Kolding, Denmark | Hvalp",
        alt: "Band HVALP album cover.",
        flagTitle: "Flag of Denmark",
        flagHref: "#flag-denmark",
      },
    ],
  },
  {
    paddingClass: "column-padding-1",
    images: [
      {
        src: "https://slavic.media/img/2021-08-24-01615.jpg",
        title: "2021 | Kolding, Denmark | art project",
        alt: "Close-up of a girl's face with colourful makeup around her eyes, making her look like a butterfly.",
        flagTitle: "Flag of Denmark",
        flagHref: "#flag-denmark",
      },
      {
        src: "https://slavic.media/img/2021-09-05-01666.jpg",
        title: "2021 | Kolding, Denmark | art project",
        alt: "Close-up of a girl's face leaning on a mirror, creating a reflection, with a pink backdrop, photographed in Kolding.",
        flagTitle: "Flag of Denmark",
        flagHref: "#flag-denmark",
      },
    ],
  },
  // Add more columns and images as needed
];
</script>
