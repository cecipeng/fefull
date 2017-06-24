<template>
	<div class="com-empty">
		<div class="empty">{{txt}}</div>
	</div>
</template>

<script>

export default {
    props: ['emptyTxt'],
    data () {
    	return {
            txt: ""
    	}
    },
    created: function(){
		this.txt = this.emptyTxt || "无结果";
	},
    methods: {
    	
    }
}
</script>