import { createApp } from "vue";
import App from "./App.vue";
import { registerApp } from "./global";

import "./service/axios_demo.ts";

import router from "./router";
import store from "./store";

const app = createApp(App);
app.use(registerApp);

app.use(router);
app.use(store);

app.mount("#app");
console.log(process.env);
