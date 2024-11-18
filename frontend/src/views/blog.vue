<script setup>
import { ref, onMounted } from "vue";
import article from "../modules/article";
const { state, getAllArticles } = article();

const isDataLoaded = ref(false);

onMounted(async () => {
  await getAllArticles();
  isDataLoaded.value = true;
});

// Method to truncate text
const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};
</script>

<template>
  <div class="main" style="margin-top: 120px">
    <article class="wrapper-wide">
      <div v-if="isDataLoaded">
        <div class="grid-container">
          <div
            v-for="article in state.articles"
            :key="article.slug"
            class="card"
            role="region"
          >
            <router-link :to="`/blog/${article.slug}`">
              <img
                class="reveal"
                :alt="article.title"
                :src="article.metadata.thumbnail"
              />
            </router-link>
            <div class="reveal">
              <div class="metadata gap-3">
                <a
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  :href="article.author.url"
                  class="author"
                >
                  <Avatar
                    :image="article.author.thumbnail"
                    size="medium"
                    shape="circle"
                /></a>
                <div>
                  <a
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    class="author"
                    style="font-size: var(--font-size-7)"
                    :href="article.author.url"
                    ><b>{{ article.author.name }}</b></a
                  ><br class="hide" />
                  <span style="font-size: var(--font-size-7)">
                    {{ article.metadata.date }}&nbsp;⋅&nbsp;{{
                      article.metadata.length
                    }}
                    min read</span
                  >
                </div>
              </div>
              <router-link class="title" :to="`/blog/${article._id}`"
                ><h2>{{ truncateText(article.title, 80) }}</h2></router-link
              >
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <Skeleton
          width="60%"
          height="30px"
          style="background-color: rgb(var(--dark-grey-color))"
          class="mb-4"
        ></Skeleton>
        <div class="grid-container">
          <div v-for="n in 3" :key="n" class="card">
            <Skeleton
              style="background-color: rgb(var(--dark-grey-color))"
              class="p-6"
              width="100%"
              height="150px"
            ></Skeleton>
            <div>
              <Skeleton
                width="100%"
                style="background-color: rgb(var(--dark-grey-color))"
                class="mt-2"
              ></Skeleton>
              <Skeleton
                width="60%"
                style="background-color: rgb(var(--dark-grey-color))"
                class="mt-2"
              ></Skeleton>
              <div class="flex mt-4">
                <Skeleton
                  style="background-color: rgb(var(--dark-grey-color))"
                  class="mr-2"
                  shape="circle"
                  size="4rem"
                ></Skeleton>
                <div>
                  <Skeleton
                    width="10rem"
                    style="background-color: rgb(var(--dark-grey-color))"
                    class="mb-2"
                  ></Skeleton>
                  <Skeleton
                    width="5rem"
                    style="background-color: rgb(var(--dark-grey-color))"
                    class="mb-2"
                  ></Skeleton>
                  <Skeleton
                    style="background-color: rgb(var(--dark-grey-color))"
                    class=""
                    height=".5rem"
                  ></Skeleton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<style lang="scss" scoped>
h2 {
  font-size: var(--font-size-5);
}
a.author:hover {
  text-decoration: underline;
}
img {
  height: 170px;
  width: 100%;
  -o-object-fit: cover;
  object-fit: cover;
}
.grid-container {
  grid-template-columns: repeat(1, 1fr);
  display: grid;
  grid-gap: var(--grid-gap-3);
  height: auto;
  border-radius: var(--border-radius-1);
  color: white;
}
.metadata {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  line-height: 1.2;
  padding: var(--grid-gap-2) 0;
}

.grid-item:nth-child(2) {
  font-size: var(--font-size-7);
}
@media only screen and (max-width: 420px) {
  .author {
    display: none;
  }
  img {
    height: auto;
    aspect-ratio: 1/1;
    width: 90px;
    border-radius: var(--border-radius-1);
  }
  .metadata {
    padding: 0;
  }
  br.hide {
    display: none;
  }
  h2 {
    font-size: var(--font-size-6);
  }
}
@media only screen and (max-width: 900px) {
  .card {
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    display: grid;
    grid-template-columns: 38% 60%;
    grid-gap: var(--grid-gap-2);
  }
  h2 {
    font-size: var(--font-size-4);
  }
  .grid-item:nth-child(2) {
    font-size: var(--font-size-8);
  }
  .metadata {
    padding: 0 0 var(--grid-gap-1) 0;
  }
}
@media only screen and (min-width: 900px) {
  .grid-container {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
