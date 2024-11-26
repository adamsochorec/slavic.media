<script setup>
import { ref, onMounted } from "vue";
import asset from "@/modules/assets";
const { state, getAllAssets } = asset();
const isDataLoaded = ref(false);

onMounted(async () => {
  await getAllAssets();
  isDataLoaded.value = true;
});
</script>

<template>
  <div class="main" style="margin-top: 120px">
    <article class="wrapper-wide">
      <h1 id="pagePathHeading" class="reveal" role="heading" aria-level="1">
        The<span class="gradient"> Slavic Media</span> Assets
      </h1>
      <hr class="reveal" role="separator" aria-label="Separator" />
      <!-- PRESS MATERIALS GRID START -->
      <div
        class="reveal"
        id="gallery-press"
        role="grid"
        aria-label="Press Materials Grid"
        v-if="isDataLoaded"
      >
        <a
          v-for="asset in state.assets"
          :key="asset._id"
          class="gallery-item"
          :href="`assets/${asset._id}.${asset.type}`"
          target="_blank"
        >
          <h2>
            {{ asset.title }}
          </h2>

          <div
            class="grid-item"
            role="gridcell"
            :style="{
              backgroundImage: `url(https://slavic.media/img/${asset._id}.png)`,
            }"
          ></div>
          <p>
            {{ asset.desc }}
          </p>
        </a>
      </div>
      <div class="reveal" id="gallery-press" v-else>
        <div v-for="n in 3" :key="n" class="card">
          <Skeleton
            style="background-color: rgb(var(--dark-grey-color))"
            class="p-6"
            width="100%"
            height="130px"
          ></Skeleton>
          <div>
            <Skeleton
              width="80%"
              height="10px"
              style="background-color: rgb(var(--dark-grey-color))"
              class="mt-2"
            ></Skeleton>
            <Skeleton
              width="60%"
              style="background-color: rgb(var(--dark-grey-color))"
              class="mt-2"
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
                ></Skeleton>
                <Skeleton
                  width="5rem"
                  style="background-color: rgb(var(--dark-grey-color))"
                  class="mb-2"
                  height="10px"
                ></Skeleton>
                <Skeleton
                  style="background-color: rgb(var(--dark-grey-color))"
                  class=""
                  height="10px"
                ></Skeleton>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- PRESS MATERIALS GRID END -->
    </article>
  </div>
</template>

<style lang="scss" scoped>
h1 {
  font-size: var(--font-size-2);
}
#gallery-press {
  display: grid;
  grid-gap: var(--grid-gap-3);
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
}
#gallery-press .gallery-item p {
  font-size: var(--font-size-6);
  padding: unset;
  opacity: 1;
  -webkit-transform: unset;
  -ms-transform: unset;
  transform: unset;
}
#gallery-press .grid-item {
  height: var(--dimension-2);
}
#gallery-press .gallery-item {
  margin-bottom: var(--grid-gap-3);
}
#gallery-press .grid-item {
  -webkit-box-shadow: var(--box-shadow-1);
  box-shadow: var(--box-shadow-1);
  margin: var(--grid-gap-1) 0;
}
#gallery-press a:hover h2 {
  text-decoration: underline;
}
#gallery-press a:hover p {
  text-decoration: none !important;
  opacity: 100;
}
#gallery-press .grid-item {
  width: 100%;
  height: auto;
  aspect-ratio: 4/3;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
  position: relative;
}

#gallery-press .gallery-item,
#gallery-press .gallery-item::after,
#gallery-press .gallery-item:hover,
#gallery-press .grid-item,
#gallery-press .grid-item::after,
#gallery-press .grid-item:hover {
  border-radius: var(--border-radius-1);
  -webkit-transition: var(--transition-1);
  -o-transition: var(--transition-1);
  transition: var(--transition-1);
}

#gallery-press .grid-item span p,
#gallery-press .grid-item span p i {
  color: rgb(var(--primary-color));
}
#gallery-press .grid-item:focus::after,
#gallery-press .grid-item:hover::after {
  -webkit-transform: scale(1.05);
  -ms-transform: scale(1.05);
  transform: scale(1.05);
}
#gallery-press .grid-item::after {
  background: inherit;
  background-size: cover;
  bottom: 0;
  content: "";
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  -webkit-transform-origin: center;
  -ms-transform-origin: center;
  transform-origin: center;
}
@media only screen and (max-width: 667px) {
  .gallery .gallery-item span {
    font-size: var(--font-size-8);
  }
  #gallery-press {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
  }
}
@media only screen and (min-height: 700px) and (min-width: 1500px) {
  footer {
    position: absolute;
    bottom: 0;
  }
}
</style>
