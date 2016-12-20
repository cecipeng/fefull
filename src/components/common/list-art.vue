<template>
	<div class="com-list-article">
		<ul class="menulist">
			<li>
				<a class="item">
					<div class="list-image"><img src="./../../assets/pics/demo-article-cover.png" alt=""></div>	
					<div class="list-main">
						<div class="list-title">
							<div class="titlewrap">
								<p class="title">印象派浅谈之视觉篇</p>
								<span class="tag-origin">原创</span>
							</div>
						</div>
						<p class="list-maintxt">Lorem ipsum dolor sit amet, consectetur adipiscing elit. AeneanLorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean</p>
						<div class="list-foot">
							<comUserheader></comUserheader>
							<fav></fav>
						</div>
					</div>
				</a>
			</li>
		</ul>
	</div>
</template>

<script>

import comUserheader from './userhead.vue';
import fav from './fav.vue';

export default {
    components: { comUserheader,fav },
    props: ['artlist'],
    data () {
    	return {
    		list: artlist
    	}
    },
    method: {
    	
    }
}
</script>