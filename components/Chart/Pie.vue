<template>
  <Pie :data="props.data" :options="props.options"></Pie>
</template>
<script setup lang="ts">
import { Pie } from "vue-chartjs";
import type { ChartData } from "chart.js";

const props = defineProps({
  data: {
    type: Object as PropType<ChartData<"pie">>,
    required: true,
  },
  options: {
    type: Object,
    required: false,
    default: () => ({
      responsive: true,
      maintainAspectRatio: false,
    }),
  },
});
</script>
