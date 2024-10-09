import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const usePhotoServicesCrud = () => {
  const route = useRoute();
  const router = useRouter();

  const documentID = computed(() => route.params.id);
  const state = ref({
    newTitle: "",
    newHandle: "",
    newDescription: "",
    newColumn1: [],
    newColumn2: [],
    newColumn3: [],
    newColumn4: [],
    photoServices: [],
  });

  const getAllPhotoServices = async () => {
    try {
      const response = await fetch("https://api.slavic.media/photoServices/");
      const data = await response.json();
      state.value.photoServices = data;
    } catch (error) {
      console.error("Error fetching photo services:", error);
    }
  };

  const newPhotoService = async () => {
    if (
      !state.value.newTitle ||
      !state.value.newHandle ||
      !state.value.newDescription ||
      !state.value.newColumn1.length ||
      !state.value.newColumn2.length ||
      !state.value.newColumn3.length ||
      !state.value.newColumn4.length
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
          handle: state.value.newHandle,
          description: state.value.newDescription,
          column1: state.value.newColumn1,
          column2: state.value.newColumn2,
          column3: state.value.newColumn3,
          column4: state.value.newColumn4,
        }),
      };

      const response = await fetch(
        "https://api.slavic.media/photoServices/",
        requestOptions
      );

      if (!response.ok) {
        throw new Error("Failed to add new photo service");
      }

      await getAllPhotoServices();
    } catch (error) {
      console.error("Error adding new photo service:", error);
    }
  };

  const deletePhotoService = async (photoService) => {
    try {
      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.lsToken,
        },
      };
      const response = await fetch(
        `https://api.slavic.media/photoServices/${photoService.id}`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error("Failed to delete photo service");
      }

      await getAllPhotoServices();
    } catch (error) {
      console.error("Error deleting photo service:", error);
    }
  };

  const editPhotoService = async () => {
    try {
      if (!documentID.value) {
        throw new Error("No ID provided");
      }
      if (
        !state.value.newTitle ||
        !state.value.newHandle ||
        !state.value.newDescription ||
        !state.value.newColumn1.length ||
        !state.value.newColumn2.length ||
        !state.value.newColumn3.length ||
        !state.value.newColumn4.length
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
          handle: state.value.newHandle,
          description: state.value.newDescription,
          column1: state.value.newColumn1,
          column2: state.value.newColumn2,
          column3: state.value.newColumn3,
          column4: state.value.newColumn4,
        }),
      };

      const url = "https://api.slavic.media/photoServices/" + documentID.value;
      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw new Error("Failed to edit photo service");
      }

      router.push("/photoServices");
    } catch (error) {
      console.error("Error editing photo service:", error);
    }
  };

  const photoService = ref({});
  const getSpecificPhotoService = async (documentID) => {
    try {
      const response = await fetch(
        `https://api.slavic.media/photoServices/${documentID}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch photo service with ID: ${documentID}`);
      }
      const data = await response.json();
      photoService.value = data;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    state,
    getAllPhotoServices,
    newPhotoService,
    deletePhotoService,
    getSpecificPhotoService,
    photoService,
    documentID,
    editPhotoService,
  };
};

export default usePhotoServicesCrud;
