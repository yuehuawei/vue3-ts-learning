<template>
  <div class="page-content">
    <ack-table :listData="dataList" v-bind="contentTableConfig">
      <template #headerHandler>
        <el-button type="primary">新建用户</el-button>
      </template>
      <!-- 列中的插槽 -->
      <template #status="scope">
        {{ scope.row.enable ? "启用" : "禁用" }}
      </template>
      <template #createAt="scope">
        {{ $filters.formatTime(scope.row.createAt) }}
      </template>
      <template #updateAt="scope">
        {{ $filters.formatTime(scope.row.updateAt) }}
      </template>
      <template #handler>
        <div class="handle-btns">
          <el-button type="text" size="mini">编辑</el-button>
          <el-button type="text" size="mini">删除</el-button>
        </div>
      </template>
    </ack-table>
  </div>
</template>

<script lang="ts">
import AckTable from "@/base-ui/table";
import { defineComponent, computed } from "vue";
import { useStore } from "@/store";
export default defineComponent({
  props: {
    contentTableConfig: {
      type: Object,
      required: true,
    },
    pageName: {
      type: String,
    },
  },
  components: {
    AckTable,
  },
  setup(props) {
    const store = useStore();
    store.dispatch("system/getPageListAction", {
      pageName: props.pageName,
      queryInfo: {
        offset: 0,
        size: 20,
      },
    });
    const dataList = computed(() =>
      store.getters[`system/pageListData`](props.pageName),
    );
    // const userCount = computed(() => store.state.system.userCount);

    return {
      dataList,
    };
  },
});
</script>

<style scoped>
.handle-btns {
  display: flex;
  flex-shrink: 0;
}
</style>
