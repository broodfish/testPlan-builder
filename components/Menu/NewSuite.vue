<template>
  <v-menu
    v-model="isOpen"
    activator="parent"
    transition="scale-transition"
    :close-on-content-click="false"
    location="end"
    offset="16"
  >
    <v-card min-width="300">
      <v-text-field
        v-model="suiteName"
        placeholder="Suite Name"
        color="primary"
        variant="outlined"
        density="default"
        hide-details
        base-color="transparent"
      >
        <template #append-inner>
          <div class="tw-mr-[-0.75rem]">
            <v-btn
              variant="tonal"
              flat
              :rounded="false"
              height="56"
              @click="addHandler"
              >Add</v-btn
            >
          </div>
        </template>
      </v-text-field>
    </v-card>
  </v-menu>
</template>
<script setup lang="ts">
const isOpen = ref(false);
const suiteName = ref("");
const addHandler = () => {
  if (suiteName.value === "") {
    return;
  }
  // TODO: add new suite
  isOpen.value = false;
};
</script>
