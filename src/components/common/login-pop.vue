<template>
	<div class="ui-pop loginPop" v-if="showThisPop">
        <div class="popwrap">
            <a class="btn-closepop" @click="showThisPop = false"></a>
            <div class="pophead"></div>
            <div class="popbody">
                <div class="formbox">
                    <input type="text" class="form-input form-input-wide inp-username" placeholder="请输入">
                    <input type="text" class="form-input form-input-wide inp-pwd" placeholder="请输入">
                    <p class="errortip">密码错误</p>
                    <div class="btnwrap">
                        <a class="ui-btn ui-btn-wide ui-btn-main">登录</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: ['', ''],
    data () {
    	return {
    		showThisPop: false //是否显示该弹窗
    	}
    },
    created: function() {
        
    },
    methods: {
    	
    }
    
}
</script>

<style lang="scss">
    .loginPop {
        .popwrap {
            width: 450px;
            margin-left: -225px;
            margin-top: -200px;
        }
        .pophead {
            height: 200px;
            background: #f5f5f5;
        }
        .formbox {
            padding: 30px;
        }
        .errortip {
            height: 20px;
            line-height: 20px;
            margin: 20px 0 10px;
            text-align: center;
            font-size: 12px;
            color: red;
        }
        .form-input {
            position: relative;
        }
        .inp-username {
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0; 
        }
        .inp-pwd {
            margin-top: -1px;
            border-top-left-radius: 0;
            border-top-right-radius: 0; 
        }
    }
</style>