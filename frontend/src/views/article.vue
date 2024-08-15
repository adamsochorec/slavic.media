<template lang="">
  <article class="wrapper-standard">
    <form @submit.prevent="submitForm" class="totodetail">
      <h1>{{ article.title }}</h1>
      <img :src="article.thumbnail" />
      <h6>{{ article.date }}, {{ article.author }}</h6>
      <hr />
      <p>{{ article.content }}</p>
      <hr />
    </form>
  </article>
</template>
<script>
import todocrud from "../modules/todocrud";
import { onMounted } from "vue";
export default {
  setup() {
    const { editDocument, state, getSpecificDocument, article, documentID } =
      todocrud();

    onMounted(() => {
      getSpecificDocument(documentID.value);
    });

    return {
      article,
      documentID,
      getSpecificDocument,
      state,
      editDocument,
    };
  },
};
</script>
<style lang="scss" scoped></style>
