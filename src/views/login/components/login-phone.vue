<template>
  <div class="">
    <el-form
      ref="ruleFormRef"
      :rules="rules"
      :model="phone"
      label-width="60px"
      class="demo-ruleForm"
    >
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="phone.number" autocomplete="off" />
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <div class="get-code">
          <el-input v-model="phone.code" type="password" autocomplete="off" />
          <el-button type="primary" class="btn">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
export default defineComponent({
  setup() {
    const phone = reactive({
      number: "",
      code: "",
    });
    return {
      phone,
    };
  },
});
</script>

<style scoped lang="less">
.get-code {
  display: flex;
  .btn {
    margin-left: 8px;
  }
}
</style>
