<template>
    <div class="mod-article">
        <!-- 详情页头部 -->
        <div class="detail-header">
            <div class="layout-wrapper">
                <div class="headerbox">
                    <h1 class="article-tit">{{article.title}}<span class="tag-origin" v-if="article.origin.originId==1">{{article.origin.originName}}</span></h1>
                    <div class="subcon">
                        <p class="article-date">发表于<em class="date">{{article.publishedDate}}</em></p>
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
                    <a href="###" class="ui-btn ui-btn-sub"><i class="comment"></i>评论</a>
                    <a href="###" class="ui-btn ui-btn-sub"><i class="fav"></i>收藏（{{article.fav}}）</a>
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
                <div class="articletxt">{{article.maintxt}}</div>
                <div class="articletxt">
                    <blockquote v-if="article.origin.originId!=1">转载自：<span class="link">{{article.reprint}}</span></blockquote>
                    <p><a href="yxp.163.com">网易印像派</a>是网易公司推出的个性产品服务平台，在网易印像派可以网上冲印各类数码产品。随着印像派业务不断扩展，几年前设计的首页无论是在交互还是视觉上都已经无法满足现有的业务需求，所以首页的改版是一件迟早要提上议程的事情。</p>
                    <img src="../../assets/pics/demo-article-detail.png">
                    <h1>CSS Shapes</h1>
                    <h2>CSS Shapes</h2>
                    <h3>CSS Shapes</h3>
                    <h4>CSS Shapes</h4>
                    <h5>CSS Shapes</h5>
                    <p>前段时间<code>float:left;</code>在做印像派的全站改版，其中包括首页、列表页、详情页、主题页等页面，整个项目历时较久。前段时间新版印像派上<code>float:left;</code>线了，首页初稿由葱头同学设计定稿的，后期由我跟进优化，现在正好以印像派首页为切入点做个设计回顾。</p>
                    <ul>
                        <li>网格容器网格容器网格容器网格容器网格容器网格容器网格容器网格容器网格容器网格容器网格容器网格容器网格容器网格容器网格容器网格容器网格容器网格容器网格容器网格容器网格容器网格容器网格容器网格容器网格容器网格容器网格容器</li>
                        <li>网格容器</li>
                        <li>网格容器</li>
                    </ul>

                    <ol>
                        <li>网格容器网格容器网格容器网格容器网格容器网格容器网格容器网格容器网格容器网格容器网格容器网格容器网格容器网格容器网格容器网格容器网格容器网格容器网格容器网格容器网格容器网格容器网格容器网格容器网格容器网格容器网格容器</li>
                        <li>网格容器</li>
                        <li>网格容器</li>
                    </ol>
                    <pre class="css">
                        <code>
                            
                        </code>
                    </pre>
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