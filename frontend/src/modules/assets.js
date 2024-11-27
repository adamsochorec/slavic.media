import { ref, computed } from "vue";
import { useRoute } from "vue-router";

const asset = () => {
  const route = useRoute();

  const documentID = computed(() => route.params.id);
  const state = ref({
    assets: [],
  });

  // Read all documents - GET
  const getAllAssets = async () => {
    try {
      const response = await fetch(
        "https://slavic-media-2-0.onrender.com/assets/?fields=_id,title,desc"
      );
      const data = await response.json();
      state.value.assets = data;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    state,
    getAllAssets,
    documentID,
  };
};

export default asset;
