<template>
  <div class="nav-header">
    <el-icon
      ><Fold class="icon" @click="handleFoldClick" v-if="!isFold" />
      <Expand class="icon" v-else @click="handleFoldClick"
    /></el-icon>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  emits: ["foldchange"],
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
  .icon {
    width: 30px;
    cursor: pointer;
  }
}
</style>
