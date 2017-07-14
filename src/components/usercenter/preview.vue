<template>
    <div class="layout-mod mod-article article-preview">
        <!-- 详情页头部 -->
        <div class="detail-header">
            <div class="layout-wrapper">
                <div class="headerbox">
                    <h1 class="article-tit">{{article.title}}<span class="tag-origin" v-if="article.origin.id==1">{{article.origin.name}}</span></h1>
                    <div class="subcon">
                        <p class="article-date" :data-categoryId="article.category.categoryId">分类：<em class="date">{{article.category.categoryName}}</em></p>
                    </div>
                </div>
            </div>
        </div>
        <!-- /详情页头部 -->

        <div class="detail-container layout-wrapper">
            <!-- 预览提交 -->
            <div class="previewfix">
                <a class="ui-btn ui-btn-default" @click="$router.push({ name: 'myartCreate' })">返回修改</a>
                <a class="ui-btn ui-btn-main" @click="submitCreate">创建文章</a>
            </div>
            <!-- /预览提交 -->

            <!-- 文章正文 -->
            <div class="layout-mainby">
                
                <div class="articlewrap">
                    <blockquote v-if="article.origin.id!=1">转载自：<span class="link">{{article.reprint}}</span></blockquote>
                    <div class="articletxt" v-html="article.maintxt"></div>
                </div>
                <div class="tagwrap">
                    <a v-for="item in article.tagclouds" :data-tagcloudId="item.tagcloudId" class="btn-tag">{{item.tagcloudName}}</a>
                </div>
            </div>
            <!-- /文章正文 -->
        </div>

        <div class="ui-pop" v-if="showSuccessPop">
            <div class="popwrap">
                <div class="pop-body">
                    <p class="maintxt">文章创建成功！</p>
                </div>
                <div class="pop-footer">
                    <a class="ui-btn ui-btn-default" @click="backToList">返回我的文章列表</a>
                    <a class="ui-btn ui-btn-main" @click="viewArticle">查看文章</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

//公用方法
import UTIL from './../../util.js'

export default {

    data () {
        return {
            article: {}, //文章
            showSuccessPop: false, //显示成功弹窗
        }
    },
    created: function(){
        this.article = this.$store.state.editArticle;
       
    },
    methods: {
        //创建文章并保存到数据库
        submitCreate: function(){
            var _this = this;
            
            UTIL.AJAX_POST(
                UTIL.AJAX_URL().saveOrUpdate,
                this.article,
                function(RE,r,s){
                    if(RE.meta.code == "0000") { //请求成功
                        _this.showSuccessPop = true; //显示成功弹窗
                        _this.$store.commit('setEditArticle',''); //清空数据
                        _this.article.articleId = RE.datas.articleId;
                    }
                }
            )  
        },
        //返回修改
        backToEditor: function(){
            this.$router.push({name: 'myartCreate', params: { 'articleId': -1} })
        },
        //返回我的文章列表
        backToList: function(){
            this.showSuccessPop = false;
            this.$router.push({ name: 'myartList' });
        },
        viewArticle: function(){
            this.showSuccessPop = false;
            this.$router.push({ name: 'articleDetail', params: {articleId: this.article.articleId} });
        }
    }
}
</script>

<style lang="scss">
    .subcon {
        text-align: center;
        .article-date {
            display: inline-block;
            vertical-align: middle;
        }
    }
</style>