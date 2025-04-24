<script setup lang="ts">
// Content hydration from blog colletion
const slug = useRoute().params.slug;
const { data: post } = await useAsyncData(`legal-${slug}`, () => {
  return queryCollection("legal").path(`/legal/${slug}`).first();
});
</script>
<template></template>
