import App from './App'
import Vue from 'vue'

import store from './store.js'
import router from './router.js'



/* eslint-disable no-new */
var VM = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

