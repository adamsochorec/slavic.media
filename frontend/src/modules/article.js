import { ref, computed } from "vue";
import { useRoute /* useRouter */ } from "vue-router";
import axios from "axios";

const useArticle = () => {
  const route = useRoute();
  // const router = useRouter();

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

  // Create document - POST
  /*  const newArticle = async () => {
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
        throw new Error("Failed to add new document");
      }
      await getAllArticles();
    } catch (error) {
      console.error("Error adding new document:", error);
    }
  };
 */
  // Read all documents - GET
  const getAllArticles = async () => {
    try {
      const response = await fetch("https://api.slavic.media/blog/");
      const data = await response.json();

      // Function to convert date string to a format that can be parsed by Date object
      const parseDate = (dateStr) => {
        // Remove ordinal suffixes
        const cleanedDateStr = dateStr.replace(/(\d+)(st|nd|rd|th)/, "$1");
        return new Date(cleanedDateStr);
      };
      // Sort documents by date in descending order
      state.value.articles = data.sort((a, b) => {
        const dateA = parseDate(a.metadata.date);
        const dateB = parseDate(b.metadata.date);
        return dateB - dateA;
      });
      // Log the sorted documents
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  // Read specific documents by ID (SLUG) - GET
  const getSpecificArticle = async (slug) => {
    try {
      const response = await axios.get(`https://api.slavic.media/blog/${slug}`);
      state.value.article = response.data;
    } catch (error) {
      console.error(error);
    }
  };

  // Update document - PUT
  /*  const editArticle = async () => {
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
      const url = "https://api.slavic.media/blog/" + documentID.value;
      const response = await fetch(url, requestOptions);
      if (!response.ok) {
        throw new Error("Failed to edit document");
      }
      router.push("/blog");
    } catch (error) {
      console.error("Error editing document:", error);
    }
  }; */

  // Delete article - DELETE
  /*   const deleteArticle = async (article) => {
    try {
      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.lsToken,
        },
      };
      const response = await fetch(
        `https://api.slavic.media/blog/${article.id}`,
        requestOptions
      );
      if (!response.ok) {
        throw new Error("Failed to delete document");
      }
      await getAllArticles();
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };
 */
  return {
    state,
    getAllArticles,
    // newArticle,
    // deleteArticle,
    article: state.value.article,
    documentID,
    // editArticle,
    getSpecificArticle,
  };
};

export default useArticle;
