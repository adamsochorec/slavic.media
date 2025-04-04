<script setup lang="ts">
import { ref, onMounted, nextTick, onUnmounted, watch } from "vue";
import { useRoute } from "vue-router";
import Swiper from "swiper/bundle";
import "swiper/swiper-bundle.css";
import { useArrowNavigation } from "@/functions/arrow-navigation";
import { useSwiperAutoplay } from "@/functions/swiper-autoplay";
import article from "@/modules/article";
import $ from "jquery";
import "magnific-popup/dist/jquery.magnific-popup.min.js";
import { ddmmmyyyy } from "@/functions/date-format"; // Ensure this is correctly imported

const { getAllArticles, getSpecificArticle, state } = article();
const isDataLoaded = ref(false);
const route = useRoute();

const loadArticle = async (_id) => {
  isDataLoaded.value = false;
  await getSpecificArticle(_id);
  isDataLoaded.value = true;

  if (typeof $.fn.magnificPopup !== "undefined") {
    // POP UP GALLERY
    $(document).ready(function () {
      $(".article-content").magnificPopup({
        delegate: "a.image",
        type: "image",
        tLoading: "Loading",
        mainClass: "mfp-img-mobile",
        gallery: {
          enabled: true,
          fixedContentPos: false,
          overflowY: "scroll",
          navigateByImgClick: true,
          preload: [0, 1],
        },
        zoom: {
          enabled: true,
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
  } else {
    console.error("magnificPopup is not loaded properly.");
  }
};

onMounted(async () => {
  await getAllArticles();
  await loadArticle(route.params._id);
});

watch(route, async (newRoute) => {
  await loadArticle(newRoute.params._id);
});
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
                :src="`https://cdn.slavic.media/img/${state.article.author._id}/height=100`"
                :alt="`${state.article.author.name}'s profile picture`"
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
                    :href="`https://www.linkedin.com/in/${state.article.author.linkedin}`"
                  >
                    <span> {{ state.article.author.name }}</span>
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
                  <dd>
                    <span
                      style="font-size: var(--font-size-6)"
                      class="pi pi-calendar"
                    ></span>
                    &nbsp;{{ ddmmmyyyy(state.article.metadata.date) }}
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
                    &nbsp;{{ state.article.metadata.length }} min read
                  </dd>
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
              v-tooltip.bottom="{
                value: 'View on Linkedin',
                autoHide: false,
              }"
              v-if="state.article?.metadata.linkedin"
              target="_blank"
              rel="noopener noreferrer nofollow"
              :href="`https://www.linkedin.com/posts/${state.article?.metadata.linkedin}`"
              aria-label="Share on LinkedIn"
            >
              <i class="pi pi-linkedin"></i>
            </a>
            <!--  <button
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
            </button> -->
          </div>
        </div>
        <!-- ARTICLE METADATA END -->
        <section aria-labelledby="article-title" class="article-content">
          <dynamicContent :htmlContent="String(state.article.content)" />
        </section>
        <!-- VIDEO GALLERY START -->
        <swiperVideo
          v-if="state.article?.videos && state.article?.videos.length > 0"
          :videos="state.article.videos"
        ></swiperVideo>
        <!-- VIDEO GALLERY END -->
      </div>
      <skeletonArticle
        v-else
        aria-busy="true"
        aria-live="polite"
      ></skeletonArticle>
    </section>
    <!-- LIGHTROOM PRESETS BANNER CTA -->
    <bannerLightroomPresets
      v-if="isDataLoaded"
      aria-busy="false"
    ></bannerLightroomPresets>

    <!-- FURTHER READING -->
    <furtherReading
      v-if="isDataLoaded"
      :isDataLoaded="isDataLoaded"
      :state="state"
      :articlesToShow="articlesToShow"
      :loadMoreArticles="loadMoreArticles"
    />
  </article>
</template>

<style lang="scss" scoped>
h1 {
  font-size: var(--font-size-2);
}
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
.gallery {
  grid-template-columns: repeat(3, 1fr);
}
.swiper-videos {
  padding-bottom: calc(var(--grid-gap-2) * 2);
}
.swiper-videos .swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
}
@media only screen and (max-width: 550px) {
  .gallery-item {
    height: 120px;
  }
}
@media only screen and (max-width: 667px) {
  .gallery {
    grid-template-columns: repeat(1, 1fr);
  }
  .avatar {
    height: 40px;
  }
}
@media only screen and (min-width: 400px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr);
  }
  .article-metadata {
    background: rgb(var(--dark-grey-color));
    padding: var(--grid-gap-1);
  }
}
</style>
