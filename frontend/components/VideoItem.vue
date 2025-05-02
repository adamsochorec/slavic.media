<script setup lang="ts">
interface VideoItemProps {
  viemeoId?: string;
  url?: string;
  title: string;
  description: string;
  year: string;
  img: string;
  flag: string;
  alt: string;
}
const props = defineProps<VideoItemProps>();
</script>

<template>
  <a
    class="reveal"
    target="_blank"
    rel="noopener noreferrer nofollow"
    :href="`https://${url}`"
    :data-src="`//${url}?autoplay=true`"
    :data-sub-html="`<span class='gallery-desc content-font'><b>${title}</b><br>${description} ⋅ ${year}</span>`"
  >
    <img :src="`https://cdn.slavic.media/img/${img}/sd`" :alt="alt" />
    <div class="title">
      <span
        ><b>{{ title }}</b> &nbsp;
        <Icon :name="`cif:${flag}`" class="flag"></Icon> <br />{{ description }}
      </span>
    </div>
  </a>
</template>

<style lang="scss" scoped>
.item {
  height: 330px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
a {
  text-decoration: none;
  color: inherit;
  display: block;
  position: relative;
  overflow: hidden; // Ensures the zoom effect stays within bounds
}
a img {
  border-radius: var(--border-radius-1);
  object-fit: cover;
  aspect-ratio: 16/9;
  width: 100%;
  height: auto;
  transition: transform 0.3s ease; // Smooth zoom effect
}
a:hover img {
  filter: saturate(0);
}
.title {
  margin-top: var(--grid-gap-1);
  color: white;
  line-height: 1.5;
  font-size: var(--font-size-7);
}
.title b {
  transition: var(--transition-1);
}
a:hover .title b {
  text-decoration: underline;
}

a:hover img,
a img,
a .title b,
a:hover .title b {
  transition: var(--transition-1);
}
.flag {
  margin-bottom: var(--grid-gap-0-5);
}
</style>
