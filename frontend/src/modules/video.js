import { ref, computed } from "vue";
import { useRoute } from "vue-router";

const video = () => {
  const route = useRoute();

  const documentID = computed(() => route.params.id);
  const state = ref({
    galleries: [],
    currentGallery: null,
  });

  // Read all video galleries - GET
  const getAllGalleries = async () => {
    try {
      const response = await fetch("https://api.slavic.media/video/");
      if (!response.ok) {
        throw new Error("Failed to fetch video galleries");
      }
      const data = await response.json();
      state.value.galleries = data;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    state,
    getAllGalleries,
    documentID,
  };
};

export default video;
