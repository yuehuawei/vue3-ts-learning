<template>
  <div class="user">
    <ack-form v-bind="searchFormConfig" />

    <div class="content"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AckForm from "@/base-ui/form";
import { searchFormConfig } from "./config/search.config";
export default defineComponent({
  components: {
    AckForm,
  },
  setup() {
    return {
      searchFormConfig,
    };
  },
});
</script>

<style scoped></style>
