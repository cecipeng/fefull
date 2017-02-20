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
                            <span class="origin">{{result.origin.originName}}</span>
                            <i class="dropdown-arrow"></i>
                        </a>
                        <div class="dropdown" v-show="showDropdown">
                            <ul class="droplist">
                                <li v-for="(item, index) in originSource"><a @click="changeDropdown(item)" class="dropitem" :data-id="item.originId">{{item.originName}}</a></li>
                            </ul>
                        </div>
                    </div>
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
            <div class="createtit"><span class="num">2/</span>文章正文</div>
            <div class="ui-formrow ui-formnolabel" :class="{'form-error':formStatus.maintxt.status===1}">
                <Ueditor :content="result.maintxt" ref="getContent"></Ueditor>
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
                            <li class="form-checkbox" v-for="(item, index) in allTagcloud" :data-id="item.tagcloudId" :class="{'check':isCheck[index]}" @click="isCheck[index] = !isCheck[index]">
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
                        <uploadImg @exportImg = "getImg"></uploadImg>
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
import UploadImg from './common/uploadImg.vue';

export default {

    data () {
        return {
            showDropdown: false, //显示下拉菜单
            originSource: [ //是否原创源数据
                { originId: 1, originName: '原创'},
                { originId: 0, originName: '转载'}
            ],
            result: { //表单结果
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
                },
                cover: {
                    status: 0,
                    tiptxt: ""
                }
            },
            isCheck: [],
        }
    },
    components: { Ueditor,UploadImg },
    created: function(){
        //获取（公用数据）文章分类
        this.$store.commit('http_articleSort');

        //获取标签云列表
        this.$store.commit('http_tagcloud');

        //重置表单：清空数据or赋值数据
        if(typeof this.$store.state.editArticle == "object") { //有数据
            var tagclouds = this.$store.state.editArticle.tagclouds;
            var tag;

            //标签复选框根据数据来渲染是否勾选
            outer:
            for(var i = 0; i < this.$store.state.tagcloudData.length; i++) {
                tag = this.$store.state.tagcloudData[i];
                inter:
                for(var j = 0; j < tagclouds.length; j++) {
                    if(tagclouds[j] == tag.tagcloudId) {
                        this.isCheck[i] = true;
                        continue outer;
                    }
                }
                this.isCheck[i] = false;
            }
            this.initResult(this.$store.state.editArticle);
            console.log(this.result.category.categoryName);
        }
        else { //未传入数据，判断为新建，所有表单重置为初始值
            for(var i = 0; i < this.$store.state.tagcloudData.length; i++) { //复选框默认全不选
                this.isCheck[i] = false;
            }
            this.result.origin = this.originSource[1]; //默认显示“原创”
            this.result.category = this.$store.state.articleSortData[0]; //默认分类为第一个
            this.initResult(this.result);
        }
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
