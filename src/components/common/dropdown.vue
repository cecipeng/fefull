<template>
	<div class="ui-dropdown" @mouseenter="changeShowDropdown" @mouseleave="changeShowDropdown">
		<a class="selector">
			{{deftxt}}
			<i class="dropdown-arrow"></i>
		</a>
		<div class="dropdown" v-show="showDropdown">
			<ul class="droplist">
				<li v-for="item in droplist"><a @click="orderList(item.orderId)" class="dropitem">{{item.ordername}}</a></li>
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
	props: ['deftxt','droplist'],
	methods: {
		changeShowDropdown: function(){
			this.showDropdown = !this.showDropdown;
		},
		orderList: function(orderId){
			this.showDropdown = false;
console.log(orderId);
		}
	}
}
</script>