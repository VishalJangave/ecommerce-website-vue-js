import Vue from 'vue'
import Vuex from 'vuex'
import registrationlist from './Modules/Registration'
import mobileList from './Modules/Mobile'
import laptopList from './Modules/Laptop'
import productList from './Modules/productdata'
import adminregistrationlist from './Modules/Admin'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user:registrationlist,
    mobile:mobileList,
    laptop:laptopList,
    product:productList,
    admin:adminregistrationlist
  }
})
