<script setup>
import { ref } from "vue";
import { services } from "../assets/services.js";

const visible = ref(false);
const loading = ref(false);

// Form data
const formData = ref({
  fname: "",
  lname: "",
  email: "",
  subject: "",
  message: "",
});

const selectedSubject = ref();
</script>

<template>
  <div class="card flex justify-center">
    <Button
      iconPos="right"
      rounded
      icon="pi pi-pencil"
      label="Request a Proposal"
      @click="visible = true"
    />
    <Dialog
      v-model:visible="visible"
      modal
      class="rounded-lg border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-800 shadow-lg mb-4 p-4"
      header="Request a Proposal"
      :style="{ width: '50vw' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <form action="https://formspree.io/f/mwkgdyez" method="POST">
        <div class="mt-8" style="display: grid; grid-template-columns: 1fr 1fr">
          <FloatLabel class="mb-8">
            <InputText
              name="First Name"
              required
              id="fname"
              v-model="formData.fname"
              style="width: 100%"
            />
            <label for="fname">First Name *</label>
          </FloatLabel>
          <FloatLabel class="mb-8">
            <InputText
              name="Last Name"
              required
              id="lname"
              v-model="formData.lname"
              style="width: 100%"
            />
            <label for="lname">Last Name *</label>
          </FloatLabel>
          <FloatLabel>
            <InputText
              name="Email"
              type="email"
              required
              id="email"
              v-model="formData.email"
              style="width: 100%"
            />
            <label for="email">Email *</label>
          </FloatLabel>
          <FloatLabel>
            <Select
              v-model="selectedSubject"
              :options="services"
              optionLabel="label"
              optionGroupLabel="label"
              optionGroupChildren="items"
              placeholder="Suggested Categories"
              class="w-full md:w-56"
              editable
              style="width: 100%"
            >
              <template #optiongroup="slotProps">
                <div class="flex items-center">
                  <i :class="slotProps.option.icon"></i>
                  <div class="ml-4">{{ slotProps.option.label }}</div>
                </div>
              </template>
            </Select>
            <label for="subject">Subject *</label>
          </FloatLabel>
        </div>
        <FloatLabel class="mt-8">
          <Textarea
            required
            v-model="formData.message"
            rows="7"
            style="width: 100%"
            autocomplete="off"
          />
          <label for="message">Message *</label>
        </FloatLabel>
        <div class="card flex justify-center mt-8">
          <Button
            aria-label="Submit"
            role="button"
            type="submit"
            iconPos="right"
            icon="pi pi-arrow-right"
            :loading="loading"
            label="Submit"
            rounded
          />
        </div>
      </form>
    </Dialog>
  </div>
</template>

<style scoped></style>
