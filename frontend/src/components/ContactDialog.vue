<script setup>
import { ref } from "vue";
import { services } from "../assets/services.js";

const visible = ref(false);
// Submit BTN
const loading = ref(false);
const load = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 2000);
};
// Form data
const formData = ref({
  fname: "",
  lname: "",
  email: "",
  subject: "",
  message: "",
});
const selectedSubject = ref();
const accept = ref(false);
</script>

<template>
  <div>
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
      class="rounded-lg border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-800 shadow-lg"
      header="Request a Proposal"
      :style="{ width: '50vw' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <form action="https://formspree.io/f/mwkgdyez" method="POST">
        <Fluid class="mt-8">
          <div class="grid grid-cols-2 gap-8">
            <FloatLabel>
              <InputText
                name="First Name"
                required
                type="text"
                autocomplete="given-name"
                autofocus
                id="fname"
                v-model="formData.fname"
                style="width: 100%"
                fluid
              />
              <label for="fname">First Name *</label></FloatLabel
            >
            <FloatLabel>
              <InputText
                name="Last Name"
                required
                type="text"
                autocomplete="family-name"
                id="fname"
                v-model="formData.lname"
                style="width: 100%"
                fluid
              />
              <label for="fname">Last Name *</label></FloatLabel
            >
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
                type="text"
                optionGroupLabel="label"
                optionGroupChildren="items"
                placeholder="Suggested Categories"
                class="w-full md:w-56"
                editable
                fluid
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
          <div class="col-span-full mt-8">
            <FloatLabel>
              <Textarea
                required
                v-model="formData.message"
                rows="7"
                type="text"
                style="width: 100%"
                autocomplete="off"
                fluid
              />
              <label for="message">Message *</label>
            </FloatLabel>
          </div>
        </Fluid>

        <div class="flex items-center gap-2">
          <Checkbox
            id="accept"
            v-model="accept"
            name="accept"
            value="Accept"
            required
          />
          <label for="accept">I agree to the terms and conditions.</label>
        </div>
        <div class="card flex justify-center mt-8">
          <Button
            aria-label="Submit"
            role="button"
            type="submit"
            iconPos="right"
            icon="pi pi-arrow-right"
            :loading="loading"
            @click="load"
            label="Submit"
            rounded
          />
        </div>
      </form>
    </Dialog>
  </div>
</template>

<style scoped></style>
