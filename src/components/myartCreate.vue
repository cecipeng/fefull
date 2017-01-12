<template>
    <div class="myartCreate">
        <div class="ui-user-header">
            <h2 class="user-header"><em class="font-l">创</em>建文章</h2>
        </div>
        <div class="createbox">
            <!-- 文章标题 -->
            <div class="createtit"><span class="num">1/</span>文章标题</div>
            <div class="formbox-arttit">
                <!-- 是否原创 -->
                <div class="ui-dropdown">
                    <a class="selector">
                        排序方式
                        <i class="dropdown-arrow"></i>
                    </a>
                    <div class="dropdown">
                        <ul class="droplist">
                            <li><a @click="orderList(0)" class="dropitem">默认</a></li>
                            <li><a @click="orderList(1)" class="dropitem">最新</a></li>
                            <li><a @click="orderList(2)" class="dropitem">热门</a></li>
                        </ul>
                    </div>
                </div>
                <!-- /是否原创 -->
                <input type="text" class="inp-arttit" />
            </div>
            <!-- /文章标题 -->

            <!-- 文章正文 -->
            <div class="createtit"><span class="num">2/</span>文章正文</div>
            <Ueditor></Ueditor>
            <!-- /文章正文 -->

            <!-- 文章设置 -->
            <div class="createtit"><span class="num">3/</span>文章设置</div>
            <div class="artsetting">

                <div class="formrow">
                    <span class="formlabel">文章分类：</span>
                    <ul class="form-radio">
                        <li class="on">未分类</li>
                        <li>未分类</li>
                        <li>未分类</li>
                    </ul>
                </div>

                <div class="formrow">
                    <span class="formlabel">文章标签：</span>
                    <ul class="form-checkbox">
                        <li class="on">未分类</li>
                        <li>未分类</li>
                        <li>未分类</li>
                        <li>未分类</li>
                        <li class="on">未分类</li>
                        <li>未分类</li>
                        <li>未分类</li>
                        <li>未分类</li>
                        <li>未分类</li>
                        <li>未分类</li>
                        <li>未分类</li>
                        <li>未分类</li>
                        <li class="on">未分类</li>
                        <li>未分类</li>
                    </ul>
                </div>

                <div class="formrow">
                    <span class="formlabel">文章封面：</span>
                    <div class="btn-upload">
                        <a class="ui-btn ui-btn-white">上传封面<input type="file"></input></a>

                    </div>
                    <div class="uploaded">
                        <div class="coverbox">
                            <img src="">
                        </div>
                    </div>
                </div>

                <div class="btnwrap">
                    <a class="ui-btn ui-btn-main">写完了，预览</a>
                    <a class="ui-btn ui-btn-sub">还没写完，保存3天</a>
                </div>
            </div>
            <!-- /文章设置 -->
        </div>
    </div>
</template>
<script>

import Ueditor from './common/ueditor.vue';

export default {

    data () {
        return {
        }
    },
    components: { Ueditor },
    created: function(){
        
    },
    mounted: function(){
       
    },
    methods: {
        
    }
}
</script>

<style lang="scss">
    .com-ueditor {
        margin-bottom: 25px;
    }
</style>
