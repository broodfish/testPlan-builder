<template>
  <div>
    <layouts-default-title>Test Runs</layouts-default-title>
    <div>
      <span class="subtitle text-error">Running</span>
      <v-data-table :items="running" :headers="runningHeaders">
        <template #item="{ item }">
          <tr
            v-ripple
            class="hover:tw-cursor-pointer hover:tw-bg-[rgba(0,0,0,0.04)]"
            @click="navigateTo(`/${route.params.proID}/testRuns/${item.id}`)"
          >
            <td>{{ item.id }}</td>
            <td>{{ item.title }}</td>
            <td class="tw-text-center">{{ item.createdTime }}</td>
            <td class="tw-text-center">
              <v-progress-linear
                :model-value="calcProgress(item.plan.list.data).progress"
                height="15"
                color="green"
              >
                <template #default>
                  <span class="tw-text-xs"
                    >{{ calcProgress(item.plan.list.data).progress }}%</span
                  >
                </template>
              </v-progress-linear>
            </td>
          </tr>
        </template>
      </v-data-table>
    </div>
    <div class="tw-mt-12">
      <span class="subtitle text-green">Finished</span>
      <v-data-table :items="finished" :headers="finishedHeaders">
        <template #item="{ item }">
          <tr
            v-ripple
            class="hover:tw-cursor-pointer hover:tw-bg-[rgba(0,0,0,0.04)]"
            @click="navigateTo(`/${route.params.proID}/testRuns/${item.id}`)"
          >
            <td>{{ item.id }}</td>
            <td>{{ item.title }}</td>
            <td class="tw-text-center">{{ item.createdTime }}</td>
            <td class="tw-text-center">
              {{ item.finishedTime }}
            </td>
            <td class="tw-text-center">
              {{ calcPassRate(item.plan.list.data).passRate }}%
            </td>
          </tr>
        </template>
      </v-data-table>
    </div>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  title: "Test Runs",
  layout: "project",
});

const route = useRoute();
const running = computed(() => getRunningRuns(Number(route.params.proID)));
const finished = computed(() => getFinishedRuns(Number(route.params.proID)));
const runningHeaders: ReadonlyHeaders = [
  { title: "ID", value: "id", width: "60" },
  { title: "Test Plan", value: "title" },
  {
    title: "Created Time",
    value: "createdTime",
    width: "200",
    align: "center",
  },
  { title: "Progress", value: "progress", align: "center" },
];

const finishedHeaders: ReadonlyHeaders = [
  { title: "ID", value: "id", width: "60" },
  { title: "Test Plan", value: "title" },
  {
    title: "Created Time",
    value: "createdTime",
    width: "200",
    align: "center",
  },
  {
    title: "Finished Time",
    value: "finishedTime",
    width: "200",
    align: "center",
  },
  {
    title: "Pass Rate",
    align: "center",
    width: "100",
  },
];
</script>
