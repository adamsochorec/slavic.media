<script setup lang="ts">
import { ref, onMounted } from "vue";
import { mmmyyyy } from "@/composables/useDateFormat";
import { useLoadMore } from "@/composables/useLoadMore";

// LOAD MORE START
const { itemsToShow, allItemsShown, loadMore, loadLess } = useLoadMore(6, 6);

// Fetch and sort events by date (descending order)
const {
  data: events,
  pending,
  error,
} = await useFetch("https://api.slavic.media/event/");
</script>

<template>
  <section class="wrapper-standard">
    <h2 class="docs reveal" style="font-size: var(--font-size-1)">
      Our <span class="gradient">Journey</span>
    </h2>

    <!-- SKELETON START -->
    <div v-if="pending || error" aria-busy="true" aria-live="polite">
      <ul v-for="n in 4" :key="n" style="list-style: none" class="m-0">
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
    <!-- SKELETON END -->
    <!-- COMPANY TIMELINE START -->
    <div v-else>
      <Timeline
        align="alternate"
        :value="events.slice(0, itemsToShow)"
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
              {{ slotProps.item.description }}
            </p>
          </div>
        </template>
      </Timeline>
      <div class="flex-center">
        <Btn
          v-if="!allItemsShown"
          tag="button"
          label="Show more"
          icon="plus-circle"
          variant="secondary"
          @click="loadMore(events.length)"
        />
        <Btn
          v-else
          label="Show less"
          tag="button"
          icon="minus-circle"
          variant="secondary"
          @click="loadLess"
        />
      </div>
    </div>
    <!-- COMPANY TIMELINE END -->
  </section>
</template>
