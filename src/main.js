import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import ListUser from './components/ListUser.vue'
import AddUser from './components/AddUser.vue'
import Vuelidate from 'vuelidate'
import Vuetable from 'vuetable-2'


Vue.config.productionTip = false

import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

const routes = [
  { path: '/', component: AddUser },
  { path: '/list', component: ListUser },
]

const router = new VueRouter({
  mode: 'history',
  routes // short for `routes: routes`
})

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VueRouter)
Vue.use(Vuelidate)
Vue.use(Vuetable);

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
