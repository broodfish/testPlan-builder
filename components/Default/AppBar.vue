<template>
  <v-app-bar color="neutral" elevation="0" class="border-b">
    <nuxt-link to="/">
      <div
        class="text-h6 tw-flex tw-flex-row tw-items-center tw-gap-4 tw-pl-12"
      >
        <v-icon color="primary">description</v-icon>
        Zinwell Plan
      </div>
    </nuxt-link>
    <v-spacer></v-spacer>
    <div class="tw-w-[300px] tw-pr-12">
      <v-text-field
        :hide-details="true"
        label="Search"
        prepend-inner-icon="search"
        density="compact"
      ></v-text-field>
    </div>
  </v-app-bar>
</template>
