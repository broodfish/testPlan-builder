<template>
  <v-app>
    <layouts-default-app-bar></layouts-default-app-bar>
    <v-main>
      <div class="tw-flex tw-h-full tw-justify-center tw-px-8 tw-pb-9 tw-pt-4">
        <div class="tw-max-w-[1080px] tw-grow">
          <slot></slot>
        </div>
      </div>
    </v-main>
  </v-app>
</template>
