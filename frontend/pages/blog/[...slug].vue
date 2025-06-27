<script setup lang="ts">
// Content hydration
const slug = useRoute().params.slug;
const { data: document } = await useAsyncData(`blog-${slug}`, () => {
  return queryCollection("blog").path(`/blog/${slug}`).first();
});

// SEO META (reactive)
watchEffect(() => {
  useSeoMeta(
    {
      title: document.value?.title,
      description: document.value?.description,
      ogTitle: document.value?.title,
      ogDescription: document.value?.description,
      ogImage: `https://cdn.slavic.media/img/${document.value?.thumbnail}/SD`,
      ogUrl: `https://slavic.media/blog/${document.value?.slug}`,
      twitterTitle: document.value?.title,
      twitterDescription: document.value?.description,
      twitterImage: `https://cdn.slavic.media/img/${document.value?.thumbnail}/SD`,
      twitterCard: "summary",
    },
    { priority: 1 }
  );
});
</script>

<template>
  <main style="margin-top: 120px">
    <section
      class="wrapper-wide content reveal"
      role="region"
      aria-label="Main Article Content"
    >
      <h1>{{ document.title }}</h1>
      <ArticleMetadata
        :slug="document.slug"
        :author="{
          id: document.author.id,
          name: document.author.name,
          department: document.author.department,
          linkedin: document?.author.linkedin,
        }"
        :metadata="{
          date: document.date,
          length: document.length,
          linkedin: document?.linkedin,
        }"
      />
      <ContentRenderer :value="document" class="rendered-content reveal" />
    </section>
    <!-- LIGHTROOM PRESETS -->
    <LightroomPresets aria-busy="false"></LightroomPresets
    ><FurtherReading :excludeSlug="document.slug" />
  </main>
</template>
<style lang="postcss" scoped>
.swiper-videos {
  padding-bottom: calc(var(--grid-gap-2) * 2);

  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
