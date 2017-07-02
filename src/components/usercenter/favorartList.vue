<template>
    <div class="favorartList">
    	<div class="ui-user-header">
            <h2 class="user-header"><em class="font-l">收藏</em>的文章</h2>
        </div>
        <div class="listbox">
			<!-- ui-tab -->
			<div class="ui-tab ui-tab1">
				<div class="tab-head">
					
                    <ul class="tabmenu">
                        <li :class="{'on':curIndex==0}" @click="changeTab(0,'')">全部</li>
                        <li v-for="(cat, index) in allTablist" :class="{'on':index+1==curIndex}" :data-id="cat.categoryId" @click="changeTab(index+1,cat.categoryId)">{{cat.categoryName}}</li>
                    </ul>

				</div>
				<div class="tab-body">
					<comLoadingMod v-if="showloading"></comLoadingMod>
					<comError :text="showError.text" :type="showError.type" v-if="showError.show"></comError>
					<comListArticle :artlist="curArtList"></comListArticle>
					<comPage :Pages="Pages" @changePage="changePage" v-if="showpage"></comPage> 
				</div>
			</div>
			<!-- /ui-tab --> 
        </div>
    </div>
</template>

<script>

import comListArticle from './../common/list-art'
import comLoadingMod from './../common/loading-mod'
import comError from './../common/error'
import comPage from './../common/page'

//公用方法
import UTIL from './../../util.js'

export default {

    data () {
        return {
           	showpage: false, //显示分页
            showloading: false, //显示正在加载
            curArtList: [], //显示的列表
            showError: { //缺省图
                show: false, //是否显示
                type: "", //错误类型
                text: "" //错误提示文字
            },
            ajaxParams: { //ajax请求参数
                params: { //请求参数
                    nowPage: 1,
                    pageSize: 9,
                    categoryId: "", //文章分类ID，需要时添加
                    tagcloudId: "" //标签云ID，需要时添加
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
	components: { comListArticle,comPage,comLoadingMod,comError },
    created: function(){
		//获取（公用数据）文章分类
        this.$store.commit('http_articleSort');

        //获取收藏文章列表，默认获取全部分类下的第一页
        this.http_article(1);
    },
	computed: {
        allTablist() { //文章分类
            return this.$store.state.articleSortData;
        }
    },
    methods: {
		//tab切换
        changeTab: function(idx,categoryId){
            this.curIndex = idx;
            this.http_article(1,categoryId); //默认切换tab后都显示第一页
        },
        //获取文章列表
        http_article: function(nowPage,categoryId){
            const _this = this;
            const _params = this.ajaxParams.params;
            
            //参数设置  
            _params.categoryId = categoryId!="" ? categoryId : "";
            _params.nowPage = nowPage ? nowPage : 1;

            //请求时显示正在加载
            _this.showloading = true;

            //列表置空
            this.curArtList = "";

            //隐藏“无结果”
            this.showError.show = false;

            UTIL.AJAX_POST(
                UTIL.AJAX_URL().favor,
                _params,
                function(RE,r,s){
                    //请求成功后不显示正在加载
                    _this.showloading = false;

                    if(RE.meta.code == "0000") { //请求成功
                        //文章列表
                        _this.curArtList = RE.datas.reList;

                        //分页响应数据，存储在对象Pages中传入分页组件
                        _this.Pages.pageSize = RE.datas.pageSize; //一页显示数量
                        _this.Pages.nowPage = RE.datas.nowPage; //当前页
                        _this.Pages.allPage = RE.datas.totalPage; //总页数

                        //页数大于1时显示分页
                        if(_this.Pages.allPage > 1) {
                            _this.showpage = true;
                        }
                        else _this.showpage = false;

                        //无搜索结果
                        if(RE.datas.reList.length==0) {
                            _this.showError.show = true;
                            _this.showError.type = "empty";
                        }
                        else _this.showError.show = false;
                    }
                    else { 
						//请求错误，除code等于0000外，其他code都在页面调用error组件展示错误信息
                        if(RE.meta.code == "1002") {
                            _this.showError.show = true;
                            _this.showError.type = "";
                            _this.showError.text = "请求参数错误";
                        }
                        if(RE.meta.code == "1003") {
                            _this.showError.show = true;
                            _this.showError.type = "weberror";
                        }
                        console.log("FEFull：获取文章列表失败，"+RE.meta.message);
                    }
                }
            );
        },
        //分页组件传回：请求跳转到第几页
        changePage(idx){ 
            this.http_article(idx,this.ajaxParams.params.categoryId);
        }
    }
}
</script>

<style lang="scss">
    .ui-user-header {
    	.ui-btn.ui-btn-main {
    		min-width: 110px;
    	}
    }
    
</style>
