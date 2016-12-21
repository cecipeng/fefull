<template>
    <div class="mod-article">
    	<!-- ui-tab -->
    	<div class="ui-tab ui-tab1">
    	    <div class="tab-head">
    	        <div class="layout-wrapper">
    	            <ul v-if="showTab" class="tabmenu">
    	                <li v-for="(tab, index) in allTablist" :class="{'on':index===curIndex}" @click="chooseTab(index,tab.tabid)">{{tab.tabname}}</li>
    	            </ul>
                    <p class="listtit" v-else>"<span class="result">{{listTit}}</span>"的搜索结果：</p>

                    <!-- com-search -->
                    <comSearch v-on:showListTitle="showTitle" :artlist="allArtList"></comSearch>   
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
import tabList from './../data_tablist.js'

export default {

    data () {
        return {
            allArtList: [], //文章所有列表
            curArtList: [], //显示的列表
            allTablist: [], //tab所有分类
            curIndex: 0, //默认tab显示第一条（可能顺序不统一）
            curView: tabList[0].tabid, //默认tab显示第一条对应的内容（可能顺序不统一）
            showTab: true, //切换：显示tab或搜索结果标题
            listTit: "" //列表标题
        }
    },
    components: { comSearch,comTagcloud,comListArticle,comDropdown },
    created: function(){
        this.http_allArtList(); //载入页面立即获取文章所有列表
        this.http_allTabList(); //载入页面立即获取tab所有分类
        this.chooseTab(this.curIndex,this.curView); //按data中curIndex和curView的设置显示某个tab
    },
    methods: {
        //tab切换
        chooseTab: function(index,tabid){
            this.curIndex = index;
            this.setCurList(tabid);
        },
        //根据选择的分类显示对应分类文章
        setCurList: function(tabid){
            this.allArtList = dataArtList; //临时处理
            this.curArtList = []; //清空列表
            for(var i=0; i<this.allArtList.length; i++) {
                if(this.allArtList[i].tabid == tabid) {
                    this.curArtList.push(this.allArtList[i]);
                }
            }
        },
        showTitle: function(word){
            this.showTab = false;
            this.listTit = word;
        },
        //获取文章所有列表
        http_allArtList: function(){
            // this.$http.get('http://211.149.193.19:8080/api/customers')
            //     .then((response) => {
            //         this.$set('allArtList', response.data)
                // })
                // .catch(function(response) {
                //     console.log(response)
                // })
        },
        //获取tab所有分类
        http_allTabList: function(){
            // this.$http.get('http://211.149.193.19:8080/api/customers')
            //     .then((response) => {
            //         this.$set('allTablist', response.data)
                // })
                // .catch(function(response) {
                //     console.log(response)
                // })
            this.allTablist = tabList; //临时处理
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
