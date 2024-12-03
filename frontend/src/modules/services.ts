import { ref, computed } from "vue";
import { useRoute } from "vue-router";

const service = () => {
  const route = useRoute();

  const documentID = computed(() => route.params.id);
  const state = ref({
    services: [],
    service: null,
  });

  // Read all documents - GET
  const getAllServices = async () => {
    try {
      const response = await fetch("http://localhost:4000/services/");
      const data = await response.json();
      state.value.services = data;
    } catch (error) {
      console.error(error);
    }
  };

  // Read specific document by ID - GET
  const getSpecificService = async (documentID: string) => {
    try {
      const response = await fetch(
        `http://localhost:4000/services/${documentID}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch document with ID: ${documentID}`);
      }
      const data = await response.json();
      state.value.service = data;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    state,
    getSpecificService,
    getAllServices,
    documentID,
  };
};

export default service;
