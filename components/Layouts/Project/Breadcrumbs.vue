<template>
  <ul class="tw-flex tw-items-center tw-px-3 tw-py-2">
    <v-btn
      icon
      size="x-small"
      @click="
        items.length > 1
          ? navigateTo(items[items.length - 2].href)
          : navigateTo('/')
      "
      ><v-icon>arrow_back_ios</v-icon></v-btn
    >
    <span v-for="(item, i) in items" :key="i" class="tw-flex tw-items-center">
      <nuxt-link :to="item.disabled ? undefined : item.href">
        <li
          class="px-2 tw-font-bold"
          :class="
            item.disabled
              ? 'text-secondary'
              : 'notLast text-primary tw-cursor-pointer hover:tw-underline '
          "
        >
          {{ item.title }}
        </li>
      </nuxt-link>
      <li v-if="!item.disabled" class="tw-select-none tw-font-bold">/</li>
    </span>
  </ul>
  <!-- <v-breadcrumbs :items="items"></v-breadcrumbs> -->
</template>
<script setup lang="ts">
const route = useRoute();
const items = computed(() => {
  const breadcrumbs = ref<BreadCrumb[]>([]);
  const segments = (route.name as string).split("-");
  segments.forEach((segment, i) => {
    const findSeg = getRoute(segment);
    if (findSeg) {
      const title = ref("");
      const disabled = i === segments.length - 1;
      if (segment === "proID") {
        title.value = getProjectName(Number(route.params.proID))!;
      } else if (segment === "planID") {
        title.value = getPlan(
          Number(route.params.proID),
          Number(route.params.planID),
        )!.title;
      } else if (segment === "runID") {
        title.value = getRunTitle(
          Number(route.params.proID),
          Number(route.params.runID),
        )!;
      } else if (segment === "caseID") {
        title.value = getCase(
          Number(route.params.proID),
          Number(route.params.planID),
          Number(route.params.groupID),
          Number(route.params.caseID),
        )!.description;
      } else {
        title.value = findSeg.title;
      }
      breadcrumbs.value.push({
        title: title.value,
        disabled,
        href: {
          name: findSeg.name,
          params: route.params,
        },
      });
    }
  });

  return breadcrumbs.value;
});
</script>
