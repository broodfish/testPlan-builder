<template>
  <v-dialog v-model="modelValue" max-width="300">
    <v-card class="tw-p-4" color="errorContainer">
      <v-card-title class="tw-text-center">Confirm Deletion?</v-card-title>
      <v-card-actions>
        <v-btn color="error" variant="flat" width="100" @click="deleteHandler"
          >Confirm</v-btn
        >
        <v-btn
          color="white"
          variant="flat"
          width="100"
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
const emit = defineEmits(["update:modelValue", "delete"]);
const modelValue = computed<boolean>({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const deleteHandler = () => {
  modelValue.value = false;
  emit("delete");
};
</script>
