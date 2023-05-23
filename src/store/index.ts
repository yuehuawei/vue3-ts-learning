import { createStore } from "vuex";

import { IRootState } from "./types";
import login from "./login/login";

const store = createStore<IRootState>({
  state: () => {
    return {
      name: "wyh",
      age: 1,
      height: 50,
    };
  },
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    login,
  },
});

export function setupStore() {
  store.dispatch("login/loadLocalLogin");
}

export default store;
