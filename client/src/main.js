import Vue from "vue";
import App from "./App.vue";
import VueSocketIO from "vue-socket.io";
import io from "socket.io-client";
import router from "./router";
import store from "./store";

Vue.use(
  new VueSocketIO({
    debug: true,
    connection: io("http://localhost:1111"),
    vuex: {}
  })
);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
