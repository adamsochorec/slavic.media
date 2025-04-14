<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import services from "@/composables/modules/services";

const { state, getAllServices } = services();
const otherServices = ref([]);
const props = defineProps({
  excludeServiceId: {
    type: String,
    required: true,
  },
});

onMounted(async () => {
  await getAllServices();
  otherServices.value = state.value.services.filter(
    (service) => service._id !== props.excludeServiceId
  );
});

watch(
  () => props.excludeServiceId,
  (newId) => {
    otherServices.value = state.value.services.filter(
      (service) => service._id !== newId
    );
  }
);
</script>

<template>
  <section class="wrapper-wide">
    <hr class="semi" />
    <h3>More from our <span class="gradient">services</span></h3>
    <hr class="quater reveal" />
    <section class="gallery reveal" aria-label="Services">
      <galleryItem
        v-for="service in otherServices"
        :key="service._id"
        :img="service._id"
        :opacity="0.5"
        :url="`/services/${service._id}`"
        :title="service._id"
        :alt="`${service._id} services cover`"
        :desc="service.desc"
        :icon="service.icon"
      />
    </section>
  </section>
</template>

<style scoped>
.gallery {
  grid-template-columns: repeat(3, 1fr);
}
@media only screen and (max-width: 667px) {
  .gallery {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
