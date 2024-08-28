<script setup>
import { ref, onMounted, watch } from "vue";
import todocrud from "../modules/todocrud";
import Chip from "primevue/chip";
import Divider from "primevue/divider";
import Breadcrumb from "primevue/breadcrumb";

// Destructure methods and state from todocrud
const { getSpecificDocument, article, documentID } = todocrud();

onMounted(() => {
  getSpecificDocument(documentID.value);
});

const home = ref({
  icon: "pi pi-home",
  route: "/",
});
const items = ref([{ label: article.value.title }]);

watch(
  () => article.value.title,
  (newTitle) => {
    items.value = [{ label: "Blog", route: "./" }, { label: newTitle }];
  }
);
</script>

<template>
  <article class="wrapper-standard">
    <h1>{{ article.title }}</h1>
    <Breadcrumb :home="home" :model="items">
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
          <span class="text-surface-700 dark:text-surface-0">{{
            item.label
          }}</span>
        </a>
      </template>
    </Breadcrumb>

    <img
      :src="article.thumbnail"
      style="
        aspect-ratio: 4/3;
        object-fit: cover;
        border-radius: var(--border-radius-1);
      "
    />
    <Chip
      v-for="(keyword, index) in article.keywords"
      :key="index"
      :label="keyword"
    />
    <Chip :label="article.author" :image="article.authorThumbnail" />
    <Divider align="center" type="solid">
      <span
        style="color: rgb(var(--white-color)); font-size: var(--font-size-8)"
        >Date posted: {{ article.date }}</span
      >
    </Divider>

    <p>{{ article.content }}</p>
  </article>
</template>
<style lang="scss" scoped></style>
