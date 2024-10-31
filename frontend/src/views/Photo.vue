<script setup>
import { ref, onMounted } from "vue";
import gallery from "@/components/Gallery.vue";
import contactForm from "@/components/contact-form.vue";

import axios from "axios";
import useImgCrud from "@/modules/imgCrud";

// Destructure getSpecificImg and img from useImgCrud
const { getSpecificImg, img } = useImgCrud();

const logoImage = ref(null);
const photoServices = ref([
  {
    title: "Colorful Portrait",
    handle: "portrait",
    description:
      "Through bold colors and deep eye contact, each portrait captures the true essence of who you are—moments that feel real and connect on a personal level.",
    column1: ["2021-11-13-02059", "hvalp"],
    column2: ["2021-08-24-01615", "2021-09-05-01666"],
    column3: ["2021-04-25-00693", "2021-05-28-01020", "2023-11-13-00267"],
    column4: ["2021-06-24-01233-2", "2023-04-03-08707"],
  },
  {
    title: "Immersive Outdoor",
    handle: "outdoor",
    description:
      "From the tundra to the desert, we specialize in capturing the raw beauty of nature. Our outdoor photography brings wild, untamed landscapes to life.",
    column1: ["2022-12-03-000465", "2024-03-10-00620", "2023-12-02-00459"],
    column2: [
      "2023-11-30-00006",
      "2023-12-01-00250",
      "2024-03-10-00496",
      "2023-12-01-00064",
    ],
    column3: ["2024-03-10-00238", "2022-10-15-00970", "2024-05-11-00184"],
    column4: ["2023-08-29-01113", "2023-08-29-01096", "2023-08-29-01059"],
  },
  {
    title: "Timeless Still",
    handle: "still",
    description:
      "Magnificent moments from concerts, theatre, and live performances—capturing raw emotions and deep eye contact that bring every gesture and glance to life.",
    column1: ["2023-09-09-10507", "2021-06-24-01208"],
    column2: ["2023-09-01-00086", "2023-09-09-10524", "2023-09-29-00163"],
    column3: ["2023-06-22-00033", "2022-06-28-00708", "2023-05-12-08965"],
    column4: ["2023-05-27-00025", "2023-09-22-00026", "2023-05-12-08969"],
  },
]);

const isDataLoaded = ref(false);
const imagesData = ref([]);

onMounted(async () => {
  // Fetch specific image with ID "Primary-1"
  await getSpecificImg("Primary-1");
  logoImage.value = img.value;

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

    // Structure the imagesData into columns and categories
    const structuredData = photoServices.value.map((service) => {
      return {
        ...service,
        column1: response.data.filter((img) =>
          service.column1.includes(img.id)
        ),
        column2: response.data.filter((img) =>
          service.column2.includes(img.id)
        ),
        column3: response.data.filter((img) =>
          service.column3.includes(img.id)
        ),
        column4: response.data.filter((img) =>
          service.column4.includes(img.id)
        ),
      };
    });

    imagesData.value = structuredData;
    isDataLoaded.value = true;
  } catch (error) {
    console.error("Error fetching images:", error);
  }
});
</script>

<template>
  <article class="wrapper-wide main" style="margin-top: 120px">
    <div v-if="isDataLoaded">
      <contactForm></contactForm>

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
            <router-link
              class="popup-with-form reveal"
              href="#request-a-proposal"
            >
              <div class="cta">
                Request a Proposal<i class="pi pi-arrow-right"></i>
              </div>
            </router-link>
          </div>
        </div>
      </Fluid>

      <gallery :galleryID="'all-images-gallery'" :images="imagesData" />
      <hr class="semi" />
      <!-- CTA SECTION -->
      <Fluid>
        <div class="grid grid-cols-2 gap-4">
          <router-link
            class="popup-with-form reveal"
            href="#request-a-proposal"
          >
            <div class="cta">
              Request a Proposal<i class="pi pi-arrow-right"></i>
            </div>
          </router-link>
          <router-link class="reveal active" href="https://store.slavic.media/">
            <div class="cta-secondary cta">
              Our Lightroom Presets<i
                class="fa-solid fa-arrow-right"
                aria-hidden="true"
              ></i>
            </div>
          </router-link>
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
  </article>
</template>

<style lang="scss" scoped></style>
