<script setup>
import { ref, onMounted } from "vue";
import Gallery from "@/components/Gallery.vue";
import usePhotoCrud from "../modules/imgCrud";

// Destructure methods and state from imgCrud
const { getSpecificPhoto, state, documentID } = usePhotoCrud();

const isDataLoaded = ref(false);

onMounted(async () => {
  await getSpecificPhoto(documentID.value);
  isDataLoaded.value = true;
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

      <!--  <Gallery
          :galleryID="'all-images-gallery'"
          :images="state.value.photos"
        /> -->
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
