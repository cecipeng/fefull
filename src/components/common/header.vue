<template>
    <div class="com-header">
        <div class="layout-wrapper">
            <div class="flbox">
                <a href="###" class="logo">前端综合体</a>
                <!-- mainmenu -->
                <div class="com-mainmenu">
                    <ul class="mainmenu">
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
                    </ul>
                </div>
                <!-- /mainmenu -->
            </div>
            <div class="frbox">
                <div class="ui-dropdown">
                    <a class="selector">
                        <!-- com-userhead -->
                        <comUserheader></comUserheader>
                        <!-- /com-userhead -->
                        <i class="dropdown-arrow"></i>
                    </a>
                    <div class="dropdown">
                        <ul class="droplist">
                            <li><a @click="" class="dropitem">个人中心</a></li>
                        </ul>
                    </div>
                </div>
                
                <a href="###" class="btn-sign">注销</a>
            </div>   
        </div>   
    </div>
</template>
<script>

import comUserheader from './userhead.vue';

export default {
    components: { comUserheader }
}
</script>
