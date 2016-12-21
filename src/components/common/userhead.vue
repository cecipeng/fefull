<template>
	<div class="com-userhead" :data-style-size="stylesize" :data-authorid="authorid">
		<span class="head"><img :src="user.userhead"></span>
		<span class="name">{{user.username}}</span>
	</div>
</template>

<script>

//临时数据
import userlist from './../../data_user.js'

export default {
    props: ['authorid', 'stylesize'],
    data () {
    	return {
    		user: {}
    	}
    },
    created: function() {
        this.getUser()
    },
    methods: {
    	getUser: function(){
    		
    		for(var i=0;i<userlist.length;i++){
    			if(this.authorid == userlist[i].userid) {
    				this.user = userlist[i];
                    // console.log(this.user.userhead);
    			}
    		}
    	}
    }
    
}
</script>