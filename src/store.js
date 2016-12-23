import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource';

Vue.use(Vuex);
Vue.use(VueResource);

//临时数据
import dataArtList from './data_artlist.js'
import tabList from './data_tablist.js'


const store = new Vuex.Store({
    state: {
    	articleData: [], //所有文章列表
    	articleSortData: [], //文章分类列表
    	userData: [] //所有用户列表
    },
    mutations: {
    	//获取文章所有列表
    	http_article: function(state){
    	    // this.$http.get('http://211.149.193.19:8080/api/customers')
    	    //     .then((response) => {
    	    //         this.$set('articleData', response.data)
    	        // })
    	        // .catch(function(response) {
    	        //     console.log(response)
    	        // })
    	        state.articleData = dataArtList; //临时处理
    	},
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
    	}
    }
});


export default store