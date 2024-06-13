<template>
  <div
    class="flex-row tw-relative tw-flex tw-text-gray-700 hover:tw-text-black"
  >
    <div
      class="tw-flex tw-cursor-pointer tw-flex-row tw-items-center"
      @click="opening = !opening"
    >
      <div v-if="modelValue === 'pass'" class="text-green tw-w-[40px] tw-px-2">
        Pass
      </div>
      <div
        v-else-if="modelValue === 'fail'"
        class="text-error tw-w-[40px] tw-px-2"
      >
        Fail
      </div>
      <div v-else class="tw-w-[40px] tw-px-2"></div>
      <v-icon>arrow_drop_down</v-icon>
    </div>
    <v-menu v-model="opening" target="parent">
      <v-card>
        <v-hover>
          <template #default="{ isHovering, props: passPros }">
            <div
              v-ripple
              v-bind="passPros"
              class="list-item text-green"
              :class="isHovering ? 'bg-green-lighten-5' : ''"
              @click="clickHandler('pass')"
            >
              Pass
            </div>
          </template>
        </v-hover>
        <v-hover>
          <template #default="{ isHovering, props: failPros }">
            <div
              v-ripple
              v-bind="failPros"
              class="list-item"
              :class="
                isHovering ? 'bg-red-lighten-5 text-red-darken-3' : 'text-error'
              "
              @click="clickHandler('fail')"
            >
              Fail
            </div>
          </template>
        </v-hover>
      </v-card>
    </v-menu>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  modelValue: string;
}>();
const emit = defineEmits(["update:modelValue"]);
const modelValue = computed({
  get: () => props.modelValue,
  set: (value: string) => {
    emit("update:modelValue", value);
  },
});
const opening = ref(false);

const clickHandler = (value: string) => {
  modelValue.value = value;
  opening.value = false;
};
</script>
<style scoped lang="scss">
.list-item {
  padding: 8px 16px;
  cursor: pointer;
  font-size: 0.75rem;
  line-height: 1rem;
}
</style>
