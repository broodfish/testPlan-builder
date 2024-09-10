<template>
  <v-dialog v-model="modelValue" max-width="320">
    <v-card class="px-4 py-6">
      <v-card-title class="tw-text-center">Confirm Deletion?</v-card-title>
      <v-card-actions>
        <div class="w-100 pt-8 tw-flex tw-justify-center tw-gap-2">
          <v-btn color="error" variant="flat" width="120" @click="deleteHandler"
            >Confirm</v-btn
          >
          <v-btn
            color="error"
            variant="outlined"
            width="120"
            @click="modelValue = false"
            >Cancel</v-btn
          >
        </div>
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
