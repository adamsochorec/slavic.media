<script setup>
import { ref } from "vue";
import heroVideo from "@/components/hero-video.vue";
import swiperOurteam from "@/components/swiper-ourteam.vue";

const events = ref([
  { year: "May 2023", event: "Company establishment", icon: "pi pi-verified" },
  {
    year: "Oct 2023",
    event:
      "Closing collaboration with Huset Fundament, after 28 projects over the course of eight months of working together.",
    icon: "pi pi-camera",
  },
  {
    year: "Dec 2023",
    event: "Shooting 'Friskabte' for Kim Kim in Sort/Hvid scene in Copenhagen",
    icon: "pi pi-camera",
  },
  {
    year: "Dec 2023",
    event: "The first project with Timetravels - Swedish Lapland",
    icon: "pi pi-video",
  },
  {
    year: "Feb 2024",
    event:
      "Launching long term video editing collaboration with FranklinCovey Czech",
    icon: "pi pi-desktop",
  },
  {
    year: "Mar 2024",
    event:
      "Finnish Lapland - the second collaboration with Timetravels and our largest project yet",
    icon: "pi pi-video",
  },
  {
    year: "Apr 2024",
    event: "Performance & Strategy collaboration with Ján D.",
    icon: "pi pi-chart-bar",
  },
  {
    year: "Apr 2024",
    event: "Ferdinand P. starts as a sound engineer & designer",
    icon: "pi pi-user-plus",
  },
  {
    year: "May 2024",
    event: "Another successful project with Timetravels - Norwegian Fjords",
    icon: "pi pi-video",
  },
  {
    year: "Jun 2024",
    event: "Dominik T. starts as a part time graphic designer & video editor",
    icon: "pi pi-user-plus",
  },
  {
    year: "Jul 2024",
    event: "Terrain & topographical 3D scanning for Artmill",
    icon: "pi pi-video",
  },
  {
    year: "Aug 2024",
    event: "Filming 'Tech the Night' with Fynutzu",
    icon: "pi pi-video",
  },
  {
    year: "Oct 2024",
    event: "Filming Carbon Capture Technology Expo in Hamburg for Innomotics",
    icon: "pi pi-video",
  },
]);
</script>

<template>
  <div class="main">
    <heroVideo
      src="https://slavic.media/img/bts.mp4"
      poster="https://slavic.media/img/bts.png"
      loop
      autoplay
      muted
      vimeo="https://vimeo.com/1013776851"
      ariaLabel="Behind the scenes"
    />

    <article class="wrapper-standard">
      <hr class="semi" />
      <h1 class="reveal" style="font-size: var(--font-size-1)">
        Slavic Media I/S
      </h1>
      <br />

      <iframe
        class="reveal"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2271004.184012724!2d9.418068164227757!3d56.23008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x464c9fe2ecbe264d%3A0x5699de608acee414!2sSlavic%20Media!5e0!3m2!1sen!2scz!4v1730480218107!5m2!1sen!2scz"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
      <br />
      <p>
        Creative & Production studio based in Denmark and Czechia. We tell
        stories with deep eye contact, magnificent shots and clean designs to
        help your project stand out from the noise.
      </p>
      <br />
      <swiperOurteam></swiperOurteam>
      <hr class="reveal" role="separator" />

      <Timeline align="alternate" :value="events">
        <template #marker="slotProps">
          <span
            class="flex h-8 items-center justify-center"
            :style="{ backgroundColor: slotProps.item.color }"
          >
            <span :class="slotProps.item.icon"></span>
          </span>
        </template>
        <template #content="slotProps">
          <p class="reveal">
            {{ slotProps.item.year }}
          </p>

          <p class="reveal" style="font-size: var(--font-size-8)">
            {{ slotProps.item.event }}
          </p>
        </template>
      </Timeline>
    </article>
  </div>
</template>

<style lang="scss" scoped>
iframe {
  border-radius: var(--border-radius-1);
  height: var(--dimension-2);
}
</style>
