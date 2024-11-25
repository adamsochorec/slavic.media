import { ref, computed } from "vue";
import { useRoute } from "vue-router";

const useReview = () => {
  const route = useRoute();

  const documentID = computed(() => route.params.id);
  const state = ref({
    reviews: [],
  });

  // Read all documents - GET
  const getAllReviews = async () => {
    try {
      const response = await fetch("https://api.slavic.media/review/");
      const data = await response.json();
      state.value.reviews = data;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    state,
    getAllReviews,
    documentID,
  };
};

export default useReview;
