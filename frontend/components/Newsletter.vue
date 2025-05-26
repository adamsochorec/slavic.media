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
    const res = await fetch("https://api.slavic.media/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: email.value }),
    });
    if (!res.ok) {
      const text = await res.text();
      if (res.status === 409) {
        error.value = "This email is already subscribed.";
      } else {
        error.value = "Subscription failed. Please try again.";
      }
      throw new Error("Failed to subscribe.");
    }
    message.value = "Thank you for subscribing!";
    email.value = "";
  } catch (err: any) {
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
        placeholder="Your email address"
        :disabled="loading"
        required
      />
      <Btn
        tag="button"
        variant="secondary"
        type="submit"
        icon="envelope"
        :disabled="loading"
        >register</Btn
      >
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
  color: rgba(var(--primary-color), 1);
}
.success,
.error {
  font-size: var(--font-size-7);
}

form {
  display: flex;
  align-items: center;
  margin-top: 5px;
  .cta {
    margin-top: 0 !important;
    border-radius: 0 var(--border-radius-2) var(--border-radius-2) 0;
  }
  .cta * {
    font-size: 1em;
  }
  input {
    width: auto;
    height: 100%;
    padding: 10px;
    border-radius: var(--border-radius-2) 0 0 var(--border-radius-2);
    border-right: none;
    font-size: var(--font-size-7);
  }
}
</style>
