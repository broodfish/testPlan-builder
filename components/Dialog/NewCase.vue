<template>
  <v-dialog v-model="modelValue" max-width="400">
    <v-card class="tw-p-4">
      <v-card-title class="tw-text-center">New Test Case</v-card-title>
      <v-card-text>
        <v-text-field label="Description"></v-text-field>
        <v-combobox
          :items="
            getExistedSuites(
              Number(route.params.projectID),
              Number(route.params.planID),
            )
          "
          label="Test Suites"
        ></v-combobox>
        <v-select
          :items="['High', 'Medium', 'Low']"
          label="Priority"
        ></v-select>
        <v-text-field label="Prerequisite"></v-text-field>
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
const route = useRoute();
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
