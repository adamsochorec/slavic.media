<script setup>
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper-bundle.css";
import heroVideo from "@/components/hero-video.vue";
import swiperOurteam from "@/components/swiper-ourteam.vue";

const events = ref([
  { status: '2023', date: 'Company establishment' },
    { status: 'Shipped', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800' },
    { status: 'Delivered', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' }
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
      ariaLabel="Behind the scenes"
    />

    <article class="wrapper-standard">
      <hr class="semi" />
      
      <h1 style="font-size: var(--font-size-1)">Slavic Media I/S</h1>
      <Timeline :value="events">
            <template #opposite="slotProps">
                <p class="note0">{{slotProps.item.date}}</p>
            </template>
            <template #content="slotProps">
                <p>{{slotProps.item.status}}</p>
            </template>
        </Timeline>
     <br>
      <p>
        Creative & Production studio based in Denmark and Czechia. We tell
        stories with deep eye contact, magnificent shots and clean designs to
        help your project stand out from the noise.
      </p>
      <hr class="semi" />
      <swiperOurteam></swiperOurteam>
      <hr class="semi" />
     

      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2271004.184012724!2d9.418068164227757!3d56.23008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x464c9fe2ecbe264d%3A0x5699de608acee414!2sSlavic%20Media!5e0!3m2!1sen!2scz!4v1730480218107!5m2!1sen!2scz" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </article>
  </div>
</template>

<style lang="scss" scoped>iframe{
  border-radius: var(--border-radius-1);
  height: 400px;
}</style>
