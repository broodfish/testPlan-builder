<template>
  <v-dialog v-model="modelValue" max-width="400">
    <v-card class="tw-p-4">
      <v-card-title class="tw-text-center">New Test Case</v-card-title>
      <v-card-text>
        <v-text-field v-model="description" label="Description"></v-text-field>
        <v-combobox
          v-model="suite"
          :items="
            getExistedSuites(
              Number(route.params.projectID),
              Number(route.params.planID),
            )
          "
          label="Test Suites"
        ></v-combobox>
        <v-select
          v-model="priority"
          :items="['High', 'Medium', 'Low']"
          label="Priority"
        ></v-select>
        <v-text-field
          v-model="prerequisite"
          label="Prerequisite"
        ></v-text-field>
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
const route = useRoute();
const props = defineProps<{
  modelValue: boolean;
  data: Case;
}>();
const emit = defineEmits(["update:modelValue", "edit"]);
const modelValue = computed<boolean>({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
const description = ref<string>(props.data.description);
const suite = ref<string | undefined>(
  getSuite(
    Number(route.params.projectID),
    Number(route.params.planID),
    props.data.gid,
  )?.name,
);
const priority = ref<string>(props.data.priority);
const prerequisite = ref<string>(props.data.prerequisite);

const editHandler = () => {
  modelValue.value = false;
  emit("edit");
};

watch(
  () => props.data,
  (value) => {
    description.value = value.description;
    priority.value = value.priority;
    prerequisite.value = value.prerequisite;
    suite.value = getSuite(
      Number(route.params.projectID),
      Number(route.params.planID),
      props.data.gid,
    )?.name;
  },
);
</script>
