<template>
  <div class="tw-flex tw-flex-col tw-gap-[30px]">
    <div class="tw-flex tw-flex-row tw-gap-[30px]">
      <custom-card title="Information">
        <template #content>
          <div class="px-4 py-2 tw-grid tw-grid-cols-2 tw-gap-3">
            <div class="item">
              <span class="title">Total Plans</span>
              <span class="value">4</span>
            </div>
            <div class="item">
              <span class="title">Total Runs</span>
              <span class="value">4</span>
            </div>
            <div class="item">
              <span class="title">Total Finished Runs</span>
              <span class="value">4</span>
            </div>
            <div class="item">
              <span class="title">Average Pass Rate</span>
              <span class="value">94.87%</span>
            </div>
          </div>
        </template>
      </custom-card>
      <v-table class="tw-flex-1">
        <thead>
          <tr>
            <th class="text-h6 px-6 py-4">Recent Test Plans</th>
          </tr>
        </thead>
        <tbody>
          <v-hover v-for="item in plans" :key="item.name">
            <template #default="{ isHovering, props }">
              <tr
                v-ripple="{ class: 'text-ripple' }"
                v-bind="props"
                class="cursor-pointer"
                :class="isHovering ? 'bg-shadow' : 'bg-transparent'"
              >
                <td>{{ item.name }}</td>
              </tr>
            </template>
          </v-hover>
        </tbody>
      </v-table>
    </div>
    <v-table>
      <thead>
        <tr>
          <th class="w-50">Test Plan</th>
          <th class="w-20">Created Time</th>
          <th class="w-10">Pass</th>
          <th class="w-10">Fail</th>
          <th class="w-10">Pass Rate</th>
        </tr>
      </thead>
      <tbody>
        <v-hover v-for="item in runs" :key="item.plan">
          <template #default="{ isHovering, props }">
            <tr
              v-ripple="{ class: 'text-ripple' }"
              v-bind="props"
              class="cursor-pointer"
              :class="isHovering ? 'bg-shadow' : 'bg-transparent'"
            >
              <td>{{ item.plan }}</td>
              <td>{{ item.createdTime }}</td>
              <td>{{ item.pass }}</td>
              <td>{{ item.fail }}</td>
              <td>{{ (item.pass / (item.pass + item.fail)) * 100 }}%</td>
            </tr>
          </template>
        </v-hover>
      </tbody>
      <template #top>
        <div class="text-h6 px-6 py-4 border-b">Recent Test Runs</div>
      </template>
    </v-table>
  </div>
</template>
<script setup lang="ts">
const plans = [
  { name: "Test Plan 1" },
  { name: "Test Plan 2" },
  { name: "Test Plan 3" },
];
const runs = [
  {
    plan: "Test Plan 1",
    createdTime: "2021-09-01",
    pass: 95,
    fail: 5,
  },
  {
    plan: "Test Plan 1",
    createdTime: "2021-09-01",
    pass: 95,
    fail: 5,
  },
  {
    plan: "Test Plan 1",
    createdTime: "2021-09-01",
    pass: 95,
    fail: 5,
  },
];
</script>
<style lang="scss" scoped>
.item {
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 180px;
}
.title {
  font-size: 0.9rem;
  font-weight: 700;
  color: rgba(var(--v-theme-secondary), 1);
  letter-spacing: 1px;
}
.value {
  font-family: monospace;
}
</style>
