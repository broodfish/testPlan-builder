<template>
  <div class="tw-flex tw-flex-col tw-gap-[10px]">
    <div class="tw-flex tw-h-[48px] tw-flex-row tw-items-center">
      <div class="tw-h-12 tw-w-12">
        <v-btn
          v-if="breadcrumbs.length > 1"
          icon="arrow_back_ios"
          variant="text"
          color="secondary"
          @click="navigateTo(breadcrumbs[breadcrumbs.length - 2].path)"
        ></v-btn>
      </div>
      <div class="tw-text-2xl tw-font-bold">
        {{ breadcrumbs[breadcrumbs.length - 1].name }}
      </div>
    </div>
    <ul class="ml-12 tw-flex tw-flex-row tw-text-sm">
      <li
        v-for="(item, i) in breadcrumbs"
        :key="i"
        class="tw-flex tw-flex-row tw-items-end"
      >
        <v-hover v-if="i !== breadcrumbs.length - 1">
          <template #default="{ isHovering, props }">
            <span
              v-bind="props"
              class="cursor-pointer"
              :class="isHovering ? 'text-primary-darken-1' : ''"
              @click="navigateTo(item.path)"
            >
              <v-icon v-if="i === 0" size="small" class="mr-1">home</v-icon>
              {{ item.name }}
            </span>
          </template>
        </v-hover>
        <span v-else class="text-secondary">
          <v-icon v-if="i === 0" size="small" class="mr-1">home</v-icon>
          {{ item.name }}
        </span>
        <span v-if="i !== breadcrumbs.length - 1" class="mx-2">/</span>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
const route = useRoute();
const breadcrumbs = computed(() => {
  const temp = [{ name: "Home", path: "/" }];
  const projectID = Number(route.params.projectID);
  const planID = Number(route.params.planID);
  const runID = Number(route.params.runID);
  const groupID = Number(route.params.groupID);
  const caseID = Number(route.params.caseID);

  if (projectID) {
    temp.push({
      name: getProjectName(projectID)!,
      path: `/project-${projectID}`,
    });
  }

  if (planID) {
    temp.push({
      name: getPlan(projectID, planID)!.name,
      path: `/project-${projectID}/plan-${planID}`,
    });
  }

  if (runID) {
    temp.push({
      name: getRun(projectID, runID)!.name,
      path: `/project-${projectID}/run-${runID}`,
    });
  }

  if (planID && groupID && caseID) {
    temp.push({
      name: getPlanCase(projectID, planID, groupID, caseID)!.name,
      path: `/project-${projectID}/plan-${planID}/case-${groupID}-${caseID}`,
    });
  } else if (runID && groupID && caseID) {
    temp.push({
      name: getPlanCase(projectID, runID, groupID, caseID)!.name,
      path: `/project-${projectID}/run-${runID}/case-${groupID}-${caseID}`,
    });
  }

  return temp;
});
</script>
