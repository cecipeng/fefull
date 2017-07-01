<template>
    <div id="app" :style="$store.state.showPop?'overflow:hidden':''">
        
        <!-- header -->
        <div class="layout-header">
            <comHeader></comHeader>
        </div>
        <!-- /header -->
        
        <router-view
            keep-alive
            transition="fade"
            transition-mode='out-in'>
        </router-view>

        <comLoginPop></comLoginPop>
        
        <div class="com-modalMask" v-if="showModalMask" :style="{'z-index': modalZindex}"></div>   
    </div>
</template>


<script>
import comHeader from './components/common/header';
import comLoginPop from './components/common/login-pop';
export default {
    components: {
        comHeader,comLoginPop
    },
    data() {
        return {
            
        }
    },
    computed: {
        showModalMask () {
            return this.$store.state.modalMask > 0 ? true : false;
        },
        modalZindex () {
            return this.$store.state.modalZindex - 1;
        }
    }
}
</script>


<style lang="scss">
@import "src/assets/styles/styles.scss";
//@import "assets/libs/ueditor/themes/default/css/ueditor.css";
//@import "assets/libs/ueditor/themes/iframe.css";
</style>
