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

// 公用get请求
Vue.prototype.AJAX_GET = function(url,data,callback){
	Vue.http.get(url,{emulateJSON : true},{
        headers: {
             "Authorization":localStorage.accessToken || "" //身份验证，与后端约定每次请求附上token值验明是否登录
        },
        params: data
    })
    .then((response) => {
        switch(response.data.meta.code) {
            case "1001": //未登录
                router.push({ path: '/login' }); //跳转到登录页
                break;
            case "1002": //请求参数错误
                break;
            case "1003": //网络异常
                break;
            default: //请求成果,或其他业务返回码
                callback(response.data, router, store);
        }
    })
    .catch(function(response) {
        console.log(response);
    })
}

// 公用post请求
Vue.prototype.AJAX_POST = function(url,data,callback){
    Vue.http.post(url,{emulateJSON : true},{
        headers: {
             // "Content-Type":"application/x-www-form-urlencoded", //post默认以request payload提交data，改为form data形式
             "Authorization":localStorage.accessToken || "" //身份验证，与后端约定每次请求附上token值验明是否登录
        },
        params: data
    })
    .then((response) => {
        switch(response.data.meta.code) {
            case "1001": //未登录
                router.push({ path: '/login' }); //跳转到登录页
                break;
            case "1002": //请求参数错误
                break;
            case "1003": //网络异常
                break;
            default: //请求成果,或其他业务返回码
                callback(response.data, router, store);
        }
    })
    .catch(function(response) {
        console.log(response);
    })
}