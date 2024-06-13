<template>
  <div>
    <layouts-default-title> Projects </layouts-default-title>
    <div class="tw-grid tw-grid-cols-1 tw-gap-8 sm:tw-grid-cols-3">
      <base-card v-for="proj in projects" :key="proj.id" content-props="p-0">
        <template #title>
          <div class="tw-cursor-pointer" @click="navigateTo(`/${proj.id}`)">
            {{ proj.name }}
          </div>
        </template>
        <template #content>
          <v-list class="list">
            <v-list-item
              v-for="run in proj.runs
                .slice(proj.runs.length - 5, proj.runs.length)
                .reverse()"
              :key="run.id"
              class="tw-cursor-pointer"
              @click="navigateTo(`/${proj.id}/testRuns/${run.id}`)"
              >{{ run.title }}</v-list-item
            >
          </v-list>
        </template>
      </base-card>
    </div>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  title: "Home",
});
</script>
<style scoped lang="scss">
.list {
  padding: 0 !important;
}
</style>
