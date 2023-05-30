<template>
  <div class="page-search">
    <ack-form v-bind="searchFormConfig" v-model="formData">
      <template #header> </template>
      <template #footer>
        <div class="handle-btns">
          <el-button icon="Edit" @click="handleResetClick">重置</el-button>
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
  setup(props) {
    // 双向绑定的属性应该由配置文件的field决定
    const formItems = props.searchFormConfig?.formItems ?? [];
    const formOriginData: any = {};
    for (const item of formItems) {
      formOriginData[item.field] = "";
    }
    const formData = ref(formOriginData);

    // 当用户点击重置
    const handleResetClick = () => {
      formData.value = formOriginData;
    };
    return {
      formData,
      handleResetClick,
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
