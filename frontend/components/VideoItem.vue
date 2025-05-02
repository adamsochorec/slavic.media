<script setup lang="ts">
interface Client {
  name: string;
  url: string;
}
interface Video {
  _id: string;
  index: number;
  flag: string;
  title: string;
  url: string;
  year: string;
  client: Client;
  description?: string;
  category?: string;
}

const props = defineProps<{ video: Video }>();
</script>

<template>
  <article class="card" aria-labelledby="article-title">
    <GalleryItem
      :img="video._id"
      :description="video.description"
      :flag="video.flag"
      :category="video.category"
      :client="{
        name: video.client.name,
        url: video.client.url,
      }"
      :url="video.url"
      icon="video"
      targetWindow="_self"
      :alt="video.title"
    />
    <section class="metadata reveal">
      <span style="font-size: var(--font-size-7)">
        <span style="font-size: var(--font-size-7)" class="pi pi-users"></span>
        &nbsp;<a :href="`https://${video.client.url}`">{{
          video.client.name
        }}</a
        >&nbsp;⋅&nbsp;
        <span
          style="font-size: var(--font-size-7)"
          class="pi pi-info-circle"
        ></span>
        &nbsp;{{ video.category }} &nbsp;⋅&nbsp;
        <span
          style="font-size: var(--font-size-7)"
          class="pi pi-calendar"
        ></span>
        &nbsp;{{ video.year }}
      </span>
      <span class="title">
        <h2 id="article-title">{{ video.title }}</h2>
      </span>
    </section>
  </article>
</template>
<style lang="scss" scoped>
.metadata,
h2 {
  margin-top: var(--grid-gap-1);
}
h2 {
  font-size: var(--font-size-5);
}
a > :hover {
  text-decoration: underline;
  -webkit-text-decoration-skip-ink: auto;
  text-decoration-skip-ink: auto;
}
.gallery-item:hover ~ .reveal .title h2 {
  text-decoration: underline;
}
@media only screen and (max-width: 400px) {
  h2 {
    font-size: var(--font-size-4);
  }
  .card {
    border-bottom: 1px solid white;
    padding-bottom: var(--grid-gap-3);
  }
}
</style>
