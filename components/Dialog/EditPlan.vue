<template>
  <v-dialog v-model="modelValue" max-width="360">
    <v-card class="px-4 py-4">
      <v-card-title class="tw-text-center">Edit Test Plan</v-card-title>
      <v-card-text>
        <v-text-field v-model="name" label="Name"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" width="100" variant="flat" @click="editHandler"
          >Update</v-btn
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
const emit = defineEmits(["update:modelValue", "edit"]);
const modelValue = computed<boolean>({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
const name = ref<string>(props.item.name);

const editHandler = () => {
  modelValue.value = false;
  emit("edit");
};

watch(
  () => props.item,
  (value) => {
    name.value = value.name;
  },
);
</script>
