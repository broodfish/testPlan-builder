<template>
  <v-card
    variant="flat"
    border="primary-lighten-1 opacity-100 thin"
    rounded="lg"
  >
    <v-card-item
      class="text-primary font-weight-black tw-text-base tw-tracking-wider"
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
