<template lang="">
  <form @submit.prevent="submitForm" class="totodetail">
    <div class="fifty-fifty">
      <h1>Edit</h1>
    </div>
    <hr />
    <br />
    <div class="fifty-fifty">
      <p>
        <u>Name:</u>
      </p>
      <input required type="text" v-model="state.newTask" />
      <!--  @input="state.newTaskName = $event.target.value" -->
    </div>
    <br />
    <br />
    <hr />
    <br />
    <div class="fifty-fifty">
      <p>
        <u>Description:</u>
      </p>
      <input type="text" required v-model="state.newTodoDescription" />
      <!--   @input="state.newTodoDescription = $event.target.value" -->
    </div>
    <br />
    <br />
    <hr />
    <br />
    <div class="fifty-fifty">
      <p>
        <u>Duration: (hours)</u>
      </p>
      <input type="number" required v-model="state.newTodoTime" />
      <!-- @input="state.newTodoTime = $event.target.value" -->
    </div>
    <br />
    <br />
    <hr />
    <br />
    <form>
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
      </div>
    </form>
    <br /><br />
    <hr />
    <br />
    <div id="buttons">
      <button class="cta" id="cancel" @click="$router.go(-1)">Cancel</button>
      <button type="submit" class="cta" id="saveChanges" @click="editPizza()">
        Save changes
      </button>
    </div>
  </form>
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
