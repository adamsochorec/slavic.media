<script setup>
import { ref, onMounted, watch } from "vue";
import article from "../modules/article";
import { useRoute } from "vue-router";
import "magnific-popup";
import blogCard from "@/components/blog-card.vue";
import $ from "jquery";
import galleryItem from "@/components/gallery-item.vue";

const { getAllArticles, getSpecificArticle, state } = article();
const route = useRoute();

const isDataLoaded = ref(false);

const loadArticle = async (_id) => {
  isDataLoaded.value = false;
  await getSpecificArticle(_id);
  isDataLoaded.value = true;

  // POP UP GALLERY
  $(document).ready(function () {
    $(".article-content").magnificPopup({
      delegate: "a.reveal",
      type: "image",
      tLoading: "Loading",
      mainClass: "mfp-img-mobile",
      gallery: {
        enabled: "true",
        fixedContentPos: "false",
        overflowY: "scroll",
        navigateByImgClick: "true",
        preload: [0, 1],
      },
      zoom: {
        enabled: "true",
        duration: 300,
      },
      image: {
        tError: "Error",
        titleSrc: function (item) {
          return item.el.attr("title");
        },
      },
      callbacks: {
        elementParse: function (item) {
          item.src = item.el.attr("href");
        },
      },
    });
  });
  $(document).ready(function () {
    $(".gallery").magnificPopup({
      delegate: "a",
      type: "iframe",
      gallery: {
        enabled: true,
        fixedContentPos: false,
        overflowY: "scroll",
        navigateByImgClick: true,
        preload: [0, 1],
      },
    });
  });
};

onMounted(async () => {
  await getAllArticles();
  await loadArticle(route.params._id);
});

watch(route, async (newRoute) => {
  await loadArticle(newRoute.params._id);
});

// COPY LINK
const copyHref = (href) => {
  navigator.clipboard.writeText(href);
};
</script>

<template>
  <article class="main" style="margin-top: 120px">
    <section
      class="wrapper-wide"
      role="region"
      aria-label="Main Article Content"
    >
      <div v-if="isDataLoaded" aria-busy="false">
        <h1 id="article-title" class="reveal">
          {{ state.article.title }}
        </h1>
        <!-- ARTICLE METADATA START -->
        <div
          class="article-metadata flex justify-between reveal"
          role="contentinfo"
          aria-labelledby="article-metadata-title"
        >
          <!-- Author Information -->
          <div
            class="flex items-center gap-2"
            aria-labelledby="author-info-title"
          >
            <h2 id="author-info-title" hidden>Author Information</h2>
            <a
              target="_blank"
              rel="noopener noreferrer nofollow"
              :href="`https://www.linkedin.com/in/${state.article.author.linkedin}`"
            >
              <img
                class="avatar"
                :src="`https://cdn.slavic.media/images/${state.article.author._id}/height=100,sharpen=100`"
                :alt="`${state.article.author.name}'s profile picture`"
              />
            </a>
            <dl>
              <div>
                <dt class="visually-hidden">Author</dt>
                <dd>
                  <a
                    class="author"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    :href="`https://www.linkedin.com/in/${state.article.author.linkedin}`"
                  >
                    <b>{{ state.article.author.name }}</b>
                  </a>
                </dd>
              </div>
              <div style="font-size: var(--font-size-7)">
                <dt class="visually-hidden">Department</dt>
                <dd>{{ state.article.author.department }}</dd>
              </div>
              <div style="display: flex">
                <div style="font-size: var(--font-size-7)">
                  <dt class="visually-hidden">Publication Date</dt>
                  <dd>{{ state.article.metadata.formatedDate }}</dd>
                </div>
                &nbsp;
                <div style="font-size: var(--font-size-7)">
                  <dt class="visually-hidden">Reading Time</dt>
                  <dd>⋅&nbsp;{{ state.article.metadata.length }} min read</dd>
                </div>
              </div>
            </dl>
          </div>

          <!-- Social and Copy Link -->
          <div
            class="flex items-center gap-3"
            aria-labelledby="social-actions-title"
          >
            <h2 id="social-actions-title" hidden>Social Actions</h2>
            <a
              v-if="state.article?.metadata.linkedin"
              target="_blank"
              rel="noopener noreferrer nofollow"
              :href="`https://www.linkedin.com/posts/${state.article?.metadata.linkedin}`"
              aria-label="Share on LinkedIn"
            >
              <i class="pi pi-linkedin"></i>
            </a>
            <button
              v-tooltip.bottom="{
                value: 'Copy link',
                autoHide: false,
              }"
              @click="
                copyHref(`https://slavic.media/blog/${state.article._id}`)
              "
              aria-label="Copy link to this article"
            >
              <i class="pi pi-link"></i>
            </button>
          </div>
        </div>
        <!-- ARTICLE METADATA END -->
        <section
          aria-labelledby="article-title"
          class="article-content"
          v-for="(content, index) in state.article.content"
          :key="index"
          v-html="content"
        ></section>
        <div v-if="state.article?.videos && state.article?.videos.length > 0">
          <hr class="reveal" />
          <h2 class="visually-hidden" id="video-gallery-title">
            Video Gallery
          </h2>
          <div class="gallery" aria-labelledby="video-gallery-title">
            <galleryItem
              v-for="video in state.article.videos"
              :key="video._id"
              :img="video._id"
              icon="map-marker"
              :url="`https://vimeo.com/slavicmedia/${video.url}`"
              :desc="`${video.year}`"
              :alt="video.title"
            />
          </div>
        </div>
      </div>

      <div v-else aria-busy="true" aria-live="polite">
        <Skeleton
          style="background-color: rgb(var(--dark-grey-color))"
          borderRadius="10px"
          height="10px"
          width="100%"
          class="mb-2"
        ></Skeleton>
        <Skeleton
          style="background-color: rgb(var(--dark-grey-color))"
          borderRadius="10px"
          height="10px"
          width="50%"
          class="mb-4"
        ></Skeleton>
        <div class="flex justify-between mt-4">
          <div class="flex mb-4">
            <Skeleton
              style="background-color: rgb(var(--dark-grey-color))"
              shape="circle"
              size="4rem"
              class="mr-2"
            ></Skeleton>
            <div>
              <Skeleton
                style="background-color: rgb(var(--dark-grey-color))"
                width="10rem"
                borderRadius="10px"
                height="10px"
                class="mb-2"
              ></Skeleton>
              <Skeleton
                style="background-color: rgb(var(--dark-grey-color))"
                width="5rem"
                height="10px"
                class="mb-2"
              ></Skeleton>
              <Skeleton
                style="background-color: rgb(var(--dark-grey-color))"
                borderRadius="10px"
                height="10px"
              ></Skeleton>
            </div>
          </div>
        </div>
        <Skeleton
          style="background-color: rgb(var(--dark-grey-color))"
          class="mb-4"
          width="100%"
          height="200px"
          borderRadius="10px"
        ></Skeleton>
        <Skeleton
          style="background-color: rgb(var(--dark-grey-color))"
          borderRadius="10px"
          height="10px"
          width="100%"
          class="mb-2"
        ></Skeleton>
        <Skeleton
          style="background-color: rgb(var(--dark-grey-color))"
          borderRadius="10px"
          height="10px"
          s
          width="90%"
          class="mb-2"
        ></Skeleton>
        <Skeleton
          style="background-color: rgb(var(--dark-grey-color))"
          borderRadius="10px"
          height="10px"
          width="95%"
          class="mb-2"
        ></Skeleton>
        <Skeleton
          style="background-color: rgb(var(--dark-grey-color))"
          borderRadius="10px"
          height="10px"
          width="90%"
          class="mb-2"
        ></Skeleton>
        <Skeleton
          style="background-color: rgb(var(--dark-grey-color))"
          borderRadius="10px"
          height="10px"
          width="95%"
          class="mb-4"
        ></Skeleton>
        <Skeleton
          style="background-color: rgb(var(--dark-grey-color))"
          class="mb-4"
          width="100%"
          height="200px"
          borderRadius="10px"
        ></Skeleton>
        <Skeleton
          style="background-color: rgb(var(--dark-grey-color))"
          height="10px"
          width="100%"
          class="mb-2"
        ></Skeleton>
        <Skeleton
          style="background-color: rgb(var(--dark-grey-color))"
          borderRadius="10px"
          height="10px"
          width="90%"
          class="mb-2"
        ></Skeleton>
        <Skeleton
          style="background-color: rgb(var(--dark-grey-color))"
          borderRadius="10px"
          height="10px"
          width="95%"
          class="mb-2"
        ></Skeleton>
        <Skeleton
          style="background-color: rgb(var(--dark-grey-color))"
          borderRadius="10px"
          height="10px"
          width="90%"
          class="mb-2"
        ></Skeleton>
        <Skeleton
          style="background-color: rgb(var(--dark-grey-color))"
          borderRadius="10px"
          height="10px"
          width="95%"
          class="mb-4"
        ></Skeleton>
      </div>
    </section>
    <bannerLightroomPresets
      v-if="isDataLoaded"
      aria-busy="false"
    ></bannerLightroomPresets>
    <section
      class="wrapper-standard"
      role="region"
      aria-labelledby="further-reading-title"
    >
      <div v-if="isDataLoaded" aria-busy="false">
        <hr class="semi" />

        <h3 id="further-reading-title">
          More from
          <router-link to="/blog" class="gradient"
            >Slavic&nbsp;Media&nbsp;</router-link
          >Blog
        </h3>
        <hr class="quater reveal" />
        <div class="grid-container">
          <div
            v-for="article in state.furtherReading"
            :key="article._id"
            role="article"
            aria-labelledby="article-{{ article._id }}-title"
          >
            <blogCard
              :article="article"
              id="article-{{ article._id }}-title"
            ></blogCard>
          </div>
        </div>
      </div>
    </section>
  </article>
</template>

<style lang="scss" scoped>
h1 {
  font-size: var(--font-size-2);
}
.avatar {
  height: 60px;
}
.article-metadata {
  margin: var(--grid-gap-2) 0;
  color: rgb(var(--white-color));
  background: rgb(var(--dark-grey-color));
  padding: var(--grid-gap-2);
  border-radius: var(--border-radius-1);
}
.article-metadata a:hover {
  text-decoration: underline;
}
.pi-angle-right {
  font-size: var(--font-size-4);
  vertical-align: middle;
}
.grid-container {
  grid-template-columns: repeat(1, 1fr);
  display: grid;
  grid-gap: var(--grid-gap-3);
  height: auto;
  border-radius: var(--border-radius-1);
  color: white;
}
.gallery {
  grid-template-columns: repeat(3, 1fr);
}
@media only screen and (max-width: 667px) {
  .gallery {
    grid-template-columns: repeat(1, 1fr);
  }
}
@media only screen and (min-width: 400px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
