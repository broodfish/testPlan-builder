<template>
  <v-card
    variant="flat"
    border="primary opacity-100 thin"
    rounded="lg"
    elevation="5"
  >
    <v-card-item
      class="bg-primary text-onPrimary font-weight-black tw-text-base tw-tracking-wider"
    >
      <slot name="title"></slot>
    </v-card-item>
    <v-card-text class="content" :class="props.contentProps">
      <slot name="content"></slot>
    </v-card-text>
  </v-card>
</template>
<script setup lang="ts">
const props = defineProps({
  contentProps: {
    type: String,
    default: "p-4",
  },
});
</script>
<style scoped lang="scss">
.content {
  &.p-4 {
    padding: 1rem !important;
  }
  &.p-0 {
    padding: 0 !important;
  }
}
</style>
