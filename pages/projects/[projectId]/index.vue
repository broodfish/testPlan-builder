<template>
  <div>
    <v-tabs-window v-model="store.tab">
      <v-tabs-window-item value="overview">
        <project-overview></project-overview>
      </v-tabs-window-item>
      <v-tabs-window-item value="plans">
        <project-test-plans></project-test-plans>
      </v-tabs-window-item>
      <v-tabs-window-item value="runs">
        <project-test-runs></project-test-runs>
      </v-tabs-window-item>
    </v-tabs-window>
  </div>
</template>
<script setup lang="ts">
import { useStore } from "@/stores/data";
definePageMeta({
  title: "Project",
  layout: "project",
});

const store = useStore();
</script>
