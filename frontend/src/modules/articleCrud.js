import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const useArticleCrud = () => {
  const route = useRoute();
  const router = useRouter();

  const documentID = computed(() => route.params.id);
  const state = ref({
    newTitle: "",
    newContent: "",
    newDate: "",
    newAuthor: "",
    newThumbnail: "",
    articles: {},
    article: {},
  });

  const getAllArticles = async () => {
    try {
      const response = await fetch("https://api.slavic.media/blog/articles/");
      const data = await response.json();
      // Sort articles by date in descending order
      state.value.articles = data.sort(
        (a, b) => new Date(b.metadata.date) - new Date(a.metadata.date)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const newArticle = async () => {
    if (
      !state.value.newTitle ||
      !state.value.newContent ||
      !state.value.newDate ||
      !state.value.newAuthor ||
      !state.value.newThumbnail
    ) {
      console.error("All fields must be filled out");
      return;
    }
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.lsToken,
        },
        body: JSON.stringify({
          title: state.value.newTitle,
          content: state.value.newContent,
          date: state.value.newDate,
          author: state.value.newAuthor,
          thumbnail: state.value.newThumbnail,
        }),
      };

      const response = await fetch(
        "https://api.slavic.media/blog/articles/",
        requestOptions
      );

      if (!response.ok) {
        throw new Error("Failed to add new article");
      }

      await getAllArticles();
    } catch (error) {
      console.error("Error adding new article:", error);
    }
  };

  const deleteArticle = async (article) => {
    try {
      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.lsToken,
        },
      };
      const response = await fetch(
        `https://api.slavic.media/blog/articles/${article.id}`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error("Failed to delete article");
      }

      await getAllArticles();
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  const editArticle = async () => {
    try {
      if (!documentID.value) {
        throw new Error("No ID provided");
      }
      if (
        !state.value.newTitle ||
        !state.value.newContent ||
        !state.value.newDate ||
        !state.value.newAuthor ||
        !state.value.newThumbnail
      ) {
        console.error("All fields must be filled out");
        return;
      }

      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.lsToken,
        },
        body: JSON.stringify({
          title: state.value.newTitle,
          content: state.value.newContent,
          date: state.value.newDate,
          author: state.value.newAuthor,
          thumbnail: state.value.newThumbnail,
        }),
      };

      const url = "https://api.slavic.media/blog/articles/" + documentID.value;
      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw new Error("Failed to edit article");
      }

      router.push("/blog");
    } catch (error) {
      console.error("Error editing article:", error);
    }
  };

  const article = ref({});
  const getSpecificArticle = async (documentID) => {
    try {
      const response = await fetch(
        `https://api.slavic.media/blog/articles/${documentID}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch article with ID: ${documentID}`);
      }
      const data = await response.json();
      article.value = data;
    } catch (error) {
      console.error(error);
    }
  };
  const getSpecificArticleBySlug = async (slug) => {
    try {
      const response = await axios.get(
        `https://api.slavic.media/blog/articles/${slug}`
      );
      state.value.article = response.data;
    } catch (error) {
      console.error(error);
    }
  };
  return {
    state,
    getAllArticles,
    newArticle,
    deleteArticle,
    getSpecificArticle,
    article: state.value.article,
    documentID,
    editArticle,
    getSpecificArticleBySlug,
  };
};

export default useArticleCrud;
