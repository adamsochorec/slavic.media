// event.js
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

const slide = () => {
  const route = useRoute();

  const documentID = computed(() => route.params.id);
  const state = ref({
    slides: [],
  });

  // Read all documents - GET
  const getAllSlides = async () => {
    try {
      const response = await fetch("https://api.slavic.media/img/slide");
      const data = await response.json();
      state.value.slides = data;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    state,
    getAllSlides,
    documentID,
  };
};

export default slide;
