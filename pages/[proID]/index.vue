<template>
  <div>
    <layouts-default-title>Overview</layouts-default-title>
    <div class="tw-flex tw-flex-col tw-gap-10">
      <div class="tw-grid tw-grid-cols-2 tw-gap-4">
        <base-card>
          <template #title> TIMELINE </template>
          <template #content>
            <div class="tw-flex">
              <v-timeline side="end" density="compact">
                <v-timeline-item
                  v-for="log in logs.reverse().slice(0, 5)"
                  :key="log.id"
                  dot-color="tertiaryContainer"
                  size="x-small"
                >
                  <div
                    class="rounded tw-p-2 tw-text-sm hover:tw-bg-[rgba(var(--v-theme-tertiaryContainer),0.2)]"
                  >
                    <span class="tw-font-bold">{{ log.time }}</span>
                    <span
                      v-if="log.action === 'created'"
                      class="text-secondary tw-indent-4"
                    >
                      Created a new test {{ log.type }}
                      <span class="text-tertiary tw-font-seemibold"
                        >"{{ log.name }}"</span
                      >
                    </span>
                    <span
                      v-else-if="log.action === 'deleted'"
                      class="text-secondary tw-indent-4"
                    >
                      Deleted a test {{ log.type }}
                      <span class="text-tertiary tw-font-seemibold"
                        >"{{ log.name }}"</span
                      >
                    </span>
                    <span
                      v-else-if="log.action === 'finished'"
                      class="text-secondary tw-indent-4"
                    >
                      Finished a test {{ log.type }}
                      <span class="text-tertiary tw-font-seemibold"
                        >"{{ log.name }}"</span
                      >
                    </span>
                  </div>
                </v-timeline-item>
              </v-timeline>
            </div>
          </template>
        </base-card>
        <base-card>
          <template #title> RECENT TEST PLANS </template>
          <template #content>
            <v-data-table
              :headers="planHeaders"
              :items="
                getPlans(Number(route.params.proID))?.reverse().slice(0, 5)
              "
            >
              <template #item="{ item }">
                <tr
                  v-ripple
                  class="hover:tw-cursor-pointer"
                  @click="
                    navigateTo(`/${route.params.proID}/testPlans/${item.id}`)
                  "
                >
                  <td>{{ item.title }}</td>
                  <td>{{ item.description }}</td>
                </tr>
              </template>
              <template #bottom></template>
            </v-data-table>
            <v-btn
              variant="text"
              color="tertiary"
              @click="navigateTo(`/${route.params.proID}/testPlans`)"
              ><v-icon class="tw-mr-2">more_horiz</v-icon>More Test Plans</v-btn
            >
          </template>
        </base-card>
      </div>
      <base-card>
        <template #title>
          <div class="tw-h-full tw-w-full tw-cursor-pointer">
            RECENT RESULTS
          </div>
        </template>
        <template #content>
          <v-data-table :headers="runHeaders" :items="recentRuns">
            <template #item="{ item }">
              <tr
                class="hover:tw-cursor-pointer"
                @click="
                  navigateTo(`/${route.params.proID}/testRuns/${item.id}`)
                "
              >
                <td>
                  {{ item.title }}
                </td>
                <td class="tw-text-center">
                  {{ item.createdTime }}
                </td>
                <td class="tw-text-center">
                  {{ item.finishedTime }}
                </td>
                <td class="tw-text-center">
                  {{ calcPassRate(item.plan.list.data).passRate }}%
                </td>
              </tr>
            </template>
            <template #bottom></template>
          </v-data-table>
          <v-btn
            variant="text"
            color="tertiary"
            @click="navigateTo(`/${route.params.proID}/testRuns`)"
            ><v-icon class="tw-mr-2">more_horiz</v-icon>More Test Runs</v-btn
          >
        </template>
      </base-card>
    </div>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  title: "Overview",
  layout: "project",
});

const route = useRoute();

const runHeaders: ReadonlyHeaders = [
  {
    title: "Title",
    value: "title",
  },
  {
    title: "Created Time",
    value: "createdTime",
    align: "center",
    width: "200",
  },
  {
    title: "Finished Time",
    value: "finishedTime",
    align: "center",
    width: "200",
  },
  {
    title: "Pass Rate",
    align: "center",
    width: "100",
  },
];
const planHeaders: ReadonlyHeaders = [
  {
    title: "Title",
    value: "title",
  },
  {
    title: "Description",
    value: "description",
  },
];

const recentRuns = computed(() => getFinishedRuns(Number(route.params.proID)));
</script>
<style scoped lang="scss">
.info {
  > .info-title {
    font-weight: 500;
    line-height: 2;
    text-transform: uppercase;
    color: rgb(var(--v-theme-secondary));
  }

  > .info-content {
    text-align: right;
    line-height: 2;
  }
}
</style>
