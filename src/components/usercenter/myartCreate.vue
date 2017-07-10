<template>
    <div class="myartCreate">
        <div class="ui-user-header">
            <h2 class="user-header"><em class="font-l">创</em>建文章</h2>
        </div>
        <div class="createbox">
            <!-- 文章标题 -->
            <div class="createtit"><span class="num">1/&nbsp;</span>文章标题</div>
            <div class="arttitwrap">
                <div class="ui-formrow arttitbox" :class="{'form-error':formStatus.title.status===1}">
                    <!-- 是否原创 -->
                    <comDropdown trigger="hover" placement="bottom" @itemClickParent="itemClickCall">
                        <a slot="rel" class="selector">
                            <span class="origin">{{result.origin.originName}}</span>
                            <i class="dropdown-arrow"></i>
                        </a>
                        <ul slot="list" class="droplist">
                            <li v-for="(item, index) in originSource"><a class="dropitem" :val="item">{{item.originName}}</a></li>
                        </ul>
                    </comDropdown>
                    <!-- /是否原创 -->
                    <input type="text" class="form-input form-input-wide inp-arttit" placeholder="请输入文章标题" v-model="result.title">
                    <p class="form-tip">{{formStatus.title.tiptxt}}</p>
                </div>

                <div class="reprint ui-formrow ui-forminline" v-if="result.origin.originId==0" :class="{'form-error':formStatus.reprint.status===1}">
                    <label class="form-label">转载地址：</label>
                    <div class="form-con">
                        <input type="text" class="form-input" v-model="result.reprint">
                    </div>
                    <p class="form-tip">{{formStatus.reprint.tiptxt}}</p>
                </div>
            </div>
            <!-- /文章标题 -->

            <!-- 文章正文 -->
            <div class="createtit"><span class="num">2/&nbsp;</span>文章正文</div>
            <div class="ui-formrow ui-formnolabel" :class="{'form-error':formStatus.maintxt.status===1}">
                <Ueditor :content="result.maintxt" ref="getContent"></Ueditor>
                <p class="form-tip">{{formStatus.maintxt.tiptxt}}</p>
            </div>
            <!-- /文章正文 -->

            <!-- 文章设置 -->
            <div class="createtit"><span class="num">3/&nbsp;</span>文章设置</div>
            <div class="artsetting">

                <div class="ui-formrow ui-forminline">
                    <label class="form-label">文章分类：</label>
                    <div class="form-con">
                        <ul class="sortwrap">
                            <li class="sort" v-for="(item, index) in allTablist" :data-id="item.categoryId" :class="{'on':item.categoryId == result.category.categoryId}" @click="result.category = item">{{item.categoryName}}</li>
                        </ul>
                    </div>
                </div>

                <div class="ui-formrow ui-forminline" :class="{'form-error':formStatus.tagclouds.status===1}">
                    <label class="form-label">文章标签：</label>
                    <div class="form-con">
                        <ul class="checkboxwrap">
                            <li class="form-checkbox" v-for="(item, index) in allTagcloud" :data-id="item.tagcloudId" :class="{'check':isCheck[index]}">
                                <span class="checkbox-txt">{{item.tagcloudName}}</span>
                                <input type="checkbox" class="form-hidden" :value="item.tagcloudId" v-model="result.tagclouds" @click="isCheck[index] = !isCheck[index]">
                            </li>
                        </ul>
                    </div>
                    <p class="form-tip">{{formStatus.tagclouds.tiptxt}}</p> 
                </div> 

                <div class="ui-formrow ui-forminline">
                    <span class="form-label">文章封面：</span>
                    <div class="form-con form-upload">
                        <uploadImg @exportImg = "getImg"></uploadImg>
                        <p class="upload-intro">仅支持JPG、GIF、PNG格式，图片尺寸为：350*200PX</p>
                    </div>
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

import Ueditor from './../common/ueditor.vue';
import UploadImg from './../common/uploadImg.vue';
import comDropdown from './../common/dropdown'

//公用方法
import UTIL from './../../util.js'

export default {

    data () {
        return {
            originSource: [ //是否原创源数据
                { originId: 1, originName: '原创'},
                { originId: 0, originName: '转载'}
            ],
            result: { //表单结果
                articleId: "",
                title: "", //文章标题
                origin: {
                    originId: 0,
                    originName: ""
                }, //是否原创
                maintxt: "", //文章正文内容
                cover: "", //封面图
                category: {
                    categoryId: 0,
                    categoryName: ""
                }, //所属分类
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
                }
            },
            isCheck: [],
        }
    },
    components: { Ueditor,UploadImg,comDropdown },
    created: function(){
        //获取（公用数据）文章分类
        this.$store.commit('http_articleSort');

        //获取标签云列表
        this.$store.commit('http_tagcloud');

        //重置表单：清空数据or赋值数据:根据路由传入的id
        const articleId = this.$route.params.articleId;
        if(articleId!=0) {
            this.http_getContent(articleId);
        }
        // else if(typeof this.$store.state.editArticle == "object") { //有数据
        //     this.initResult(this.$store.state.editArticle);
        // }
        // else { //未传入数据，判断为新建，所有表单重置为初始值
        //     for(var i = 0; i < this.$store.state.tagcloudData.length; i++) { //复选框默认全不选
        //         this.isCheck[i] = false;
        //     }
        //     this.result.origin = this.originSource[1]; //默认显示“原创”
        //     this.result.category = this.$store.state.articleSortData[0]; //默认分类为第一个
        //     this.initResult(this.result);
        // }
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
            let tag;
            //标签复选框根据数据来渲染是否勾选
            outer:
            for(var i = 0; i < this.$store.state.tagcloudData.length; i++) {
                tag = this.$store.state.tagcloudData[i];
                inter:
                for(var j = 0; j < re.tagclouds.length; j++) {
                    if(re.tagclouds[j] == tag.tagcloudId) {
                        this.isCheck[i] = true;
                        continue outer;
                    }
                }
                this.isCheck[i] = false;
            }           
            // this.result = UTIL.cloneObject(re);
            this.result = {}
            for (var attr in re) {
                if (re.hasOwnProperty(attr)) {
                    this.result[attr] = re[attr];
                }
            }
            console.log(this.result);
        },
        preview: function(){
            if(this.validate()) { //表单验证通过
            
                this.$store.commit('setEditArticle',this.result);
                this.$router.push({ name: 'preview'})
            }
        },
        //验证表单
        validate: function(){
            this.result.maintxt = this.$refs.getContent.getUeditor(); //获取富文本内容
            if( //不能为空判断
                this.validateEmpty(this.result.title, this.formStatus.title) &&//标题
                this.validateEmpty(this.result.reprint, this.formStatus.reprint) &&//转载地址
                this.validateEmpty(this.result.maintxt, this.formStatus.maintxt) &&//正文
                this.validateEmpty(this.result.tagclouds, this.formStatus.tagclouds)//标签云
            ) {
                return true;
            }
            else return false;
        },
        //判断是否为空
        validateEmpty: function(re,st){
            console.log(re.length);
            if(re.length == 0) {
                st.status = 1;
                st.tiptxt = "不能为空！";
                return false;
            }
            else {
                st.status = 0;
                st.tiptxt = "";
                return true;
            }
        },
        //获取上传图片
        getImg: function(img){
            this.result.cover = img;
        },
        //是否原创下拉菜单回调事件
        itemClickCall(val){
            console.log(val);
            this.result.origin = val;
            
        },
        //获取文章
        http_getContent(articleId) {
            var _this = this;

            UTIL.AJAX_POST(
                UTIL.AJAX_URL().articleDetail,
                {
                    articleId: articleId
                },
                function(RE,r,s){

                    if(RE.meta.code == "0000") { //请求成功
                        console.log(RE.datas);
                        _this.initResult.call(_this,RE.datas);
                    }
                    else { 
                        //请求错误，除code等于0000外，其他code都在页面调用error组件展示错误信息
                        if(RE.meta.code == "1002") {
                          
                        }
                        if(RE.meta.code == "1003") {
                          
                        }
                        console.log("FEFull：获取文章详情失败，"+RE.meta.message);
                    }
                }
            );
        },
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
            line-height: 38px;
            
            text-align: center;
        }
        .dropdown {
            top: 38px;
            margin-right: -1px;
        }
    }
    .radiowrap {
        .form-radio {
            margin-right: 26px;
        }
    }

</style>
