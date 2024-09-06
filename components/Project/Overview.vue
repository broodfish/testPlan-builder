<template>
  <div class="tw-flex tw-flex-col tw-gap-[30px]">
    <div class="tw-flex tw-flex-row tw-gap-[30px]">
      <custom-card title="Information">
        <template #content>
          <div class="px-4 py-2 tw-grid tw-grid-cols-2 tw-gap-3">
            <div class="item">
              <span class="title">Total Plans</span>
              <span class="value">{{ project?.plans.num }}</span>
            </div>
            <div class="item">
              <span class="title">Total Runs</span>
              <span class="value">{{ project?.runs.num }}</span>
            </div>
            <div class="item">
              <span class="title">Total Finished Runs</span>
              <span class="value">4</span>
            </div>
            <div class="item">
              <span class="title">Average Pass Rate</span>
              <span class="value">94.87%</span>
            </div>
          </div>
        </template>
      </custom-card>
      <v-table class="tw-flex-1">
        <thead>
          <tr>
            <th>Test Plans</th>
            <th class="text-center tw-w-[180px]">Created Time</th>
          </tr>
        </thead>
        <tbody>
          <v-hover v-for="item in plans" :key="item.name">
            <template #default="{ isHovering, props }">
              <tr
                v-ripple="{ class: 'text-ripple' }"
                v-bind="props"
                class="cursor-pointer"
                :class="isHovering ? 'bg-shadow' : 'bg-transparent'"
                @click="
                  navigateTo(
                    `/project-${route.params.projectID}/plan-${item.id}`,
                  )
                "
              >
                <td>{{ item.name }}</td>
                <td class="text-center tw-font-mono">{{ item.createdTime }}</td>
              </tr>
            </template>
          </v-hover>
        </tbody>
        <template #top>
          <div class="text-h6 px-6 py-4 border-b tw-min-h-[70px]">
            Recent Test Plans
          </div>
        </template>
      </v-table>
    </div>
    <v-table>
      <thead>
        <tr>
          <th>Test Plan</th>
          <th class="text-center tw-w-[180px]">Created Time</th>
          <th class="text-center tw-w-[220px]">Pass Rate ( Pass / Fail )</th>
        </tr>
      </thead>
      <tbody>
        <v-hover v-for="item in runs" :key="item.id">
          <template #default="{ isHovering, props }">
            <tr
              v-ripple="{ class: 'text-ripple' }"
              v-bind="props"
              class="cursor-pointer"
              :class="isHovering ? 'bg-shadow' : 'bg-transparent'"
              @click="
                navigateTo(`/project-${route.params.projectID}/run-${item.id}`)
              "
            >
              <td>{{ item.name }}</td>
              <td class="text-center tw-font-mono">{{ item.createdTime }}</td>
              <td class="text-center tw-font-mono">
                {{ calculate(item.plan.cases) }}
              </td>
            </tr>
          </template>
        </v-hover>
      </tbody>
      <template #top>
        <div class="text-h6 px-6 py-4 border-b tw-min-h-[70px]">
          Recent Test Runs
        </div>
      </template>
    </v-table>
  </div>
</template>
<script setup lang="ts">
const route = useRoute();
const project = computed(() => getProject(Number(route.params.projectID)));
const plans = computed(
  () => getPlans(Number(route.params.projectID))?.reverse().slice(0, 5) || [],
);
const runs = computed(
  () => getRuns(Number(route.params.projectID))?.reverse().slice(0, 5) || [],
);
const calculate = (cases: {
  totalCases: number;
  totalSuites: number;
  data: CaseGroup[];
}) => {
  const { pass, fail } = calcPassFail(cases.data);
  return `${pass / cases.totalCases}% (${pass}/${fail})`;
};
</script>
<style lang="scss" scoped>
.item {
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 180px;
}
.title {
  font-size: 0.9rem;
  font-weight: 700;
  color: rgba(var(--v-theme-secondary), 1);
  letter-spacing: 1px;
}
.value {
  font-family: monospace;
}
</style>
