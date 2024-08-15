import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const getDocuments = () => {
  // Route and router are used to grab the document's ID from the URL and then stored in computed so we can use it in the rest of the code
  const route = useRoute(); // Used to grab the document's ID from the URL and then stored in computed so we can use it in the rest of the code
  const router = useRouter();

  const documentID = computed(() => route.params.id); // Compute the ID from the route params
  console.log("documentID: ", documentID.value);

  const state = ref({
    newTitle: "",
    newContent: "",
    newDate: "",
    newAuthor: "",
    newThumbnail: "",
    articles: {},
  });

  // Function to perform Swagger login
  const swaggerLogin = async () => {
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "localStorage.lsToken",
        },
        body: JSON.stringify({
          email: "test@test.com",
          password: "12345678",
        }),
      };
      await fetch("https://api.slavic.media/user/login", requestOptions)
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem("lsToken", data.data.token); // Store the token in local storage
          console.log("lsToken", data.data.token);
          console.log("lsStorage", localStorage.lsToken);
        });
    } catch (error) {
      console.error(error);
    }
  };

  // Fetches all documents from the server.
  const getAllDocuments = async () => {
    try {
      const response = await fetch("https://api.slavic.media/blog/articles/");
      const data = await response.json();
      state.value.articles = data; // Update the document's state with the fetched data
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Creates a new document and sends it to the server for storage.
  const newDocument = async () => {
    if (
      !state.value.newTitle ||
      !state.value.newContent ||
      !state.value.newDate ||
      !state.value.newTodoAuthor ||
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
          id: state.value.documentID,
        }),
      };

      // Make the HTTP request
      const response = await fetch(
        "https://api.slavic.media/blog/articles/",
        requestOptions
      );

      // Check if the request was successful
      if (!response.ok) {
        throw new Error("Failed to add new document");
      }

      // Refresh documents after successfully adding a new one
      await getAllDocuments();
    } catch (error) {
      console.error("Error adding new document:", error);
      // Handle the error as appropriate (e.g., show an error message to the user)
    }
  };

  // Deletes a documents item from the server.
  const deleteDocument = async (article) => {
    console.log("delete id from vue: ", article.id);
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
        throw new Error("Failed to delete");
      }

      await getAllDocuments();
    } catch (error) {
      console.log("Error deleting:", error);
    }
  };

  // Function to handle editing a articles item.
  const editDocument = async () => {
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
        throw new Error("Failed to edit");
      }

      router.push("/blog"); // Redirect after successful edit
    } catch (error) {
      console.log("Error documents:", error);
    }
  };

  // Fetch specific articles item code here + articles ref array
  const article = ref({});
  const getSpecificDocument = async (documentID) => {
    try {
      console.log("Fetching with ID:", documentID); // Debugging log

      const response = await fetch(
        `https://api.slavic.media/blog/articles/${documentID}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch specific with ID: ${documentID}`);
      }
      const data = await response.json();
      article.value = data; // Update the document ref with the fetched data
    } catch (error) {
      console.error(error);
    }
  };

  return {
    state,
    getAllDocuments,
    newDocument,
    deleteDocument,
    getSpecificDocument,
    article,
    documentID,
    editDocument,
    swaggerLogin,
  };
};

export default getDocuments;
