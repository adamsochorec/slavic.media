<script setup>
import { ref, onMounted } from "vue";
import useArticleCrud from "../modules/articleCrud";
import { useRoute } from "vue-router";
import $ from "jquery";

// Destructure methods and state from articleCrud
const { getSpecificArticleBySlug, state } = useArticleCrud();
const route = useRoute();

const isDataLoaded = ref(false);

onMounted(async () => {
  await getSpecificArticleBySlug(route.params.slug);
  console.log("Loaded article:", state.article); // Log the loaded article
  isDataLoaded.value = true;
});

// COPY LINK
const copyHref = (href) => {
  navigator.clipboard
    .writeText(href)
    .then(() => {
      console.log("URL copied to clipboard");
    })
    .catch((err) => {
      console.error("Failed to copy URL: ", err);
    });
};

// POP UP GALLERY
$(document).ready(function () {
  // Initializes Magnific Popup for image-based galleries
  $(".article-content").magnificPopup({
    delegate: "img", // Targets <a> elements directly
    type: "image",
    tLoading: '<div class="loading-container"><div class="loader"></div></div>', // Loading spinner HTML
    mainClass: "mfp-img-mobile",
    gallery: {
      enabled: true,
      fixedContentPos: "false",
      overflowY: "scroll",

      navigateByImgClick: true,
      preload: [0, 1], // Preloads adjacent images
    },
    zoom: {
      enabled: true,
      duration: 300, // Duration of the zoom animation
    },
    image: {
      tError:
        '<div class="error-container"><i class="pi pi-triangle-exclamation"></i><br><br>Error</div>', // Error message HTML

      title: true,
      src: function (item) {
        // Gets the URL of the image for the popup
        return item.el.attr("src");
      },
    },
    callbacks: {
      elementParse: function (item) {
        // Function to handle each image source
        item.src = item.el.attr("src");
      },
    },
    fixedContentPos: "false",
    overflowY: "scroll",
  });
});
</script>

<template>
  <div class="main" style="margin-top: 120px">
    <article class="wrapper-wide">
      <div v-if="isDataLoaded">
        <h1>
          {{ state.article.title }}
        </h1>
        <!-- ARTICLE METADATA START -->
        <div class="article-metadata flex justify-between">
          <div class="flex items-center gap-2">
            <Avatar
              :image="state.article.author.thumbnail"
              size="large"
              shape="circle"
            />
            <div>
              <b
                ><a
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  :href="state.article.author.url"
                  style="font-size: var(--font-size-8)"
                  >{{ state.article.author.name }}</a
                ></b
              ><br />
              <span style="font-size: var(--font-size-8)">
                {{ state.article.metadata.date }}&nbsp;⋅&nbsp;{{
                  state.article.metadata.length
                }}
                min read</span
              >
            </div>
          </div>
          <div class="flex items-center gap-3">
            <a
              target="_blank"
              rel="noopener noreferrer nofollow"
              :href="state.article.metadata.linkedin"
              ><i class="pi pi-linkedin"></i>
            </a>
            <button
              @click="
                copyHref(`https://slavic.media/blog/${state.article.slug}`)
              "
            >
              <i class="pi pi-link"></i>
            </button>
          </div>
        </div>
        <!-- ARTICLE METADATA END -->
        <div class="article-content">
          <img :src="state.article.metadata.thumbnail" class="reveal" />
          <section
            v-for="(content, index) in state.article.content"
            :key="index"
            v-html="content"
            v-add-class
          ></section>
        </div>
      </div>
      <div
        v-else
        class="rounded-lg border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-800 shadow-lg mb-4 p-8"
      >
        <div class="flex mb-4">
          <Skeleton shape="circle" size="4rem" class="mr-2"></Skeleton>
          <div>
            <Skeleton width="10rem" class="mb-2"></Skeleton>
            <Skeleton width="5rem" class="mb-2"></Skeleton>
            <Skeleton height=".5rem"></Skeleton>
          </div>
        </div>
        <Skeleton width="100%" height="150px"></Skeleton>
        <div class="flex justify-between mt-4">
          <Skeleton width="4rem" height="2rem"></Skeleton>
          <Skeleton width="4rem" height="2rem"></Skeleton>
        </div>
      </div>
      <hr class="semi" />
    </article>
  </div>
</template>

<style lang="scss" scoped>
h1 {
  font-size: var(--font-size-2);
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
</style>
