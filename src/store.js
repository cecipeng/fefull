import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource';

Vue.use(Vuex);
Vue.use(VueResource);

//临时数据
import tabList from './data_tablist.js'


const store = new Vuex.Store({
    state: {
    	articleSortData: [], //文章分类列表
    	userData: [] //所有用户列表
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
    	}
    }
});


export default store