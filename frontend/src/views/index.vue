<script setup>
import HeroVideo from "@/components/HeroVideo.vue";
import ContactDialog from "@/components/ContactDialog.vue";
import SwiperClients from "@/components/SwiperClients.vue";
import SwiperServices from "@/components/SwiperServices.vue";
import SwiperReviews from "@/components/SwiperReviews.vue";
</script>
<template>
  <div>
    <HeroVideo
      src="https://slavic.media/img/showreel.mp4"
      poster="https://slavic.media/img/showreel.png"
      loop
      autoplay
      muted
      ariaLabel="Showreel"
    />
    <article class="wrapper-standard">
      <Fluid>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <h1 style="font-size: var(--font-size-3)">
              Strategy, <span class="highlited tuscher">experience</span>,
              precision and hard work<br />at your
              <span class="highlited tuscher">service</span>
            </h1>
          </div>
          <div>
            <p>
              We are creative storytellers who believe in good set designs, deep
              eye contact, and the right light that can raise your message above
              the noise.
            </p>
          </div>
        </div>
      </Fluid>
      <hr />
      <SwiperClients></SwiperClients>
      <hr />
      <SwiperServices></SwiperServices>
      <div class="card flex justify-center mt-4">
        <ContactDialog />
      </div>
      <hr />
      <Fluid
        v-animateonscroll="{
          enterClass: 'animate-fadein',
          leaveClass: 'animate-fadeout',
        }"
      >
        <div class="grid grid-cols-2 gap-4">
          <div>
            <h1 style="font-size: var(--font-size-3)">
              <span class="highlited tuscher">Actions</span>, speak louder
              <span class="highlited tuscher">than</span> any
              <span class="highlited tuscher">words</span>
            </h1>
          </div>
          <div>
            <p>
              Do you need to fly a drone over the open sea, capture the northern
              lights in cold weather, bike across the whole country, walk
              through the desert, or get up close in a way that nobody else has?
              We are here for you.
            </p>
          </div>
        </div>
      </Fluid>
      <hr />
      <SwiperReviews></SwiperReviews>
      <div class="card flex justify-center mt-4">
        <Button
          as="a"
          label="Share the experience"
          href="https://g.page/r/CRTkzopg3plWEB0/review"
          target="_blank"
          rel="noopener"
        />
      </div>
      <hr class="semi" />
    </article>
  </div>
</template>

<style scoped></style>
