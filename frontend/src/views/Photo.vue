<script setup>
import { ref, onMounted } from "vue";
import Gallery from "@/components/Gallery.vue";
import usePhotoCrud from "./modules/photoCrud";

// Destructure methods and state from photoCrud
const { getSpecificPhoto, /* photo, */ documentID } = usePhotoCrud();

const isDataLoaded = ref(false);

onMounted(async () => {
  await getSpecificPhoto(documentID.value);
  isDataLoaded.value = true;
});
</script>

<template>
  <article class="wrapper-wide">
    <hr class="semi" />
    <Fluid>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <h1 style="font-size: var(--font-size-1)">
            <span class="highlited tuscher">Photo</span> Services
          </h1>
        </div>
        <div>
          <p class="mb-5">
            Whether it’s a dynamic performance, a powerful portrait, or the vast
            outdoors, our photography captures authentic moments, rich in detail
            and emotion, that tell your story.
          </p>
          <ContactDialog />
        </div>
      </div>
      <hr />
    </Fluid>
    <div v-for="content in contents" :key="content.id">
      <div :id="content.url"></div>
      <Fluid>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <h1 style="font-size: var(--font-size-2)">
              {{ content.title.split(" ")[0] }}
              <span class="highlited tuscher">{{
                content.title.split(" ")[1]
              }}</span>
            </h1>
          </div>
          <div>
            <p class="mb-5">
              {{ content.description }}
            </p>
          </div>
        </div>
        <hr class="semi" />
      </Fluid>
      <Gallery
        :galleryID="content.id + '-gallery'"
        :images="{
          column1: content.column1,
          column2: content.column2,
          column3: content.column3,
          column4: content.column4,
        }"
      />
      <hr />
    </div>
    <!-- CTA SECTION -->
    <Fluid>
      <div class="grid grid-cols-2 gap-4">
        <ContactDialog />

        <Button
          as="a"
          label="Our Lightroom Presets"
          href="https://store.slavic.media"
          rounded
        /></div
    ></Fluid>
    <hr class="semi" />
  </article>
</template>

<style lang="scss" scoped></style>
