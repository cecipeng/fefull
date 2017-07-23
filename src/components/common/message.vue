<template>
    <transition name="fade">
        <div class="ui-message" v-if="messageConf.show" :class="messageConf.type">
            <div class="message-con">
                <p class="message-text">{{messageConf.content}}</p>
                <a class="btn-close" v-if="messageConf.showClosebtn"></a>
            </div>
        </div>
    </transition>
</template>

<script>

export default {
    props: ['messageConf'],
    data () {
    	return {
    		
    	}
    },
    watch: {
        "$store.state.message.show": function(val) {
            const _this = this;
            if(val) {
                setTimeout(function(){
                    _this.$store.commit('setMessage',[false]);
                },_this.$store.state.message.time * 1000);
            }
        }
	},
    methods: {
    
    }
    
}
</script>

<style lang="scss">
    
</style>