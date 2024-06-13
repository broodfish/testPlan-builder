<template>
  <v-navigation-drawer class="tw-p-2" permanent>
    <v-list
      v-model:opened="openedSuite"
      :selected="[Number(route.params.caseID)]"
      density="compact"
      max-width="300"
    >
      <v-list-subheader>{{ currentPlan?.title }}</v-list-subheader>
      <v-list-group
        v-for="group in currentPlan?.cases"
        :key="group.suite"
        :value="group.suite"
      >
        <template #activator="{ props }">
          <v-list-item v-bind="props" class="tw-font-bold" :value="group.suite">
            <template #default>
              <div class="tw-flex tw-gap-2">
                <div class="tw-flex tw-gap-1">
                  <v-icon
                    color="grey"
                    class="tw-transition"
                    size="small"
                    :class="
                      openedSuite.includes(group.suite) ? 'tw-rotate-180' : ''
                    "
                    >keyboard_arrow_down</v-icon
                  >
                  <v-icon color="blue-lighten-1" size="small">{{
                    openedSuite.includes(group.suite) ? "folder_open" : "folder"
                  }}</v-icon>
                </div>
                <span class="tw-block tw-truncate tw-text-nowrap tw-text-sm">
                  {{ group.suite }}
                </span>
              </div>
            </template>
            <template #append></template>
          </v-list-item>
        </template>
        <v-list-item
          v-for="caseItem in group.list"
          :key="caseItem.id"
          :value="caseItem.id"
        >
          <template #default="{ isSelected }">
            <span
              class="pl-2 tw-block tw-truncate tw-text-nowrap tw-text-sm"
              :class="
                isSelected
                  ? 'text-primary-lighten-3 tw-font-bold'
                  : 'text-secondary'
              "
              @click="
                !isSelected &&
                  navigateTo(
                    `/${route.params.proID}/testPlans/${route.params.planID}/${caseItem.id}`,
                  )
              "
            >
              {{ caseItem.description }}
            </span>
          </template>
        </v-list-item>
        <v-list-item>
          <v-btn prepend-icon="add" variant="plain" color="primary" size="small"
            >New Test Case <menu-new-case></menu-new-case>
          </v-btn>
        </v-list-item>
      </v-list-group>
      <v-list-item class="tw-mt-2">
        <v-btn prepend-icon="add" variant="plain" color="tertiary" size="small"
          >New Test Suite
          <menu-new-suite></menu-new-suite>
        </v-btn>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script setup lang="ts">
const route = useRoute();

const currentPlan = computed(() =>
  getPlan(Number(route.params.proID), Number(route.params.planID)),
);
const openedSuite = ref<string[]>([]);

onMounted(() => {
  const currentSuite = getSuite(
    Number(route.params.proID),
    Number(route.params.planID),
    Number(route.params.caseID),
  );
  if (currentSuite) {
    openedSuite.value.push(currentSuite);
  }
});
</script>
