<template>
	<div class="ui-dropdown" @mouseenter="changeShowDropdown" @mouseleave="changeShowDropdown">
		<a class="selector">
			排序方式
			<i class="dropdown-arrow"></i>
		</a>
		<div class="dropdown" v-show="showDropdown">
			<ul class="droplist">
				<li><a href="###" class="dropitem">最新</a></li>
				<li><a href="###" class="dropitem">热门</a></li>
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