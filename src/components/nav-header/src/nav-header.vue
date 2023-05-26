<template>
  <div class="nav-header">
    <el-icon
      ><Fold class="icon" @click="handleFoldClick" v-if="!isFold" />
      <Expand class="icon" v-else @click="handleFoldClick"
    /></el-icon>
    <div class="content">
      <ack-breadcrumb :breadcrumbs="breadcrumbs" />
      <user-info />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import UserInfo from "./user-info.vue";
import AckBreadcrumb from "@/base-ui/breadcrumb";
import { pathMapBreadcrumbs } from "@/utils/map-menus";
import { useStore } from "@/store";
import { useRoute } from "vue-router";
export default defineComponent({
  emits: ["foldchange"],
  components: {
    UserInfo,
    AckBreadcrumb,
  },
  setup(props, { emit }) {
    const isFold = ref(false);
    const handleFoldClick = () => {
      isFold.value = !isFold.value;
      emit("foldchange", isFold.value);
    };

    //面包屑数据
    const store = useStore();

    const breadcrumbs = computed(() => {
      const userMenus = store.state.login.userMenus;
      const route = useRoute();
      const currentPath = route.path;
      return pathMapBreadcrumbs(userMenus, currentPath);
    });

    return {
      handleFoldClick,
      isFold,
      breadcrumbs,
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
