<template>
  <v-dialog v-model="modelValue" max-width="400">
    <v-card class="tw-p-4">
      <v-card-title class="tw-text-center">Create New Test Run</v-card-title>
      <v-card-text>
        <div class="tw-flex tw-flex-col">
          <label class="text-outlineVariant text-subtitle-2">Test Plan</label>
          <span>{{ props.item.title }}</span>
        </div>
        <div class="tw-flex tw-flex-col">
          <label
            for="configurations"
            class="text-outlineVariant text-subtitle-2"
            >Configurations</label
          >
          <v-combobox
            multiple
            chips
            :items="configSelections"
            color="primary"
            clearable
          ></v-combobox>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" width="100" variant="flat" @click="createHandler"
          >Create</v-btn
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
const emit = defineEmits(["update:modelValue", "create"]);
const modelValue = computed<boolean>({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const createHandler = () => {
  modelValue.value = false;
  emit("create");
};

const configSelections = ref([
  "Microsoft Edge",
  "Chrome",
  "Safari",
  "iOS",
  "Android",
]);
</script>
