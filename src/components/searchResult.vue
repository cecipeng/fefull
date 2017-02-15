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

    	            <!-- 排序 -->  
    	            <!-- /排序 -->
    	            
                    <!-- com-tagcloud -->
                    <div class="ui-dropdown tagcloud"  @mouseleave="showDropdown2=false">
                        <a class="selector" @mouseenter="showDropdown2=true">
                            标签云
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
                <comPage :Pages="Pages" @changePage="changePage" ></comPage> 
    	    </div>
    	</div>
    	<!-- /ui-tab --> 
    </div>

</template>

<script>
import comSearch from './common/search'
import comTagcloud from './common/tagcloud'
import comListArticle from './common/list-art'
import comPage from './common/page'

//临时数据
import dataArtList from './../data_artlist_tab2.js'

//公用方法
import UTIL from './../util.js'

export default {
    
    data () {
        return {
            keyword: "",
            curArtList: [], //显示的列表
            showDropdown2: false, //显示标签云下拉菜单
            ajaxTagcloud: { //标签云ajax请求参数
                pageUrl: "article/queryPage", //请求地址
                params: { //请求参数
                    nowPage: 1,
                    pageSize: 9,
                    tagCloudId: "" //标签云ID，需要时添加
                },
            },
            Pages: { //分页组件传入参数，数据由后端提供
                nowPage: 0,
                allPage: 0,
                pageSize: 0
            },
            curIndex: 0 //初始tab显示第一条
        }
    },
    watch: {
        '$route': 'http_SearchResult' //路由发生改变时（搜索关键字变化）重新获取列表
    },
    components: { comSearch,comTagcloud,comListArticle,comPage },
    created: function(){
        //获取标签云列表
        this.$store.commit('http_tagcloud');

        this.http_SearchResult(1);
    },
    computed: {
        allTagcloud() { //标签云
            return this.$store.state.tagcloudData;
        }
    },
    methods: {
        //获取搜索结果列表
        http_SearchResult(nowPage) {
            var _this = this;
            nowPage = nowPage ? nowPage : 1;

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
                var cloudlist = this.$store.state.tagcloudData;
                var _params = this.ajaxTagcloud.params; //请求参数
                _params.nowPage = nowPage;
                _params.tagCloudId = this.$route.params.keyword;

                //根据标签id获取标签名称
                for(var i = 0; i <cloudlist.length; i++) {
                    if(this.$route.params.keyword == cloudlist[i].tagcloudId) {
                        this.keyword = "标签云‘" +cloudlist[i].tagcloudName + "’";
                    }
                }
                //根据标签云id获取文章列表
                UTIL.AJAX_GET(
                    this.ajaxTagcloud.pageUrl,
                    _params,
                    function(RE,r,s){
                        if(RE.meta.code == "0000") { //请求成功

                            //文章列表
                            _this.curArtList = RE.datas.reList;

                            //分页响应数据，存储在对象Pages中传入分页组件
                            _this.Pages.pageSize = RE.datas.pageSize; //一页显示数量
                            _this.Pages.nowPage = RE.datas.nowPage; //当前页
                            _this.Pages.allPage = RE.datas.totalPage; //总页数

                        }
                        else { 
                            console.log("FEFull：获取文章列表失败，"+RE.meta.message);
                        }
                    }
                );
            }
        },
        //分页组件传回：请求跳转到第几页
        changePage(idx){ 
            this.http_SearchResult(idx);
        },
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
