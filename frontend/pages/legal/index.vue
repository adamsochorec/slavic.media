<script setup lang="ts">
import { ref } from "vue";

const { data: articles } = await useAsyncData("legal", () =>
  queryCollection("legal").all()
);
</script>

<template></template>
