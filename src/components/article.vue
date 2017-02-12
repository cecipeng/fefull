<template>
    <div class="mod-article">
    	<!-- ui-tab -->
    	<div class="ui-tab ui-tab1">
    	    <div class="tab-head">
    	        <div class="layout-wrapper">
                
    	            <ul class="tabmenu">
                        <li :class="{'on':curIndex==0}" @click="changeTab(1,'')">全部</li>
    	                <li v-for="(cat, index) in allTablist" :class="{'on':index+1==curIndex}" :data-id="cat.categoryId" @click="changeTab(1,cat.categoryId)">{{cat.categoryName}}</li>
    	            </ul>

                    <!-- com-search -->
                    <comSearch></comSearch>   
    	            <!-- /com-search -->

    	            <!-- 排序 -->
                    <div class="ui-dropdown" @mouseleave="showDropdown1=false">
                        <a class="selector" @mouseenter="showDropdown1=true">
                            排序方式
                            <i class="dropdown-arrow"></i>
                        </a>
                        <div class="dropdown" v-show="showDropdown1">
                            <ul class="droplist">
                                <li><a @click="orderList(0);showDropdown1 = false" class="dropitem">默认</a></li>
                                <li><a @click="orderList(1);showDropdown1 = false" class="dropitem">最新</a></li>
                                <li><a @click="orderList(2);showDropdown1 = false" class="dropitem">热门</a></li>
                            </ul>
                        </div>
                    </div>
    	            <!-- /排序 -->
    	            
                    <!-- com-tagcloud -->
                    <div class="ui-dropdown tagcloud"  @mouseleave="showDropdown2=false">
                        <a class="selector" @mouseenter="showDropdown2=true">
                            标签云
                            <i class="dropdown-arrow"></i>
                        </a>
                        <div class="dropdown" v-show="showDropdown2">
                            <comTagcloud :tagcloudList="allTagcloud"></comTagcloud>  
                        </div>
                    </div>
                    <!-- /com-tagcloud -->
    	        </div>
    	    </div>
    	    <div class="tab-body layout-wrapper">
                <comListArticle :artlist="curArtList"></comListArticle>
                <comPage :Pages="Pages" @changePage="changePage" ></comPage> 
    	    </div>
    	</div>
    	<!-- /ui-tab --> 
    </div>
</template>

<script>
import comSearch from './common/search'
import comTagcloud from './common/tagcloud'
import comListArticle from './common/list-art'
import comPage from './common/page'

//临时数据
import dataArtList from './../data_artlist_tab1.js'
import dataArtList2 from './../data_artlist_tab2.js'
import tagcloudList from './../data_tagcloud.js'

//公用方法
import UTIL from './../util.js'


export default {

    data () {
        return {
            showDropdown1: false, //显示下拉菜单
            showDropdown2: false, //显示下拉菜单
            curArtList: [], //显示的列表
            originArtList: [], //默认排序的列表
            ajaxParams: { //ajax请求参数
                pageUrl: "article/queryPage", //请求地址
                params: { //请求参数
                    nowPage: 1,
                    pageSize: 10,
                    categoryId: "", //文章分类ID，需要时添加
                    tagCloudId: "" //标签云ID，需要时添加
                },
            },
            Pages: { //分页组件传入参数，数据由后端提供
                nowPage: 0,
                allPage: 0,
                pageSize: 0
            },
            curIndex: 0 //初始tab显示第一条
        }
    },
    components: { comSearch,comTagcloud,comListArticle,comPage },
    created: function(){
        //获取（公用数据）文章分类
        this.$store.commit('http_articleSort');

        //获取标签云列表
        this.$store.commit('http_tagcloud');

        //获取文章列表，默认获取全部分类下的第一页
        this.http_article(1);

    },
    computed: {
        allTablist() { //文章分类
            return this.$store.state.articleSortData;
        },
        allTagcloud() { //标签云
            return this.$store.state.tagcloudData;
        }
    },
    methods: {
        //tab切换
        changeTab: function(nowPage,categoryId){
            this.curIndex = nowPage;
            // this.ajaxParams.params.categoryId = categoryId;
            // this.ajaxParams.params.nowPage = 1;
            this.http_article(1,categoryId); //默认切换tab后都显示第一页
        },
        // rendList: function(data){
        //     this.originArtList = data;
        //     this.curArtList = this.originArtList;
        // },
        //获取文章列表
        http_article: function(nowPage,categoryId,tagCloudId){
            var _this = this;
            var _params = this.ajaxParams.params;

            _params.nowPage = nowPage;
            //如果有传条件查询（文章分类、标签云）,请求参数带上条件
            _params.categoryId = categoryId!="" ? categoryId : "";
            _params.tagCloudId = tagCloudId!="" ? tagCloudId : "";
            // if(categoryId!="") {
            //     _params.categoryId = categoryId;
            // }
            // if(tagCloudId!="") {
            //     _params.tagCloudId = tagCloudId;
            // }
            UTIL.AJAX_GET(
                this.ajaxParams.pageUrl,
                _params,
                function(RE,r,s){
                    if(RE.meta.code == "0000") { //请求成功
                        //文章列表
                        _this.originArtList = RE.datas.reList;
                        _this.curArtList = _this.originArtList;

                        //分页响应数据，存储在对象Pages中传入分页组件
                        _this.Pages.pageSize = RE.datas.pageSize; //一页显示数量
                        _this.Pages.nowPage = RE.datas.nowPage; //当前页
                        _this.Pages.allPage = RE.datas.totalPage; //总页数

                    }
                    else { 
                        console.log("FEFull：获取文章列表失败，"+RE.meta.message);
                    }
                }
            );
        },
        changePage(idx){
            this.http_article(idx);
        },
        showPage: function(){

        },
        //列表排序
        orderList: function(type){
            const list = this.originArtList;

            if(type == 0) { //默认排序
                this.curArtList = this.originArtList;
            }
            else
            if(type == 1) { //最新排序

            }
            else
            if(type == 2) { //热门排序
                console.log(this.curArtList[0].title);
                for(var i = 0; i<list.length; i++) {
                    for(var j = list.length - 1; j>0 ;j--) {

                        if(list[j].fav < list[j-1].fav) {
                            const temp = list[j-1];
                            list[j-1] = list[j];
                            list[j] = temp;
                        }
                    }
                }
                this.curArtList = list;
                console.log(this.curArtList[0].title);
            }
        }
    }
}
</script>

<style lang="scss">
    .ui-dropdown.tagcloud {
        .dropdown {
            left: auto;
            width: 300px;
        }
    }
</style>
