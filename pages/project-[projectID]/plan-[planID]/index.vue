<template>
  <div>
    <custom-card title="Test Cases">
      <template #content>
        <div class="tw-flex tw-flex-col tw-gap-4">
          <plan-suite
            v-for="(group, i) in testCases"
            :key="i"
            :title="group.name"
            :items="group.list.data"
          >
          </plan-suite>
        </div>
      </template>
      <template #action>
        <v-btn prepend-icon="add"
          >New Suite<menu-new-suite></menu-new-suite
        ></v-btn>
      </template>
    </custom-card>
    <dialog-confirm-run
      v-model="creating"
      :item="newRunData"
      @create="console.log('create')"
    ></dialog-confirm-run>
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
  name: "",
  createdTime: "",
  cases: {
    totalCases: 0,
    totalSuites: 0,
    data: [],
  },
});

const testCases = computed(() =>
  getPlanCases(Number(route.params.projectID), Number(route.params.planID)),
);
</script>
<style scoped lang="scss"></style>
