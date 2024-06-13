<template>
  <div>
    <div>
      <span class="subtitle">information</span>
      <div class="tw-m-4 tw-grid tw-grid-cols-2 tw-gap-4">
        <div class="item">
          <span class="label">Description</span>
          <span>{{ currentCase?.description }}</span>
        </div>
        <div class="item">
          <span class="label">Case ID</span>
          <span>{{ currentCase?.id }}</span>
        </div>
        <div class="item">
          <span class="label">Team Suite</span>
          <span>{{ currentSuite }}</span>
        </div>
        <div class="item">
          <span class="label">Priority</span>
          <span>{{ currentCase?.priority }}</span>
        </div>
        <div class="item">
          <span class="label">Prerequisite</span>
          <span>{{ currentCase?.prerequisite ?? "-" }}</span>
        </div>
      </div>
    </div>
    <div class="tw-mt-12">
      <div class="tw-flex tw-h-[36px] tw-flex-row tw-justify-between">
        <span class="subtitle tw-mb-4">Execution Steps</span>
        <v-btn
          v-if="!editing"
          color="primary"
          prepend-icon="edit"
          variant="tonal"
          @click="editing = true"
          >Edit</v-btn
        >
      </div>
      <v-data-table-virtual :items="tempCase?.steps" :headers="headers">
        <template #item="{ index }">
          <tr>
            <td class="text-grey">{{ index + 1 }}</td>
            <td>
              <div
                class="tw-h-full tw-w-full"
                :class="editing ? 'bg-grey-lighten-5' : 'bg-transparent'"
              >
                <v-textarea
                  v-model="tempCase!.steps[index].action"
                  variant="solo"
                  flat
                  tile
                  width="auto"
                  :readonly="!editing"
                  no-resize
                  auto-grow
                  :rows="1"
                  bg-color="transparent"
                ></v-textarea>
              </div>
            </td>
            <td>
              <div
                class="tw-h-full tw-w-full"
                :class="editing ? 'bg-grey-lighten-5' : 'bg-transparent'"
              >
                <v-textarea
                  v-model="tempCase!.steps[index].inputs"
                  variant="solo"
                  flat
                  tile
                  width="auto"
                  :readonly="!editing"
                  no-resize
                  auto-grow
                  :rows="1"
                  bg-color="transparent"
                ></v-textarea>
              </div>
            </td>
            <td>
              <div
                class="tw-h-full tw-w-full"
                :class="editing ? 'bg-grey-lighten-5' : 'bg-transparent'"
              >
                <v-textarea
                  v-model="tempCase!.steps[index].expectedOutput"
                  variant="solo"
                  flat
                  tile
                  width="auto"
                  :readonly="!editing"
                  no-resize
                  auto-grow
                  :rows="1"
                  bg-color="transparent"
                ></v-textarea>
              </div>
            </td>
            <td>
              <v-btn
                v-if="editing"
                icon
                variant="text"
                size="small"
                color="error"
                @click="tempCase?.steps.splice(index, 1)"
                ><v-icon>delete</v-icon></v-btn
              >
            </td>
          </tr>
        </template>
      </v-data-table-virtual>
      <div v-if="editing" class="tw-mt-4 tw-flex tw-justify-between">
        <v-btn color="tertiary" variant="text" @click="addHandler">
          <v-icon>add</v-icon>
          New Step</v-btn
        >
        <v-btn color="primary" @click="updateHandler">Save</v-btn>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  title: "Test Case",
  layout: "case",
});

const route = useRoute();

const currentCase = computed(() => {
  const proID = Number(route.params.proID);
  const planID = Number(route.params.planID);
  const caseID = Number(route.params.caseID);
  return getCase(proID, planID, caseID);
});

const currentSuite = computed(() => {
  const proID = Number(route.params.proID);
  const planID = Number(route.params.planID);
  const caseID = Number(route.params.caseID);
  return getSuite(proID, planID, caseID);
});

const tempCase = ref<CustomTestCase | undefined>(undefined);

const headers: ReadonlyHeaders = [
  {
    title: "#",
    key: "order",
    sortable: false,
    width: "60",
  },
  {
    title: "Action",
    value: "action",
    sortable: false,
  },
  {
    title: "Inputs",
    value: "inputs",
    sortable: false,
  },
  {
    title: "Expected Output",
    value: "expectedOutput",
    sortable: false,
  },
  {
    key: "delete",
    width: "75",
    sortable: false,
  },
];

const editing = ref(false);

const addHandler = () => {
  tempCase.value?.steps.push({
    id: -1,
    action: "",
    inputs: "",
    expectedOutput: "",
  });
};
const updateHandler = () => {
  tempCase.value?.steps.forEach((step, index) => {
    if (
      step.action === "" &&
      step.inputs === "" &&
      step.expectedOutput === ""
    ) {
      tempCase.value?.steps.splice(index, 1);
    }
  });
  editing.value = false;
};

onMounted(() => {
  if (currentCase.value) {
    tempCase.value = currentCase.value;
  }
});
</script>
<style scoped lang="scss">
.label {
  color: rgb(var(--v-theme-primary-lighten-3));
  width: 120px;
  display: block;
  font-weight: bold;
}

.item {
  display: flex;
  flex-direction: row;
}
</style>
