import { ref, computed } from "vue";
import { useRoute } from "vue-router";

const video = () => {
  const route = useRoute();

  const documentID = computed(() => route.params.id);
  const state = ref({
    videos: [],
    currentVideo: null,
  });

  // Read all video galleries - GET
  const getAllVideos = async () => {
    try {
      const response = await fetch("https://api.slavic.media/video");
      const data = await response.json();
      state.value.videos = data;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    state,
    getAllVideos,
    documentID,
  };
};

export default video;
