<template>
  <div class="home">
    <section class="section">
      <div
        class="w-100 bg-transparent tw-flex tw-h-16 tw-items-center tw-justify-center"
      >
        <nuxt-link to="/"
          ><svg-logo class="text-white tw-h-[30px]"></svg-logo
        ></nuxt-link>
      </div>
      <div class="tw-flex tw-flex-1 tw-flex-col tw-justify-center tw-gap-8">
        <p class="tw-text-6xl tw-font-black">
          Welcome to <span class="gradient-text">TestOps</span>
        </p>
        <p class="tw-text-lg">
          Efficiently manage your test cases and running results
        </p>
        <div class="tw-flex tw-flex-row tw-justify-center tw-gap-4">
          <v-btn
            class="start-button"
            color="white"
            size="large"
            rounded
            @click="navigateTo('/projects')"
          >
            Get Started
          </v-btn>
          <v-btn
            class="start-button"
            color="white"
            variant="outlined"
            size="large"
            rounded
          >
            Learn More
          </v-btn>
        </div>
      </div>
    </section>
    <section class="section">
      <div
        class="text-left tw-flex tw-flex-row tw-items-center tw-justify-center tw-gap-4"
      >
        <v-card width="240" rounded="lg">
          <v-card-title>Build</v-card-title>
          <v-card-text class="text-secondary">
            <p>Create a project and define test cases.</p>
          </v-card-text>
          <template #prepend>
            <div
              class="tw-flex tw-h-14 tw-w-14 tw-items-center tw-justify-center tw-rounded-lg tw-bg-black"
            >
              <v-icon color="white" size="x-large">build</v-icon>
            </div>
          </template>
        </v-card>
        <v-icon>arrow_forward_ios</v-icon>
        <v-card width="240" rounded="lg">
          <v-card-title>Write</v-card-title>
          <v-card-text class="text-secondary">
            <p>Write test plans and test cases.</p>
          </v-card-text>
          <template #prepend>
            <div
              class="tw-flex tw-h-14 tw-w-14 tw-items-center tw-justify-center tw-rounded-lg tw-bg-black"
            >
              <v-icon color="white" size="x-large">edit</v-icon>
            </div>
          </template>
        </v-card>
        <v-icon>arrow_forward_ios</v-icon>
        <v-card width="240" rounded="lg">
          <v-card-title>Run</v-card-title>
          <v-card-text class="text-secondary">
            <p>Run test cases and view results.</p>
          </v-card-text>
          <template #prepend>
            <div
              class="tw-flex tw-h-14 tw-w-14 tw-items-center tw-justify-center tw-rounded-lg tw-bg-black"
            >
              <v-icon color="white" size="x-large">play_arrow</v-icon>
            </div>
          </template>
        </v-card>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: "home",
  title: "Home",
});
</script>
<style scoped lang="scss">
.home {
  background: linear-gradient(
    135deg,
    rgba(var(--v-theme-primary)) 0%,
    rgba(var(--v-theme-tertiary)) 100%
  );
  color: white;
  text-align: center;
  height: 100vh;
  width: 100vw;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    background: transparent;
    width: 0;
  }

  &::-webkit-scrollbar-thumb {
    background: transparent;
  }
}

.section {
  height: 100vh;
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.gradient-text {
  background: linear-gradient(90deg, #00fffb, #00ffb7);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
}
</style>
