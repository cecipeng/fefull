<template>
    <div class="layout-mod mod-usercenter">
    	<div class="sideby">
            <router-link class="logo" to="/home">首页</router-link>
            <div class="slideby-con">
                <comUserheader stylesize="ver" :userData="$store.state.loginUser"></comUserheader>
                <ul class="slideMenu">
                    <router-link class="item on" tag="li" to="/usercenter/myartList">我的文章</router-link>
                    <li>我的文章</li>
                </ul>
            </div>
        </div>
        <div class="mainby">
            <router-view
                keep-alive
                transition="fade"
                transition-mode='out-in'>
            </router-view>
        </div>
    </div>
</template>

<script>
import comUserheader from './../common/userhead.vue';


export default {

    data () {
        return {
            loginUser: ""
        }
    },
    components: { comUserheader },
    created: function(){
        this.getUser();
    },
    methods: {
        getUser: function(){
            this.$store.commit('getLoginInfor');
            this.loginUser = this.$store.state.loginUser;
        }
    }
}
</script>

<style lang="scss">

</style>
