<template>
	<div class="com-list-article">
		<ul class="menulist">
			<li v-for="item in artlist">
			<router-link tag="a" class="item" :to="{ name: 'articleDetail', params: { articleId: item.articleId }}">
					<div class="list-image"><img :src="item.cover" alt=""></div>	
					<div class="list-main">
						<div class="list-title">
							<div class="titlewrap">
								<p class="title">{{item.title}}</p>
								<span class="tag-origin" v-if="item.origin">原创</span>
							</div>
						</div>
						<p class="list-maintxt">{{item.maintxt}}</p>
						<div class="list-foot">
							<comUserheader stylesize="s" :authorid="item.author"></comUserheader>
							<a class="com-fav">{{item.fav}}</a>
						</div>
					</div>
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>

import comUserheader from './userhead.vue';

export default {
    components: { comUserheader },
    props: ['artlist'],
    data () {
    	return {

    	}
    },
    methods: {
    	ss: function(){
    		console.log(this.artlist)
    	}
    }
}
</script>