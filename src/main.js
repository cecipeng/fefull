// import App from './App'
var App = require('./App.vue')
import Vue from 'vue'
import store from './store.js'
import router from './router.js'
import $ from 'jquery'


/* eslint-disable no-new */
var VM = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

