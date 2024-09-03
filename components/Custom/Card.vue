<template>
  <div class="border rounded-lg">
    <div
      class="border-b px-6 py-4 tw-flex tw-flex-row tw-items-center tw-justify-between tw-gap-4"
    >
      <div>
        <div class="text-h6">{{ props.title }}</div>
        <div v-if="props.description" class="text-subtitle-1 text-secondary">
          {{ props.description }}
        </div>
      </div>
      <div>
        <slot name="action"></slot>
      </div>
    </div>
    <div class="px-6 py-4">
      <slot name="content"></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  title: string;
  description?: string;
}>();
</script>
