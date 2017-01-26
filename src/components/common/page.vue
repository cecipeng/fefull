<template>
	<div class="com-page">
        <a href="###" class="btn-turnpage page-prev">上一页</a>
        <a href="###" class="btn-num on" v-if="showFirstPage">1</a>
        <span class="more" v-if="showFirstPage">...</span>
        <a href="###" class="btn-num" v-for="item in pagelist">{{item}}</a>
        <span class="more" v-if="showLastPage">...</span>
        <a href="###" class="btn-num" v-if="showLastPage">{{pageParams.totalPage}}</a>
        <a href="###" class="btn-turnpage page-next">下一页</a>
    </div>
</template>

<script>

export default {
    props: ['pageParams'],
    data () {
    	return {
            showFirstPage: false, //显示第一页和省略号
            showLastPage: false, //显示最后一页和省略号
            showPageNum: 9 //显示几个分页数，其他用...，为了对称，必须使用奇数

    	}
    },
    created: function() {
        this.renderPage();
    },
    computed: {
        nowPageFront() {
            return ( this.showPageNum - 4 - 1 ) / 2;
        },
        pagelist: function(){ //分页列表
            var _page = this.pageParams;
            
            var _list = [];
            console.log(this.showPageNum);
            if(_page.totalPage > this.showPageNum){ //需要有省略

                if(_page.nowPage - this.nowPageFront <= 2) {
                    for(var i = 1 ; i<=this.showPageNum-2 ; i++){
                        this._list.push(i);
                    }
                    this.showFirstPage = false;
                    this.showLastPage = true;
                }
                else if(_page.nowPage + this.nowPageFront > _page.totalPage - 2) {
                    for(var i = _page.totalPage ; i>_page.totalPage-(this.showPageNum-2) ; i--){
                        this._list.push(i);
                    }
                    this._list.reverse();
                    this.showFirstPage = true;
                    this.showLastPage = false;
                }
                else {
                    for(var i = _page.nowPage - this.nowPageFront;i<=_page.nowPage + this.nowPageFront;i++){
                        this._list.push(i);
                    }
                    this.showFirstPage = true;
                    this.showLastPage = true;
                }
            }

            return _list;
        }
    },
    methods: {
    	renderPage: function(){
            
        }
    }
    
}
</script>