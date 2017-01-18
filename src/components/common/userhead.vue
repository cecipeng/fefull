<template>
	<div class="com-userhead" :data-style-size="stylesize" :data-authorid="userData.userId">
		<span class="head"><img :src="userData.userHead"></span>
		<span class="name">{{userData.userName}}</span>
	</div>
</template>

<script>


export default {
    props: ['userData', 'stylesize']
}
</script>