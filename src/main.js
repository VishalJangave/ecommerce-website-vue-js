import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import VeeValidate from 'vee-validate'
import store from './store'
import JSZip from 'jszip'
Vue.use(JSZip)
Vue.config.productionTip = false
Vue.use(VeeValidate)
new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
