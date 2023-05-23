<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" class="tabs" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span class="custom-tabs-label"
            ><el-icon>
              <UserFilled style="width: 20px; margin-right: 5px" /> </el-icon
            ><span>账号登录</span></span
          >
        </template>
        <login-acoount ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span class="custom-tabs-label"
            ><el-icon>
              <Iphone style="width: 20px; margin-right: 5px" /> </el-icon
            >手机登录</span
          >
        </template>
        <login-phone></login-phone>
      </el-tab-pane>
    </el-tabs>
    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary"> 忘记密码</el-link>
    </div>

    <el-button type="primary" class="login-btn" @click="handleLoginClick"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import LoginAcoount from "./login-acoount.vue";
import LoginPhone from "./login-phone.vue";
export default defineComponent({
  components: {
    LoginAcoount,
    LoginPhone,
  },
  setup() {
    let isKeepPassword = ref(false);
    const accountRef = ref<InstanceType<typeof LoginAcoount>>();
    const currentTab = ref<string>("account");

    const handleLoginClick = () => {
      if (currentTab.value === "account") {
        accountRef.value?.loginAction(isKeepPassword.value);
      } else {
        console.log("手机登录");
      }
    };
    return {
      isKeepPassword,
      handleLoginClick,
      accountRef,
      currentTab,
    };
  },
});
</script>

<style scoped lang="less">
.login-panel {
  width: 320px;
  margin-bottom: 150px;
  .title {
    text-align: center;
  }
  .custom-tabs-label {
    display: flex;
    align-items: center;
  }
  .account-control {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }
  .login-btn {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
