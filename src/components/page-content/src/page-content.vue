<template>
  <div class="page-content">
    <ack-table
      :listData="dataList"
      :listCount="dataCount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
    >
      <template #headerHandler>
        <el-button type="primary" v-if="isCreate">新建用户</el-button>
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
          <el-button type="text" size="mini" v-if="isUpdate">编辑</el-button>
          <el-button type="text" size="mini" v-if="isDelete">删除</el-button>
        </div>
      </template>
      <!-- page-content中 动态插入剩余插槽 -->
      <template
        v-for="item in otherPropsSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </ack-table>
  </div>
</template>

<script lang="ts">
import AckTable from "@/base-ui/table";
import { defineComponent, computed, ref, watch } from "vue";
import { useStore } from "@/store";
import { usePermission } from "@/hooks/usePermission";
export default defineComponent({
  props: {
    contentTableConfig: {
      type: Object,
      required: true,
    },
    pageName: {
      type: String,
      required: true,
    },
  },
  components: {
    AckTable,
  },
  setup(props) {
    const store = useStore();

    //获取操作权限
    const isCreate = usePermission(props.pageName, "create");
    const isUpdate = usePermission(props.pageName, "update");
    const isDelete = usePermission(props.pageName, "delete");
    const isQuery = usePermission(props.pageName, "query");

    const pageInfo = ref({
      currentPage: 1,
      pageSize: 10,
    });
    watch(pageInfo, () => {
      getPageData();
    });
    // 发送网络请求
    const getPageData = (queryInfo: any = {}) => {
      if (!isQuery) {
        return;
      }
      store.dispatch("system/getPageListAction", {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo,
        },
      });
    };
    getPageData();

    // 从vuex获取数据
    const dataList = computed(() =>
      store.getters[`system/pageListData`](props.pageName),
    );
    const dataCount = computed(() =>
      store.getters[`system/pageListCount`](props.pageName),
    );
    // 获取其他的动态插槽名称
    const otherPropsSlots = props.contentTableConfig?.propList.filter(
      (item: any) => {
        if (item.slotName === "status") return false;
        if (item.slotName === "createAt") return false;
        if (item.slotName === "updateAt") return false;
        if (item.slotName === "handler") return false;
        return true;
      },
    );

    return {
      dataList,
      dataCount,
      getPageData,
      pageInfo,
      otherPropsSlots,
      isCreate,
      isUpdate,
      isDelete,
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
