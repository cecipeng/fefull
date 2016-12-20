<template>
    <div class="mod-article">
    	<!-- ui-tab -->
    	<div class="ui-tab ui-tab1">
    	    <div class="tab-head">
    	        <div class="layout-wrapper">
    	            <ul class="tabmenu">
    	                <li v-for="(tab, index) in tablist" :class="{'on':index===curIndex}" @click="chooseTab(index,tab.tabid)">{{tab.tabname}}</li>
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
                <comListArticle :artlist="showArtList"></comListArticle>
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
import tabList from './../data_tablist.js'

export default {

    data () {
        return {
            "showArtList": [],//[]  //ajax
            "tablist": tabList,//tab分类  //ajax
            curIndex: 0, //默认tab显示第一条
            curView: tabList[0].tabid //默认tab显示第一条，对应内容为第一个。值为一个组件
        }
    },
    components: { comSearch,comTagcloud,comListArticle,comDropdown },
    created: function(){
        this.chooseTab(this.curIndex,this.curView);
    },
    methods: {
        //tab切换
        chooseTab: function(index,tabid){
            this.curIndex = index;
            this.getArtList(tabid);
        },
        //获取列表
        getArtList: function(tabid){
            // this.$http.get('http://211.149.193.19:8080/api/customers')
            //     .then((response) => {
            //         this.$set('dataArtList', response.data)
            
                        for(var i=0; i <dataArtList.length; i++) {
                            if(dataArtList[i].tabid == tabid) {
                                this.showArtList = dataArtList[i].list;
                            }
                        }
                // })
                // .catch(function(response) {
                //     console.log(response)
                // })
        }
    }
}
</script>
