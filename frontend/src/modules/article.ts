import { ref, computed } from "vue";
import { useRoute } from "vue-router";

interface Article {
  _id: string;
  author: string;
  metadata: string;
  title: string;
}
interface State {
  newTitle: string;
  newContent: string;
  newDate: string;
  newFormatedDate: string;
  newAuthor: string;
  newThumbnail: string;
  articles: Article[];
  article: Article | null;
  furtherReading: Article[];
}
const article = () => {
  const route = useRoute();
  const documentID = computed(() => route.params.id as string);
  const state = ref<State>({
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
  const getAllArticles = async (): Promise<void> => {
    try {
      const response = await fetch(
        "https://api.slavic.media/blog/?fields=author,metadata,_id,title"
      );
      const data: Article[] = await response.json();
      state.value.articles = data.sort(
        (a, b) =>
          new Date(b.metadata.date).getTime() -
          new Date(a.metadata.date).getTime()
      );
    } catch (error) {
      console.error(error);
    }
  };

  // Read specific document by ID - GET
  const getSpecificArticle = async (documentID: string): Promise<void> => {
    try {
      const response = await fetch(
        `https://api.slavic.media/blog/${documentID}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch document with ID: ${documentID}`);
      }
      const data: Article = await response.json();
      state.value.article = data;
      getFurtherReading(documentID);
    } catch (error) {
      console.error(error);
    }
  };

  const getFurtherReading = (currentArticleID: string): void => {
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
