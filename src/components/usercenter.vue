<template>
    <div class="mod-usercenter">
    	<div class="sideby">
            <div href="###" class="logo"></div>
            <div class="slideby-con">
                <comUserheader stylesize="ver" :authorid="loginUser"></comUserheader>
                <ul class="slideMenu">
                    <router-link class="item on" tag="li" to="/usercenter/myartCreate">我的文章</router-link>
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
import comUserheader from './common/userhead.vue';


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
