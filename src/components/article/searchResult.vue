<template>
    <div class="layout-mod mod-article">
    	<!-- ui-tab -->
    	<div class="ui-tab ui-tab1">
    	    <div class="tab-head">
    	        <div class="layout-wrapper">
                    <p class="listtit" v-html="resultTitle"></p>

                    <!-- com-search -->
                    <comSearch v-on:searching="searchKeyword"></comSearch>
    	            <!-- /com-search -->

    	            <!-- 排序 -->  
    	            <!-- /排序 -->
    	            
                    <!-- com-tagcloud -->
                    <comDropdown trigger="hover" placement="bottom-end" width="320px" top="35px">
                        <a slot="rel" class="selector">
                            标签云
                            <i class="dropdown-arrow"></i>
                        </a>
                        <ul slot="list" class="droplist">
                            <comTagcloud :tagcloudList="allTagcloud"  @searching="searchTagcloud"></comTagcloud>  
                        </ul>
                    </comDropdown>
                    <!-- /com-tagcloud -->
    	        </div>
    	    </div>
    	    <div class="tab-body layout-wrapper">
		        <comLoadingMod v-if="showloading"></comLoadingMod>
                <comError :text="showError.text" :type="showError.type" v-if="showError.show"></comError>
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
import comDropdown from './../common/dropdown'
import comError from './../common/error'
import comPage from './../common/page'

//公用方法
import UTIL from './../../util.js'

export default {
    
    data () {
        return {
            resultTitle: "",
            curArtList: [], //显示的列表
            showpage: false, //显示分页
	        showloading: false, //显示正在加载
            showError: { //缺省图
                show: false, //是否显示
                type: "", //错误类型
                text: "" //错误提示文字
            },
            ajaxParams: { //ajax请求参数
                params: { //请求参数
                    nowPage: 1,
                    pageSize: 9,
                    sort: 1, //排序方式：最新1（默认），热门2
                    tagcloudId: "", //标签云id
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
    
    components: { comSearch,comTagcloud,comListArticle,comPage,comLoadingMod,comError,comDropdown },
    created: function(){

        //首次跳转到该页根据路由传入的关键字搜索。(不能用搜索组件传入的关键字，因为是article内到搜索组件)
        const key = this.$route.params.key;
        this.http_search(1,key.keyword,key.tagcloudId);
    },
    computed: {
        allTagcloud() { //标签云
            return this.$store.state.tagcloudData;
        }
    },
    methods: {
        //再次搜索关键字时调用，响应子组件传入的关键字
        searchKeyword(keyword) { 
            this.http_search(1,keyword);
        },
        //再次搜索标签云时调用
        searchTagcloud(id) {
            this.http_search(1,"",id);
        },
        //标题栏显示
        showTitle(pa){
            if(pa.tagcloudId) {
                const cloudlist = this.$store.state.tagcloudData;
                //根据标签id获取标签名称
                for(var i = 0; i <cloudlist.length; i++) {
                    if(pa.tagcloudId == cloudlist[i].tagcloudId) {
                        this.resultTitle = `标签云"<span class="result">${cloudlist[i].tagcloudName}</span>"的搜索结果：`;
                        return;
                    }
                }
            }
            else if(pa.keyword) {
                this.resultTitle = `"<span class="result">${pa.keyword}</span>"的搜索结果：`;
            }
            else this.resultTitle = `参数错误，显示全部内容，请重新输入`;
        },
        //搜索
        //根据传入的参数数量和类型做不同搜索：按关键字搜索，按标签云搜索，不变的搜索条件下：1.第几页；2.排序方式；3.排序方式下第几页
        http_search(nowPage,keyword,tagcloudId,sort) {
            const _this = this;
            const _params = this.ajaxParams.params;

            //参数设置  
            _params.tagcloudId = tagcloudId ? tagcloudId : "";
            _params.keyword = keyword ? keyword : "";
            _params.nowPage = nowPage ? nowPage : 1;
            _params.sort= sort ? sort : 1;

            //请求数据时显示“正在加载”
            this.showloading = true;
            
            //列表置空
            this.curArtList = "";

            //隐藏“无结果”
            this.showError.show = false;

            //标题栏显示
            this.showTitle(_params);

            console.log(_params)

            UTIL.AJAX_POST(
                UTIL.AJAX_URL().article,
                _params,
                function(RE,r,s){
                    //请求成功后不显示正在加载
                    _this.showloading = false;
                    
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

                        //无搜索结果
                        if(RE.datas.reList.length==0) {
                            _this.showError.show = true;
                            _this.showError.type = "empty";
                        }
                        else _this.showError.show = false;
                    }
                    else if(RE.meta.code == "1003") { //服务端错误
                        _this.showError.show = true;
                        _this.showError.type = "weberror";
                        console.log("FEFull：获取文章列表失败，"+RE.meta.message);
                    }
                }
            ) 
        },
        //分页组件传回：请求跳转到第几页
        changePage(idx){ 
            this.http_search(idx,this.ajaxParams.params.keyword,this.ajaxParams.params.tagcloudId,this.ajaxParams.params.sort);
        },
    }
}
</script>

<style lang="scss">
    

</style>
