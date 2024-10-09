<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";

const props = defineProps({
  galleryID: String,
  images: Array, // Ensure this is an array
});

const columns = ref([[], [], [], []]);

// Watch for changes in props.images and restructure data
watch(
  () => props.images,
  (newImages) => {
    if (newImages && newImages.length) {
      // Distribute images into columns
      columns.value = newImages.map((service) => [
        service.column1,
        service.column2,
        service.column3,
        service.column4,
      ]);
    }
  },
  { immediate: true }
);

let lightbox = null;

onMounted(() => {
  if (!lightbox) {
    lightbox = new PhotoSwipeLightbox({
      gallery: "#gallery-" + props.galleryID,
      children: "a",
      pswpModule: () => import("photoswipe"),
    });
    lightbox.init();
  }
});

onUnmounted(() => {
  if (lightbox) {
    lightbox.destroy();
    lightbox = null;
  }
});
</script>

<template>
  <div class="row" :id="'gallery-' + galleryID">
    <div
      v-for="(service, serviceIndex) in columns"
      :key="serviceIndex"
      class="service"
    ><hr :id="props.images[serviceIndex].handle">
      <Fluid>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <h2 style="font-size: var(--font-size-2);">{{ props.images[serviceIndex].title }}</h2>
          </div>
          <div>
            <p class="mb-5">
              <p>{{ props.images[serviceIndex].description }}</p>
            </p>
          </div>
        </div>
        <hr class="semi" />
      </Fluid>
      <div class="columns">
        <div
          v-for="(column, columnIndex) in service"
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
.service {
  margin-bottom: 2rem;
}
.columns {
  display: flex;
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
