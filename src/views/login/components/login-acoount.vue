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
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { rules } from "../config/account-config";
import { ElForm } from "element-plus";
export default defineComponent({
  setup() {
    const account = reactive({
      name: "",
      password: "",
    });
    // wtf is that bitch
    const formRef = ref<InstanceType<typeof ElForm>>();
    const loginAction = () => {
      formRef.value?.validate((valid) => {
        if (valid) {
          console.log("go on");
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
