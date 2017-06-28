<template>
    <div class="layout-mod mod-navigation">

    	<div class="navigation-box">
            <div class="layout-wrapper">
                <div class="ui-maintitle maintitle-mynav">
                    <h4 class="maintitle">我的导航</h4>      
                    <div class="frbox">
                        <a href="###" class="btn-editor" @click="showModal1=true"></a>    
                    </div>  
                </div>
                <comListNavigation></comListNavigation>
            </div>
        </div>

        <div class="layout-wrapper">
            <div class="navigation-box">
                <div class="layout-wrapper">
                    <div class="ui-maintitle maintitle-online">
                        <h4 class="maintitle">在线工具</h4>     
                    </div>
                    <comListNavigation></comListNavigation>
                </div>
            </div>
        </div>

        <comModal v-if="showModal1" :modalOpt="{
            title: 1123,
            text: "12"
        }"></comModal>    
    </div>
</template>

<script>

import comListNavigation from './../common/list-navigation'
import comModal from './../common/modal'

//公用方法
import UTIL from './../../util.js'
            
export default {

    data () {
        return {
            showModal1: true
        }
    },
    components: { comListNavigation,comModal },
    created: function(){
        
    },
    computed: {
        
    },
    methods: {
        
    }
}
</script>

<style lang="scss">
.ui-maintitle {
    margin-bottom: 30px;
}
</style>
