import { ref } from "vue";

const state = ref({
  image: [],
});

const getAllImages = async () => {
  try {
    const response = await fetch("https://api.slavic.media/images/");
    if (!response.ok) {
      throw new Error("Failed to fetch photo galleries");
    }
    const data = await response.json();
    state.value.image = data;
  } catch (error) {
    console.error(error);
  }
};

export default {
  state,
  getAllImages,
};
