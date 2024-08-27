<script setup>
import Carousel from "primevue/carousel";
import Tag from "primevue/tag";
import Button from "primevue/button";

// CAROUSEL
const products = [
  {
    id: 1,
    name: "Product 1",
    image: "product1.jpg",
    price: 29.99,
    inventoryStatus: "INSTOCK",
  },
  {
    id: 2,
    name: "Product 2",
    image: "product2.jpg",
    price: 19.99,
    inventoryStatus: "LOWSTOCK",
  },
  {
    id: 3,
    name: "Product 3",
    image: "product3.jpg",
    price: 39.99,
    inventoryStatus: "OUTOFSTOCK",
  },
  {
    id: 4,
    name: "Product 4",
    image: "product4.jpg",
    price: 49.99,
    inventoryStatus: "INSTOCK",
  },
];

const responsiveOptions = [
  {
    breakpoint: "1024px",
    numVisible: 3,
    numScroll: 1,
  },
  {
    breakpoint: "768px",
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: "560px",
    numVisible: 1,
    numScroll: 1,
  },
];

const getSeverity = (status) => {
  switch (status) {
    case "INSTOCK":
      return "success";
    case "LOWSTOCK":
      return "warning";
    case "OUTOFSTOCK":
      return "danger";
    default:
      return null;
  }
};
</script>
<script setup></script>
<template>
  <div class="home">
    <Carousel
      :value="products"
      :numVisible="3"
      :numScroll="1"
      :responsiveOptions="responsiveOptions"
      circular
      :autoplayInterval="3000"
    >
      <template #item="slotProps">
        <div
          class="border border-surface-200 dark:border-surface-700 rounded m-2 p-4"
        >
          <div class="mb-4">
            <div class="relative mx-auto">
              <img
                :src="
                  'https://primefaces.org/cdn/primevue/images/product/' +
                  slotProps.data.image
                "
                :alt="slotProps.data.name"
                class="w-full rounded"
              />
              <Tag
                :value="slotProps.data.inventoryStatus"
                :severity="getSeverity(slotProps.data.inventoryStatus)"
                class="absolute"
                style="left: 5px; top: 5px"
              />
            </div>
          </div>
          <div class="mb-4 font-medium">{{ slotProps.data.name }}</div>
          <div class="flex justify-between items-center">
            <div class="mt-0 font-semibold text-xl">
              ${{ slotProps.data.price }}
            </div>
            <span>
              <Button icon="pi pi-heart" severity="secondary" outlined />
              <Button icon="pi pi-shopping-cart" class="ml-2" />
            </span>
          </div>
        </div>
      </template>
    </Carousel>
  </div>
</template>

<style lang="scss" scoped></style>
