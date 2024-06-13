<template>
  <v-app>
    <layouts-project-nav v-model="expand"></layouts-project-nav>
    <layouts-project-app-bar
      @toggle-drawer="expand = !expand"
    ></layouts-project-app-bar>
    <v-main>
      <div
        class="tw-flex tw-h-full tw-max-h-[calc(100vh_-_48px)] tw-justify-center tw-px-8 tw-pb-9 tw-pt-4"
      >
        <div class="tw-max-h-full tw-max-w-[1080px] tw-grow">
          <slot></slot>
        </div>
      </div>
    </v-main>
  </v-app>
</template>
<script setup lang="ts">
const expand = ref(true);
</script>
