<template>
    <div class="myartCreate">
        <div class="ui-user-header">
            <h2 class="user-header">创建文章</h2>
        </div>
        <div class="createbox">
            <div class="createtit"><span class="num">1/</span>文章标题</div>
            <div class="formbox-arttit">
                <!-- 是否原创 -->
                <div class="ui-dropdown">
                    <a class="selector">
                        排序方式
                        <i class="dropdown-arrow"></i>
                    </a>
                    <div class="dropdown">
                        <ul class="droplist">
                            <li><a @click="orderList(0)" class="dropitem">默认</a></li>
                            <li><a @click="orderList(1)" class="dropitem">最新</a></li>
                            <li><a @click="orderList(2)" class="dropitem">热门</a></li>
                        </ul>
                    </div>
                </div>
                <!-- /是否原创 -->
                <input type="text" />
            </div>

            <div class="createtit"><span class="num">2/</span>文章正文</div>
        </div>
    </div>
</template>
<script>

import Ueditor from './common/ueditor.vue';

export default {

    data () {
        return {
        }
    },
    components: { Ueditor },
    created: function(){
        
    },
    mounted: function(){
       
    },
    methods: {
        
    }
}
</script>

<style lang="scss">
    
</style>
