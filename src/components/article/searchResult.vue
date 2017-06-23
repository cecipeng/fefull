<template>
    <div class="layout-mod mod-article">
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
		<comLoadingMod v-if="showloading"></comLoadingMod>
                <comListArticle :artlist="curArtList"></comListArticle>
                <comPage :Pages="Pages" @changePage="changePage"  v-if="showpage"></comPage> 
    	    </div>
    	</div>
    	<!-- /ui-tab --> 
    </div>

</template>

<script>
import comSearch from './search'
import comTagcloud from './../common/tagcloud'
import comListArticle from './../common/list-art'
import comLoadingMod from './../common/loading-mod'
import comPage from './../common/page'

//公用方法
import UTIL from './../../util.js'

export default {
    
    data () {
        return {
            keyword: "",
            curArtList: [], //显示的列表
            showDropdown2: false, //显示标签云下拉菜单
            showpage: false, //显示分页
	        showloading: true, //显示正在加载
            ajaxParams: { //ajax请求参数
                pageUrl: "article/queryPage", //请求地址
                params: { //请求参数
                    nowPage: 1,
                    pageSize: 9,
                    sort: 1, //排序方式：最新1（默认），热门2
                    tagCloudId: "", //标签云id
                    keyword: "" //关键字
                },
            },
            Pages: { //分页组件传入参数，数据由后端提供
                nowPage: 0,
                allPage: 0,
                pageSize: 0
            }
        }
    },
    
    components: { comSearch,comTagcloud,comListArticle,comPage,comLoadingMod },
    created: function(){
        //获取标签云列表
        this.$store.commit('http_tagcloud');

        this.http_search(1);
    },
    computed: {
        allTagcloud() { //标签云
            return this.$store.state.tagcloudData;
        }
    },
    watch: {
        '$route': 'http_search' //路由发生改变时重新获取列表
    },
    methods: {
        //标题栏显示
        showTitle(key){
            
            if(key.tagcloudId) {
                const cloudlist = this.$store.state.tagcloudData;
                //根据标签id获取标签名称
                for(var i = 0; i <cloudlist.length; i++) {
                    if(key.tagcloudId == cloudlist[i].tagcloudId) {
                        this.keyword = "标签云‘" +cloudlist[i].tagcloudName + "’";
                    }
                }
            }
            else
            if(key.keyword) {
                this.keyword = key.keyword;
            }
            else this.keyword = "未知";
        },
        http_search(nowPage,keyword,tagCloudId,sort) {
            const key = this.$route.params.key;
            const _this = this;
            const _params = this.ajaxParams.params;
console.log(key.tagcloudId+key.keyword)
            //标题栏显示
            this.showTitle(key);

            //参数设置  
            _params.tagCloudId = key.tagcloudId ? key.tagcloudId : "";
            _params.keyword = key.keyword ? key.keyword : "";
            _params.nowPage = nowPage ? nowPage : 1;
            _params.sort= sort ? sort : 1;

            UTIL.AJAX_POST(
                this.ajaxParams.pageUrl,
                _params,
                function(RE,r,s){
                    if(RE.meta.code == "0000") { //请求成功
                        //文章列表
                        _this.curArtList = RE.datas.reList;

                        //分页响应数据，存储在对象Pages中传入分页组件
                        _this.Pages.pageSize = RE.datas.pageSize; //一页显示数量
                        _this.Pages.nowPage = RE.datas.nowPage; //当前页
                        _this.Pages.allPage = RE.datas.totalPage; //总页数

                        //页数大于1时显示分页
                        if(_this.Pages.allPage > 1) {
                            _this.showpage = true;
                        }
                        else _this.showpage = false;
                    }
                    else { 
                        console.log("FEFull：搜索失败，"+RE.meta.message);
                    }
                }
            ) 
        },
        //分页组件传回：请求跳转到第几页
        changePage(idx){ 
            this.http_search(idx,this.ajaxParams.params.keyword,this.ajaxParams.params.tagCloudId,this.ajaxParams.params.sort);
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
