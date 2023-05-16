<template>
  <h2>{{ $store.state.name }}</h2>
  <router-link to="/login">登录</router-link>
  <router-link to="/main">首页</router-link>
  <router-view></router-view>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  components: {},
})
export default class App extends Vue {}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
