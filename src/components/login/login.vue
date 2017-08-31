<template>
    <div class="layout-mod mod-login">
        <div class="layout-wrapper">
            <div class="formbox">
                <div class="form-title">登录 Fefull</div>
                <div class="form-row form-username">
                    <input type="text" v-model="loginModel.userName" class="form-input form-input-wide" placeholder="用户名" @keyup.enter="login">
                </div>
                <div class="form-row form-pwd">
                    <input type="password" v-model="loginModel.password" class="form-input form-input-wide" placeholder="密码" @keyup.enter="login">
                </div>
                <p class="errortip">{{errortip}}</p>
                <div class="btnwrap">
                    <a class="ui-btn ui-btn-wide ui-btn-main s-disabled" v-if="isLogining">正在登录...</a>
                    <a class="ui-btn ui-btn-wide ui-btn-main" v-else @click="login">登录</a>
                </div>
            </div>
        </div>
    	
    </div>
</template>

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);

//公用方法
import UTIL from './../../util.js'

export default {

    data () {
        return {
            isLogining: false, //正在登录中
            errortip: "", //错误提示
            loginModel: {
                userName: "",
                password: ""
            }
        }
    },
    methods: {
        login: function(){
            this.isLogining = true;
            if(this.loginModel.userName.length == 0) {
                this.errortip = "用户名不能为空！";
                this.isLogining = false;
                return;
            }
            if(this.loginModel.password.length == 0) {
                this.errortip = "密码不能为空！";
                this.isLogining = false;
                return;
            }

            var _this = this;
            UTIL.AJAX_POST(
                UTIL.AJAX_URL().login,
                this.loginModel,
                function(RE,r,s){
                    if(RE.meta.code == "0000") { //请求成功
                        _this.errortip = "";
                        localStorage.setItem('userId', RE.datas.userId);
                        localStorage.setItem('userName', RE.datas.userName);
                        localStorage.setItem('userHead', RE.datas.userHead);
                        localStorage.setItem('accessToken', RE.datas.accessToken);
                        _this.isLogining = false;
                        r.go(-1);
                        s.commit('getLoginInfor');
                    }
                    else if(RE.meta.code == "2001") {  //账号或密码错误
                        _this.errortip = RE.meta.message;
                        _this.isLogining = false;
                    }
                    else if(RE.meta.code == "1003") { //服务端错误
                        s.commit('setMessage',[true,"网络异常，请稍后重试","error",false]);
                        console.log("FEFull：获取文章列表失败，"+RE.meta.message);
                    }
                }
            )     
        }
    }
}
</script>

<style lang="scss">
    
</style>
