import { ref } from "vue";

const state = ref({
  img: [],
});

const getAllImg = async () => {
  try {
    const response = await fetch("https://api.slavic.media/images/");
    if (!response.ok) {
      throw new Error("Failed to fetch photo galleries");
    }
    const data = await response.json();
    state.value.img = data;
  } catch (error) {
    console.error(error);
  }
};

export default {
  state,
  getAllImg,
};
