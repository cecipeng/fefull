<template>
	<div class="com-search">
		<p class="search-selector">
			<input type="text" v-model="searchWord" @keyup="inputing()">
			<!--<router-link tag="a" class="btn-search" :to="{ name: 'search', params: { key: {'keyword': searchWord} }}"></router-link>-->
			<a class="btn-search" @click="searching"></a>
		</p>
		<div class="search-dropdown" v-if="showDropdown">
			<comError size="small" :text="showError.text" :type="showError.type" v-if="showError.show"></comError>
			<ul class="search-droplist" v-else>
				<li v-for="item in searchResult"><router-link tag="a" class="dropitem" :to="{ name: 'articleDetail', params: { articleId: item.articleId }}" :data-id="item.articleId">{{item.title}}</router-link></li>
			</ul>
		</div>
	</div>
</template>

<script>
import comError from './../common/error'

//公用方法
import UTIL from './../../util.js'

export default {
	data: function(){
		return {
			showDropdown: false, //显示下拉菜单
			searchResult: [], //搜索结果
			searchWord: "", //搜索对应关键字
			showError: { //缺省图
                show: false, //是否显示
                type: "", //错误类型
                text: "" //错误提示文字
            },
			ajaxParams: { //ajax请求参数
                params: { //请求参数
                    nowPage: 1,
                    pageSize: 5, //下拉菜单中显示5条
                    sort: 1, //排序方式：最新1（默认），热门2
                    keyword: "" //关键字
                },
            }
		}
	},
	components: { comError },
	methods: {
		//输入中实时显示下拉菜单
		inputing: function(){
			if(this.searchWord != "") {
				this.http_search();
			}
			else {
				this.showDropdown = false; //无内容不显示下拉菜单
			}
		},
		searching: function(){
			this.showDropdown = false;
			this.$emit("searching",this.searchWord);
			this.$router.push({name: 'search', params: { key: {'keyword': this.searchWord} }})
			
		},
		//搜索
        http_search() {
			const _this = this;
			this.ajaxParams.params.keyword = this.searchWord;

			//隐藏“无结果”
            this.showError.show = false;

            UTIL.AJAX_POST(
                UTIL.AJAX_URL().article,
                this.ajaxParams.params,
                function(RE,r,s){
                    if(RE.meta.code == "0000") { //请求成功
                        _this.searchResult = RE.datas.reList;

						_this.showDropdown = true; //有返回结果显示下拉菜单

						//无请求结果
                        if(_this.searchResult==0) {
                            _this.showError.show = true;
                            _this.showError.type = "empty";
                            _this.showError.text = "无匹配结果";
                        }
                        else _this.showError.show = false;
					}
					else if(RE.meta.code == "1003") { //服务端错误
                        _this.showError.show = true;
                        _this.showError.type = "weberror";
                        console.log("Allinone：获取文章列表失败，"+RE.meta.message);
                    }
                }
            ) 
        }
	}
}	
</script>

