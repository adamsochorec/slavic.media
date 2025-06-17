import { ref, onMounted, onUnmounted } from "vue";

export function useMouseTracking() {
  const containerRef = ref(null);

  const handleMouseMove = (e) => {
    const cards = containerRef.value?.getElementsByClassName("card");
    if (!cards) return;

    for (const card of cards) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    }
  };

  onMounted(() => {
    if (containerRef.value) {
      containerRef.value.addEventListener("mousemove", handleMouseMove);
    }
  });

  onUnmounted(() => {
    if (containerRef.value) {
      containerRef.value.removeEventListener("mousemove", handleMouseMove);
    }
  });

  return {
    containerRef,
  };
}
