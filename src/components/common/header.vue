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
                <div class="ui-dropdown" v-if="showUser">
                    <a class="selector">
                        <!-- com-userhead -->
                        <comUserheader stylesize="" :authorid="loginUser"></comUserheader>
                        <!-- /com-userhead -->
                        <i class="dropdown-arrow"></i>
                    </a>
                    <div class="dropdown">
                        <ul class="droplist">
                            <li><a @click="linkToUsercenter" class="dropitem">个人中心</a></li>
                        </ul>
                    </div>
                </div>
                <div class="unlogin" v-else="showUser">
                    <a class="btn-login">登录</a>
                    <a class="btn-register">注册</a>
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
            showHeader: true, //显示头部：默认显示，个人中心页不显示
            showUser: false, //显示登录用户
            loginUser: "" //登录用户ID

        }
    },
    created: function(){
        this.getUser();
    },
    methods: {
        linkToUsercenter: function(){
            this.showHeader = false; //个人中心页不显示头部
            this.$router.push({ path: 'usercenter' });
        },
        getUser: function(){
            this.$store.commit('getLoginInfor');
            const user = this.$store.state.loginUser;
            if(user !== "") {
                this.showUser = true;
                this.loginUser = user;
            }
            else {
                this.showUser = false;
            }
        }
    }
}
</script>
