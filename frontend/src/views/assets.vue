<script setup lang="ts">
import { ref, onMounted } from "vue";
import asset from "@/modules/assets";
import galleryItem from "@/components/gallery-item.vue";

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

      <div class="v-else-gallery reveal" v-else>
        <div v-for="n in 3" :key="n">
          <Skeleton
            style="background-color: rgb(var(--dark-grey-color))"
            class="p-6"
            width="100%"
            height="130px"
            borderRadius="10px"
          ></Skeleton>
          <div>
            <Skeleton
              width="80%"
              height="10px"
              style="background-color: rgb(var(--dark-grey-color))"
              class="mt-2"
              borderRadius="10px"
            ></Skeleton>
            <Skeleton
              width="60%"
              style="background-color: rgb(var(--dark-grey-color))"
              class="mt-2"
              borderRadius="10px"
              height="10px"
            ></Skeleton>
            <div class="flex mt-4">
              <Skeleton
                style="background-color: rgb(var(--dark-grey-color))"
                class="mr-2"
                shape="circle"
                size="4rem"
              ></Skeleton>
              <div>
                <Skeleton
                  width="10rem"
                  height="10px"
                  style="background-color: rgb(var(--dark-grey-color))"
                  class="mb-2"
                  borderRadius="10px"
                ></Skeleton>
                <Skeleton
                  width="5rem"
                  style="background-color: rgb(var(--dark-grey-color))"
                  class="mb-2"
                  height="10px"
                  borderRadius="10px"
                ></Skeleton>
                <Skeleton
                  style="background-color: rgb(var(--dark-grey-color))"
                  borderRadius="10px"
                  height="10px"
                ></Skeleton>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- PRESS MATERIALS GRID END -->
      <hr class="semi" />
    </section>
  </article>
</template>

<style lang="scss" scoped>
.gallery,
.v-else-gallery {
  grid-template-columns: repeat(3, 1fr);
}

@media only screen and (max-width: 667px) {
  .gallery,
  .v-else-gallery {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
