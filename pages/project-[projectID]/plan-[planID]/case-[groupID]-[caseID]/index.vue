<template>
  <div class="tw-flex tw-h-[calc(100vh_-_244px)] tw-flex-row tw-gap-[30px]">
    <custom-card
      :title="
        getPlan(Number(route.params.projectID), Number(route.params.planID))!
          .name
      "
      no-padding
    >
      <template #content>
        <plan-folder></plan-folder>
      </template>
    </custom-card>
    <custom-card
      title="Execution Steps"
      class="overflow-hidden tw-flex-1"
      no-padding
    >
      <template #content>
        <div class="px-6 py-4 tw-h-[calc(100vh_-_314px)] tw-overflow-y-scroll">
          <v-table class="border-none">
            <thead>
              <tr>
                <th class="tw-w-[56px]"></th>
                <th><span class="px-4">Action</span></th>
                <th><span class="px-4">Expected Output</span></th>
                <th class="tw-w-[56px]"></th>
              </tr>
            </thead>
            <tbody v-if="tempCase && tempCase.steps.num > 0">
              <tr v-for="(item, i) in tempCase?.steps.data" :key="i">
                <td class="text-secondary tw-font-mono">
                  {{ i + 1 }}
                </td>
                <td>
                  <v-textarea
                    v-model="item.action"
                    variant="outlined"
                    rows="2"
                    density="compact"
                    base-color="transparent"
                    color="primary"
                    flat
                    no-resize
                    hide-details
                    auto-grow
                  ></v-textarea>
                </td>
                <td class="padding-none">
                  <v-textarea
                    v-model="item.expectedOutput"
                    variant="outlined"
                    rows="2"
                    density="compact"
                    base-color="transparent"
                    color="primary"
                    flat
                    no-resize
                    hide-details
                    auto-grow
                  ></v-textarea>
                </td>
                <td>
                  <v-btn
                    color="error"
                    icon="delete"
                    variant="text"
                    @click="deleteHandler(i)"
                  ></v-btn>
                </td>
              </tr>
            </tbody>
          </v-table>
          <div v-if="tempCase && tempCase.steps.num === 0">
            <v-empty-state
              color="secondary"
              headline="No Action Yet"
              text="Click button to add new action"
            >
            </v-empty-state>
          </div>
          <v-btn prepend-icon="add" variant="plain" @click="addHandler"
            >New Step</v-btn
          >
        </div>
      </template>
      <template #action>
        <v-btn
          :disabled="isNoChanged"
          prepend-icon="save"
          @click="updateHandler"
          >Save</v-btn
        >
      </template>
    </custom-card>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  title: "Test Case",
});

const route = useRoute();

const currentCase = computed(() => {
  const projectID = Number(route.params.projectID);
  const planID = Number(route.params.planID);
  const groupID = Number(route.params.groupID);
  const caseID = Number(route.params.caseID);
  return getPlanCase(projectID, planID, groupID, caseID);
});

const isNoChanged = computed(() => {
  return JSON.stringify(tempCase.value) === JSON.stringify(currentCase.value);
});

const tempCase = ref<Case | undefined>(undefined);

const addHandler = () => {
  tempCase.value?.steps.data.push({
    id: -1,
    action: "",
    expectedOutput: "",
    result: null,
    comment: null,
  });
};
const updateHandler = () => {
  // TODO
};

const deleteHandler = (index: number) => {
  tempCase.value?.steps.data.splice(index, 1);
};

onMounted(() => {
  if (currentCase.value) {
    tempCase.value = JSON.parse(JSON.stringify(currentCase.value));
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
