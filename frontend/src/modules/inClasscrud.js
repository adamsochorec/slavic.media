import { ref } from "vue";

const getTodosInClass = () => {
  const pizzas = ref([]); // Create a reactive reference to an empty array called "pizzas"

  const fetchTodos = async () => {
    try {
      const response = await fetch(
        "https://dwp-backend.adamsochorec.com/pizzas"
      ); // Send a GET request to the specified URL and store the response

      if (!response.ok) {
        throw new Error("Something went wrong"); // Throw an error if the response is not successful
      }
      const data = await response.json(); // Parse the response body as JSON
      pizzas.value = data; // Update the "pizzas" array with the fetched data
    } catch (error) {
      console.log(error); // Log any errors that occur during the fetch operation
    }
  };

  return {
    pizzas,
    fetchTodos,
  };
};

export default getTodosInClass;
