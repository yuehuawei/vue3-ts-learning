<template>
  <div class="ack-table">
    <div class="header">
      <slot name="header">
        <div class="title">{{ title }}</div>
        <div class="handler">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>
    <el-table
      :data="listData"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
      v-bind="childrenProps"
    >
      <!-- 是否显示第一列的序号 -->
      <el-table-column
        v-if="showSelectColumn"
        type="selection"
        align="center"
        width="60"
      >
      </el-table-column>
      <!-- 是否显示第一列的序号 -->
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        label="序号"
        align="center"
        width="60"
      >
      </el-table-column>
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column v-bind="propItem" show-overflow-tooltip>
          <template #default="scope">
            <slot :name="propItem.slotName" :row="scope.row">{{
              scope.row[propItem.prop]
            }}</slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer">
      <slot name="footer">
        <el-pagination
          :current-page="page.currentPage"
          :page-size="page.size"
          :page-sizes="[10, 20, 30]"
          layout="total, sizes,prev, pager, next,jumper"
          :total="listCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    listData: {
      type: Array,
      required: true,
    },
    listCount: {
      type: Number,
      default: 0,
    },
    propList: {
      type: Array,
      required: true,
    },
    showIndexColumn: {
      type: Boolean,
      default: false,
    },
    showSelectColumn: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    page: {
      type: Object,
      default: () => ({
        currentPage: 1,
        pageSize: 10,
      }),
    },
    childrenProps: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ["selection-change", "update:page"],
  setup(props, { emit }) {
    const handleSelectionChange = (value: any) => {
      emit("selection-change", value);
    };
    const handleCurrentChange = (currentPage: number) => {
      emit("update:page", { ...props.page, currentPage: currentPage });
    };
    const handleSizeChange = (pageSize: number) => {
      emit("update:page", { ...props.page, pageSize });
    };
    return {
      handleSelectionChange,
      handleSizeChange,
      handleCurrentChange,
    };
  },
});
</script>

<style scoped lang="less">
.ack-table {
  padding-top: 22px;
  .header {
    padding: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .footer {
    padding: 30px;
  }
}
</style>
