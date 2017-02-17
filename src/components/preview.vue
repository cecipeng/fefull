<template>
    <div class="mod-article">
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
                <a class="ui-btn ui-btn-white" @click="$router.push({ name: 'myartCreate' })">返回修改</a>
                <a class="ui-btn ui-btn-main" @click="submitCreate">创建文章</a>
            </div>
            <!-- /预览提交 -->

            <!-- 文章正文 -->
            <div class="layout-mainby">
                
                <div class="articlewrap">
                    <blockquote v-if="article.origin.id!=1">转载自：<span class="link">{{article.reprint}}</span></blockquote>
                    <div class="articletxt">{{article.maintxt}}</div>
                </div>
                <div class="tagwrap">
                    <a v-for="item in article.tagclouds" :data-tagcloudId="item.tagcloudId" class="btn-tag">{{item.tagcloudName}}</a>
                </div>
            </div>
            <!-- /文章正文 -->
        </div>
    </div>
</template>

<script>

//公用方法
import UTIL from './../util.js'

export default {

    data () {
        return {
            article: {}, //文章
        }
    },
    created: function(){
        this.article = this.$store.state.editArticle;
       
    },
    methods: {
        //创建文章并保存到数据库
        submitCreate: function(){
            this.article.origin = this.article.origin.id;
            this.article.category = this.article.category.categoryId;

        },
        //返回修改
        backToEditor: function(){
            this.$router.push({ name: 'myartCreate' });
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
            margin: 0 8px;
        }
    }
</style>