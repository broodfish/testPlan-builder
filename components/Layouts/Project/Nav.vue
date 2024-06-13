<template>
  <v-navigation-drawer v-model="modelValue" color="secondary">
    <v-list nav>
      <nuxt-link :to="`/${route.params.proID}`">
        <v-list-item
          prepend-icon="dashboard"
          title="Overview"
          value="overview"
          class="mb-2"
        ></v-list-item>
      </nuxt-link>
      <nuxt-link :to="`/${route.params.proID}/testPlans`">
        <v-list-item
          prepend-icon="ballot"
          title="Test Plans"
          value="testPlans"
          class="mb-2"
        ></v-list-item>
      </nuxt-link>
      <nuxt-link :to="`/${route.params.proID}/testRuns`">
        <v-list-item
          prepend-icon="area_chart"
          title="Test Runs"
          value="testRuns"
        ></v-list-item>
      </nuxt-link>
    </v-list>
    <!-- <template #append>
      <div class="pa-2">
        <v-btn block @click="toggleTheme"> <v-icon>dark_mode</v-icon> </v-btn>
      </div>
    </template> -->
  </v-navigation-drawer>
</template>
<script setup lang="ts">
// import { useTheme } from "vuetify";
const route = useRoute();
// const theme = useTheme();

// const toggleTheme = () => {
//   theme.global.name.value = theme.name.value === "light" ? "dark" : "light";
// };

const props = defineProps<{
  modelValue: boolean;
}>();
const emit = defineEmits(["update:modelValue"]);
const modelValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>
