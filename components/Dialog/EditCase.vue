<template>
  <v-dialog v-model="modelValue" max-width="360">
    <v-card class="px-4 py-4">
      <v-card-title class="tw-text-center">Edit Test Case</v-card-title>
      <v-card-text>
        <v-text-field v-model="name" label="Name"></v-text-field>
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
          ><template #selection="{ item }">
            <v-chip v-if="item.title === 'High'" color="error">{{
              item.title
            }}</v-chip>
            <v-chip v-else-if="item.title === 'Medium'" color="primary">{{
              item.title
            }}</v-chip>
            <v-chip v-else color="secondary">{{ item.title }}</v-chip>
          </template>
          <template #item="{ props: itemProps, item }">
            <v-list-item
              v-if="item.title === 'High'"
              v-bind="itemProps"
              base-color="error"
              color="error"
            ></v-list-item>
            <v-list-item
              v-else-if="item.title === 'Medium'"
              v-bind="itemProps"
              base-color="primary"
              color="primary"
            ></v-list-item>
            <v-list-item
              v-else
              v-bind="itemProps"
              base-color="secondary"
              color="secondary"
            ></v-list-item> </template
        ></v-select>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" width="100" variant="flat" @click="editHandler"
          >Edit</v-btn
        >
        <v-btn width="100" variant="outlined" @click="modelValue = false"
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
const name = ref<string>(props.data.name);
const suite = ref<string | undefined>(
  getPlanSuite(
    Number(route.params.projectID),
    Number(route.params.planID),
    props.data.gid,
  )?.name,
);
const priority = ref<string>(props.data.priority);

const editHandler = () => {
  modelValue.value = false;
  emit("edit");
};

watch(
  () => props.data,
  (value) => {
    name.value = value.name;
    priority.value = value.priority;
    suite.value = getPlanSuite(
      Number(route.params.projectID),
      Number(route.params.planID),
      props.data.gid,
    )?.name;
  },
);
</script>
