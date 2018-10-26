import Vue from "vue";
import VueI18n from "vue-i18n";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import messages, { numberFormats } from "./messages";

Vue.config.productionTip = false;

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: "en",
  messages,
  numberFormats
});

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
