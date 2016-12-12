<template>
    <div class="mod-article">
    	<!-- ui-tab -->
    	<div class="ui-tab ui-tab1">
    	    <div class="tab-head">
    	        <div class="layout-wrapper">
    	            <ul class="tabmenu">
    	                <li v-for="(tab, index) in tabs" :class="{'on':index===curIndex}" @click="chooseTab(index)">{{tab.tabname}}</li>
    	            </ul>

                    <!-- com-search -->
                    <comSearch></comSearch>   
    	            <!-- /com-search -->

    	            <!-- ui-dropdown -->
    	            <comDropdown></comDropdown>   
    	            <!-- /ui-dropdown -->
    	            
                    <!-- com-tagcloud -->
                    <comTagcloud></comTagcloud>   
                    <!-- /com-tagcloud -->
    	        </div>
    	    </div>
    	    <div class="tab-body layout-wrapper">
                <components :is="curView" transition="fade" transition-mode="out-in">
                </components>  
    	    </div>
    	</div>
    	<!-- /ui-tab --> 
    </div>
</template>

<script>
import Vue from 'vue'
import comSearch from './common/search'
import comTagcloud from './common/tagcloud'
import comListArticle from './common/list-art'
import comDropdown from './common/dropdown'

//临时数据
Vue.component('view_0', {
    template: '\
        <div>tab0</div>\
    '
})
Vue.component('view_1', {
    template: '\
        <comListArticle></comListArticle>\
    ',
    components: {comListArticle}
})
Vue.component('view_2', {
    template: '\
        <div>tab2</div>\
    '
})



export default {
    data () {
        return {
            tabs: [ //临时数据
                {tabname: "CSS"},
                {tabname: "HTML"},
                {tabname: "JavaScript"}
            ],
            curIndex: 0, //默认tab显示第一条
            curView: 'view_0' //默认tab显示第一条，对应内容为第一个。值为一个组件
        }
    },
    components: { comSearch,comTagcloud,comListArticle,comDropdown },
    methods: {
        //tab切换
        chooseTab: function(index){
            this.curIndex = index;
            this.curView = 'view_' + index;
        }
    }
}
</script>
