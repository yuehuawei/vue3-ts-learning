import { createApp } from "vue";
import App from "./App.vue";
import { registerApp } from "./global";
import "normalize.css";
import "./assets/css/index.less";

import router from "./router";
import store from "./store";
import { setupStore } from "./store";

const app = createApp(App);
app.use(registerApp);
setupStore();
app.use(router);
app.use(store);

app.mount("#app");
