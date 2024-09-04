<template>
  <v-data-table
    :headers="[
      {
        title: 'Project Name',
        value: 'name',
      },
    ]"
    :items="[
      {
        id: 1,
        name: 'Project 1',
      },
      {
        id: 2,
        name: 'Project 2',
      },
      {
        id: 3,
        name: 'Project 3',
      },
    ]"
  >
    <template #item="{ item }">
      <v-hover>
        <template #default="{ isHovering, props }">
          <tr
            v-ripple="{ class: 'text-ripple' }"
            v-bind="props"
            class="cursor-pointer"
            :class="isHovering ? 'bg-shadow' : 'bg-transparent'"
            @click="navigateTo(`/project-${item.id}`), (store.tab = null)"
          >
            <td>{{ item.name }}</td>
          </tr>
        </template>
      </v-hover>
    </template>
    <template #top>
      <div class="card-title border-b tw-flex tw-flex-row tw-justify-between">
        Projects
        <v-btn prepend-icon="add">ADD</v-btn>
      </div>
    </template>
  </v-data-table>
</template>
<script setup lang="ts">
import { useStore } from "@/stores/data";
definePageMeta({
  title: "Home",
});
const store = useStore();
</script>
