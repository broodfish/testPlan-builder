<template>
  <v-app>
    <default-app-bar></default-app-bar>
    <v-main>
      <div class="tw-flex tw-h-[calc(100vh_-_64px)] tw-flex-col">
        <project-header></project-header>
        <div
          class="show-scrollbar tw-flex tw-flex-1 tw-flex-col tw-gap-[30px] tw-px-[60px] tw-py-[40px]"
        >
          <slot></slot>
        </div>
      </div>
    </v-main>
    <!-- <div
      class="tw-fixed tw-bottom-0 tw-flex tw-w-full tw-flex-col tw-items-center tw-justify-center"
    >
      <p class="text-grey tw-mb-2">Let's me see see!</p>
      <svg-bear></svg-bear>
    </div> -->
  </v-app>
</template>
