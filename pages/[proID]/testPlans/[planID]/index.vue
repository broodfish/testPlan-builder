<template>
  <div>
    <layouts-default-title class="tw-justify-between">
      <div class="tw-flex tw-gap-4">
        Test Cases
        <v-btn-group color="tertiaryContainer"
          ><v-btn @click="adding = true">New</v-btn
          ><v-btn icon size="small"
            ><v-icon icon="arrow_drop_down"></v-icon>
            <v-menu activator="parent">
              <v-list>
                <div class="tw-flex tw-flex-col">
                  <v-btn
                    class="text-btn"
                    variant="text"
                    :rounded="false"
                    @click="adding = true"
                  >
                    New Test Case
                  </v-btn>
                  <v-btn class="text-btn" variant="text" :rounded="false"
                    >New Test Suite
                    <menu-new-suite></menu-new-suite>
                  </v-btn>
                </div>
              </v-list>
            </v-menu> </v-btn
        ></v-btn-group>
      </div>
      <v-btn
        prepend-icon="play_arrow"
        color="primary"
        @click="
          () => {
            newRunData = getPlan(
              Number(route.params.proID),
              Number(route.params.planID),
            )!;
            creating = true;
          }
        "
      >
        Run Test Plan</v-btn
      >
    </layouts-default-title>
    <div v-if="testCases?.length">
      <div class="tw-flex tw-flex-col tw-gap-14">
        <div v-for="(group, i) in testCases" :key="i">
          <span class="subtitle">
            {{ group.name.toUpperCase() }}
          </span>
          <v-data-table-virtual
            :items="group.cases.data"
            :headers="headers"
            no-data-text="No Test Case"
          >
            <template #item="{ item }">
              <tr>
                <td>{{ item.id }}</td>
                <td
                  v-ripple
                  class="hover:tw-cursor-pointer hover:tw-bg-[rgba(0,0,0,0.04)]"
                  @click="
                    navigateTo(
                      `/${route.params.proID}/testPlans/${route.params.planID}/${group.id}/${item.id}`,
                    )
                  "
                >
                  {{ item.description }}
                </td>
                <td>{{ item.steps.num }}</td>
                <td class="tw-text-center">
                  <v-chip v-if="item.priority === 'High'" color="error"
                    >High</v-chip
                  >
                  <v-chip v-else-if="item.priority === 'Medium'" color="primary"
                    >Medium</v-chip
                  >
                  <v-chip v-else>Low</v-chip>
                </td>
                <td>
                  <menu-actions
                    @edit="
                      () => {
                        currentCase = item;
                        console.log(currentCase);
                        editing = true;
                      }
                    "
                    @delete="deleting = true"
                  ></menu-actions>
                </td>
              </tr>
            </template>
          </v-data-table-virtual>
          <v-btn
            prepend-icon="add"
            variant="plain"
            class="tw-ml-4 tw-mt-2"
            color="primary"
            >New Test Case <menu-new-case></menu-new-case>
          </v-btn>
        </div>
      </div>
      <div class="tw-mt-8">
        <v-btn prepend-icon="add" color="tertiaryContainer"
          >New Test Suite
          <menu-new-suite></menu-new-suite>
        </v-btn>
      </div>
    </div>
    <v-empty-state
      v-else
      headline="(´･_･`)"
      title="No Test Case Yet"
      text="Click 'NEW' button to add a test case!"
    ></v-empty-state>
    <dialog-create-run
      v-model="creating"
      :item="newRunData"
      @create="console.log('create')"
    ></dialog-create-run>
    <dialog-new-case v-model="adding"></dialog-new-case>
    <dialog-edit-case v-model="editing" :data="currentCase"></dialog-edit-case>
    <dialog-confirm-deletion
      v-model="deleting"
      @delete="console.log('delete')"
    ></dialog-confirm-deletion>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  title: "Test Cases",
  layout: "project",
});

const route = useRoute();

const creating = ref(false);
const adding = ref(false);
const editing = ref(false);
const deleting = ref(false);
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
const currentCase = ref<Case>({
  id: -1,
  gid: -1,
  description: "",
  priority: "Medium",
  prerequisite: "",
  steps: {
    num: 0,
    data: [],
  },
});

const headers: ReadonlyHeaders = [
  {
    title: "ID",
    value: "id",
    width: "60",
  },
  {
    title: "Description",
    value: "description",
  },
  {
    title: "Steps",
    align: "center",
    width: "60",
  },
  {
    title: "Priority",
    align: "center",
    width: "100",
  },
  {
    key: "options",
    width: "44",
    sortable: false,
  },
];
const testCases = computed(() =>
  getCases(Number(route.params.proID), Number(route.params.planID)),
);
</script>
<style scoped lang="scss"></style>
