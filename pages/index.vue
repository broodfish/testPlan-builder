<template>
  <div>
    <layouts-default-title> Projects </layouts-default-title>
    <div class="tw-flex tw-flex-wrap tw-gap-12">
      <v-hover v-for="proj in data" :key="proj.id">
        <template #default="{ isHovering, props }">
          <v-card
            v-bind="props"
            border="primaryContainer opacity-100 thin"
            class="tw-cursor-pointer"
            width="300"
            :class="isHovering ? 'bg-primaryContainer' : ''"
            @click="navigateTo(`/${proj.id}`)"
          >
            <v-card-title>
              {{ proj.name }}
            </v-card-title>
          </v-card>
        </template>
      </v-hover>
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
