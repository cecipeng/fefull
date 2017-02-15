import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

//公用方法
import UTIL from './util.js'

//临时数据
import tabList from './data_tablist.js'
import tagcloudList from './data_tagcloud.js'


const store = new Vuex.Store({
    state: {
    	articleSortData: [], //公用列表：文章分类列表
        tagcloudData: [], //公用列表：标签云列表
        loginUser: {}, //登录用户ID,name,头像
        showPop: false, //是否显示弹窗，是，最外层overflow:hidden
        baseUrl: "http://wnet.ittun.com/fefull/api/" //接口地址
        // ajaxMessage: "me" //接口返回信息
    },
    mutations: {
        // set_ajaxMessage: function(state,mess){
        //     state.ajaxMessage = mess;
        // },
    	//获取文章分类
    	http_articleSort: function(state){
            UTIL.AJAX_GET(
                "article/categories",
                "",
                function(RE,r,s){
                    if(RE.meta.code == "0000") { //请求成功
                        s.state.articleSortData = RE.datas;
                    }
                    else { 
                        console.log("FEFull：获取文章分类列表失败，"+RE.meta.message);
                    }
                }
            )  
    	},
        //获取标签云列表
        http_tagcloud: function(state){
            UTIL.AJAX_GET(
                "article/tags",
                "",
                function(RE,r,s){
                    if(RE.meta.code == "0000") { //请求成功
                        s.state.tagcloudData = RE.datas;
                    }
                    else { 
                        console.log("FEFull：获取标签云列表失败，"+RE.meta.message);
                    }
                }
            ) 
        },
        //获取登录用户信息
        getLoginInfor: function(state){
            if(localStorage.accessToken) {
                state.loginUser = {
                    "userId" : localStorage.userId,
                    "userName" : localStorage.userName,
                    "userHead" : localStorage.userHead,
                    "isLogining": true
                };
                console.log("yes:userId:"+state.loginUser.isLogining);
            }
            else {
                state.loginUser = {
                    "userId" : "",
                    "userName" : "",
                    "userHead" : "",
                    "isLogining": false
                };
                console.log("no:userId:"+state.loginUser.isLogining);
            }
        }
        
    }
});


export default store