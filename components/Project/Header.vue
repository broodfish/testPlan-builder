<template>
  <div
    class="header border-b border-secondary tw-flex tw-min-h-[100px] tw-flex-col tw-gap-4 tw-px-12 tw-py-[10px]"
  >
    <default-breadcrumbs></default-breadcrumbs>
    <v-tabs v-model="store.tab" density="compact" class="ml-4">
      <v-tab value="overview">Overview</v-tab>
      <v-tab value="plans">Test Plans</v-tab>
      <v-tab value="runs">Test Runs</v-tab>
    </v-tabs>
  </div>
</template>
<script setup lang="ts">
import { useStore } from "@/stores/data";

const store = useStore();
</script>
