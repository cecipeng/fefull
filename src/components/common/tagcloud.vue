<template>
	<ul class="com-tagcloud">
		<li v-for="item in tagcloudList"><router-link tag="a" class="item" :to="{ name: 'search', params: { keyword: item.tagcloudId, type: 1 }}">{{item.tagcloudName}}</router-link></li>
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
	}
}	
</script>
