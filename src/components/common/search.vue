<template>
	<div class="com-search ui-dropdown">
		<p class="selector">
			<input type="text" v-model="searchWord" @keyup="searching()">
			<a href="###" class="btn-search"></a>
		</p>
		<div class="dropdown" v-if="showDropdown">
			<ul class="droplist">
				<li><a href="###" class="dropitem">工具</a></li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	data: function(){
		return {
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
		searching: function(){
			var curlist = {};
			this.searchResult = [];
			if(this.searchWord != "") {
				for(var x in this.artlist) {
					curlist = this.artlist[x];
					if(curlist.title.indexOf(this.searchWord) > -1) {
						this.searchResult.push(curlist);
					}
				}
			}
		}
	}
}	
</script>

