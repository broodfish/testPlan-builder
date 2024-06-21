<template>
  <v-app>
    <layouts-project-nav v-model="expand"></layouts-project-nav>
    <layouts-project-app-bar
      @toggle-drawer="expand = !expand"
    ></layouts-project-app-bar>
    <v-main>
      <div class="tw-flex tw-h-full tw-justify-center tw-px-4 tw-pb-9 tw-pt-4">
        <v-layout class="tw-h-full tw-w-full">
          <v-app-bar density="compact" :elevation="1">
            <v-app-bar-title>
              <span
                class="text-primary tw-cursor-pointer tw-font-bold hover:tw-underline"
                @click="
                  navigateTo(
                    `/${route.params.proID}/testPlans/${route.params.planID}`,
                  )
                "
                >Test Case</span
              ><v-icon color="grey">chevron_right</v-icon>
              <span>{{ currentCase?.description }}</span>
            </v-app-bar-title>
            <template #prepend> </template>
          </v-app-bar>
          <cases-folder></cases-folder>
          <v-main>
            <div class="tw-h-full tw-w-full tw-p-4">
              <slot></slot>
            </div>
          </v-main>
        </v-layout>
      </div>
    </v-main>
  </v-app>
</template>
<script setup lang="ts">
const expand = ref(true);

const route = useRoute();

const currentCase = computed(() => {
  const proID = Number(route.params.proID);
  const planID = Number(route.params.planID);
  const groupID = Number(route.params.groupID);
  const caseID = Number(route.params.caseID);
  return getCase(proID, planID, groupID, caseID);
});
</script>
