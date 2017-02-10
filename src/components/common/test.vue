<template>
	<div class="com-userhead">
		{{a}}
	</div>
</template>

<script>


export default {
    props: ['msg'],
    data(){
    	return {
    		
    	}
    },
    computed: {
    	a(){
    		return this.msg.name.a
    	}
    }
}
</script>