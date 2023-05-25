<template>
  <div class="nav-header">
    <el-icon
      ><Fold class="icon" @click="handleFoldClick" v-if="!isFold" />
      <Expand class="icon" v-else @click="handleFoldClick"
    /></el-icon>
    <div class="content">
      <div>面包屑</div>
      <user-info />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import UserInfo from "./user-info.vue";
export default defineComponent({
  emits: ["foldchange"],
  components: {
    UserInfo,
  },
  setup(props, { emit }) {
    const isFold = ref(false);
    const handleFoldClick = () => {
      isFold.value = !isFold.value;
      emit("foldchange", isFold.value);
    };
    return {
      handleFoldClick,
      isFold,
    };
  },
});
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;
  .icon {
    width: 30px;
    cursor: pointer;
  }
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
