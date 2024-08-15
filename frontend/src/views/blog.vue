<template>
  <div class="pizzas-container">
    <router-link
      :to="`/blog/${article.id}`"
      class="pizza-link"
      v-for="article in state.articles"
      :key="article._id"
      :class="{
        'pizza-item': true,
      }"
    >
      <h3>
        {{ article.title }}
      </h3>
      <img :src="article.thumbnail" />

      <br />
    </router-link>
  </div>
</template>

<script>
import todocrud from "../modules/todocrud";
import { onMounted } from "vue";
export default {
  setup() {
    const {
      state,
      getAllDocuments,
      newDocument,
      deleteDocument,
      editDocument,
    } = todocrud();

    onMounted(() => {
      getAllDocuments();
    });

    return {
      state,
      getAllDocuments,
      newDocument,
      deleteDocument,
      editDocument,
    };
  },
};
</script>

<style lang="scss" scoped></style>
