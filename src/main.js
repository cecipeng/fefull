import Vue from 'vue'
import VueResource from 'vue-resource'
import store from './store'
import router from './router.js'
import App from './App'




/* eslint-disable no-new */
new Vue({
  	router,
  	store,
    render: h => h(App)
}).$mount('#app')

