<template>
    <div class="mod-login">
    	<div class="formbox">
            <input type="text" v-model="loginModel.username" class="form-input form-input-wide inp-username" placeholder="请输入">
            <input type="text" v-model="loginModel.password" class="form-input form-input-wide inp-pwd" placeholder="请输入">
            <p class="errortip">{{errortip}}</p>
            <div class="btnwrap">
                <a class="ui-btn ui-btn-wide ui-btn-main s-disabled" v-if="isLogining">正在登录...</a>
                <a class="ui-btn ui-btn-wide ui-btn-main" v-else @click="login">登录</a>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);

export default {

    data () {
        return {
            isLogining: false, //正在登录中
            errortip: "", //错误提示
            loginUrl: this.$store.state.baseUrl + "login/verify", //接口地址
            loginModel: {
                username: "",
                password: ""
            }
        }
    },
    methods: {
        login: function(){
            this.isLogining = true;
            if(this.loginModel.username.length == 0) {
                this.errortip = "用户名不能为空！";
                this.isLogining = false;
                return;
            }
            if(this.loginModel.password.length == 0) {
                this.errortip = "密码不能为空！";
                this.isLogining = false;
                return;
            }
            this.AJAX_POST(this.loginUrl,this.loginModel,function(RE,r){
                if(RE.meta.code == 1000) {
                    localStorage.setItem('userid', RE.datas.userid);
                    localStorage.setItem('username', RE.datas.username);
                    localStorage.setItem('userhead', RE.datas.userhead);
                    localStorage.setItem('accessToken', RE.datas.token);
                    r.push({ path: '/home' });
                }
                else {
                    this.errortip = RE.meta.message;
                }
            })     
        }
    }
}
</script>

<style lang="scss">
    
</style>
