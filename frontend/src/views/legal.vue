<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import legal from "@/modules/legal";

interface Legal {
  _id: string;
  title: string;
}

interface State {
  legals: Legal[];
}
const updateImageSrc = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.src = target.dataset.src!;
};
const { state, getAllLegal } = legal();
const isDataLoaded = ref<boolean>(false);
const route = useRoute();

onMounted(async () => {
  await getAllLegal();
  isDataLoaded.value = true;
});
</script>

<template>
  <article class="main">
    <section class="cover">
      <div class="filter"></div>
      <img
        :src="`https://cdn.slavic.media/img/2024-12-08-01324-2/thumbnail`"
        :data-src="`https://cdn.slavic.media/img/2024-12-08-01324-2/hd`"
        :alt="`${state.legal?.title} cover image`"
        @load="updateImageSrc"
      />

      <div v-if="isDataLoaded" class="title wrapper-standard reveal">
        <h1 class="reveal" role="heading" aria-level="1">Legal</h1>
      </div>
    </section>
    <hr class="semi" role="separator" />
    <further-legal
      v-if="isDataLoaded"
      :legals="state.legals"
      :current-id="route.params.id"
      :highlight-current="true"
    ></further-legal>
    <section class="wrapper-standard">
      <hr v-if="isDataLoaded" class="reveal" role="separator" />
      <p v-if="isDataLoaded" class="reveal">
        Before using Slavic Media services or digital products, you may review
        the terms and conditions of end user software license agreements.
      </p>
      <div v-else v-for="n in 3" :key="n" aria-busy="true" aria-live="polite">
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
