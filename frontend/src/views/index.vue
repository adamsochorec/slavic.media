<script setup>
import HeroVideo from "@/components/HeroVideo.vue";
import ContactDialog from "@/components/ContactDialog.vue";
import SwiperClients from "@/components/SwiperClients.vue";
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
    </article>

    <ContactDialog />
  </div>
</template>

<style scoped></style>
