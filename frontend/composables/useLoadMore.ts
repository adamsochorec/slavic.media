import { ref, computed } from "vue";

export function useLoadMore(initialCount: number, increment: number) {
  const itemsToShow = ref(initialCount);
  const allItemsShown = ref(false);

  const loadMore = (totalItems: number) => {
    itemsToShow.value += increment;
    if (itemsToShow.value >= totalItems) {
      allItemsShown.value = true;
    }
  };

  const loadLess = () => {
    itemsToShow.value = initialCount;
    allItemsShown.value = false;
  };

  const visibleItems = computed(() => itemsToShow.value);

  return {
    itemsToShow: visibleItems,
    allItemsShown,
    loadMore,
    loadLess,
  };
}
