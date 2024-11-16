<script setup>
import { ref, onMounted } from "vue";
import legal from "../modules/legal";
import { DotLottieVue } from "@lottiefiles/dotlottie-vue";
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
      <div
        class="grid-container caption-container reveal"
        role="region"
        aria-label="Services"
      >
        <div class="grid-item">
          <h1 class="reveal">Legal</h1>
          <br />
          <p class="reveal">
            Before using Slavic Media services or digital products, you may
            review the terms and conditions of end user software license
            agreements.
          </p>
        </div>
        <div class="grid-item">
          <DotLottieVue
            class="reveal"
            background="transparent"
            speed="1"
            loop
            autoplay
            aria-label="Page not found animation."
            style="height: auto; width: 100%"
            src="https://lottie.host/19202777-715b-4539-8f9c-b15c7c9fd299/Y2uxrYvdro.lottie"
          />
        </div>
      </div>
      <br />
      <ol>
        <li
          v-for="legal in state.legals"
          :key="legal._id"
          class="reveal"
          style="font-size: var(--font-size-6)"
        >
          <router-link :to="`/legal/${legal._id}`"
            >{{ legal.title }} <span class="pi pi-arrow-right"></span
          ></router-link>
        </li>
      </ol>
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
  list-style: decimal;
}
</style>
