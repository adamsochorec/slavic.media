<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import Breadcrumb from "primevue/breadcrumb";

const home = ref({
  icon: "pi pi-home",
  route: "/",
});
const items = ref([]);

const route = useRoute();

const generateBreadcrumbItems = () => {
  const matchedRoutes = route.matched;
  items.value = matchedRoutes.map((routeRecord) => ({
    label: routeRecord.meta.breadcrumb || routeRecord.name,
    route: routeRecord.path,
  }));
};

watch(route, generateBreadcrumbItems, { immediate: true });
</script>
<template>
  <Breadcrumb class="dark:bg-surface-800" :home="home" :model="items">
    <template #item="{ item, props }">
      <router-link
        v-if="item.route"
        v-slot="{ href, navigate }"
        :to="item.route"
        custom
      >
        <a :href="href" v-bind="props.action" @click="navigate">
          <span :class="[item.icon]" />
          <span class="text-primary font-semibold">{{ item.label }}</span>
        </a>
      </router-link>
      <a v-else :href="item.url" :target="item.target" v-bind="props.action">
        <span :class="[item.icon, 'text-color']" />
        <span class="text-primary font-semibold">{{ item.label }}</span>
      </a>
    </template>
  </Breadcrumb>
</template>
