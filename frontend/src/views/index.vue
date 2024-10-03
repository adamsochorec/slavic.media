<script setup>
import { ref } from "vue";
import HeroVideo from "../components/HeroVideo.vue";
import ContactDialog from "../components/ContactDialog.vue";

// Example products data
const products = ref([
  { name: "Product 1", image: "product1.jpg" },
  { name: "Product 2", image: "product2.jpg" },
  { name: "Product 3", image: "product3.jpg" },
]);

// Example carousel items data
const carouselItems = ref([
  {
    title: "Slide 1",
    description: "Description for Slide 1",
    image: "https://via.placeholder.com/800x400",
  },
  {
    title: "Slide 2",
    description: "Description for Slide 2",
    image: "https://via.placeholder.com/800x400",
  },
  {
    title: "Slide 3",
    description: "Description for Slide 3",
    image: "https://via.placeholder.com/800x400",
  },
]);

// Responsive options for the product carousel
const responsiveOptions = ref([
  {
    breakpoint: "1024px",
    numVisible: 3,
    numScroll: 1,
  },
  {
    breakpoint: "768px",
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: "560px",
    numVisible: 1,
    numScroll: 1,
  },
]);
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
    </article>
    <Carousel
      :value="products"
      :numVisible="3"
      :numScroll="1"
      :responsiveOptions="responsiveOptions"
      circular
      :autoplayInterval="3000"
    >
      <template #item="slotProps">
        <div class="border border-surface-200 dark:border-surface-700 rounded">
          <div class="mb-4">
            <div class="relative mx-auto">
              <img
                :src="
                  'https://primefaces.org/cdn/primevue/images/product/' +
                  slotProps.data.image
                "
                :alt="slotProps.data.name"
                class="w-full rounded"
              />
            </div>
          </div>
          <div class="mb-4 font-medium">
            <h4>{{ slotProps.data.name }}</h4>
          </div>
        </div>
      </template>
    </Carousel>

    <ContactDialog />
  </div>
</template>

<style scoped></style>
