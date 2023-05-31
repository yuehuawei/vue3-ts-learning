<template>
  <div class="">
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="menu"
    ></page-content>
  </div>
</template>

<script lang="ts">
import PageContent from "@/components/page-content";
import { defineComponent } from "vue";
import { contentTableConfig } from "./config/content.config";
export default defineComponent({
  components: {
    PageContent,
  },
  setup() {
    return {
      contentTableConfig,
    };
  },
});
</script>

<style scoped></style>
