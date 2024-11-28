import { ref, computed } from "vue";
import { useRoute } from "vue-router";

const article = () => {
  const route = useRoute();

  const documentID = computed(() => route.params.id);
  const state = ref({
    newTitle: "",
    newContent: "",
    newDate: "",
    newFormatedDate: "",
    newAuthor: "",
    newThumbnail: "",
    articles: [],
    article: null,
    furtherReading: [],
  });

  // Read all documents - GET
  const getAllArticles = async () => {
    try {
      const response = await fetch(
        "https://api.slavic.media/blog/?fields=author,metadata,_id,title"
      );
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
      getFurtherReading(documentID);
    } catch (error) {
      console.error(error);
    }
  };

  const getFurtherReading = (currentArticleID) => {
    const filteredArticles = state.value.articles.filter(
      (article) => article._id !== currentArticleID
    );
    state.value.furtherReading = filteredArticles.slice(-4);
  };

  return {
    state,
    getAllArticles,
    getSpecificArticle,
    getFurtherReading,
    documentID,
  };
};

export default article;
