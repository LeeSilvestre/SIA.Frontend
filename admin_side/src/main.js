import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import 'vuetify/dist/vuetify.min.css';
import axios from 'axios';

// axios.defaults.baseURL= 'http://localhost:8000/api/';

// development
// axios.defaults.baseURL= 'http://192.168.16.165:8000/api/';
axios.defaults.baseURL= 'http://26.81.173.255:8000/api/';
// connection
loadFonts()

createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .mount('#app')

      