<template>
  <div class="">
    <page-search :searchFormConfig="searchFormConfig"></page-search>
    <page-content
      pageName="role"
      :contentTableConfig="contentTableConfig"
    ></page-content>
  </div>
</template>

<script lang="ts">
import PageContent from "@/components/page-content";
import PageSearch from "@/components/page-search";
import { defineComponent } from "vue";
import { contentTableConfig } from "./config/content.config";
import { searchFormConfig } from "./config/search.config";
export default defineComponent({
  name: "role",
  components: {
    PageContent,
    PageSearch,
  },
  setup() {
    return {
      contentTableConfig,
      searchFormConfig,
    };
  },
});
</script>

<style scoped></style>
