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
            txt: "正在加载中..."
    	}
    },
    created: function(){
    	if(this.loadingTxt) {
            console.log(this.txt);
    		this.txt = this.loadingTxt;
    	}
	},
    methods: {
    	
    }
}
</script>