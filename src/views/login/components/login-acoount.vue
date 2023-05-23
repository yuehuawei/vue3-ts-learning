<template>
  <div class="login-account">
    <el-form
      ref="formRef"
      :rules="rules"
      :model="account"
      label-width="60px"
      class="demo-ruleForm"
    >
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="account.password"
          type="password"
          autocomplete="off"
          show-password
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { rules } from "../config/account-config";
import { ElForm } from "element-plus";
import localCache from "@/utils/cache";
import { useStore } from "vuex";
export default defineComponent({
  setup() {
    const store = useStore();

    const account = reactive({
      name: localCache.getCache("name") ?? "",
      password: localCache.getCache("password") ?? "",
    });
    // wtf is that bitch
    const formRef = ref<InstanceType<typeof ElForm>>();
    const loginAction = (isKeepPassword: boolean) => {
      formRef.value?.validate((valid) => {
        if (valid) {
          if (isKeepPassword) {
            localCache.setCache("name", account.name);
            localCache.setCache("password", account.password);
          } else {
            localCache.deleteCache("name");
            localCache.deleteCache("password");
          }
          store.dispatch("login/accountLoginAction", { ...account });
        }
      });
    };
    return {
      account,
      rules,
      loginAction,
      formRef,
    };
  },
});
</script>

<style scoped>
.login-account {
}
</style>
