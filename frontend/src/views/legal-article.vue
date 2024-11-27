<script setup>
import { ref, onMounted } from "vue";
import legal from "@/modules/legal";
import { useRoute } from "vue-router";

const { getSpecificLegal, state } = legal();
const route = useRoute();

const isDataLoaded = ref(false);

onMounted(async () => {
  await getSpecificLegal(route.params.id);
  isDataLoaded.value = true;
});
</script>
<template>
  <div class="main" style="margin-top: 120px">
    <article class="wrapper-wide">
      <div v-if="isDataLoaded">
        <h1 class="reveal" role="heading" aria-level="1">
          {{ state.legal.title }}
        </h1>

        <div class="reveal">
          <span style="font-size: var(--font-size-7)" class="pi pi-replay"
            >&nbsp;</span
          ><span style="font-size: var(--font-size-7)">{{
            state.legal.modified
          }}</span>
        </div>
        <hr class="quater reveal" role="separator" />
        <div class="article-content">
          <section
            v-for="(content, index) in state.legal.content"
            :key="index"
            v-html="content"
            v-add-class
          ></section>
        </div>
      </div>
      <div v-else>
        <div class="flex mb-4">
          <Skeleton
            style="background-color: rgb(var(--dark-grey-color))"
            shape="circle"
            size="4rem"
            class="mr-2"
          ></Skeleton>
          <div>
            <Skeleton
              style="background-color: rgb(var(--dark-grey-color))"
              width="10rem"
              class="mb-2"
            ></Skeleton>
            <Skeleton
              style="background-color: rgb(var(--dark-grey-color))"
              width="5rem"
              class="mb-2"
            ></Skeleton>
            <Skeleton
              style="background-color: rgb(var(--dark-grey-color))"
              height=".5rem"
            ></Skeleton>
          </div>
        </div>
        <Skeleton
          style="background-color: rgb(var(--dark-grey-color))"
          width="100%"
          height="150px"
        ></Skeleton>
        <div class="flex justify-between mt-4">
          <Skeleton
            style="background-color: rgb(var(--dark-grey-color))"
            width="4rem"
            height="2rem"
          ></Skeleton>
          <Skeleton
            style="background-color: rgb(var(--dark-grey-color))"
            width="4rem"
            height="2rem"
          ></Skeleton>
        </div>
        <hr class="semi" />
        <div v-for="n in 2" :key="n">
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
      </div>
    </article>
  </div>
</template>
<style lang="scss" scoped>
.grid-container {
  display: flex;
  justify-content: space-between;
}
</style>
