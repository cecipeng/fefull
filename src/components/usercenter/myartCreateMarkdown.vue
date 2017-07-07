<template>
    <div class="myartCreate">
        <div id="editor">
            <mavon-editor style="height: 100%" placeholder="xxx"></mavon-editor>
        </div>
    </div>
</template>
<script>

import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

export default {

    data () {
        return {
           value: ''
        }
    },
    components: { mavonEditor },
    created: function(){
        
    },
    computed: {
       
    },
    mounted: function(){
       
    },
    methods: {
      
    }
}
</script>

<style lang="scss">
   

</style>
