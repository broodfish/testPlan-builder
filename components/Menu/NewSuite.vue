<template>
  <v-menu
    activator="parent"
    transition="scale-transition"
    :close-on-content-click="false"
    location="end"
    offset="16"
  >
    <v-card min-width="300">
      <v-text-field
        label="New Test Suite"
        color="tertiary"
        variant="solo"
        density="compact"
      >
        <template #append-inner>
          <div class="tw-mr-[-0.75rem]">
            <v-btn
              color="tertiary"
              variant="tonal"
              flat
              height="48"
              :rounded="false"
              >Create</v-btn
            >
          </div>
        </template>
      </v-text-field>
    </v-card>
  </v-menu>
</template>
