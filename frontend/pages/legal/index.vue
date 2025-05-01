<script setup lang="ts">
const { data: posts } = await useAsyncData("legal", () =>
  queryCollection("legal").all()
);
</script>

<template>
  <article class="main" style="margin-top: 120px">
    <section class="wrapper-wide" role="region">
      <h1>Legal</h1>
      <ul>
        <li v-for="post in posts" :key="post.slug">
          <a :href="`/legal/${post.slug}`">{{ post.title }}</a>
        </li>
      </ul>
    </section>
  </article>
</template>

<style lang="scss" scoped>
.grid-container {
  grid-template-columns: repeat(1, 1fr);
  display: grid;
  grid-gap: var(--grid-gap-3);
  height: auto;
  border-radius: var(--border-radius-1);
  color: white;
}
.grid-container .grid-item:nth-child(odd) {
  margin-right: var(--grid-gap-2);
}
h1 {
  font-size: var(--font-size-2);
}
@media only screen and (max-width: 500px) {
  .hide {
    display: none;
  }
}
@media only screen and (min-width: 500px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media only screen and (min-width: 700px) {
  .grid-container {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
