import { ref } from "vue";

export function useShowMore(defaultIncrement: number) {
  const itemsToShow = ref(defaultIncrement);
  const allItemsShown = ref(false);

  const loadMoreItems = (totalItems: number) => {
    itemsToShow.value += defaultIncrement;
    if (itemsToShow.value >= totalItems) {
      allItemsShown.value = true;
    }
  };

  const showLessItems = () => {
    itemsToShow.value = defaultIncrement;
    allItemsShown.value = false;
  };

  return {
    itemsToShow,
    allItemsShown,
    loadMoreItems,
    showLessItems,
  };
}
