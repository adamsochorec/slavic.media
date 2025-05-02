<script setup lang="ts">
import { ddmmmyyyy } from "@/composables/useDateFormat";

interface Author {
  id: string;
  name: string;
  linkedin: string;
  department: string;
}
interface Metadata {
  date: string;
  length: number;
  linkedin: string;
}
interface ArticleMetadata {
  id: string;
  author: Author;
  metadata: Metadata;
}
const props = defineProps<ArticleMetadata>();
</script>
<template>
  <div
    class="article-metadata flex justify-between"
    role="contentinfo"
    aria-labelledby="article-metadata-title"
  >
    <!-- Author Information -->
    <div class="flex items-center gap-2" aria-labelledby="author-info-title">
      <h2 id="author-info-title" hidden>Author Information</h2>
      <a
        target="_blank"
        rel="noopener noreferrer nofollow"
        :href="`https://www.linkedin.com/in/${author.linkedin}`"
      >
        <img
          class="avatar"
          :src="`https://cdn.slavic.media/img/${author.id}/height=200`"
          :alt="`${author.name}'s profile picture`"
        />
      </a>
      <dl>
        <div>
          <dt class="visually-hidden">Author</dt>
          <dd>
            <a
              style="font-size: var(--font-size-6)"
              class="author"
              target="_blank"
              rel="noopener noreferrer nofollow"
              :href="`https://www.linkedin.com/in/${author.linkedin}`"
            >
              <span> {{ author.name }}</span>
            </a>
          </dd>
        </div>
        <div style="font-size: var(--font-size-7)">
          <dt class="visually-hidden">Department</dt>
          <dd>{{ author.dep }}</dd>
        </div>
        <div style="display: flex">
          <div style="font-size: var(--font-size-7)">
            <dt class="visually-hidden">Publication Date</dt>
            <dd>
              <span
                style="font-size: var(--font-size-6)"
                class="pi pi-calendar"
              ></span>
              &nbsp;{{ ddmmmyyyy(metadata.date) }}
            </dd>
          </div>
          &nbsp;
          <div style="font-size: var(--font-size-7)">
            <dt class="visually-hidden">Reading Time</dt>
            <dd>
              ⋅&nbsp;<span
                style="font-size: var(--font-size-6)"
                class="pi pi-book"
              ></span>
              &nbsp;{{ metadata.length }} min read
            </dd>
          </div>
        </div>
      </dl>
    </div>

    <!-- Social and Copy Link -->
    <div class="flex items-center gap-3" aria-labelledby="social-actions-title">
      <h2 id="social-actions-title" hidden>Social Actions</h2>
      <a
        v-tooltip.bottom="{
          value: 'View on Linkedin',
          autoHide: false,
        }"
        v-if="metadata.linkedin"
        target="_blank"
        rel="noopener noreferrer nofollow"
        :href="`https://www.linkedin.com/posts/${metadata.linkedin}`"
        aria-label="Share on LinkedIn"
      >
        <i class="pi pi-linkedin"></i>
      </a>
      <!-- Uncomment if copy link functionality is needed -->
      <!-- <button
        v-tooltip.bottom="{
          value: 'Copy link',
          autoHide: false,
        }"
        @click="copyHref(`https://slavic.media/blog/${id}`)"
        aria-label="Copy link to this article"
      >
        <i class="pi pi-link"></i>
      </button> -->
    </div>
  </div>
</template>

<style scoped>
.avatar {
  height: 60px;
  width: auto;
  object-fit: cover;
  aspect-ratio: 1/1;
}
.article-metadata {
  margin: var(--grid-gap-2) 0;
  color: rgb(var(--white-color));
  border-radius: var(--border-radius-1);
}
.pi-angle-right {
  font-size: var(--font-size-4);
  vertical-align: middle;
}

@media only screen and (max-width: 667px) {
  .avatar {
    height: 40px;
  }
}
@media only screen and (min-width: 400px) {
  .article-metadata {
    background: rgb(var(--dark-grey-color));
    padding: var(--grid-gap-1);
  }
}
</style>
