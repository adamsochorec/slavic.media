import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const getPizzas = () => {
  // Route and router are used to grab the pizzaID from the URL and then stored in computed so we can use it in the rest of the code
  const route = useRoute(); // Used to grab the pizzaID from the URL and then stored in computed so we can use it in the rest of the code
  const router = useRouter();

  const pizzaID = computed(() => route.params.id); // Compute the pizzaID from the route params
  console.log("pizzaID: ", pizzaID.value);

  const state = ref({
    newTitle: "",
    newContent: "",
    newDate: "",
    newAuthor: "",
    newThumbnail: "",
    pizzas: {},
  });

  // Function to perform Swagger login
  const swaggerLogin = async () => {
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "localStorage.lsToken",
        },
        body: JSON.stringify({
          email: "test@test.com",
          password: "12345678",
        }),
      };
      await fetch("https://api.slavic.media/user/login", requestOptions)
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem("lsToken", data.data.token); // Store the token in local storage
          console.log("lsToken", data.data.token);
          console.log("lsStorage", localStorage.lsToken);
        });
    } catch (error) {
      console.error(error);
    }
  };

  // Fetches all pizzas items from the server.
  const GetAllPizzas = async () => {
    try {
      const response = await fetch("https://api.slavic.media/blog/articles/");
      const data = await response.json();
      state.value.pizzas = data; // Update the pizzas state with the fetched data
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Creates a new pizzas item and sends it to the server for storage.
  const newTask = async () => {
    if (
      !state.value.newTitle ||
      !state.value.newContent ||
      !state.value.newDate ||
      !state.value.newTodoAuthor ||
      !state.value.newThumbnail
    ) {
      console.error("All fields must be filled out");
      return;
    }
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.lsToken,
        },
        body: JSON.stringify({
          title: state.value.newTitle,
          content: state.value.newContent,
          date: state.value.newDate,
          author: state.value.newAuthor,
          thumbnail: state.value.newThumbnail,
          id: state.value.pizzaID,
        }),
      };

      // Make the HTTP request
      const response = await fetch(
        "https://api.slavic.media/blog/articles/",
        requestOptions
      );

      // Check if the request was successful
      if (!response.ok) {
        throw new Error("Failed to add new item");
      }

      // Refresh pizzas after successfully adding a new one
      await GetAllPizzas();
    } catch (error) {
      console.error("Error adding new item:", error);
      // Handle the error as appropriate (e.g., show an error message to the user)
    }
  };

  // Deletes a pizzas item from the server.
  const deletePizza = async (pizza) => {
    console.log("delete id from vue: ", pizza.id);
    try {
      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.lsToken,
        },
      };
      const response = await fetch(
        `https://api.slavic.media/blog/articles/${pizza.id}`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error("Failed to delete");
      }

      await GetAllPizzas();
    } catch (error) {
      console.log("Error deleting:", error);
    }
  };

  // Function to handle editing a pizzas item.
  const editPizza = async () => {
    try {
      if (!pizzaID.value) {
        throw new Error("No ID provided");
      }
      if (
        !state.value.newTitle ||
        !state.value.newContent ||
        !state.value.newDate ||
        !state.value.newAuthor ||
        !state.value.newThumbnail
      ) {
        console.error("All fields must be filled out");
        return;
      }

      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.lsToken,
        },
        body: JSON.stringify({
          title: state.value.newTitle,
          content: state.value.newContent,
          date: state.value.newDate,
          author: state.value.newAuthor,
          thumbnail: state.value.newThumbnail,
        }),
      };

      const url = "https://api.slavic.media/blog/articles/" + pizzaID.value;
      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw new Error("Failed to edit");
      }

      router.push("/blog"); // Redirect after successful edit
    } catch (error) {
      console.log("Error pizzas:", error);
    }
  };

  // Fetch specific pizzas item code here + pizzas ref array
  const pizza = ref({});
  const GetSpecificPizza = async (pizzaID) => {
    try {
      console.log("Fetching with ID:", pizzaID); // Debugging log

      const response = await fetch(
        `https://api.slavic.media/blog/articles/${pizzaID}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch specific with ID: ${pizzaID}`);
      }
      const data = await response.json();
      pizza.value = data; // Update the pizza ref with the fetched data
    } catch (error) {
      console.error(error);
    }
  };

  return {
    state,
    GetAllPizzas,
    newTask,
    deletePizza,
    GetSpecificPizza,
    pizza,
    pizzaID,
    editPizza,
    swaggerLogin,
  };
};

export default getPizzas;
