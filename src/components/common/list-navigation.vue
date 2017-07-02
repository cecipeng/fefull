<template>
	<div class="com-list-navigation">
		<ul class="menulist">
			<li v-for="item in list">
				<a target="_blank" class="item" :href="item.navigatorUrl" :class="{isFav: item.isFavor==1}">
					<div class="list-title">
						<span class="list-go">Go</span>
						<p class="title" :data-id="item.navigatorId">{{item.navigatorName}}</p>
					</div>
					<div class="list-maintxt">{{item.description}}</div>
				</a>
			</li>
		</ul>
	</div>
</template>

<script>


export default {
    components: {  },
    props: ['list'],
    data () {
    	return {

    	}
    },
    methods: {
    	
    }
}
</script>