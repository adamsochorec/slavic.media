import { ref, computed } from "vue";
import { useRoute } from "vue-router";

const useLegal = () => {
  const route = useRoute();

  const documentID = computed(() => route.params.id);
  const state = ref({
    newId: "",
    newTitle: "",
    newModified: "",
    newContent: [],
    legals: [], // Add legals array to the state
    legal: {}, // Add legal object to the state
  });

  // Read all documents - GET
  const getAllLegal = async () => {
    try {
      const response = await fetch("https://api.slavic.media/legal/");
      const data = await response.json();
      state.value.legals = data; // Correctly assign data to legals
    } catch (error) {
      console.error(error);
    }
  };

  // Read specific document by ID - GET
  const getSpecificLegal = async (documentID) => {
    try {
      const response = await fetch(
        `https://api.slavic.media/legal/${documentID}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch document with ID: ${documentID}`);
      }
      const data = await response.json();
      state.value.legal = data; // Correctly assign data to state.legal
    } catch (error) {
      console.error(error);
    }
  };

  return {
    state,
    getAllLegal,
    getSpecificLegal,
    documentID,
  };
};

export default useLegal;
