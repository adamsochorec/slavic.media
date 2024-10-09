import { ref } from "vue";

const useUserCrud = () => {
  const state = ref({
    users: {},
  });

  const getAllUsers = async () => {
    try {
      const response = await fetch("https://api.slavic.media/users/");
      const data = await response.json();
      state.value.users = data;
    } catch (error) {
      console.error(error);
    }
  };

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
        "https://api.slavic.media/users/",
        requestOptions
      );

      if (!response.ok) {
        throw new Error("Failed to add new user");
      }

      await getAllUsers();
    } catch (error) {
      console.error("Error adding new user:", error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(
        `https://api.slavic.media/users/${userId}`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      await getAllUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

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
        `https://api.slavic.media/users/${userId}`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error("Failed to edit user");
      }

      await getAllUsers();
    } catch (error) {
      console.error("Error editing user:", error);
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
