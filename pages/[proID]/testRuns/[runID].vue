<template>
  <div class="tw-flex tw-h-full tw-flex-col">
    <layouts-default-title>
      <span>{{ currentRun?.title }}</span>
    </layouts-default-title>
    <div class="tw-mb-8 tw-grid tw-grid-cols-2">
      <div class="item">
        <div class="label">Test Run ID</div>
        <div>{{ currentRun?.id }}</div>
      </div>
      <div class="item">
        <div class="label">Configurations</div>
        <div>
          <span
            v-for="(config, i) in currentRun && currentRun.configurations"
            :key="i"
            >{{ config
            }}{{
              i !== currentRun!.configurations.length - 1 ? ", " : ""
            }}</span
          >
        </div>
      </div>
    </div>
    <v-layout
      class="tw-overflow-hidden tw-bg-[rgba(var(--v-theme-secondaryContainer),0.1)]"
    >
      <v-app-bar density="compact" elevation="0" color="secondaryContainer">
        <div
          class="tw-flex tw-w-full tw-flex-row tw-items-center tw-justify-between tw-pr-4"
        >
          <v-btn-group variant="text" tile>
            <v-btn color="primary">
              <v-icon class="tw-mr-1">upload_file</v-icon>
              Import</v-btn
            >
            <v-btn color="primary">
              <v-icon class="tw-mr-1">save</v-icon>
              Save</v-btn
            >
            <v-btn color="primary">
              <v-icon class="tw-mr-1">lock</v-icon>
              Lock</v-btn
            >
          </v-btn-group>
          <div
            class="text-outline tw-flex tw-h-[36px] tw-flex-row tw-items-center tw-gap-4 tw-font-mono tw-text-sm"
          >
            <span class="text-grey">Unfinished {{ unfinishedNumber }} </span>/
            <span class="text-green">Pass {{ passNumber }}</span
            >/
            <span class="text-error">Fail {{ failNumber }}</span>
          </div>
        </div>
      </v-app-bar>
      <v-main
        class="scrollbar-transparent border-sm border-primary tw-overflow-y-scroll"
      >
        <div class="tw-flex tw-flex-col tw-gap-10 tw-px-4 tw-py-8">
          <div v-for="group in tempCases" :key="group.suite">
            <div v-if="group.list.length > 0">
              <span class="subtitle text-primary">{{ group.suite }}</span>
              <div class="tw-mt-2">
                <div v-for="(caseItem, i) in group.list" :key="caseItem.id">
                  <v-divider v-if="i !== 0" :thickness="10"></v-divider>
                  <div
                    v-ripple
                    class="border-sm tw-inline-flex tw-w-full tw-items-center tw-justify-between tw-bg-[rgba(var(--v-theme-secondaryContainer),0.5)] tw-py-2 tw-pl-2 tw-text-sm hover:tw-cursor-pointer hover:tw-bg-[rgba(var(--v-theme-secondaryContainer),0.7)]"
                    @click="toggleHandler(caseItem.id)"
                  >
                    <span>
                      <v-icon color="grey">keyboard_arrow_down</v-icon>
                      <span class="tw-mx-2">{{ caseItem.description }}</span>
                      <span
                        v-if="caseItem.steps.find((item) => item.result === '')"
                        class="text-grey"
                        ><v-icon color="grey" size="x-small" class="tw-mr-1"
                          >close</v-icon
                        >
                        Unfinished</span
                      >
                      <span v-else class="text-green"
                        ><v-icon color="green" size="x-small" class="tw-mr-2"
                          >check</v-icon
                        >Finished</span
                      >
                    </span>
                    <div
                      class="tw-flex tw-w-[75px] tw-flex-row tw-justify-center tw-gap-2"
                    >
                      <v-btn
                        icon
                        size="small"
                        variant="outlined"
                        density="compact"
                        :active="isAllPass(caseItem)"
                        :color="isAllPass(caseItem) ? 'green' : ''"
                        @click.stop="allPassHandler(caseItem)"
                        ><v-icon>check</v-icon></v-btn
                      >
                      <v-btn
                        icon
                        size="small"
                        variant="outlined"
                        density="compact"
                        :active="isAllFail(caseItem)"
                        :color="isAllFail(caseItem) ? 'error' : ''"
                        @click.stop="allFailHandler(caseItem)"
                        ><v-icon>close</v-icon></v-btn
                      >
                    </div>
                  </div>
                  <v-expand-transition>
                    <div
                      v-show="opened.includes(caseItem.id)"
                      class="border-t-sm border-e-sm border-s-sm"
                    >
                      <v-data-table-virtual
                        :items="caseItem.steps"
                        :headers="stepHeaders"
                        :header-props="{
                          class:
                            'text-secondary-lighten-1 h-auto font-weight-black px-3 py-4 tw-text-xs',
                        }"
                      >
                        <template #item="{ item, index }">
                          <tr class="text-xs">
                            <td class="p-0 text-grey tw-text-center">
                              {{ index + 1 }}
                            </td>
                            <td>
                              <p class="tw-break-words">
                                {{ item.action }}
                              </p>
                            </td>
                            <td>
                              <p class="tw-w-full tw-break-words">
                                {{ item.inputs }}
                              </p>
                            </td>
                            <td>
                              <p class="tw-w-full tw-break-words">
                                {{ item.expectedOutput }}
                              </p>
                            </td>
                            <td class="p-1">
                              <div class="tw-h-full tw-w-full">
                                <v-textarea
                                  v-model="item.actualOutput"
                                  bg-color="rgba(0,0,0,0.02)"
                                  variant="solo"
                                  flat
                                  width="auto"
                                  no-resize
                                  auto-grow
                                  :rows="4"
                                  class="text-xs"
                                ></v-textarea>
                              </div>
                            </td>
                            <td class="p-1">
                              <div
                                class="tw-flex tw-flex-row tw-justify-center tw-gap-2"
                              >
                                <v-btn
                                  icon
                                  size="small"
                                  variant="outlined"
                                  density="compact"
                                  :active="item.result === 'pass'"
                                  :color="item.result === 'pass' ? 'green' : ''"
                                  @click="item.result = 'pass'"
                                  ><v-icon>check</v-icon></v-btn
                                >
                                <v-btn
                                  icon
                                  size="small"
                                  variant="outlined"
                                  density="compact"
                                  :active="item.result === 'fail'"
                                  :color="item.result === 'fail' ? 'error' : ''"
                                  @click="item.result = 'fail'"
                                  ><v-icon>close</v-icon></v-btn
                                >
                              </div>
                            </td>
                          </tr>
                        </template>
                      </v-data-table-virtual>
                    </div>
                  </v-expand-transition>
                </div>
              </div>
            </div>
          </div>
        </div>
      </v-main>
    </v-layout>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  title: "Test Run",
  layout: "run",
});

const route = useRoute();
const currentRun = computed(() =>
  getRun(Number(route.params.proID), Number(route.params.runID)),
);
const tempCases = ref<RunCaseGroup[]>([]);
const opened = ref<number[]>([]);
const stepHeaders: ReadonlyHeaders = [
  {
    key: "order",
    width: "35",
    sortable: false,
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
    title: "Actual Output",
    value: "actualOutput",
    sortable: false,
  },
  {
    title: "Result",
    value: "result",
    sortable: false,
    align: "center",
    width: "75",
  },
];
const unfinishedNumber = computed(() => {
  let num = 0;
  if (tempCases.value) {
    tempCases.value.forEach((group) => {
      group.list.forEach((item) => {
        item.steps.forEach((step) => {
          if (step.result === "") {
            num++;
          }
        });
      });
    });
  }
  return num;
});
const passNumber = computed(() => {
  let num = 0;
  if (tempCases.value) {
    tempCases.value.forEach((group) => {
      group.list.forEach((item) => {
        item.steps.forEach((step) => {
          if (step.result === "pass") {
            num++;
          }
        });
      });
    });
  }
  return num;
});
const failNumber = computed(() => {
  let num = 0;
  if (tempCases.value) {
    tempCases.value.forEach((group) => {
      group.list.forEach((item) => {
        item.steps.forEach((step) => {
          if (step.result === "fail") {
            num++;
          }
        });
      });
    });
  }
  return num;
});

const toggleHandler = (id: number) => {
  if (opened.value.includes(id)) {
    opened.value = opened.value.filter((i) => i !== id);
  } else {
    opened.value.push(id);
  }
};
const allPassHandler = (caseItem: RunCase) => {
  caseItem.steps.forEach((step) => {
    step.result = "pass";
  });
};
const allFailHandler = (caseItem: RunCase) => {
  caseItem.steps.forEach((step) => {
    step.result = "fail";
  });
};
const isAllPass = (caseItem: RunCase) => {
  return caseItem.steps.every((step) => step.result === "pass");
};
const isAllFail = (caseItem: RunCase) => {
  if (caseItem.steps.length === 0) return false;
  return caseItem.steps.every((step) => step.result === "fail");
};

onMounted(() => {
  if (currentRun.value) {
    tempCases.value = currentRun.value.cases;
  }
});
</script>
<style scoped lang="scss">
.label {
  color: rgb(var(--v-theme-primary-lighten-3));
  width: 140px;
  display: block;
  font-weight: bold;
}

.item {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
