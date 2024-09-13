<template>
  <v-data-table
    :items="runs"
    :headers="headers"
    :sort-by="[{ key: 'createdTime', order: 'desc' }]"
  >
    <template #item="{ item }">
      <v-hover>
        <template #default="{ isHovering, props }">
          <tr
            v-ripple="{ class: 'text-ripple' }"
            v-bind="props"
            class="cursor-pointer"
            :class="isHovering ? 'bg-shadow' : 'bg-transparent'"
            @click="
              navigateTo(`/projects/${route.params.projectId}/run/${item.id}`)
            "
          >
            <td>{{ item.name }}</td>
            <td class="tw-text-center tw-font-mono">{{ item.createdTime }}</td>
            <td class="tw-text-center">
              <v-progress-linear
                :model-value="calcProgress(item.plan.cases.data).progress"
                height="15"
                color="green"
              >
                <template #default>
                  <span class="tw-text-xs"
                    >{{ calcProgress(item.plan.cases.data).progress }}%</span
                  >
                </template>
              </v-progress-linear>
            </td>
            <td class="text-center tw-font-mono">
              {{ calculate(item.plan.cases) }}
            </td>
            <td><menu-actions></menu-actions></td>
          </tr>
        </template>
      </v-hover>
    </template>
    <template #top>
      <div class="card-title border-b">Test Runs</div>
    </template>
  </v-data-table>
</template>
<script setup lang="ts">
const route = useRoute();
const runs = computed(() => getRuns(Number(route.params.projectId)));
const headers: ReadonlyHeaders = [
  { title: "Test Plan", value: "title" },
  {
    title: "Created Time",
    value: "createdTime",
    width: "200",
    align: "center",
  },
  { title: "Progress", align: "center", width: "150" },
  {
    title: "Pass Rate ( Pass / Fail )",
    align: "center",
    sortable: false,
    width: "220",
  },
  {
    key: "options",
    width: "44",
    sortable: false,
  },
];

const calculate = (cases: {
  totalCases: number;
  totalSuites: number;
  data: CaseGroup[];
}) => {
  const { pass, fail } = calcPassFail(cases.data);
  return `${pass / cases.totalCases}% (${pass}/${fail})`;
};
</script>
