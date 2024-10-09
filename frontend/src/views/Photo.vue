<script setup>
import { ref, onMounted } from "vue";
import Gallery from "@/components/Gallery.vue";
import axios from "axios";

const photoServices = ref([
  {
    title: "Colorful Portrait",
    handle: "portrait",
    description:
      "Through bold colors and deep eye contact, each portrait captures the true essence of who you are—moments that feel real and connect on a personal level.",
    column1: ["6706d60884261508ac6b1d24", "6706d60884261508ac6b1d25"],
    column2: [
      "6706d60884261508ac6b1d26",
      "6706d60884261508ac6b1d27",
      "6706d60884261508ac6b1d28",
    ],
    column3: [
      "6706d60884261508ac6b1d29",
      "6706d60884261508ac6b1d2a",
      "6706d60884261508ac6b1d2b",
    ],
    column4: ["6706d60884261508ac6b1d2c", "6706d60884261508ac6b1d2d"],
  },
  {
    title: "Immersive Outdoor",
    handle: "outdoor",
    description:
      "From the tundra to the desert, we specialize in capturing the raw beauty of nature. Our outdoor photography brings wild, untamed landscapes to life.",
    column1: [
      "6706d60884261508ac6b1d2e",
      "6706d60884261508ac6b1d2f",
      "6706d60884261508ac6b1d30",
    ],
    column2: [
      "6706d60884261508ac6b1d31",
      "6706d60884261508ac6b1d32",
      "6706d60884261508ac6b1d33",
      "6706d60884261508ac6b1d34",
    ],
    column3: [
      "6706d60884261508ac6b1d35",
      "6706d60884261508ac6b1d36",
      "6706d60884261508ac6b1d37",
    ],
    column4: [
      "6706d60884261508ac6b1d38",
      "6706d60884261508ac6b1d39",
      "6706d60884261508ac6b1d3a",
    ],
  },
  {
    title: "Timeless Still",
    handle: "still",
    description:
      "Magnificent moments from concerts, theatre, and live performances—capturing raw emotions and deep eye contact that bring every gesture and glance to life.",
    column1: ["6706d60884261508ac6b1d3b", "6706d60884261508ac6b1d3c"],
    column2: [
      "6706d60884261508ac6b1d3d",
      "6706d60884261508ac6b1d3e",
      "6706d60884261508ac6b1d3f",
    ],
    column3: [
      "6706d60884261508ac6b1d40",
      "6706d60884261508ac6b1d41",
      "6706d60884261508ac6b1d42",
    ],
    column4: [
      "6706d60884261508ac6b1d43",
      "6706d60884261508ac6b1d44",
      "6706d60884261508ac6b1d45",
    ],
  },
]);

const isDataLoaded = ref(false);
const imagesData = ref([]);

onMounted(async () => {
  const imageIds = photoServices.value.flatMap((service) => [
    ...service.column1,
    ...service.column2,
    ...service.column3,
    ...service.column4,
  ]);

  try {
    const response = await axios.post("https://api.slavic.media/img/by-ids", {
      ids: imageIds,
    });
    imagesData.value = response.data;
    isDataLoaded.value = true;
  } catch (error) {
    console.error("Error fetching images:", error);
  }
});
</script>

<template>
  <article class="wrapper-wide">
    <hr class="semi" />

    <div v-if="isDataLoaded">
      <Fluid>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <h1 style="font-size: var(--font-size-1)">
              <span class="highlited tuscher">Photo</span> Services
            </h1>
          </div>
          <div>
            <p class="mb-5">
              Whether it’s a dynamic performance, a powerful portrait, or the
              vast outdoors, our photography captures authentic moments, rich in
              detail and emotion, that tell your story.
            </p>
            <ContactDialog />
          </div>
        </div>
        <hr />
      </Fluid>

      <Fluid>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <h1 style="font-size: var(--font-size-2)">
              {{ photoServices.title }}
            </h1>
          </div>
          <div>
            <p class="mb-5">
              {{ photoServices.description }}
            </p>
          </div>
        </div>
        <hr class="semi" />
      </Fluid>
      <Gallery :galleryID="'all-images-gallery'" :images="imagesData" />
      <!-- CTA SECTION -->
      <Fluid>
        <div class="grid grid-cols-2 gap-4">
          <ContactDialog />
          <Button
            as="a"
            label="Our Lightroom Presets"
            href="https://store.slavic.media"
            rounded
          />
        </div>
      </Fluid>
    </div>

    <div
      v-else
      class="rounded-lg border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-800 shadow-lg mb-4 p-8"
    >
      <div class="flex mb-4">
        <Skeleton shape="circle" size="4rem" class="mr-2"></Skeleton>
        <div>
          <Skeleton width="10rem" class="mb-2"></Skeleton>
          <Skeleton width="5rem" class="mb-2"></Skeleton>
          <Skeleton height=".5rem"></Skeleton>
        </div>
      </div>
      <Skeleton width="100%" height="150px"></Skeleton>
      <div class="flex justify-between mt-4">
        <Skeleton width="4rem" height="2rem"></Skeleton>
        <Skeleton width="4rem" height="2rem"></Skeleton>
      </div>
    </div>
    <hr class="semi" />
  </article>
</template>

<style lang="scss" scoped></style>
