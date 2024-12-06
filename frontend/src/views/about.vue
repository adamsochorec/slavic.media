<script setup lang="ts">
import { ref, onMounted } from "vue";
import heroVideo from "@/components/hero-video.vue";
import swiperEmployees from "@/components/swiper-employees.vue";
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

onMounted(async () => {
  await getAllEvents();
  isDataLoaded.value = true;
});
</script>

<template>
  <article class="main">
    <heroVideo
      src="https://slavic.media/video/behind-the-scenes.mp4"
      poster="https://cdn.slavic.media/images/behind-the-scenes//height=800,sharpen=100"
      loop
      autoplay
      muted
      vimeo="https://vimeo.com/slavicmedia/behind-the-scenes?share=copy"
      aria-labelledby="hero-video-title hero-video-desc"
    >
      <div id="hero-video-title" hidden>Behind the Scenes Video</div>
      <div id="hero-video-desc" hidden>
        A behind-the-scenes look at Slavic Media's production process,
        showcasing creative techniques and studio environments.
      </div>
    </heroVideo>

    <section
      class="wrapper-standard"
      role="region"
      aria-labelledby="about-company"
    >
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
      <p>
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
      <br />
      <address style="font-style: normal" class="reveal">
        Slavic Media is headquartered in Kolding, Denmark, with remote team
        members distributed across the kingdom and Czechia.
      </address>
      <p class="reveal">
        We’re always on the lookout to add kind, thoughtful, and exceptionally
        talented individuals to our team. Drop us a line if you're motivated by
        the intersection of individual freelance professionals.
      </p>
      <br />
      <swiperEmployees></swiperEmployees>
      <hr class="reveal" role="separator" />
    </section>
    <section
      class="wrapper-standard"
      role="region"
      aria-labelledby="company-timeline"
    >
      <h2 class="reveal" style="font-size: var(--font-size-1)">
        Company <span class="gradient">Journey</span>
      </h2>
      <br />
      <Timeline
        v-if="isDataLoaded"
        align="alternate"
        :value="state.events"
        aria-busy="false"
      >
        <template #marker="slotProps">
          <span class="flex h-8 items-center justify-center">
            <span :class="`pi ${slotProps.item.icon}`"></span>
          </span>
        </template>
        <template #content="slotProps">
          <div>
            <p class="reveal">
              {{ slotProps.item.date }}
            </p>
            <p class="reveal" style="font-size: var(--font-size-8)">
              {{ slotProps.item.event }}
            </p>
          </div>
        </template>
      </Timeline>
      <div v-else v-for="n in 4" :key="n" aria-busy="true" aria-live="polite">
        <ul style="list-style: none" class="m-0">
          <li class="mb-3">
            <div class="flex">
              <Skeleton
                shape="circle"
                size="4rem"
                class="mr-2"
                style="background-color: rgb(var(--dark-grey-color))"
              ></Skeleton>
              <div class="self-center" style="flex: 1">
                <Skeleton
                  style="background-color: rgb(var(--dark-grey-color))"
                  width="100%"
                  borderRadius="10px"
                  class="mb-2"
                  height="10px"
                ></Skeleton>
                <Skeleton
                  style="background-color: rgb(var(--dark-grey-color))"
                  width="75%"
                  height="10px"
                  borderRadius="10px"
                ></Skeleton>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
  </article>
</template>
