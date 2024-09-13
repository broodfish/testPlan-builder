<template>
  <div class="tw-flex tw-h-[calc(100vh_-_244px)] tw-flex-row tw-gap-[30px]">
    <custom-card
      :title="
        getRun(Number(route.params.projectId), Number(route.params.runId))!.name
      "
      no-padding
    >
      <template #content>
        <run-folder></run-folder>
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
                <th>Action</th>
                <th>Expected Output</th>
                <th class="tw-w-[120px]">Result</th>
                <th><span class="px-4">Comment</span></th>
              </tr>
            </thead>
            <tbody v-if="tempCase && tempCase.steps.num > 0">
              <tr v-for="(item, i) in tempCase?.steps.data" :key="i">
                <td class="text-secondary tw-font-mono">
                  {{ i + 1 }}
                </td>
                <td>
                  {{ item.action }}
                </td>
                <td>
                  {{ item.expectedOutput }}
                </td>
                <td>
                  <div class="tw-flex tw-flex-row tw-items-center tw-gap-1">
                    <v-btn
                      :color="item.result ? 'success' : ''"
                      icon
                      :variant="item.result ? 'flat' : 'outlined'"
                      size="small"
                      @click="item.result = item.result ? null : true"
                    >
                      <v-icon>check</v-icon>
                      <v-tooltip activator="parent">Pass</v-tooltip>
                    </v-btn>
                    <v-btn
                      :color="item.result === false ? 'error' : ''"
                      icon
                      :variant="item.result === false ? 'flat' : 'outlined'"
                      size="small"
                      @click="
                        item.result = item.result === false ? null : false
                      "
                      ><v-icon>close</v-icon
                      ><v-tooltip activator="parent">Fail</v-tooltip></v-btn
                    >
                  </div>
                </td>
                <td>
                  <v-textarea
                    v-model="item.comment"
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
              </tr>
            </tbody>
          </v-table>
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
  const projectId = Number(route.params.projectId);
  const runId = Number(route.params.runId);
  const groupId = Number(route.params.groupId);
  const caseId = Number(route.params.caseId);
  return getPlanCase(projectId, runId, groupId, caseId);
});

const isNoChanged = computed(() => {
  return JSON.stringify(tempCase.value) === JSON.stringify(currentCase.value);
});

const tempCase = ref<Case | undefined>(undefined);

const updateHandler = () => {
  // TODO
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
