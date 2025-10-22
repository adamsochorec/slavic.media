<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ddmmmyyyy } from "@/composables/useDateFormat.ts";
import { useProgressiveImg } from "@/composables/useProgressiveImg";

interface Author {
  name: string;
  id: string;
  linkedin: string;
}
interface Article {
  slug: string;
  thumbnail: string;
  title: string;
  date: string;
  description: string;
  icon: string;
  length: number;
  flag?: string;
  author: Author;
}
const props = defineProps<{
  article: Article;
}>();

const {
  thumbnailUrl,
  fullImageUrl,
  imgLoaded,
  updateImgSrc,
  checkIfAlreadyLoaded,
} = useProgressiveImg(props.article.author.id, "/height=90");

const imgRef = ref<HTMLImageElement | null>(null);

onMounted(() => {
  checkIfAlreadyLoaded(imgRef.value);
});
</script>

<template>
  <figcaption>
    <header class="metadata gap-3">
      <a
        v-if="article.author?.linkedin"
        target="_blank"
        rel="noopener noreferrer nofollow"
        :href="`https://www.linkedin.com/in/${article.author.linkedin}`"
        class="author"
        aria-label="Visit {{ article.author.name }}'s LinkedIn profile"
      >
        <img
          ref="imgRef"
          class="avatar"
          :src="thumbnailUrl"
          :data-src="fullImageUrl"
          :alt="`${article.author.name}'s profile picture`"
          @load="updateImgSrc"
          loading="lazy"
        />
      </a>
      <img
        v-else
        ref="imgRef"
        class="avatar"
        :src="thumbnailUrl"
        :data-src="fullImageUrl"
        :alt="`${article.author.name}'s profile picture`"
        @load="updateImgSrc"
        loading="lazy"
      />
      <div>
        <a
          v-if="article.author?.linkedin"
          target="_blank"
          rel="noopener noreferrer nofollow"
          class="author"
          :href="`https://www.linkedin.com/in/${article.author.linkedin}`"
          aria-label="Visit {{ article.author.name }}'s LinkedIn profile"
        >
          <span class="name">{{ article.author.name }}</span>
        </a>
        <span v-else class="name">{{ article.author.name }}</span>

        <br class="hide" />
        <div class="submetadata">
          <span class="pi pi-calendar mr-1"></span>{{ ddmmmyyyy(article.date)
          }}<i class="separator"></i> <span class="pi pi-clock mr-1"></span
          >{{ article.length }} min read
        </div>

        <br />
      </div>
    </header>
  </figcaption>
</template>

<style lang="postcss" scoped>
.name {
  font-size: var(--font-size-7);
}
img {
  height: var(--grid-gap-3);
  width: auto;
  object-fit: cover;
  margin-bottom: var(--grid-gap-2);
  aspect-ratio: 1 / 1;
  -webkit-animation: skeleton-loading 1s linear infinite alternate;
  animation: skeleton-loading 1s linear infinite alternate;
}
.metadata {
  display: flex;
  align-items: center;
  line-height: 1.2;
  color: oklch(1 0 0);
  margin-top: var(--grid-gap-1);
}
.submetadata,
.submetadata .pi {
  font-size: var(--font-size-7);
}
.grid-item:nth-child(2) {
  font-size: var(--font-size-7);
  @media only screen and (max-width: 400px) {
    font-size: var(--font-size-8);
  }
}
</style>
