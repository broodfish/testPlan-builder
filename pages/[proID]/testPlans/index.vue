<template>
  <div>
    <layouts-default-title
      >Test Plans
      <v-btn color="tertiaryContainer" @click="adding = true"
        >New</v-btn
      ></layouts-default-title
    >
    <div>
      <v-data-table
        :headers="headers"
        :items="getPlans(Number(route.params.proID))"
      >
        <template #item="{ item }">
          <tr>
            <td>{{ item.id }}</td>
            <td
              v-ripple
              class="hover:tw-cursor-pointer hover:tw-bg-[rgba(0,0,0,0.04)]"
              @click="navigateTo(`/${route.params.proID}/testPlans/${item.id}`)"
            >
              <div class="tw-flex tw-flex-col">
                <span>{{ item.title }}</span>
                <span class="text-secondary">{{ item.description }}</span>
              </div>
            </td>
            <td>
              <v-btn
                icon
                size="x-small"
                rounded
                @click="
                  () => {
                    newRunData = item;
                    creating = true;
                  }
                "
                ><v-icon>play_arrow</v-icon></v-btn
              >
            </td>
            <td>
              <menu-actions
                @edit="
                  () => {
                    edittedPlan = item;
                    editing = true;
                  }
                "
                @delete="deleting = true"
              ></menu-actions>
            </td>
          </tr>
        </template>
      </v-data-table>
    </div>
    <dialog-new-plan
      v-model="adding"
      @add="console.log('add')"
    ></dialog-new-plan>
    <dialog-edit-plan
      v-model="editing"
      :item="edittedPlan"
      @edit="console.log('edit')"
    ></dialog-edit-plan>
    <dialog-create-run
      v-model="creating"
      :item="newRunData"
      @create="console.log('create')"
    ></dialog-create-run>
    <dialog-confirm-deletion
      v-model="deleting"
      @delete="console.log('delete')"
    ></dialog-confirm-deletion>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  title: "Test Plans",
  layout: "project",
});

const route = useRoute();
const adding = ref(false);
const editing = ref(false);
const creating = ref(false);
const deleting = ref(false);
const edittedPlan = ref<CustomTestPlan>({
  id: -1,
  title: "",
  description: "",
  createdTime: "",
  cases: [],
});
const newRunData = ref<CustomTestPlan>({
  id: -1,
  title: "",
  description: "",
  createdTime: "",
  cases: [],
});

const headers: ReadonlyHeaders = [
  {
    title: "ID",
    value: "id",
    width: "60",
  },
  {
    title: "Title",
    value: "title",
  },
  {
    title: "Run",
    key: "run",
    align: "center",
    width: "64",
    sortable: false,
  },
  {
    key: "options",
    width: "44",
    sortable: false,
  },
];
</script>
