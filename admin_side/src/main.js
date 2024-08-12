import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import 'vuetify/dist/vuetify.min.css';
import axios from 'axios';

// axios.defaults.baseURL= 'http://192.168.31.186:8000/api/';

// development
// axios.defaults.baseURL= 'http://127.0.0.1:8000/api/';
// connection
// axios.defaults.baseURL= 'http://192.168.1.21:8000/api/';
// axios.defaults.baseURL= 'http://192.168.31.186:8000/api/';
axios.defaults.baseURL= 'http://26.81.173.255:8000/api/';
loadFonts()

createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .mount('#app')

      