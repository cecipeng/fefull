<template>
    <div class="layout-mod mod-article">
        <!-- 详情页头部 -->
        <div class="detail-header">
            <div class="layout-wrapper">
                <div class="headerbox">
                    <h1 class="article-tit">{{article.title}}<span class="tag-origin" v-if="article.origin.originId==1">{{article.origin.originName}}</span></h1>
                    <div class="subcon">
                        <p class="article-date"><em class="date">{{article.publishedDate}}</em></p>
                        <p class="article-date" :data-categoryId="article.category.categoryId">分类：<em class="date">{{article.category.categoryName}}</em></p>
                    </div>
                </div>
            </div>
        </div>
        <!-- /详情页头部 -->

        <div class="detail-container layout-wrapper">
            <!-- 侧栏 -->
            <div class="layout-sideby">
                <comUserheader stylesize="" :userData="article.author"></comUserheader>
                <div class="btnwrap">
                    <a href="###" class="ui-btn ui-btn-main" @click="addFav()"><i class="fav"></i>收藏（{{article.fav}}）</a>
                    <a href="###" class="ui-btn ui-btn-default"><i class="comment"></i>评论</a>
                </div>
                <!-- 相似文章 -->
                <div class="similar">
                    <h3 class="sidetitle">相似文章</h3>
                    <ul class="similarlist">
                        <li v-for="item in similar" ><router-link tag="a" class="item" :to="{ name: 'articleDetail', params: { articleId: item.articleId }}">{{item.title}}</router-link></li>
                    </ul>
                </div>
                <!-- /相似文章 -->

                <!-- 标签云 -->
                <div class="similar">
                    <h3 class="sidetitle">标签云</h3>
                    <comTagcloud :tagcloudList="allTagcloud"></comTagcloud>
                </div>
                <!-- /标签云 -->
            </div>
            <!-- /侧栏 -->
            
            <!-- 文章正文 -->
            <div class="layout-mainby">
                <div class="articlewrap">
                    <blockquote v-if="article.origin.originId!=1">转载自：<span class="link">{{article.reprint}}</span></blockquote>
                    <div class="articletxt" v-html="article.maintxt"></div>
                </div>
                <div class="tagwrap">
                    <a v-for="item in article.tagclouds" class="btn-tag" @click="searching(item.tagcloudId)">{{item.tagcloudName}}</a>
                </div>
            </div>
            <!-- /文章正文 -->
        </div>
    </div>
</template>

<script>
import comUserheader from './../common/userhead.vue';
import comTagcloud from './../common/tagcloud'

//临时数据
import dataArtList from './../../data_artlist_tab1.js'

//公用方法
import UTIL from './../../util.js'

export default {

    data () {
        return {
            articleId: 0, //文章ID
            article: {
                origin: {
                    originId: 0,
                    originName: ""
                },
                category: {
                    categoryId: 0,
                    categoryName: ""
                }
            }, //文章
            allTagcloud: [], //标签云
            similar: [] //相似文章
        }
    },
    watch: {
        '$route': 'http_getContent' //路由发生改变时重新载入内容
    },
    components: { comUserheader,comTagcloud },
    created: function(){
        //根据文章id获取文章
        this.http_getContent();

        //获取标签云列表
        this.$store.commit('http_tagcloud');
        this.allTagcloud = this.$store.state.tagcloudData;
    },
    methods: {
        //点击标签搜索相关文章
        searching(id){
			this.$emit("searching",id);
			this.$router.push({name: 'search', params: { key: {'tagcloudId': id} }})
		},
        http_getContent() {
            var _this = this;
            this.articleId = this.$route.params.articleId;

            UTIL.AJAX_POST(
                "article/getArticleById",
                {
                    articleId: this.articleId
                },
                function(RE,r,s){
                    if(RE.meta.code == "0000") { //请求成功
                        _this.article = RE.datas;
                    }
                    else { 
                        console.log("FEFull：获取文章详情失败，"+RE.meta.message);
                    }
                }
            );
            this.similar = dataArtList; //临时处理
        },
        addFav(){
            var _this = this;
            UTIL.AJAX_POST(
                "article/collection",
                {
                    articleId: this.articleId
                },
                function(RE,r,s){
                    if(RE.meta.code == "0000") { //请求成功
                    console.log("dsdfs")
                        _this.article.fav++;
                    }
                    else { 
                        console.log("FEFull：获取文章详情失败，"+RE.meta.message);
                    }
                }
            );
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