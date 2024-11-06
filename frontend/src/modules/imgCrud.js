import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const useImgCrud = () => {
  const route = useRoute();
  const router = useRouter();

  const documentID = computed(() => route.params.id);
  const state = ref({
    newId: "",
    newFlag: "",
    newTitle: "",
    newAlt: "",
    img: [],
  });

  const getAllImg = async () => {
    try {
      const response = await fetch("https://api.slavic.media/img/");
      const data = await response.json();
      console.log("Fetched data:", data); // Add this line

      state.value.imgs = data;
    } catch (error) {
      console.error(error);
    }
  };

  const newImg = async () => {
    if (
      !state.value.newId ||
      !state.value.newFlag ||
      !state.value.newTitle ||
      !state.value.newAlt
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
          id: state.value.newId,
          flag: state.value.newFlag,
          title: state.value.newTitle,
          alt: state.value.newAlt,
        }),
      };

      const response = await fetch(
        "https://api.slavic.media/img/",
        requestOptions
      );

      if (!response.ok) {
        throw new Error("Failed to add new document");
      }

      await getAllImg();
    } catch (error) {
      console.error("Error adding new document:", error);
    }
  };

  const deleteImg = async (img) => {
    try {
      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.lsToken,
        },
      };
      const response = await fetch(
        `https://api.slavic.media/img/${img.id}`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error("Failed to delete document");
      }

      await getAllImg();
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  const editImg = async () => {
    try {
      if (!documentID.value) {
        throw new Error("No ID provided");
      }
      if (
        !state.value.newId ||
        !state.value.newFlag ||
        !state.value.newTitle ||
        !state.value.newAlt
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
          id: state.value.newId,
          flag: state.value.newFlag,
          title: state.value.newTitle,
          alt: state.value.newAlt,
        }),
      };

      const url = "https://api.slavic.media/img/" + documentID.value;
      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw new Error("Failed to edit document");
      }

      router.push("/img");
    } catch (error) {
      console.error("Error editing document:", error);
    }
  };

  const img = ref({});
  const getSpecificImg = async (documentID) => {
    try {
      const response = await fetch(
        `https://api.slavic.media/img/${documentID}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch document with ID: ${documentID}`);
      }
      const data = await response.json();
      img.value = data;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    state,
    getAllImg,
    newImg,
    deleteImg,
    getSpecificImg,
    img,
    documentID,
    editImg,
  };
};

export default useImgCrud;
