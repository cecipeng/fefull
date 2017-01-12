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

    	            <!-- 排序 -->
                    <div class="ui-dropdown" @mouseleave="showDropdown1=false">
                        <a class="selector" @mouseenter="showDropdown1=true">
                            排序方式
                            <i class="dropdown-arrow"></i>
                        </a>
                        <div class="dropdown" v-show="showDropdown1">
                            <ul class="droplist">
                                <li><a @click="orderList(0);showDropdown1 = false" class="dropitem">默认</a></li>
                                <li><a @click="orderList(1);showDropdown1 = false" class="dropitem">最新</a></li>
                                <li><a @click="orderList(2);showDropdown1 = false" class="dropitem">热门</a></li>
                            </ul>
                        </div>
                    </div>
    	            <!-- /排序 -->
    	            
                    <!-- com-tagcloud -->
                    <div class="ui-dropdown tagcloud"  @mouseleave="showDropdown2=false">
                        <a class="selector" @mouseenter="showDropdown2=true">
                            排序方式
                            <i class="dropdown-arrow"></i>
                        </a>
                        <div class="dropdown" v-show="showDropdown2">
                            <comTagcloud :tagcloudList="allTagcloud"></comTagcloud>  
                        </div>
                    </div>
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
import comPage from './common/page'

//临时数据
import dataArtList from './../data_artlist_tab1.js'
import dataArtList2 from './../data_artlist_tab2.js'
import tagcloudList from './../data_tagcloud.js'

export default {

    data () {
        return {
            showDropdown1: false, //显示下拉菜单
            showDropdown2: false, //显示下拉菜单
            curArtList: [], //显示的列表
            originArtList: [], //默认排序的列表
            allTablist: [], //文章分类
            allTagcloud: [], //标签云
            curIndex: 0 //初始tab显示第一条
        }
    },
    components: { comSearch,comTagcloud,comListArticle,comPage },
    created: function(){
        //获取（公用数据）文章分类
        this.$store.commit('http_articleSort');
        this.allTablist = this.$store.state.articleSortData;

        //获取所有tab首页文章列表
        const initTabid = this.allTablist[this.curIndex].tabid; //curIndex指定tab
        this.http_article(1,initTabid); //1：第一页

        //获取标签云列表
        this.$store.commit('http_tagcloud');
        this.allTagcloud = this.$store.state.tagcloudData;

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
            //         this.$set('this.originArtList', response.data)
                // })
                // .catch(function(response) {
                //     console.log(response)
                // })
            this.originArtList = dataArtList; //临时处理
            this.curArtList = this.originArtList;
        },
        //列表排序
        orderList: function(type){
            const list = this.originArtList;

            if(type == 0) { //默认排序
                this.curArtList = this.originArtList;
            }
            else
            if(type == 1) { //最新排序

            }
            else
            if(type == 2) { //热门排序
                console.log(this.curArtList[0].title);
                for(var i = 0; i<list.length; i++) {
                    for(var j = list.length - 1; j>0 ;j--) {

                        if(list[j].fav < list[j-1].fav) {
                            const temp = list[j-1];
                            list[j-1] = list[j];
                            list[j] = temp;
                        }
                    }
                }
                this.curArtList = list;
                console.log(this.curArtList[0].title);
            }
        }
    }
}
</script>

<style lang="scss">
    .ui-dropdown.tagcloud {
        .dropdown {
            left: auto;
            width: 300px;
        }
    }
</style>
