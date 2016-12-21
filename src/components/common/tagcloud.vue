<template>
	<div class="com-tagcloud" @mouseenter="changeShowDropdown" @mouseleave="changeShowDropdown">
		<a class="mainlink">标签云</a>
		<div class="dropdown-cloud" v-show="showDropdown">
			<ul class="cloudlist">
				<li><a class="item">CSS</a></li>
				<li><a class="item">HTML</a></li>
				<li><a class="item">JQuery</a></li>
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
			// console.log(this.showDropdown);
			this.showDropdown = !this.showDropdown;
		}
	}
}	
</script>
