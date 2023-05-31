import { Module } from "vuex";
import { IAccount } from "@/service/login/type";
import { ILoginState } from "./types";
import { IRootState } from "../types";
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenuByRoleId,
} from "@/service/login/login";
import localCache from "@/utils/cache";
import { mapMenusToRoutes, mapMenusToPermissions } from "@/utils/map-menus";
import router from "@/router";

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: "",
      userInfo: {},
      userMenus: [],
      permissions: [],
    };
  },
  mutations: {
    changeToken(state, token: string) {
      state.token = token;
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo;
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus;
      // userMenus => routes
      const routes = mapMenusToRoutes(userMenus);
      // 将routes => router.main.children
      routes.forEach((route) => {
        router.addRoute("main", route);
      });
      // 获取用户按钮权限
      const permissions = mapMenusToPermissions(userMenus);

      state.permissions = permissions;
    },
  },
  getters: {},
  actions: {
    async accountLoginAction({ commit }, payload: IAccount) {
      console.log(payload);

      const loginResult = await accountLoginRequest(payload);
      const { id, token } = loginResult.data;
      // token
      commit("changeToken", token);
      localCache.setCache("token", token);
      const userInfoResult = await requestUserInfoById(id);
      const userInfo = userInfoResult.data;
      // userinfo
      commit("changeUserInfo", userInfo);
      localCache.setCache("userInfo", userInfo);
      // usermenu
      const userMenusResult = await requestUserMenuByRoleId(userInfo.role.id);
      const userMenus = userMenusResult.data;
      commit("changeUserMenus", userMenus);
      localCache.setCache("userMenus", userMenus);
      // jump to index
      router.push("/main");
    },
    loadLocalLogin({ commit }) {
      const token = localCache.getCache("token");
      if (token) {
        commit("changeToken", token);
      }
      const userInfo = localCache.getCache("userInfo");
      if (userInfo) {
        commit("changeUserInfo", userInfo);
      }
      const userMenus = localCache.getCache("userMenus");
      if (userMenus) {
        commit("changeUserMenus", userMenus);
      }
    },
  },
};
export default loginModule;
