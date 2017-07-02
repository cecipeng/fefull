<template>
	<div class="com-error" :class="errorSize">
		<div class="error" :class="errorType">{{errorTxt}}</div>
	</div>
</template>

<script>

export default {
    props: ['text','type','size'],
    data () {
    	return {
            errorTxt: "",
            errorType: "",
            errorSize: ""
    	}
    },
    created: function(){
		
	},
    mounted(){
        this.errorType = this.type;
        switch(this.type) {
            case "empty":
                this.errorTxt = this.text || "OMG~空空如也！";
                break;
            case "weberror":
                this.errorTxt = this.text || "网络异常，好忧桑～";
                break;
            case "comment":
                this.errorTxt = this.text || "矮油，还没人评论";
                break;
            default: this.errorTxt = this.text || "未知错误";
        }
        
        this.errorSize = this.size || "";
    },
    methods: {
    	
    }
}
</script>