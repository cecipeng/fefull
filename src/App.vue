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
        
    </div>
</template>


<script>
import comHeader from './components/common/header';
import comLoginPop from './components/common/login-pop';
export default {
    components: {
        comHeader,comLoginPop
    }
}
</script>


<style lang="scss">
@import "src/assets/styles/styles.scss";
//@import "assets/libs/ueditor/themes/default/css/ueditor.css";
//@import "assets/libs/ueditor/themes/iframe.css";
</style>
