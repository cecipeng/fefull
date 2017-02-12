<template>
	<div class="com-userhead" :data-style-size="stylesize" :data-authorid="user.userId">
		<span class="head"><img :src="user.userHead"></span>
		<span class="name">{{user.userName}}</span>
	</div>
</template>

<script>


export default {
    props: ['userData', 'stylesize'],
    data () {
    	return {
    		user: {
    			userId: "",
    			userHead: "",
    			userName: ""
    		}
    	}
    },
    created: function(){
    	if(this.userData) { //可能会出现渲染页面时，还未获取异步请求的数据，在此之前使用初始数据（所有数据为空字符串）
    		this.user = this.userData;
    	}
	},
	watch: {
		userData: function(val){ //以上若暂时使用初始数据，待获取到后再使用传入的数据
			this.user = val;
		}
	}
}
</script>