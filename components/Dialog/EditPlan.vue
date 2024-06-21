<template>
  <v-dialog v-model="modelValue" max-width="400">
    <v-card class="tw-p-4">
      <v-card-title class="tw-text-center">Edit Test Plan</v-card-title>
      <v-card-text>
        <v-text-field v-model="title" label="Title"></v-text-field>
        <v-textarea v-model="description" label="Description"></v-textarea>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" width="100" variant="flat" @click="editHandler"
          >Edit</v-btn
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
  item: Plan;
}>();
const emit = defineEmits(["update:modelValue", "edit"]);
const modelValue = computed<boolean>({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
const title = ref<string>("");
const description = ref<string>("");

const editHandler = () => {
  modelValue.value = false;
  emit("edit");
};

watch(
  () => props.item,
  (value) => {
    title.value = value.title;
    description.value = value.description;
  },
);
</script>
