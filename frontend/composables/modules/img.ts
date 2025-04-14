import { ref } from "vue";

const state = ref({
  img: [],
});

const getAllImgs = async (type: string) => {
  try {
    const response = await fetch(`https://api.slavic.media/img?type=${type}`);
    if (!response.ok) {
      throw new Error("Failed to fetch photo galleries");
    }
    const data = await response.json();
    data.sort((a: any, b: any) => b.index - a.index);
    state.value.img = data;
  } catch (error) {
    console.error(error);
  }
};

export default {
  state,
  getAllImgs,
};
