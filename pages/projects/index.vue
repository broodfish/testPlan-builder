<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="data"
      :sort-by="[{ key: 'createdTime', order: 'desc' }]"
    >
      <template #item="{ item }">
        <v-hover>
          <template #default="{ isHovering, props }">
            <tr
              v-ripple="{ class: 'text-ripple' }"
              v-bind="props"
              class="cursor-pointer"
              :class="isHovering ? 'bg-shadow' : 'bg-transparent'"
              @click="navigateTo(`/projects/${item.id}`), (store.tab = null)"
            >
              <td>{{ item.name }}</td>
              <td class="text-center">{{ item.createdTime }}</td>
            </tr>
          </template>
        </v-hover>
      </template>
      <template #top>
        <div class="card-title border-b tw-flex tw-flex-row tw-justify-between">
          Projects
          <v-btn prepend-icon="add" @click="isAdding = true">ADD</v-btn>
        </div>
      </template>
    </v-data-table>
    <dialog-new-project
      v-model="isAdding"
      @add="addHandler"
    ></dialog-new-project>
  </div>
</template>
<script setup lang="ts">
import { useStore } from "@/stores/data";
definePageMeta({
  title: "Home",
});
const store = useStore();
const headers: ReadonlyHeaders = [
  {
    title: "Project Name",
    value: "name",
  },
  {
    title: "Created Time",
    value: "createdTime",
    width: "180",
    align: "center",
  },
];
const isAdding = ref(false);
const addHandler = () => {
  // TODO: add project
  isAdding.value = false;
};
</script>
