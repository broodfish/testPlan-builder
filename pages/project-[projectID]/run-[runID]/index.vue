<template>
  <div>
    <custom-card title="Test Cases">
      <template #content>
        <div class="tw-flex tw-flex-col tw-gap-4">
          <run-suite
            v-for="(group, i) in tempCases"
            :key="i"
            :title="group.name"
            :items="group.list.data"
          >
          </run-suite>
        </div>
      </template>
    </custom-card>
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
const tempCases = ref<CaseGroup[]>([]);

onMounted(() => {
  if (currentRun.value) {
    tempCases.value = currentRun.value.plan.cases.data;
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
