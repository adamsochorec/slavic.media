<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import eventBus from "@/composables/useEventBus";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { FormField } from "@primevue/forms";
import { z } from "zod";

const isVisible = ref(false);
const formIdentifier = ref<string>("");

const resolver = zodResolver(
  z.object({
    email: z.string().email({ message: "Email is required." }),
    firstName: z.string().min(1, { message: "First name is required." }),
    lastName: z.string().min(1, { message: "Last name is required." }),
    company: z.string().optional(), // Optional field
    message: z.string().min(1, { message: "Message is required." }),
  })
);

onMounted(() => {
  eventBus.on("showRequestAProposal", (identifier: string) => {
    formIdentifier.value = identifier; // Set the identifier
    isVisible.value = true;
    Fancybox.show([{ src: "#requestAProposalPopup" }]);
  });
});
</script>

<template>
  <div id="requestAProposalPopup" style="display: none">
    <div class="card flex wrapper-narrow">
      <Form
        :resolver
        class="flex flex-col gap-4 w-full"
        method="POST"
        action="https://formspree.io/f/mwkgdyez"
        ><h4>Request a proposal</h4>
        <FormField v-slot="$field" name="email" initialValue="">
          <FloatLabel variant="in">
            <InputText
              v-model="$field.value"
              :id="$field.name"
              class="input"
              size="small"
            />
            <label for="email">Work email</label>
          </FloatLabel>
          <Message
            v-if="$field?.invalid"
            severity="error"
            variant="simple"
            class="message"
            >{{ $field.error?.message }}</Message
          >
        </FormField>
        <div style="display: flex;  gap: var(--grid-gap-2)">
          <FormField v-slot="$field" name="firstName" initialValue="">
            <FloatLabel variant="in">
              <InputText
                v-model="$field.value"
                :id="$field.name"
                class="input"
              />
              <label for="firstName">First name</label>
            </FloatLabel>
            <Message
              v-if="$field?.invalid"
              severity="error"
              variant="simple"
              class="message"
              >{{ $field.error?.message }}</Message
            >
          </FormField>
          <FormField v-slot="$field" name="lastName" initialValue="">
            <FloatLabel variant="in">
              <InputText
                v-model="$field.value"
                :id="$field.name"
                class="input"
              />
              <label for="lastName">Last name</label>
            </FloatLabel>
            <Message
              v-if="$field?.invalid"
              severity="error"
              variant="simple"
              class="message"
              >{{ $field.error?.message }}</Message
            >
          </FormField>
        </div>

        <FormField v-slot="$field" name="company" initialValue="">
          <FloatLabel variant="in">
            <InputText v-model="$field.value" :id="$field.name" class="input" />
            <label for="company">Company</label>
          </FloatLabel>
          <Message
            v-if="$field?.invalid"
            severity="error"
            variant="simple"
            class="message"
            >{{ $field.error?.message }}</Message
          >
        </FormField>
        <FormField v-slot="$field" name="message" initialValue="">
          <FloatLabel variant="in">
            <TextArea
              v-model="$field.value"
              :id="$field.name"
              rows="4"
              class="input"
            />
            <label for="message">Message</label>
          </FloatLabel>
          <Message
            v-if="$field?.invalid"
            severity="error"
            variant="simple"
            class="message"
            >{{ $field.error?.message }}</Message
          >
        </FormField>
        <input type="hidden" name="source" :value="formIdentifier" />
        <p style="font-size: var(--font-size-7)">
          By submitting form you agree with our
          <router-link to="/legal/privacy-policy">Privacy Policy</router-link>.
        </p>
        <button class="flex-center" type="submit">
          <div class="cta">Submit</div>
        </button>
      </Form>
    </div>
  </div>
</template>
<style scoped>
label {
  font-size: var(--font-size-6);
  font-family: var(--content-font);
  font-optical-sizing: auto;
  font-weight: 100;
  font-style: normal;
  color: white;
  line-height: 1;
  font-weight: bold;
}

.message {
  font-family: var(--content-font);
  font-optical-sizing: auto;
  font-weight: 100;
  font-style: normal;
  font-weight: bold;
}

.p-floatlabel:has(.p-invalid) label,
.message {
  color: rgb(var(--primary-color));
  font-family: var(--content-font);
  font-optical-sizing: auto;
  font-weight: 100;
  font-style: normal;
  font-weight: bold;
}

.p-checkbox-checked .p-checkbox-box {
  border-color: rgb(var(--secondary-color));
  background-color: rgb(var(--secondary-color));
}
.p-inputtext:enabled:focus,
.p-textarea:enabled:focus {
  border-color: rgb(var(--secondary-color));
}
.p-inputtext.p-invalid,
.p-textarea.p-invalid,
.p-checkbox.p-invalid {
  border-color: rgb(var(--primary-color));
}
.p-checkbox-checked .p-checkbox-icon {
  color: white !important;
}
.cta {
  width: 100%;
  min-width: 100%;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}
.fancybox__content {
  background: rgb(var(--dark-grey-color));
  border-radius: var(--border-radius-1);
}
.input {
  width: 100%;
}
</style>
