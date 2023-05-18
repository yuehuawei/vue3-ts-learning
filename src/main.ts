import { createApp } from "vue";
import App from "./App.vue";
import { registerApp } from "./global";

import ackRequest from "./service";

import router from "./router";
import store from "./store";

const app = createApp(App);
app.use(registerApp);

app.use(router);
app.use(store);

app.mount("#app");

ackRequest.request({
  url: "/home/multidata",
  method: "GET",
});
