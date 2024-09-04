<template>
  <div class="tw-flex tw-h-full tw-flex-col">
    <layouts-default-title>
      <span>{{ currentRun?.title }}</span>
    </layouts-default-title>
    <div class="tw-mb-8 tw-grid tw-h-min tw-flex-grow tw-grid-cols-2 tw-gap-2">
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
      <div class="item">
        <div class="label">Created Time</div>
        <div>
          {{ currentRun?.createdTime }}
        </div>
      </div>
      <div class="item">
        <div class="label">Finished Time</div>
        <div>
          {{ currentRun?.finishedTime }}
        </div>
      </div>
    </div>
    <v-card
      v-if="status === 'finished'"
      flat
      border="primary-lighten-1 opacity-100 thin"
      class="tw-mb-8"
    >
      <div class="tw-flex tw-flex-row tw-items-center tw-justify-center tw-p-4">
        <div class="tw-mr-4 tw-h-[200px] tw-w-[200px]">
          <chart-pie
            :data="{ pass: passRate.pass, fail: passRate.fail }"
          ></chart-pie>
        </div>
        <div class="tw-mr-24">
          <div class="tw-flex tw-flex-row tw-items-center tw-gap-2">
            <div class="tw-h-4 tw-w-4 tw-bg-[#82cf85]"></div>
            <span>{{ passRate.pass }}</span>
            passed
          </div>
          <div class="tw-flex tw-flex-row tw-items-center tw-gap-2">
            <div class="tw-h-4 tw-w-4 tw-bg-[#FF897D]"></div>
            <span>{{ passRate.fail }}</span>
            failed
          </div>
        </div>
        <div class="tw-p-4">
          <div>Pass Rate</div>
          <div class="text-green tw-text-right tw-text-4xl">
            <span class="tw-font-mono">{{ passRate.passRate }}</span
            >%
          </div>
        </div>
      </div>
    </v-card>
    <v-layout
      class="tw-overflow-hidden tw-bg-[rgba(var(--v-theme-secondaryContainer),0.1)]"
    >
      <v-app-bar
        v-if="status === 'running'"
        density="compact"
        elevation="0"
        color="secondaryContainer"
      >
        <div
          class="tw-flex tw-w-full tw-flex-row tw-items-center tw-justify-between tw-p-4"
        >
          <div
            class="text-outline tw-flex tw-h-[36px] tw-flex-row tw-items-center tw-gap-4 tw-text-sm"
          >
            <span class="text-grey"
              >Unfinished:
              <span class="tw-font-mono">{{
                progress.total - progress.finished
              }}</span> </span
            >/
            <span class="text-green"
              >Pass: <span class="tw-font-mono">{{ passRate.pass }}</span></span
            >/
            <span class="text-red"
              >Fail: <span class="tw-font-mono">{{ passRate.fail }}</span></span
            >
          </div>
        </div>
        <v-btn-group variant="text" tile class="pr-4">
          <v-btn color="primary" @click="confirmCompletion = true">
            <v-icon class="tw-mr-1">task</v-icon>
            Complete</v-btn
          >
        </v-btn-group>
      </v-app-bar>
      <v-main
        class="scrollbar-transparent border-sm border-primary tw-overflow-y-scroll"
      >
        <div class="tw-flex tw-h-[80vh] tw-flex-col tw-gap-10 tw-px-4 tw-py-8">
          <div v-for="group in tempCases" :key="group.id">
            <div v-if="group.cases.num > 0">
              <span class="subtitle text-primary">{{ group.name }}</span>
              <div class="tw-mt-2">
                <div
                  v-for="(caseItem, i) in group.cases.data"
                  :key="caseItem.id"
                >
                  <v-divider v-if="i !== 0" :thickness="10"></v-divider>
                  <div
                    v-ripple
                    class="border-sm tw-inline-flex tw-w-full tw-items-center tw-justify-between tw-bg-[rgba(var(--v-theme-secondaryContainer),0.5)] tw-py-2 tw-pl-2 tw-text-sm hover:tw-cursor-pointer hover:tw-bg-[rgba(var(--v-theme-secondaryContainer),0.7)]"
                    @click="toggleHandler(caseItem.id)"
                  >
                    <span>
                      <v-icon
                        color="grey"
                        class="tw-transition"
                        :class="
                          opened.includes(caseItem.id) ? 'tw-rotate-180' : ''
                        "
                        >keyboard_arrow_down</v-icon
                      >
                      <span class="tw-mx-2">{{ caseItem.description }}</span>
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
                        :color="
                          isAllPass(caseItem) ? 'green' : 'green-lighten-3'
                        "
                        :readonly="status === 'finished'"
                        @click.stop="allPassHandler(caseItem)"
                        ><v-icon>check</v-icon></v-btn
                      >
                      <v-btn
                        icon
                        size="small"
                        variant="outlined"
                        density="compact"
                        :active="isAllFail(caseItem)"
                        :color="isAllFail(caseItem) ? 'red' : 'red-lighten-3'"
                        :readonly="status === 'finished'"
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
                        :items="caseItem.steps.data"
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
                              <div
                                v-if="status === 'running'"
                                class="tw-h-full tw-w-full"
                              >
                                <v-textarea
                                  v-model="item.actualOutput"
                                  bg-color="rgba(0, 0, 0, 0.02)"
                                  variant="solo"
                                  flat
                                  width="auto"
                                  no-resize
                                  auto-grow
                                  :rows="4"
                                  class="text-xs"
                                ></v-textarea>
                              </div>
                              <p v-else class="tw-w-full tw-break-words">
                                {{ item.actualOutput }}
                              </p>
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
                                  :color="
                                    item.result === 'pass'
                                      ? 'green'
                                      : 'green-lighten-3'
                                  "
                                  :readonly="status === 'finished'"
                                  @click="item.result = 'pass'"
                                  ><v-icon>check</v-icon></v-btn
                                >
                                <v-btn
                                  icon
                                  size="small"
                                  variant="outlined"
                                  density="compact"
                                  :active="item.result === 'fail'"
                                  :color="
                                    item.result === 'fail'
                                      ? 'red'
                                      : 'red-lighten-3'
                                  "
                                  :readonly="status === 'finished'"
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
    <dialog-confirm-completion
      v-model="confirmCompletion"
      @true="
        console.log('Complete');
        confirmCompletion = false;
      "
    ></dialog-confirm-completion>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  title: "Test Run",
});

const route = useRoute();
const currentRun = computed(() =>
  getRun(Number(route.params.projectID), Number(route.params.runID)),
);
const status = computed(() => currentRun.value?.status);
const tempCases = ref<CaseGroup[]>([]);
const opened = ref<number[]>([]);
const confirmCompletion = ref(false);
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

const progress = computed(() => calcProgress(tempCases.value));
const passRate = computed(() => calcPassRate(tempCases.value));

const toggleHandler = (id: number) => {
  if (opened.value.includes(id)) {
    opened.value = opened.value.filter((i) => i !== id);
  } else {
    opened.value.push(id);
  }
};
const allPassHandler = (caseItem: Case) => {
  caseItem.steps.data.forEach((step) => {
    step.result = "pass";
  });
};
const allFailHandler = (caseItem: Case) => {
  caseItem.steps.data.forEach((step) => {
    step.result = "fail";
  });
};
const isAllPass = (caseItem: Case) => {
  return caseItem.steps.data.every((step) => step.result === "pass");
};
const isAllFail = (caseItem: Case) => {
  if (caseItem.steps.num === 0) return false;
  return caseItem.steps.data.every((step) => step.result === "fail");
};

onMounted(() => {
  if (currentRun.value) {
    tempCases.value = currentRun.value.plan.list.data;
    // opened.value.push(currentRun.value.plan.list.data[0].cases.data[0].id);
  }
});
</script>
<style scoped lang="scss">
.label {
  color: rgb(var(--v-theme-primary-lighten-3));
  width: 125px;
  display: block;
  font-weight: bold;
}

.item {
  display: flex;
  flex-direction: row;
}
</style>
