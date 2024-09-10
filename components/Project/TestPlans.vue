<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="getPlans(Number(route.params.projectID))"
    >
      <template #item="{ item }">
        <v-hover>
          <template #default="{ isHovering, props }">
            <tr
              v-ripple="{ class: 'text-ripple' }"
              v-bind="props"
              class="cursor-pointer"
              :class="isHovering ? 'bg-shadow' : 'bg-transparent'"
              @click="
                navigateTo(`/project-${route.params.projectID}/plan-${item.id}`)
              "
            >
              <td>
                {{ item.name }}
              </td>
              <td class="text-center tw-font-mono">{{ item.createdTime }}</td>
              <td class="text-center tw-font-mono">
                {{ item.cases.totalCases }}
              </td>
              <td v-ripple.stop @click.stop>
                <v-btn
                  icon="play_arrow"
                  size="x-small"
                  variant="tonal"
                  @click.prevent="
                    () => {
                      newRunData = item;
                      creating = true;
                    }
                  "
                ></v-btn>
              </td>
              <td v-ripple.stop @click.stop>
                <menu-actions
                  @edit="
                    () => {
                      edittedPlan = item;
                      console.log(edittedPlan);
                      editing = true;
                    }
                  "
                  @delete="deleting = true"
                ></menu-actions>
              </td>
            </tr>
          </template>
        </v-hover>
      </template>
      <template #top>
        <div class="card-title border-b tw-flex tw-flex-row tw-justify-between">
          Test Plans
          <v-btn prepend-icon="add" @click="adding = true">ADD</v-btn>
        </div>
      </template>
    </v-data-table>
    <dialog-new-plan
      v-model="adding"
      @add="console.log('add')"
    ></dialog-new-plan>
    <dialog-edit-plan
      v-model="editing"
      :item="edittedPlan"
      @edit="console.log('edit')"
    ></dialog-edit-plan>
    <dialog-confirm-run
      v-model="creating"
      :item="newRunData"
      @create="console.log('create')"
    ></dialog-confirm-run>
    <dialog-confirm-deletion
      v-model="deleting"
      @delete="console.log('delete')"
    ></dialog-confirm-deletion>
  </div>
</template>
<script setup lang="ts">
const route = useRoute();
const adding = ref(false);
const editing = ref(false);
const creating = ref(false);
const deleting = ref(false);
const edittedPlan = ref<Plan>({
  id: -1,
  name: "",
  createdTime: "",
  cases: {
    totalCases: 0,
    totalSuites: 0,
    data: [],
  },
});
const newRunData = ref<Plan>({
  id: -1,
  name: "",
  createdTime: "",
  cases: {
    totalCases: 0,
    totalSuites: 0,
    data: [],
  },
});

const headers: ReadonlyHeaders = [
  {
    title: "Name",
  },
  {
    title: "Created Time",
    width: "200",
    align: "center",
  },
  {
    title: "Test Cases",
    width: "120",
    align: "center",
    sortable: false,
  },
  {
    title: "Run",
    align: "center",
    width: "64",
    sortable: false,
  },
  {
    key: "options",
    width: "44",
    sortable: false,
  },
];
</script>
