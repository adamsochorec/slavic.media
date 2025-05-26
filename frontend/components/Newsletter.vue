<script setup lang="ts">
import { ref } from "vue";
import { z } from "zod";

const email = ref("");
const loading = ref(false);
const message = ref("");
const error = ref("");

const emailSchema = z
  .string()
  .email({ message: "Please enter a valid email address." });

async function submitForm(e: Event) {
  e.preventDefault();
  message.value = "";
  error.value = "";

  const result = emailSchema.safeParse(email.value);
  if (!result.success) {
    error.value = result.error.errors[0].message;
    return;
  }

  loading.value = true;
  try {
    const res = await fetch("https:///api.slavic.media/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.value }),
    });
    if (!res.ok) throw new Error("Failed to subscribe.");
    message.value = "Thank you for subscribing!";
    email.value = "";
  } catch (err) {
    error.value = "Subscription failed. Please try again.";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="container">
    <form @submit="submitForm">
      <input
        v-model="email"
        type="email"
        placeholder="email"
        :disabled="loading"
        required
      />
      <button type="submit" :disabled="loading">register</button>
    </form>
    <p v-if="message" class="success">{{ message }}</p>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<style lang="postcss" scoped>
.success {
  color: green;
}
.error {
  color: red;
}
</style>
