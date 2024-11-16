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
      <h1 class="reveal">Legal</h1>
      <br />
      <p class="reveal">
        Before using Slavic Media services or digital products, you may review
        the terms and conditions of end user software license agreements.
      </p>
      <hr class="reveal" role="separator" />
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
