import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const usePhotoCrud = () => {
  const route = useRoute();
  const router = useRouter();

  const documentID = computed(() => route.params.id);
  const state = ref({
    newLargeURL: "",
    newThumbnailURL: "",
    newWidth: 0,
    newHeight: 0,
    newFlag: "",
    newTitle: "",
    newAlt: "",
    photos: {},
  });

  const getAllPhotos = async () => {
    try {
      const response = await fetch("https://api.slavic.media/photos/");
      const data = await response.json();
      state.value.photos = data;
    } catch (error) {
      console.error(error);
    }
  };

  const newPhoto = async () => {
    if (
      !state.value.newLargeURL ||
      !state.value.newThumbnailURL ||
      !state.value.newWidth ||
      !state.value.newHeight ||
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
          largeURL: state.value.newLargeURL,
          thumbnailURL: state.value.newThumbnailURL,
          width: state.value.newWidth,
          height: state.value.newHeight,
          flag: state.value.newFlag,
          title: state.value.newTitle,
          alt: state.value.newAlt,
        }),
      };

      const response = await fetch(
        "https://api.slavic.media/photos/",
        requestOptions
      );

      if (!response.ok) {
        throw new Error("Failed to add new photo");
      }

      await getAllPhotos();
    } catch (error) {
      console.error("Error adding new photo:", error);
    }
  };

  const deletePhoto = async (photoId) => {
    try {
      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.lsToken,
        },
      };
      const response = await fetch(
        `https://api.slavic.media/photos/${photoId}`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error("Failed to delete photo");
      }

      await getAllPhotos();
    } catch (error) {
      console.error("Error deleting photo:", error);
    }
  };

  const editPhoto = async () => {
    try {
      if (!documentID.value) {
        throw new Error("No ID provided");
      }
      if (
        !state.value.newLargeURL ||
        !state.value.newThumbnailURL ||
        !state.value.newWidth ||
        !state.value.newHeight ||
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
          largeURL: state.value.newLargeURL,
          thumbnailURL: state.value.newThumbnailURL,
          width: state.value.newWidth,
          height: state.value.newHeight,
          flag: state.value.newFlag,
          title: state.value.newTitle,
          alt: state.value.newAlt,
        }),
      };

      const url = "https://api.slavic.media/photos/" + documentID.value;
      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw new Error("Failed to edit photo");
      }

      router.push("/photos");
    } catch (error) {
      console.error("Error editing photo:", error);
    }
  };

  const photo = ref({});
  const getSpecificPhoto = async (documentID) => {
    try {
      const response = await fetch(
        `https://api.slavic.media/photos/${documentID}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch photo with ID: ${documentID}`);
      }
      const data = await response.json();
      photo.value = data;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    state,
    getAllPhotos,
    newPhoto,
    deletePhoto,
    getSpecificPhoto,
    photo,
    documentID,
    editPhoto,
  };
};

export default usePhotoCrud;
