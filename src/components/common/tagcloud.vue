<template>
	
	<ul class="com-tagcloud">
		<li v-for="item in tagcloudList"><a class="item" @click="searching(item.tagcloudId)">{{item.tagcloudName}}</a></li>
	</ul>
</template>

<script>
export default {
	data: function(){
		return {
			
		}
	},
	props: [ 'tagcloudList' ],
	methods: {
		searching(id){
			this.$emit("searching",id);
			this.$router.push({name: 'search', params: { key: {'tagcloudId': id} }})
		}
	}
}	
</script>
