<template>
	<div class="com-page">
        <a href="###" class="btn-turnpage page-prev" v-if="showPrevBtn">上一页</a>
        <a href="###" class="btn-num" v-if="showFirstPage">1</a>
        <span class="more" v-if="showFirstPage">...</span>
        <a href="###" class="btn-num" v-for="item in pagelist" :class="{'on':curPage == item}">{{item}}</a>
        <span class="more" v-if="showLastPage">...</span>
        <a href="###" class="btn-num" v-if="showLastPage">{{pageParams.totalPage}}</a>
        <a href="###" class="btn-turnpage page-next" v-if="showNextBtn">下一页</a>
    </div>
</template>

<script>

export default {
    props: ['pageParams'],
    data () {
    	return {
            showFirstPage: false, //显示第一页和省略号
            showLastPage: false, //显示最后一页和省略号
            showPrevBtn: false, //显示上一页按钮
            showNextBtn: false, //显示下一页按钮
            showPageNum: 9, //显示几个分页数（包括...），其他用...，为了对称，必须使用奇数
            // showPage: false //显示该组件
            curPage: 0 //当前页
    	}
    },
    created: function() {
        this.renderPage();
    },
    computed: {
        nowPageFront: function() { //计算：有省略号时，中间显示几个
            return ( this.showPageNum - 4 - 1 ) / 2; 
        },
        pagelist: function(){ //分页列表
            var _page = this.pageParams; //父级传入数据：总页数，当前页，一页显示几条，当前分类id(全部分类默认为：0)
            
            var _list = [];
            console.log("fff");
            if(_page.totalPage > this.showPageNum){ //页数大于this.showPageNum
                if(_page.nowPage - this.nowPageFront <= 2) {
                    for(var i = 1 ; i<=this.showPageNum-2 ; i++){
                        _list.push(i);
                    }
                    this.showFirstPage = false;
                    this.showLastPage = true;
                }
                else if(_page.nowPage + this.nowPageFront > _page.totalPage - 2) {
                    for(var i = _page.totalPage ; i>_page.totalPage-(this.showPageNum-2) ; i--){
                        _list.push(i);
                    }
                    _list.reverse();
                    this.showFirstPage = true;
                    this.showLastPage = false;
                }
                else {
                    for(var i = _page.nowPage - this.nowPageFront;i<=_page.nowPage + this.nowPageFront;i++){
                        _list.push(i);
                    }
                    this.showFirstPage = true;
                    this.showLastPage = true;
                }
            }
            else
            if(_page.totalPage > 1) { //页数小于this.showPageNum，且大于1页
                for(var i = 1 ; i<=_page.totalPage ; i++){
                    _list.push(i);
                }

                this.showFirstPage = false;
                this.showLastPage = false;
            }
            else
            if(_page.totalPage <= 1) { //页数只有1页，不显示页码
                this.showFirstPage = false;
                this.showLastPage = false;
                this.showPrevBtn = false;
                this.showNextBtn = false;
            }

            //默认显示第一页
            this.curPage = _page.nowPage;
            return _list;
        }
    },
    methods: {
        showTurnBtn: function(nowPage,lastPage){ //判断是否显示上一页，下一页
            this.showPrevBtn = nowPage == 1 ? false : true;
            this.showNextBtn = nowPage == lastPage ? false : true;
        },
    	renderPage: function(){
            
        }
    }
    
}
</script>