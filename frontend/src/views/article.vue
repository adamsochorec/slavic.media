<template lang="">
  <article class="wrapper-standard">
    <form @submit.prevent="submitForm" class="totodetail">
      <h1>{{ pizza.title }}</h1>
      <img :src="pizza.thumbnail" />
      <h6>{{ pizza.date }}, {{ pizza.author }}</h6>
      <hr />
      <p>{{ pizza.content }}</p>
      <hr />
    </form>
  </article>
</template>
<script>
import todocrud from "../modules/todocrud";
import { onMounted } from "vue";
export default {
  setup() {
    const { editPizza, state, GetSpecificPizza, pizza, pizzaID } = todocrud();

    onMounted(() => {
      GetSpecificPizza(pizzaID.value);
    });

    return {
      pizza,
      pizzaID,
      GetSpecificPizza,
      state,
      editPizza,
    };
  },
};
</script>
<style lang="scss" scoped></style>
