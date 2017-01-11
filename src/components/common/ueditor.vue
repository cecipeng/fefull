<template>
	<div class="com-ueditor">
        <script id="ueditor" type="text/plain"></script>
    </div>
</template>

<script>

import './../../assets/libs/ueditor/ueditor.config.js'
import './../../assets/libs/ueditor/ueditor.all.js'
import './../../assets/libs/ueditor/lang/zh-cn/zh-cn.js'

export default {
    data () {
    	return {

    	}
    },
    created: function() {
        
    },
    mounted: function(){
       var ue = UE.getEditor('ueditor', {
            UEDITOR_HOME_URL: __dirname + "src/assets/libs/ueditor/"
        });
    },
    methods: {
        
    }
    
}
</script>

<style lang="scss">
    
</style>