<template>
	<div class="com-page">
        <div class="pagecon">
            <a class="btn-turnpage page-prev" v-if="current != 1" @click="changePage(parseInt(current)-1)">上一页</a>
            <a class="btn-num" v-if="showFirstPage" @click="changePage(1)">1</a>
            <span class="more" v-if="showFirstPage">...</span>
            <a class="btn-num" v-for="item in pagelist" :class="{'on':current == item}" @click="changePage(item)">{{item}}</a>
            <span class="more" v-if="showLastPage">...</span>
            <a class="btn-num" v-if="showLastPage" @click="changePage(allPage)">{{allPage}}</a>
            <a class="btn-turnpage page-next" v-if="current != allPage" @click="changePage(parseInt(current)+1)">下一页</a>
        </div>
    </div>
</template>

<script>


export default {
    props: ['Pages'], //Pages结构：{pageSize: 10, nowPage: '', allPage: ''}
    data () {
    	return {
            current: 0, //当前页
            allPage: 0, //总页数
            pageSize: 0, //每页显示几条数据
            showItem: 9, //显示页数
            showFirstPage: false, //显示第一页和省略号
            showLastPage: false //显示最后一页和省略号
    	}
    },
    created: function() {
        // this.http_page(1);
    },
    // watch: {
    //     current: function(){
            
    //     }
    // },
    computed: {
        nowPageFront() { //计算：有省略号时，中间显示几个
            return ( this.showItem - 4 - 1 ) / 2; 
        },
        pagelist(){ //分页列表
            var _list = [];
            var _bt = this.nowPageFront;
            var _num = "";

            if( //如果传入的参数有变化，重新渲染
                this.Pages.nowPage != this.current ||
                this.Pages.pageSize != this.pageSize ||
                this.Pages.allPage != this.allPage
            ) {
                this.current = this.Pages.nowPage;
                this.pageSize = this.Pages.pageSize;
                this.allPage= this.Pages.allPage;
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
                    _num = Math.min(this.showItem,this.allPage);
                    while(_num > 0) {
                        _list.unshift(_num--);
                    }
                }

                return _list;
            }
        }

    },
    methods: {
        //点击跳转页面
        changePage(idx){
            this.$emit('changePage',idx); //将要跳转的页面传入父组件请求数据
        }
    }
    
}
    
</script>

