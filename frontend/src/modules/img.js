import { ref, computed } from "vue";
import { useRoute /* useRouter */ } from "vue-router";

const useImg = () => {
  const route = useRoute();
  // const router = useRouter();

  const documentID = computed(() => route.params.id);
  const state = ref({
    newId: "",
    newAlt: "",
    newTitle: "",
    newFlag: "",
    img: [],
  });

  // Create document - POST
  /*  const newImg = async (galleryId, columnIndex) => {
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
        throw new Error("Failed to add new document");
      }

      await getAllImg();
    } catch (error) {
      console.error("Error adding new document:", error);
    }
  };
 */
  // Read all documents - GET
  const getAllImg = async () => {
    try {
      const response = await fetch("https://api.slavic.media/img/");
      const data = await response.json();

      state.value.img = data;
    } catch (error) {
      console.error(error);
    }
  };

  // Read specific document by ID - GET
  /*   const img = ref({});
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
  }; */

  // Update document - PUT
  /*  const editImg = async (galleryId, columnIndex, imgId) => {
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
        throw new Error("Failed to edit document");
      }
      router.push("/img");
    } catch (error) {
      console.error("Error editing document:", error);
    }
  };
 */
  // Delete document - DELETE
  /*   const deleteImg = async (galleryId, columnIndex, imgId) => {
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
        throw new Error("Failed to delete document");
      }
      await getAllImg();
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  }; */

  return {
    state,
    getAllImg,
    // newImg,
    //  deleteImg,
    // getSpecificImg,
    // img,
    documentID,
    //  editImg,
  };
};

export default useImg;
