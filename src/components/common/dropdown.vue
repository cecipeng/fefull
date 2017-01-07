<template>
	
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