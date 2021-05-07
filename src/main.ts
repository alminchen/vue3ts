import { createApp } from 'vue';
import App from './App';
import router from './router';
import store from './store';
import { setDPR, remChange } from './assets/js';
import "./assets/reset.scss"
import vue3Lazyload from "vue3-lazyload"
setDPR();
remChange();
createApp(App).use(vue3Lazyload, {
  log: false,
}).use(router).use(store).mount('#app');