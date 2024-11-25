<script setup>
defineProps({
  article: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="card" role="region">
    <router-link :to="`/blog/${article._id}`">
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
          />
        </a>
        <div>
          <a
            target="_blank"
            rel="noopener noreferrer nofollow"
            class="author"
            style="font-size: var(--font-size-7)"
            :href="article.author.url"
          >
            <b>{{ article.author.name }}</b>
          </a>
          <br class="hide" />
          <span style="font-size: var(--font-size-7)">
            {{ article.metadata.formatedDate }}&nbsp;⋅&nbsp;{{
              article.metadata.length
            }}
            min read
          </span>
        </div>
      </div>
      <router-link class="title" :to="`/blog/${article._id}`">
        <h3>{{ article.title }}</h3>
      </router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.article-metadata {
  margin: var(--grid-gap-2) 0;
  color: rgb(var(--white-color));
  background: rgb(var(--dark-grey-color));
  padding: var(--grid-gap-2);
  border-radius: var(--border-radius-1);
}
.article-metadata a:hover {
  text-decoration: underline;
} // FURTHER READING a.author:hover { text-decoration: underline; }
h3 {
  font-size: var(--font-size-5);
}

img {
  height: 170px;
  width: 100%;
  -o-object-fit: cover;
  object-fit: cover;
  margin-bottom: var(--grid-gap-2);
}
.metadata {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  line-height: 1.2;
  margin: var(--grid-gap-2) 0;
}
.grid-item:nth-child(2) {
  font-size: var(--font-size-7);
}
@media only screen and (max-width: 400px) {
  .grid-item:nth-child(2) {
    font-size: var(--font-size-8);
  }
  h3 {
    font-size: var(--font-size-4);
  }
  .card {
    border-bottom: 1px solid white;
    padding-bottom: var(--grid-gap-3);
  }
}
</style>
