<template>
    <div class="mod-article">
    	<!-- ui-tab -->
    	<div class="ui-tab ui-tab1">
    	    <div class="tab-head">
    	        <div class="layout-wrapper">
                
    	            <ul class="tabmenu">
    	                <li v-for="(tab, index) in allTablist" :class="{'on':index===curIndex}" @click="chooseTab(index,tab.tabid)">{{tab.tabname}}</li>
    	            </ul>

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


export default {

    data () {
        return {
            curArtList: [], //显示的列表
            allTablist: [], //文章分类
            allArtList: [], //文章列表
            curIndex: 0, //默认tab显示第一条（可能顺序不统一）
            curView: 11 //默认tab显示第一条对应的内容（可能顺序不统一）
        }
    },
    components: { comSearch,comTagcloud,comListArticle,comDropdown },
    created: function(){
        //获取（公用数据）文章列表，文章分类
        this.$store.commit('http_article');
        this.$store.commit('http_articleSort');
        this.allArtList = this.$store.state.articleData;
        this.allTablist = this.$store.state.articleSortData;

        //按data中curIndex和curView的设置显示某个分类下的文章列表
        this.chooseTab(this.curIndex,this.curView); 
    },
    methods: {
        //tab切换
        chooseTab: function(index,tabid){
            this.curIndex = index;
            this.setCurList(tabid);
        },
        //根据选择的分类显示对应分类文章
        setCurList: function(tabid){
            const list = this.allArtList; //文章所有列表
            this.curArtList = []; //清空列表
            for(var i=0; i<list.length; i++) {
                if(list[i].tabid == tabid) {
                    this.curArtList.push(list[i]);
                }
            }
        }
    }
}
</script>
