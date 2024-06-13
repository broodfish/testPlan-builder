<template>
  <v-menu
    activator="parent"
    transition="scale-transition"
    :close-on-content-click="false"
    offset="20"
  >
    <v-card min-width="600">
      <div class="tw-flex tw-flex-row tw-items-center tw-pl-4">
        <v-text-field
          variant="solo"
          flat
          label="Description"
          class="tw-col-span-2"
          color="primary"
          density="compact"
          width="160"
        ></v-text-field>
        <div class="tw-mx-2 tw-h-12">
          <v-divider
            vertical
            inset
            class="border-primary"
            opacity="0.3"
          ></v-divider>
        </div>
        <v-select
          variant="solo"
          flat
          label="Priority"
          class="tw-col-span-2"
          color="primary"
          density="compact"
          width="120"
          :items="['High', 'Medium', 'Low']"
        ></v-select>
        <div class="tw-mx-2 tw-h-12">
          <v-divider
            vertical
            inset
            class="border-primary"
            opacity="0.3"
          ></v-divider>
        </div>
        <v-text-field
          variant="solo"
          flat
          label="Prerequisite"
          class="tw-col-span-2"
          color="primary"
          density="compact"
          width="160"
        ></v-text-field>
        <v-btn color="primary" variant="tonal" flat height="48" :rounded="false"
          >Create</v-btn
        >
      </div>
    </v-card>
  </v-menu>
</template>
<style scoped lang="scss">
.border-primary {
  border-right: thin solid rgb(var(--v-theme-primary)) !important;
}
</style>
