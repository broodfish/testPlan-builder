<template>
  <Pie :data="data" :options="props.options"></Pie>
</template>
<script setup lang="ts">
import { Pie } from "vue-chartjs";
import type { ChartData } from "chart.js";

const props = defineProps({
  data: {
    type: Object as PropType<{ pass: number; fail: number }>,
    required: true,
  },
  options: {
    type: Object,
    required: false,
    default: () => ({
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
          color: ["#4CAF50", "#BA1A1A"],
          align: "end",
          anchor: "start",
          clamp: true,
          padding: 5,
          offset: 80,
        },
      },
    }),
  },
});
const data = computed(() => {
  return {
    labels: ["Pass", "Fail"],
    datasets: [
      {
        data: [props.data.pass, props.data.fail],
        backgroundColor: ["#82cf85", "#FF897D"],
        hoverOffset: 2,
      },
    ],
  } as ChartData<"pie">;
});
</script>
