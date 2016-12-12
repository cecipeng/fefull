<template>
	<div class="com-search ui-dropdown">
		<p class="selector">
			<input type="text">
			<a href="###" class="btn-search"></a>
		</p>
		<div class="dropdown" v-show="showDropdown">
			<ul class="droplist">
				<li><a href="###" class="dropitem">工具工具工具工具工具工具工具工具工具工具工具工具工具工具工具工具工具工具工具工具工具工具工具工具工具工具工具</a></li>
				<li><a href="###" class="dropitem">游戏</a></li>
				<li><a href="###" class="dropitem">视频</a></li>
				<li><a href="###" class="dropitem">音乐</a></li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	data: function(){
		return {
			'showDropdown': false
		}
	},
	methods: {
		changeShowDropdown: function(){
			return this.showDropdown = !this.showDropdown;
		}
	}
}	
</script>

