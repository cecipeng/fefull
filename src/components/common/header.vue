<template>
    <div class="com-header" v-if="showHeader">
        <div class="layout-wrapper">
            <div class="flbox">
                <!-- <a href="###" class="logo">前端综合体</a> -->
                <!-- mainmenu -->
                <div class="com-mainmenu">
                    <ul class="mainmenu">
                        <li>
                            <router-link class="item" to="/home">首页</router-link>
                        </li>
                        <li>
                            <router-link class="item" to="/article">文章</router-link>
                        </li>
                         <li id="ui-dropdown" @mouseleave="showMenu = false">
                            <a class="item selector" :class="{on:showMenu ==true}" @mouseenter="showMenu = true">资源库<i class="dropdown-arrow"></i></a>
                            <div class="dropdown-list" v-show="showMenu">
                                <ul class="droplist">
                                    <li><a @click="showMenu = false" href="###" class="dropitem">基础库下载</a></li>
                                    <li><a @click="showMenu = false" href="###" class="dropitem">插件库</a></li>
                                    <li><a @click="showMenu = false" href="###" class="dropitem">实例分享</a></li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <a class="item">在线编辑器</a>
                        </li>
                        <li>
                            <router-link class="item" to="/navigation">网址导航</router-link>
                        </li>
                        <li>
                            <a class="item">项目管理</a>
                        </li> 
                    </ul>
                </div>
                <!-- /mainmenu -->
            </div>
            <div class="frbox">
                <div class="header-userdrop ui-dropdown" v-if="showUserHeader">
                    
                    <comDropdown trigger="hover" placement="bottom" width="100px">
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
                    <router-link class="ui-btn ui-btn-default" to="/login">登录</router-link>
                    <router-link target="_blank" class="ui-btn ui-btn-default" to="/login">注册</router-link>
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
            showMenu: false, //显示导航二级菜单
            noHeaderRouter: /(usercenter)|(myartCreate)|(myartCreateMarkdown)|(myartList)|(favorartList)|(login)|(preview)|(pageError)/ //不需要头部的页面路由
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

