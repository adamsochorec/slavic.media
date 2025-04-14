import { ref, computed } from "vue";
import { useRoute } from "vue-router";

const employee = () => {
  const route = useRoute();

  const documentID = computed(() => route.params.id);
  const state = ref({
    employees: [],
  });

  // Read all documents - GET
  const getAllEmployees = async () => {
    try {
      const response = await fetch("https://api.slavic.media/employee/");
      const data = await response.json();
      state.value.employees = data;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    state,
    getAllEmployees,
    documentID,
  };
};

export default employee;
