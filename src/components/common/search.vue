<template>
	<div class="com-search ui-dropdown">
		<p class="selector">
			<input type="text" v-model="searchWord" @keyup="inputing()">
			<router-link class="btn-search" tag="a" :to="{name:'search',params:{searchword:searchWord}}"></router-link>
		</p>
		<div class="dropdown" v-if="showDropdown">
			<p class="noresult" v-if="showNoResult">无结果</p>
			<ul class="droplist" v-else>
				<li v-for="item in searchResult"><a href="###" class="dropitem">{{item.title}}</a></li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	data: function(){
		return {
			showNoResult: false, //显示“无结果”
			showDropdown: false, //是否显示下拉菜单
			searchWord: "", //搜索对应关键字
			searchResult: [] //搜索结果
		}
	},
	props: ['artlist'],
	methods: {
		changeShowDropdown: function(){
			this.showDropdown = !this.showDropdown;
		},
		//输入中实时显示下拉菜单
		inputing: function(){
			var curlist = {};
			this.searchResult = [];
			if(this.searchWord != "") {
				for(var x in this.artlist) {
					curlist = this.artlist[x];
					if(curlist.title.indexOf(this.searchWord) > -1) { //目前仅根据标题搜索
						this.searchResult.push(curlist);
					}
				}
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
		//点击搜索
		searching: function(){
			
		}
	}
}	
</script>

