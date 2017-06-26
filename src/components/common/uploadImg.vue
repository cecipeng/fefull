<template>
	<div class="com-uploadImg">
        <div class="uploadbtn">
            <a href="###" class="ui-btn ui-btn-default btn-upload">上传封面<input type="file" class="form-hidden" @change="fileChange"></a>
        </div>
        <div class="imgpreview" v-if="image.length >0">
            <img :src="image" alt="">
            <a @click="image = ''" class="btn-delImg"></a>
        </div>
    </div>
</template>

<script>


export default {
    props: [''], 
    data () {
    	return {
            image: ""
            
    	}
    },
    created: function() {
       
    },
  
    computed: {

    },
    methods: {
        fileChange: function(e){
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length) return; 
            this.createImage(files);
        },
        createImage: function(file){
            if(typeof FileReader==='undefined'){
                alert('您的浏览器不支持图片上传，请升级您的浏览器');
                return false;
            }
            var image = new Image();   
            var _this = this;
            var leng=file.length;

            for(var i=0;i<leng;i++){
                var reader = new FileReader();
                reader.readAsDataURL(file[i]); 
                reader.onload =function(e){
                    _this.image = e.target.result;  
                    _this.$emit('exportImg',_this.image);         
                };                 
            }  
        }
    }
}
    
</script>

