<template>
	<div class="com-list-article">
		<ul class="menulist">
			<li v-for="item in artlist">
				<router-link tag="a" target="_blank" class="item" :to="{ name: 'articleDetail', params: { articleId: item.articleId }}" :data-id="item.articleId" :data-publishedDate="item.publishedDate" :data-like="item.like" :data-category="item.category.categoryId">
					<div class="list-image"><img :src="item.cover" alt=""></div>	
					<div class="list-main">
						<div class="list-title">
							<div class="titlewrap">
								<p class="title">{{item.title}}</p>
								<span class="tag-origin" v-if="item.origin.originId==1">{{item.origin.originName}}</span>
							</div>
						</div>
						<div class="list-maintxt" v-html="item.maintxt"></div>
						<div class="list-foot">
							<comUserheader stylesize="s" :userData="item.author"></comUserheader>
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
    	
    }
}
</script>