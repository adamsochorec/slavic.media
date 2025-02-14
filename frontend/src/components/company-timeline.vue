<script setup lang="ts">
import { ref, onMounted } from "vue";
import { mmmyyyy } from "@/functions/date-format.ts";
import event from "@/modules/event";

const { state, getAllEvents } = event();
const isDataLoaded = ref<boolean>(false);

// SHOW MORE START
const EVENTS_INCREMENT = 6;
const eventsToShow = ref(EVENTS_INCREMENT);
const loadMoreEvents = () => {
  eventsToShow.value += EVENTS_INCREMENT;
};
// SHOW MORE END

onMounted(async () => {
  await getAllEvents();
  isDataLoaded.value = true;
});
</script>

<template>
  <section class="wrapper-standard" role="region">
    <h2 class="reveal" style="font-size: var(--font-size-1)">
      Company <span class="gradient">Journey</span>
    </h2>
    <br />
    <!--  COMPANY TIMELINE START  -->
    <div v-if="isDataLoaded">
      <Timeline
        align="alternate"
        :value="state.events.slice(0, eventsToShow)"
        aria-busy="false"
        aria-labelledby="company-timeline"
      >
        <template #marker="slotProps">
          <span class="flex h-8 items-center justify-center">
            <span :class="`pi pi-${slotProps.item.icon}`"></span>
          </span>
        </template>
        <template #content="slotProps">
          <div>
            <p class="reveal">
              {{ mmmyyyy(slotProps.item.date) }}
            </p>
            <p class="reveal" style="font-size: var(--font-size-8)">
              {{ slotProps.item.desc }}
            </p>
          </div>
        </template>
      </Timeline>
      <div class="flex-center">
        <button
          v-if="eventsToShow < state.events.length"
          @click="loadMoreEvents"
          class="cta reveal"
        >
          Show More
        </button>
      </div>
    </div>
    <!--  COMPANY TIMELINE END  -->

    <!--  COMPANY TIMELINE SKELETON START  -->
    <div v-else v-for="n in 4" :key="n" aria-busy="true" aria-live="polite">
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
                class="mb-2"
                height="10px"
              ></Skeleton>
              <Skeleton
                style="background-color: rgb(var(--dark-grey-color))"
                width="75%"
                height="10px"
                borderRadius="10px"
              ></Skeleton>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!--  COMPANY TIMELINE SKELETON END  -->
  </section>
</template>
