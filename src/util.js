import Vue from 'vue';
import Vuex from 'vuex'; //store
import VueResource from 'vue-resource'; //ajax
import VueRouter from 'vue-router' //router

import store from './store.js'
import router from './router.js'

Vue.use(Vuex);
Vue.use(VueResource);
Vue.use(VueRouter);

export default {
    
    // 公用get请求
    AJAX_GET: function(url,data,callback){
        Vue.http.get(
            store.state.baseUrl + url,
            {emulateJSON : true},
            {headers: {
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
                    console.log("FEFull："+response.data.meta.message);
                    break;
                case "1003": //网络异常
                    console.log("FEFull："+response.data.meta.message);
                    break;
                default: //请求成果,或其他业务返回码
                    callback(response.data, router, store);
            }
        })
        .catch(function(response) {
            console.log("FEFull："+response.data.meta.message);
        })
    },

    // 公用post请求
    AJAX_POST: function(url,data,callback){
        Vue.http.post(
            store.state.baseUrl + url,
            {emulateJSON : true},
            {headers: {
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
}
