<template>
  <v-dialog v-model="modelValue" max-width="400">
    <v-card class="tw-p-4">
      <v-card-title class="tw-text-center">New Test Plan</v-card-title>
      <v-card-text>
        <v-text-field label="Title"></v-text-field>
        <v-textarea label="Description"></v-textarea>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" width="100" variant="flat" @click="addHandler"
          >Add</v-btn
        >
        <v-btn
          color="surfaceVariant"
          width="100"
          variant="flat"
          @click="modelValue = false"
          >Cancel</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean;
}>();
const emit = defineEmits(["update:modelValue", "add"]);
const modelValue = computed<boolean>({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const addHandler = () => {
  modelValue.value = false;
  emit("add");
};
</script>
