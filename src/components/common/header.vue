<template>
    <div class="com-header" v-if="showHeader">
        <div class="layout-wrapper">
            <div class="flbox">
                <!-- <a href="###" class="logo">前端综合体</a> -->
                <!-- mainmenu -->
                <div class="com-mainmenu">
                    <!-- <ul class="mainmenu">
                        <li>
                            <router-link class="item" to="/home">首页</router-link>
                        </li>
                        <li id="ui-dropdown">
                            <a class="item selector">资源库<i class="dropdown-arrow"></i></a>
                            <div class="dropdown">
                                <ul class="droplist">
                                    <li><a href="###" class="dropitem">基础库下载</a></li>
                                    <li><a href="###" class="dropitem">插件库</a></li>
                                    <li><a href="###" class="dropitem">实例分享</a></li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <a class="item">在线编辑器</a>
                        </li>
                        <li>
                            <a class="item">网址导航</a>
                        </li>
                        <li>
                            <a class="item">项目管理</a>
                        </li>
                    </ul> -->
                </div>
                <!-- /mainmenu -->
            </div>
            <div class="frbox">
                <div class="header-userdrop ui-dropdown" v-if="$store.state.loginUser.userId!=''" @mouseleave="showDropdown = false">
                    <a class="selector" @mouseenter="showDropdown = true">
                        <!-- com-userhead -->
                        <comUserheader stylesize="" :userData="$store.state.loginUser"></comUserheader>
                        <!-- /com-userhead -->
                        <i class="dropdown-arrow"></i>
                    </a>
                    <div class="dropdown" v-show="showDropdown">
                        <ul class="droplist">
                            <li><a @click="$router.push({ path: '/usercenter' })" class="dropitem">个人中心</a></li>
                            <li><a @click="showDropdown = false" class="dropitem">个人中心</a></li>
                        </ul>
                    </div>
                </div>
                <div class="unlogin" v-else>
                    <router-link target="_blank" class="ui-btn ui-btn-white" to="/login">登录</router-link>
                    <router-link target="_blank" class="ui-btn ui-btn-white" to="/login">注册</router-link>
                </div>
                
            </div>   
        </div>   
    </div>
</template>
<script>

import comUserheader from './userhead.vue';

export default {
    components: { comUserheader },
    data () {
        return {
            showDropdown: false, //显示下拉菜单
            noHeaderRouter: /(usercenter)|(login)/ //不需要头部的页面路由
            // showHeader: true //显示头部
        }
    },
    created: function(){
        //重新获取登录状态
        this.$store.commit('getLoginInfor');
    },
    computed: {
        showHeader: function(){
            return !this.noHeaderRouter.test(this.$route.path);
        }
    },
    methods: {
     
    }
}
</script>


<style lang="scss">
.header-userdrop {
    padding: 15px 0;
    .dropdown {
        top: 80px;
    }
}

</style>

