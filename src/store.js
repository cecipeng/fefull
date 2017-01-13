import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource';

Vue.use(Vuex);
Vue.use(VueResource);

//临时数据
import tabList from './data_tablist.js'
import tagcloudList from './data_tagcloud.js'


const store = new Vuex.Store({
    state: {
    	articleSortData: [], //文章分类列表
        tagcloudData: [], //标签云列表
        loginUser: "", //登录用户ID
        showPop: false //是否显示弹窗，是，最外层overflow:hidden

    },
    mutations: {
    	//获取文章分类
    	http_articleSort: function(state){
    	    // this.$http.get('http://211.149.193.19:8080/api/customers')
    	    //     .then((response) => {
    	    //         this.$set('articleSortData', response.data)
    	        // })
    	        // .catch(function(response) {
    	        //     console.log(response)
    	        // })
    	    state.articleSortData = tabList; //临时处理
    	},
        //获取标签云列表
        http_tagcloud: function(state){
            // this.$http.get('http://211.149.193.19:8080/api/customers')
            //     .then((response) => {
            //         this.$set('tagcloudData', response.data)
                // })
                // .catch(function(response) {
                //     console.log(response)
                // })
            state.tagcloudData = tagcloudList; //临时处理
        },
        //获取登录状态
        getLoginInfor: function(state){
            const localStorage = window.localStorage;
            if(localStorage.ui) {
                console.log("已登录");
                state.loginUser = localStorage.ui;
            }
            else {
                console.log("未登录");
                state.loginUser = "";
            }
        }
    }
});


export default store