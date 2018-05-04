<template>
    <div class="layout-mod mod-article">
        <comLoadingMod v-if="showloading"></comLoadingMod>
        <comError :text="showError.text" :type="showError.type" v-if="showError.show"></comError>
        <div v-if="!showloading && !showError.show">
            <!-- 详情页头部 -->
            <div class="detail-header">
                <div class="layout-wrapper">
                    <div class="headerbox">
                        <h1 class="article-tit">{{article.title}}<span class="tag-origin" v-if="article.origin.originId==1">{{article.origin.originName}}</span></h1>
                        <div class="subcon">
                            <p class="article-date"><em class="date">{{article.publishedDate}}</em></p>
                            <p class="article-date" :data-categoryId="article.category.categoryId">分类：<em class="date">{{article.category.categoryName}}</em></p>
                            <div class="article-date tagwrap">
                                <a v-for="item in article.tagclouds" class="btn-tag" @click="searching(item.tagcloudId)">{{item.tagcloudName}}</a>
                            </div>
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
                        <a href="###" class="ui-btn ui-btn-main" @click="addFavor()" v-if="article.isCollection==0"><i class="fav"></i>收藏（{{article.fav}}）</a>
                        <a href="###" class="ui-btn ui-btn-default" @click="removeFavor()" v-else><i class="favfull"></i>已收藏（{{article.fav}}）</a>
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
                        <div class="articletxt" v-html="articleMaintxt" v-highlight></div>
                    </div>
                    
                </div>
                <!-- /文章正文 -->

                <!-- 文章锚点  -->
                <!-- <comAnchor :list="anchorList" type="fix"></comAnchor> -->
                <!-- ／文章锚点  -->
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'

import comUserheader from './../common/userhead.vue';
import comTagcloud from './../common/tagcloud'
import comLoadingMod from './../common/loading-mod'
import comError from './../common/error'
// import comAnchor from './../common/anchor'

import Highlight from './../common/highlight.js'
Vue.use(Highlight)


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
            showError: { //缺省图
                show: false, //是否显示
                type: "", //错误类型
                text: "" //错误提示文字
            },
            anchorList: [], //锚点内容
            showloading: false, //显示正在加载
            similar: [] //相似文章
        }
    },
    watch: {
        '$route': 'http_getContent' //路由发生改变时重新载入内容
    },
    components: { comUserheader,comTagcloud,comLoadingMod,comError },
    created: function(){
        //根据文章id获取文章
        this.http_getContent();
    },
    computed: {
        allTagcloud() { //标签云
            return this.$store.state.tagcloudData;
        },
        articleMaintxt() {
            // const reg = /<pre.*<\/pre>))/g
            // const matchArr = list.match(reg);
            // $('pre code').each(function(i, block) {
            //     var _html = block.innerHTML.replace(/\</g, '&lt;').replace(/\>/, '&gt;')
            //     block.innerHTML = _html;
            //     hljs.highlightBlock(block);
            // });
            return this.article.maintxt
        }
    },
    methods: {
        //点击标签搜索相关文章
        searching(id){
			this.$emit("searching",id);
			this.$router.push({name: 'search', params: { key: {'tagcloudId': id} }})
		},
        //获取文章
        http_getContent() {
            var _this = this;
            this.articleId = this.$route.params.articleId;

            //请求时显示正在加载
            this.showloading = true;

            //隐藏“无结果”
            this.showError.show = false;

            UTIL.AJAX_POST(
                UTIL.AJAX_URL().articleDetail,
                {
                    articleId: this.articleId
                },
                function(RE,r,s){
                    //请求成功后不显示正在加载
                    _this.showloading = false;

                    if(RE.meta.code == "0000") { //请求成功
                        _this.article = RE.datas;
                        _this.setAnchor(RE.datas.maintxt);
                    }
                    else if(RE.meta.code == "1003") { //服务端错误
                        _this.showError.show = true;
                        _this.showError.type = "weberror";
                        console.log("Allinone：获取文章列表失败，"+RE.meta.message);
                    }
                }
            );
            this.similar = dataArtList; //临时处理
        },
        //点击收藏文章
        addFavor(){
            var _this = this;
            UTIL.AJAX_POST(
                UTIL.AJAX_URL().addFavor,
                {
                    articleId: this.articleId
                },
                function(RE,r,s){
                    switch(RE.meta.code) {
                        case "0000": //请求成功
                            _this.article.fav++;
                            _this.article.isCollection = 1;
                            break;
                        case "2002": //记录已存在
                            s.commit('setMessage',[true,"已经收藏过了～","warn",false]);
                            break;
                        case "1003":  //服务端错误
                            s.commit('setMessage',[true,"网络错误，请重试","default",false]);
                            console.log("Allinone：获取文章列表失败，"+RE.meta.message);
                            break;
                    }
                }
            );
        },
        //取消收藏文章
        removeFavor(){
            var _this = this;
            UTIL.AJAX_POST(
                UTIL.AJAX_URL().removeFavor,
                {
                    articleId: this.articleId
                },
                function(RE,r,s){
                    switch(RE.meta.code) {
                        case "0000": //请求成功
                            _this.article.fav--;
                            _this.article.isCollection = 0;
                            break;
                        case "2003": //记录不存在
                            s.commit('setMessage',[true,"不存在的文章","error",false]);
                            break;
                        case "1003":  //服务端错误
                            s.commit('setMessage',[true,"网络错误，请重试","default",false]);
                            console.log("Allinone：获取文章列表失败，"+RE.meta.message);
                            break;
                    }
                }
            );
        },
        //设置文章锚点内容
        setAnchor(list){
            const reg = /<h[1-4][^<\/]+<\/h[1-4]>(?!((?!.*<code[>\s]).*<\/code>))/g
            const matchArr = list.match(reg);
            
            let resultArr = [{
                child: [{
                    child: [{
                        child: [{}]
                    }]
                }]
            }];
            let [a,b,c,d] = [-1,-1,-1,-1];

            if(matchArr){
                
                for(var i=0;i<matchArr.length;i++){
                    if(matchArr[i].startsWith('<h1')) {
                        a++;
                        [b,c,d] = [-1,-1,-1];
                        resultArr[a].title = getInnerHtml(matchArr[i]);
                        resultArr[a].child = [];
                        console.log(a);
                    }
                    else if(matchArr[i].startsWith('<h2')) {
                        b++;
                        a = a==-1? 0 : a;
                        [c,d] = [-1,-1];
                        resultArr[a].child[b].title = getInnerHtml(matchArr[i]);
                        resultArr[a].child[b].child = [];
                        console.log(b);
                    }
                    else if(matchArr[i].startsWith('<h3')) {
                        c++;
                        a = a==-1? 0 : a;
                        b = b==-1? 0 : b;
                        d=-1;
                        resultArr[a].child[b].child[c].title = getInnerHtml(matchArr[i]);
                        resultArr[a].child[b].child[c].child = [];
                        console.log(c);
                    }
                    else if(matchArr[i].startsWith('<h4')) {
                        d++;
                        a = a==-1? 0 : a;
                        b = b==-1? 0 : b;
                        c = c==-1? 0 : c;
                        resultArr[a].child[b].child[c].child[d].title = getInnerHtml(matchArr[i]);
                        resultArr[a].child[b].child[c].child[d].child = [];
                        console.log(d);
                    }
                }
                console.log(resultArr[0]);
            }

            // function initArr(a,b,c,d){
            //     var resultArr = [];`
            //     resultArr[a].child[b] = [];
            //     resultArr[a].child[b].child[c] = [];
            //     resultArr[a].child[b].child[c].child = [];
            //     return resultArr;
            // }

            // let resultArr = [{
            //     child: [{
            //         child: [{
            //             child: [{}]
            //         }]
            //     }]
            // }];
            
        },
        //去除标签，只留innerHTML，用于：setAnchor()方法
        getInnerHtml(str){
            return str.replace(/<(?:.|\s)*?>/g, "");
            const reg = /<h[1-3][^<\/]+<\/h[1-3]>(?!((?!.*<code[>\s]).*<\/code>))/g
            const resultArr = list.match(reg);
            console.log(resultArr)
            if(resultArr){
                for(var i=0;i<resultArr.length;i++){
                    var text = resultArr[i].replace(/<(?:.|\s)*?>/g, "");
                }
            }
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