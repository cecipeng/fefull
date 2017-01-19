import App from './App'
import Vue from 'vue'
import VueResource from 'vue-resource' //ajax
import VueRouter from 'vue-router' //router
import Vuex from 'vuex'; //store

import store from './store.js'
import router from './router.js'

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(Vuex);

//公用方法
import UTIL from './util.js'

/* eslint-disable no-new */
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

Vue.prototype.UTIL = UTIL; 
