<template>
  <v-list
    v-model:opened="openedSuite"
    :selected="[Number(route.params.caseID)]"
    density="compact"
    width="270"
    class="px-2 tw-text-sm"
  >
    <v-list-group
      v-for="group in currentPlan?.cases.data"
      :key="group.id"
      :value="group.id"
    >
      <template #activator="{ props }">
        <v-list-item v-bind="props" class="tw-font-bold" :value="group.id">
          <template #default>
            <div class="tw-flex tw-flex-row tw-items-center tw-gap-2">
              <div class="tw-flex tw-gap-1">
                <v-icon
                  color="secondary-lighten-1"
                  class="tw-transition"
                  size="small"
                  :class="openedSuite.includes(group.id) ? 'tw-rotate-90' : ''"
                  >arrow_right</v-icon
                >
                <v-icon color="primary-lighten-1" size="small">{{
                  openedSuite.includes(group.id) ? "folder_open" : "folder"
                }}</v-icon>
              </div>
              <span class="tw-block tw-truncate tw-text-nowrap">
                {{ group.name }}
                <v-tooltip activator="parent" location="end">{{
                  group.name
                }}</v-tooltip>
              </span>
            </div>
          </template>
          <template #append></template>
        </v-list-item>
      </template>
      <v-list-item
        v-for="caseItem in group.list.data"
        :key="caseItem.id"
        :value="caseItem.id"
        color="primary"
      >
        <template #default="{ isSelected }">
          <span
            class="pl-2 tw-block tw-truncate tw-text-nowrap"
            :class="isSelected ? 'text-primary' : 'text-secondary'"
            @click="
              !isSelected &&
                navigateTo(
                  `/project-${route.params.projectID}/run-${route.params.runID}/case-${group.id}-${caseItem.id}`,
                )
            "
          >
            {{ caseItem.name }}
            <v-tooltip activator="parent" location="end">{{
              caseItem.name
            }}</v-tooltip>
          </span>
        </template>
      </v-list-item>
      <v-list-item>
        <v-btn prepend-icon="add" variant="plain" color="primary" size="small"
          >New Case <menu-new-case></menu-new-case>
        </v-btn>
      </v-list-item>
    </v-list-group>
    <v-list-item class="tw-mt-2">
      <v-btn prepend-icon="add" variant="plain" color="primary" size="small"
        >New Test Suite
        <menu-new-suite></menu-new-suite>
      </v-btn>
    </v-list-item>
  </v-list>
</template>
<script setup lang="ts">
const route = useRoute();

const currentPlan = computed(() =>
  getPlan(Number(route.params.projectID), Number(route.params.runID)),
);
const openedSuite = ref<number[]>([]);

onMounted(() => {
  const currentSuite = getRunSuite(
    Number(route.params.projectID),
    Number(route.params.runID),
    Number(route.params.groupID),
  );
  if (currentSuite) {
    openedSuite.value.push(currentSuite.id);
  }
});
</script>
