import { ref } from "vue";
import axios from "axios";

const fetchedImages = ref<Record<string, any>>({});

const fetchImageData = async (imageIds: string[]) => {
  try {
    const response = await axios.post("/api/images", { ids: imageIds });
    response.data.forEach((img: any) => {
      fetchedImages.value[img._id] = img;
    });
  } catch (error) {
    console.error("Error fetching image data:", error);
  }
};

const extractImageIds = (galleries: any[]) => {
  const ids: string[] = [];
  galleries.forEach((gallery) => {
    gallery.columns.forEach((column: string[]) => {
      column.forEach((id: string) => {
        if (!ids.includes(id)) {
          ids.push(id);
        }
      });
    });
  });
  return ids;
};

export { fetchedImages, fetchImageData, extractImageIds };
