<template>
    <div id="app">
        <!-- header -->
        <div class="layout-header">
            <comHeader></comHeader>
        </div>
        <!-- /header -->
        
        <router-view></router-view>
    </div>
</template>


<script>
import comHeader from './components/common/header';
export default {
    components: {
        comHeader
    }
}
</script>


<style lang="scss">
@import "src/assets/styles/styles.scss";
</style>
