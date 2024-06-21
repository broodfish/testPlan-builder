<template>
  <v-app-bar density="compact" color="neutral">
    <v-app-bar-nav-icon @click.stop="emit('toggleDrawer')"></v-app-bar-nav-icon>
    <nuxt-link to="/">
      <div class="text-h6 tw-flex tw-flex-row tw-items-center tw-gap-2 tw-px-4">
        <img
          src="@/assets/image/favicon.png"
          alt="favicon"
          class="tw-h-6 tw-w-6"
        />Zinwell
      </div>
    </nuxt-link>
  </v-app-bar>
  <v-app-bar elevation="0"
    ><layouts-project-breadcrumbs></layouts-project-breadcrumbs
  ></v-app-bar>
</template>
<script setup lang="ts">
const emit = defineEmits(["toggleDrawer"]);
</script>
