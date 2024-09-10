<template>
  <v-dialog v-model="modelValue" max-width="360">
    <v-card class="px-4 py-4">
      <v-card-title class="tw-text-center">Create New Test Run</v-card-title>
      <v-card-text>
        Are you ready to run
        <span class="text-primary tw-font-bold">{{ props.item.name }}</span
        >?
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" width="100" variant="flat" @click="createHandler"
          >Create</v-btn
        >
        <v-btn width="100" variant="outlined" @click="modelValue = false"
          >Cancel</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean;
  item: Plan;
}>();
const emit = defineEmits(["update:modelValue", "create"]);
const modelValue = computed<boolean>({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const createHandler = () => {
  modelValue.value = false;
  emit("create");
};
</script>
