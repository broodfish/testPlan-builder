<template>
  <v-menu activator="parent">
    <template #activator="{ props }">
      <v-btn
        icon
        color="secondary"
        variant="plain"
        width="20"
        :ripple="false"
        v-bind="props"
        ><v-icon>more_vert</v-icon>
      </v-btn>
    </template>
    <v-list density="compact">
      <v-list-item
        :ripple="{ class: 'text-primary' }"
        value="edit"
        @click="emit('edit')"
        >Edit</v-list-item
      >
      <v-list-item
        :ripple="{ class: 'text-primary' }"
        value="delete"
        @click="emit('delete')"
        >Delete</v-list-item
      >
    </v-list></v-menu
  >
</template>
<script setup lang="ts">
const emit = defineEmits(["edit", "delete"]);
</script>
