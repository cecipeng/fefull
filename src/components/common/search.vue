<template>
	<div class="com-search ui-dropdown">
		<p class="selector">
			<input type="text" v-model="searchWord" @keyup="inputing()">
			<router-link tag="a" class="btn-search" :to="{ name: 'search', params: { keyword: searchWord, type: 0 }}"></router-link>
		</p>
		<div class="dropdown" v-if="showDropdown">
			<p class="noresult" v-if="showNoResult">无结果</p>
			<ul class="droplist" v-else>
				<li v-for="item in searchResult"><a href="###" class="dropitem">{{item}}</a></li>
			</ul>
		</div>
	</div>
</template>

<script>



export default {
	data: function(){
		return {
			showNoResult: false, //显示“无结果”
			showDropdown: false, //显示下拉菜单
			searchWord: "", //搜索对应关键字
			searchResult: [] //智能搜索匹配关键字
		}
	},
	methods: {
		//输入中实时显示下拉菜单
		inputing: function(){
			var curlist = {};
			this.searchResult = [];
			if(this.searchWord != "") {

				this.http_searchword(this.searchWord);
				this.showDropdown = true;
				if(this.searchResult.length == 0) {
					this.showNoResult = true;//显示“无匹配结果”
				}
				else {
					this.showNoResult = false;
				}
			}
			else {
				this.showDropdown = false; //无内容不显示下拉菜单
			}
		},
		//获取智能匹配的关键字
		http_searchword: function(keyword){
			// this.$http.get('http://211.149.193.19:8080/api/customers')
			//     .then((response) => {
			//         this.$set('this.searchResult', response.data)
			    // })
			    // .catch(function(response) {
			    //     console.log(response)
			    // })
			this.searchResult = ['1','2','3','标题']; //临时处理
		}
	}
}	
</script>

