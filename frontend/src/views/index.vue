<script setup>
// CAROUSEL
const products = [
  {
    id: 1,
    name: "Photo Services",
    image: "https://slavic.media/img/cover-photo.jpg",
  },
  {
    id: 2,
    name: "Video Services",
    image: "https://slavic.media/img/cover-video.jpg",
  },
  {
    id: 3,
    name: "Drone Services",
    image: "https://slavic.media/img/cover-drone.jpg",
  },
  {
    id: 4,
    name: "Real Estate",
    image: "https://slavic.media/img/cover-realestate.jpg",
  },
  {
    id: 5,
    name: "Graphic Design",
    image: "https://slavic.media/img/cover-realestate.jpg",
  },
];

const responsiveOptions = [
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
];
</script>
<script setup></script>
<template>
  <article>
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
    <Button
      label="Request a Proposal"
      icon="pi pi-chevron-right"
      iconPos="right"
    />
  </article>
</template>

<style lang="scss" scoped></style>
