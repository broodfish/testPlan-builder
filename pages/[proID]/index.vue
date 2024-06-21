<template>
  <div>
    <layouts-default-title>Overview</layouts-default-title>
    <div class="tw-flex tw-flex-col tw-gap-10">
      <div class="tw-grid tw-grid-cols-2 tw-gap-4">
        <base-card>
          <template #title> TIMELINE </template>
          <template #content>
            <div class="tw-flex">
              <v-timeline side="end">
                <v-timeline-item dot-color="tertiaryContainer" size="x-small">
                  <div class="tw-font-bold">2019/10/13 12:32</div>
                  <div class="text-secondary tw-indent-4">
                    Create a new project "ZCP-Web"
                  </div>
                </v-timeline-item>
              </v-timeline>
            </div>
          </template>
        </base-card>
        <base-card>
          <template #title> MOST RECENT RESULT </template>
          <template #content>
            <div
              class="tw-flex tw-h-[200px] tw-flex-row tw-items-center tw-gap-4"
            >
              <div class="tw-h-[200px] tw-w-[200px]">
                <chart-pie :data="pieChartData" :options="pieChartOptions" />
              </div>
              <div
                class="tw-mr-4 tw-grid tw-grid-flow-col tw-grid-rows-2 tw-gap-10"
              >
                <div class="info">
                  <div class="info-title">Pass Rate</div>
                  <div class="info-content text-blue">95%</div>
                </div>
                <div class="info">
                  <div class="info-title">Growth Rate</div>
                  <div class="info-content">-5%</div>
                </div>
              </div>
            </div>
          </template>
        </base-card>
      </div>
      <base-card>
        <template #title>
          <div
            class="tw-h-full tw-w-full tw-cursor-pointer"
            @click="navigateTo(`/${route.params.proID}/testRuns`)"
          >
            RECENT RESULTS
          </div>
        </template>
        <template #content>
          <v-data-table :headers="headers" :items="recentRuns">
            <template #item="{ item }">
              <tr
                class="hover:tw-cursor-pointer"
                @click="
                  navigateTo(`/${route.params.proID}/testRuns/${item.id}`)
                "
              >
                <td>
                  {{ item.title }}
                </td>
                <td class="tw-text-center">
                  {{ item.createdTime }}
                </td>
                <td class="tw-text-center">
                  {{ item.finishedTime }}
                </td>
                <td class="tw-text-center">
                  {{ calcPassRate(item.plan.list.data).passRate }}%
                </td>
              </tr>
            </template>
            <template #bottom></template>
          </v-data-table>
        </template>
      </base-card>
    </div>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  title: "Overview",
  layout: "project",
});

const route = useRoute();

const headers: ReadonlyHeaders = [
  {
    title: "Title",
    value: "title",
  },
  {
    title: "Created Time",
    value: "createdTime",
    align: "center",
    width: "200",
  },
  {
    title: "Finished Time",
    value: "finishedTime",
    align: "center",
    width: "200",
  },
  {
    title: "Pass Rate",
    align: "center",
    width: "100",
  },
];

const recentRuns = computed(() => getFinishedRuns(Number(route.params.proID)));

const pieChartData = {
  labels: ["Pass", "Fail"],
  datasets: [
    {
      data: [95, 5],
      backgroundColor: ["#D7E2FF", "#FF897D"],
      hoverOffset: 2,
    },
  ],
};

const pieChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: 20,
  },
  plugins: {
    tooltip: {
      enabled: false,
    },
    legend: {
      display: false,
    },
    datalabels: {
      formatter: (_: number, context: ChartDatalabelsContext) => {
        return context.chart.data.labels?.[context.dataIndex];
      },
      color: ["#2E4673", "#BA1A1A"],
      align: "end",
      anchor: "start",
      clamp: true,
      padding: 5,
      offset: 80,
    },
  },
};
</script>
<style scoped lang="scss">
.info {
  > .info-title {
    font-weight: 500;
    line-height: 2;
    text-transform: uppercase;
    color: rgb(var(--v-theme-secondary));
  }

  > .info-content {
    text-align: right;
    line-height: 2;
  }
}
</style>
