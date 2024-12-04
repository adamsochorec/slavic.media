<script setup lang="ts">
import { ref, onMounted } from "vue";
import legal from "@/modules/legal";

interface Legal {
  _id: string;
  title: string;
}

interface State {
  legals: Legal[];
}

const { state, getAllLegal } = legal();
const isDataLoaded = ref<boolean>(false);

onMounted(async () => {
  await getAllLegal();
  isDataLoaded.value = true;
});
</script>

<template>
  <article class="main" style="margin: 120px 0">
    <section class="wrapper-standard">
      <h1 class="reveal">
        The<span class="gradient"> Slavic Media</span> Legal
      </h1>
      <br />
      <p class="reveal">
        Before using Slavic Media services or digital products, you may review
        the terms and conditions of end user software license agreements.
      </p>
      <hr class="quater reveal" />
      <ol v-if="isDataLoaded">
        <li
          v-for="legal in state.legals"
          :key="legal._id"
          style="font-size: var(--font-size-6)"
        >
          <router-link :to="`/legal/${legal._id}`"
            >{{ legal.title }} <span class="pi pi-arrow-right"></span
          ></router-link>
        </li>
      </ol>
      <div v-else v-for="n in 3" :key="n">
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
                  borderRadius="10px"
                  height="10px"
                  class="mb-2"
                ></Skeleton>
                <Skeleton
                  borderRadius="10px"
                  height="10px"
                  style="background-color: rgb(var(--dark-grey-color))"
                  width="75%"
                ></Skeleton>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
  </article>
</template>

<style lang="scss" scoped>
ol {
  list-style: decimal;
}
</style>
