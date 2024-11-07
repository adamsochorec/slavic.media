import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const useImgCrud = () => {
  const route = useRoute();
  const router = useRouter();

  const documentID = computed(() => route.params.id);
  const state = ref({
    newId: "",
    newAlt: "",
    newTitle: "",
    newFlag: "",
    img: [],
  });

  const getAllImg = async () => {
    try {
      const response = await fetch("https://api.slavic.media/img/");
      const data = await response.json();

      state.value.img = data;
    } catch (error) {
      console.error(error);
    }
  };

  const newImg = async (galleryId, columnIndex) => {
    if (
      !state.value.newId ||
      !state.value.newAlt ||
      !state.value.newTitle ||
      !state.value.newFlag
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
          _id: state.value.newId,
          alt: state.value.newAlt,
          title: state.value.newTitle,
          flag: state.value.newFlag,
        }),
      };

      const response = await fetch(
        `https://api.slavic.media/img/${galleryId}/${columnIndex}`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error("Failed to add new img");
      }

      await getAllImg();
    } catch (error) {
      console.error("Error adding new img:", error);
    }
  };

  const deleteImg = async (galleryId, columnIndex, imgId) => {
    try {
      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.lsToken,
        },
      };
      const response = await fetch(
        `https://api.slavic.media/img/${galleryId}/${columnIndex}/${imgId}`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error("Failed to delete img");
      }

      await getAllImg();
    } catch (error) {
      console.error("Error deleting img:", error);
    }
  };

  const editImg = async (galleryId, columnIndex, imgId) => {
    try {
      if (!documentID.value) {
        throw new Error("No ID provided");
      }
      if (
        !state.value.newId ||
        !state.value.newAlt ||
        !state.value.newTitle ||
        !state.value.newFlag
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
          _id: state.value.newId,
          alt: state.value.newAlt,
          title: state.value.newTitle,
          flag: state.value.newFlag,
        }),
      };

      const url = `https://api.slavic.media/img/${galleryId}/${columnIndex}/${imgId}`;
      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw new Error("Failed to edit img");
      }

      router.push("/img");
    } catch (error) {
      console.error("Error editing img:", error);
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
