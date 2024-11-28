import { ref, computed } from "vue";
import { useRoute } from "vue-router";

const employee = () => {
  const route = useRoute();

  const documentID = computed(() => route.params.id);
  const state = ref({
    newId: "",
    newIndex: "",
    newName: "",
    newDepartment: "",
    newOrigin: "",
    newEmail: "",
    newBirthday: "",
    newLinkedin: "",
    newGithub: "",
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

  // Read specific document by ID - GET
  const employee = ref({});
  const getSpecificEmployee = async (documentID) => {
    try {
      const response = await fetch(
        `https://api.slavic.media/employee/${documentID}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch document with ID: ${documentID}`);
      }
      const data = await response.json();
      employee.value = data;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    state,
    getAllEmployees,
    getSpecificEmployee,
    documentID,
  };
};

export default employee;
