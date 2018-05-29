<template>
    <div class="com-header" v-if="showHeader">
        <div class="layout-wrapper">
            <div class="flbox">
                 <a href="###" class="logo"></a> 
                <!-- mainmenu -->
                <div class="com-mainmenu">
                    <ul class="mainmenu">
                        <li>
                            <router-link class="item" to="/home">Home</router-link>
                        </li>
                        <li id="ui-dropdown" @mouseleave="showMenu1 = false">
                            <a class="item selector" :class="{on:showMenu1 ==true}" @mouseenter="showMenu1 = true">Work<i class="dropdown-arrow"></i></a>
                            <div class="dropdown-list" v-show="showMenu1">
                                <ul class="droplist">
                                    <li><router-link @click="showMenu1 = false" to="/article" class="dropitem">Article</router-link></li>
                                    <li><router-link @click="showMenu1 = false" to="/article" class="dropitem">在线编辑器</router-link></li>
                                    <li><router-link @click="showMenu1 = false" to="/article" class="dropitem">项目管理</router-link></li>
                                </ul>
                            </div>
                        </li>
                        <li id="ui-dropdown" @mouseleave="showMenu2 = false">
                            <a class="item selector" :class="{on:showMenu2 ==true}" @mouseenter="showMenu2 = true">Tool<i class="dropdown-arrow"></i></a>
                            <div class="dropdown-list" v-show="showMenu2">
                                <ul class="droplist">
                                    <li><router-link @click="showMenu2 = false" to="/navigation" class="dropitem">网址导航</router-link></li>
                                    <li><router-link @click="showMenu2 = false" to="/makeupList" class="dropitem">makeup</router-link></li>
                                    <li><router-link @click="showMenu2 = false" to="/ideaboxList" class="dropitem">摄影集</router-link></li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <!-- /mainmenu -->
            </div>
            <div class="frbox">
                <div class="header-userdrop ui-dropdown" v-if="showUserHeader">
                    
                    <comDropdown trigger="hover" placement="bottom" width="100px" top="40px">
                        <a slot="rel" class="selector">
                            <!-- com-userhead -->
                            <comUserheader stylesize="s" :userData="$store.state.loginUser"></comUserheader>
                            <!-- /com-userhead -->
                            <i class="dropdown-arrow"></i>
                        </a>
                        <ul slot="list" class="droplist">
                            <li><a @click="$router.push({ path: '/usercenter/myartList' })" class="dropitem">个人中心</a></li>
                            <li><a @click="loginOut()" class="dropitem">退出登录</a></li>
                        </ul>
                    </comDropdown>
                </div>
                <div class="unlogin" v-else>
                    <router-link class="ui-link ui-link-light" to="/login">登录</router-link>
                    <router-link target="_blank" class="ui-link ui-link-light" to="/login">注册</router-link>
                </div>
                
            </div>   
        </div>   
    </div>
</template>
<script>

import comUserheader from './userhead.vue';
import comDropdown from './dropdown'

export default {
    components: { comUserheader,comDropdown },
    data () {
        return {
            showMenu1: false, //显示导航二级菜单
            showMenu2: false, //显示导航二级菜单
            noHeaderRouter: /(usercenter)|(myartCreate)|(myartCreateMarkdown)|(myartList)|(favorartList)|(preview)|(pageError)/ //不需要头部的页面路由
        }
    },
    created: function(){
        //重新获取登录状态
        this.$store.commit('getLoginInfor');
    },
    computed: {
        showHeader() {
            return !this.noHeaderRouter.test(this.$route.path);
        },
        showUserHeader() {
            return this.$store.state.loginUser.isLogining;
        }
    },
    // watch: {
    //     '$router' : '$store.commit("getLoginInfor")'
    // },
    methods: {
        loginOut: function(){
            localStorage.removeItem('userId');
            localStorage.removeItem('userName');
            localStorage.removeItem('userHead');
            localStorage.removeItem('accessToken');
            //重新获取登录状态
            this.$store.commit('getLoginInfor');
        }
    }
}
</script>


<style lang="scss">
.header-userdrop {
    .dropdown {
        // top: 38px;
    }
}


</style>

