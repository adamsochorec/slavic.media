import { ref } from "vue";

const useUserCrud = () => {
  const state = ref({
    users: {},
  });

  // Create document - POST
  const newUser = async (user) => {
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      };

      const response = await fetch(
        "https://slavic-media-2-0.onrender.com/user/",
        requestOptions
      );

      if (!response.ok) {
        throw new Error("Failed to add new document");
      }

      await getAllUsers();
    } catch (error) {
      console.error("Error adding new document:", error);
    }
  };

  // Read all documents - GET
  const getAllUsers = async () => {
    try {
      const response = await fetch(
        "https://slavic-media-2-0.onrender.com/user/"
      );
      const data = await response.json();
      state.value.users = data;
    } catch (error) {
      console.error(error);
    }
  };

  // Update document - PUT
  const editUser = async (userId, user) => {
    try {
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      };

      const response = await fetch(
        `https://slavic-media-2-0.onrender.com/user/${userId}`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error("Failed to edit document");
      }

      await getAllUsers();
    } catch (error) {
      console.error("Error editing document:", error);
    }
  };

  // Delete document - DELETE
  const deleteUser = async (userId) => {
    try {
      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(
        `https://slavic-media-2-0.onrender.com/user/${userId}`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error("Failed to delete document");
      }

      await getAllUsers();
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  return {
    state,
    getAllUsers,
    newUser,
    deleteUser,
    editUser,
  };
};

export default useUserCrud;
