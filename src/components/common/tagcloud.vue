<template>
	<ul class="com-tagcloud">
		<li v-for="item in tagcloudList"><router-link tag="a" class="item" :to="{ name: 'search', params: { key: {'tagcloudId': item.tagcloudId} }}">{{item.tagcloudName}}</router-link></li>
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
