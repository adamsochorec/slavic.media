import { ref, computed } from "vue";
import { useRoute } from "vue-router";

const img = () => {
  const route = useRoute();

  const documentID = computed(() => route.params.id);
  const state = ref({
    newId: "",
    newAlt: "",
    newTitle: "",
    newFlag: "",
    img: [],
  });

  // Read all documents - GET
  const getAllImg = async () => {
    try {
      const response = await fetch("https://api.slavic.media/img/");
      const data = await response.json();
      data.sort((a, b) => a.index - b.index);
      state.value.img = data;
    } catch (error) {
      console.error(error);
    }
  };

  // Read specific document by ID - GET
  const img = ref({});
  const getSpecificImg = async (documentID) => {
    try {
      const response = await fetch(
        `https://api.slavic.media/img/${documentID}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch document with ID: ${documentID}`);
      }
      const data = await response.json();
      img.value = data;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    state,
    getSpecificImg,
    getAllImg,
    documentID,
  };
};

export default img;
