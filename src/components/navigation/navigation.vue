<template>
    <div class="layout-mod mod-navigation">

    	<div class="navigation-box">
            <div class="layout-wrapper">
                <div class="ui-maintitle maintitle-mynav">
                    <h4 class="maintitle">我的导航</h4>      
                    <div class="frbox">
                        <a href="###" class="btn-editor" @click="$refs.showModal1.showModal()"></a>    
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

        <comModal ref="showModal1" :modalOpt='{
            title: "管理常用网址",
            size: "large",
        }'>
            <div slot="body" class="navigation-modal-edit">
                
            </div>
        </comModal>    
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
