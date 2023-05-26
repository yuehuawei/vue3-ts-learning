<template>
  <div class="user">
    <page-search :searchFormConfig="searchFormConfig" />

    <ack-table :listData="userList" :propList="propList">
      <template #status="scope">
        {{ scope.row.enable ? "启用" : "禁用" }}
      </template>
      <template #createAt="scope">
        {{ scope.row.createAt }}
      </template>
    </ack-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "@/store";
import PageSearch from "@/components/page-search";
import AckTable from "@/base-ui/table";
import { searchFormConfig } from "./config/search.config";
export default defineComponent({
  components: {
    PageSearch,
    AckTable,
  },
  setup() {
    const store = useStore();
    store.dispatch("system/getPageListAction", {
      pageUrl: "/users/list",
      queryInfo: {
        offset: 0,
        size: 20,
      },
    });
    const userList = computed(() => store.state.system.userList);
    const userCount = computed(() => store.state.system.userCount);
    const propList = [
      { prop: "name", label: "用户名", minWidth: "100" },
      { prop: "realname", label: "真实姓名", minWidth: "100" },
      { prop: "cellphone", label: "手机号码", minWidth: "120" },
      { prop: "enable", label: "状态", minWidth: "100", slotName: "status" },
      {
        prop: "createAt",
        label: "创建时间",
        minWidth: "250",
        slotName: "createAt",
      },
      {
        prop: "updateAt",
        label: "更新时间",
        minWidth: "250",
        slotName: "updateAt",
      },
    ];
    return {
      searchFormConfig,
      userList,
      userCount,
      propList,
    };
  },
});
</script>

<style scoped></style>
