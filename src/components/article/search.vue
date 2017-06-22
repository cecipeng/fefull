<template>
	<div class="com-search ui-dropdown">
		<p class="selector">
			<input type="text" v-model="searchWord" @keyup="inputing()">
			<router-link tag="a" class="btn-search" :to="{ name: 'search', params: { key: {'keyword': searchWord} }}"></router-link>
		</p>
		<div class="dropdown" v-if="showDropdown">
			<p class="noresult" v-if="showNoResult">无结果</p>
			<ul class="droplist" v-else>
				<li v-for="item in searchResult.reList"><router-link tag="a" class="dropitem" :to="{ name: 'articleDetail', params: { articleId: item.articleId }}" :data-id="item.articleId">{{item.title}}</router-link></li>
			</ul>
		</div>
	</div>
</template>

<script>

//公用方法
import UTIL from './../../util.js'

export default {
	data: function(){
		return {
			showNoResult: false, //显示“无结果”
			showDropdown: false, //显示下拉菜单
			searchResult: [], //搜索结果
			searchWord: "", //搜索对应关键字
			ajaxParams: { //ajax请求参数
                pageUrl: "article/queryPage", //请求地址
                params: { //请求参数
                    nowPage: 1,
                    pageSize: 5, //下拉菜单中显示5条
                    sort: 1, //排序方式：最新1（默认），热门2
                    keyword: "" //关键字
                },
            }
		}
	},
	methods: {
		//输入中实时显示下拉菜单
		inputing: function(){
			if(this.searchWord != "") {
				this.ajaxParams.params.keyword = this.searchWord;
				this.http_search();
			}
			else {
				this.showDropdown = false; //无内容不显示下拉菜单
			}
		},
		//搜索
        http_search() {
			const _this = this;
            UTIL.AJAX_POST(
                this.ajaxParams.pageUrl,
                this.ajaxParams.params,
                function(RE,r,s){
                    if(RE.meta.code == "0000") { //请求成功
                        _this.searchResult = RE.datas;

						_this.showDropdown = true; //有返回结果显示下拉菜单
						if(_this.searchResult.length == 0) {
							_this.showNoResult = true;//显示“无匹配结果”
						}
						else {
							_this.showNoResult = false;
						}
                    }
                    else { 
                        console.log("FEFull：按关键字搜索失败，"+RE.meta.message);
                    }
                }
            ) 
        }
	}
}	
</script>

