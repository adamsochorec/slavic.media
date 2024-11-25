<script setup>
import { ref, onMounted } from "vue";
import heroVideo from "@/components/hero-video.vue";
import swiperEmployees from "@/components/swiper-employees.vue";
import event from "@/modules/event";
const { state, getAllEvents } = event();
const isDataLoaded = ref(false);

onMounted(async () => {
  await getAllEvents();
  isDataLoaded.value = false;
});
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
      <h1 class="gradient reveal" style="font-size: var(--font-size-1)">
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
      <swiperEmployees></swiperEmployees>
      <hr class="reveal" role="separator" />
      <h2 class="reveal" style="font-size: var(--font-size-1)">
        <span class="gradient">Company</span>
        Timeline
      </h2>
      <br />
      <Timeline align="alternate" :value="state.events">
        <template #marker="slotProps">
          <span class="flex h-8 items-center justify-center">
            <span
              v-if="isDataLoaded"
              :class="`pi ${slotProps.item.icon}`"
            ></span>
            <span
              v-else
              style="color: rgb(var(--dark-grey-color))"
              class="pi pi-spin pi-spinner"
            ></span>
          </span>
        </template>
        <template #content="slotProps">
          <div v-if="isDataLoaded">
            <p class="reveal">
              {{ slotProps.item.date }}
            </p>
            <p class="reveal" style="font-size: var(--font-size-8)">
              {{ slotProps.item.event }}
            </p>
          </div>
          <div v-else>
            <Skeleton
              style="background-color: rgb(var(--dark-grey-color))"
              width="40%"
              class="mb-2"
            ></Skeleton
            ><Skeleton
              style="background-color: rgb(var(--dark-grey-color))"
              width="100%"
              class="mb-2"
            ></Skeleton>
          </div>
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
