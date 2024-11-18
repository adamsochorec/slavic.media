import { ref, computed } from "vue";
import { useRoute } from "vue-router";

const useArticle = () => {
  const route = useRoute();

  const documentID = computed(() => route.params.id);
  const state = ref({
    newTitle: "",
    newContent: "",
    newDate: "",
    newAuthor: "",
    newThumbnail: "",
  });

  // Read all documents - GET
  const getAllArticles = async () => {
    try {
      const response = await fetch("https://api.slavic.media/blog/");
      const data = await response.json();
      state.value.articles = data;
    } catch (error) {
      console.error(error);
    }
  };

  // Read specific document by ID - GET
  const getSpecificArticle = async (documentID) => {
    try {
      const response = await fetch(
        `https://api.slavic.media/blog/${documentID}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch document with ID: ${documentID}`);
      }
      const data = await response.json();
      state.value.article = data;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    state,
    getAllArticles,
    getSpecificArticle,
    documentID,
  };
};

export default useArticle;
