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
        strict: false, //是否启用严格模式
        editArticle: "", //正在编辑的文章
        modalZindex: 102, //弹窗z-index，初始值为102
        modalMask: 0 //是否显示弹窗遮罩,每打开一个弹窗+1，每关闭一个弹窗-1，当值为0表示无弹窗了，设置遮罩不显示
        // ajaxMessage: "me" //接口返回信息
    },
    mutations: {
        // set_ajaxMessage: function(state,mess){
        //     state.ajaxMessage = mess;
        // },
    	//获取文章分类
    	setArticleSort: function(state,data){
            state.articleSortData = data;
    	},
        //获取标签云列表
        setTagcloud: function(state,data){
            state.tagcloudData = data;
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
            }
            else {
                state.loginUser = {
                    "userId" : "",
                    "userName" : "",
                    "userHead" : "",
                    "isLogining": false
                };
            }
        },
        //存储正在编辑的文章内容
        setEditArticle: function(state,con){
            state.editArticle = con;
        },
        //更新弹窗层级
        setModalZindex: function(state,con){
            state.modalZindex += con;
        },
        //设置弹窗遮罩是否显示
        setModalMask: function(state,con){ //传入的con参数：增加一个：1；减少一个：-1
            state.modalMask += con;
        }
    }
});


export default store