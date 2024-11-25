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
      data.forEach((gallery) => {
        gallery.videos.sort((a, b) => a.index - b.index);
      });
      data.sort((a, b) => a.index - b.index);
      state.value.galleries = data;
    } catch (error) {
      console.error(error);
    }
  };

  // Read specific gallery by ID - GET
  const getSpecificGallery = async (galleryID) => {
    try {
      const response = await fetch(
        `https://api.slavic.media/video/${galleryID}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch gallery with ID: ${galleryID}`);
      }
      const data = await response.json();
      state.value.currentGallery = data;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    state,
    getAllGalleries,
    getSpecificGallery,
    documentID,
  };
};

export default video;
