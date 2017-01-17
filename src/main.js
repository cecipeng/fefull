import Vue from 'vue'
import VueResource from 'vue-resource'
import store from './store'
import router from './router.js'
import App from './App'

import VueRouter from 'vue-router'
Vue.use(VueRouter);


/* eslint-disable no-new */
new Vue({
  	router,
  	store,
    render: h => h(App)
}).$mount('#app')


/* 全局函数 */
Vue.prototype.AJAX_POST = function(url,data,callback){

	Vue.http.post(url,data,{
         headers: {
             "Content-Type":"application/x-www-form-urlencoded", //post默认以request payload提交data，改为form data形式
             "Authorization":localStorage.accessToken || "" //身份验证，与后端约定每次请求附上token值验明是否登录
         }
    })
    .then((response) => {
        callback(response.data, router);
    })
    .catch(function(response) {
        console.log(response);
    })
}