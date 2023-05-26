<template>
  <div class="page-search">
    <ack-form v-bind="searchFormConfig" v-model="formData">
      <template #header> </template>
      <template #footer>
        <div class="handle-btns">
          <el-button icon="Edit">重置</el-button>
          <el-button type="primary" icon="Search">搜索</el-button>
        </div>
      </template>
    </ack-form>
  </div>
</template>

<script lang="ts">
import AckForm from "@/base-ui/form";
import { defineComponent, ref } from "vue";

export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object,
      required: true,
    },
  },
  components: {
    AckForm,
  },
  setup() {
    const formData = ref({
      id: "",
      name: "",
      password: "",
      sport: "",
      createTime: "",
    });
    return {
      formData,
    };
  },
});
</script>

<style scoped>
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
