import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { setDPR, remChange } from './assets/js';
import "./assets/reset.scss"
setDPR();
remChange();
createApp(App).use(router).use(store).mount('#app');
