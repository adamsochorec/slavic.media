<script setup>
import { ref, onMounted } from "vue";
import legal from "../modules/legal";
const { state, getAllLegal } = legal();
const isDataLoaded = ref(false);

onMounted(async () => {
  await getAllLegal();
  isDataLoaded.value = true;
});
</script>
<template>
  <div class="main" style="margin-top: 120px">
    <article class="wrapper-standard" v-if="isDataLoaded">
      <div class="grid-container caption-container">
        <div class="grid-item">
          <h1 class="reveal" aria-label="Video Services">
            <span
              class="pi pi-briefcase"
              style="font-size: var(--font-size-6)"
            ></span
            >&nbsp;Legal
          </h1>
        </div>
        <div class="grid-item">
          <p class="reveal">
            Before using Slavic Media services or digital products, you may
            review the terms and conditions of end user software license
            agreements.
          </p>
        </div>
      </div>

      <hr class="reveal" role="separator" />

      <div
        v-for="legal in state.legals"
        :key="legal._id"
        class="swiper-slide"
        role="region"
      >
        <ul>
          <li class="reveal" style="font-size: var(--font-size-5)">
            <router-link :to="`/legal/${legal._id}`"
              >{{ legal.title }} <span class="pi pi-arrow-right"></span
            ></router-link>
          </li>
        </ul>
      </div>
      <hr class="reveal" role="separator" />
    </article>
    <article class="wrapper-standard" v-else>
      <div v-for="n in 6" :key="n">
        <ul style="list-style: none" class="m-0">
          <li class="mb-3">
            <div class="flex">
              <Skeleton
                shape="circle"
                size="4rem"
                class="mr-2"
                style="background-color: rgb(var(--dark-grey-color))"
              ></Skeleton>
              <div class="self-center" style="flex: 1">
                <Skeleton
                  style="background-color: rgb(var(--dark-grey-color))"
                  width="100%"
                  class="mb-2"
                ></Skeleton>
                <Skeleton
                  style="background-color: rgb(var(--dark-grey-color))"
                  width="75%"
                ></Skeleton>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </article>
  </div>
</template>
<style lang="scss" scoped>
ol {
  list-style-type: decimal;
}
</style>
