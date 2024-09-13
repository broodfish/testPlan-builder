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
      <li v-for="(item, i) in breadcrumbs" :key="i" class="tw-flex tw-flex-row">
        <v-hover v-if="i !== breadcrumbs.length - 1">
          <template #default="{ isHovering, props }">
            <span
              v-bind="props"
              class="cursor-pointer"
              :class="isHovering ? 'text-primary-darken-1' : ''"
              @click="navigateTo(item.path)"
            >
              <v-icon v-if="i === 0" size="small" class="mr-1">work</v-icon>
              {{ item.name }}
            </span>
          </template>
        </v-hover>
        <span v-else class="text-secondary">
          <v-icon v-if="i === 0" size="small" class="mr-1">work</v-icon>
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
  const temp = [{ name: "Projects", path: "/projects" }];
  const projectId = Number(route.params.projectId);
  const planId = Number(route.params.planId);
  const runId = Number(route.params.runId);
  const groupId = Number(route.params.groupId);
  const caseId = Number(route.params.caseId);

  if (projectId) {
    temp.push({
      name: getProjectName(projectId)!,
      path: `/projects/${projectId}`,
    });
  }

  if (planId) {
    temp.push({
      name: getPlan(projectId, planId)!.name,
      path: `/projects/${projectId}/plan/${planId}`,
    });
  }

  if (runId) {
    temp.push({
      name: getRun(projectId, runId)!.name,
      path: `/projects/${projectId}/run/${runId}`,
    });
  }

  if (planId && groupId && caseId) {
    temp.push({
      name: getPlanCase(projectId, planId, groupId, caseId)!.name,
      path: `/projects/${projectId}/plan/${planId}/case/${groupId}/${caseId}`,
    });
  } else if (runId && groupId && caseId) {
    temp.push({
      name: getPlanCase(projectId, runId, groupId, caseId)!.name,
      path: `/projects/${projectId}/run/${runId}/case/${groupId}/${caseId}`,
    });
  }

  return temp;
});
</script>
