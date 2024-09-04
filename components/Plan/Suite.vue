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
          <div @click.stop>
            <v-btn prepend-icon="add" @click="adding = true">New Case</v-btn>
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
              <th class="tw-w-[44px]"></th>
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
                      `/${route.params.proID}/${route.params.planID}/${item.gid}/${item.id}`,
                    )
                  "
                >
                  <td>{{ item.description }}</td>
                  <td class="text-center">{{ item.steps.num }}</td>
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
                  <td>
                    <menu-actions
                      @edit="(currentCase = item), (editing = true)"
                      @delete="deleting = true"
                    ></menu-actions>
                  </td>
                </tr>
              </template>
            </v-hover>
          </tbody>
        </v-table>
      </div>
    </v-expand-transition>
    <dialog-new-case v-model="adding"></dialog-new-case>
    <dialog-edit-case v-model="editing" :data="currentCase"></dialog-edit-case>
    <dialog-confirm-deletion
      v-model="deleting"
      @delete="console.log('delete')"
    ></dialog-confirm-deletion>
  </div>
</template>
<script setup lang="ts">
const route = useRoute();
const propsData = defineProps<{
  title: string;
  items: Case[];
}>();
const isExpanded = ref(true);
const adding = ref(false);
const editing = ref(false);
const deleting = ref(false);

const currentCase = ref<Case>({
  id: -1,
  gid: -1,
  description: "",
  priority: "Medium",
  prerequisite: "",
  steps: {
    num: 0,
    data: [],
  },
});
</script>
<style scoped lang="scss">
.background {
  background-color: rgba(var(--v-theme-primary), 0.1);

  &-hover {
    background-color: rgba(var(--v-theme-primary), 0.15);
  }
}
</style>
