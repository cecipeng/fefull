<template>
    <div class="myartCreate">
        <div class="ui-user-header">
            <h2 class="user-header"><em class="font-l">创</em>建文章</h2>
        </div>
        <div class="createbox">
            <!-- 文章标题 -->
            <div class="createtit"><span class="num">1/</span>文章标题</div>
            <div class="arttitwrap">
                <div class="ui-formrow arttitbox" :class="{'form-error':formStatus.title.status===1}">
                    <!-- 是否原创 -->
                    <div class="ui-dropdown" @mouseleave="showDropdown=false">
                        <a class="selector" @mouseenter="showDropdown=true">
                            <span class="origin">{{result.origin.name}}</span>
                            <i class="dropdown-arrow"></i>
                        </a>
                        <div class="dropdown" v-show="showDropdown">
                            <ul class="droplist">
                                <li v-for="(item, index) in originSource"><a @click="changeDropdown(item)" class="dropitem" :data-id="item.id">{{item.name}}</a></li>
                            </ul>
                        </div>
                    </div>
                    <!-- /是否原创 -->
                    <input type="text" class="form-input form-input-wide inp-arttit" placeholder="请输入文章标题" v-model="result.title">
                    <p class="form-tip">{{formStatus.title.tiptxt}}</p>
                </div>

                <div class="reprint ui-formrow ui-forminline" v-if="result.origin.id==0" :class="{'form-error':formStatus.reprint.status===1}">
                    <label class="form-label">转载地址：</label>
                    <div class="form-con">
                        <input type="text" class="form-input" v-model="result.reprint">
                    </div>
                    <p class="form-tip">{{formStatus.reprint.tiptxt}}</p>
                </div>
            </div>
            <!-- /文章标题 -->

            <!-- 文章正文 -->
            <div class="createtit"><span class="num">2/</span>文章正文</div>
            <div class="ui-formrow ui-formnolabel" :class="{'form-error':formStatus.maintxt.status===1}">
                <Ueditor ref="getContent"></Ueditor>
                <p class="form-tip">{{formStatus.maintxt.tiptxt}}</p>
            </div>
            <!-- /文章正文 -->

            <!-- 文章设置 -->
            <div class="createtit"><span class="num">3/</span>文章设置</div>
            <div class="artsetting">

                <div class="ui-formrow ui-forminline">
                    <label class="form-label">文章分类：</label>
                    <div class="form-con">
                        <ul class="sortwrap">
                            <li class="sort" v-for="(item, index) in allTablist" :data-id="item.categoryId" :class="{'on':item.categoryId == result.category.categoryId}" @click="result.category = item">{{item.categoryName}}</li>
                        </ul>
                    </div>
                </div>

                <div class="ui-formrow ui-forminline" :class="{'form-error':formStatus.reprint.status===1}">
                    <label class="form-label">文章标签：</label>
                    <div class="form-con">
                        <ul class="checkboxwrap">
                            <li class="form-checkbox" v-for="(item, index) in allTagcloud" :data-id="item.tagcloudId" :class="{'on':isCheck(item.tagcloudId)}">
                                <span class="checkbox-txt">{{item.tagcloudName}}</span>
                                <input type="checkbox" class="form-hidden" :value="item.tagcloudId" v-model="result.tagclouds">
                            </li>
                        </ul>
                    </div>
                    <p class="form-tip">{{formStatus.tagclouds.tiptxt}}</p> 
                </div> 

                <div class="ui-formrow ui-forminline" :class="{'form-error':formStatus.reprint.status===1}">
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
                    <p class="form-tip">{{formStatus.cover.tiptxt}}</p>
                </div>

            </div>
            <!-- /文章设置 -->
            <div class="btnwrap">
                <a class="ui-btn ui-btn-main" @click="preview()">写完了，预览</a>
                <a class="ui-btn ui-btn-sub">还没写完，保存3天</a>
            </div>
        </div>
    </div>
</template>
<script>

import Ueditor from './common/ueditor.vue';

export default {

    data () {
        return {
            showDropdown: false, //显示下拉菜单
            originSource: [ //是否原创源数据
                { id: 1, name: '原创'},
                { id: 0, name: '转载'}
            ],
            result: { //表单结果
                articleId: "", //文章id
                title: "", //文章标题
                origin: {}, //是否原创
                maintxt: "", //文章正文内容
                author: {}, //作者
                fav: 0, //收藏数
                cover: "", //封面图
                publishedDate: "", //发布时间
                like: 0, //点赞数
                category: {}, //所属分类
                tagclouds: [], //所属标签云
                reprint: "" //转载自
            },
            formStatus: {
                title: {
                    status: 0, //1:error; 2:correct
                    tiptxt: ""
                },
                reprint: {
                    status: 0,
                    tiptxt: ""
                },
                maintxt: {
                    status: 0,
                    tiptxt: ""
                },
                tagclouds: {
                    status: 0,
                    tiptxt: ""
                },
                cover: {
                    status: 0,
                    tiptxt: ""
                }
            }
        }
    },
    components: { Ueditor },
    created: function(){
        //获取（公用数据）文章分类
        this.$store.commit('http_articleSort');

        //获取标签云列表
        this.$store.commit('http_tagcloud');

        this.result.origin = this.originSource[1];
        this.result.category = this.$store.state.articleSortData[0];
        this.initResult(this.result);
    },
    computed: {
        allTablist() { //文章分类
            this.result.category = this.$store.state.articleSortData[0];
            return this.$store.state.articleSortData;
        },
        allTagcloud() { //标签云
            return this.$store.state.tagcloudData;
        }
    },
    mounted: function(){
       
    },
    methods: {
        //初始化表单
        initResult: function(re){
            this.result = re;
        },
        changeDropdown: function(or){
            this.showDropdown = false;
            this.result.origin = or;
        },
        preview: function(){
            this.validate();
            // console.log();
            // console.log("id="+this.result.articleId);
            // console.log("title="+this.result.title);
            // console.log("origin="+this.result.origin.name);
            // console.log("maintxt="+this.result.maintxt);
            // console.log("author="+this.result.author);
            // console.log("cover="+this.result.cover);
            // console.log("publishedDate="+this.result.publishedDate);
            // console.log("category="+this.result.category);
        },
        //验证表单
        validate: function(){
            this.result.maintxt = this.$refs.getContent.getUeditor();
            //标题
            if(this.result.title == "") {
                this.formStatus.title.status = 1;
                this.formStatus.title.tiptxt = "不能为空！";
            }

            //转载地址
            if(this.result.origin.id==0 && this.result.reprint == "") {
                this.formStatus.reprint.status = 1;
                this.formStatus.reprint.tiptxt = "不能为空！";
            }

            //正文
            if(this.result.maintxt.length == 0) {
                this.formStatus.maintxt.status = 1;
                this.formStatus.maintxt.tiptxt = "不能为空！";
            }

            //标签云
            if(this.result.tagclouds.length == 0) {
                this.formStatus.tagclouds.status = 1;
                this.formStatus.tagclouds.tiptxt = "不能为空！";
            }

        },
        //判断checkbox是否被选中
        isCheck: function(n){
            console.log(n);
            for(var i = 0; i<this.result.tagclouds; i++){
                if(this.result.tagclouds[i] == n) {
                    // console.log("gfgdf");
                    return true;
                }
            }
            return false;
        }
    }
}
</script>

<style lang="scss">
    .com-ueditor {
        margin-bottom: 25px;
    }
    .arttitbox .ui-dropdown {
        margin-top: 1px;
        height: 38px;
        .selector {
            width: 110px;
            
            
            text-align: center;
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
