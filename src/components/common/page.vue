<template>
	<div class="com-page">
        <a href="###" class="btn-turnpage page-prev" v-if="Pages.nowPage != 1">上一页</a>
        <a href="###" class="btn-num" v-if="showFirstPage">1</a>
        <span class="more" v-if="showFirstPage">...</span>
        <a href="###" class="btn-num" v-for="item in pagelist" :class="{'on':Pages.nowPage == item}">{{item}}</a>
        <span class="more" v-if="showLastPage">...</span>
        <a href="###" class="btn-num" v-if="showLastPage">{{Pages.totalPage}}</a>
        <a href="###" class="btn-turnpage page-next" v-if="Pages.nowPage != Pages.totalPage">下一页</a>
        <!-- <a href="###" class="btn-turnpage page-prev" v-if="showPrevBtn">上一页</a>
        <a href="###" class="btn-num" v-if="showFirstPage">1</a>
        <span class="more" v-if="showFirstPage">...</span>
        <a href="###" class="btn-num" v-for="item in pagelist" :class="{'on':curPage == item}">{{item}}</a>
        <span class="more" v-if="showLastPage">...</span>
        <a href="###" class="btn-num" v-if="showLastPage">{{Pages.totalPage}}</a>
        <a href="###" class="btn-turnpage page-next" v-if="showNextBtn">下一页</a> -->
    </div>
</template>

<script>

export default {
    props: ['Pages'], //Pages结构：{pageSize: 10, nowPage: '', totalPage: ''}
    data () {
    	return {
            current: 0, //当前页
            allPage: 0, //总页数
            pageSize: 0, //每页显示几条数据
            showItem: 9, //显示页数

            showFirstPage: false, //显示第一页和省略号
            showLastPage: false, //显示最后一页和省略号

            // showPrevBtn: false, //显示上一页按钮
            // showNextBtn: false, //显示下一页按钮
            // showPageNum: 9, //显示几个分页数（包括...），其他用...，为了对称，必须使用奇数
            // // showPage: false //显示该组件
            // curPage: 0 //当前页
    	}
    },
    created: function() {
        this.http_page(1);
    },
    computed: {
        nowPageFront: function() { //计算：有省略号时，中间显示几个
            return ( this.showItem - 4 - 1 ) / 2; 
        },
        pagelist: function(){ //分页列表
            var _list = [];
            var _params = this.Pages;
            var _bt = this.nowPageFront;
            var _num = "";

            this.http_page(_params.params.nowPage); //请求到数据，并改变了三个参数
            if(this.allPage > this.showItem) { //总页数大于要显示的页数，出现省略号
                if(this.current - _bt <= 3) { //只显示尾部省略号
                    this.showFirstPage = false;
                    this.showLastPage = true;
                    _num = this.showItem - 2;
                    while(_num) {
                        _list.unshift(_num--);
                    }
                }
                else if(this.current + _bt >= this.allPage - 2) { //只显示头部省略号
                    this.showFirstPage = true;
                    this.showLastPage = false;
                    _num = this.allPage;
                    while(_num >= this.allPage - (this.showItem - 3)) {
                        _list.unshift(_num--);
                    }
                }
                else { //头部尾部省略都显示
                    this.showFirstPage = true;
                    this.showLastPage = true;
                    _num = this.current;
                }
            }
            else if(this.allPage <= this.showItem) { //总页数小于要显示的页数，全部显示，不显示省略号
                this.showFirstPage = false;
                this.showLastPage = false;
                _num = Math.min(this.showItem,this.allpage);
                while(_num >= 0) {
                    _list.unshift(_num--);
                }
            }
            return _list;
        }

    },
    methods: {
        // showTurnBtn: function(nowPage,lastPage){ //判断是否显示上一页，下一页
        //     this.showPrevBtn = nowPage == 1 ? false : true;
        //     this.showNextBtn = nowPage == lastPage ? false : true;
        // },
    	http_page: function(idx){
            if(idx != this.current) {
                this.current = idx;
                
                var _this = this;
                console.log(this);
                VM.UTIL.AJAX_GET(
                    // this.Pages.pageUrl,
                    // this.Pages.params,
                    "article/queryPage",
                    {
                        nowPage: 1,
                        pageSize: 10
                    },
                    function(RE,r,s){
                        if(RE.meta.code == "0000") { //请求成功
                            this.$emit('rendData', RE.datas.reList);
                            // _this.originArtList = RE.datas.reList;
                            // _this.curArtList = _this.originArtList;

                            //分页响应数据，存储在对象中传入分页组件
                            // _this.Pages.pageSize = RE.datas.pageSize; //一页显示数量
                            _this.current = RE.datas.nowPage; //当前页
                            _this.allPage = RE.datas.totalPage; //总页数
                            _this.pageSize = RE.datas.pageSize;
                        }
                        else { 
                            console.log("FEFull：获取文章列表失败，"+RE.meta.message);
                        }
                    }
                );
            }
        }
    }
    
}


        // pagelist: function(){ //分页列表
        //     var _page = this.Pages; //父级传入数据：总页数，当前页，一页显示几条，当前分类id(全部分类默认为：0)
            
        //     var _list = [];
        //     console.log("fff");
        //     if(_page.totalPage > this.showPageNum){ //页数大于this.showPageNum
        //         if(_page.nowPage - this.nowPageFront <= 2) {
        //             for(var i = 1 ; i<=this.showPageNum-2 ; i++){
        //                 _list.push(i);
        //             }
        //             this.showFirstPage = false;
        //             this.showLastPage = true;
        //         }
        //         else if(_page.nowPage + this.nowPageFront > _page.totalPage - 2) {
        //             for(var i = _page.totalPage ; i>_page.totalPage-(this.showPageNum-2) ; i--){
        //                 _list.push(i);
        //             }
        //             _list.reverse();
        //             this.showFirstPage = true;
        //             this.showLastPage = false;
        //         }
        //         else {
        //             for(var i = _page.nowPage - this.nowPageFront;i<=_page.nowPage + this.nowPageFront;i++){
        //                 _list.push(i);
        //             }
        //             this.showFirstPage = true;
        //             this.showLastPage = true;
        //         }
        //     }
        //     else
        //     if(_page.totalPage > 1) { //页数小于this.showPageNum，且大于1页
        //         for(var i = 1 ; i<=_page.totalPage ; i++){
        //             _list.push(i);
        //         }

        //         this.showFirstPage = false;
        //         this.showLastPage = false;
        //     }
        //     else
        //     if(_page.totalPage <= 1) { //页数只有1页，不显示页码
        //         this.showFirstPage = false;
        //         this.showLastPage = false;
        //         this.showPrevBtn = false;
        //         this.showNextBtn = false;
        //     }

        //     //默认显示第一页
        //     this.curPage = _page.nowPage;
        //     return _list;
        // }
</script>

