<template>
	<div class="com-userhead" :data-style-size="stylesize" :data-authorid="userData.userid">
		<span class="head"><img :src="userData.userhead"></span>
		<span class="name">{{userData.username}}</span>
	</div>
</template>

<script>


export default {
    props: ['userData', 'stylesize']
}
</script>