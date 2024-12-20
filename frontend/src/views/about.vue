<script setup lang="ts">
import { ref, onMounted } from "vue";
import event from "@/modules/event";

interface Event {
  date: string;
  event: string;
  icon: string;
}

interface State {
  events: Event[];
}

const { state, getAllEvents } = event();
const isDataLoaded = ref<boolean>(false);

// SHOW MORE START
const EVENTS_INCREMENT = 6;
const eventsToShow = ref(EVENTS_INCREMENT);
// SHOW MORE END

const loadMoreEvents = () => {
  eventsToShow.value += EVENTS_INCREMENT;
};
onMounted(async () => {
  await getAllEvents();
  isDataLoaded.value = true;
});
</script>

<template>
  <article class="main" aria-labelledby="about-company">
    <HeroVideo :id="1013776851" ariaLabel="Behind the Scenes | Slavic Media">
    </HeroVideo>
    <!--   ABOUT START -->
    <section class="wrapper-standard" role="region">
      <hr class="semi" />
      <h1 class="reveal">
        <span class="gradient">Slavic Media</span>
        <span
          style="
            font-size: var(--font-size-8) !important;
            font-family: var(--content-font);
            vertical-align: text-top;
          "
        >
          I/S</span
        >
      </h1>
      <p id="about-company">
        Creative & Production studio based in Denmark and Czechia. We tell
        stories with deep eye contact, magnificent shots, and clean designs to
        help your project stand out from the noise.
      </p>
      <br />
      <iframe
        class="map reveal"
        title="Slavic Media Location"
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3299827.3549044663!2d11.896611755598963!3d56.25502295714493!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x464c9fe2ecbe264d%3A0x5699de608acee414!2sSlavic%20Media!5e0!3m2!1sen!2scz!4v1733431912038!5m2!1sen!2scz"
        allowfullscreen=""
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
      <map></map>

      <br />
      <address style="font-style: normal" class="reveal">
        Slavic Media is headquartered in Kolding, Denmark, with remote team
        members distributed across the kingdom and Czechia. We are bootstrapped
        (self-funded) and profitable.
      </address>
      <p class="reveal">
        We’re always on the lookout to add kind, thoughtful, and exceptionally
        talented individuals to our team. Drop us a line if you're motivated by
        the intersection of individual freelance professionals.
      </p>
      <br />
      <SwiperEmployees></SwiperEmployees>
      <hr class="reveal" role="separator" />
    </section>
    <!--   ABOUT END -->
    <CompanyTimeline />
  </article>
</template>
