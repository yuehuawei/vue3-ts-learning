<template>
  <div class="ack-table">
    <el-table :data="listData" border style="width: 100%">
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column v-bind="propItem">
          <template #default="scope">
            <slot :name="propItem.slotName" :row="scope.row">{{
              scope.row[propItem.prop]
            }}</slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
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
    propList: {
      type: Array,
      required: true,
    },
  },
  setup(props, { emit }) {
    return {};
  },
});
</script>

<style scoped lang="less">
.ack-table {
  padding-top: 22px;
}
</style>
