<template>
  <v-data-table :items="runs" :headers="headers">
    <template #item="{ item }">
      <v-hover>
        <template #default="{ isHovering, props }">
          <tr
            v-ripple="{ class: 'text-ripple' }"
            v-bind="props"
            class="cursor-pointer"
            :class="isHovering ? 'bg-shadow' : 'bg-transparent'"
            @click="
              navigateTo(`/project-${route.params.projectID}/run-${item.id}`)
            "
          >
            <td>{{ item.name }}</td>
            <td class="tw-text-center">{{ item.createdTime }}</td>
            <td class="tw-text-center">
              <v-progress-linear
                :model-value="calcProgress(item.plan.cases.data).progress"
                height="15"
                color="green"
              >
                <template #default>
                  <span class="tw-text-xs"
                    >{{ calcProgress(item.plan.cases.data).progress }}%</span
                  >
                </template>
              </v-progress-linear>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td><menu-actions></menu-actions></td>
          </tr>
        </template>
      </v-hover>
    </template>
    <template #top>
      <div class="card-title border-b">Test Runs</div>
    </template>
  </v-data-table>
</template>
<script setup lang="ts">
const route = useRoute();
const runs = computed(() => getRuns(Number(route.params.projectID)));
const headers: ReadonlyHeaders = [
  { title: "Test Plan", value: "title" },
  {
    title: "Created Time",
    value: "createdTime",
    width: "200",
    align: "center",
  },
  { title: "Progress", value: "progress", align: "center", width: "150" },
  { title: "Pass", value: "pass", align: "center", width: "100" },
  { title: "Fail", value: "fail", align: "center", width: "100" },
  { title: "Pass Rate", key: "passRate", align: "center", width: "120" },
  {
    key: "options",
    width: "44",
    sortable: false,
  },
];
</script>
