<template>
  <div
    class="header border-b border-secondary tw-flex tw-flex-col tw-gap-4 tw-px-12 tw-py-[10px]"
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
<style lang="scss" scoped>
.header {
  background: url("/assets/images/header.png"),
    linear-gradient(0deg, rgba(48, 99, 229, 0.02), rgba(0, 72, 255, 0.06));
}
</style>
