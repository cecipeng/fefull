<template>
    <div class="mod-article">
    	<!-- ui-tab -->
    	<div class="ui-tab ui-tab1">
    	    <div class="tab-head">
    	        <div class="layout-wrapper">
                    <p class="listtit">"<span class="result">{{ keyword }}</span>"的搜索结果：</p>

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
import dataArtList from './../data_artlist_tab2.js'



export default {
    
    data () {
        return {
            curArtList: [], //显示的列表
            keyword: ""
        }
    },
    watch: {
        '$route': 'http_SearchResult' //路由发生改变时（搜索关键字变化）重新获取列表
    },
    components: { comSearch,comTagcloud,comListArticle,comDropdown,comPage },
    created: function(){
        this.http_SearchResult();
    },
    methods: {
        //获取搜索结果列表
        http_SearchResult() {
            this.keyword = this.$route.params.keyword;
            if(this.$route.params.type == 0){ //搜索的结果
                // this.$http.get('http://211.149.193.19:8080/api/customers')
                //     .then((response) => {
                //         this.$set('this.curArtList', response.data)
                    // })
                    // .catch(function(response) {
                    //     console.log(response)
                    // })
                this.curArtList = dataArtList; //临时处理
            }
            else
            if(this.$route.params.type == 1){ //标签云的结果
                const cloudlist = this.$store.state.tagcloudData;
                //根据标签id获取标签名称
                for(var i = 0; i <cloudlist.length; i++) {
                    if(this.$route.params.keyword == cloudlist[i].tagcloudId) {
                        this.keyword = "标签云‘" +cloudlist[i].tagcloudName + "’";
                        this.curArtList = cloudlist[i].artlist; //临时处理
                    }
                }

                //根据标签云id获取文章列表
                //
                // this.$http.get('http://211.149.193.19:8080/api/customers')
                //     .then((response) => {
                //         this.$set('this.curArtList', response.data)
                    // })
                    // .catch(function(response) {
                    //     console.log(response)
                    // })
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
