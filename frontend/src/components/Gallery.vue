<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";

const props = defineProps({
  galleryID: String,
  images: Object, // Ensure this is an object containing nested arrays
});

const imagesData = ref({
  column1: props.images.column1 || [],
  column2: props.images.column2 || [],
  column3: props.images.column3 || [],
  column4: props.images.column4 || [],
});
let lightbox = null;

onMounted(() => {
  console.log("onMounted: Initializing PhotoSwipeLightbox");
  if (!lightbox) {
    lightbox = new PhotoSwipeLightbox({
      gallery: "#gallery-" + props.galleryID,
      children: "a",
      pswpModule: () => import("photoswipe"),
    });
    lightbox.init();
    console.log("PhotoSwipeLightbox initialized");
  }
});

onUnmounted(() => {
  console.log("onUnmounted: Destroying PhotoSwipeLightbox");
  if (lightbox) {
    lightbox.destroy();
    lightbox = null;
    console.log("PhotoSwipeLightbox destroyed");
  }
});
</script>

<template>
  <div class="row" :id="'gallery-' + galleryID">
    <div
      v-for="(column, columnIndex) in imagesData"
      :key="columnIndex"
      class="column"
    >
      <a
        v-for="(image, imageIndex) in column"
        :key="imageIndex"
        :href="image.largeURL"
        :data-pswp-width="image.width"
        :data-pswp-height="image.height"
        @click.prevent="handleClick(imageIndex)"
        :title="image.title"
      >
        <img
          class="mt-3"
          :src="image.thumbnailURL"
          :title="image.title"
          :alt="image.alt"
        />
      </a>
    </div>
  </div>
</template>

<script>
function handleClick(imageIndex) {
  console.log(`Image ${imageIndex} clicked`);
}
</script>

<style lang="scss" scoped>
.popup-gallery img {
  cursor: pointer;
}
small a {
  color: rgb(var(--white-color)) !important;
}
.row img {
  height: unset;
  width: unset;
}
.row {
  display: -ms-flexbox; /* IE10 */
  display: -webkit-box;
  display: flex;
  -ms-flex-wrap: wrap; /* IE10 */
  flex-wrap: wrap;
}
.column {
  -ms-flex: 100%; /* IE10 */
  -webkit-box-flex: 100%;
  flex: 100%;
  max-width: 100%;
}
.column:nth-child(2) {
  padding-left: var(--grid-gap-1);
  padding-right: calc(var(--grid-gap-1) / 2);
}
.column:nth-child(3) {
  padding-right: var(--grid-gap-1);
  padding-left: calc(var(--grid-gap-1) / 2);
}
@media only screen and (min-width: 538px) {
  .column {
    -ms-flex: 50%;
    -webkit-box-flex: 50%;
    flex: 50%;
    max-width: 50%;
  }
}
@media only screen and (min-width: 850px) {
  .column {
    -ms-flex: 25%;
    -webkit-box-flex: 25%;
    flex: 25%;
    max-width: 25%;
  }
}
</style>
