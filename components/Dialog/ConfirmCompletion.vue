<template>
  <v-dialog v-model="modelValue" max-width="300">
    <v-card class="tw-p-4" color="primaryContainer">
      <v-card-title class="tw-text-center">Complete Test Run?</v-card-title>
      <v-card-actions>
        <v-btn color="primary" variant="flat" width="100" @click="trueHandler"
          >Yes</v-btn
        >
        <v-btn
          color="white"
          variant="flat"
          width="100"
          @click="modelValue = false"
          >No</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean;
}>();
const emit = defineEmits(["update:modelValue", "true"]);
const modelValue = computed<boolean>({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const trueHandler = () => {
  modelValue.value = false;
  emit("true");
};
</script>
