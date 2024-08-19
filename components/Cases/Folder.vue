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
        v-for="group in currentPlan?.list.data"
        :key="group.id"
        :value="group.id"
      >
        <template #activator="{ props }">
          <v-list-item v-bind="props" class="tw-font-bold" :value="group.id">
            <template #default>
              <div class="tw-flex tw-gap-2">
                <div class="tw-flex tw-gap-1">
                  <v-icon
                    color="grey"
                    class="tw-transition"
                    size="small"
                    :class="
                      openedSuite.includes(group.id) ? 'tw-rotate-180' : ''
                    "
                    >keyboard_arrow_down</v-icon
                  >
                  <v-icon color="blue-lighten-1" size="small">{{
                    openedSuite.includes(group.id) ? "folder_open" : "folder"
                  }}</v-icon>
                </div>
                <span class="tw-block tw-truncate tw-text-nowrap tw-text-xs">
                  {{ group.name }}
                </span>
              </div>
            </template>
            <template #append></template>
          </v-list-item>
        </template>
        <v-list-item
          v-for="caseItem in group.cases.data"
          :key="caseItem.id"
          :value="caseItem.id"
        >
          <template #default="{ isSelected }">
            <span
              class="pl-2 tw-block tw-truncate tw-text-nowrap tw-text-xs"
              :class="
                isSelected
                  ? 'text-primary-lighten-3 tw-font-bold'
                  : 'text-secondary'
              "
              @click="
                !isSelected &&
                  navigateTo(
                    `/${route.params.proID}/testPlans/${route.params.planID}/${group.id}/${caseItem.id}`,
                  )
              "
            >
              <v-icon>assignment</v-icon> {{ caseItem.description }}
            </span>
          </template>
        </v-list-item>
        <v-list-item>
          <v-btn
            prepend-icon="add"
            variant="plain"
            color="primary"
            size="x-small"
            >New Test Case <menu-new-case></menu-new-case>
          </v-btn>
        </v-list-item>
      </v-list-group>
      <v-list-item class="tw-mt-2">
        <v-btn
          prepend-icon="add"
          variant="plain"
          color="tertiary"
          size="x-small"
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
const openedSuite = ref<number[]>([]);

onMounted(() => {
  const currentSuite = getSuite(
    Number(route.params.proID),
    Number(route.params.planID),
    Number(route.params.groupID),
  );
  if (currentSuite) {
    openedSuite.value.push(currentSuite.id);
  }
});
</script>
