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
           // console.log("this.loginUrl:"+this.loginUrl);
            this.$http.post(this.loginUrl,this.loginModel,{
                headers: {
                    "Content-Type":"application/x-www-form-urlencoded"
                }
            })
            .then((response) => {
                if(response.data.meta.success) {
                    localStorage.setItem('userid', response.data.data.userid);
                    localStorage.setItem('username', response.data.data.username);
                    localStorage.setItem('userhead', response.data.data.userhead);
                    localStorage.setItem('token', response.data.data.token);
                    // localStorage.setItem('accessToken', response.access_token)
                    this.$router.push({ path: '/home' });
                }
                else {
                    this.errortip = response.meta.message;
                }
            })
            .catch(function(response) {
                console.log(response)
            })
          
                   
                  
        }
    }
}
</script>

<style lang="scss">
    
</style>
