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
        this.http_getUser()
    },
    methods: {
        //根据userid获取该用户信息
    	http_getUser: function(){
    		// this.$http.get('http://211.149.193.19:8080/api/customers')
            //     .then((response) => {
            //         this.$set('this.user', response.data)
                // })
                // .catch(function(response) {
                //     console.log(response)
                // })
    		for(var i=0;i<userlist.length;i++){ //临时处理
    			if(this.authorid == userlist[i].userid) {
    				this.user = userlist[i];
    			}
    		}
    	}
    }
    
}
</script>