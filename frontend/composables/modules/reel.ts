// event.js
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

const reel = () => {
  const route = useRoute();

  const documentID = computed(() => route.params.id);
  const state = ref({
    reels: [],
  });

  // Read all documents - GET
  const getAllReels = async () => {
    try {
      const response = await fetch("https://api.slavic.media/reel/");
      const data = await response.json();
      state.value.reels = data;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    state,
    getAllReels,
    documentID,
  };
};

export default reel;
