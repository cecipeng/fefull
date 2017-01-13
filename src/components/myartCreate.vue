<template>
    <div class="myartCreate">
        <div class="ui-user-header">
            <h2 class="user-header"><em class="font-l">创</em>建文章</h2>
        </div>
        <div class="createbox">
            <!-- 文章标题 -->
            <div class="createtit"><span class="num">1/</span>文章标题</div>
            <div class="arttitbox">
                <!-- 是否原创 -->
                <div class="ui-dropdown" @mouseleave="showDropdown=false">
                    <a class="selector" @mouseenter="showDropdown=true">
                        原创
                        <i class="dropdown-arrow"></i>
                    </a>
                    <div class="dropdown" v-show="showDropdown">
                        <ul class="droplist">
                            <li><a @click="showDropdown = false" class="dropitem">转载</a></li>
                            <li><a @click="showDropdown = false" class="dropitem">原创</a></li>
                        </ul>
                    </div>
                </div>
                <!-- /是否原创 -->
                <input type="text" class="form-input form-input-wide inp-arttit" placeholder="请输入文章标题">
            </div>
            <!-- /文章标题 -->

            <!-- 文章正文 -->
            <div class="createtit"><span class="num">2/</span>文章正文</div>
            <Ueditor></Ueditor>
            <!-- /文章正文 -->

            <!-- 文章设置 -->
            <div class="createtit"><span class="num">3/</span>文章设置</div>
            <div class="artsetting">

                <div class="ui-formrow">
                    <label class="form-label">文章分类：</label>
                    <div class="form-con">
                        <ul class="sortwrap">
                            <li class="sort on">CSS</li>
                            <li class="sort">CSS</li>
                            <li class="sort">CSS</li>
                        </ul>
                    </div>
                </div>
    
                <div class="ui-formrow">
                    <label class="form-label">文章标签：</label>
                    <div class="form-con">
                        <ul class="checkboxwrap">
                            <li class="form-checkbox" data-status="check">
                                <span class="checkbox-txt">我同意</span>
                                <input type="checkbox" class="form-hidden">
                            </li>
                            <li class="form-checkbox">
                                <span class="checkbox-txt">我同意</span>
                                <input type="checkbox" class="form-hidden">
                            </li>
                            <li class="form-checkbox">
                                <span class="checkbox-txt">我同意</span>
                                <input type="checkbox" class="form-hidden">
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="ui-formrow">
                    <span class="form-label">文章封面：</span>
                    <div class="form-con form-upload">
                        <div class="uploadbtn">
                            <a href="###" class="ui-btn ui-btn-white btn-upload">上传封面<input type="file" class="form-hidden"></a>
                        </div>
                        <div class="imgpreview">
                            <img src="" alt="">
                        </div>
                        <p class="upload-intro">仅支持JPG、GIF、PNG格式，图片尺寸为：350*200PX</p>
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
            showDropdown: false, //显示下拉菜单
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
    .arttitbox .ui-dropdown {
        .selector {
            height: 40px;
        }
        .dropdown {
            top: 39px;
            margin-right: -1px;
        }
    }
    .radiowrap {
        .form-radio {
            margin-right: 26px;
        }
    }
    
</style>
