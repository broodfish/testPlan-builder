<template>
  <div>
    <custom-card title="Test Cases">
      <template #content>
        <div class="tw-flex tw-flex-col tw-gap-4">
          <plan-suite
            v-for="(group, i) in testCases"
            :key="i"
            :title="group.name"
            :items="group.cases.data"
          >
          </plan-suite>
        </div>
      </template>
      <template #action>
        <v-btn prepend-icon="add">New Suite</v-btn>
      </template>
    </custom-card>
    <dialog-create-run
      v-model="creating"
      :item="newRunData"
      @create="console.log('create')"
    ></dialog-create-run>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  title: "Test Cases",
});

const route = useRoute();

const creating = ref(false);
const newRunData = ref<Plan>({
  id: -1,
  title: "",
  description: "",
  createdTime: "",
  list: {
    num: 0,
    data: [],
  },
});

const testCases = computed(() =>
  getCases(Number(route.params.proID), Number(route.params.planID)),
);
</script>
<style scoped lang="scss"></style>
