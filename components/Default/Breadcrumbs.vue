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
  const proID = Number(route.params.proID);
  const planID = Number(route.params.planID);
  const runID = Number(route.params.runID);
  const groupID = Number(route.params.groupID);
  const caseID = Number(route.params.caseID);

  if (proID) {
    temp.push({ name: getProjectName(proID)!, path: `/${proID}` });
  }

  if (planID) {
    temp.push({
      name: getPlan(proID, planID)!.title,
      path: `/${proID}/${planID}`,
    });
  }

  if (runID) {
    temp.push({
      name: getRun(proID, runID)!.title,
      path: `/${proID}/${runID}`,
    });
  }

  if (groupID && caseID) {
    temp.push({
      name: getCase(proID, planID, groupID, caseID)!.description,
      path: `/${proID}/${planID}/${groupID}/${caseID}`,
    });
  }

  return temp;
});
</script>
