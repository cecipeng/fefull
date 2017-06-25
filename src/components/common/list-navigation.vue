<template>
	<div class="com-list-navigation">
		<ul class="menulist">
			<li><a target="_blank" class="item">
				<div class="list-title">
					<p class="title">w3cplus</p>
					<span class="list-go">Go</span>
				</div>
				<div class="list-maintxt">sdfsd东莞市的根，深蒂固发个地方，豆腐豆腐g放水淀粉</div>
			</a></li>
			<li><a target="_blank" class="item"></a></li>
			<li><a target="_blank" class="item"></a></li>
			<li><a target="_blank" class="item"></a></li>
			<li><a target="_blank" class="item"></a></li>
			<!--<li v-for="item in artlist">-->
				<!--<a target="_blank" class="item" :href="item.url">
					<div class="list-title">
						<p class="title">{{item.title}}</p>
					</div>
					<div class="list-maintxt">{{item.maintxt}}</div>
				</a>-->
			<!--</li>-->

		</ul>
	</div>
</template>

<script>


export default {
    components: {  },
    props: ['artlist'],
    data () {
    	return {

    	}
    },
    methods: {
    	
    }
}
</script>