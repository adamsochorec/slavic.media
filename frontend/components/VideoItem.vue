<script setup lang="ts">
defineProps({
  url: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  flag: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <a
    class="reveal"
    :data-src="`//vimeo.com/${url}?autoplay=true`"
    :data-sub-html="`<h4>${title}</h4><p>${desc} ⋅ ${year}</p>`"
  >
    <img :src="`https://cdn.slavic.media/img/${img}/sd`" :alt="alt" />
    <div class="title">
      <!--       <Icon :name="`circle-flags:${flag}`" class="flag"></Icon> -->
      <span
        ><b>{{ title }}</b
        ><br />{{ desc }}</span
      >
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
}
a img {
  border-radius: var(--border-radius-1);
  object-fit: cover;
  aspect-ratio: 16/9;
  width: 100%;
  height: auto;
}
.title {
  margin-top: var(--grid-gap-1);
  color: white;
  line-height: 1.5;
  font-size: var(--font-size-7);
}
.flag {
  margin-bottom: var(--grid-gap-0-5);
}
</style>
