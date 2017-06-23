<template>
	<div class="com-loading-mod">
		<div class="loading-txt">{{txt}}</div>
	</div>
</template>

<script>

export default {
    props: ['loadingTxt'],
    data () {
    	return {
            txt: ""
    	}
    },
    created: function(){
		this.txt = this.loadingTxt || "正在加载中...";
	},
    methods: {
    	
    }
}
</script>