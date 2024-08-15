<template>
  <div class="pizzas-container">
    <router-link
      :to="`/blog/${pizza.id}`"
      class="pizza-link"
      v-for="pizza in state.pizzas"
      :key="pizza._id"
      :class="{
        'pizza-item': true,
      }"
    >
      <h3>
        {{ pizza.title }}
      </h3>
      <img :src="pizza.thumbnail" />

      <br />
    </router-link>
  </div>
</template>

<script>
import todocrud from "../modules/todocrud";
import { onMounted } from "vue";
export default {
  setup() {
    const { state, GetAllPizzas, newTask, deletePizza, editPizza } = todocrud();

    onMounted(() => {
      GetAllPizzas();
    });

    return { state, GetAllPizzas, newTask, deletePizza, editPizza };
  },
};
</script>

<style lang="scss" scoped></style>
