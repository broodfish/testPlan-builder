<template>
  <div class="home">
    <p class="tw-text-6xl tw-font-bold">Welcome to TestOps</p>
    <p class="tw-text-2xl">
      Efficiently manage your test cases and running results
    </p>
    <div>
      <v-btn
        class="start-button"
        color="white"
        size="large"
        elevation="2"
        append-icon="arrow_right"
        @click="navigateTo('/projects')"
      >
        Start
      </v-btn>
    </div>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: "home",
  title: "Home",
});
</script>
<style scoped>
.home {
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 10rem 0;
  gap: 2rem;
  background: linear-gradient(
    135deg,
    rgba(var(--v-theme-primary)) 0%,
    rgba(var(--v-theme-tertiary)) 100%
  );
  color: white;
  text-align: center;
}
</style>
