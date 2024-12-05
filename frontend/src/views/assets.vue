<script setup lang="ts">
import { ref, onMounted } from "vue";
import asset from "@/modules/assets";
import galleryItem from "@/components/gallery-item.vue";
import skeletonGalleryItem from "@/components/skeleton-gallery-item.vue";
interface Asset {
  _id: string;
  title: string;
  desc: string;
  type: string;
  icon: string;
}

interface State {
  assets: Asset[];
}

const { state, getAllAssets } = asset();
const isDataLoaded = ref<boolean>(false);

onMounted(async () => {
  await getAllAssets();
  isDataLoaded.value = true;
});
</script>

<template>
  <article class="main" style="margin-top: 120px">
    <section class="wrapper-wide">
      <h1 id="pagePathHeading" class="reveal" role="heading" aria-level="1">
        The<span class="gradient"> Slavic Media</span> Assets
      </h1>
      <hr class="reveal" role="separator" aria-label="Separator" />
      <!-- PRESS MATERIALS GRID START -->
      <section v-if="isDataLoaded" class="gallery" aria-label="Services">
        <galleryItem
          v-for="asset in state.assets"
          :key="asset._id"
          :img="asset._id"
          :url="`assets/${asset._id}.${asset.type}`"
          :title="asset.title"
          :desc="asset.desc"
          :opacity="0.5"
          :icon="asset.icon"
          targetWindow="_blank"
        />
      </section>
      <div v-else class="gallery">
        <div v-for="n in 3" :key="n">
          <skeletonGalleryItem></skeletonGalleryItem>
        </div>
      </div>
      <!-- PRESS MATERIALS GRID END -->
      <hr class="semi" />
    </section>
  </article>
</template>

<style lang="scss" scoped>
.gallery {
  grid-template-columns: repeat(3, 1fr);
}

@media only screen and (max-width: 667px) {
  .gallery {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
