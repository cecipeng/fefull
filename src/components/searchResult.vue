<template>
    <div class="mod-article">
    	<!-- ui-tab -->
    	<div class="ui-tab ui-tab1">
    	    <div class="tab-head">
    	        <div class="layout-wrapper">
                    <p class="listtit">"<span class="result">{{ $route.params.keyword }}</span>"的搜索结果：</p>

                    <!-- com-search -->
                    <comSearch :artlist="allArtList"></comSearch>
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
                <comListArticle :artlist="curArtList"></comListArticle>
                <!-- <components :is="curView" transition="fade" transition-mode="out-in">
                </components>   -->
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
import dataArtList from './../data_artlist.js'

export default {
    
    data () {
        return {
            curArtList: [], //显示的列表
            allArtList: [], //文章列表
            listTit: "" //列表标题
        }
    },
    components: { comSearch,comTagcloud,comListArticle,comDropdown },
    created: function(){
        this.allArtList = this.$store.state.articleData;
        this.setCurList(this.$route.params.keyword);
    },
    methods: {
        //根据关键字搜索文章
        setCurList: function(keyword){
            const list = this.allArtList; //文章所有列表
            this.curArtList = []; //清空列表
            for(var i=0; i<list.length; i++) {
                if(list[i].title.indexOf(keyword) > -1) { //目前仅根据标题搜索
                    this.curArtList.push(list[i]);
                }
            }
        }
    }
}
</script>

<style lang="scss">
    .listtit {
        float: left;
        height: 72px;
        line-height: 72px;
        font-size: 16px;
        color: #2f2a52;
        .result {
            color: red;
            font-size: 20px;
        }
    }

</style>
