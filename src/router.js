import Vue from 'vue'
import VueRouter from 'vue-router' //router

import store from './store.js'

import Home from './components/home/home'
import Article from './components/article/article'
import ArticleDetail from './components/article/articleDetail'
import Search from './components/article/searchResult'
import PageError from './components/common/PageError'
import Usercenter from './components/usercenter/usercenter'
import MyartCreate from './components/usercenter/myartCreate'
import MyartCreateMarkdown from './components/usercenter/myartCreateMarkdown'
import MyartList from './components/usercenter/myartList'
import FavorartList from './components/usercenter/favorartList'
import Login from './components/login/login'
import Preview from './components/usercenter/preview'
import Navigation from './components/navigation/navigation'
import makeupList from './components/makeup/makeupList'
import ideaList from './components/photo/ideaList'
import ideaboxList from './components/photo/ideaboxList'
import addIdea from './components/photo/addIdea'

Vue.use(VueRouter);

//公用方法
import UTIL from './util.js'

const routes = [
    { path: '/home', name: 'home', component: Home },
    { path: '/article', name: 'article', component: Article },
    { path: '/articleDetail/:articleId', name: 'articleDetail', component: ArticleDetail },
    { path: '/preview', name: 'preview', component: Preview },
    { path: '/search/:key', name: 'search', component: Search },
    { path: '/pageError', name: 'pageError', component: PageError },
    { path: '/login', name: 'login', component: Login },
    {
        path: '/usercenter',
        name: 'usercenter',
        component: Usercenter,
        children: [{
                path: '/usercenter/myartCreate/:articleId/:editType',
                name: 'myartCreate',
                component: MyartCreate,
            },
            {
                path: '/usercenter/myartCreateMarkdown/:articleId',
                name: 'myartCreateMarkdown',
                component: MyartCreateMarkdown
            },
            {
                path: '/usercenter/myartList',
                name: 'myartList',
                component: MyartList,
            },
            {
                path: '/usercenter/favorartList',
                name: 'favorartList',
                component: FavorartList,
            }
        ],
        beforeEnter: (to, from, next) => {
            if (isLogin()) {
                next();
            } else {
                router.push({ path: '/login' });
            }
        },
    },
    { path: '/navigation', name: 'navigation', component: Navigation },
    { path: '/makeupList', name: 'makeupList', component: makeupList },
    { path: '/ideaList', name: 'ideaList', component: ideaList },
    { path: '/ideaboxList', name: 'ideaboxList', component: ideaboxList },
    { path: '/addIdea', name: 'addIdea', component: addIdea },
    { path: '/', name: 'default', redirect: '/article' } //设置默认页
];

const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes
});

//每次页面跳转前
router.beforeEach((to, from, next) => {
    const routList = /(article)|(articleDetail)|(search)|(usercenter)|(myartCreate)|(myartCreateMarkdown)|(myartList)|(favorartList)/;

    //获取用户信息，用于渲染页面
    store.commit('getLoginInfor');

    //文章相关页先获取文章分类和标签云
    if(routList.test(to.path)) {
        getTabAndTagcloud(function(){
            next();
        });
    }
    else next();
})

function isLogin() {
    //去后台校验token
    const localStorage = window.localStorage;
    if (localStorage.userId) {
        console.log("router：登录成功");
        return true;
    } else {
        console.log("router：登录失败");
        return false;
    }
}

function getTabAndTagcloud(callback){
    let count = 0;
    if(store.state.articleSortData.length<=0) {
        UTIL.AJAX_GET(
            UTIL.AJAX_URL().articleCategories,
            "",
            function(RE,r,s){
                if(RE.meta.code == "0000") { //请求成功
                    s.commit('setArticleSort',RE.datas);
                    count++;
                    if(count == 2) {
                        callback();
                    }
                }
                else { 
                    console.log("Allinone：获取文章分类列表失败，"+RE.meta.message);
                }
            }
        )  
    }
    else {
        count++;
    }
    if(store.state.tagcloudData.length<=0) {
        UTIL.AJAX_GET(
            UTIL.AJAX_URL().articleTags,
            "",
            function(RE,r,s){
                if(RE.meta.code == "0000") { //请求成功
                    s.commit('setTagcloud',RE.datas);
                    count++;
                    if(count == 2) {
                        callback();
                    }
                }
                else { 
                    console.log("Allinone：获取标签云列表失败，"+RE.meta.message);
                }
            }
        ) 
    }
    else {
        count++;
    }
    if(count == 2) {
        callback();
    }
}

module.exports = router;