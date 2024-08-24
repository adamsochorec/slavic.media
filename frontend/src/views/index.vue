<script setup>
import { ref } from "vue";
import Checkbox from "primevue/checkbox";
const checked = ref(false);
</script>
<template>
  <div class="home">
    <div class="card flex justify-center">
      <Checkbox v-model="checked" :binary="true" />
    </div>
    <h1 class="text-3xl font-bold text-green-300 underline">index.vue</h1>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "HomeComponent",
  components: { Checkbox },
};
</script>
<style lang="scss" scoped></style>
