<template>
  <div class="pizzas-container">
    <div
      v-for="pizza in state.pizzas"
      :key="pizza._id"
      :class="{
        'pizza-item': true,
        waiting: pizza.status === 'Waiting',
        doing: pizza.status === 'Doing',
        done: pizza.status === 'Done',
      }"
    >
      <p>
        <u> {{ pizza.task }}</u>
      </p>
      <p>{{ pizza.description }}</p>
      <p>
        <u> {{ pizza.time }} hours</u>
      </p>
      <div class="status">
        <p><u>Status:</u></p>
        <input
          type="radio"
          id="waiting-{{pizza._id}}"
          value="Waiting"
          v-model="pizza.status"
        />
        <label :for="'waiting-' + pizza._id">Waiting</label><br />
        <input
          type="radio"
          id="doing-{{pizza._id}}"
          value="Doing"
          v-model="pizza.status"
        />
        <label :for="'doing-' + pizza._id">Doing</label><br />
        <input
          type="radio"
          id="done-{{pizza._id}}"
          value="Done"
          v-model="pizza.status"
        />
        <label :for="'done-' + pizza._id">Done</label>
      </div>
      <br />
      <div>
        <router-link :to="`/pizzas/${pizza.id}`" class="pizza-link">
          <button @click="editPizza(pizza.id)" class="cta edit-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
              <path
                d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"
              />
            </svg>
          </button>
        </router-link>
        <a class="pizza-link">
          <button @click="deletePizza(pizza)" class="cta delete-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
              <path
                d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
              />
            </svg></button
        ></a>
      </div>
    </div>
  </div>
  <form id="createTask" @submit.prevent="submitForm">
    <h1>Create a Task</h1>

    <div class="input-container">
      <input
        required
        type="text"
        placeholder="Name"
        v-model="state.newTask"
        class="input-field"
      />
    </div>
    <div class="input-container">
      <input
        required
        type="text"
        placeholder="Description"
        v-model="state.newTodoDescription"
        class="input-field"
      />
    </div>
    <div class="input-container">
      <input
        required
        type="number"
        placeholder="Duration (hours)"
        v-model="state.newTodoTime"
        class="input-field"
      />
    </div>
    <div class="input-container">
      <div class="status">
        <p><u>Status:</u></p>
        <label for="waiting">
          <input
            required
            type="radio"
            id="waiting"
            value="Waiting"
            v-model="state.newTodoStatus"
          />
          Waiting</label
        ><br />
        <label for="doing">
          <input
            required
            type="radio"
            id="doing"
            value="Doing"
            v-model="state.newTodoStatus"
          />
          Doing</label
        ><br />
        <label for="done"
          ><input
            required
            type="radio"
            id="done"
            value="Done"
            v-model="state.newTodoStatus"
          />
          Done</label
        ><br />
      </div>
      <button type="submit" @click="newTask()" class="cta new-pizza-btn">
        Create task
      </button>
    </div>
  </form>
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

<style lang="scss" scoped>
.pizza-item {
  &.waiting {
    background-color: rgba(184, 65, 65, 0.7);
  }
  &.doing {
    background-color: rgba(65, 184, 131, 0.7);
  }
  &.done {
    background-color: rgba(65, 184, 131, 0.3);
  }
}
</style>
