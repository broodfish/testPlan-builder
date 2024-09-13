<template>
  <div class="border border-primary rounded-lg overflow-hidden">
    <v-hover>
      <template #default="{ isHovering, props }">
        <div
          v-ripple="{ class: 'text-primary-lighten-1' }"
          v-bind="props"
          class="px-4 py-3 cursor-pointer tw-flex tw-flex-row tw-items-center tw-justify-between tw-gap-4"
          :class="isHovering ? 'background-hover' : 'background'"
          @click="isExpanded = !isExpanded"
        >
          <div>
            <v-icon
              class="tw-transition"
              color="primary-darken-1"
              :class="isExpanded ? 'tw-rotate-90' : ''"
              >arrow_right</v-icon
            >
            <span class="text-primary ml-2 tw-font-bold">
              {{ propsData.title }}
            </span>
          </div>
        </div>
      </template>
    </v-hover>
    <v-expand-transition>
      <div v-show="isExpanded">
        <v-table class="border-none px-4 py-3 border-primary">
          <thead>
            <tr>
              <th class="tw-flex-1">Case Name</th>
              <th class="text-center tw-w-[80px]">Steps</th>
              <th class="text-center tw-w-[120px]">Priority</th>
              <th class="text-center tw-w-[100px]">Result</th>
            </tr>
          </thead>
          <tbody>
            <v-hover v-for="item in propsData.items" :key="item.id">
              <template #default="{ isHovering, props }">
                <tr
                  v-ripple="{ class: 'text-ripple' }"
                  v-bind="props"
                  class="cursor-pointer"
                  :class="isHovering ? 'bg-shadow' : 'bg-transparent'"
                  @click="
                    navigateTo(
                      `/projects/${route.params.projectId}/run/${route.params.runId}/case/${item.gid}/${item.id}`,
                    )
                  "
                >
                  <td>{{ item.name }}</td>
                  <td class="text-center tw-font-mono">{{ item.steps.num }}</td>
                  <td class="tw-text-center">
                    <v-chip v-if="item.priority === 'High'" color="error"
                      >High</v-chip
                    >
                    <v-chip
                      v-else-if="item.priority === 'Medium'"
                      color="primary"
                      >Medium</v-chip
                    >
                    <v-chip v-else>Low</v-chip>
                  </td>
                  <td class="text-center">
                    <span
                      v-if="
                        item.steps.data.some((step) => step.result === null)
                      "
                      class="text-secondary"
                    >
                      -
                    </span>
                    <span
                      v-else-if="item.steps.data.every((step) => step.result)"
                      class="text-success"
                    >
                      Pass
                    </span>
                    <span v-else class="text-error">Fail</span>
                  </td>
                </tr>
              </template>
            </v-hover>
          </tbody>
        </v-table>
      </div>
    </v-expand-transition>
  </div>
</template>
<script setup lang="ts">
const route = useRoute();
const propsData = defineProps<{
  title: string;
  items: Case[];
}>();
const isExpanded = ref(true);
</script>
<style scoped lang="scss">
.background {
  background-color: rgba(var(--v-theme-primary), 0.1);

  &-hover {
    background-color: rgba(var(--v-theme-primary), 0.15);
  }
}
</style>
