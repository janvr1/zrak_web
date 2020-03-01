import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '../node_modules/bulma'
import axios from 'axios'

import Datetime from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'

Vue.use(Datetime)

Vue.config.productionTip = false

const zrak_api = axios.create({
  baseURL: 'https://api.zrak.janvr.wtf'
});

export default zrak_api

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')