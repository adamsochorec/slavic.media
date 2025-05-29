<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ddmmmyyyy } from "@/composables/useDateFormat";
import { useProgressiveImg } from "@/composables/useProgressiveImg";

interface Author {
  id: string;
  name: string;
  linkedin: string;
  department?: string;
}
interface Metadata {
  date: string;
  length: number;
  linkedin?: string;
}
interface Article {
  slug: string;
  author: Author;
  metadata: Metadata;
}
const props = defineProps<Article>();

function copyToClipboard(link: string) {
  navigator.clipboard.writeText(link);
}

const imgRef = ref<HTMLImageElement | null>(null);
const {
  thumbnailUrl,
  fullImageUrl,
  imgLoaded,
  updateImgSrc,
  checkIfAlreadyLoaded,
} = useProgressiveImg(props.author.id, "/height=200");

onMounted(() => {
  checkIfAlreadyLoaded(imgRef.value);
});
</script>
<template>
  <div class="metadata-container reveal">
    <div class="author">
      <a
        target="_blank"
        rel="noopener noreferrer nofollow"
        :href="`https://www.linkedin.com/in/${author.linkedin}`"
      >
        <img
          ref="imgRef"
          class="avatar"
          :src="thumbnailUrl"
          :data-src="fullImageUrl"
          :alt="`${author.name}'s profile picture`"
          @load="updateImgSrc"
        />
      </a>
      <div>
        <a
          class="author"
          target="_blank"
          rel="noopener noreferrer nofollow"
          :href="`https://www.linkedin.com/in/${author.linkedin}`"
        >
          <span> {{ author.name }}</span></a
        >
      </div>
    </div>
    <div class="metadata">
      <span class="pi pi-calendar mr-1"></span>{{ ddmmmyyyy(metadata.date) }}
    </div>
    <div class="link">
      <i
        @click="copyToClipboard(`https://slavic.media/blog/${slug}`)"
        v-tooltip.focus.bottom="{
          value: 'Copied to clipboard',
          autoHide: false,
        }"
        class="pi pi-link"
      ></i>
      <a
        v-if="metadata.linkedin"
        target="_blank"
        rel="noopener noreferrer nofollow"
        :href="`https://www.linkedin.com/posts/${metadata.linkedin}`"
        aria-label="Read on LinkedIn"
        ><i class="pi pi-linkedin"></i>
      </a>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.metadata-container {
  display: flex;
  margin: var(--grid-gap-1) 0;
  padding-bottom: var(--grid-gap-1);
  border-bottom: var(--border-1);
  font-size: var(--font-size-7);
  color: white;

  align-items: center;

  @media only screen and (max-width: 350px) {
    font-size: 10px;
    justify-content: center;
  }

  .metadata {
    border-left: var(--border-1);
    border-right: var(--border-1);
    margin: 0 var(--grid-gap-2);
    padding: var(--grid-gap-1) var(--grid-gap-2);

    .pi {
      font-size: var(--font-size-7);
    }
  }
  .link * {
    margin-right: var(--grid-gap-1);
  }
  img {
    height: var(--grid-gap-3);
    width: auto;
    aspect-ratio: 1/1;
    object-fit: cover;
  }
  .author {
    display: flex;
    gap: var(--grid-gap-1);
    align-items: center;
  }
}
@media only screen and (max-width: 400px) {
  .author p {
    font-size: 10px;
  }
  .metadata {
    margin: 0 var(--grid-gap-1);
    padding: 10px var(--grid-gap-1);
  }
}
</style>
