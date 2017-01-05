<template>
    <div class="mod-article">
    	<!-- ui-tab -->
    	<div class="ui-tab ui-tab1">
    	    <div class="tab-head">
    	        <div class="layout-wrapper">
                
    	            <ul class="tabmenu">
    	                <li v-for="(tab, index) in allTablist" :class="{'on':index===curIndex}" @click="changeTab(index,tab.tabid)">{{tab.tabname}}</li>
    	            </ul>

                    <!-- com-search -->
                    <comSearch></comSearch>   
    	            <!-- /com-search -->

    	            <!-- ui-dropdown -->
    	            <comDropdown deftxt='排序方式' :droplist="orderlist"></comDropdown>   
    	            <!-- /ui-dropdown -->
    	            
                    <!-- com-tagcloud -->
                    <comTagcloud></comTagcloud>   
                    <!-- /com-tagcloud -->
    	        </div>
    	    </div>
    	    <div class="tab-body layout-wrapper">
                <comListArticle :artlist="curArtList"></comListArticle>
                <comPage></comPage> 
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
import comPage from './common/page'

//临时数据
import dataArtList from './../data_artlist_tab1.js'
import dataArtList2 from './../data_artlist_tab2.js'

export default {

    data () {
        return {
            curArtList: [], //显示的列表
            allTablist: [], //文章分类
            curIndex: 0, //初始tab显示第一条
            orderlist: [
                {orderId: 1, ordername: '最新'},
                {orderId: 2, ordername: '热门'}
            ]
        }
    },
    components: { comSearch,comTagcloud,comListArticle,comDropdown,comPage },
    created: function(){
        //获取（公用数据）文章分类
        this.$store.commit('http_articleSort');
        this.allTablist = this.$store.state.articleSortData;

        //获取所有tab首页文章列表
        const initTabid = this.allTablist[this.curIndex].tabid; //curIndex指定tab
        this.http_article(1,initTabid); //1：第一页
    },
    methods: {
        //tab切换
        changeTab: function(index,tabid){
            this.curIndex = index;
            this.http_article(1,tabid); //默认切换tab后都显示第一页
        },
        //获取文章列表
        http_article: function(page,tabid){
            // this.$http.get('http://211.149.193.19:8080/api/customers')
            //     .then((response) => {
            //         this.$set('this.curArtList', response.data)
                // })
                // .catch(function(response) {
                //     console.log(response)
                // })
            this.curArtList = dataArtList; //临时处理
        }
    }
}
</script>
